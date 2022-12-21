<template>
  <ModuleDetailedInfo
    :module="activeRow!"
    :show="showModuleDetailedInfo"
    @before-hide="showModuleDetailedInfo = false"
  />
  <q-tab-panels
    :model-value="activeTab"
    class="col"
  >
    <q-tab-panel :name="activeTab">
      <q-table
        ref="table"
        v-model:pagination="pagination"
        v-model:selected="selected"
        :title="$t(activeTab + 'Modules')"
        :rows="modulesList"
        :columns="columns"
        virtual-scroll
        :rows-per-page-options="[0]"
        separator="cell"
        class="fit my-sticky-header-table"
        row-key="abr"
        :filter="filter"
        :filter-method="(filterMethod as any)"
        :selected-rows-label="getSelectedString"
        selection="multiple"
        dense
        @row-click="onRowClick"
      >
        <template #top-right>
          <div class="q-gutter-x-sm row">
            <TableFilters
              :modules-list="modulesList"
              @update-filter="filter = $event"
            />
            <UIButton
              :icon="Icons.DownloadFile"
              :disable="!selected.length"
              @click="onDownloadClick"
            />
          </div>
        </template>
        <template #body-cell-abr="cellProps">
          <q-td :props="cellProps">
            <div>
              <q-badge
                v-if="installedModules.includes(cellProps.row.fil)"
                :label="cellProps.value"
              />
              <span
                v-else
                v-text="cellProps.value"
              />
            </div>
          </q-td>
        </template>
      </q-table>
    </q-tab-panel>
  </q-tab-panels>
</template>

<script setup lang="ts">
import UIButton from 'components/UI/UIButton.vue'
import TableFilters from './TableFilters.vue'
import ModuleDetailedInfo from './ModuleDetailedInfo.vue'
import { cropString } from 'src/helpers'
import { Download } from 'types/registry'
import { ref, shallowRef } from 'vue'
import { useI18n } from 'vue-i18n'
import { Icons } from 'src/types/icons'

export interface TableFilter {
  language: string
  other: string
}

const props = defineProps<{
  activeTab: string
  modulesList: Download[]
}>()

const columns: any = [
  {
    name: 'abr',
    label: 'Abr',
    field: 'abr',
    align: 'left',
  },
  {
    name: 'des',
    label: 'Des',
    field: 'des',
    align: 'left',
    format: (val: string) => cropString(val, 50),
  },
  {
    name: 'lng',
    label: 'Lng',
    field: 'lng',
    align: 'left',
  },
  {
    name: 'siz',
    label: 'Siz',
    field: 'siz',
    align: 'left',
  },
]

const { t } = useI18n()

const pagination = ref({
  rowsPerPage: 0,
})
const selected = shallowRef<Download[]>([])
const getSelectedString = () =>
  selected.value.length === 0
    ? ''
    : `${selected.value.length} ${t('modulesSelectedOf')} ${props.modulesList.length}`

const filter = ref<TableFilter>()
const filterMethod = (raws: Download[], filter: TableFilter) => {
  const lng = filter.language?.toLowerCase() ?? ''
  const oth = filter.other.toLowerCase()
  const isLngEqual = (module: Download) => module.lng.toLowerCase() === lng
  const isAbbrEqual = (module: Download) => module.abr.toLowerCase().includes(oth)
  const isDescEqual = (module: Download) => module.des.toLowerCase().includes(oth)

  return raws.filter((module) =>
    !lng.length
      ? isAbbrEqual(module) || isDescEqual(module)
      : !oth.length
        ? isLngEqual(module)
        : isLngEqual(module) && (isAbbrEqual(module) || isDescEqual(module)),
  )
}

const showModuleDetailedInfo = ref(false)
const activeRow = ref<Download>()
const onRowClick = (evt: any, row: Download) => {
  activeRow.value = row
  showModuleDetailedInfo.value = true
}

const installedModules = shallowRef<Download[]>([])
const getInstalledModules = async () =>
  (installedModules.value = await window.api.system.getInstalledModules())

getInstalledModules()

const onDownloadClick = async () => {
  await window.api.electron.downloadModules(selected.value)
  selected.value = []
  getInstalledModules()
}
</script>

<style lang="scss">
.my-sticky-header-table {
  height: 310px;

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th {
    background-color: var(--table-borders);
  }

  thead tr th {
    position: sticky;
    z-index: 1;
  }
  thead tr:first-child th {
    top: 0;
  }
  &.q-table--loading thead tr:last-child th {
    top: 48px;
  }
  tbody tr {
    > .q-table--col-auto-width {
      cursor: auto !important;
    }
    cursor: help !important;
  }
}
</style>
