<template>
  <q-select
    outlined
    :config="config"
    :model-value="value"
    :options="options"
    :description="description"
    use-input
    input-debounce="0"
    @update:model-value="onSelect"
    @filter="filterFn"
  >
    <template #option="scope">
      <q-item v-bind="scope.itemProps">
        <q-item-section :style="{ fontFamily: (scope as any).label }">
          <q-item-label>{{ (scope as any).label }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script setup lang="ts">
import { QItem } from 'quasar'
import { ref } from 'vue'

const props = defineProps<{
  config: Record<string, any>,
  value: string | number,
  description?: string,
  store: Record<string, any>,
}>()


const onSelect = (value: string | number) => props.store.state.set(`app.${props.config.path}`, value)
const fontList = await window.api.system.GET_FONT_LIST()
let options = ref([...fontList])

const filterFn = (value: string, update: (callback: () => void) => void) => {
  update(() => {
    const needle = value.toLowerCase()
    options.value = fontList.filter((item: string) => item.toLowerCase().indexOf(needle) > -1)
  })
}

</script>
