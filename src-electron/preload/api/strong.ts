import { StrongChanels } from 'app/src-electron/api/strong/useStrongApi'
import { ipcRenderer } from 'electron'

export default {
  connectDatabase: (filename: string) => ipcRenderer.send(StrongChanels.CONNECT_DATABASE, filename),
  disconnectDatabase: (filename: string) => ipcRenderer.send(StrongChanels.DISSCONNECT_DATABASE, filename),
  getStrongNumbersInfo: (args: any) => ipcRenderer.invoke(StrongChanels.GET_NUMBERS_INFO, args),
  getFindedVerseByStrong: (args: any) => ipcRenderer.invoke(StrongChanels.GET_VERSE_BY_NUMBER, args),
}
