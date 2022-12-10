import { BookmarkCategory } from 'app/types/bookmark'
import useSevenBible from 'src/hooks/useSevenBible'

export default () => {
  const { popup } = useSevenBible()

  const onBookmarkBlockClick = (
    bookmarkCategories: BookmarkCategory[],
    verseNumber: number
  ) => {
    popup.showBookmarksViewList({
      transparent: true,
      bookmarkCategories,
      verseNumber,
    })
  }

  return {
    onBookmarkBlockClick,
  }
}
