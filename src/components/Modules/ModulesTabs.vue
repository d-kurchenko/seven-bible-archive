<template>
    <q-tabs
      :model-value="activeTab"
      @update:model-value="changeTab($event)"
      vertical
      no-caps
      class="container"
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
import { Modules } from 'types/modules';
const emit = defineEmits(['changeTab'])
const props = defineProps<{
  activeTab: string
}>()
const changeTab = (tab: any) => emit('changeTab', tab)
</script>
