import { InjectionKey, Ref } from 'vue'
import { Bible } from 'src/types/store/bible'
import { Popup } from 'src/hooks/usePopupWindows'
import { BibleInfo } from 'src-electron/types/bible'
import { bookmarks } from 'src/hooks/useBookmarks'

export const id_: InjectionKey<number> = Symbol('id')
export const bible_: InjectionKey<Ref<Bible>> = Symbol('bible')
export const popup_: InjectionKey<Popup> = Symbol('popup')
export const bibleModuleInfo_: InjectionKey<Ref<BibleInfo>> = Symbol('bibleModuleInfo')
export const bookFullName_: InjectionKey<Ref<string | undefined>> = Symbol('bookFullName')
export const bookShortName_: InjectionKey<Ref<string | undefined>> =
  Symbol('bookShortName')
export const bookmarks_: InjectionKey<typeof bookmarks> = Symbol('bookmarks')
// main
export const bibleWindowsUpdates_: InjectionKey<Ref<number>> =
  Symbol('bibleWindowsUpdates')
export const updateBibleWindows_: InjectionKey<() => void> = Symbol('updateBibleWindows')

export interface TextDirection {
  nt: string,
  ot: string,
}
export const textDirections_: InjectionKey<Ref<TextDirection>> = Symbol('textDirections')
