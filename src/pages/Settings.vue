<template>
  <div class="fit flex d-column">
    <q-tabs
      v-model="tabName"
      inline-label
    >
      <q-tab
        v-for="tab in tabs"
        :key="tab.name"
        :name="tab.name"
        :icon="tab.icon"
        :label="t(tab.label)"
      />
    </q-tabs>
    <q-separator />

    <q-tab-panels
      v-model="tabName"
      class="col"
    >
      <q-tab-panel
        v-for="tab in [tabs[0]]"
        :key="tab.name"
        :name="tab.name"
        class="overflow-hidden no-padding"
      >
        <component :is="`${tab.name}`" />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import GeneralTab from 'components/Settings/generalTab.vue'
import { useI18n } from 'vue-i18n'

GeneralTab

const { t } = useI18n()

const tabs = [
  {
    name: 'generalTab',
    label: 'generalTab',
    icon: 'settings',
  },
  {
    name: 'themeEditorTab',
    label: 'themeEditorTab',
    icon: 'brush',
  },
]
const tabName = ref(tabs[0].name)

</script>
