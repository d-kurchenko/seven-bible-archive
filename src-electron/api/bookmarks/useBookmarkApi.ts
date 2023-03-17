import { ipcMain } from 'electron'
import { ChanelKey } from 'app/src-electron/electron'
import * as API from './api'

type API = typeof API

export const BookmarksChanels = {
  'CREATE_BOOKMARK': 'bookmark:create-bookmark' as ChanelKey<API['createBookmark']>,
  'GET_BOOKMARK_CATEGORIES': 'bookmark:get-bookmark-categories' as ChanelKey<API['getBookmarkCategories']>,
  'REMOVE_BOOKMARK': 'bookmark:remove-bookmark' as ChanelKey<API['removeBookmark']>,
  'GET_PREPARED_CATEGORIES': 'bookmark:get-prepared-categories' as ChanelKey<API['getPreparedCategories']>,
  'CREATE_CATEGORY': 'bookmark:create-category' as ChanelKey<API['createCategory']>,
  'DELETE_CATEGORY': 'bookmark:delete-category' as ChanelKey<API['deleteCategory']>,
}

export default () => {
  ipcMain.handle(BookmarksChanels.CREATE_BOOKMARK, ({}, args) => API.createBookmark(args))
  ipcMain.handle(BookmarksChanels.GET_BOOKMARK_CATEGORIES, ({}, filename) => API.getBookmarkCategories(filename))
  ipcMain.handle(BookmarksChanels.REMOVE_BOOKMARK, ({}, args) => API.removeBookmark(args))
  ipcMain.handle(BookmarksChanels.GET_PREPARED_CATEGORIES, ({}, args) => API.getPreparedCategories(args))
  ipcMain.handle(BookmarksChanels.CREATE_CATEGORY, ({}, args) => API.createCategory(args))
  ipcMain.handle(BookmarksChanels.DELETE_CATEGORY, ({}, args) => API.deleteCategory(args))
}
