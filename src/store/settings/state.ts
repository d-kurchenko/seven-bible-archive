import { Store } from 'src/types/store/store'

const settings = JSON.parse(window.api.system.getSettings())

export interface SettingStateInterface extends Store {}

const state = function (): SettingStateInterface {
  return {
    ...settings,
  }
}

export default state
