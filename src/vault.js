'use strict';
// Seif local într-un singur fișier criptat. Fără bază de date, fără server.
// Cheia = HMAC( scrypt(PIN, salt), cheie-de-dispozitiv ). Cheia de dispozitiv e protejată de Windows (DPAPI)
// prin Electron safeStorage, deci fișierul seifului nu poate fi deschis pe alt calculator.
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const b64 = (x) => Buffer.from(x, 'base64');
const SC = { N: 65536, r: 8, p: 1, maxmem: 160 * 1024 * 1024 };

module.exports = function Vault(dir, safe) {
  fs.mkdirSync(dir, { recursive: true });
  const F = path.join(dir, 'vault.bin');
  const DK = path.join(dir, 'device.key');
  const AT = path.join(dir, 'attempts.json');
  let key = null, data = null, salt = null;

  const exists = () => fs.existsSync(F);
  const isOpen = () => !!data;
  const get = () => data;
  const weak = () => {
    try { return !JSON.parse(fs.readFileSync(DK, 'utf8')).e; } catch { return !safe.isEncryptionAvailable(); }
  };

  function deviceKey() {
    if (fs.existsSync(DK)) {
      const j = JSON.parse(fs.readFileSync(DK, 'utf8'));
      return j.e ? b64(safe.decryptString(b64(j.k))) : b64(j.k);
    }
    const k = crypto.randomBytes(32);
    const e = safe.isEncryptionAvailable();
    if (!e) throw new Error('Protecția cheii de dispozitiv (Windows DPAPI) nu este disponibilă. Seiful nu a fost creat.');
    const stored = safe.encryptString(k.toString('base64'));
    fs.writeFileSync(DK, JSON.stringify({ e, k: stored.toString('base64') }));
    return k;
  }
  const derive = (pin, s) =>
    crypto.createHmac('sha256', crypto.scryptSync(pin, s, 32, SC)).update(deviceKey()).digest();

  function seal(k, obj) {
    const iv = crypto.randomBytes(12);
    const c = crypto.createCipheriv('aes-256-gcm', k, iv);
    const ct = Buffer.concat([c.update(JSON.stringify(obj), 'utf8'), c.final()]);
    return { iv: iv.toString('base64'), tag: c.getAuthTag().toString('base64'), ct: ct.toString('base64') };
  }
  function open(k, j) {
    const d = crypto.createDecipheriv('aes-256-gcm', k, b64(j.iv));
    d.setAuthTag(b64(j.tag));
    return JSON.parse(Buffer.concat([d.update(b64(j.ct)), d.final()]).toString('utf8'));
  }
  function atomicWrite(file, content) {
    const tmp = file + '.tmp';
    fs.writeFileSync(tmp, content);
    fs.renameSync(tmp, file);
  }
  function save() {
    if (!key || !data) throw new Error('Seif blocat');
    atomicWrite(F, JSON.stringify({ v: 1, salt: salt.toString('base64'), ...seal(key, data) }));
  }

  const att = () => { try { return JSON.parse(fs.readFileSync(AT, 'utf8')); } catch { return { n: 0, until: 0 }; } };
  const setAtt = (a) => fs.writeFileSync(AT, JSON.stringify(a));
  const attemptLog = () => (att().log || []).map(x=>({at:x,what:'Încercare de deblocare eșuată',detail:''}));

  function create(pin, init) {
    salt = crypto.randomBytes(16);
    key = derive(pin, salt);
    data = Object.assign({ history: [], created: new Date().toISOString() }, init);
    save();
    setAtt({ n: 0, until: 0 });
  }
  function unlock(pin) {
    const a = att();
    if (a.until > Date.now()) return { ok: false, wait: Math.ceil((a.until - Date.now()) / 1000) };
    try {
      const j = JSON.parse(fs.readFileSync(F, 'utf8'));
      const s = b64(j.salt), k = derive(pin, s);
      data = open(k, j); key = k; salt = s;
      setAtt({ n: 0, until: 0, log: a.log || [] });
      return { ok: true };
    } catch {
      const n = a.n + 1;
      const wait = n >= 5 ? Math.min(30 * 2 ** (n - 5), 3600) : 0;
      setAtt({ n, until: Date.now() + wait * 1000, log: [...(a.log || []),new Date().toISOString()].slice(-40) });
      return { ok: false, wait, left: Math.max(0, 5 - n) };
    }
  }
  function changePin(oldPin, newPin) {
    if (!key || !data) throw new Error('Seif blocat');
    const k = derive(oldPin, salt);
    const same = k.length === key.length && crypto.timingSafeEqual(k, key);
    k.fill(0);
    if (!same) throw new Error('Codul actual este greșit');
    const s2 = crypto.randomBytes(16), nk = derive(newPin, s2);
    key.fill(0); key = nk; salt = s2;
    save();
  }
  function lock() { if (key) key.fill(0); key = null; data = null; salt = null; }
  function wipe() { lock(); for (const f of [F, DK, AT, F + '.tmp']) fs.rmSync(f, { force: true }); }

  // Copie de rezervă: criptată doar cu o parolă aleasă de utilizator, ca să poată fi restaurată pe alt PC.
  function backup(pass) {
    const s = crypto.randomBytes(16);
    const k = crypto.scryptSync(pass, s, 32, SC);
    try { return Buffer.from(JSON.stringify({ v: 1, b: 1, salt: s.toString('base64'), ...seal(k, data) })); } finally { k.fill(0); }
  }
  function restore(buf, pass) {
    let obj;
    try {
      const j = JSON.parse(buf.toString('utf8'));
      if (!j.b) throw new Error('x');
      const bk=crypto.scryptSync(pass,b64(j.salt),32,SC); try { obj=open(bk,j); } finally { bk.fill(0); }
    } catch { throw new Error('Parolă greșită sau fișier corupt'); }
    if (!obj || !obj.holder || !Array.isArray(obj.docs)) throw new Error('Fișier de rezervă invalid');
    data = obj;
    save();
  }

  return { exists, isOpen, get, weak, attemptLog, create, unlock, changePin, lock, wipe, save, backup, restore };
};
