import fetch from 'electron-fetch'
import path from 'path'
import fs from 'fs-extra'
import { convertDaysToMilliseconds } from 'src-electron/helpers/time'
import { ModulesRegistry } from 'types/registry'
const AdmZip = require('adm-zip')

const millisecondsInWeak = convertDaysToMilliseconds(7)

export default async (): Promise<ModulesRegistry> => {
  const _path = path.join(dir, 'modules', 'registry')
  const readModulesRegistry = (): ModulesRegistry =>
    fs.readJSONSync(path.join(_path, 'registry.json'))
  const downloadAndExtract = async () => {
    const data = await fetch('http://mybible.i-t.kz/registry.zip')
    const buffer = await data.buffer()
    const zip = new AdmZip(buffer)
    zip.extractAllTo(_path, true)
    const obj = readModulesRegistry()
    obj.dateDownloaded = Date.now()
    fs.writeJSONSync(path.join(_path, 'registry.json'), obj)
  }

  try {
    const modulesRegistry = readModulesRegistry()
    const isOld = Date.now() - modulesRegistry.dateDownloaded >= millisecondsInWeak
    if (!isOld) {
      return modulesRegistry
    } else {
      await downloadAndExtract()
      return readModulesRegistry()
    }
  } catch {
    await downloadAndExtract()
    return readModulesRegistry()
  }
}
