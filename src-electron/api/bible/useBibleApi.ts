import { ipcMain } from 'electron'
import getChapter from 'src-electron/api/bible/api/getChapter'
import getTopBarState from 'src-electron/api/bible/api/getTopBarState'
import getBibleInfo from 'src-electron/api/bible/api/getBibleInfo'
import getChaptersCount from 'src-electron/api/bible/api/getChaptersCount'
import getIntroduction from 'src-electron/api/bible/api/getIntroduction'
import getCompared from 'src-electron/api/bible/api/getCompared'
import {
  connectDatabase,
  disconnectDatabase,
} from 'src-electron/api/bible/api/databaseConnection'
import findBibleTexts from 'src-electron/api/bible/api/findTextInBible/findBibleTexts.mjs'
import getBibleBooks from 'src-electron/api/bible/api/getBibleBooks'
import getVerses from 'src-electron/api/bible/api/getVerses'
import { ChanelKey } from 'app/src-electron/electron'

export const BibleChanels = {
  'GET_CHAPTER': Symbol('bible:get-chapter') as ChanelKey<typeof getChapter>,
  'GET_TOP_BAR_STATE': Symbol('bible:get-top-bar-state') as ChanelKey<typeof getTopBarState>,
  'GET_INFO': Symbol('bible:get-info') as ChanelKey<typeof getBibleInfo>,
  'GET_BOOKS': Symbol('bible:get-books') as ChanelKey<typeof getBibleBooks>,
  'GET_CHAPTER_COUNTS': Symbol('bible:get-chapters-count') as ChanelKey<typeof getChaptersCount>,
  'GET_FINDED_TEXTS': Symbol('bible:get-finded-texts') as ChanelKey<typeof findBibleTexts>,
  'GET_INTRODUCTIONS': Symbol('bible:get-introductions') as ChanelKey<typeof getIntroduction>,
  'GET_COMPARED_TRANSLATIONS': Symbol('bible:get-compared-translations') as ChanelKey<typeof getCompared>,
  'CONNECT_DATABASE': Symbol('bible:connect-database') as ChanelKey<typeof connectDatabase>,
  'DISCONNECT_DATABASE': Symbol('bible:disconnect-database') as ChanelKey<typeof disconnectDatabase>,
  'GET_VERSES': Symbol('bible:get-verses') as ChanelKey<typeof getVerses>,
}

export default () => {
  ipcMain.handle(BibleChanels.GET_CHAPTER, ({}, args) => getChapter(args))
  ipcMain.handle(BibleChanels.GET_TOP_BAR_STATE, ({}, args) => getTopBarState(args))
  ipcMain.handle(BibleChanels.GET_INFO, ({}, filename) => getBibleInfo(filename))
  ipcMain.handle(BibleChanels.GET_BOOKS, ({}, filename) => getBibleBooks(filename))
  ipcMain.handle(BibleChanels.GET_CHAPTER_COUNTS, ({}, args) => getChaptersCount(args))
  ipcMain.handle(BibleChanels.GET_FINDED_TEXTS, ({}, args) => findBibleTexts(args))
  ipcMain.handle(BibleChanels.GET_INTRODUCTIONS, ({}, args) => getIntroduction(args))
  ipcMain.handle(BibleChanels.GET_COMPARED_TRANSLATIONS, ({}, args) => getCompared(args))
  ipcMain.on(BibleChanels.CONNECT_DATABASE, ({}, filename) => connectDatabase(filename))
  ipcMain.on(BibleChanels.DISCONNECT_DATABASE, ({}, filename) => disconnectDatabase(filename))
  ipcMain.handle(BibleChanels.GET_VERSES, ({}, args) => getVerses(args))
}
