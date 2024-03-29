import { BibleDatabase } from 'src-electron/models/Database/BibleDatabase'

export const connectDatabase = (filename) => {
  new BibleDatabase(filename, {
    keepConnections: true,
  })
}

export const disconnectDatabase = (filename) => {
  new BibleDatabase(filename).disconnect()
}
