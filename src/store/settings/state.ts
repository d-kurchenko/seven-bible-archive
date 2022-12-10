const settings = JSON.parse(window.api.system.getSettings())

export interface SettingStateInterface {
  prop: boolean
}

function state(): SettingStateInterface {
  return {
    ...settings,
  }
}

export default state
