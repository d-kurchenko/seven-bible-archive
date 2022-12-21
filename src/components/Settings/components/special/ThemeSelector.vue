<template>
  <q-select
    outlined
    :hint="description"
    :model-value="value"
    :options="themeList"
    @update:model-value="
      (event) => {
        onSelect(event)
        setTheme(event)
      }
    "
  />
</template>

<script setup lang="ts">
import useTheme from 'src/hooks/useTheme'

const props = defineProps<{
  config: Record<string, any>,
  value: string,
  description?: string,
  store: Record<string, any>,
}>()

const { getAllThemes, setTheme } = useTheme()

const onSelect = (value: string) => props.store.state.set(`app.${props.config.path}`, value)
let themeList = await getAllThemes()
</script>
