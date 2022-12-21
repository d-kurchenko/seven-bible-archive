<template>
  <q-layout
    :style="font"
    class="flex d-column fit"
  >
    <SystemBar @toggle-drawer="visibleRight = !visibleRight" />
    <div class="flex col">
      <div class="layout-main fit min-w-0">
        <router-view />
      </div>

      <SideMenu :visible-right="visibleRight" />
    </div>
  </q-layout>
</template>

<script setup>
import SystemBar from 'components/SystemBar.vue'
import SideMenu from 'components/SideMenu.vue'

import { ref, computed } from 'vue'
import { useStore } from 'src/store'
import useTheme from 'src/hooks/useTheme'

const visibleRight = ref(true)

const store = useStore()
const app = computed(() => store.getters['settings/app'])

const font = computed(() => ({
  fontFamily: `${app.value.appearance.font}, sans-serif`,
}))

const { setTheme } = useTheme()
setTheme(app.value.appearance.theme)

const stringify = (state) => JSON.stringify(state, null, 2)
const saveProgramSettings = (state) =>
  window.api.system.saveProgramSettings(stringify(state))

const changeAppSettings = (settings) =>
  store.commit('settings/changeAppSettings', settings)

const saveProgramState = async () => {
  const bounds = await window.api.electron.getWindowBounds()
  changeAppSettings({
    win: bounds,
  })
  saveProgramSettings(store.state.settings)
}

setInterval(saveProgramState, 60000 * 5)

window.api.electron.onCloseApp(async () => {
  await saveProgramState()
  window.api.electron.closeApp()
})
</script>
