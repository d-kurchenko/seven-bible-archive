import { Database } from 'src-electron/models/Database/Database'

export class ModuleDatabase extends Database {
  constructor(filename, settings, ext, path) {
    if (/\.SQLite3/.test(filename) === false) { filename += ext }
    super(filename, path, settings)
  }
}
