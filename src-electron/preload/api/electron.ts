import { ElectronChanels } from 'app/src-electron/api/electron/useElectronApi'
import { RendererListener } from 'app/src-electron/electron'
import { ipcRenderer } from 'electron'

type C = typeof ElectronChanels

export default {
  onCloseApp: (callback: () => void) => ipcRenderer.once('close-app', callback),
  closeApp: () => ipcRenderer.send('close-app'),
  CLOSE_WINDOW: (() => ipcRenderer.send(ElectronChanels.CLOSE_WINDOW)) as RendererListener<C['CLOSE_WINDOW']>,
  GET_WINDOW_BOUNDS: (() => ipcRenderer.invoke(ElectronChanels.GET_WINDOW_BOUNDS)) as RendererListener<C['GET_WINDOW_BOUNDS']>,
  MINIMIZE_WINDOW: (() => ipcRenderer.send(ElectronChanels.MINIMIZE_WINDOW)) as RendererListener<C['MINIMIZE_WINDOW']>,
  TOGGLE_MAXIMIZE_WINDOW: (() => ipcRenderer.send(ElectronChanels.TOGGLE_MAXIMIZE_WINDOW)) as RendererListener<C['TOGGLE_MAXIMIZE_WINDOW']>,
  DOWNLOAD_MODULES: ((...args) => ipcRenderer.invoke(ElectronChanels.DOWNLOAD_MODULES, ...args)) as RendererListener<C['DOWNLOAD_MODULES']>,
}
