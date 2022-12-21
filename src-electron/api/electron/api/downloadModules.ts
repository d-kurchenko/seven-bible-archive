import { Download } from 'types/registry'
import fetch from 'electron-fetch'
import path from 'path'
import { Path } from 'types/paths'
import { Modules } from 'types/modules'
import getModulesRegistry from 'src-electron/api/system/api/getModulesRegistry'
import AdmZip from 'adm-zip'
import fs from 'fs-extra'
import AbortController from 'abort-controller'

export const downloadModules = async (modules: Download[]) => {
  for (const module of modules) {
    const moduleType = module.fil.split('.')[1] ?? Modules.Bible

    const _path: Path =
      moduleType === Modules.Bible
        ? Path.Bible
        : moduleType === Modules.Commentaries
          ? Path.Commentaries
          : moduleType === Modules.Crossreferences
            ? Path.Crossreferences
            : moduleType === Modules.Subheadings
              ? Path.Subheadings
              : Path.Dictionaries

    const fullPath = path.join(dir, _path)

    const registry = await getModulesRegistry()

    for await (let url of module.url) {
      try {
        let downloadModuleUrl = ''
        url = url.replace(/{.+}/gi, (replacer) => {
          const aliasToReplace = replacer.replace(/[{}]/gi, '')
          const serverPath = registry.hosts.find((host) => host.alias === aliasToReplace)
            ?.path

          downloadModuleUrl = serverPath || ''

          return ''
        })
        downloadModuleUrl = downloadModuleUrl.replace(/\%s/gi, url)

        const controller = new AbortController()
        const timeout = setTimeout(() => {
          controller.abort()
        }, 200)
        const data = await fetch(downloadModuleUrl, {
          signal: controller.signal as any,
        })
        clearTimeout(timeout)

        const buffer = await data.buffer()

        const zip = new AdmZip(buffer)
        const catalogPathToExtract = path.join(fullPath, module.abr)
        fs.emptyDirSync(catalogPathToExtract)
        zip.extractAllTo(catalogPathToExtract, true)

        // if()

        const fileExtension =
          moduleType === Modules.Bible ? '.SQLite3' : `.${moduleType}.SQLite3`
        const fileNameBefore = path.join(catalogPathToExtract, '.SQLite3')
        const resFileName = module.abr + fileExtension
        const fileNameAfter = path.join(catalogPathToExtract, resFileName)
        fs.renameSync(fileNameBefore, fileNameAfter)
        const resFilePath = path.join(fullPath, resFileName)
        fs.moveSync(fileNameAfter, resFilePath)
        fs.removeSync(catalogPathToExtract)

        break
      } catch (err) {
        console.error('Error while downloading module')
      }
    }
  }
}

