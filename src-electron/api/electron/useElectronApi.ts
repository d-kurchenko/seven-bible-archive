import { ChanelKey } from 'app/src-electron/electron'
import { ipcMain } from 'electron'
import * as API from './api'

type API = typeof API

export const ElectronChanels = {
  'CLOSE_WINDOW': 'electron:close-window' as ChanelKey<API['closeWindow'], false>,
  'MINIMIZE_WINDOW': 'electron:minimize-window' as ChanelKey<API['minimizeWindow'], false>,
  'TOGGLE_MAXIMIZE_WINDOW': 'electron:toggle-maximize-window' as ChanelKey<API['toggleMaximizeWindow'], false>,
  'GET_WINDOW_BOUNDS': 'electron:get-window-bounds' as ChanelKey<API['getWindowBounds']>,
  'DOWNLOAD_MODULES': 'electron:download-modules' as ChanelKey<API['downloadModules']>,
}

export default () => {
  ipcMain.on(ElectronChanels.CLOSE_WINDOW, () => API.closeWindow())
  ipcMain.on(ElectronChanels.MINIMIZE_WINDOW, () => API.minimizeWindow())
  ipcMain.on(ElectronChanels.TOGGLE_MAXIMIZE_WINDOW, () => API.toggleMaximizeWindow())
  ipcMain.handle(ElectronChanels.GET_WINDOW_BOUNDS, () => API.getWindowBounds())
  ipcMain.handle(ElectronChanels.DOWNLOAD_MODULES, ({}, modules) => API.downloadModules(modules))
}
