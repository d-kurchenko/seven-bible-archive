import { ipcMain } from 'electron'
import { ChanelKey } from 'app/src-electron/electron'
import * as API from './api'

type API = typeof API

export const CommentariesChanels = {
  'GET_COMMENTARIES': 'commentaries:get-commentaries' as ChanelKey<API['getCommentaries']>,
  'GET_FOOTNOTES': 'commentaries:get-footnotes' as ChanelKey<API['getFootnotes']>,
  'CONNECT_DATABASE': 'commentaries:connect-database' as ChanelKey<API['connectDatabase'], false>,
  'DISCONNECT_DATABASE': 'commentaries:disconnect-database' as ChanelKey<API['disconnectDatabase'], false>,
  'GET_COMPARED': 'commentaries:get-compared' as ChanelKey<API['getCompared']>,
}

export default () => {
  ipcMain.handle(CommentariesChanels.GET_COMMENTARIES, ({}, args) => API.getCommentaries(args))
  ipcMain.handle(CommentariesChanels.GET_FOOTNOTES, ({}, args) => API.getFootnotes(args))
  ipcMain.on(CommentariesChanels.CONNECT_DATABASE, ({}, filename) => API.connectDatabase(filename))
  ipcMain.on(CommentariesChanels.DISCONNECT_DATABASE, ({}, filename) => API.disconnectDatabase(filename))
  ipcMain.handle(CommentariesChanels.GET_COMPARED, ({}, args) => API.getCompared(args))
}
