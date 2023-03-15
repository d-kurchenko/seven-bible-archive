import { ElectronChanels } from 'app/src-electron/api/electron/useElectronApi'
import { Download } from 'app/types/registry'
import { ipcRenderer } from 'electron'

export default {
  onCloseApp: (callback: () => void) => ipcRenderer.once('close-app', callback),
  closeApp: () => ipcRenderer.send('close-app'),
  close: () => ipcRenderer.send(ElectronChanels.CLOSE_WINDOW),
  getWindowBounds: () => ipcRenderer.invoke(ElectronChanels.GET_WINDOW_BOUNDS),
  minimize: () => ipcRenderer.send(ElectronChanels.MINIMIZE_WINDOW),
  toggleMaximize: () => ipcRenderer.send(ElectronChanels.TOGGLE_MAXIMIZE_WINDOW),
  downloadModules: (modules: Download[]) => ipcRenderer.invoke(ElectronChanels.DOWNLOAD_MODULES, modules),
}
