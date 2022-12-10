import { BrowserWindow, ipcMain } from 'electron'
import toggleMaximize from 'src-electron/api/electron/api/toggleMaximize'
import { downloadModules } from './api/downloadModules'

export default () => {
  ipcMain.on('close', () => BrowserWindow.getFocusedWindow().close())
  ipcMain.on('minimize', () => BrowserWindow.getFocusedWindow().minimize())
  ipcMain.on('toggle-maximize', () => toggleMaximize())
  ipcMain.handle('get-window-bounds', () => {
    return BrowserWindow.fromId(1).getBounds()
  })
  ipcMain.handle('download-modules', (event, modules) => downloadModules(modules))
}
