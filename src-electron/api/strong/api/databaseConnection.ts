import { StrongDatabase } from 'src-electron/models/Database/StrongDatabase'

export const connectDatabase = (filename: string) => {
  new StrongDatabase(filename, {
    keepConnections: true,
  })
}

export const disconnectDatabase = (filename: string) => new StrongDatabase(filename).disconnect()
