import { CreateCategoryArgs } from 'types/api-args/categories'
import {
  getBookmarkCategories,
  writeBookmarkCategories,
} from 'src-electron/api/bookmarks/api/categoriesFS'

export default (args: CreateCategoryArgs) => {
  const categories = getBookmarkCategories('bookmarks')
  categories.push(args.category)
  writeBookmarkCategories(args.filename, categories)
}
