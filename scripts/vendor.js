'use strict';
// Copiază biblioteca de citire a codurilor QR (jsQR) lângă interfață, ca să funcționeze fără rețea.
const fs = require('fs'), path = require('path');
try {
  const src = require.resolve('jsqr');
  const dir = path.join(__dirname, '..', 'renderer', 'vendor');
  fs.mkdirSync(dir, { recursive: true });
  fs.copyFileSync(src, path.join(dir, 'jsQR.js'));
  console.log('jsQR copiat în renderer/vendor');
} catch (e) {
  console.log('jsQR indisponibil: scanarea cu camera va fi dezactivată (' + e.message + ')');
}
