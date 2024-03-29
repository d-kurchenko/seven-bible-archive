import { GetPreparedCategoriesArgs } from 'types/api-args/categories'
import { PreparedCategory } from 'types/api-modified/categories'
import getVerses from 'src-electron/api/bible/api/getVerses'
import getBibleBooks from 'src-electron/api/bible/api/getBibleBooks'
import { extractShortName } from 'src-electron/helpers/bookNames'

export default (args: GetPreparedCategoriesArgs) => {
  const { bibleFileName, categories } = args
  const booksList = getBibleBooks(bibleFileName)

  const res: PreparedCategory[] = []

  categories.forEach((category) => {
    const preparedCategory: PreparedCategory = {
      ...category,
      bookmarks: [],
    }

    category.bookmarks.forEach((bookmark) => {
      const bibleVerses = getVerses({
        filename: bibleFileName,
        bookNumber: bookmark.bookNumber,
        chapterNumber: bookmark.startChapterNumber,
        selectedVerseFrom: bookmark.startVerseNumber,
        selectedVerseTo: bookmark.endVerseNumber,
      })
      preparedCategory.bookmarks.push({
        ...bookmark,
        bookShortName: extractShortName(booksList || [], bookmark.bookNumber) || '???',
        texts: bibleVerses,
        // rowid: i.toString() + j,
        // categoryName: category.name
      })
    })
    res.push(preparedCategory)
  })

  return res
}
