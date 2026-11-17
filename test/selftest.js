'use strict';
// Rulează fără Electron: node test/selftest.js
const assert = require('assert'), os = require('os'), fs = require('fs'), path = require('path');
const Vault = require('../src/vault'), C = require('../src/cred');
const fake = { isEncryptionAvailable: () => true, encryptString: (s) => Buffer.from('E:' + s), decryptString: (b) => b.toString().slice(2) };
const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'rw-'));
const V = Vault(dir, fake);
let n = 0; const ok = (m) => console.log('  ✓', m, ++n);

const d = {}; C.init(d); ['ci', 'pc', 'dp'].forEach((t) => C.issue(d, t, require('./fixtures')[t]));
V.create('123456', d); assert(V.exists() && V.isOpen()); ok('seif creat');

const raw = fs.readFileSync(path.join(dir, 'vault.bin'), 'utf8');
assert(!raw.includes('POPESCU') && !raw.includes('TM 123456')); ok('fișierul nu conține date în clar');

V.lock(); assert(!V.isOpen()); ok('blocat');
assert(V.unlock('000000').ok === false); ok('cod greșit respins');
assert(V.unlock('123456').ok === true); ok('cod corect deschide');

const docs = C.list(V.get()); assert(docs.length === 3 && docs.every((x) => x.ok)); ok('3 documente, semnături valide');

const p = C.present(V.get(), 'ci', ['Peste 18 ani']);
let r = C.verify(V.get(), p.code); assert(r.ok && r.claims.length === 1 && r.claims[0][0] === 'Peste 18 ani'); ok('prezentare selectivă verificată');
assert(!p.code.includes('POPESCU') && !Buffer.from(p.code.slice(4), 'base64url').toString().includes('1996')); ok('nu se scurg câmpuri nealese');

const o = JSON.parse(Buffer.from(p.code.slice(4), 'base64url'));
const forged = Buffer.from(JSON.stringify({ ...o, d: [Buffer.from(JSON.stringify(['x', 'Peste 18 ani', 'Da'])).toString('base64url')] })).toString('base64url');
assert(!C.verify(V.get(), 'RW1.' + forged).ok); ok('date falsificate respinse');

const other = {}; C.init(other); other.issuer.id = d.issuer.id; C.issue(other, 'ci', require('./fixtures').ci);
let q = C.present(other, 'ci', ['Nume']); r = C.verify(V.get(), q.code);
assert(!r.ok && r.errors.some((e) => e.includes('invalidă'))); ok('emitent fals cu același nume respins (semnătură invalidă)');
const other2 = {}; C.init(other2); other2.issuer.id = 'urn:altcineva'; C.issue(other2, 'ci', require('./fixtures').ci);
q = C.present(other2, 'ci', ['Nume']); r = C.verify(V.get(), q.code);
assert(!r.ok && r.errors[0].includes('Emitent necunoscut')); ok('emitent necunoscut respins');

assert(!C.verify(V.get(), 'RW1.abc').ok && !C.verify(V.get(), 'gunoi').ok); ok('cod corupt respins');

// emitere cu date proprii (normalizare + vârstă calculată)
const mk = (o) => ({ 'Nume': 'Test', 'Prenume': 'Ana', 'Cetățenie': 'Română', 'Seria și numărul': 'XX 1', 'Valabilă până la': '01.01.2030', 'Data nașterii': '01.01.2015', ...o });
C.issue(V.get(), 'ci', mk({}));
let ci = C.list(V.get()).find((x) => x.id === 'ci');
assert(ci.ok && ci.fields.find((f) => f[0] === 'Peste 18 ani')[1] === 'Nu' && ci.fields.find((f) => f[0] === 'Prenume')[1] === 'Ana'); ok('date proprii: minor => „Peste 18 ani” = Nu');
C.issue(V.get(), 'ci', mk({ 'Data nașterii': '01.01.1990' }));
ci = C.list(V.get()).find((x) => x.id === 'ci'); assert(ci.fields.find((f) => f[0] === 'Peste 18 ani')[1] === 'Da'); ok('date proprii: adult => „Peste 18 ani” = Da');
assert.throws(() => C.issue(V.get(), 'ci', mk({ 'Data nașterii': '31.02.2000' }))); assert.throws(() => C.issue(V.get(), 'ci', mk({ 'Data nașterii': 'ieri' })));
assert.throws(() => C.issue(V.get(), 'ci', mk({ 'Nume': '  ' }))); assert.throws(() => C.issue(V.get(), 'zzz', {})); ok('date invalide respinse');

// emitenți de încredere (verificare între două calculatoare)
const peer = {}; C.init(peer); C.issue(peer, 'ci', require('./fixtures').ci); const pcode = C.present(peer, 'ci', ['Nume']);
assert(!C.verify(V.get(), pcode.code).ok); ok('cod de la alt calculator: respins până la import');
assert(C.trustImport(V.get(), C.trustExport(peer)) === 'added' && C.verify(V.get(), pcode.code).ok); ok('după importul cheii, codul se verifică');
assert(C.trustImport(V.get(), C.trustExport(peer)) === 'exists'); ok('import repetat: fără dubluri');
assert.throws(() => C.trustImport(V.get(), { ...C.trustExport(peer), pub: C.trustExport(other2).pub })); ok('același id cu altă cheie: respins');
assert.throws(() => C.trustImport(V.get(), { id: 'x', name: 'a', pub: 'b' })); ok('cheie malformată respinsă');
C.trustRemove(V.get(), peer.issuer.id); assert(!C.verify(V.get(), pcode.code).ok); assert.throws(() => C.trustRemove(V.get(), V.get().issuer.id)); ok('eliminare emitent; emitentul propriu nu se poate elimina');

const realNow = Date.now; Date.now = () => realNow() + 61000;
r = C.verify(V.get(), p.code); Date.now = realNow;
assert(!r.ok && r.errors.some((e) => e.includes('expirat'))); ok('cod expirat respins după 60 s');

assert.throws(() => V.changePin('999999', '111111'));
V.changePin('123456', '246810'); V.lock();
assert(!V.unlock('123456').ok && V.unlock('246810').ok); ok('schimbare cod: cel vechi nu mai merge, cel nou da');
const bk = V.backup('parola-de-test'); V.wipe(); assert(!V.exists()); ok('ștergere completă');
const V2 = Vault(fs.mkdtempSync(path.join(os.tmpdir(), 'rw-')), fake);
V2.create('654321', { holder: d.holder, docs: [], trusted: [] });
assert.throws(() => V2.restore(bk, 'alta-parola')); ok('restaurare cu parolă greșită respinsă');
V2.restore(bk, 'parola-de-test'); assert(V2.get().docs.length === 3); ok('restaurare reușită');

let last; for (let i = 0; i < 5; i++) last = V2.unlock('111111');
assert(last.wait > 0 && V2.unlock('654321').ok === false); ok('blocare progresivă după 5 greșeli');
console.log('\nToate cele ' + n + ' verificări au trecut.');
