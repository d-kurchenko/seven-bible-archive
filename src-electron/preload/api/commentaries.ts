import { CommentariesChanels } from 'app/src-electron/api/commentaries/useCommentariesApi'
import { RendererListener } from 'app/src-electron/electron'
import { ipcRenderer } from 'electron'

type C = typeof CommentariesChanels

export default {
  CONNECT_DATABASE: ((...args) => ipcRenderer.send(CommentariesChanels.CONNECT_DATABASE, ...args)) as RendererListener<C['CONNECT_DATABASE']>,
  DISCONNECT_DATABASE: ((...args) => ipcRenderer.send(CommentariesChanels.DISCONNECT_DATABASE, ...args)) as RendererListener<C['DISCONNECT_DATABASE']>,
  GET_COMMENTARIES: ((...args) => ipcRenderer.invoke(CommentariesChanels.GET_COMMENTARIES, ...args)) as RendererListener<C['GET_COMMENTARIES']>,
  GET_FOOTNOTES: ((...args) => ipcRenderer.invoke(CommentariesChanels.GET_FOOTNOTES, ...args)) as RendererListener<C['GET_FOOTNOTES']>,
  GET_COMPARED: ((...args) => ipcRenderer.invoke(CommentariesChanels.GET_COMPARED, ...args)) as RendererListener<C['GET_COMPARED']>,
}
