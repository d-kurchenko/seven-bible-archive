import { ChanelKey } from 'app/src-electron/electron'
import { ipcMain } from 'electron'
import getCrossreferences from 'src-electron/api/crossreferences/api/getCrossreferences'

export const CrossreferencesChanels = {
  'GET_CROSSREFERENCES': Symbol('electron:close-window') as ChanelKey<typeof getCrossreferences>,
}

export default () => {
  ipcMain.handle(CrossreferencesChanels.GET_CROSSREFERENCES, (event, args) => getCrossreferences(args))
}
