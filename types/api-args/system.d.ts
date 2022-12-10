import { Bookmark } from 'types/bookmark'

export interface MakeBookmarkArgs {
  filename: string
  categoryName: string
  bookmark: Bookmark
}

export interface RemoveBookmarkArgs {
  filename: string
  categoryIndex: number
  bookmarkIndex: number
}
