<template>
  <UIButtonDropdown
    :label="fileName"
    @before-show="loadStrongModules"
  >
    <q-list>
      <div
        v-for="(moduleFileName, idx) in modules"
        :key="idx"
      >
        <q-item
          v-close-popup
          clickable
          @click="onModuleClick(moduleFileName)"
        >
          <q-item-section>
            <q-item-label>{{ moduleFileName }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-icon name="book" />
          </q-item-section>
        </q-item>

        <q-separator class="separator" />
      </div>
    </q-list>
  </UIButtonDropdown>
</template>

<script setup lang="ts">
import UIButtonDropdown from 'components/UI/UIButtonDropdown.vue'

import { ref } from 'vue'
import useStore from 'src/hooks/useStore'
import useSevenBible from 'src/hooks/useSevenBible'

const props = defineProps<{
  fileName: string,
  module: string,
  path: string[],
}>()

const { id } = useSevenBible()
const modules = ref<string[]>([])
const store = useStore()

const loadStrongModules = async () => {
  if (props.path.length) {
    modules.value = (await window.api.system
      .GET_READ_DIR(props.path))
      .map((module) => module.split('.')[0])
  }
}
const onModuleClick = (newFilename: string) => {
  const oldFilename = store.state.get(`workPlace.${id}.${props.module}.fileName`)
  if (newFilename !== oldFilename) {
    store.state.set(`workPlace.${id}.${props.module}.fileName`, newFilename)
  }
}
</script>
