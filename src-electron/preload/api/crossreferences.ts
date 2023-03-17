import { CrossreferencesChanels } from 'app/src-electron/api/crossreferences/useCrossreferences'
import { RendererListener } from 'app/src-electron/electron'
import { ipcRenderer } from 'electron'

type C = typeof CrossreferencesChanels

export default {
  GET_CROSSREFERENCES: ((...args) => ipcRenderer.invoke(CrossreferencesChanels.GET_CROSSREFERENCES, ...args)) as RendererListener<C['GET_CROSSREFERENCES']>,
}
