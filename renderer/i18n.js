'use strict';
/* ROWallet locale catalogue. Keys remain the historic Romanian field names for
   backwards compatibility with encrypted documents and signed QR payloads.
   Translating a label never rewrites a field key or a user's value. */
(() => {
  const entries = String.raw`
Portofel:::Wallet
Cod QR:::QR code
Verifica:::Verify
Tranzactii:::Activity
Contul meu:::My account
Documentele mele:::My documents
Prezinta un document:::Present a document
Verifica un cod:::Verify a code
Portofel privat:::Private wallet
Romania:::Romania
Independent · offline:::Independent · offline
Meniu principal:::Main menu
Seif criptat local:::Encrypted local vault
Blocheaza:::Lock
Blocheaza aplicatia:::Lock application
Document nou:::New document
Schimba aspectul. Acum:::Change appearance. Current:
Notificari:::Notifications
Setari:::Settings
Sari la continut:::Skip to content
Sistem:::System
Luminos:::Light
Intunecat:::Dark
Carte de identitate:::Identity card
Cartea electronica de identitate:::Electronic identity card
Permis de conducere:::Driving licence
Diploma de licenta:::Bachelor's degree diploma
Diploma de bacalaureat:::Baccalaureate diploma
Diploma de absolvire a liceului:::High school completion diploma
Certificat scoala profesionala:::Vocational school certificate
Certificat de calificare:::Qualification certificate
Diploma de master:::Master's degree diploma
Diploma de doctorat:::Doctoral diploma
Certificat de absolvire a unui curs:::Course completion certificate
Alt document educational:::Other education document
Alt document:::Other document
Document personal:::Personal document
Titular:::Holder
Nume:::Last name
Prenume:::First name
Data nasterii:::Date of birth
Cetatenie:::Citizenship
Seria si numarul:::Series and number
Valabila pana la:::Valid until
Data emiterii:::Issue date
Valabil pana la:::Valid until
Numarul permisului:::Driving licence number
Categorii:::Categories
Program:::Program
Titlu obtinut:::Awarded qualification
Anul absolvirii:::Graduation year
Media:::Final grade
Institutia de invatamant:::School / educational institution
Denumirea studiilor / calificarii:::Studies / qualification
Tip document:::Document type
Institutia emitenta:::Issuing institution
Numar document:::Document number
Date introduse local:::Locally entered data
Date autodeclarate:::Self-declared data
semnatura locala valida:::valid local signature
semnatura invalida:::invalid signature
Semnatura locala valida:::Valid local signature
Semnatura invalida:::Invalid signature
Valid local (nu oficial):::Locally valid (not official)
Invalid:::Invalid
Deschide:::Open
Adauga un document:::Add a document
Adauga document:::Add document
+ Adauga document:::+ Add document
Alege tipul de document:::Choose document type
Completeaza informatiile:::Fill in the details
Salveaza documentul:::Save document
Completeaza datele reale. Documentul va aparea ca un card in portofelul tau, fara schimbarea designului.:::Enter your real information. The document will appear as a card in your wallet, without changing its design.
Poti adauga diplome de liceu, bacalaureat, scoala profesionala, facultate sau cursuri. Nu trebuie sa ai o diploma de licenta.:::You can add high school, baccalaureate, vocational school, university or course documents. A bachelor's degree is not required.
Datele sunt stocate criptat local. Adaugarea lor nu constituie verificare oficiala de identitate.:::Your information is encrypted and stored locally. Adding it is not an official identity verification.
Anuleaza:::Cancel
Salveaza:::Save
Trage cardurile pentru reordonare. Documentele sunt autodeclarate, nu verificate oficial.:::Drag cards to reorder them. Documents are self-declared, not officially verified.
documente active:::active documents
partajari inregistrate:::recorded shares
alerte de securitate:::security alerts
Activitate recenta:::Recent activity
Securitate:::Security
Activ:::Active
Retea:::Network
Blocata:::Blocked
Blocata complet:::Fully blocked
Blocare automata:::Auto-lock
5 minute:::5 minutes
Dupa 5 minute:::After 5 minutes
Nicio activitate inca.:::No activity yet.
Partajeaza cu cod QR:::Share via QR code
Editeaza datele:::Edit details
Copie cu filigran:::Watermarked copy
Ascunde seria:::Hide series number
Afiseaza seria:::Show series number
Elimina document:::Remove document
Inapoi:::Back
Adaugat de utilizator, fara verificare oficiala:::Added by the user, not officially verified
Origine:::Origin
Expira la:::Expires on
Niciun document. Adauga mai intai date in Portofel.:::No documents yet. Add document details to your wallet first.
1. Alege documentul:::1. Choose a document
2. Alege ce trimiti:::2. Choose what to share
Receptie:::Reception
Peste 18 ani:::Over 18
Toate datele:::All data
Inchiriere auto:::Car rental
Angajare:::Employment
Personalizat:::Custom
Genereaza cod:::Generate code
Genereaza cod nou:::Generate new code
Codul tau apare aici:::Your code appears here
Alege documentul si datele, apoi apasa Genereaza cod. Codul expira dupa 60 de secunde.:::Choose the document and information, then select Generate code. The code expires after 60 seconds.
Pentru QR ruleaza npm install.:::For QR support, run npm install.
Cod de prezentare:::Presentation code
Copiaza codul (se sterge din clipboard in 60 s):::Copy code (clipboard clears after 60 s)
Salveaza in fisier:::Save to file
Rezultatul apare aici:::Results appear here
Lipeste un cod primit de la un client si apasa Verifica.:::Paste a code received from someone and select Verify.
Cod primit:::Received code
Imagine de la camera:::Camera feed
Lipeste aici codul (incepe cu RW1.):::Paste the code here (starts with RW1.)
Opreste camera:::Stop camera
Scaneaza cu camera:::Scan with camera
Deschide fisier:::Open file
Scaneaza imagine QR:::Scan QR image
Sterge:::Delete
Accepta coduri QR transmise de camera web, imagini, fisiere sau scanere USB de tip tastatura. Verificarea locala nu dovedeste emiterea de catre stat.:::Accepts QR codes from a webcam, images, files or USB scanners emulating a keyboard. Local verification does not establish government issuance.
Cod valabil inca:::Code valid for another
Operatiune:::Operation
Date partajate:::Shared information
Data:::Date
Nu ai nicio tranzactie.:::No activity recorded yet.
Fotografie profil:::Profile photo
Fotografia este stocata criptat pe acest PC; nu verifica automat identitatea.:::The photo is encrypted on this PC and does not automatically verify identity.
Editeaza nume:::Edit name
Alege fotografie:::Choose photo
Sterge fotografia:::Remove photo
Limba:::Language
Romana:::Romanian
Engleza:::English
Aspect:::Appearance
„Sistem” urmeaza setarea din Windows. Ctrl si + sau − modifica marimea textului, Ctrl 0 revine.:::"System" follows Windows settings. Ctrl with + or − changes text size, Ctrl 0 resets it.
Baza de date:::Database
Niciuna:::None
Stocare:::Storage
Un fisier criptat, pe acest PC:::One encrypted file on this PC
Cheie legata de dispozitiv:::Device-bound key
Simulat (previzualizare):::Simulated (preview)
Slaba (fara DPAPI):::Weak (without DPAPI)
Capturi de ecran:::Screenshots
Blocate:::Blocked
Copie de rezerva:::Backup
Criptata cu o parola aleasa de tine. Doar asa poti muta documentele pe alt PC.:::Encrypted with a password you choose. This allows transferring your wallet to another PC.
Exporta:::Export
Restaureaza:::Restore
Datele tale (GDPR):::Your data (GDPR)
Acces:::Access
Vezi tot in Portofel:::View everything in Wallet
Portabilitate:::Portability
Exporta o copie:::Export a copy
Stergere:::Deletion
Sterge toate datele:::Erase all data
Rectificare:::Correction
La emitentul documentului:::Through the issuing authority
Transmitere catre terti:::Sharing with third parties
Doar ce confirmi tu:::Only what you approve
Securitate si semnare:::Security and signing
Schimba codul de acces:::Change access code
Semneaza fisier:::Sign file
Verifica semnatura:::Verify signature
Contrast ridicat:::High contrast
Semnatura este criptografica, dar NU este semnatura calificata eIDAS.:::The signature is cryptographic, but NOT a qualified eIDAS signature.
Seif de fisiere:::File vault
Adauga fisier:::Add file
Exporta fisier:::Export file
Niciun fisier adaugat.:::No files added yet.
Jurnal securitate:::Security log
Nicio operatiune inregistrata.:::No operations recorded.
Emitenti de incredere:::Trusted issuers
Al tau:::Yours
Elimina:::Remove
Copiaza cheia mea:::Copy my public key
Importa emitent:::Import issuer
Date si istoric:::Data and history
Sterge istoricul:::Clear history
Accesibilitate: interfata este proiectata avand in vedere EN 301 549 (WCAG 2.1, nivel AA). Nu a fost evaluata oficial.:::Accessibility: the interface was designed with EN 301 549 (WCAG 2.1, level AA) in mind. It has not been officially assessed.
Confirma partajarea?:::Confirm sharing?
Confirmi partajarea?:::Confirm sharing?
Document:::Document
Scop:::Purpose
Date trimise:::Information sent
Cod valabil:::Code validity
60 de secunde:::60 seconds
Actiunea se inregistreaza in Tranzactii. Cealalta parte nu primeste niciun alt camp.:::This action is recorded in Activity. The other party receives no other fields.
Confirma:::Confirm
Continua:::Continue
Fara baza de date si fara server:::No database or server
Totul sta criptat, pe acest calculator:::Everything is encrypted on this computer
Tu alegi ce arati si cui:::You choose what to share and with whom
Identitatea ta, doar in mainile tale:::Your identity, in your hands
Un portofel digital pentru documentele oficiale, facut pentru Windows.:::A digital wallet for personal documents, built for Windows.
Documentele introduse de tine nu sunt verificate oficial.:::The documents you enter have not been officially verified.
Bun venit inapoi:::Welcome back
Introdu codul de acces din 6 cifre:::Enter your 6-digit access PIN
Creeaza codul de acces:::Create an access code
Alege un cod din 6 cifre. Nu poate fi recuperat daca il uiti.:::Choose a 6-digit PIN. It cannot be recovered if forgotten.
Confirma codul:::Confirm access code
Introdu din nou codul ales:::Enter the selected PIN again
Fraza de acces:::Passphrase
PIN / Fraza de acces:::PIN / Passphrase
Introdu fraza de acces sau foloseste codul PIN existent.:::Enter your passphrase, or use your existing PIN.
Alege o fraza de acces de minimum 12 caractere.:::Choose a passphrase at least 12 characters long.
Cod gresit. Incearca din nou.:::Incorrect PIN. Please try again.
Codurile nu coincid. Reincepe.:::PINs do not match. Start again.
Codurile nu coincid:::Codes do not match
Frazele nu coincid:::Passphrases do not match
Fraza trebuie sa aiba minimum 12 caractere:::The passphrase must contain at least 12 characters
Fraza gresita:::Incorrect passphrase
Prea multe incercari. Asteapta:::Too many attempts. Wait
Memento: fa o copie de rezerva criptata.:::Reminder: create an encrypted backup.
Nu ai notificari noi:::No new notifications
Alege un document:::Choose a document
Bifeaza cel putin un camp:::Select at least one field
Cod copiat:::Code copied
Cod salvat:::Code saved
Eroare:::Error
Anulat:::Cancelled
Camera nu poate fi pornita. Verifica permisiunile din Windows.:::Cannot start the camera. Check Windows permissions.
Scanarea necesita npm install (pachetul jsqr):::Scanning requires npm install (jsqr package)
Pentru cine este copia? Exemplu: Hotel X, 17.11.2026:::Who is the copy for? Example: Hotel X, 17.11.2026
Date autodeclarate · nu este copie certificata oficial:::Self-declared information · not an officially certified copy
DOAR PENTRU:::ONLY FOR
Copie cu filigran salvata:::Watermarked copy saved
Scrie STERGE pentru a elimina definitiv acest document local.:::Type DELETE to permanently remove this local document.
Document eliminat:::Document removed
Exista deja acest tip de document. Il poti edita din cardul existent.:::A document of this type already exists. You can edit it from its card.
Eroare la salvare:::Save error
Document salvat in portofel:::Document saved to wallet
Nume profil:::Profile name
Numele afisat local, nu este identitate verificata.:::The name is displayed locally and is not verified identity.
Categorie fisier:::File category
Identitate, Educatie, Calatorie, Abonament sau Altele:::Identity, Education, Travel, Subscription or Other
Fisier exportat:::File exported
Semnatura creata:::Signature created
Semnatura valida:::Valid signature
Imagine prea mare:::Image too large
Niciun cod QR detectat:::No QR code found
Nu pot citi QR:::Cannot read QR
Date autodeclarate, semnate local; nu este verificare oficiala.:::Self-declared information, signed locally; not official verification.
Document actualizat:::Document updated
Codul actual:::Current access code
Introdu PIN-ul sau fraza actuala.:::Enter your current PIN or passphrase.
Codul nou:::New access code
Fraza de minimum 12 caractere sau PIN cu 6 cifre (mai putin sigur).:::Passphrase of at least 12 characters or a 6-digit PIN (less secure).
Confirma codul nou:::Confirm new access code
Introdu din nou secretul nou.:::Enter the new secret again.
Codul a fost schimbat:::Access code changed
Cheia emitentului a fost copiata:::Issuer public key copied
Importa emitent de incredere:::Import a trusted issuer
Lipeste cheia emitentului (JSON). Codurile lui vor fi considerate valide pe acest calculator.:::Paste the issuer's public key (JSON). Its codes will be trusted on this computer.
Emitentul era deja in lista:::Issuer was already in the list
Emitent adaugat:::Issuer added
Emitent eliminat:::Issuer removed
Parola copiei de rezerva:::Backup password
Minimum 8 caractere. Fara ea copia nu poate fi deschisa si nu poate fi recuperata.:::At least 8 characters. Without it, the backup cannot be opened or recovered.
Copie salvata:::Backup saved
Restaurare:::Restore backup
Parola copiei. Documentele curente vor fi inlocuite.:::Backup password. Your current documents will be replaced.
Restaurat:::Restored
Istoric sters:::History cleared
Stergi tot?:::Erase everything?
Scrie STERGE pentru confirmare. Nu se poate anula.:::Type DELETE to confirm. This cannot be undone.
Confirmare gresita:::Incorrect confirmation
Aplicație locală independentă. Datele introduse nu sunt documente oficial verificate.:::Independent local application. Entered information is not officially verified.
Datele sunt doar autodeclarate; semnatura locala nu dovedeste identitatea.:::The information is self-declared; a local signature does not prove identity.
Importul unui document nu verifica identitatea si nu il transforma in act oficial.:::Importing a document does not verify identity or make it an official document.
Numar invalid:::Invalid number
Cod invalid:::Invalid access code
Exista deja un seif:::A vault already exists
Aplicatia este blocata:::The application is locked
Alege 6 cifre sau o fraza de minimum 12 caractere:::Choose a 6-digit PIN or a passphrase of at least 12 characters
Textul nu este un JSON valid:::The text is not valid JSON
Fisier prea mare:::File too large
Fisier prea mare (maxim 8 MB):::File too large (maximum 8 MB)
Fisier prea mare (maxim 30 MB):::File too large (maximum 30 MB)
Backup prea mare:::Backup too large
Imagine invalida:::Invalid image
PNG invalid:::Invalid PNG image
Formatul imaginii nu este acceptat:::Unsupported image format
Fotografia trebuie sa aiba maximum 2 MB:::The photo must be no larger than 2 MB
Maximum 30 de fisiere:::Maximum 30 files
Seiful de fisiere este limitat la 24 MB in total:::The file vault is limited to 24 MB in total
Fisierul nu corespunde extensiei sau formatului acceptat:::The file does not match its extension or supported format
Fisier inexistent:::File not found
Semnatura prea mare:::Signature file too large
Format invalid:::Invalid format
Ordine invalida:::Invalid order
Parola trebuie sa aiba minimum 8 caractere:::The password must contain at least 8 characters
Nume invalid:::Invalid name
Setare invalida:::Invalid setting
Cod prea mare:::Code too large
Cod deja utilizat pe acest calculator:::Code already used on this computer
Cheie externa (identitate neverificata):::External key (identity unverified)
Cheia acestui portofel:::This wallet's key
Codul actual este gresit:::The current access code is incorrect
Fisier de rezerva invalid:::Invalid backup file
Parola gresita sau fisier corupt:::Wrong password or damaged file
Protectia cheii de dispozitiv (Windows DPAPI) nu este disponibila. Seiful nu a fost creat.:::Device key protection (Windows DPAPI) is unavailable. The vault was not created.
Incercare de deblocare esuata:::Failed unlock attempt
Alege cel putin un camp:::Select at least one field
Cheia publica nu este valida:::Invalid public key
Data nasterii nu este valida:::Invalid birth date
Data nasterii trebuie sa fie in formatul ZZ.LL.AAAA:::Date of birth must use DD.MM.YYYY format
Dovada de posesie invalida:::Invalid proof of possession
Emitent necunoscut (nu e in lista de incredere):::Unknown issuer (not in trusted list)
Exista deja un emitent cu acest identificator si alta cheie:::An issuer with this identifier and a different key already exists
Semnatura emitentului este invalida:::Invalid issuer signature
Cod ilizibil sau corupt:::Unreadable or corrupted code
Codul a expirat:::The code expired
Codul nu a fost emis pentru acest document:::The code was not issued for this document
Fara DPAPI:::Without DPAPI
Tip de document necunoscut:::Unknown document type
Document inexistent:::Document not found
Format necunoscut:::Unknown format
Documentul a expirat:::The document has expired
Date modificate sau nesemnate de emitent:::Data changed or not signed by the issuer
Codul nu corespunde datelor trimise:::The code does not match the submitted data
Format de cheie invalid:::Invalid key format
Identificator de emitent invalid:::Invalid issuer identifier
Emitentul propriu nu poate fi eliminat:::The wallet's own issuer cannot be removed
nu poate fi gol:::cannot be empty
Cod generat:::Code generated
Date modificate de utilizator:::User-edited information
Semnatura valida:::Valid signature
Semnatura invalida:::Invalid signature
Copiaza:::Copy
Fisier semnat:::File signed
Fisier adaugat:::File added
Fotografie actualizata:::Photo updated
Profil actualizat:::Profile updated
Niciun document adaugat.:::No documents added yet.
`.trim().split('\n');
  const ascii = s => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[şș]/g,'s').replace(/[Ţţ]/g, x => x === 'Ţ' ? 'T':'t').replace(/Ş/g,'S');
  const en = Object.create(null);
  for (const line of entries) {
    const n = line.indexOf(':::');
    if (n === -1) throw Error('Malformed i18n entry: '+line);
    const k = ascii(line.slice(0,n));
    if (en[k] && en[k] !== line.slice(n+3)) throw Error('Conflicting translation '+k);
    en[k] = line.slice(n+3);
  }
  const sources = new WeakMap();
  const attrs = new WeakMap();
  function translate(input, lang) {
    if (input == null) return '';
    const source = String(input), stripped = ascii(source);
    if (lang !== 'en') return stripped;
    if (en[stripped]) return en[stripped];
    const trimmed = stripped.trim();
    if (en[trimmed]) return stripped.replace(trimmed, en[trimmed]);
    if(/^[✓✗]\s+/.test(stripped)) return stripped.slice(0,2)+translate(stripped.slice(2), lang);
    const dynamic = [
      [/^Schimba aspectul\. Acum: (.+)$/, (_match,theme) => 'Change appearance. Current: '+translate(theme,'en')],
      [/^Prea multe incercari\. Asteapta (\d+) s$/, (_,n) => `Too many attempts. Wait ${n} s`],
      [/^Expira in (\d+) s$/, (_,n) => `Expires in ${n} s`],
      [/^Campul [„"](.+)[”"] (.+)$/, (_,n,rest) => `Field "${translate(n,'en')}" ${translate(rest,'en')}`],
      [/^Se trimit (\d+) (camp|campuri): (.+)$/, (_match,n,_kind,rest) => `Sharing ${n} field${n==='1'?'':'s'}: ${rest.split(', ').map(x=>translate(x,'en')).join(', ')}`],
      [/^Deschide (.+)$/, (_,n) => `Open ${translate(n,'en')}`],
    ];
    for (const [re,fn] of dynamic) if (re.test(stripped)) return stripped.replace(re, fn);
    if(stripped.includes(' · ')) {
      const p = stripped.split(' · '); const trans = p.map(x=> en[x] || x);
      if(trans.some((x,i)=>x!==p[i])) return trans.join(' · ');
    }
    return source;
  }
  function dom(root, lang) {
    document.documentElement.lang = lang === 'en' ? 'en' : 'ro';
    if(!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    while(walker.nextNode()) {
      const node = walker.currentNode;
      const parent = node.parentElement;
      if(parent && (parent.closest('[data-i18n-raw], textarea, script, style, svg'))) continue;
      if(!sources.has(node)) sources.set(node,node.nodeValue);
      const source=sources.get(node);
      const s=source.trim();
      if(!s) continue;
      node.nodeValue=source.replace(s,translate(s,lang));
    }
    const elements = [root,...(root.querySelectorAll?.('[placeholder],[aria-label],[title],[alt]') || [])];
    for(const el of elements) {
      if(!el.getAttribute || (el.closest && el.closest('[data-i18n-raw]'))) continue;
      let old=attrs.get(el); if(!old){old={};attrs.set(el,old);}
      for(const a of ['placeholder','aria-label','title','alt']) {
        if(!el.hasAttribute(a))continue;
        if(!(a in old))old[a]=el.getAttribute(a);
        const s=old[a];if(s)el.setAttribute(a,translate(s,lang));
      }
    }
  }
  window.ROWalletI18n = {translate, dom, ascii, en};
})();
