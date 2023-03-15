import { BookmarksChanels } from 'app/src-electron/api/bookmarks/useBookmarkApi'
import {
  CreateCategoryArgs,
  DeleteCategoryArgs,
  GetPreparedCategoriesArgs,
} from 'app/types/api-args/categories'
import { MakeBookmarkArgs, RemoveBookmarkArgs } from 'app/types/api-args/system'
import { ipcRenderer } from 'electron'

export default {
  makeBookmark: (args: MakeBookmarkArgs) => ipcRenderer.invoke(BookmarksChanels.CREATE_BOOKMARK, args),
  getBookmarkCategories: (filename: string) => ipcRenderer.invoke(BookmarksChanels.GET_BOOKMARK_CATEGORIES, filename),
  removeBookmark: (args: RemoveBookmarkArgs) => ipcRenderer.invoke(BookmarksChanels.REMOVE_BOOKMARK, args),
  getPreparedCategories: (args: GetPreparedCategoriesArgs) => ipcRenderer.invoke(BookmarksChanels.GET_PREPARED_CATEGORIES, args),
  createCategory: (args: CreateCategoryArgs) => ipcRenderer.invoke(BookmarksChanels.CREATE_CATEGORY, args),
  deleteCategory: (args: DeleteCategoryArgs) => ipcRenderer.invoke(BookmarksChanels.DELETE_CATEGORY, args),
}
