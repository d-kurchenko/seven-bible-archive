import { ChanelKey } from 'app/src-electron/electron'
import { ipcMain } from 'electron'
import { closeWindow, getWindowBounds, minimizeWindow, toggleMaximizeWindow } from 'src-electron/api/electron/api/window'
import { downloadModules } from './api/downloadModules'

export const ElectronChanels = {
  'CLOSE_WINDOW': Symbol('electron:close-window') as ChanelKey<typeof closeWindow>,
  'MINIMIZE_WINDOW': Symbol('electron:minimize-window') as ChanelKey<typeof minimizeWindow>,
  'TOGGLE_MAXIMIZE_WINDOW': Symbol('electron:toggle-maximize-window') as ChanelKey<typeof toggleMaximizeWindow>,
  'GET_WINDOW_BOUNDS': Symbol('electron:get-window-bounds') as ChanelKey<typeof getWindowBounds>,
  'DOWNLOAD_MODULES': Symbol('electron:download-modules') as ChanelKey<typeof downloadModules>,
}

export default () => {
  ipcMain.on('close', () => closeWindow())
  ipcMain.on('minimize', () => minimizeWindow())
  ipcMain.on('toggle-maximize', () => toggleMaximizeWindow())
  ipcMain.handle('get-window-bounds', () => getWindowBounds())
  ipcMain.handle('download-modules', ({}, modules) => downloadModules(modules))
}
