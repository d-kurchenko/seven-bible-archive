export default async (bibleFileName) => {
  const info = await window.api.bible.GET_INFO(bibleFileName)
  const booksList = await window.api.bible.GET_BOOKS(bibleFileName)

  return {
    booksList,
    info,
  }
}
