'use strict';
const { app, BrowserWindow, ipcMain, session, safeStorage, dialog, Menu, clipboard, powerMonitor, shell } = require('electron');
const path = require('path');
const fs = require('fs');
const Vault = require('./src/vault');
const C = require('./src/cred');

let QR = null;
try { QR = require('qrcode'); } catch { /* QR opțional: fără pachet, codul apare doar ca text */ }

// Only UI language is stored outside the encrypted vault; no private content or documents.
const getUiLanguage = () => {
  try { const lang=fs.readFileSync(path.join(app.getPath('userData'),'ui-language.txt'),'utf8').trim(); return lang==='en'?'en':'ro'; }
  catch { return 'ro'; }
};
const saveUiLanguage = lang => {
  if (!['ro','en'].includes(lang)) throw new Error('Setare invalida');
  const target=path.join(app.getPath('userData'),'ui-language.txt');
  fs.mkdirSync(path.dirname(target),{recursive:true});
  fs.writeFileSync(target,lang,{mode:0o600});
};
let win, V, last = Date.now();
const IDLE_MS = 5 * 60 * 1000;

process.on('uncaughtException', (e) => { try { dialog.showErrorBox('Eroare', String((e && e.message) || e)); } catch { /* ignorat */ } });
if (!app.requestSingleInstanceLock()) app.quit();
app.on('second-instance', () => { if (win) { if (win.isMinimized()) win.restore(); win.focus(); } });

function createWindow() {
  win = new BrowserWindow({
    width: 1200, height: 780, minWidth: 980, minHeight: 640,
    backgroundColor: '#eef2fb', title: 'ROWallet', autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true, sandbox: true, nodeIntegration: false,
      devTools: !app.isPackaged, spellcheck: false
    }
  });
  win.setContentProtection(true); // blochează capturile de ecran și înregistrarea ferestrei
  win.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
  win.webContents.on('will-navigate', (e) => e.preventDefault());
  // Mărirea textului (Ctrl + / Ctrl -, Ctrl 0), pentru accesibilitate
  win.webContents.on('before-input-event', (e, i) => {
    if (i.type !== 'keyDown' || !(i.control || i.meta)) return;
    const wc = win.webContents, z = wc.getZoomLevel();
    if (i.key === '=' || i.key === '+') { wc.setZoomLevel(Math.min(z + 0.5, 3)); e.preventDefault(); }
    else if (i.key === '-') { wc.setZoomLevel(Math.max(z - 0.5, -1)); e.preventDefault(); }
    else if (i.key === '0') { wc.setZoomLevel(0); e.preventDefault(); }
  });
  win.loadFile(path.join(__dirname, 'renderer', 'index.html'));
}

app.whenReady().then(() => {
  Menu.setApplicationMenu(null);
  const s = session.defaultSession;
  // Confidențialitate: aplicația nu are voie să comunice prin rețea.
  s.webRequest.onBeforeRequest({ urls: ['http://*/*', 'https://*/*', 'ws://*/*', 'wss://*/*', 'ftp://*/*'] }, (d, cb) => cb({ cancel: true }));
  // Singura permisiune acordată: camera video (pentru scanarea codurilor în modul Verifică). Nimic altceva.
  s.setPermissionRequestHandler((w, p, cb, d) => cb(p === 'media' && !!d && Array.isArray(d.mediaTypes) && d.mediaTypes.length > 0 && d.mediaTypes.every((t) => t === 'video')));
  s.setPermissionCheckHandler((w, p, o, d) => p === 'media' && (!d || !d.mediaType || d.mediaType === 'video'));

  V = Vault(app.getPath('userData'), safeStorage);
  createWindow();
  if (powerMonitor && powerMonitor.on) for (const event of ['lock-screen', 'suspend', 'user-did-resign-active']) powerMonitor.on(event, () => { if (V && V.isOpen()) { V.lock(); if (win && !win.isDestroyed()) win.webContents.send('locked'); } });

  setInterval(() => {
    if (V.isOpen() && Date.now() - last > IDLE_MS) {
      V.lock();
      if (win && !win.isDestroyed()) win.webContents.send('locked');
    }
  }, 10000);
});
app.on('window-all-closed', () => { if (V) V.lock(); app.quit(); });

const H = (name, fn) => ipcMain.handle(name, async (e, ...a) => {
  try { return await fn(...a); } catch (x) { return { ok: false, err: String((x && x.message) || x) }; }
});
const need = (fn) => (...a) => (V.isOpen() ? fn(...a) : { ok: false, err: 'Aplicația este blocată' });
const pinOk = (p) => /^\d{6}$/.test(String(p)) || (typeof p === 'string' && p.length >= 12 && p.length <= 256);

ipcMain.on('act', () => { last = Date.now(); });

H('status', () => ({ exists: V.exists(), open: V.isOpen(), weak: V.weak(), uiLanguage: getUiLanguage() }));
H('create', (pin) => {
  if (V.exists()) return { ok: false, err: 'Există deja un seif' };
  if (!pinOk(pin)) return { ok: false, err: 'Cod invalid' };
  const d = {}; C.init(d); d.profile = { name: '', photo: null }; d.files = []; d.audit = []; d.usedCodes = []; d.settings = { language: 'ro', theme: 'system' };
  V.create(String(pin), d);
  return { ok: true };
});
H('unlock', (pin) => (pinOk(pin) ? V.unlock(String(pin)) : { ok: false }));
H('lock', () => { V.lock(); return { ok: true }; });

H('list', need(() => ({ ok: true, docs: C.list(V.get()) })));
H('reorder', need((order) => {
  const d=V.get();
  if (!Array.isArray(order) || order.length!==d.docs.length || new Set(order).size!==d.docs.length || order.some(id=>!d.docs.some(x=>x.id===id))) throw Error('Ordine invalidă');
  d.docs.sort((a,b)=>order.indexOf(a.id)-order.indexOf(b.id));V.save();return {ok:true};
}));
H('history', need(() => ({ ok: true, hist: V.get().history })));
H('hclear', need(() => { V.get().history = []; V.save(); return { ok: true }; }));

H('present', need(async (id, names, purpose) => {
  const d = V.get();
  const r = C.present(d, id, Array.isArray(names) ? names : []);
  d.history.unshift({ w: 'Cod generat · ' + String(purpose || '').slice(0, 40), a: names.join(', '), d: new Date().toISOString() });
  d.history = d.history.slice(0, 200);
  V.save();
  let qr = null;
  if (QR) { try { qr = await QR.toString(r.code, { type: 'svg', margin: 1, errorCorrectionLevel: 'L' }); } catch { qr = null; } }
  return { ok: true, code: r.code, exp: r.exp, qr };
}));
H('verify', need((code) => {
  const d = V.get(), raw = String(code || '').trim();
  if (raw.length > 32 * 1024) return { ok: false, err: 'Cod prea mare' };
  const res = C.verify(d, raw);
  if (res.ok) {
    const fingerprint = require('crypto').createHash('sha256').update(raw).digest('hex');
    d.usedCodes ||= [];
    d.usedCodes = d.usedCodes.filter(x => x.exp > Date.now()).slice(-500);
    if (d.usedCodes.some(x => x.id === fingerprint)) { res.ok = false; res.errors.push('Cod deja utilizat pe acest calculator'); }
    else { d.usedCodes.push({ id: fingerprint, exp: Date.now() + 120000 }); V.save(); }
  }
  return { ok: true, res };
}));

H('sget', need(() => { const s=V.get().settings || {}; if(['en','ro'].includes(s.language)) saveUiLanguage(s.language); return {ok:true,s}; }));
H('sset', need((k, v) => {
  const allowed = { theme: ['system', 'light', 'dark'], language: ['ro', 'en'], highContrast: [true, false], maskSensitive: [true, false] };
  if (!allowed[k] || !allowed[k].includes(v)) return { ok: false, err: 'Setare invalidă' };
  const d = V.get(); d.settings = Object.assign({}, d.settings, { [k]: v }); V.save();
  if (k === 'language') saveUiLanguage(v);
  return { ok: true };
}));

H('chpin', need((o, n) => {
  if (!pinOk(o) || !pinOk(n)) return { ok: false, err: 'Alege 6 cifre sau o frază de minimum 12 caractere' };
  V.changePin(String(o), String(n));
  return { ok: true };
}));
H('issue', need((type, vals) => {
  const d = V.get();
  C.issue(d, String(type), vals || {});
  d.history.unshift({ w: 'Document actualizat · ' + String(type), a: 'Date modificate de utilizator', d: new Date().toISOString() });
  V.save();
  return { ok: true };
}));
H('document-remove', need((id) => {
  const d=V.get(); const old=d.docs.length;d.docs=d.docs.filter(x=>x.id!==id);
  if(d.docs.length===old) throw new Error('Document inexistent');
  d.history.unshift({w:'Document eliminat',a:String(id),d:new Date().toISOString()});V.save();return {ok:true};
}));
H('tlist', need(() => ({ ok: true, list: C.trustList(V.get()) })));
H('texport', need(() => ({ ok: true, t: C.trustExport(V.get()) })));
H('timport', need((txt) => {
  let o; try { o = JSON.parse(String(txt)); } catch { return { ok: false, err: 'Textul nu este un JSON valid' }; }
  const d = V.get(), r = C.trustImport(d, o); V.save();
  return { ok: true, r };
}));
H('tremove', need((id) => { const d = V.get(); C.trustRemove(d, String(id)); V.save(); return { ok: true }; }));
H('fsave', need(async (code) => {
  const r = await dialog.showSaveDialog(win, { defaultPath: 'cod-prezentare.rwp', filters: [{ name: 'Cod de prezentare', extensions: ['rwp'] }] });
  if (r.canceled) return { ok: false, err: 'Anulat' };
  fs.writeFileSync(r.filePath, String(code), 'utf8');
  return { ok: true };
}));
H('fopen', need(async () => {
  const r = await dialog.showOpenDialog(win, { properties: ['openFile'], filters: [{ name: 'Cod de prezentare', extensions: ['rwp', 'txt'] }] });
  if (r.canceled) return { ok: false, err: 'Anulat' };
  if (fs.statSync(r.filePaths[0]).size > 64 * 1024) return { ok: false, err: 'Fișier prea mare' };
  return { ok: true, text: fs.readFileSync(r.filePaths[0], 'utf8') };
}));

H('bexp', need(async (pass) => {
  if (!pass || String(pass).length < 8) return { ok: false, err: 'Parola trebuie să aibă minimum 8 caractere' };
  const r = await dialog.showSaveDialog(win, { defaultPath: 'portofel-backup.rwbak', filters: [{ name: 'Copie de rezervă', extensions: ['rwbak'] }] });
  if (r.canceled) return { ok: false, err: 'Anulat' };
  fs.writeFileSync(r.filePath, V.backup(String(pass)));
  V.get().settings ||= {}; V.get().settings.lastBackupAt=new Date().toISOString();V.save();
  return { ok: true };
}));
H('bimp', need(async (pass) => {
  const r = await dialog.showOpenDialog(win, { properties: ['openFile'], filters: [{ name: 'Copie de rezervă', extensions: ['rwbak'] }] });
  if (r.canceled) return { ok: false, err: 'Anulat' };
  if (fs.statSync(r.filePaths[0]).size > 64 * 1024 * 1024) throw new Error('Backup prea mare');
  V.restore(fs.readFileSync(r.filePaths[0]), String(pass));
  return { ok: true };
}));

const crypto = require('crypto');
const record = (d, what, detail = '') => { d.audit ||= []; d.audit.unshift({ at: new Date().toISOString(), what, detail }); d.audit = d.audit.slice(0, 200); };
H('profile', need(() => ({ ok: true, profile: { name: V.get().profile?.name || '', photo: V.get().profile?.photo || null } })));
H('profile-set', need((name) => {
  if (typeof name !== 'string' || name.trim().length < 2 || name.length > 100) throw new Error('Nume invalid');
  const d = V.get(); d.profile ||= {}; d.profile.name = name.trim(); record(d, 'Profil actualizat'); V.save(); return { ok: true };
}));
H('photo-pick', need(async () => {
  const r = await dialog.showOpenDialog(win, { properties: ['openFile'], filters: [{ name: 'Imagini', extensions: ['png', 'jpg', 'jpeg', 'webp'] }] });
  if (r.canceled) return { ok: false, err: 'Anulat' };
  const f = r.filePaths[0]; if (fs.statSync(f).size > 2 * 1024 * 1024) throw new Error('Fotografia trebuie să aibă maximum 2 MB');
  const b = fs.readFileSync(f); const ext = path.extname(f).toLowerCase();
  const png = b.length > 8 && b.subarray(0,8).equals(Buffer.from('89504e470d0a1a0a','hex'));
  const jpg = b.length > 3 && b[0]===255 && b[1]===216 && b[2]===255;
  const webp = b.length > 12 && b.toString('ascii',0,4)==='RIFF' && b.toString('ascii',8,12)==='WEBP';
  const mime = png ? 'image/png' : jpg ? 'image/jpeg' : webp ? 'image/webp' : null;
  if (!mime) throw new Error('Formatul imaginii nu este acceptat');
  const d = V.get(); d.profile ||= {}; d.profile.photo = `data:${mime};base64,${b.toString('base64')}`;
  record(d, 'Fotografie actualizată'); V.save(); return { ok: true };
}));
H('photo-remove', need(() => { const d=V.get(); if (d.profile) d.profile.photo=null; V.save(); return { ok:true }; }));

H('save-watermark', need(async (data) => {
  if(typeof data!=='string'||data.length>6*1024*1024||!data.startsWith('data:image/png;base64,')) throw new Error('Imagine invalidă');
  const b=Buffer.from(data.slice(22),'base64');
  if(!b.subarray(0,8).equals(Buffer.from('89504e470d0a1a0a','hex'))) throw new Error('PNG invalid');
  const r=await dialog.showSaveDialog(win,{defaultPath:'ROWallet-copie-cu-filigran.png',filters:[{name:'PNG',extensions:['png']}]});
  if(r.canceled)return {ok:false,err:'Anulat'};
  fs.writeFileSync(r.filePath,b,{mode:0o600});return {ok:true};
}));
H('file-add', need(async (category) => {
  const r=await dialog.showOpenDialog(win, { properties:['openFile'], filters:[{name:'Documente',extensions:['pdf','png','jpg','jpeg','txt']}] });
  if(r.canceled) return {ok:false,err:'Anulat'};
  const f=r.filePaths[0]; if(fs.statSync(f).size>8*1024*1024) throw new Error('Fișier prea mare (maxim 8 MB)');
  const bytes=fs.readFileSync(f), d=V.get(); d.files ||= [];
  if(d.files.length>=30) throw new Error('Maximum 30 de fișiere');
  if(d.files.reduce((a,x)=>a+Buffer.byteLength(x.content,'base64'),0)+bytes.length>24*1024*1024) throw new Error('Seiful de fișiere este limitat la 24 MB în total');
  const ext=path.extname(f).toLowerCase();
  const sig=ext==='.pdf' ? bytes.subarray(0,5).toString()==='%PDF-' : ext==='.png' ? bytes.subarray(0,8).equals(Buffer.from('89504e470d0a1a0a','hex')) : ['.jpg','.jpeg'].includes(ext) ? bytes[0]===255&&bytes[1]===216 : ext==='.txt' ? !bytes.includes(0) : false;
  if(!sig) throw new Error('Fișierul nu corespunde extensiei sau formatului acceptat');
  d.files.push({id:crypto.randomUUID(),name:path.basename(f).slice(0,120),category:String(category||'Altele').slice(0,40),content:bytes.toString('base64'),added:new Date().toISOString()});
  record(d,'Fișier adăugat',path.basename(f).slice(0,80)); V.save(); return {ok:true};
}));
H('file-list', need(() => ({ok:true, files:(V.get().files||[]).map(({id,name,category,added})=>({id,name,category,added}))})));
H('file-export', need(async (id) => {
  const f=(V.get().files||[]).find(x=>x.id===id); if(!f) throw new Error('Fișier inexistent');
  const r=await dialog.showSaveDialog(win,{defaultPath:f.name}); if(r.canceled) return {ok:false,err:'Anulat'};
  fs.writeFileSync(r.filePath,Buffer.from(f.content,'base64'),{flag:'w',mode:0o600}); return {ok:true};
}));
H('file-remove', need((id) => {const d=V.get(); d.files=(d.files||[]).filter(x=>x.id!==id);V.save();return {ok:true};}));
H('sign-file', need(async () => {
  const r=await dialog.showOpenDialog(win,{properties:['openFile']}); if(r.canceled) return {ok:false,err:'Anulat'};
  const f=r.filePaths[0]; if(fs.statSync(f).size>30*1024*1024) throw new Error('Fișier prea mare (maxim 30 MB)');
  const raw=fs.readFileSync(f), d=V.get(), hash=crypto.createHash('sha256').update(raw).digest('hex');
  const key=crypto.createPrivateKey({key:Buffer.from(d.holder.priv,'base64url'),format:'der',type:'pkcs8'});
  const envelope={format:'ROWallet-local-signature-v1',name:path.basename(f),sha256:hash,pub:d.holder.pub,at:new Date().toISOString()};
  envelope.signature=crypto.sign(null,Buffer.from(JSON.stringify(envelope)),key).toString('base64url');
  const dst=await dialog.showSaveDialog(win,{defaultPath:f+'.rwsig',filters:[{name:'Semnătură ROWallet',extensions:['rwsig']}]});
  if(dst.canceled) return {ok:false,err:'Anulat'};
  fs.writeFileSync(dst.filePath,JSON.stringify(envelope,null,2)); record(d,'Fișier semnat',envelope.name);V.save();return {ok:true};
}));
H('check-file-signature', need(async () => {
  const a=await dialog.showOpenDialog(win,{properties:['openFile'],filters:[{name:'Semnătură ROWallet',extensions:['rwsig']}]}); if(a.canceled) return {ok:false,err:'Anulat'};
  const sigPath=a.filePaths[0]; if(fs.statSync(sigPath).size>8192) throw new Error('Semnătură prea mare');
  const j=JSON.parse(fs.readFileSync(sigPath,'utf8'));
  if(j.format!=='ROWallet-local-signature-v1'||!/^([a-f0-9]{64})$/.test(j.sha256)||typeof j.signature!=='string') throw new Error('Format invalid');
  const b=await dialog.showOpenDialog(win,{properties:['openFile']}); if(b.canceled) return {ok:false,err:'Anulat'};
  const f=b.filePaths[0];if(fs.statSync(f).size>30*1024*1024) throw new Error('Fișier prea mare');
  const hash=crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');
  const {signature,...payload}=j;
  let valid=false;
  try {valid=hash===j.sha256&&crypto.verify(null,Buffer.from(JSON.stringify(payload)),crypto.createPublicKey({key:Buffer.from(j.pub,'base64url'),format:'der',type:'spki'}),Buffer.from(signature,'base64url'));} catch {}
  return {ok:true,valid,signer:j.pub===V.get().holder.pub?'Cheia acestui portofel':'Cheie externă (identitate neverificată)'};
}));
H('audit', need(() => ({ok:true,entries:[...V.attemptLog(),...(V.get().audit||[])].sort((a,b)=>String(b.at).localeCompare(String(a.at))).slice(0,200)})));
H('open-updates', () => { shell.openExternal('https://github.com/'); return {ok:true}; });

H('wipe', need(() => { V.wipe(); return { ok: true }; }));
H('copy', need((t) => {
  const s = String(t); clipboard.writeText(s);
  setTimeout(() => { try { if (clipboard.readText() === s) clipboard.clear(); } catch { /* ignorat */ } }, 60000);
  return { ok: true };
}));
