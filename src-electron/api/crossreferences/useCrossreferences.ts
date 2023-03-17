import { ChanelKey } from 'app/src-electron/electron'
import { ipcMain } from 'electron'
import * as API from './api'

type API = typeof API
export const CrossreferencesChanels = {
  'GET_CROSSREFERENCES': 'electron:close-window' as ChanelKey<API['getCrossreferences']>,
}

export default () => {
  ipcMain.handle(CrossreferencesChanels.GET_CROSSREFERENCES, ({}, args) => API.getCrossreferences(args))
}
