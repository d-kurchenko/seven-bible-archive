import { BibleChanels } from 'app/src-electron/api/bible/useBibleApi'
import { RendererListener } from 'app/src-electron/electron'
import { ipcRenderer } from 'electron'

type C = typeof BibleChanels

export default {
  CONNECT_DATABASE: ((...args) => ipcRenderer.send(BibleChanels.CONNECT_DATABASE, ...args)) as RendererListener<C['CONNECT_DATABASE']>,
  DISCONNECT_DATABASE: ((...args) => ipcRenderer.send(BibleChanels.DISCONNECT_DATABASE, ...args)) as RendererListener<C['DISCONNECT_DATABASE']>,
  GET_CHAPTER: ((...args) => ipcRenderer.invoke(BibleChanels.GET_CHAPTER, ...args)) as RendererListener<C['GET_CHAPTER']>,
  GET_TOP_BAR_STATE: ((...args) => ipcRenderer.invoke(BibleChanels.GET_TOP_BAR_STATE, ...args)) as RendererListener<C['GET_TOP_BAR_STATE']>,
  GET_INFO: ((...args) => ipcRenderer.invoke(BibleChanels.GET_INFO, ...args)) as RendererListener<C['GET_INFO']>,
  GET_BOOKS: ((...args) => ipcRenderer.invoke(BibleChanels.GET_BOOKS, ...args)) as RendererListener<C['GET_BOOKS']>,
  GET_CHAPTER_COUNTS: ((...args) => ipcRenderer.invoke(BibleChanels.GET_CHAPTER_COUNTS, ...args)) as RendererListener<C['GET_CHAPTER_COUNTS']>,
  GET_FINDED_TEXTS: ((...args) => ipcRenderer.invoke(BibleChanels.GET_FINDED_TEXTS, ...args)) as RendererListener<C['GET_FINDED_TEXTS']>,
  GET_INTRODUCTIONS: ((...args) => ipcRenderer.invoke(BibleChanels.GET_INTRODUCTIONS, ...args)) as RendererListener<C['GET_INTRODUCTIONS']>,
  GET_COMPARED_TRANSLATIONS: ((...args) => ipcRenderer.invoke(BibleChanels.GET_COMPARED_TRANSLATIONS, ...args)) as RendererListener<C['GET_COMPARED_TRANSLATIONS']>,
  GET_VERSES: ((...args) => ipcRenderer.invoke(BibleChanels.GET_VERSES, ...args)) as RendererListener<C['GET_VERSES']>,
}

