import { ipcMain } from 'electron'
import getStrongNumbersInfo from 'app/src-electron/api/strong/api/getStrongNumbersInfo'
import getVersesByStrong from 'app/src-electron/api/strong/api/getVersesByStrong'
import {
  connectDatabase,
  disconnectDatabase,
} from 'app/src-electron/api/strong/api/databaseConnection'
import { ChanelKey } from 'app/src-electron/electron'

export const StrongChanels = {
  'GET_NUMBERS_INFO': Symbol('strong:get-numbers-info') as ChanelKey<typeof getStrongNumbersInfo>,
  'GET_VERSE_BY_NUMBER': Symbol('strong:get-verse-by-number') as ChanelKey<typeof getVersesByStrong>,
  'CONNECT_DATABASE': Symbol('strong:connect-database') as ChanelKey<typeof connectDatabase>,
  'DISSCONNECT_DATABASE': Symbol('strong:disconnect-database') as ChanelKey<typeof disconnectDatabase>,
}

export default () => {
  ipcMain.handle(StrongChanels.GET_NUMBERS_INFO, (_, args) => getStrongNumbersInfo(args))
  ipcMain.handle(StrongChanels.GET_VERSE_BY_NUMBER, (_, args) => getVersesByStrong(args))
  ipcMain.on(StrongChanels.CONNECT_DATABASE, (_, filename) => connectDatabase(filename))
  ipcMain.on(StrongChanels.DISSCONNECT_DATABASE, (_, filename) => disconnectDatabase(filename))
}
