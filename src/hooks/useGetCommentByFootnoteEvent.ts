import { Ref, ref } from 'vue'
import { Commentaries } from 'src-electron/types/commentaries'
import getCommentByRef from 'src/helpers/getCommentByRef'
import { BibleRef } from 'src/types/bibleRef'

export default (footnotes: Ref<Commentaries[] | undefined>) => {
  const htmlPopupTarget = ref<HTMLElement | null>()
  const htmlPopupText = ref<string>()
  const htmlPopup = ref<any>()

  const onGetCommentByFootnote = (target: HTMLElement, ref: BibleRef) => {
    htmlPopupTarget.value = target
    const comment = getCommentByRef(footnotes.value || [], ref)
    if (!comment) { return }
    htmlPopupText.value = comment.text
    htmlPopup.value.toggle()
  }

  return {
    onGetCommentByFootnote,
    htmlPopup,
    htmlPopupText,
    htmlPopupTarget,
  }
}
