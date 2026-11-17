 'use strict';
const assert=require('assert/strict');
const fs=require('fs');const path=require('path');
const C=require('../src/cred');
const d={};C.init(d);
for (const type of ['edu-bac','edu-liceu','edu-prof','edu-calif','edu-master','edu-doctor','edu-curs']) {
 const fields=C.FIELDS[type]; assert(fields && fields.length===4);
 C.issue(d,type,Object.fromEntries(fields.map(k=>[k,'Valoare reală de test'])));
}
C.issue(d,'other-test123',{ 'Tip document':'Adeverință','Titular':'Popescu Test','Instituția emitentă':'Instituția','Număr document':'123','Data emiterii':'2024-10-01'});
C.issue(d,'edu-alt-test123',{'Tip document':'Atestat profesional','Titular':'Popescu Test','Instituția de învățământ':'Colegiul','Denumirea studiilor / calificării':'Calificare','Anul absolvirii':'2020'});
assert.equal(C.list(d).length,9);assert(C.list(d).every(x=>x.ok));

const updated=fs.readFileSync(path.join(__dirname,'../renderer/index.html'),'utf8');
const grab=s=>s.match(/<div class="scr" id="splash">.*?(?=\n  <div class="scr" id="login")/s)?.[0];
assert.equal(require('crypto').createHash('sha256').update(grab(updated)).digest('hex'),'274be3cb996c4e35f4e8e82e3e6312b0d324b06c16ca44a0c2057a8903b0b02d','animația originală trebuie să fie identică');
const ui=fs.readFileSync(path.join(__dirname,'../renderer/app.js'),'utf8');
assert(ui.includes('function vAdd()'));assert(ui.includes('draggable="true"'));
console.log('9 documente educaționale și personalizate; splash original identic; UI adăugare prezentă.');
