import { ipcMain } from 'electron'
import createBookmark from 'app/src-electron/api/bookmarks/api/createBookmark'
import { getBookmarkCategories } from 'src-electron/api/bookmarks/api/categoriesFS'
import removeBookmark from 'src-electron/api/bookmarks/api/removeBookmark'
import getPreparedCategories from 'src-electron/api/bookmarks/api/getPreparedCategories'
import createCategory from 'src-electron/api/bookmarks/api/createCategory'
import deleteCategory from 'src-electron/api/bookmarks/api/deleteCategory'
import { ChanelKey } from 'app/src-electron/electron'

export const BookmarksChanels = {
  'CREATE_BOOKMARK': Symbol('bookmark:create-bookmark') as ChanelKey<typeof createBookmark>,
  'GET_BOOKMARK_CATEGORIES': Symbol('bookmark:get-bookmark-categories') as ChanelKey<typeof getBookmarkCategories>,
  'REMOVE_BOOKMARK': Symbol('bookmark:remove-bookmark') as ChanelKey<typeof removeBookmark>,
  'GET_PREPARED_CATEGORIES': Symbol('bookmark:get-prepared-categories') as ChanelKey<typeof getPreparedCategories>,
  'CREATE_CATEGORY': Symbol('bookmark:create-category') as ChanelKey<typeof createCategory>,
  'DELETE_CATEGORY': Symbol('bookmark:delete-category') as ChanelKey<typeof deleteCategory>,
}

export default () => {
  ipcMain.handle(BookmarksChanels.CREATE_BOOKMARK, ({}, args) => createBookmark(args))
  ipcMain.handle(BookmarksChanels.GET_BOOKMARK_CATEGORIES, ({}, filename) => getBookmarkCategories(filename))
  ipcMain.handle(BookmarksChanels.REMOVE_BOOKMARK, ({}, args) => removeBookmark(args))
  ipcMain.handle(BookmarksChanels.GET_PREPARED_CATEGORIES, ({}, args) => getPreparedCategories(args))
  ipcMain.handle(BookmarksChanels.CREATE_CATEGORY, ({}, args) => createCategory(args))
  ipcMain.handle(BookmarksChanels.DELETE_CATEGORY, ({}, args) => deleteCategory(args))
}
