import { glob } from "glob"
import path from 'path'
import { Path } from "types/paths";

export const getInstalledModules = async () => {
  let modulesPaths = glob.sync(path.join(dir, Path.Modules) + '/**/*.SQLite3')
  const modulesNames = modulesPaths.map(name => name.match(/(?<=\/)[^\/]+(?=\.sqlite3)/i)![0])
  return modulesNames
}
