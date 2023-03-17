import fs from 'fs-extra'
import path from 'path'

export { getFonts } from 'font-list'
export { default as saveProgramSettings } from './saveProgramSettings'
export { default as getThemes } from './getThemes'
export { default as readUserTheme } from './readUserTheme'
export { default as getModulesRegistry } from './getModulesRegistry'
export { getInstalledModules } from './getIntalledModules'

export const getReadDir = (_path: string[]) =>
  fs.readdirSync(path.join(dir, ..._path))
export const getReadFile = (_path: string[]) =>
  fs.readFileSync(path.join(dir, ..._path), { encoding: 'utf-8' })
export const getExists = (_path: string[]) =>
  fs.existsSync(path.join(dir, ..._path))
export const getSettings = () =>
  fs.readFileSync(path.join(dir, 'user', 'settings', 'settings.json'), {
    encoding: 'utf8',
  })
