import path from 'path'
import fs from 'fs-extra'
import { ipcRenderer } from 'electron'
import { SystemChanels } from 'app/src-electron/api/system/useSystemApi'

export default {
  getUserThemes: () => ipcRenderer.invoke(SystemChanels.GET_THEMES),
  readUserTheme: (themeName: string) => ipcRenderer.invoke(SystemChanels.GET_USER_THEMES, themeName),
  getFontList: () => ipcRenderer.invoke(SystemChanels.GET_FONT_LIST),
  saveProgramSettings: (state: string) => ipcRenderer.invoke(SystemChanels.SAVE_SETTINGS, state),
  getModulesRegistry: () => ipcRenderer.invoke(SystemChanels.GET_MODULES_REGISTRY),
  getInstalledModules: () => ipcRenderer.invoke(SystemChanels.GET_INSTALLED_MODULES),
  fsReaddirSync: (_path: string[]) =>
    fs.readdirSync(path.join(window.dir, ..._path)),
  fsReadFileSync: (_path: string[]) =>
    fs.readFileSync(path.join(window.dir, ..._path), {
      encoding: 'utf-8',
    }),
  fsExistsSync: (_path: string[]) => fs.existsSync(path.join(window.dir, ..._path)),
  getSettings: () =>
    fs.readFileSync(path.join(window.dir, 'user', 'settings', 'settings.json'), {
      encoding: 'utf8',
    }),
}
