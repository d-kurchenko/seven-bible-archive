import { BibleChanels } from 'app/src-electron/api/bible/useBibleApi'
import { GetVersesArgs } from 'app/types/api-args/bible'
import { ipcRenderer } from 'electron'

export default {
  connectDatabase: (filename: string) => ipcRenderer.send(BibleChanels.CONNECT_DATABASE, filename),
  disconnectDatabase: (filename: string) => ipcRenderer.send(BibleChanels.DISCONNECT_DATABASE, filename),
  getChapter: (args: any): Promise<any> => ipcRenderer.invoke(BibleChanels.GET_CHAPTER, args),
  getTopBarState: (args: any) => ipcRenderer.invoke(BibleChanels.GET_TOP_BAR_STATE, args),
  getBibleInfo: (filename: string) => ipcRenderer.invoke(BibleChanels.GET_INFO, filename),
  getBibleBooks: (filename: string) => ipcRenderer.invoke(BibleChanels.GET_BOOKS, filename),
  getChaptersCount: (args: any) => ipcRenderer.invoke(BibleChanels.GET_CHAPTER_COUNTS, args),
  getFindedTexts: (args: any) => ipcRenderer.invoke(BibleChanels.GET_FINDED_TEXTS, args),
  getIntroduction: (args: any) => ipcRenderer.invoke(BibleChanels.GET_INTRODUCTIONS, args),
  getCompared: (args: any) => ipcRenderer.invoke(BibleChanels.GET_COMPARED_TRANSLATIONS, args),
  getVerses: (args: GetVersesArgs) => ipcRenderer.invoke(BibleChanels.GET_VERSES, args),
}
