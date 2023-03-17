import { Store } from 'src/types/store/store'

const settings: any = JSON.parse(window.api.system.GET_SETTINGS_SYNC())

export interface SettingStateInterface extends Store {}

const state = function (): SettingStateInterface {
  return {
    ...settings
  }
}

export default state
