<template>
  <div class="full-height overflow-hidden">
    <Splitpanes :dbl-click-splitter="false">
      <Pane
        v-for="id in indexes"
        :key="id"
        min-size="10"
        class="relative-position overflow-auto"
      >
        <WorkPlace :id="id" />
      </Pane>
    </Splitpanes>
  </div>
</template>

<script lang="ts" setup>
import {
  computed, provide, ref,
} from 'vue'
import useStore from 'src/hooks/useStore'
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import WorkPlace from '../components/Main/WorkPlace.vue'
import { useBookmarks } from '../hooks/useBookmarks'
import { bibleWindowsUpdates_, updateBibleWindows_ } from 'src/symbols'

const store = useStore()

const bibleWindowsUpdates = ref<number>(0)
const updateBibleWindows = () => bibleWindowsUpdates.value++
provide(bibleWindowsUpdates_, bibleWindowsUpdates)
provide(updateBibleWindows_, updateBibleWindows)

useBookmarks()

const activeWorkPlaces = computed(() => store.getters.getActiveWorkPlaces())
const indexes = computed(() => activeWorkPlaces.value.indexes)
provide('activeWorkPlaces', activeWorkPlaces)
</script>
