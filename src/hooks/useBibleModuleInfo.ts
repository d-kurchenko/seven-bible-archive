import {
  provide, ref, watch, Ref,
} from 'vue'
import useBibleModuleTables from 'src/hooks/useBibleModuleTables'
import { myRef } from 'src/helpers'
import { BibleBooks, BibleInfo } from 'src-electron/types/bible'
import { MyRef } from 'src/types/myRef'

export default (bibleFileName: Ref<string>) => {
  const info = ref<BibleInfo>()
  const booksList: MyRef<BibleBooks[]> = myRef(null)
  provide('booksList', booksList)

  const getBibleModuleInfo = async () => {
    const tables = await useBibleModuleTables(bibleFileName.value)
    if (!tables.info || !tables.booksList) { return }
    info.value = tables.info
    booksList.value = tables.booksList
  }
  getBibleModuleInfo()

  watch(bibleFileName, (newFilename, oldFilename) => {
    window.api.bible.DISCONNECT_DATABASE(oldFilename)
    window.api.bible.CONNECT_DATABASE(newFilename)
    getBibleModuleInfo()
  })

  return {
    info,
  }
}
