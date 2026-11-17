# ROWallet — portofel local pentru Windows

**Versiune comunitară independentă, 0.2.0.** Aplicația este un portofel privat și local, nu portofelul electronic oficial al statului român și nu un EUDI Wallet certificat. Nu emite documente oficiale, nu face identificare la distanță, nu validează identitatea dintr-o fotografie și nu pretinde că documentele introduse de utilizator provin de la instituții.

## Cum pornește

1. Pe Windows, instalează Node.js LTS.
2. În folderul dezarhivat execută `PORNESTE.bat` sau `npm install` și `npm start`.
3. La prima pornire, alege o frază de acces (minimum 12 caractere). Pentru seifurile create cu versiuni mai vechi, selectează **PIN / Frază de acces** și introdu vechiul cod de șase cifre. Îl poți schimba apoi cu o frază.
4. După deblocare, setează numele și fotografia în **Contul meu** și introdu datele documentelor în **Portofel → Adaugă document**.
**Migrare din vechea versiune:** înainte de a instala noul ROWallet, deschide versiunea anterioară și creează un backup criptat `.rwbak`. Noua denumire poate folosi un alt folder de date. Creează noul cont local, intră la **Contul meu → Restaurează** și alege backup-ul anterior. Documentele fictive din portofelele vechi nu sunt eliminate automat; șterge-le individual și introdu datele tale. Păstrează backup-ul inițial până când verifici restaurarea.

5. Pe Windows, `CREEAZA-INSTALLER.bat` / `npm run dist` construiește instalatorul NSIS. Nu este semnat cu certificat de publicare; Windows poate afișa SmartScreen.

## Funcționalități

- **Fără server și fără bază de date externă**. Seiful este stocat local într-un fișier AES-256-GCM. Cheia derivă din fraza de acces folosind scrypt și din cheia de dispozitiv protejată prin Electron safeStorage (DPAPI pe Windows). Crearea unui seif nou e refuzată când safeStorage nu protejează cheia.
- **Cont real local**, fără email, telefon sau servicii la distanță. Nu presupune verificarea identității civile.
- **Profil foto** (PNG/JPEG/WebP până la 2 MB) și nume. Datele sunt incluse în seiful criptat și în backup.
- **Documente autodeclarate**: carte de identitate, permis, diplomă. Nu sunt prepopulate cu persoane fictive. Semnătura Ed25519 este generată de propriul portofel, nu de autorități.
- **QR de prezentare** cu selecție de câmpuri, consimțământ, expirare după 60 secunde, verificare locală. Codurile deja verificate sunt refuzate la reutilizare **pe același calculator** cât timp sunt reținute; offline nu se poate garanta consumarea globală a unui cod pe două calculatoare diferite. Codurile mari pot fi prea dense pentru unele camere.
- **Scanare QR**: cameră Windows, imagine PNG/JPG/WebP, text scanat prin dispozitive USB care se prezintă ca o tastatură (keyboard wedge) și fișier `.rwp`. Scanerele de cip CEI, NFC, MRZ, OCR și SDK-uri USB proprietare NU sunt acceptate universal; necesită integrare și test pe modelul concret de dispozitiv.
- **Copie PNG cu filigran** și scopul partajării; nu este copie certificată a unui document oficial.
- **Seif de fișiere** PDF/PNG/JPEG/TXT, max. 8 MB/fișier, 30 fișiere și maximum 24 MB cumulat. Importul în seif nu verifică autenticitatea documentului.
- **Semnătură Ed25519 locală**, detașată `.rwsig`, pentru fișiere până la 30 MB, plus verificare. Este semnătură simplă / verificare criptografică, NU semnătură calificată sau avansată garantată în sensul eIDAS. O cheie externă nu are identitatea verificată.
- **Limbă română/engleză** (traducere pentru elementele principale ale interfeței; unele mesaje detaliate pot rămâne în română), teme, contrast, mascare a seriilor, protecția afișării la pierderea focusului, blocare la blocarea/suspendarea Windows, blocare după 5 minute de inactivitate, registru local de activități.
- **Memento pentru backup** după 30 de zile de la ultimul export (sau dacă nu există backup). **Backup criptat**, portabil pe alt calculator cu parolă de minimum 8 caractere. Nu înlocuiește un sistem de recuperare a parolei de seif; pierderea parolei fără backup este ireversibilă.

## Verificare

`npm test` — teste pentru criptografie, credențiale locale, IPC și interfață simulată. Testele nu înlocuiesc verificarea pe Windows, auditul de securitate, testarea camerelor și a scanerelor, accesibilitatea sau certificarea legală.

## Limitări și siguranță

- Codurile `RW1` sunt un format ROWallet local propriu, nu un OpenID4VP, OpenID4VCI, SD-JWT VC, mdoc sau EUDI Wallet conform standardelor.
- Un emitent local poate fi importat drept contact de încredere doar manual; acesta nu devine autoritate oficială. Nu folosi rezultatului „valid” drept dovadă a identității civile.
- Nu garantează «unică folosință» a unui QR la toate verificatoarele offline: nu există stare comună între dispozitive.
- Nu suportă arbitrar orice cititor USB de cărți de identitate, acces la cip, semnătură calificată, revocare oficială sau Windows Hello.
- Protecția capturilor de ecran și mascarea la pierderea focusului nu împiedică fotografierea fizică a ecranului sau extragerea datelor de un malware cu privilegii pe calculator.
- Instalatorul nu este semnat digital, iar executabilul nu a fost validat într-un mediu Windows real aici.
- Nicio aplicație independentă nu poate obține statut EUDI Wallet doar prin implementarea unor funcții. Acesta implică mecanisme și certificări oficiale distincte.

## Confidențialitate

Aplicația blochează cererile de rețea în sesiunea Electron. Nu include server, sincronizare, telemetrie sau backend. Exportul de fișiere, clipboard-ul și backup-urile sunt acțiuni explicite ale utilizatorului; fișierele exportate în afara seifului **nu mai sunt automat criptate**. Poți șterge contul local din aplicație, dar copiile de rezervă salvate separat trebuie șterse de tine. Datele de pe suport SSD nu pot fi garantat șterse fizic prin simpla ștergere a fișierelor.

### ROWallet 0.3 — Documente noi
În **Documentele mele**, apasă **+ Adaugă document**. Se deschide o pagină dedicată; selectează tipul și completează datele. Tipurile educaționale includ liceu, bacalaureat, școală profesională, calificare, licență, master, doctorat și cursuri. Folosește **Alt document** pentru un tip personalizat. La salvare, cardul apare în aceeași grilă ca buletinul și permisul. Deschiderea unui card și panoul de detalii rămân neschimbate. Pentru a schimba ordinea, trage un card peste altul; ordinea este stocată în seiful criptat.

**Animația de pornire** folosește exact marcajul HTML din arhiva originală, cu aceleași stiluri și temporizări. Pentru migrare, salvează întâi un backup din versiunea anterioară și păstrează o copie a fișierelor vechi până când verifici noua versiune.

## Limba interfetei (0.3.1)
- Contul meu -> Limba -> Romana / English. Limba selectata se aplica si ecranului de blocare, inclusiv dupa repornirea programului.
- Interfata romana nu necesita diacritice. In meniuri, campuri si mesaje, textul afisat foloseste alfabetul fara diacritice; codul salveaza valorile personale exact asa cum le-ai introdus.
- Cheile istorice ale documentelor (de exemplu „Data nașterii”) raman neschimbate in seiful criptat si in QR, pentru compatibilitate. In engleza sunt traduse doar etichetele afisate.
- Limba este singura preferinta stocata separat, in `ui-language.txt` din folderul local al aplicatiei. Fisierul nu contine date personale.
- Pentru stergerea datelor poti tasta `STERGE` sau `DELETE`, inclusiv de pe tastaturi fara diacritice.
