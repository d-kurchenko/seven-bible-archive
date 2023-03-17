import { ipcMain } from 'electron'
import { ChanelKey } from 'app/src-electron/electron'
import * as API from './api'

type API = typeof API

export const BibleChanels = {
  'GET_CHAPTER': 'bible:get-chapter' as ChanelKey<API['getChapter']>,
  'GET_TOP_BAR_STATE': 'bible:get-top-bar-state' as ChanelKey<API['getTopBarState']>,
  'GET_INFO': 'bible:get-info' as ChanelKey<API['getBibleInfo']>,
  'GET_BOOKS': 'bible:get-books' as ChanelKey<API['getBibleBooks']>,
  'GET_CHAPTER_COUNTS': 'bible:get-chapters-count' as ChanelKey<API['getChaptersCount']>,
  'GET_FINDED_TEXTS': 'bible:get-finded-texts' as ChanelKey<API['findBibleTexts']>,
  'GET_INTRODUCTIONS': 'bible:get-introductions' as ChanelKey<API['getIntroduction']>,
  'GET_COMPARED_TRANSLATIONS': 'bible:get-compared-translations' as ChanelKey<API['getCompared']>,
  'CONNECT_DATABASE': 'bible:connect-database' as ChanelKey<API['connectDatabase'], false>,
  'DISCONNECT_DATABASE': 'bible:disconnect-database' as ChanelKey<API['disconnectDatabase'], false>,
  'GET_VERSES': 'bible:get-verses' as ChanelKey<API['getVerses']>,
}

export default () => {
  ipcMain.handle(BibleChanels.GET_CHAPTER, ({}, args) => API.getChapter(args))
  ipcMain.handle(BibleChanels.GET_TOP_BAR_STATE, ({}, args) => API.getTopBarState(args))
  ipcMain.handle(BibleChanels.GET_INFO, ({}, filename) => API.getBibleInfo(filename))
  ipcMain.handle(BibleChanels.GET_BOOKS, ({}, filename) => API.getBibleBooks(filename))
  ipcMain.handle(BibleChanels.GET_CHAPTER_COUNTS, ({}, args) => API.getChaptersCount(args))
  ipcMain.handle(BibleChanels.GET_FINDED_TEXTS, ({}, args) => API.findBibleTexts(args))
  ipcMain.handle(BibleChanels.GET_INTRODUCTIONS, ({}, args) => API.getIntroduction(args))
  ipcMain.handle(BibleChanels.GET_COMPARED_TRANSLATIONS, ({}, args) => API.getCompared(args))
  ipcMain.on(BibleChanels.CONNECT_DATABASE, ({}, filename) => API.connectDatabase(filename))
  ipcMain.on(BibleChanels.DISCONNECT_DATABASE, ({}, filename) => API.disconnectDatabase(filename))
  ipcMain.handle(BibleChanels.GET_VERSES, ({}, args) => API.getVerses(args))
 }
