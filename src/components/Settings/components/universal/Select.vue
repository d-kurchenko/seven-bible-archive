<template>
  <q-select
    outlined
    :hint="description"
    :model-value="t(value)"
    :options="config.enum"
    @update:model-value="onSelect"
  >
    <template #option="scope">
      <q-item v-bind="scope.itemProps">
        <q-item-section>
          <q-item-label>{{ t((scope as any).lable) }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

defineProps<{
  config: Record<string, any>
  value: string
  description?: string
}>()
const { t } = useI18n()
const onSelect = () => null

</script>
