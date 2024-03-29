import { RemoveBookmarkArgs } from 'types/api-args/system'
import {
  getBookmarkCategories,
  writeBookmarkCategories,
} from 'src-electron/api/bookmarks/api/categoriesFS'

export default (args: RemoveBookmarkArgs) => {
  const categories = getBookmarkCategories(args.filename)
  categories[args.categoryIndex].bookmarks.splice(args.bookmarkIndex, 1)
  writeBookmarkCategories(args.filename, categories)
}
