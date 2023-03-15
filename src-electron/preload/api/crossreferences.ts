import { CrossreferencesChanels } from 'app/src-electron/api/crossreferences/useCrossreferences'
import { ipcRenderer } from 'electron'

export default {
  getCrossreferences: (args: any) => ipcRenderer.invoke(CrossreferencesChanels.GET_CROSSREFERENCES, args),
}
