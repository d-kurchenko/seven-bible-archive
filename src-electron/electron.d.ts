// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface ChanelKey<T> extends Symbol {}

declare global {
  namespace Electron {
    interface IpcMain extends NodeJS.EventEmitter {
      handle<T>(
        chanel: ChanelKey<T>,
        listener: (
          event: globalThis.Electron.IpcMainInvokeEvent,
          ...args: any[]
        ) => T
      ): void;
    }
    interface IpcRenderer extends NodeJS.EventEmitter {
      invoke<T>(chanel: ChanelKey<T>, ...args: any[]): Promise<T extends Promise<infer Return> ? Return : T>;
    }
  }
}
