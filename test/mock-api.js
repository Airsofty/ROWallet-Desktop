// Doar pentru previzualizare în browser (nu face parte din program). Date simulate, fără criptografie reală.
(() => {
  if (window.api) return;
  const TEST = {
    ci: { 'Nume': 'POPESCU', 'Prenume': 'Ion', 'Data nașterii': '14.03.1996', 'Cetățenie': 'Română', 'Seria și numărul': 'TM 123456', 'Valabilă până la': '14.03.2034', 'Peste 18 ani': 'Da' },
    pc: { 'Nume': 'POPESCU', 'Prenume': 'Ion', 'Data emiterii': '02.06.2016', 'Valabil până la': '02.06.2031', 'Numărul permisului': 'TM-0451289', 'Categorii': 'B' },
    dp: { 'Titular': 'Ion POPESCU', 'Program': 'Informatică', 'Titlu obținut': 'Licențiat', 'Anul absolvirii': '2019', 'Media': '9,12' }
  };
  const day = 864e5, codes = {};
  let open = false; const S = {};
  let H = [
    { w: 'Cod generat · Recepție', a: 'Nume, Prenume, Seria și numărul, Cetățenie', d: new Date(Date.now() - day).toISOString() },
    { w: 'Cod generat · Peste 18 ani', a: 'Peste 18 ani', d: new Date(Date.now() - 5 * day).toISOString() }
  ];
  const docsOf = () => Object.entries(TEST).map(([id, c]) => ({ id, ok: true, exp: Date.now() + 3e11, fields: Object.entries(c) }));
  function qr(seed) {
    let h = 2166136261; for (const ch of seed) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); }
    const r = () => { h ^= h << 13; h ^= h >>> 17; h ^= h << 5; return (h >>> 0) / 4294967296; };
    const N = 25; let s = '';
    const fin = (a, b) => { for (let i = 0; i < 7; i++) for (let j = 0; j < 7; j++) { const e = i === 0 || j === 0 || i === 6 || j === 6, m = i >= 2 && i <= 4 && j >= 2 && j <= 4; if (e || m) s += `<rect x="${a + i}" y="${b + j}" width="1" height="1"/>`; } };
    const inF = (i, j) => (i < 8 && j < 8) || (i > N - 9 && j < 8) || (i < 8 && j > N - 9);
    for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) if (!inF(i, j) && r() > .52) s += `<rect x="${i}" y="${j}" width="1" height="1"/>`;
    fin(0, 0); fin(N - 7, 0); fin(0, N - 7);
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 27 27" shape-rendering="crispEdges"><rect x="-1" y="-1" width="27" height="27" fill="#fff"/><g fill="#0b1230">${s}</g></svg>`;
  }
  window.api = {
    profile: async () => ({ok:true,profile:{name:'Andrei Test',photo:null}}), fileList:async()=>({ok:true,files:[]}),audit:async()=>({ok:true,entries:[]}),
    status: async () => ({ exists: true, open, weak: false, preview: true }),
    create: async () => ({ ok: true }),
    unlock: async (p) => { if (p === '123456') { open = true; return { ok: true }; } return { ok: false, left: 4 }; },
    lock: async () => { open = false; return { ok: true }; },
    list: async () => ({ ok: true, docs: docsOf() }),
    history: async () => ({ ok: true, hist: H }),
    present: async (id, names, pu) => {
      const code = 'RW1.' + Math.random().toString(36).slice(2) + Date.now().toString(36);
      codes[code] = { id, names, t: Date.now() };
      H = [{ w: 'Cod generat · ' + pu, a: names.join(', '), d: new Date().toISOString() }, ...H];
      return { ok: true, code, exp: Date.now() + 60000, qr: qr(code) };
    },
    verify: async (code) => {
      const c = codes[String(code).trim()], res = { ok: false, errors: [], claims: [], issuer: null, left: 0 };
      if (!c) res.errors.push('Cod ilizibil sau corupt');
      else {
        res.issuer = 'Emitent de test (local)'; res.left = Math.max(0, c.t + 60000 - Date.now());
        if (!res.left) res.errors.push('Codul a expirat');
        res.claims = c.names.map((n) => [n, TEST[c.id][n]]);
      }
      res.ok = !res.errors.length; return { ok: true, res };
    },
    clearHistory: async () => { H = []; return { ok: true }; },
    wipe: async () => ({ ok: true }),
    exportBackup: async () => ({ ok: false, err: 'Indisponibil în previzualizare' }),
    importBackup: async () => ({ ok: false, err: 'Indisponibil în previzualizare' }),
    changePin: async () => ({ ok: true }),
    issue: async (id, v) => { Object.assign(TEST[id], v); return { ok: true }; },
    trustList: async () => ({ ok: true, list: [{ id: 'urn:rowallet-pc:issuer:previzualizare', name: 'Emitent de test (local)', own: true }] }),
    trustExport: async () => ({ ok: true, t: { id: 'urn:rowallet-pc:issuer:previzualizare', name: 'Emitent de test (local)', pub: 'previzualizare' } }),
    trustImport: async () => ({ ok: false, err: 'Indisponibil în previzualizare' }),
    trustRemove: async () => ({ ok: false, err: 'Indisponibil în previzualizare' }),
    saveCode: async () => ({ ok: false, err: 'Indisponibil în previzualizare' }),
    openCode: async () => ({ ok: false, err: 'Indisponibil în previzualizare' }),
    settings: async () => ({ ok: true, s: S }),
    setSetting: async (k, v) => { S[k] = v; return { ok: true }; },
    copy: async (t) => { try { await navigator.clipboard.writeText(t); } catch (e) {} return { ok: true }; },
    act: () => {}, onLocked: () => {}
  };
})();
