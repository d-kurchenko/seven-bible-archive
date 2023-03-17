// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface ChanelKey<T, P extends boolean = true> extends String {}

type AwaitedReturnType<T> = Awaited<ReturnType<T>>;

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
        ) => void
      ): void;
    }
    interface IpcRenderer extends NodeJS.EventEmitter {
      invoke<T>(
        chanel: ChanelKey<T, S>,
        ...args: globalThis.Parameters<T>
      ): Promise<AwaitedReturnType<T>>;
      send<T>(
        chanel: ChanelKey<T, S>,
        ...args: globalThis.Parameters<T>
      ): AwaitedReturnType<T>;
      sendSync<T>(
        chanel: ChanelKey<T, S>,
        ...args: globalThis.Parameters<T>
      ): AwaitedReturnType<T>;
    }
  }
}
export type RendererListener<T extends ChanelKey> = T extends ChanelKey<
  infer CB,
  infer P
>
  ? (
      ...args: Parameters<CB>
    ) => P extends true ? Promise<AwaitedReturnType<CB>> : AwaitedReturnType<CB>
  : never;
