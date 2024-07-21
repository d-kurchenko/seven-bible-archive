import fs from 'fs-extra'
import path from 'path'

export default (state: string) => {
  return fs.writeFileSync(
    path.join(dir, 'modules', 'user', 'settings', 'settings.json'),
    state,
  )
}
