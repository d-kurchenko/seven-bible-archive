import { Bookmark, BookmarkCategory } from 'types/bookmark'
import { PreparedVerse } from 'types/api-modified/bible'

export interface PreparedBookmark extends Bookmark {
  texts: PreparedVerse[]
  bookShortName: string
  // rowid: number | string,
  // categoryName: string
}
export interface PreparedCategory extends BookmarkCategory {
  bookmarks: PreparedBookmark[]
}
