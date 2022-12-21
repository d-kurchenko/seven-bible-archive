import { API } from 'app/src-electron/preload/api'

declare global {
  let dir: string
  interface Window {
    api: typeof API
    dir: string
  }
  interface String {
    format: (...args: (string | number)[]) => void
  }
  interface StringConstructor {
    hasReplacer: (string: string) => boolean
  }

  interface ObjectConstructor {
    getValue: (path: string, object: Record<string, any>) => any
    setValue: (path: string, object: Record<string, any>, value: any) => void
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Array<T> {
    remove: (value: any) => void
  }
  interface BooleanConstructor {
    parse: (str: string | undefined, fallback?: boolean) => boolean
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    directives: {
      vFocus: object
    }
  }
}
