import fs from 'fs-extra'
import path from 'path'

export default () => {
  try {
    const themesDirectory = fs.readdirSync(path.join(dir, 'user', 'themes'))

    return themesDirectory.map((theme) => theme.split('.')[0])
  } catch (error) {
    console.error('Error while reading theme')

    return []
  }
}
