import { ipcMain } from 'electron'
import { ChanelKey } from 'app/src-electron/electron'
import * as API from './api'

type API = typeof API

export const SystemChanels = {
  'SAVE_SETTINGS': 'system:save-settings' as ChanelKey<API['saveProgramSettings']>,
  'GET_THEMES': 'system:get-themes' as ChanelKey<API['getThemes']>,
  'GET_USER_THEMES': 'system:get-user-theme' as ChanelKey<API['readUserTheme']>,
  'GET_FONT_LIST': 'system:get-font-list' as ChanelKey<API['getFonts'], true>,
  'GET_MODULES_REGISTRY': 'system:get-modules-registry' as ChanelKey<API['getModulesRegistry']>,
  'GET_INSTALLED_MODULES': 'system:get-installed-modules' as ChanelKey<API['getInstalledModules']>,
  'GET_READ_DIR': 'system:get-read-dir' as ChanelKey<API['getReadDir']>,
  'GET_READ_FILE': 'system:get-read-file' as ChanelKey<API['getReadFile']>,
  'GET_EXISTS': 'system:get-exists' as ChanelKey<API['getExists']>,
  'GET_SETTINGS': 'system:get-settings' as ChanelKey<API['getSettings']>,
  'GET_SETTINGS_SYNC': 'system:get-settings-sync' as ChanelKey<API['getSettings'], false>,
}

export default () => {
  ipcMain.handle(SystemChanels.SAVE_SETTINGS, ({}, ...args) => API.saveProgramSettings(...args))
  ipcMain.handle(SystemChanels.GET_THEMES, () => API.getThemes())
  ipcMain.handle(SystemChanels.GET_USER_THEMES, ({}, ...args) => API.readUserTheme(...args))
  ipcMain.handle(SystemChanels.GET_FONT_LIST, () => API.getFonts())
  ipcMain.handle(SystemChanels.GET_MODULES_REGISTRY, () => API.getModulesRegistry())
  ipcMain.handle(SystemChanels.GET_INSTALLED_MODULES, () => API.getInstalledModules())
  ipcMain.handle(SystemChanels.GET_READ_DIR, ({}, ...args) => API.getReadDir(...args))
  ipcMain.handle(SystemChanels.GET_READ_FILE, ({}, ...args) => API.getReadFile(...args))
  ipcMain.handle(SystemChanels.GET_EXISTS, ({}, ...args) => API.getExists(...args))
  ipcMain.handle(SystemChanels.GET_SETTINGS, () => API.getSettings())
  ipcMain.on(SystemChanels.GET_SETTINGS_SYNC, (event) => { event.returnValue = API.getSettings() })
}
