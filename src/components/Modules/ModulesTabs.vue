<template>
  <q-tabs
    :model-value="activeTab"
    vertical
    no-caps
    class="container"
    @update:model-value="changeTab($event)"
  >
    <q-tab
      v-for="(moduleName, i) in Modules"
      :key="i"
      :name="moduleName"
      :label="$t(moduleName + 'Modules')"
    />
  </q-tabs>
</template>

<script setup lang="ts">
import { Modules } from 'types/modules'
const emit = defineEmits(['changeTab'])
defineProps<{
  activeTab: string
}>()
const changeTab = (tab: any) => emit('changeTab', tab)
</script>
