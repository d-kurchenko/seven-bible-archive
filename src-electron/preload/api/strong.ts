import { ipcRenderer } from 'electron'

export default {
  connectDatabase: (filename: string) =>
    ipcRenderer.send('connect-strong-database', filename),
  disconnectDatabase: (filename: string) =>
    ipcRenderer.send('disconnect-strong-database', filename),
  getStrongNumbersInfo: (args: any) =>
    ipcRenderer.invoke('get-strong-numbers-info', args),
  getFindedVerseByStrong: (args: any) => ipcRenderer.invoke('find-verse-by-strong', args),
}
