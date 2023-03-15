import useBibleApi from 'src-electron/api/bible/useBibleApi'
import useCommentariesApi from 'src-electron/api/commentaries/useCommentariesApi'
import useStrongApi from 'app/src-electron/api/strong/useStrongApi'
import useElectronApi from 'src-electron/api/electron/useElectronApi'
import useSystemApi from 'app/src-electron/api/system/useSystemApi'
import useCrossreferences from 'src-electron/api/crossreferences/useCrossreferences'
import useBookmarksApi from 'src-electron/api/bookmarks/useBookmarkApi'

export default () => {
  useBibleApi()
  useCommentariesApi()
  useStrongApi()
  useCrossreferences()
  useElectronApi()
  useSystemApi()
  useBookmarksApi()
}
