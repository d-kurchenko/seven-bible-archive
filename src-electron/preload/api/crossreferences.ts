import { ipcRenderer } from 'electron'

export default {
  getCrossreferences: (args: any) => ipcRenderer.invoke('get-crossreferences', args),
}
