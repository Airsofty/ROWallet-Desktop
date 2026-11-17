'use strict';
// Credențiale în stil SD-JWT, cu emitent de TEST local (Ed25519).
// Nu este implementarea standardului european complet: aceasta e etapa 1, înainte de OpenID4VCI/OpenID4VP.
const crypto = require('crypto');

const u = (x) => Buffer.from(x).toString('base64url');
const ub = (x) => Buffer.from(x, 'base64url');
const sha = (x) => crypto.createHash('sha256').update(x).digest('base64url');
const keypair = () => {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('ed25519');
  return {
    pub: publicKey.export({ type: 'spki', format: 'der' }).toString('base64url'),
    priv: privateKey.export({ type: 'pkcs8', format: 'der' }).toString('base64url')
  };
};
const pubObj = (p) => crypto.createPublicKey({ key: ub(p), format: 'der', type: 'spki' });
const privObj = (p) => crypto.createPrivateKey({ key: ub(p), format: 'der', type: 'pkcs8' });
const jws = (h, p, priv) => {
  const s = u(JSON.stringify(h)) + '.' + u(JSON.stringify(p));
  return s + '.' + crypto.sign(null, Buffer.from(s), privObj(priv)).toString('base64url');
};
const jv = (t, pub) => {
  try {
    const [a, b, c] = String(t).split('.');
    if (!c) return null;
    return crypto.verify(null, Buffer.from(a + '.' + b), pubObj(pub), ub(c)) ? JSON.parse(ub(b)) : null;
  } catch { return null; }
};
const body = (t) => JSON.parse(ub(String(t).split('.')[1]));

const FIELDS = {
  ci: ['Nume', 'Prenume', 'Data nașterii', 'Cetățenie', 'Seria și numărul', 'Valabilă până la'],
  pc: ['Nume', 'Prenume', 'Data emiterii', 'Valabil până la', 'Numărul permisului', 'Categorii'],
  dp: ['Titular', 'Program', 'Titlu obținut', 'Anul absolvirii', 'Media'],
  'edu-bac': ['Titular','Instituția de învățământ','Denumirea studiilor / calificării','Anul absolvirii'],
  'edu-liceu': ['Titular','Instituția de învățământ','Denumirea studiilor / calificării','Anul absolvirii'],
  'edu-prof': ['Titular','Instituția de învățământ','Denumirea studiilor / calificării','Anul absolvirii'],
  'edu-calif': ['Titular','Instituția de învățământ','Denumirea studiilor / calificării','Anul absolvirii'],
  'edu-master': ['Titular','Instituția de învățământ','Denumirea studiilor / calificării','Anul absolvirii'],
  'edu-doctor': ['Titular','Instituția de învățământ','Denumirea studiilor / calificării','Anul absolvirii'],
  'edu-curs': ['Titular','Instituția de învățământ','Denumirea studiilor / calificării','Anul absolvirii']
};

function init(d) {
  d.holder = keypair();
  const k = keypair();
  d.issuer = { id: 'urn:rowallet-pc:issuer:' + crypto.randomBytes(4).toString('hex'), name: 'Date declarate personal (nesemnate oficial)', ...k };
  d.trusted = [{ id: d.issuer.id, name: d.issuer.name, pub: k.pub }];
  d.docs = [];
}

function normalize(type, input) {
  const base = FIELDS[type] || (/^other-[a-z0-9]{6,16}$/.test(type) ? ['Tip document','Titular','Instituția emitentă','Număr document','Data emiterii'] : /^edu-alt-[a-z0-9]{6,16}$/.test(type) ? ['Tip document','Titular','Instituția de învățământ','Denumirea studiilor / calificării','Anul absolvirii'] : null);
  if (!base) throw new Error('Tip de document necunoscut');
  const out = {};
  for (const k of base) {
    if (type === 'ci' && k === 'Peste 18 ani') continue;
    const v = String(input && input[k] !== undefined ? input[k] : '').trim().slice(0, 60);
    if (!v) throw new Error('Câmpul „' + k + '” nu poate fi gol');
    out[k] = v;
  }
  if (type === 'ci') {
    const m = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(out['Data nașterii']);
    if (!m) throw new Error('Data nașterii trebuie să fie în formatul ZZ.LL.AAAA');
    const [, dd, mm, yy] = m.map(Number), b = new Date(yy, mm - 1, dd), n = new Date();
    if (b.getFullYear() !== yy || b.getMonth() !== mm - 1 || b.getDate() !== dd || b > n) throw new Error('Data nașterii nu este validă');
    let age = n.getFullYear() - yy;
    if (n.getMonth() < mm - 1 || (n.getMonth() === mm - 1 && n.getDate() < dd)) age--;
    out['Peste 18 ani'] = age >= 18 ? 'Da' : 'Nu';
  }
  return out;
}

function issue(d, type, custom) {
  const claims = normalize(type, custom || {});
  if (!claims) throw new Error('Tip de document necunoscut');
  const disc = Object.entries(claims).map(([n, v]) => [u(crypto.randomBytes(16)), n, v]);
  const iat = Math.floor(Date.now() / 1000);
  const jwt = jws({ alg: 'EdDSA', typ: 'vc+sd-jwt' }, {
    iss: d.issuer.id, iat, exp: iat + 5 * 365 * 86400, vct: 'urn:rowallet:local-self-asserted:' + type,
    cnf: d.holder.pub, _sd: disc.map((x) => sha(u(JSON.stringify(x)))).sort()
  }, d.issuer.priv);
  d.docs = d.docs.filter((x) => x.id !== type);
  d.docs.push({ id: type, jwt, d: disc });
}

function list(d) {
  return d.docs.map((x) => {
    const p = body(x.jwt), t = d.trusted.find((k) => k.id === p.iss);
    return { id: x.id, local: true, ok: !!(t && jv(x.jwt, t.pub)), exp: p.exp * 1000, fields: x.d.map((e) => [e[1], e[2]]) };
  });
}

function present(d, id, names) {
  const doc = d.docs.find((x) => x.id === id);
  if (!doc) throw new Error('Document inexistent');
  const enc = doc.d.filter((e) => names.includes(e[1])).map((e) => u(JSON.stringify(e)));
  if (!enc.length) throw new Error('Alege cel puțin un câmp');
  const iat = Math.floor(Date.now() / 1000);
  const kb = jws({ alg: 'EdDSA', typ: 'kb+jwt' }, { iat, exp: iat + 60, sd_hash: sha([doc.jwt, ...enc].join('~')) }, d.holder.priv);
  return { code: 'RW1.' + u(JSON.stringify({ j: doc.jwt, d: enc, k: kb })), exp: (iat + 60) * 1000 };
}

function verify(d, code) {
  const r = { ok: false, errors: [], claims: [], issuer: null, left: 0 };
  try {
    if (!code.startsWith('RW1.')) throw new Error('Format necunoscut');
    const o = JSON.parse(ub(code.slice(4)));
    const p = body(o.j);
    const t = d.trusted.find((k) => k.id === p.iss);
    if (!t) r.errors.push('Emitent necunoscut (nu e în lista de încredere)');
    else { r.issuer = t.name; if (!jv(o.j, t.pub)) r.errors.push('Semnătura emitentului este invalidă'); }
    if (p.exp * 1000 < Date.now()) r.errors.push('Documentul a expirat');
    for (const e of o.d) {
      if (!p._sd.includes(sha(e))) { r.errors.push('Date modificate sau nesemnate de emitent'); continue; }
      const x = JSON.parse(ub(e));
      r.claims.push([x[1], x[2]]);
    }
    const kb = jv(o.k, p.cnf);
    if (!kb) r.errors.push('Dovada de posesie invalidă');
    else {
      if (kb.sd_hash !== sha([o.j, ...o.d].join('~'))) r.errors.push('Codul nu corespunde datelor trimise');
      r.left = Math.max(0, kb.exp * 1000 - Date.now());
      if (r.left <= 0) r.errors.push('Codul a expirat');
    }
  } catch (e) { r.errors.push('Cod ilizibil sau corupt'); }
  r.ok = r.errors.length === 0 && r.claims.length > 0; r.localOnly = true;
  return r;
}

// Lista de emitenți de încredere: permite verificarea codurilor venite de la alt calculator.
const trustExport = (d) => ({ id: d.issuer.id, name: d.issuer.name, pub: d.issuer.pub });
const trustList = (d) => d.trusted.map((t) => ({ id: t.id, name: t.name, own: t.id === d.issuer.id }));
function trustImport(d, o) {
  if (!o || typeof o.id !== 'string' || typeof o.pub !== 'string' || typeof o.name !== 'string') throw new Error('Format de cheie invalid');
  if (!/^urn:[\w:.\-]{3,90}$/.test(o.id)) throw new Error('Identificator de emitent invalid');
  try { if (pubObj(o.pub).asymmetricKeyType !== 'ed25519') throw 0; } catch { throw new Error('Cheia publică nu este validă'); }
  const ex = d.trusted.find((t) => t.id === o.id);
  if (ex) { if (ex.pub === o.pub) return 'exists'; throw new Error('Există deja un emitent cu acest identificator și altă cheie'); }
  d.trusted.push({ id: o.id, name: o.name.slice(0, 60), pub: o.pub });
  return 'added';
}
function trustRemove(d, id) {
  if (id === d.issuer.id) throw new Error('Emitentul propriu nu poate fi eliminat');
  d.trusted = d.trusted.filter((t) => t.id !== id);
}

module.exports = { init, issue, normalize, list, present, verify, trustExport, trustList, trustImport, trustRemove, FIELDS };
