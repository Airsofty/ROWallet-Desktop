'use strict';
// Testează legăturile din main.js (IPC) cu un Electron simulat: fără Electron instalat.
const assert = require('assert'), fs = require('fs'), os = require('os'), path = require('path'), Module = require('module');
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'rw-ipc-'));
const handlers = {}; let ready, clip = '', saveTo = path.join(tmp, 'backup.rwbak'), openFrom = saveTo, openQueue = []; 
const fake = {
  app: { requestSingleInstanceLock: () => true, on() {}, quit() {}, whenReady: () => ({ then: (f) => { ready = f; } }), getPath: () => path.join(tmp, 'data'), isPackaged: false },
  BrowserWindow: class { constructor() { this.webContents = { setWindowOpenHandler() {}, on() {}, send() {}, getZoomLevel: () => 0, setZoomLevel() {} }; } setContentProtection() {} loadFile() {} isDestroyed() { return false; } },
  ipcMain: { handle: (n, f) => { handlers[n] = f; }, on() {} },
  session: { defaultSession: { webRequest: { onBeforeRequest() {} }, setPermissionRequestHandler() {}, setPermissionCheckHandler() {} } },
  safeStorage: { isEncryptionAvailable: () => true, encryptString: (s) => Buffer.from('E:' + s), decryptString: (b) => b.toString().slice(2) },
  dialog: { showErrorBox() {}, showSaveDialog: async () => ({ canceled: false, filePath: saveTo }), showOpenDialog: async () => ({ canceled: false, filePaths: [openQueue.length ? openQueue.shift() : openFrom] }) },
  Menu: { setApplicationMenu() {} },
  clipboard: { writeText(t) { clip = t; }, readText: () => clip, clear() { clip = ''; } }
};
const load = Module._load; Module._load = function (r, ...a) { return r === 'electron' ? fake : load.call(this, r, ...a); };
require('../main.js'); ready();
const call = (n, ...a) => handlers[n](null, ...a);
let n = 0; const ok = (m) => console.log('  ✓', m, ++n);

(async () => {
  let r = await call('status'); assert(!r.exists && !r.open); ok('status: seif inexistent la prima pornire');
  assert((await call('create', '12')).ok === false); ok('creare cu cod invalid respinsă');
  assert((await call('create', '123456')).ok); ok('creare seif cu cod valid');
  assert((await call('create', '123456')).ok === false); ok('a doua creare respinsă');
  r = await call('list'); assert(r.ok && r.docs.length === 0); ok('nu există documente fictive la creare');
  const seed = require('./fixtures'); for (const k of ['ci','pc','dp']) assert((await call('issue', k, seed[k])).ok);
  r = await call('list'); assert(r.docs.length === 3 && r.docs.every(d=>d.ok && d.local)); ok('date introduse explicit, semnate local');
  await call('lock'); assert((await call('list')).ok === false && (await call('verify', 'x')).ok === false); ok('blocat: nicio operațiune nu mai merge');
  assert((await call('unlock', '000000')).ok === false && (await call('unlock', '123456')).ok); ok('deblocare: cod greșit respins, cel corect merge');

  r = await call('present', 'ci', ['Nume', 'Prenume'], 'Test'); assert(r.ok && r.code.startsWith('RW1.')); ok('prezentare generată');
  const v = await call('verify', r.code); assert(v.ok && v.res.ok && v.res.claims.length === 2); ok('prezentarea se verifică');
  assert(!(await call('verify',r.code)).res.ok);ok('reutilizarea unui cod e respinsă pe același calculator');
  assert((await call('present', 'ci', [], 'x')).ok === false); ok('prezentare fără câmpuri respinsă');
  assert((await call('history')).hist.length >= 1); ok('istoric: o intrare');

  assert((await call('issue', 'ci', { ...require('./fixtures').ci, 'Data nașterii': '40.13.2000' })).ok === false); ok('editare cu dată invalidă respinsă');
  assert((await call('issue', 'ci', { ...require('./fixtures').ci, 'Prenume': 'Ana', 'Data nașterii': '01.01.1990' })).ok); ok('editare date proprii');
  assert((await call('list')).docs.find((d) => d.id === 'ci').fields.some((f) => f[1] === 'Ana')); ok('datele editate apar în listă');

  assert((await call('chpin', '123456', '654321')).ok); await call('lock');
  assert((await call('unlock', '123456')).ok === false && (await call('unlock', '654321')).ok); ok('schimbare cod prin IPC');
  assert((await call('chpin', '000000', '111111')).ok === false); ok('schimbare cod cu cod actual greșit respinsă');

  assert((await call('profile-set','Andrei Test')).ok); assert((await call('profile')).profile.name==='Andrei Test'); ok('profil local real');
  assert((await call('file-list')).files.length===0);assert((await call('audit')).entries.length>=1);ok('seif de fișiere și jurnal securitate');
  const png=path.join(tmp,'photo.png');fs.writeFileSync(png,Buffer.from('89504e470d0a1a0a0000000000000000','hex'));openFrom=png;
  assert((await call('photo-pick')).ok);assert((await call('profile')).profile.photo.startsWith('data:image/png;base64,'));ok('fotografia este adăugată local');
  assert((await call('photo-remove')).ok && !(await call('profile')).profile.photo);ok('ștergere fotografie');
  const pdf=path.join(tmp,'sample.pdf');fs.writeFileSync(pdf,Buffer.from('%PDF-1.4\n1 0 obj\nendobj\n'));
  openFrom=pdf;assert((await call('file-add','Identitate')).ok);const fl=(await call('file-list')).files;
  assert(fl.length===1 && fl[0].category==='Identitate');ok('import fișier în seiful criptat');
  saveTo=path.join(tmp,'export.pdf');assert((await call('file-export',fl[0].id)).ok);
  assert(fs.readFileSync(saveTo).equals(fs.readFileSync(pdf)));ok('export fișier identic');
  const pnguri='data:image/png;base64,'+fs.readFileSync(png).toString('base64');saveTo=path.join(tmp,'watermark.png');
  assert((await call('save-watermark',pnguri)).ok && fs.existsSync(saveTo));ok('export PNG cu filigran');
  saveTo=path.join(tmp,'sample.rwsig');openFrom=pdf;
  assert((await call('sign-file')).ok);ok('semnare Ed25519 detașată');
  openQueue=[saveTo,pdf];const signature=await call('check-file-signature');
  assert(signature.ok&&signature.valid);ok('verificare semnătură validă');
  fs.writeFileSync(pdf,Buffer.from('tampered'));openQueue=[saveTo,pdf];
  const invalidSignature=await call('check-file-signature');assert(!invalidSignature.valid);ok('fișier modificat => semnătură invalidă');
  assert((await call('file-remove',fl[0].id)).ok && (await call('file-list')).files.length===0);ok('ștergere fișier din seif');
  saveTo=path.join(tmp,'backup.rwbak');openFrom=saveTo;
  r = await call('texport'); assert(r.ok && r.t.pub); assert((await call('timport', 'nu e json')).ok === false); ok('export cheie; import invalid respins');
  assert((await call('timport', JSON.stringify(r.t))).r === 'exists'); ok('import cheie proprie: fără dubluri');
  assert((await call('tlist')).list.length === 1 && (await call('tremove', r.t.id)).ok === false); ok('lista de încredere; emitentul propriu nu se elimină');

  assert((await call('sset', 'theme', 'dark')).ok && (await call('sget')).s.theme === 'dark' && (await call('sset', 'theme', 'x')).ok === false && (await call('sset', 'altceva', 'dark')).ok === false); ok('setări: doar valori permise');

  assert((await call('bexp', 'scurt')).ok === false && (await call('bexp', 'parola-lunga')).ok && fs.existsSync(saveTo)); ok('copie de rezervă: parolă scurtă respinsă, export reușit');
  assert(!fs.readFileSync(saveTo, 'utf8').includes('POPESCU')); ok('copia de rezervă nu conține date în clar');
  await call('hclear'); assert((await call('bimp', 'parola-gresita')).ok === false && (await call('bimp', 'parola-lunga')).ok); ok('restaurare: parolă greșită respinsă, cea corectă merge');
  assert((await call('history')).hist.length >= 1); ok('istoricul revine din copie');

  saveTo = path.join(tmp, 'cod.rwp'); openFrom = saveTo;
  assert((await call('fsave', 'RW1.abc')).ok && (await call('fopen')).text === 'RW1.abc'); ok('salvare și deschidere fișier cod');
  await call('copy', 'RW1.abc'); assert(clip === 'RW1.abc'); ok('copiere în clipboard');

  await call('wipe'); r = await call('status'); assert(!r.exists && !r.open && !fs.existsSync(path.join(tmp, 'data', 'vault.bin'))); ok('ștergere completă: seiful dispare de pe disc');
  console.log('\nToate cele ' + n + ' verificări IPC au trecut.'); process.exit(0);
})().catch((e) => { console.error('EȘUAT:', e && e.stack || e); process.exit(1); });
