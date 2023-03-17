import { ipcMain } from 'electron'
import { ChanelKey } from 'app/src-electron/electron'
import * as API from './api'

type API = typeof API

export const StrongChanels = {
  'GET_NUMBERS_INFO': 'strong:get-numbers-info' as ChanelKey<API['getStrongNumbersInfo']>,
  'GET_VERSE_BY_NUMBER': 'strong:get-verse-by-number' as ChanelKey<API['getVersesByStrong']>,
  'CONNECT_DATABASE': 'strong:connect-database' as ChanelKey<API['connectDatabase']>,
  'DISSCONNECT_DATABASE': 'strong:disconnect-database' as ChanelKey<API['disconnectDatabase']>,
}

export default () => {
  ipcMain.handle(StrongChanels.GET_NUMBERS_INFO, (_, args) => API.getStrongNumbersInfo(args))
  ipcMain.handle(StrongChanels.GET_VERSE_BY_NUMBER, (_, args) => API.getVersesByStrong(args))
  ipcMain.on(StrongChanels.CONNECT_DATABASE, (_, filename) => API.connectDatabase(filename))
  ipcMain.on(StrongChanels.DISSCONNECT_DATABASE, (_, filename) => API.disconnectDatabase(filename))
}
