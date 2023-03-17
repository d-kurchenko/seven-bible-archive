import { BookmarksChanels } from 'app/src-electron/api/bookmarks/useBookmarkApi'
import { RendererListener } from 'app/src-electron/electron'
import { ipcRenderer } from 'electron'

type C = typeof BookmarksChanels

export default {
  CREATE_BOOKMARK: ((...args) => ipcRenderer.invoke(BookmarksChanels.CREATE_BOOKMARK, ...args)) as RendererListener<C['CREATE_BOOKMARK']>,
  GET_BOOKMARK_CATEGORIES: ((...args) => ipcRenderer.invoke(BookmarksChanels.GET_BOOKMARK_CATEGORIES, ...args)) as RendererListener<C['GET_BOOKMARK_CATEGORIES']>,
  REMOVE_BOOKMARK: ((...args) => ipcRenderer.invoke(BookmarksChanels.REMOVE_BOOKMARK, ...args)) as RendererListener<C['REMOVE_BOOKMARK']>,
  GET_PREPARED_CATEGORIES: ((...args) => ipcRenderer.invoke(BookmarksChanels.GET_PREPARED_CATEGORIES, ...args)) as RendererListener<C['GET_PREPARED_CATEGORIES']>,
  CREATE_CATEGORY: ((...args) => ipcRenderer.invoke(BookmarksChanels.CREATE_CATEGORY, ...args)) as RendererListener<C['CREATE_CATEGORY']>,
  DELETE_CATEGORY: ((...args) => ipcRenderer.invoke(BookmarksChanels.DELETE_CATEGORY, ...args)) as RendererListener<C['DELETE_CATEGORY']>,
}
