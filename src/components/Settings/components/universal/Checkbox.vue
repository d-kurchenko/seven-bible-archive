<template>
  <q-checkbox
    size="5rem"
    :model-value="value"
    :label="description"
    @update:model-value="onUpdate"
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  config: Record<string, any>,
  value: boolean,
  description?: string,
  store: Record<string, any>,
}>()

const onUpdate = (value: boolean) => props.store.state.set(`app.${props.config.path}`, value)
</script>
