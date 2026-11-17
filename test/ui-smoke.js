'use strict';
// Test de fum pentru interfață, fără browser: rulează app.js cu un DOM simulat și API-ul simulat.
// Prinde erori de tip „variabilă nedefinită” care ar bloca ecranul de login.
const fs = require('fs'), vm = require('vm'), path = require('path');
const root = path.join(__dirname, '..');
const els = {};
const mk = (id) => els[id] || (els[id] = {
  id, innerHTML: '', textContent: '', hidden: false, value: '', scrollTop: 0, returnValue: '', style: {}, dataset: {}, _c: new Set(), offsetWidth: 0,
  classList: { add: (c) => els[id]._c.add(c), remove: (c) => els[id]._c.delete(c), contains: (c) => els[id]._c.has(c) },
  addEventListener() {}, focus() {}, querySelector() { return null; },
  showModal() { this.returnValue = 'ok'; setTimeout(() => this.onclose && this.onclose(), 0); },
  close(v) { this.returnValue = v; setTimeout(() => this.onclose && this.onclose(), 0); }
});
const ctx = {
  console, setTimeout, clearTimeout, setInterval, clearInterval, Date, Math, Promise, JSON, Object, Array, String, Number, Set, Map, RegExp, Error,
  document: { querySelector: mk, querySelectorAll: () => [], createTreeWalker: () => ({nextNode:()=>false}), addEventListener() {}, documentElement: { dataset: {},classList:{toggle(){}},lang:'ro' }, activeElement: { dataset: {} } }, NodeFilter:{SHOW_TEXT:4},
  matchMedia: () => ({ matches: false }), addEventListener() {}, navigator: { clipboard: { writeText: async () => {} } }
};
ctx.window = ctx; vm.createContext(ctx);
const mock = fs.readFileSync(path.join(root, 'test', 'mock-api.js'), 'utf8');
const i18n = fs.readFileSync(path.join(root, 'renderer', 'i18n.js'), 'utf8');
const app = fs.readFileSync(path.join(root, 'renderer', 'app.js'), 'utf8');
const footer = `
(async () => {
  const log = []; const ok = (c, m) => { if (!c) throw new Error('EȘUAT: ' + m); log.push('  ✓ ' + m); };
  await new Promise((r) => setTimeout(r, 50));
  ok(lm === 'unlock', 'ecranul de cod pornește în modul deblocare');
  passMode=false; for (const k of '000000') await key(k);
  ok(!$('#login').classList.contains('out'), 'cod greșit nu deblochează');
  for (const k of '123456') await key(k);
  ok($('#login').classList.contains('out'), 'cod corect deblochează');
  ok($('#app').innerHTML.includes('Documentele mele') || $('#app').innerHTML.includes('Portofel'), 'portofelul se afișează');
  ok(docs.length === 3, 'cele 3 documente sunt încărcate');
  for (const t of ['wallet', 'qr', 'ver', 'tx', 'acc']) { A.tab(t); ok($('#app').innerHTML.length > 800, 'pagina ' + t + ' se randează'); }
  for (const id of ['ci', 'pc', 'dp']) { A.open(id); ok($('#app').innerHTML.includes('semnatura locala valida') || $('#app').innerHTML.includes('Semnătură locală validă'), 'detaliile ' + id + ' se randează'); }
  A.back();
  A.share('ci'); await A.gen();
  ok(out && out.code.startsWith('RW1.'), 'cod generat după ecranul de consimțământ');
  A.tab('ver'); vtxt = out.code; await A.verify();
  ok(vres && vres.ok, 'codul generat se verifică');
  A.theme(); ok(theme === 'light', 'tema: luminos'); A.theme(); ok(theme === 'dark', 'tema: întunecat'); A.theme(); ok(theme === 'system', 'tema: sistem');
  A.open('ci'); await A.edit('ci'); ok($('#app').innerHTML.includes('semnatura locala valida') || $('#app').innerHTML.includes('Semnătură locală validă'), 'editarea datelor rulează');
  A.back(); A.tab('acc'); ok($('#app').innerHTML.includes('Emitenți de încredere'), 'lista emitenților se afișează');
  await A.chpin(); await A.texp(); await A.scan(); ok(!scanning, 'scanarea fără bibliotecă nu pornește (mesaj, fără eroare)');
  await A.lock();
  ok(!$('#login').classList.contains('out'), 'blocarea readuce ecranul de cod');
  return log.join('\\n');
})()`;
Promise.resolve(vm.runInContext(mock + '\n' + i18n + '\n' + app + '\n' + footer, ctx))
  .then((l) => { console.log(l); console.log('\nInterfața trece testul de fum.'); process.exit(0); })
  .catch((e) => { console.error(e.message || e); process.exit(1); });
