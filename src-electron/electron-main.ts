import {
  app, BrowserWindow, nativeTheme, ipcMain,
} from 'electron'
import path from 'path'
import os from 'os'
import { getSettings } from './helpers/getSettings'
import useApi from 'app/src-electron/api/useApi'

const dir = process.env.DEBUGGING ? '' : path.resolve(app.getPath('userData'))
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.dir = dir
process.env.dir = dir.toString()
const { app: { win } } = getSettings()

// needed in case process is undefined under Linux
const platform = process.platform || os.platform()

try {
  if (platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    require('fs').unlinkSync(path.join(app.getPath('userData'), 'DevTools Extensions'))
  }
} catch (error) {
  console.error(error)
}

useApi()

let mainWindow: BrowserWindow | undefined

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    icon: path.resolve(__dirname, 'icons/icon.png'), // tray icon
    center: true,
    useContentSize: true,
    frame: false,
    minHeight: 600,
    minWidth: 600,
    ...win,
    webPreferences: {
      contextIsolation: true,
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD),
      sandbox: false,
    },
  })

  mainWindow.loadURL(process.env.APP_URL)

  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools()
  } else {
    // we're on production; no access to devtools pls
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow?.webContents.closeDevTools()
    })
  }

  mainWindow.on('close', (e) => {
    e.preventDefault()
    ipcMain.once('close-app', () => {
      mainWindow?.destroy()
    })
    mainWindow?.webContents.send('close-app')
  })

  mainWindow.on('closed', () => {
    mainWindow = undefined
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === undefined) {
    createWindow()
  }
})
