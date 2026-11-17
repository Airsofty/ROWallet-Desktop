'use strict';
const { contextBridge, ipcRenderer: R } = require('electron');
const inv = (c) => (...a) => R.invoke(c, ...a);
contextBridge.exposeInMainWorld('api', {
  status: inv('status'), create: inv('create'), unlock: inv('unlock'), lock: inv('lock'),
  list: inv('list'), reorder: inv('reorder'), history: inv('history'), present: inv('present'), verify: inv('verify'),
  clearHistory: inv('hclear'), wipe: inv('wipe'), exportBackup: inv('bexp'), importBackup: inv('bimp'),
  copy: inv('copy'), settings: inv('sget'), setSetting: inv('sset'),
  changePin: inv('chpin'), issue: inv('issue'), removeDocument: inv('document-remove'),
  trustList: inv('tlist'), trustExport: inv('texport'), trustImport: inv('timport'), trustRemove: inv('tremove'),
  saveCode: inv('fsave'), openCode: inv('fopen'),
  profile: inv('profile'), profileSet: inv('profile-set'), photoPick: inv('photo-pick'), photoRemove: inv('photo-remove'),
  saveWatermark: inv('save-watermark'), fileAdd: inv('file-add'), fileList: inv('file-list'), fileExport: inv('file-export'), fileRemove: inv('file-remove'),
  signFile: inv('sign-file'), verifySignature: inv('check-file-signature'), audit: inv('audit'),
  act: () => R.send('act'),
  onLocked: (f) => R.on('locked', () => f())
});
