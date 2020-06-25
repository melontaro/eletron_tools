'use strict'

import { Menu, Tray, app, BrowserWindow, ipcMain } from 'electron'
import '../renderer/store'
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 800,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    }
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}
let tray = null
app.on('ready', () => {
  createWindow()
  menuTray()
})

function menuTray () {
  const path = require('path')
  let execPath = path.dirname(process.execPath)
  tray = new Tray(execPath + '/icon.ico') // path.join(__dirname, 'icon.ico')
  const contextMenu = Menu.buildFromTemplate([
    { label: '显示/隐藏', click: function () {
      mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
    } },
    { label: '关于' },
    { type: 'separator' },
    { label: '开机启动', type: 'checkbox', checked: app.getLoginItemSettings().openAtLogin,click:function () {
      if(!app.isPackaged){
        app.setLoginItemSettings({
          openAtLogin: !app.getLoginItemSettings().openAtLogin,
          path: process.execPath
        })
      }else{
        app.setLoginItemSettings({
          openAtLogin: !app.getLoginItemSettings().openAtLogin
        })
      }
      console.log(app.getLoginItemSettings().openAtLogin)
      console.log(!app.isPackaged);
    } },
    { type: 'separator' },
    { label: '退出',
      click: function () {
        app.quit()
      } }
  ])
  tray.setToolTip('米粒,收集每分每秒的前进时光!')
  tray.setContextMenu(contextMenu)
  tray.on('double-click',()=>{
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
  })
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('hideMainWindow',(e,arg)=>
{
  mainWindow.hide()
})
/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
