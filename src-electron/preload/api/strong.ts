import { StrongChanels } from 'app/src-electron/api/strong/useStrongApi'
import { RendererListener } from 'app/src-electron/electron'
import { ipcRenderer } from 'electron'

type C = typeof StrongChanels

export default {
  CONNECT_DATABASE: ((...args) => ipcRenderer.send(StrongChanels.CONNECT_DATABASE, ...args)) as RendererListener<C['CONNECT_DATABASE']>,
  DISSCONNECT_DATABASE: ((...args) => ipcRenderer.send(StrongChanels.DISSCONNECT_DATABASE, ...args)) as RendererListener<C['DISSCONNECT_DATABASE']>,
  GET_NUMBERS_INFO: ((...args) => ipcRenderer.invoke(StrongChanels.GET_NUMBERS_INFO, ...args)) as RendererListener<C['GET_NUMBERS_INFO']>,
  GET_VERSE_BY_NUMBER: ((...args) => ipcRenderer.invoke(StrongChanels.GET_VERSE_BY_NUMBER, ...args)) as RendererListener<C['GET_VERSE_BY_NUMBER']>,
}
