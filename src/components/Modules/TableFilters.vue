<template>
  <div
    class="flex q-gutter-sm"
    style="flex-wrap: wrap"
  >
    <q-input
      v-model="filter.other"
      filled
      dense
      debounce="300"
      :placeholder="$t('search')"
      style="max-width: 100px"
    >
      <template #append>
        <q-icon :name="Icons.Search" />
      </template>
    </q-input>

    <q-select
      v-model="filter.language"
      filled
      dense
      use-input
      input-debounce="0"
      :placeholder="$t('language')"
      :options="languagesOptions"
      behavior="menu"
      style="max-width: 100px"
      @filter="filterFn"
    />
  </div>
</template>

<script setup lang="ts">
import { Download } from 'types/registry'
import {
  computed, ref, watch,
} from 'vue'
import { Icons } from 'src/types/icons'
import { TableFilter } from './ModulesTabsPanels.vue'

const props = defineProps<{
  modulesList: Download[]
}>()

const emit = defineEmits(['updateFilter'])

const filter = ref<TableFilter>({
  language: '',
  other: '',
})

watch(
  filter,
  () => {
    emit('updateFilter', filter.value)
  },
  {
    deep: true,
  },
)

const languages = computed(() =>
  Array.from(new Set(props.modulesList.map((module) => module.lng))),
)
const languagesOptions = ref(languages.value)
const filterFn = (val: string, update: any) => {
  if (val === '') {
    update(() => {
      languagesOptions.value = languages.value
    })

    return
  }
  update(() => {
    const needle = val.toLowerCase()
    languagesOptions.value = languages.value.filter(
      (v) => v.toLowerCase().indexOf(needle) > -1,
    )
  })
}
</script>
