<template>
  <div>
    <div
      v-for="(verse, i) in verses"
      :key="i"
    >
      <span
        v-if="verses.length > 1"
        v-text="verse.verse + ' '"
      />
      <span v-html="verse.text" />
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue'
import { BibleVerses } from 'src-electron/types/bible'

export default defineComponent({
  props: {
    verses: {
      type: Array as PropType<BibleVerses[]>,
      required: true,
      default: () => [],
    },
  },
})
</script>
