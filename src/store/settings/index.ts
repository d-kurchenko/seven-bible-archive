import state, { SettingStateInterface } from './state'
import * as getters from './getters'
import * as mutations from './mutations'
import { Module } from 'vuex'
import { StateInterface } from '../index'

const settings: Module<SettingStateInterface, StateInterface> = {
  namespaced: true,
  getters,
  mutations,
  state,
}
export default settings
