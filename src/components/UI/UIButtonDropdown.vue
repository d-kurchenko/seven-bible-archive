<template>
  <q-btn-dropdown
    stretch
    unelevated
    no-caps
    class="without-icon"
    menu-anchor="bottom right"
    menu-self="top right"
    :menu-offset="[0, 1]"
    :icon="icon"
    :label="label"
    :title="tooltip"
  >
    <slot />
  </q-btn-dropdown>
</template>

<script setup lang="ts">
defineProps<{
  label?: string,
  icon?: string,
  tooltip?: string,
}>()
</script>
