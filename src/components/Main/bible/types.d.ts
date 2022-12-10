import { BibleVerses } from 'app/src-electron/types/bible'
import { BookmarkCategory } from 'app/types/bookmark'

export interface ExtendedBibleVerse extends BibleVerses {
  story?: string
  subheadings?: {
    subheading: string
    direction: string
  }[]
  commentaries?: {
    text: string
    moduleName: string
  }[]
  bookmarkCategories?: BookmarkCategory[]
}
