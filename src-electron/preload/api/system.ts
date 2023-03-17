import { ipcRenderer } from 'electron'
import { SystemChanels } from 'app/src-electron/api/system/useSystemApi'
import { RendererListener } from 'app/src-electron/electron'

type C = typeof SystemChanels

export default {
  GET_THEMES: (() => ipcRenderer.invoke(SystemChanels.GET_THEMES)) as RendererListener<C['GET_THEMES']>,
  GET_USER_THEMES: ((...args) => ipcRenderer.invoke(SystemChanels.GET_USER_THEMES, ...args)) as RendererListener<C['GET_USER_THEMES']>,
  GET_FONT_LIST: (() => ipcRenderer.invoke(SystemChanels.GET_FONT_LIST)) as RendererListener<C['GET_FONT_LIST']>,
  SAVE_SETTINGS: ((...args) => ipcRenderer.invoke(SystemChanels.SAVE_SETTINGS, ...args)) as RendererListener<C['SAVE_SETTINGS']>,
  GET_MODULES_REGISTRY: (() => ipcRenderer.invoke(SystemChanels.GET_MODULES_REGISTRY)) as RendererListener<C['GET_MODULES_REGISTRY']>,
  GET_INSTALLED_MODULES: (() => ipcRenderer.invoke(SystemChanels.GET_INSTALLED_MODULES)) as RendererListener<C['GET_INSTALLED_MODULES']>,
  GET_READ_DIR: ((...args) => ipcRenderer.invoke(SystemChanels.GET_READ_DIR, ...args)) as RendererListener<C['GET_READ_DIR']>,
  GET_READ_FILE: ((...args) => ipcRenderer.invoke(SystemChanels.GET_READ_FILE, ...args)) as RendererListener<C['GET_READ_FILE']>,
  GET_EXISTS: ((...args) => ipcRenderer.invoke(SystemChanels.GET_EXISTS, ...args)) as RendererListener<C['GET_EXISTS']>,
  GET_SETTINGS: (() => ipcRenderer.invoke(SystemChanels.GET_SETTINGS)) as RendererListener<C['GET_SETTINGS']>,
  GET_SETTINGS_SYNC: (() => ipcRenderer.sendSync(SystemChanels.GET_SETTINGS_SYNC)) as RendererListener<C['GET_SETTINGS_SYNC']>,
}
