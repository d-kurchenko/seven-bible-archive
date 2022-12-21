import path from 'path'
import fs from 'fs-extra'
import { ipcRenderer } from 'electron'
import getThemes from 'app/src-electron/api/system/api/getThemes'
import { Download, ModulesRegistry } from 'app/types/registry'

export default {
  fsReaddirSync: (_path: string[]) => fs.readdirSync(path.join(window.dir, ..._path)),
  fsReadFileSync: (_path: string[]) =>
    fs.readFileSync(path.join(window.dir, ..._path), {
      encoding: 'utf-8',
    }),
  fsExistsSync: (_path: string[]) => fs.existsSync(path.join(window.dir, ..._path)),
  getSettings: () =>
    fs.readFileSync(path.join(window.dir, 'user', 'settings', 'settings.json'), {
      encoding: 'utf8',
    }),
  getUserThemes: () =>
    ipcRenderer.invoke('get-themes') as Promise<ReturnType<typeof getThemes>>,
  readUserTheme: (themeName: string) => ipcRenderer.invoke('read-user-theme', themeName),
  getFontList: () => ipcRenderer.invoke('get-font-list'),
  saveProgramSettings: (state: string) =>
    ipcRenderer.invoke('save-program-settings', state),
  getModulesRegistry: (): Promise<ModulesRegistry> =>
    ipcRenderer.invoke('get-modules-registry'),
  getInstalledModules: (): Promise<Download[]> =>
    ipcRenderer.invoke('get-installed-modules'),
}
