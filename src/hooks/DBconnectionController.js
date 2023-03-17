import { onBeforeUnmount } from 'vue'

export const useStrongDatabaseConnection = (filename) => {
  window.api.strong.CONNECT_DATABASE(filename.value)
  onBeforeUnmount(() => window.api.strong.DISSCONNECT_DATABASE(filename.value))
}

export const useBibleDatabaseConnection = (filename) => {
  window.api.bible.CONNECT_DATABASE(filename.value)
  onBeforeUnmount(() => window.api.bible.DISCONNECT_DATABASE(filename.value))
}

export const useCommentariesDatabaseConnection = (filename) => {
  window.api.commentaries.CONNECT_DATABASE(filename.value)
  onBeforeUnmount(() => window.api.commentaries.DISCONNECT_DATABASE(filename.value))
}
