import { CommentariesChanels } from 'app/src-electron/api/commentaries/useCommentariesApi'
import { Commentaries } from 'app/src-electron/types/commentaries'
import { ipcRenderer } from 'electron'

export default {
  connectDatabase: (filename: string) => ipcRenderer.send(CommentariesChanels.CONNECT_DATABASE, filename),
  disconnectDatabase: (filename: string) => ipcRenderer.send(CommentariesChanels.DISCONNECT_DATABASE, filename),
  getCommentaries: (args: any) => ipcRenderer.invoke(CommentariesChanels.GET_COMMENTARIES, args),
  getFootnotes: (args: any): Promise<Commentaries[]> => ipcRenderer.invoke(CommentariesChanels.GET_FOOTNOTES, args),
  getCompared: (args: any): Promise<Commentaries[]> => ipcRenderer.invoke(CommentariesChanels.GET_COMPARED, args),
}
