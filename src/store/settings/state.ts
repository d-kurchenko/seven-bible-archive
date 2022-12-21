const settings = JSON.parse(window.api.system.getSettings())

export interface SettingStateInterface {
  prop: boolean
}

const state = function (): SettingStateInterface {
  return {
    ...settings,
  }
}

export default state
