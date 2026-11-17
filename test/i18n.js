'use strict';
// Independent locale tests that run with Node, without installing Electron.
const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const root=path.join(__dirname,'..');
const source=fs.readFileSync(path.join(root,'renderer/i18n.js'),'utf8');
const ctx={window:{},document:{}};vm.createContext(ctx);vm.runInContext(source,ctx);
const {translate:tr,ascii,en}=ctx.window.ROWalletI18n;
const checks=[
 ['Documentele mele','My documents'],['Adaugă document','Add document'],['+ Adaugă document','+ Add document'],
 ['Semnătură locală validă','Valid local signature'],['Limba','Language'],['Română','Romanian'],['Engleză','English'],
 ['Denumirea studiilor / calificării','Studies / qualification'],['Data nașterii','Date of birth'],
 ['Șterge toate datele','Erase all data'],['Cod generat · Recepție','Code generated · Reception'],
 ['Expiră în 25 s','Expires in 25 s'],['Prea multe încercări. Așteaptă 30 s','Too many attempts. Wait 30 s'],
 ['Câmpul „Data nașterii” nu poate fi gol','Field "Date of birth" cannot be empty'],
 ['Schimbă aspectul. Acum: Sistem','Change appearance. Current: System'],
 ['Scrie ȘTERGE pentru confirmare. Nu se poate anula.','Type DELETE to confirm. This cannot be undone.'],
 ['Deschide Cartea electronică de identitate','Open Electronic identity card'],
 ['✓ Semnătură locală validă','✓ Valid local signature']
];
for(const [source,expected] of checks)assert.equal(tr(source,'en'),expected,`EN: ${source}`);
for(const [source] of checks)assert(!/[ăâîșțĂÂÎȘȚşŞţŢ]/.test(tr(source,'ro')));
assert.equal(ascii('ȘTERGE'),'STERGE');
assert.equal(tr('Seria și numărul','ro'),'Seria si numarul');
assert.equal(tr('Lorem ipsum','en'),'Lorem ipsum');
assert(Object.keys(en).length>325,'Catalog complet');
assert.equal(fs.readFileSync(path.join(root,'renderer/styles.css'),'utf8'),fs.readFileSync(path.join(__dirname,'../../rowallet_animation_final/rowallet-pc/renderer/styles.css'),'utf8'),'CSS original unchanged');
const html=fs.readFileSync(path.join(root,'renderer/index.html'),'utf8');
assert(html.includes('<div class="scr" id="splash"><div class="sl"><span id="sl1"></span>'),'Splash DOM intact');
const app=fs.readFileSync(path.join(root,'renderer/app.js'),'utf8');
assert(app.includes('originalSplashLogo()'),'Original splash logo still active');
assert(app.includes('const confirmDelete = text =>'),'ASCII delete supported');
assert(app.includes('data-i18n-raw'),'User-owned values not rewritten by DOM translator');
console.log('OK: '+checks.length+' EN messages, ASCII RO, dynamic labels, original splash and design, preserved data. ('+Object.keys(en).length+' translations)');
