<template>
  <div class="flex q-gutter-sm" style="flex-wrap: wrap">
    <q-input
      filled
      dense
      debounce="300"
      v-model="filter.other"
      :placeholder="$t('search')"
      style="max-width: 100px"
    >
      <template v-slot:append>
        <q-icon :name="Icons.Search" />
      </template>
    </q-input>

    <q-select
      filled
      dense
      v-model="filter.language"
      use-input
      input-debounce="0"
      :placeholder="$t('language')"
      :options="languagesOptions"
      @filter="filterFn"
      behavior="menu"
      style="max-width: 100px"
    />
  </div>
</template>

<script setup lang="ts">
import { Download } from 'types/registry'
import { computed, ref, watch } from 'vue'
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
  { deep: true }
)

const languages = computed(() =>
  Array.from(new Set(props.modulesList.map((module) => module.lng)))
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
      (v) => v.toLowerCase().indexOf(needle) > -1
    )
  })
}
</script>
