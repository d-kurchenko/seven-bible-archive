<template>
  <div
    v-show="visibleRight"
    class="layout-sidebar shrink-0 border-left"
  >
    <q-list class="full-height overlay-y">
      <template
        v-for="(menuItem, index) in menuList"
        :key="index"
      >
        <q-item
          v-ripple
          :to="menuItem.path"
          clickable
          exact
        >
          <q-item-section avatar>
            <q-icon :name="menuItem.icon" />
          </q-item-section>
          <q-item-section>
            {{ t(menuItem.label) }}
          </q-item-section>
        </q-item>
        <q-separator
          v-if="menuItem.separator"
          :key="'sep' + index"
        />
      </template>
    </q-list>
  </div>
</template>

<script setup lang="ts">
import { menuList } from 'src/objects/menu.js'
import { useI18n } from 'vue-i18n'

defineProps<{
  visibleRight: boolean
}>()

const { t } = useI18n()
</script>
