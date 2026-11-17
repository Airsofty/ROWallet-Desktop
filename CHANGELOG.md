# ROWallet 0.2.0 — modificări

- Branding independent ROWallet, fără folosirea identității vizuale oficiale ca garanție de certificare.
- Creare reală a seifului local fără înscrieri fictive și fără backend.
- Fraza de acces de minimum 12 caractere și compatibilitate cu PIN-urile de 6 cifre deja existente.
- Cerință DPAPI/safeStorage pentru noile seifuri, cu blocare la lock-screen/suspend.
- Datele profilului: nume, fotografie criptată, eliminare fotografie.
- Adăugare, editare și eliminare documente autodeclarate.
- QR verificabil local, scanare camera/imagine/text de scanner HID, oprire la expirare și protecție contra aceleiași prezentări pe verificatorul local.
- Copii PNG cu filigran personalizat.
- Seif criptat de fișiere cu import/export/ștergere.
- Semnare detașată Ed25519 și verificare a conținutului nealterat.
- Interfață bilingvă la nivelul acțiunilor principale, accesibilitate/contrast, mascarea seriilor, ascunderea la pierderea focusului.
- Jurnal de operațiuni și de încercări nereușite; backup criptat și memento.
- Teste actualizate și suplimentate pentru fișiere, profil, criptografie, semnături și QR.

## Funcții încă neimplementate integral

- EUDI/OpenID4VP, OpenID4VCI, ISO mdoc, SD-JWT VC conform standardelor, atestare de identitate de către instituții și semnături calificate.
- Protocol bidirecțional cerere/răspuns cu nonce și autentificarea solicitantului; consumare globală a QR în lipsa unui server de sincronizare.
- Citire universală a CEI, acces la cip NFC/USB, OCR/MRZ, TWAIN/WIA și SDK-uri proprietare.
- Profiluri multiple complet izolate în aceeași sesiune Windows; în prezent este un singur seif per folder de date Windows.
- Traducere engleză completă a tuturor dialogurilor; localizarea principalelor zone este implementată.
- Installer executabil testat pe Windows și audit/certificare independentă.

## 0.3.0 — Pagina documentelor și animația originală
- Restaurată **exact** secvența HTML a animației de pornire din arhiva originală; efectele CSS și durata nu au fost modificate.
- Formularul „Adaugă document” este acum o pagină dedicată, aerisită, cu selecție a tipului prin meniu și câmpuri potrivite.
- Diplome și certificate pentru liceu, bacalaureat, școală profesională, calificare, master, doctorat, cursuri și alte studii; „Alt document” pentru documente personalizate.
- Documentele adăugate sunt afișate în aceeași grilă de carduri cu buletinul, permisul și diploma, cu aceeași deschidere implicită.
- Drag & drop pentru reordonarea cardurilor, cu ordinea salvată în fișierul criptat al portofelului.
- Cardurile originale, schema cromatică și navigația au rămas nemodificate.
- Nu este inclusă certificarea oficială a documentelor. Nu a fost testată versiunea pe un PC Windows real.

## 0.3.1 — Traducere completa a interfetei
- Catalog de traduceri RO (fara diacritice) / EN, inclusiv autentificare, mesaje, setari, confirmari si coduri QR.
- Preferinta limbii se pastreaza local si inainte de deblocare, fara continut personal.
- Etichetele afisate sunt traduse fara modificarea datelor criptate sau a cheilor campurilor din documente.
- Confirmarea stergerii accepta STERGE si DELETE fara diacritice.
- Aspectul si animatia originala nu au fost schimbate.
