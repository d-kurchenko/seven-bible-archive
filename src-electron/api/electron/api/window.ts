import { BrowserWindow } from 'electron'

export const toggleMaximizeWindow = () => {
  const win = BrowserWindow.getFocusedWindow()
  if (win)
    win.isMaximized() ? win.unmaximize() : win.maximize()
}

export const closeWindow = () => BrowserWindow?.getFocusedWindow()?.close()

export const minimizeWindow = () => BrowserWindow?.getFocusedWindow()?.minimize()

export const getWindowBounds = () => BrowserWindow?.fromId(1)?.getBounds()
