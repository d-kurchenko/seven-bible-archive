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
  ipcMain.on(ElectronChanels.CLOSE_WINDOW, () => closeWindow())
  ipcMain.on(ElectronChanels.MINIMIZE_WINDOW, () => minimizeWindow())
  ipcMain.on(ElectronChanels.TOGGLE_MAXIMIZE_WINDOW, () => toggleMaximizeWindow())
  ipcMain.handle(ElectronChanels.GET_WINDOW_BOUNDS, () => getWindowBounds())
  ipcMain.handle(ElectronChanels.DOWNLOAD_MODULES, ({}, modules) => downloadModules(modules))
}
