<template>
  <q-bar class="q-electron-drag">
    <q-icon :name="Icons.Book" />
    <div class="">
      Seven Bible
    </div>
    <q-space />
    <div class="q-gutter-x-sm">
      <q-btn
        dense
        flat
        :icon="Icons.Menu"
        @click="$emit('toggle-drawer')"
      />
      <q-btn
        :disable="activeWorkPlaces.length > 3"
        dense
        flat
        :icon="Icons.AddWorkplace"
        class="q-mr-sm"
        @click="openNewWorkPlace"
      />

      <q-btn
        dense
        flat
        :icon="Icons.Minimize"
        @click="minimize"
      />
      <q-btn
        dense
        flat
        :icon="Icons.ToggleMaximize"
        @click="toggleMaximize"
      />
      <q-btn
        dense
        flat
        :icon="Icons.Close"
        @click="close"
      />
    </div>
  </q-bar>
  <q-separator />
</template>

<script>
import useStore from 'src/hooks/useStore'
import { computed } from 'vue'
import { Icons } from '../types/icons'

export default {
  emits: ['toggle-drawer'],
  setup() {
    const store = useStore()
    const activeWorkPlaces = computed(() => store.getters.getActiveWorkPlaces().indexes)

    const minimize = () => window.api.electron.MINIMIZE_WINDOW()
    const toggleMaximize = () => window.api.electron.TOGGLE_MAXIMIZE_WINDOW()
    const close = () => window.api.electron.CLOSE_WINDOW()
    const openNewWorkPlace = () => store.native.commit('settings/openNewWorkPlace')

    return {
      minimize,
      toggleMaximize,
      close,
      openNewWorkPlace,
      activeWorkPlaces,
      Icons,
    }
  },
}
</script>
