import { ipcRenderer } from 'electron'
import { Commentaries } from 'src/types/store/bible'

export default {
  connectDatabase: (filename: string) =>
    ipcRenderer.send('connect-commentaries-database', filename),
  disconnectDatabase: (filename: string) =>
    ipcRenderer.send('disconnect-commentaries-database', filename),
  getCommentaries: (args: any) => ipcRenderer.invoke('get-commentaries', args),
  getFootnotes: (args: any): Promise<Commentaries[]> =>
    ipcRenderer.invoke('get-footnotes', args),
  getCompared: (args: any): Promise<Commentaries[]> =>
    ipcRenderer.invoke('commentaries:get-compared', args),
}
