<template>
  <div class="flex full-height">
    <q-tree
      ref="tree"
      v-model:selected="selected"
      :nodes="configurationList"
      style="width: 150px; word-break: break-word"
      node-key="label"
      class="overlay-y q-ml-lg"
      selected-color="primary"
    >
      <template #default-header="prop">
        <div class="row items-center">
          <div>{{ t(prop.node.label) }}</div>
        </div>
      </template>
    </q-tree>

    <q-separator
      vertical
      class="q-mx-md"
    />
    <suspense>
      <div
        ref="root"
        class="scroll grow-1 q-pa-sm"
      >
        <div
          v-for="(config, i) in configurationList"
          :key="i"
        >
          <span
            class="text-h2"
            :data-label="config.label"
          >
            #{{ t(config.label) }}
          </span>

          <div
            v-for="(childConfig, j) in config.children"
            :key="j"
            class="q-pb-lg"
          >
            <div class="text-h5">
              {{ t(childConfig.label) }}
            </div>
            <component
              :is="childConfig.component"
              :store="store"
              :config="childConfig"
              :value="Object.getValue(childConfig.path, app)"
              :description="childConfig.description ? t(childConfig.description) : null"
            />
          </div>
          <q-separator v-if="i + 1 !== configurationList.length" />
        </div>
      </div>
    </suspense>
  </div>
</template>

<script setup lang="ts">
import useStore from 'src/hooks/useStore'
import { ref } from 'vue'
import configurationList from 'src/settings/configurationList'
import { useI18n } from 'vue-i18n'

import Input from 'components/Settings/components/universal/Input.vue'
import Select from 'components/Settings/components/universal/Select.vue'
import FontSelector from 'components/Settings/components/special/FontSelector.vue'
import ThemeSelector from 'components/Settings/components/special/ThemeSelector.vue'

Input || Select || FontSelector || ThemeSelector

const { t } = useI18n()
const store = useStore()

const app = store.state.getReactive('app')

const tree = ref(null)
const selected = ref(configurationList[0].label)

// const categoryIntersectionOptions: any = {
//   handler: (entry: any) => {
//     const label = entry.target.dataset.label

//     // tree.value.setExpanded(label, tree)
//   },
//   cfg: {
//     threshold: 1,
//   },
// }
</script>
