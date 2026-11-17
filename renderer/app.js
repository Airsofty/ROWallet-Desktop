'use strict';
// Elemente grafice: iconițe, logo simplificat, embleme schițate
const IC={wallet:'M4 7h14a2 2 0 012 2v9a2 2 0 01-2 2H6a2 2 0 01-2-2z M4 7V6a2 2 0 012-2h11 M15.5 14h2.5',qr:'M4 4h6v6H4z M14 4h6v6h-6z M4 14h6v6H4z M14 14h2v2h-2z M18 14v2 M14 18h2v2 M18 18h2v2',user:'M12 21a9 9 0 100-18 9 9 0 000 18z M12 12a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4z M6.5 18.5a7 7 0 0111 0',tx:'M7 3h8l4 4v14H7z M10 12h6 M10 16h6',gear:'M12 15a3 3 0 100-6 3 3 0 000 6z M19 12c0-.4 0-.8-.1-1.2l2-1.5-2-3.4-2.3.9a7 7 0 00-2-1.2L14.2 3H9.8l-.4 2.6a7 7 0 00-2 1.2l-2.3-.9-2 3.4 2 1.5A7 7 0 005 12c0 .4 0 .8.1 1.2l-2 1.5 2 3.4 2.3-.9a7 7 0 002 1.2l.4 2.6h4.4l.4-2.6a7 7 0 002-1.2l2.3.9 2-3.4-2-1.5c.1-.4.1-.8.1-1.2z',bell:'M6 16v-5a6 6 0 0112 0v5l2 2H4z M10 21h4',back:'M15 5l-7 7 7 7',chev:'M9 5l7 7-7 7',fp:'M6 10a6 6 0 0112 0v3 M9 20c0-4 0-7 3-7s3 3 3 7 M4 14c0 3 .5 5 1 6 M12 10v3 M18 14c0 2-.2 4-.8 6',check:'M5 12l5 5 9-10',del:'M20 6H9l-5 6 5 6h11z M12 10l4 4 M16 10l-4 4'};
const ico=k=>`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${IC[k]}"/></svg>`;
const logo=()=>`<svg viewBox="0 0 150 80" aria-hidden="true"><rect x="4" y="8" width="72" height="64" rx="16" fill="#1647ae"/><path d="M21 25h16q13 0 13 12t-13 12H21V25zm9 9v7h7q5 0 5-4t-5-3z M52 25h8l-8 24h-9z" fill="#fff"/><text x="85" y="53" font-size="27" font-weight="bold" fill="#1647ae" font-family="sans-serif">RW</text></svg>`;
const originalSplashLogo=()=>{let s='';for(let i=0;i<12;i++){const a=i*Math.PI/6;s+=`<circle cx="${95+11*Math.sin(a)}" cy="${40-11*Math.cos(a)}" r="1.5" fill="#f5c542"/>`}
return `<svg viewBox="0 0 150 80" aria-hidden="true"><circle cx="27" cy="11" r="6" fill="#1b46c8"/><path d="M8 22h46l-7 33q-2 9-11 9H26q-9 0-11-9z" fill="#1b46c8"/><path d="M29 34l14 22H27z" fill="#e5634d"/><path d="M29 34h22l-8 22z" fill="#f5c542"/><path d="M62 16q12-6 20 5l32-12q10-2 8 8l-6 30q-3 13-18 13H72q-12 0-14-12z" fill="#1b46c8"/>${s}</svg>`};
const em={
 ci:'<svg viewBox="0 0 40 44"><path d="M20 2l16 5v13c0 11-7 19-16 22C11 39 4 31 4 20V7z" fill="#f2c230" stroke="#b88a12" stroke-width="1.5"/><polygon points="20,10.500 22.300,16 28.200,16.500 23.700,20.400 25.100,26.200 20,23.100 14.900,26.200 16.300,20.400 11.800,16.500 17.700,16" fill="#c94a2e"/></svg>',
 pc:'<svg viewBox="0 0 40 44"><rect x="0" y="9" width="40" height="27" fill="#1b3fa8"/><rect x="0" y="9" width="40" height="27" fill="none" stroke="#fff" stroke-width="1"/>'+(()=>{let s='';for(let i=0;i<12;i++){const a=i*Math.PI/6;s+=`<circle cx="${20+9.500*Math.sin(a)}" cy="${22.500-9.500*Math.cos(a)}" r="1.100" fill="#f5c542"/>`}return s})()+'<text x="20" y="25" font-size="7.500" font-weight="700" text-anchor="middle" fill="#fff" font-family="sans-serif">RO</text></svg>',
 dp:'<svg viewBox="0 0 40 44"><path d="M20 2l16 5v13c0 11-7 19-16 22C11 39 4 31 4 20V7z" fill="#1d4bb8" stroke="#f2c230" stroke-width="2"/><path d="M20 11l2.600 5.500 6 .8-4.400 4.100 1.100 6-5.300-2.900-5.300 2.900 1.100-6-4.400-4.100 6-.8z" fill="#f2c230"/></svg>'};
const ring = (sz) => { let s = ''; for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; s += `<text x="${50 + 37 * Math.sin(a)}" y="${50 - 37 * Math.cos(a)}" font-size="17" text-anchor="middle" dominant-baseline="central" fill="#fcd116">★</text>`; } return `<svg viewBox="0 0 100 100" width="${sz}" height="${sz}" aria-hidden="true">${s}</svg>`; };
Object.assign(IC, {lock:'M6 11h12v9H6z M8 11V8a4 4 0 018 0v3',shield:'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z M9 12l2 2 4-4',docs:'M6 3h9l4 4v14H6z M14 3v5h5',share:'M4 12v7h16v-7 M12 16V3 M7 8l5-5 5 5',moon:'M20 14A8 8 0 1110 4a6.5 6.5 0 0010 10z',sun:'M12 16a4 4 0 100-8 4 4 0 000 8z M12 2v2 M12 20v2 M4.9 4.9l1.4 1.4 M17.7 17.7l1.4 1.4 M2 12h2 M20 12h2 M4.9 19.1l1.4-1.4 M17.7 6.3l1.4-1.4'});

const $ = (s) => document.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const T = {
  ci: { cls: 'c1', t: 'Cartea electronică de identitate', s: 'Carte de identitate', iss: 'Date introduse local' },
  pc: { cls: 'c2', t: 'Permis de conducere', s: 'Permis de conducere', iss: 'Date introduse local' },
  dp: { cls: 'c3', t: 'Diplomă de licență', s: 'Diplomă de licență', iss: 'Date introduse local' }
};
const EDUCATION_TYPES = {
  'edu-bac': 'Diplomă de bacalaureat', 'edu-liceu': 'Diplomă de absolvire a liceului',
  'edu-prof': 'Certificat școală profesională', 'edu-calif': 'Certificat de calificare',
  'edu-master': 'Diplomă de master', 'edu-doctor': 'Diplomă de doctorat',
  'edu-curs': 'Certificat de absolvire a unui curs', 'edu-alt': 'Alt document educațional'
};
const DOC_TYPES = {ci:'Carte de identitate',pc:'Permis de conducere',dp:'Diplomă de licență',...EDUCATION_TYPES,'other':'Alt document'};
const SCHOOL_FIELDS = ['Titular','Instituția de învățământ','Denumirea studiilor / calificării','Anul absolvirii'];
const OTHER_FIELDS = ['Tip document','Titular','Instituția emitentă','Număr document','Data emiterii'];
const DOC_SCHEMAS = {
  ci:['Nume','Prenume','Data nașterii','Cetățenie','Seria și numărul','Valabilă până la'],
  pc:['Nume','Prenume','Data emiterii','Valabil până la','Numărul permisului','Categorii'],
  dp:['Titular','Program','Titlu obținut','Anul absolvirii','Media']
};
const docMeta = (d) => T[d.id] || {cls:'c3',t: ((d.fields.find(f=>f[0]==='Tip document')||[])[1] || DOC_TYPES[d.id] || 'Document personal'),s:((d.fields.find(f=>f[0]==='Tip document')||[])[1] || DOC_TYPES[d.id] || 'Document personal'),iss:'Date introduse local'};
const presetsFor = (id) => P[id] || [['Toate datele',null]];
let addPage=false, addType='ci';
let dragId=null;
const P = {
  ci: [['Recepție', ['Nume', 'Prenume', 'Seria și numărul', 'Cetățenie']], ['Peste 18 ani', ['Peste 18 ani']], ['Toate datele', null]],
  pc: [['Închiriere auto', ['Nume', 'Prenume', 'Categorii', 'Valabil până la']], ['Toate datele', null]],
  dp: [['Angajare', ['Titular', 'Titlu obținut', 'Anul absolvirii']], ['Toate datele', null]]
};
const TITLES = { wallet: 'Documentele mele', qr: 'Prezintă un document', ver: 'Verifică un cod', tx: 'Tranzacții', acc: 'Contul meu' };
let docs = [], hist = [], tab = 'wallet', det = null, qd = 'ci', qp = 0, sel = new Set(), out = null, vres = null, vtxt = '';
let trusted = [], scanning = false, stream = null, scanTm = null;
let profile = {name:'',photo:null}, files = [], audit = [], language = 'ro', showSensitive = false, highContrast = false;
let passMode = true;
let theme = 'system', pin = '', lm = 'unlock', first = '', tm = null, st = {}, busy = false;

function toast(m) { const t = $('#toast'); t.textContent = translateText(m); t.classList.add('on'); clearTimeout(toast.h); toast.h = setTimeout(() => t.classList.remove('on'), 2400); }
const fmt = (iso) => { try { return new Date(iso).toLocaleString(language==='en'?'en-GB':'ro-RO', { dateStyle: 'short', timeStyle: 'short' }); } catch { return ''; } };
const docOf = (id) => docs.find((x) => x.id === id);
const nameOf = (f) => { const g = (n) => (f.find((r) => r[0] === n) || [])[1]; return g('Titular') || ((g('Prenume') || '') + ' ' + (g('Nume') || '')); };
const allOf = (d) => d.fields.map((f) => f[0]);
const preSet = (id, i) => new Set(presetsFor(id)[i][1] || allOf(docOf(id)));


// Translation happens only at the presentation layer: signed field names,
// QR payloads and personal values stay byte-for-byte unchanged.
const translateText = (text) => ROWalletI18n.translate(text, language);
function translateDOM(root=document) { ROWalletI18n.dom(root, language); }
function displayField(name) { return translateText(name); }
const confirmDelete = text => text != null && ['STERGE','DELETE'].includes(ROWalletI18n.ascii(text).trim().toUpperCase());
const TH = { system: 'Sistem', light: 'Luminos', dark: 'Întunecat' };
function applyTheme(v) { const r = document.documentElement; if (v === 'light' || v === 'dark') r.dataset.theme = v; else delete r.dataset.theme; theme = v === 'light' || v === 'dark' ? v : 'system'; }
const isDark = () => theme === 'dark' || (theme === 'system' && matchMedia('(prefers-color-scheme:dark)').matches);
function consent(d, names, purpose) {
  return new Promise((res) => {
    const x = $('#dlg');
    x.innerHTML = `<form method="dialog"><h3>Confirmi partajarea?</h3><div class="cs"><div class="row"><span>Document</span><b>${esc(translateText(docMeta(d).s))}</b></div><div class="row"><span>Scop</span><b>${esc(purpose)}</b></div><div class="row"><span>Date trimise</span><b>${esc(names.map(displayField).join(', '))}</b></div><div class="row"><span>Cod valabil</span><b>60 de secunde</b></div></div><p>Acțiunea se înregistrează în Tranzacții. Cealaltă parte nu primește niciun alt câmp.</p><div class="dr"><button type="button" class="btn ghost" id="dc">Anulează</button><button type="submit" class="btn" value="ok">Confirmă</button></div></form>`;
    $('#dc').onclick = () => x.close('x');
    x.onclose = () => { const v = x.returnValue === 'ok'; x.innerHTML = ''; x.returnValue = ''; res(v); };
    translateDOM(x); x.showModal();
  });
}
function form(title, hint, fields) {
  return new Promise((res) => {
    const d = $('#dlg');
    d.innerHTML = `<form method="dialog"><h3>${esc(translateText(title))}</h3><p>${esc(translateText(hint))}</p>${fields.map((f, i) => `<label class="fl2"><span>${esc(displayField(f[0]))}</span><input id="f${i}" value="${esc(f[1])}" maxlength="60" autocomplete="off" spellcheck="false"></label>`).join('')}<div class="dr"><button type="button" class="btn ghost" id="dc">Anulează</button><button type="submit" class="btn" value="ok">Salvează</button></div></form>`;
    $('#dc').onclick = () => d.close('x');
    d.onclose = () => { let v = null; if (d.returnValue === 'ok') { v = {}; fields.forEach((f, i) => { v[f[0]] = $('#f' + i).value; }); } d.innerHTML = ''; d.returnValue = ''; res(v); };
    translateDOM(d); d.showModal(); $('#f0').focus();
  });
}
function stopScan() { clearTimeout(scanTm); if (stream) { stream.getTracks().forEach((t) => t.stop()); stream = null; } scanning = false; }
function scanLoop() {
  const v = $('#cam');
  if (!scanning || !v) return;
  if (v.readyState >= 2 && v.videoWidth) {
    const c = document.createElement('canvas'); c.width = v.videoWidth; c.height = v.videoHeight;
    const x = c.getContext('2d', { willReadFrequently: true }); x.drawImage(v, 0, 0);
    const im = x.getImageData(0, 0, c.width, c.height);
    const r = jsQR(im.data, c.width, c.height, { inversionAttempts: 'attemptBoth' });
    if (r && r.data && r.data.startsWith('RW1.')) { stopScan(); A.verifyText(r.data); return; }
  }
  scanTm = setTimeout(scanLoop, 150);
}
function ask(title, hint, pw = true) {
  return new Promise((res) => {
    const d = $('#dlg');
    d.innerHTML = `<form method="dialog"><h3>${esc(translateText(title))}</h3><p>${esc(translateText(hint))}</p><input id="di" type="${pw ? 'password' : 'text'}" autocomplete="off" spellcheck="false"><div class="dr"><button type="button" class="btn ghost" id="dc">Anulează</button><button type="submit" class="btn" value="ok">Continuă</button></div></form>`;
    $('#dc').onclick = () => d.close('x');
    d.onclose = () => { const v = d.returnValue === 'ok' ? $('#di').value : null; d.innerHTML = ''; d.returnValue = ''; res(v); };
    translateDOM(d); d.showModal(); $('#di').focus();
  });
}

const card = (d, btn) => {
  const x = docMeta(d);
  const inner = `<span class="ct">${esc(translateText(x.t))}</span><span class="em">${d.id==='ci' && profile.photo ? `<img src="${profile.photo}" alt="Fotografie utilizator" style="width:52px;height:62px;object-fit:cover;border-radius:5px">` : (em[d.id] || em.dp)}</span><span class="tl">Titular<b data-i18n-raw>${esc(nameOf(d.fields))}</b></span>${btn ? `<span class="cv">${ico('chev')}</span>` : ''}<span class="is">Date autodeclarate · ${d.ok ? 'semnătură locală validă' : 'semnătură invalidă'}</span>`;
  return btn ? `<button class="cd ${x.cls}" data-a="open" data-p="${d.id}" draggable="true" aria-label="Deschide ${esc(translateText(x.t))}">${inner}</button>` : `<div class="cd ${x.cls}">${inner}</div>`;
};

function sidebar() {
  const n = [['wallet', 'Portofel', 'wallet'], ['qr', 'Cod QR', 'qr'], ['ver', 'Verifică', 'shield'], ['tx', 'Tranzacții', 'tx'], ['acc', 'Contul meu', 'user']];
  return `<aside class="sb"><div class="brand">${logo()}<div><small>Portofel privat</small><b>ROWallet</b></div></div><nav aria-label="Meniu principal">${n.map((t) => `<button class="nv" aria-current="${tab === t[0] && !det}" data-a="tab" data-p="${t[0]}">${ico(t[2])}<span>${t[1]}</span></button>`).join('')}</nav><div class="sp"></div><div class="roeu"><i aria-hidden="true"></i><span>România</span><span class="eu" aria-hidden="true">${ring(18)}</span><span>Independent · offline</span></div><div class="me"><div class="av">${profile.photo ? `<img class="avatar-photo" src="${profile.photo}" alt="">` : 'RW'}</div><div><b data-i18n-raw>${esc(profile.name || 'ROWallet')}</b><small>Seif criptat local</small></div></div><button class="nv" data-a="lock">${ico('lock')}<span>Blochează</span></button></aside>`;
}
const topbar = () => `<header class="tp">${addPage ? `<button class="bk" data-a="cancelAdd">${ico('back')}Document nou</button>` : det ? `<button class="bk" data-a="back">${ico('back')}${esc(translateText(docMeta(docOf(det)).t))}</button>` : `<h1>${esc(translateText(TITLES[tab]))}</h1>`}<div class="hb"><button class="ic tg" data-a="theme" aria-label="Schimbă aspectul. Acum: ${esc(translateText(TH[theme]))}">${ico(isDark() ? 'moon' : 'sun')}<span>${esc(translateText(TH[theme]))}</span></button><button class="ic" data-a="note" aria-label="Notificări">${ico('bell')}</button><button class="ic" data-a="tab" data-p="acc" aria-label="Setări">${ico('gear')}</button></div></header>`;

function render() {
  clearInterval(tm);
  const f = document.activeElement, fk = f && (f.dataset.a || f.dataset.c) ? (f.dataset.a || f.dataset.c) + '|' + (f.dataset.p || '') : null;
  const sc = ($('.pg') || {}).scrollTop || 0;
  const body = addPage ? vAdd() : det ? vDet() : { wallet: vWallet, qr: vQR, ver: vVer, tx: vTx, acc: vAcc }[tab]();
  $('#app').innerHTML = `<button class="skip" data-a="skip">Sari la conținut</button>` + sidebar() + `<div class="mn">${topbar()}<main class="pg" id="main" tabindex="-1">${body}</main></div>`;
  $('.pg').scrollTop = sc;
  if (fk) { const el = [...document.querySelectorAll('[data-a],[data-c]')].find((e) => (e.dataset.a || e.dataset.c) + '|' + (e.dataset.p || '') === fk); if (el) el.focus(); }
  if (scanning && stream) { const v = $('#cam'); if (v) { v.srcObject = stream; v.play().catch(() => {}); } }
  if (tab === 'qr' && !det && out) timer();
  translateDOM($('#app'));
  document.documentElement.classList.toggle('contrast', highContrast);
  const af = $('#addDocForm'); if (af) af.addEventListener('submit', async e=>{e.preventDefault();await A.saveNewDocument();});
  const v = $('#vin'); if (v) { v.addEventListener('input', () => { vtxt = v.value; }); v.addEventListener('keydown', (e) => { if(e.key==='Enter' && v.value.trim().startsWith('RW1.')) {e.preventDefault();A.verifyText(v.value.trim());} }); }
}

function vAdd() {
 const typeOptions=Object.entries(DOC_TYPES).map(([id,name])=>`<option value="${esc(id)}" ${addType===id?'selected':''}>${esc(translateText(name))}</option>`).join('');
 const schema=DOC_SCHEMAS[addType] || (addType==='other' ? OTHER_FIELDS : addType==='edu-alt' ? ['Tip document',...SCHOOL_FIELDS] : SCHOOL_FIELDS);
 const isEdu = addType.startsWith('edu-') || addType==='dp';
 return `<section class="add-screen"><div class="add-intro"><h2>Adaugă un document</h2><p class="hint">Completează datele reale. Documentul va apărea ca un card în portofelul tău, fără schimbarea designului.</p></div>
 <form id="addDocForm" class="panel add-panel"><div class="add-step">01 <span>Alege tipul de document</span></div><label class="add-field"><span>Tip document</span><select id="addKind" aria-label="Tip document">${typeOptions}</select></label>
 ${isEdu ? '<p class="hint">Poți adăuga diplome de liceu, bacalaureat, școală profesională, facultate sau cursuri. Nu trebuie să ai o diplomă de licență.</p>' : ''}
 <div class="add-step">02 <span>Completează informațiile</span></div><div class="add-fields">${schema.map((key,i)=>`<label class="add-field"><span>${esc(displayField(key))}</span><input id="addF${i}" name="${esc(key)}" maxlength="60" autocomplete="off" spellcheck="false" required placeholder="${esc(displayField(key))}"></label>`).join('')}</div>
 <p class="hint">Datele sunt stocate criptat local. Adăugarea lor nu constituie verificare oficială de identitate.</p><div class="add-bottom"><button class="btn ghost" type="button" data-a="cancelAdd">Anulează</button><button class="btn" type="submit">Salvează documentul</button></div></form></section>`;
}
function vWallet() {
  const recent = hist.slice(0, 3);
  return `<div class="stats"><div>${ico('docs')}<p style="margin:0"><b>${docs.length}</b><span>documente active</span></p></div><div>${ico('share')}<p style="margin:0"><b>${hist.length}</b><span>partajări înregistrate</span></p></div><div>${ico('shield')}<p style="margin:0"><b>0</b><span>alerte de securitate</span></p></div></div>
  <div class="wallet-actions"><button class="btn" data-a="addDocument">+ Adaugă document</button><span class="hint">Trage cardurile pentru reordonare. Documentele sunt autodeclarate, nu verificate oficial.</span></div><div class="cg" id="docGrid">${docs.map((x) => card(x, true)).join('')}</div>
  <div class="two"><div><h2>Activitate recentă</h2><div class="panel">${recent.length ? recent.map((h) => `<div class="row"><span>${esc(translateText(h.w))}</span><b>${fmt(h.d)}</b></div>`).join('') : '<div class="row"><span>Nicio activitate încă.</span></div>'}</div></div>
  <div><h2>Securitate</h2><div class="panel"><div class="row"><span>Seif criptat local</span><span class="badge">Activ</span></div><div class="row"><span>Rețea</span><b>Blocată</b></div><div class="row"><span>Blocare automată</span><b>5 minute</b></div></div></div></div>`;
}
function vDet() {
  const d = docOf(det); if (!d) {det=null;return vWallet();}
  return `<div class="two w"><div><div style="max-width:460px">${card(d, false)}</div><div class="acts"><button class="btn" data-a="share" data-p="${d.id}">Partajează cu cod QR</button><button class="btn ghost" data-a="edit" data-p="${d.id}">Editează datele</button><button class="btn ghost" data-a="watermark" data-p="${d.id}">Copie cu filigran</button><button class="btn ghost" data-a="sensitive">${showSensitive?'Ascunde seria':'Afișează seria'}</button><button class="btn ghost danger" data-a="removeDoc" data-p="${d.id}">Elimină document</button><button class="btn ghost" data-a="back">Înapoi</button></div></div>
  <div class="panel"><div class="row"><b style="font-size:17px">${esc(translateText(docMeta(d).s))}</b><span class="badge ${d.ok ? '' : 'bad'}">${d.ok ? '✓ Semnătură locală validă' : '✗ Semnătură invalidă'}</span></div>${d.fields.map((r) => `<div class="row"><span>${esc(displayField(r[0]))}</span><b data-i18n-raw>${!showSensitive && /serie|număr|serial|number/i.test(r[0]) ? '••••••' : esc(r[1])}</b></div>`).join('')}<div class="row"><span>Origine</span><b>Adăugat de utilizator, fără verificare oficială</b></div><div class="row"><span>Expiră la</span><b>${new Date(d.exp).toLocaleDateString(language==='en'?'en-GB':'ro-RO')}</b></div></div></div>`;
}
function vQR() {
  const d = docOf(qd) || docs[0];
  if(d && d.id !== qd){qd=d.id;qp=0;sel=preSet(qd,0);out=null;}
  if (!d) return '<div class="empty">Niciun document. Adaugă mai întâi date în Portofel.</div>';
  const left = `<div class="panel p"><h2>1. Alege documentul</h2><div class="chips">${docs.map((x) => `<button data-a="pick" data-p="${x.id}" aria-pressed="${x.id === d.id}">${esc(translateText(docMeta(x).s))}</button>`).join('')}</div>
  <h2>2. Alege ce trimiți</h2><div class="chips">${presetsFor(d.id).map((p, i) => `<button data-a="pre" data-p="${i}" aria-pressed="${i === qp}">${esc(translateText(p[0]))}</button>`).join('')}</div>
  <div>${d.fields.map((f) => `<label class="chk"><input type="checkbox" data-c="tg" data-p="${esc(f[0])}" ${sel.has(f[0]) ? 'checked' : ''}>${esc(displayField(f[0]))}<em data-i18n-raw>${esc(f[1])}</em></label>`).join('')}</div>
  <div class="acts"><button class="btn" data-a="gen">${out ? 'Generează cod nou' : 'Generează cod'}</button></div></div>`;
  const right = out
    ? `<div class="qrc">${out.qr ? `<div class="qs">${out.qr}</div>` : ''}<div class="pb"><i id="bar" style="width:100%"></i></div><b id="left" style="font-size:17px"></b><p style="margin:8px 0 0;color:var(--mute);font-size:13.5px">${language==='en'?'Sharing':'Se trimit'} ${out.n} ${language==='en'?(out.n===1?'field':'fields'):(out.n===1?'camp':'campuri')}: ${esc(out.names.map(displayField).join(', '))}.${out.qr ? '' : ' '+translateText('Pentru QR rulează npm install.')}</p><textarea class="code" readonly rows="3" aria-label="Cod de prezentare">${esc(out.code)}</textarea><div class="acts"><button class="btn ghost" data-a="copy">Copiază codul (se șterge din clipboard în 60 s)</button><button class="btn ghost" data-a="fsave">Salvează în fișier</button></div></div>`
    : `<div class="empty"><b style="display:block;font-size:17px;color:var(--ink);margin-bottom:6px">Codul tău apare aici</b>Alege documentul și datele, apoi apasă Generează cod. Codul expiră după 60 de secunde.</div>`;
  return `<div class="two">${left}<div>${right}</div></div>`;
}
function vVer() {
  let r = `<div class="empty"><b style="display:block;font-size:17px;color:var(--ink);margin-bottom:6px">Rezultatul apare aici</b>Lipește un cod primit de la un client și apasă Verifică.</div>`;
  if (vres) {
    r = `<div class="panel"><div class="row"><b>${vres.ok ? '<span class="badge">✓ Valid local (nu oficial)</span>' : '<span class="badge bad">✗ Invalid</span>'}</b><span>${vres.issuer ? esc(vres.issuer) : ''}</span></div>` +
      vres.errors.map((e) => `<div class="row"><span style="color:var(--bad)">${esc(translateText(e))}</span></div>`).join('') +
      vres.claims.map((c) => `<div class="row"><span>${esc(displayField(c[0]))}</span><b data-i18n-raw>${esc(c[1])}</b></div>`).join('') +
      (vres.ok ? `<div class="row"><span>Cod valabil încă</span><b>${Math.ceil(vres.left / 1000)} s</b></div>` : '') + '</div>';
  }
  return `<div class="two"><div class="panel p"><h2>Cod primit</h2>${scanning ? '<video id="cam" class="cam" playsinline muted aria-label="Imagine de la cameră"></video>' : ''}<textarea id="vin" class="code" rows="9" spellcheck="false" placeholder="Lipește aici codul (începe cu RW1.)">${esc(vtxt)}</textarea><div class="acts"><button class="btn" data-a="verify">Verifică</button><button class="btn ghost" data-a="scan">${scanning ? 'Oprește camera' : 'Scanează cu camera'}</button><button class="btn ghost" data-a="fopen">Deschide fișier</button><button class="btn ghost" data-a="scanImage">Scanează imagine QR</button><button class="btn ghost" data-a="vclr">Șterge</button></div><p class="hint">Acceptă coduri QR transmise de camera web, imagini, fișiere sau scanere USB de tip tastatură. Verificarea locală nu dovedește emiterea de către stat.</p></div><div>${r}</div></div>`;
}
const vTx = () => `<div class="panel" style="padding-top:6px">${hist.length ? `<table><thead><tr><th>Operațiune</th><th>Date partajate</th><th>Data</th></tr></thead><tbody>${hist.map((h) => `<tr><td><b>${esc(translateText(h.w))}</b></td><td>${esc(h.a.split(', ').map(displayField).join(', '))}</td><td>${fmt(h.d)}</td></tr>`).join('')}</tbody></table>` : '<div class="row"><span>Nu ai nicio tranzacție.</span></div>'}</div>`;
function vAcc() {
  return `<div class="two"><div><div class="panel p"><div class="prof"><div class="av">${profile.photo ? `<img class="avatar-photo" src="${profile.photo}" alt="Fotografie profil">` : 'RW'}</div><div><b data-i18n-raw>${esc(profile.name || 'ROWallet')}</b><span class="badge" style="margin-top:6px">✓ Seif criptat local</span></div></div><p class="hint" style="margin:0">Fotografia este stocată criptat pe acest PC; nu verifică automat identitatea.</p><div class="acts"><button class="btn ghost" data-a="setName">Editează nume</button><button class="btn ghost" data-a="photo">Alege fotografie</button><button class="btn ghost" data-a="photoRemove">Șterge fotografia</button></div></div>
  <div class="panel p"><h2>Limbă</h2><div class="chips"><button data-a="setLanguage" data-p="ro" aria-pressed="${language==='ro'}">Română</button><button data-a="setLanguage" data-p="en" aria-pressed="${language==='en'}">Engleză</button></div><h2>Aspect</h2><div class="chips" role="group" aria-label="Aspect">${['system', 'light', 'dark'].map((k) => `<button data-a="setTheme" data-p="${k}" aria-pressed="${theme === k}">${esc(translateText(TH[k]))}</button>`).join('')}</div><p class="hint" style="margin:0">„Sistem” urmează setarea din Windows. Ctrl și + sau − modifică mărimea textului, Ctrl 0 revine.</p></div>
  <div class="panel"><div class="row"><span>Bază de date</span><b>Niciuna</b></div><div class="row"><span>Rețea</span><b>Blocată complet</b></div><div class="row"><span>Stocare</span><b>Un fișier criptat, pe acest PC</b></div><div class="row"><span>Cheie legată de dispozitiv</span><b>${st.preview ? 'Simulat (previzualizare)' : st.weak ? 'Slabă (fără DPAPI)' : 'Windows DPAPI'}</b></div><div class="row"><span>Blocare automată</span><b>După 5 minute</b></div><div class="row"><span>Capturi de ecran</span><b>Blocate</b></div></div></div>
  <div><div class="panel p"><h2>Copie de rezervă</h2><p class="hint" style="margin:0 0 4px">Criptată cu o parolă aleasă de tine. Doar așa poți muta documentele pe alt PC.</p><div class="acts"><button class="btn" data-a="bexp">Exportă</button><button class="btn ghost" data-a="bimp">Restaurează</button></div></div>
  <h2>Datele tale (GDPR)</h2><div class="panel"><div class="row"><span>Acces</span><b>Vezi tot în Portofel</b></div><div class="row"><span>Portabilitate</span><b>Exportă o copie</b></div><div class="row"><span>Ștergere</span><b>Șterge toate datele</b></div><div class="row"><span>Rectificare</span><b>La emitentul documentului</b></div><div class="row"><span>Transmitere către terți</span><b>Doar ce confirmi tu</b></div></div>
  <div class="panel p"><h2>Securitate și semnare</h2><div class="acts" style="margin-top:0"><button class="btn ghost" data-a="chpin">Schimbă codul de acces</button><button class="btn ghost" data-a="signFile">Semnează fișier</button><button class="btn ghost" data-a="verifySignature">Verifică semnătură</button><button class="btn ghost" data-a="contrast">Contrast ridicat</button></div><p class="hint">Semnătura este criptografică, dar NU este semnătură calificată eIDAS.</p></div><div class="panel p"><h2>Seif de fișiere</h2><div class="acts"><button class="btn" data-a="addFile">Adaugă fișier</button></div>${files.length ? files.map(f=>`<div class="row"><span data-i18n-raw>${esc(f.name)}<small> · ${esc(f.category)}</small></span><span><button class="btn ghost" data-a="exportFile" data-p="${esc(f.id)}">Exportă fișier</button> <button class="btn ghost" data-a="removeFile" data-p="${esc(f.id)}">Șterge</button></span></div>`).join('') : '<p class="hint">Niciun fișier adăugat.</p>'}</div><div class="panel p"><h2>Jurnal securitate</h2>${audit.slice(0,12).map(x=>`<div class="row"><span>${esc(translateText(x.what))}</span><small>${fmt(x.at)}</small></div>`).join('') || '<p class="hint">Nicio operațiune înregistrată.</p>'}</div>
  <h2>Emitenți de încredere</h2><div class="panel">${trusted.map((t) => `<div class="row"><span data-i18n-raw>${esc(t.name)}<br><small>${esc(t.id.slice(-16))}</small></span>${t.own ? '<span class="badge">Al tău</span>' : `<button class="btn ghost" data-a="trem" data-p="${esc(t.id)}">Elimină</button>`}</div>`).join('')}<div class="acts" style="padding-bottom:14px"><button class="btn ghost" data-a="texp">Copiază cheia mea</button><button class="btn ghost" data-a="timp">Importă emitent</button></div></div>
  <div class="panel p"><h2>Date și istoric</h2><div class="acts" style="margin-top:0"><button class="btn ghost" data-a="hclr">Șterge istoricul</button><button class="btn ghost" data-a="lock">Blochează aplicația</button><button class="btn ghost danger" data-a="wipe">Șterge toate datele</button></div></div>
  <p class="hint">Accesibilitate: interfața este proiectată având în vedere EN 301 549 (WCAG 2.1, nivel AA). Nu a fost evaluată oficial.</p></div></div>`;
}

function timer() {
  const u = () => {
    const l = $('#left'), b = $('#bar');
    if (!out || !l) { clearInterval(tm); return; }
    const s = Math.max(0, Math.ceil((out.exp - Date.now()) / 1000));
    b.style.width = (s / 60 * 100) + '%';
    if (s <= 0) { clearInterval(tm); out = null; toast('Codul a expirat'); render(); } else l.textContent = translateText('Expiră în ' + s + ' s');
  };
  u(); tm = setInterval(u, 500);
}
async function reload() {
  const a = await api.list(), b = await api.history();
  if (a.ok === false) return showLogin();
  docs = a.docs; hist = b.hist || [];
  const t = await api.trustList(); trusted = (t && t.list) || [];
  const [pr,fl,au] = await Promise.all([api.profile(),api.fileList(),api.audit()]);
  profile = pr.ok ? pr.profile : {name:'',photo:null}; files = fl.ok ? fl.files : []; audit = au.ok ? au.entries : [];
}

const A = {
  tab: (p) => { stopScan(); tab = p; det = null; addPage=false; render(); },
  open: (p) => { addPage=false; det = p; render(); },
  back: () => { det = null; addPage=false; render(); },
  note: () => toast('Nu ai notificări noi'),
  skip: () => { const m = $('#main'); if (m) m.focus(); },
  theme() { A.setTheme({ system: 'light', light: 'dark', dark: 'system' }[theme]); },
  async setLanguage(p) { const r=await api.setSetting('language',p); if(!r.ok)return toast(r.err); language=p;render();translateDOM($('#login')); const t=$('#toast');if(t&&t.textContent)t.textContent=translateText(t.textContent); },
  async contrast() {highContrast=!highContrast;await api.setSetting('highContrast',highContrast);render();},
  sensitive() {showSensitive=!showSensitive;render();},
  async setTheme(p) { applyTheme(p); render(); const r = await api.setSetting('theme', p); if (r && r.ok === false) toast(r.err || 'Nu am putut salva aspectul'); },
  share: (p) => { qd = p; qp = 0; sel = preSet(p, 0); out = null; tab = 'qr'; det = null; render(); },
  pick: (p) => { qd = p; qp = 0; sel = preSet(p, 0); out = null; render(); },
  pre: (p) => { qp = +p; sel = preSet(qd, qp); out = null; render(); },
  tg: (p) => { sel.has(p) ? sel.delete(p) : sel.add(p); qp = -1; out = null; render(); },
  async gen() {
    const d = docOf(qd); if(!d)return toast('Alege un document'); const names = allOf(d).filter((n) => sel.has(n));
    if (!names.length) return toast('Bifează cel puțin un câmp');
    const purpose = qp >= 0 ? presetsFor(qd)[qp][0] : 'Personalizat';
    if (!(await consent(d, names, purpose))) return;
    const r = await api.present(qd, names, purpose);
    if (!r.ok) return toast(r.err || 'Eroare');
    out = { code: r.code, exp: r.exp, qr: r.qr, names, n: names.length };
    await reload(); render();
  },
  async copy() { if (out) { await api.copy(out.code); toast('Cod copiat'); } },
  async verify() { await A.verifyText(($('#vin') || {}).value || vtxt); },
  async verifyText(t) {
    vtxt = t;
    const r = await api.verify(vtxt);
    if (!r.ok) return toast(r.err || 'Eroare');
    vres = r.res; render();
  },
  async scan() {
    if (scanning) { stopScan(); render(); return; }
    if (typeof jsQR !== 'function') return toast('Scanarea necesită npm install (pachetul jsqr)');
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment', width: { ideal: 1280 } }, audio: false });
      scanning = true; vres = null; render(); scanLoop();
    } catch { stopScan(); toast('Camera nu poate fi pornită. Verifică permisiunile din Windows.'); }
  },
  async fopen() {
    const r = await api.openCode();
    if (!r.ok) { if (r.err !== 'Anulat') toast(r.err || 'Eroare'); return; }
    await A.verifyText(String(r.text).trim());
  },
  async fsave() { if (!out) return; const r = await api.saveCode(out.code); if (r.ok) toast('Cod salvat'); else if (r.err !== 'Anulat') toast(r.err || 'Eroare'); },
  async watermark(id) {
    const d=docOf(id);if(!d)return;
    const purpose=await ask('Copie cu filigran','Pentru cine este copia? Exemplu: Hotel X, 17.11.2026',false);
    if(!purpose)return;
    const canvas=document.createElement('canvas'); canvas.width=1100;canvas.height=730;
    const c=canvas.getContext('2d');c.fillStyle='#ffffff';c.fillRect(0,0,1100,730);
    c.fillStyle='#152c5b';c.font='bold 38px sans-serif';c.fillText('ROWallet · '+docMeta(docOf(id)).s,55,75);
    c.font='20px sans-serif';c.fillStyle='#55657e';c.fillText(translateText('Date autodeclarate · nu este copie certificată oficial'),55,110);
    let y=175;c.fillStyle='#172943';c.font='25px sans-serif';
    for(const [key,value] of d.fields){if(y>575)break;c.fillText(displayField(String(key)).slice(0,36)+': '+String(value).slice(0,54),60,y);y+=49;}
    c.save();c.translate(550,380);c.rotate(-Math.PI/8);c.globalAlpha=.21;c.fillStyle='#c32525';c.textAlign='center';c.font='bold 48px sans-serif';
    const label=(translateText('DOAR PENTRU')+' '+purpose.slice(0,45)+' · '+new Date().toLocaleDateString(language==='en'?'en-GB':'ro-RO')).toUpperCase();
    for(let k=-2;k<=2;k++) c.fillText(label,0,k*95);c.restore();
    const r=await api.saveWatermark(canvas.toDataURL('image/png'));
    toast(r.ok?'Copie cu filigran salvată':r.err);
  },
  async removeDoc(id){
    const x=await ask('Elimină document','Scrie ȘTERGE pentru a elimina definitiv acest document local.',false);
    if(!confirmDelete(x))return;
    const r=await api.removeDocument(id);if(!r.ok)return toast(r.err);
    det=null;await reload();render();toast('Document eliminat');
  },
  addDocument() {addPage=true;addType='ci';det=null;tab='wallet';render();$('.pg').scrollTop=0;},
  cancelAdd() {addPage=false;render();},
  changeAddType() {const kind=$('#addKind'); if(kind){addType=kind.value;render();$('.pg').scrollTop=0;}},
  async saveNewDocument() {
    const fields=DOC_SCHEMAS[addType] || (addType==='other'?OTHER_FIELDS:addType==='edu-alt'?['Tip document',...SCHOOL_FIELDS]:SCHOOL_FIELDS);
    const vals={};for(let i=0;i<fields.length;i++) vals[fields[i]]=($('#addF'+i)||{}).value || '';
    const id=(addType==='other'||addType==='edu-alt') ? addType+'-'+Math.random().toString(36).slice(2,12) : addType;
    if(docOf(id)) return toast('Există deja acest tip de document. Îl poți edita din cardul existent.');
    const r=await api.issue(id,vals);if(!r.ok)return toast(r.err||'Eroare la salvare');
    addPage=false;await reload();tab='wallet';render();toast('Document salvat în portofel');
  },
  async setName() { const n=await ask('Nume profil','Numele afișat local, nu este identitate verificată.',false);if(n===null)return;const r=await api.profileSet(n);if(!r.ok)return toast(r.err);await reload();render();},
  async photo() {const r=await api.photoPick();if(!r.ok){if(r.err!=='Anulat')toast(r.err);return;}await reload();render();},
  async photoRemove() {await api.photoRemove();await reload();render();},
  async addFile() {const cat=await ask('Categorie fișier','Identitate, Educație, Călătorie, Abonament sau Altele',false);if(cat===null)return;const r=await api.fileAdd(cat);if(!r.ok){if(r.err!=='Anulat')toast(r.err);return;}await reload();render();},
  async exportFile(id) {const r=await api.fileExport(id);toast(r.ok?'Fișier exportat':r.err);},
  async removeFile(id) {const r=await api.fileRemove(id);if(!r.ok)return toast(r.err);await reload();render();},
  async signFile(){const r=await api.signFile();if(r.ok){await reload();toast('Semnătură creată');}else if(r.err!=='Anulat')toast(r.err);},
  async verifySignature(){const r=await api.verifySignature();if(r.ok)toast(r.valid?'Semnătură validă · '+r.signer:'Semnătură invalidă');else if(r.err!=='Anulat')toast(r.err);},
  async scanImage() {
    const f=document.createElement('input');f.type='file';f.accept='image/png,image/jpeg,image/webp';
    f.onchange=async()=>{const file=f.files&&f.files[0];if(!file)return;if(file.size>8*1024*1024)return toast('Imagine prea mare');
      try { const bmp=await createImageBitmap(file), c=document.createElement('canvas');c.width=bmp.width;c.height=bmp.height;
        if(c.width*c.height>16e6)throw Error('Imagine prea mare');const ctx=c.getContext('2d',{willReadFrequently:true});ctx.drawImage(bmp,0,0);bmp.close();
        const d=ctx.getImageData(0,0,c.width,c.height),r=jsQR(d.data,c.width,c.height,{inversionAttempts:'attemptBoth'});
        if(!r||!r.data)throw Error('Niciun cod QR detectat');await A.verifyText(r.data);
      }catch(e){toast(e.message||'Nu pot citi QR');}};f.click();
  },
  async edit(p) {
    const d = docOf(p), f = d.fields.filter((x) => x[0] !== 'Peste 18 ani');
    const v = await form('Editează datele', 'Date autodeclarate, semnate local; nu este verificare oficială.', f);
    if (!v) return;
    const r = await api.issue(p, v);
    if (!r.ok) return toast(r.err || 'Eroare');
    await reload(); toast('Document actualizat'); render();
  },
  async chpin() {
    const o = await ask('Codul actual', 'Introdu PIN-ul sau fraza actuală.'); if (o === null) return;
    const n = await ask('Codul nou', 'Frază de minimum 12 caractere sau PIN cu 6 cifre (mai puțin sigur).'); if (n === null) return;
    const c = await ask('Confirmă codul nou', 'Introdu din nou secretul nou.'); if (c === null) return;
    if (n !== c) return toast('Codurile nu coincid');
    const r = await api.changePin(o, n); toast(r.ok ? 'Codul a fost schimbat' : r.err);
  },
  async texp() {
    const r = await api.trustExport(); if (!r.ok) return toast(r.err || 'Eroare');
    await api.copy(JSON.stringify(r.t)); toast('Cheia emitentului a fost copiată');
  },
  async timp() {
    const t = await ask('Importă emitent de încredere', 'Lipește cheia emitentului (JSON). Codurile lui vor fi considerate valide pe acest calculator.', false);
    if (t === null) return;
    const r = await api.trustImport(t);
    if (!r.ok) return toast(r.err || 'Eroare');
    await reload(); toast(r.r === 'exists' ? 'Emitentul era deja în listă' : 'Emitent adăugat'); render();
  },
  async trem(p) { const r = await api.trustRemove(p); if (!r.ok) return toast(r.err || 'Eroare'); await reload(); toast('Emitent eliminat'); render(); },
  vclr: () => { vtxt = ''; vres = null; render(); },
  async lock() { await api.lock(); showLogin(); },
  async bexp() {
    const p = await ask('Parola copiei de rezervă', 'Minimum 8 caractere. Fără ea copia nu poate fi deschisă și nu poate fi recuperată.');
    if (p === null) return;
    const r = await api.exportBackup(p); toast(r.ok ? 'Copie salvată' : r.err);
  },
  async bimp() {
    const p = await ask('Restaurare', 'Parola copiei. Documentele curente vor fi înlocuite.');
    if (p === null) return;
    const r = await api.importBackup(p);
    if (r.ok) { await reload(); toast('Restaurat'); render(); } else toast(r.err);
  },
  async hclr() { await api.clearHistory(); await reload(); toast('Istoric șters'); render(); },
  async wipe() {
    const v = await ask('Ștergi tot?', 'Scrie ȘTERGE pentru confirmare. Nu se poate anula.', false);
    if (!confirmDelete(v)) { if (v !== null) toast('Confirmare greșită'); return; }
    await api.wipe(); applyTheme('system'); st = await api.status(); lm = 'c1'; showLogin();
  }
};
document.addEventListener('click', (e) => { const t = e.target.closest('[data-a]'); if (t && A[t.dataset.a]) A[t.dataset.a](t.dataset.p); });
document.addEventListener('change', (e) => { if(e.target.id==='addKind'){A.changeAddType();return;} const t = e.target.closest('[data-c]'); if (t && A[t.dataset.c]) A[t.dataset.c](t.dataset.p); });

document.addEventListener('dragstart',e=>{const c=e.target.closest('button.cd[draggable]');if(!c)return;dragId=c.dataset.p;if(e.dataTransfer){e.dataTransfer.effectAllowed='move';e.dataTransfer.setData('text/plain',dragId);} });
document.addEventListener('dragover',e=>{const c=e.target.closest('button.cd[draggable]');if(c&&dragId&&c.dataset.p!==dragId)e.preventDefault();});
document.addEventListener('drop',async e=>{const c=e.target.closest('button.cd[draggable]');if(!c||!dragId||c.dataset.p===dragId)return;e.preventDefault();const from=docs.findIndex(x=>x.id===dragId),to=docs.findIndex(x=>x.id===c.dataset.p);dragId=null;if(from<0||to<0)return;const order=docs.map(x=>x.id);order.splice(to,0,order.splice(from,1)[0]);const r=await api.reorder(order);if(!r.ok)return toast(r.err||'Reordonarea a eșuat');await reload();render();});
document.addEventListener('dragend',()=>{dragId=null;});

/* ---- ecranul de login cu cod ---- */
function setLm() {
  const t = { unlock: ['Bun venit înapoi', 'Introdu codul de acces din 6 cifre'], c1: ['Creează codul de acces', 'Alege un cod din 6 cifre. Nu poate fi recuperat dacă îl uiți.'], c2: ['Confirmă codul', 'Introdu din nou codul ales'] }[lm];
  $('#lh1').textContent = t[0]; $('#lp').textContent = t[1]; $('#lmsg').textContent = '';
  $('#passArea').hidden = !passMode; $('#pad').hidden = passMode; $('#dots').hidden = passMode;
  $('#passHint').textContent = lm==='unlock'?'Introdu fraza de acces sau folosește codul PIN existent.':'Alege o frază de acces de minimum 12 caractere.';
  translateDOM($('#login'));
}
function dots() { $('#dots').innerHTML = [0, 1, 2, 3, 4, 5].map((i) => `<i class="${i < pin.length ? 'on' : ''}"></i>`).join(''); }
function shake(m) { const l = $('.lbox'); l.classList.remove('shake'); void l.offsetWidth; l.classList.add('shake'); $('#lmsg').textContent = translateText(m); pin = ''; setTimeout(dots, 250); }
async function key(k) {
  if (busy) return;
  if (k === 'del') pin = pin.slice(0, -1); else if (pin.length < 6) pin += k;
  dots();
  if (pin.length < 6) return;
  busy = true;
  try {
    if (lm === 'unlock') {
      const r = await api.unlock(pin);
      if (r.ok) await enter(); else shake(r.wait ? `Prea multe încercări. Așteaptă ${r.wait} s` : 'Cod greșit. Încearcă din nou.');
    } else if (lm === 'c1') { first = pin; pin = ''; lm = 'c2'; dots(); setLm(); }
    else if (pin === first) { const r = await api.create(pin); if (r.ok) await enter(); else shake(r.err || 'Eroare'); }
    else { lm = 'c1'; first = ''; setLm(); shake('Codurile nu coincid. Reîncepe.'); }
  } finally { busy = false; }
}
async function passSubmit() {
 if(busy)return;const el=$('#passEntry');const secret=el.value;el.value='';
 if(!secret)return;
 if(lm==='c1'){if(secret.length<12)return shake('Fraza trebuie să aibă minimum 12 caractere');first=secret;lm='c2';setLm();return;}
 if(lm==='c2'){if(secret!==first){first='';lm='c1';setLm();return shake('Frazele nu coincid');}busy=true;try{const r=await api.create(secret);if(r.ok)await enter();else shake(r.err||'Eroare');}finally{busy=false;}return;}
 busy=true;try{const r=await api.unlock(secret);if(r.ok)await enter();else shake(r.wait?'Prea multe încercări. Așteaptă '+r.wait+' s':'Frază greșită');}finally{busy=false;}
}
async function enter() {
  pin = ''; dots(); tab = 'wallet'; det = null; out = null; vres = null; vtxt = '';
  await reload(); st = await api.status();
  const cfg = await api.settings(); applyTheme(cfg && cfg.ok && cfg.s && cfg.s.theme || 'system'); language=cfg?.s?.language==='en'?'en':language; highContrast=!!(cfg&&cfg.s&&cfg.s.highContrast);
  $('#app').hidden = false; render(); if(!cfg?.s?.lastBackupAt || Date.now()-Date.parse(cfg.s.lastBackupAt)>30*864e5) toast('Memento: fă o copie de rezervă criptată.');
  translateDOM($('#login')); $('#login').classList.add('out'); setTimeout(() => { $('#login').hidden = true; }, 600);
}
function showLogin() {
  stopScan(); docs = []; hist = []; trusted = []; out = null; vres = null; vtxt = ''; det = null; sel = new Set(); clearInterval(tm);
  if ($('#dlg').open) $('#dlg').close('x'); $('#app').innerHTML = ''; pin = ''; first = ''; if (lm !== 'c1' && lm !== 'c2') lm = 'unlock'; dots(); setLm();
  translateDOM($('#login'));
  const l = $('#login'); l.hidden = false; void l.offsetWidth; l.classList.remove('out');
  setTimeout(() => { if (!$('#login').classList.contains('out')) $('#app').hidden = true; }, 650);
}

/* ---- pornire ---- */
$('#sl1').innerHTML = originalSplashLogo(); $('#ll').innerHTML = logo();
$('#pad').innerHTML = ['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((k) => `<button data-k="${k}" aria-label="${k}">${k}</button>`).join('') + `<span></span><button data-k="0" aria-label="0">0</button><button class="bio" data-k="del" aria-label="Șterge">${ico('del')}</button>`;
$('#passGo').addEventListener('click',passSubmit);$('#passEntry').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();passSubmit();}});$('#switchAuth').addEventListener('click',()=>{passMode=!passMode;pin='';setLm();dots();});
$('#pad').addEventListener('click', (e) => { const b = e.target.closest('[data-k]'); if (b) key(b.dataset.k); });
document.addEventListener('keydown', (e) => {
  const l = $('#login'); if (l.hidden || l.classList.contains('out')) return;
  if(passMode)return; if (/^\d$/.test(e.key)) key(e.key); else if (e.key === 'Backspace') key('del');
});
let lastAct = 0;
['pointerdown', 'keydown'].forEach((ev) => addEventListener(ev, () => { const n = Date.now(); if (n - lastAct > 5000) { lastAct = n; api.act(); } }, { passive: true }));
api.onLocked(() => showLogin());
window.addEventListener('blur',()=>document.body.classList.add('privacy-blur'));
window.addEventListener('focus',()=>document.body.classList.remove('privacy-blur'));
dots();
api.status().then((s) => { st = s; language=s.uiLanguage==='en'?'en':'ro'; lm = s.exists ? 'unlock' : 'c1'; passMode=!s.exists;setLm(); });
setTimeout(() => { $('#login').hidden = false; $('#splash').classList.add('out'); setTimeout(() => { $('#splash').hidden = true; }, 650); }, 3200);
