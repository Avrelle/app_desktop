require('update-electron-app')()
const { app, BrowserWindow, ipcMain } = require('electron')
const {setUpdateNotification} = require('electron-update-notifier');
const path = require('path')
const electronReload = require('electron-reload');
electronReload(__dirname, {});

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })
  ipcMain.handle('ping', () => 'pong')
  win.loadFile('index.html')
  //win.loadFile('desciption_champ.html')
}
switch (process.platform) {
  case 'darwin':
  case 'win32':
      require('update-electron-app')()
      break
  default:
      require('electron-update-notifier').setUpdateNotification({
          // options
      })
}
app.whenReady().then(() => {
    createWindow()
    setUpdateNotification({
      repository: 'Avrelle/https://github.com/Avrelle/app_desktop.git', // Optional, use repository field from your package.json when not specified
      token: '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', // Optional, GitHub api access token
      debug: false, // Optional, default `false`, allows to check for updates during development as well
      silent: true // Optional, notify when new version available, otherwise remain silent 
  })
  
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  })

