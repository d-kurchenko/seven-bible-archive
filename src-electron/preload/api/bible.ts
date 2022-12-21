import { BibleBooks, BibleInfo } from 'app/src-electron/types/bible'
import { GetVersesArgs } from 'app/types/api-args/bible'
import { PreparedVerse } from 'app/types/api-modified/bible'
import { ipcRenderer } from 'electron'

export default {
  connectDatabase: (filename: string) =>
    ipcRenderer.send('connect-bible-database', filename),
  disconnectDatabase: (filename: string) =>
    ipcRenderer.send('disconnect-bible-database', filename),
  getChapter: (args: any) => ipcRenderer.invoke('get-chapter', args),
  getTopBarState: (args: any) => ipcRenderer.invoke('get-top-bar-state', args),
  getBibleInfo: (filename: string): Promise<BibleInfo> =>
    ipcRenderer.invoke('get-bible-info', filename),
  getBibleBooks: (filename: string): Promise<BibleBooks> =>
    ipcRenderer.invoke('get-bible-books', filename),
  getChaptersCount: (args: any) => ipcRenderer.invoke('get-count-of-chapters', args),
  getFindedTexts: (args: any) => ipcRenderer.invoke('find-texts-in-bible', args),
  getIntroduction: (args: any) => ipcRenderer.invoke('get-introductions', args),
  getCompared: (args: any) => ipcRenderer.invoke('get-compared-translations', args),
  getVerses: (args: GetVersesArgs): Promise<PreparedVerse[]> =>
    ipcRenderer.invoke('get-bible-verses', args),
}
