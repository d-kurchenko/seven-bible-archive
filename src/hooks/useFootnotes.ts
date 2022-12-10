import { Ref, ref } from 'vue'
import { Bible } from 'src/types/store/bible'
import { Commentaries } from 'src-electron/types/commentaries'

export default (bible: Ref<Bible>) => {
  const footnotes = ref<Commentaries[]>()

  const getFootNotes = async () => {
    if (
      !bible.value.view.showDreamy ||
      !window.api.system.fsExistsSync([
        'modules',
        'commentaries',
        bible.value.fileName + '.commentaries.SQLite3',
      ])
    ) {
      //TODO: try to load commentaries module
      console.warn(`Commentaries module for ${bible.value.fileName} not found`)
      return
    }

    const settings = {
      filename: bible.value.fileName,
      bookNumber: bible.value.bookNumber,
      chapterNumber: bible.value.chapterNumber,
    }

    footnotes.value = await window.api.commentaries.getFootnotes(settings)
  }

  return {
    footnotes,
    getFootNotes,
  }
}
