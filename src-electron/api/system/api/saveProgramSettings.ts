import fs from 'fs-extra'
import path from 'path'

export default (state: string) => {
  return fs.writeFileSync(
    path.join(dir, 'user', 'settings', 'settings.json'),
    state,
  )
}
