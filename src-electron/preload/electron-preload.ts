import { contextBridge } from 'electron'
import { API } from './api'

window.dir = process.env.dir || ''
contextBridge.exposeInMainWorld('api', API)
