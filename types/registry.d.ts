export interface Host {
  alias: string
  path: string
  priority: number
  weight: number
}

export interface Ld {
  lng: string
  des: string
}

export interface Download {
  abr: string
  des: string
  lds: Ld[]
  fil: string
  upd: string
  cmt: string
  bkq: string
  url: string[]
  siz: string
  lng: string
  aln: string
  hid?: boolean
  def?: boolean
  inf?: string
  lic: string
  reg: string
  dep: string
}

export interface Registry {
  url: string
  priority: number
  info_url: string
  test?: boolean
}

export interface Communication {
  category: string
  type: string
  to: string
}

export interface ModulesRegistry {
  version: number
  dateDownloaded: number
  hosts: Host[]
  downloads: Download[]
  registries: Registry[]
  communications: Communication[]
}
