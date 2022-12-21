<template>
  <q-input
    outlined
    :hint="description"
    :model-value="value"
    :type="config.type === 'number' ? 'number' : 'text'"
    @update:model-value="onInput"
  />
</template>

<script setup lang="ts">
import { debounce } from 'quasar'

const props = defineProps<{
  config: Record<string, any>
  value: string | number
  description?: string,
  store: Record<string, any>,
}>()

const onInput = debounce((value) => {
  if (props.config.type === 'number') {
    if (isNaN(value)) { return }
    value = parseInt(value)
  }

  props.store.state.set(`app.${props.config.path}`, value)
}, 500)

</script>
