import { ipcMain } from 'electron'
import getCommentaries from 'src-electron/api/commentaries/api/getCommentaries'
import getFootnotes from 'src-electron/api/commentaries/api/getFootnotes'
import {
  connectDatabase,
  disconnectDatabase,
} from 'src-electron/api/commentaries/api/databaseConnection'
import getCompared from 'src-electron/api/commentaries/api/getCompared'
import { ChanelKey } from 'app/src-electron/electron'

export const CommentariesChanels = {
  'GET_COMMENTARIES': Symbol('commentaries:get-commentaries') as ChanelKey<typeof getCommentaries>,
  'GET_FOOTNOTES': Symbol('commentaries:get-footnotes') as ChanelKey<typeof getFootnotes>,
  'CONNECT_DATABASE': Symbol('commentaries:connect-database') as ChanelKey<typeof connectDatabase>,
  'DISCONNECT_DATABASE': Symbol('commentaries:disconnect-database') as ChanelKey<typeof disconnectDatabase>,
  'GET_COMPARED': Symbol('commentaries:get-compared') as ChanelKey<typeof getCompared>,
}

export default () => {
  ipcMain.handle(CommentariesChanels.GET_COMMENTARIES, (event, args) => getCommentaries(args))
  ipcMain.handle(CommentariesChanels.GET_FOOTNOTES, (event, args) => getFootnotes(args))
  ipcMain.on(CommentariesChanels.CONNECT_DATABASE, (event, filename) => connectDatabase(filename))
  ipcMain.on(CommentariesChanels.DISCONNECT_DATABASE, (event, filename) => disconnectDatabase(filename))
  ipcMain.handle(CommentariesChanels.GET_COMPARED, (event, args) => getCompared(args))
}
