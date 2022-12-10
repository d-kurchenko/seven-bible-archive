import { ref } from 'vue'
import { insertVerse, insertVerses } from 'src/helpers/verseSelector'

export default () => {
  const selectedVerses = ref<number[]>([])

  const onSelectorClick = (verseNumber: number) => {
    if (selectedVerses.value?.includes(verseNumber))
      selectedVerses.value.remove(verseNumber)
    else insertVerse(selectedVerses.value, verseNumber)
  }
  const onSelectorHold = (verseNumber: number) => {
    insertVerses(selectedVerses.value, verseNumber)
  }
  const clearSelectedVerses = () => {
    selectedVerses.value = []
  }

  return {
    selectedVerses,
    onSelectorHold,
    onSelectorClick,
    clearSelectedVerses,
  }
}
