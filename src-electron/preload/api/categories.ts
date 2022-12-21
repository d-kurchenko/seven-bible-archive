import {
  CreateCategoryArgs,
  DeleteCategoryArgs,
  GetPreparedCategoriesArgs,
} from 'app/types/api-args/categories'
import { MakeBookmarkArgs, RemoveBookmarkArgs } from 'app/types/api-args/system'
import { PreparedCategory } from 'app/types/api-modified/categories'
import { BookmarkCategory } from 'app/types/bookmark'
import { ipcRenderer } from 'electron'

export default {
  makeBookmark: (args: MakeBookmarkArgs): Promise<any> =>
    ipcRenderer.invoke('make-bookmark', args),
  getBookmarkCategories: (filename: string): Promise<BookmarkCategory[]> =>
    ipcRenderer.invoke('get-bookmark-categories', filename),
  removeBookmark: (args: RemoveBookmarkArgs): Promise<void> =>
    ipcRenderer.invoke('remove-bookmark', args),
  getPreparedCategories: (args: GetPreparedCategoriesArgs): Promise<PreparedCategory[]> =>
    ipcRenderer.invoke('get-prepared-categories', args),
  createCategory: (args: CreateCategoryArgs): Promise<void> =>
    ipcRenderer.invoke('create-category', args),
  deleteCategory: (args: DeleteCategoryArgs): Promise<void> =>
    ipcRenderer.invoke('delete-category', args),
}
