// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface ChanelKey<T> extends Symbol {}

declare global {
  namespace Electron {
    interface IpcMain extends NodeJS.EventEmitter {
      handle<T>(
        chanel: ChanelKey<T>,
        listener: (
          event: globalThis.Electron.IpcMainInvokeEvent,
          ...args: globalThis.Parameters<T>
        ) => ReturnType<T>
      ): void;
      on<T>(
        chanel: ChanelKey<T>,
        listener: (
          event: globalThis.Electron.IpcMainInvokeEvent,
          ...args: globalThis.Parameters<T>
        ) => ReturnType<T>
      ): void;
    }
    interface IpcRenderer extends NodeJS.EventEmitter {
      invoke<T>(chanel: ChanelKey<T>, ...args: globalThis.Parameters<T>): Promise<ReturnType<T> extends Promise<infer Return> ? Return : ReturnType<T>>;
      send<T>(chanel: ChanelKey<T>, ...args: globalThis.Parameters<T>): Promise<ReturnType<T> extends Promise<infer Return> ? Return : ReturnType<T>>;
    }
  }
}
