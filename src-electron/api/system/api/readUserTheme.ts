import fs from 'fs-extra'
import path from 'path'

export default (themeName: string) => {
  return fs.readJSON(path.join(dir, 'modules', 'user', 'themes', themeName) + '.json')
}
