import { ref } from 'vue'

export default () => {
  const versePopup = ref(null)
  const versePopupTarget = ref(undefined)
  const versePopupOptions: {
    label: string
    callback?: () => void
  }[] = [
    {
      label: 'copy',
    },
  ]

  const onVerseContextmenu = ({}) => {
    // versePopupTarget.value = target
    // versePopup.value.toggle()
  }

  return {
    onVerseContextmenu,
    versePopup,
    versePopupTarget,
    versePopupOptions,
  }
}
