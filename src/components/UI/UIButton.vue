<template>
  <q-btn
    no-caps
    no-wrap
    stretch
    unelevated
    :title="tooltip"
    :icon="icon"
    :label="label"
    :disable="disable"
  >
    <slot />
  </q-btn>
</template>

<script setup lang="ts">
import { Icons } from 'src/types/icons';


interface Props {
  icon?: Icons,
  label?: string,
  disable?: boolean,
  tooltip?: string,
}

defineProps<Props>()
</script>
