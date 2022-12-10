import { BibleBooks } from 'src-electron/types/bible'

export const extractShortName = (booksList: BibleBooks[], bookNumber: number) => {
  return booksList.find((book) => book.book_number === bookNumber)?.short_name
}

export const extractFullName = (booksList: BibleBooks[], bookNumber: number) => {
  return booksList.find((book) => book.book_number === bookNumber)?.long_name
}
