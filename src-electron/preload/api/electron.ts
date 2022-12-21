import { Download } from 'app/types/registry'
import { ipcRenderer } from 'electron'

export default {
  onCloseApp: (callback: () => void) => ipcRenderer.once('close-app', callback),
  closeApp: () => ipcRenderer.send('close-app'),
  close: () => ipcRenderer.send('close'),
  getWindowBounds: () => ipcRenderer.invoke('get-window-bounds'),
  minimize: () => ipcRenderer.send('minimize'),
  toggleMaximize: () => ipcRenderer.send('toggle-maximize'),
  downloadModules: (modules: Download[]) =>
    ipcRenderer.invoke('download-modules', modules),
}
