<template>
  <q-menu
    touch-position
    context-menu
    auto-close
    @mousedown.prevent
  >
    <q-list>
      <q-item
        v-ripple
        clickable
        @click="copy"
      >
        <q-item-section> Копировать </q-item-section>
      </q-item>

      <q-item
        v-ripple
        clickable
        @click="copyVerses"
      >
        <q-item-section> Копировать стихи </q-item-section>
      </q-item>
    </q-list>
  </q-menu>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
import { computed } from 'vue'

const props = defineProps<{
  verses: Record<string, any>,
  bookShortName: string,
}>()

const store = useStore()
const copySettings = computed(() => store.getters['settings/copySettings'])

const copy = () => document.execCommand('copy')
const copyVerses = async () => {
  const selection = window.getSelection()

  let firstNode = selection?.anchorNode?.parentElement?.closest('.text')
  let lastNode = selection?.focusNode?.parentElement?.closest('.text')

  let firstNodeIndex = parseInt(firstNode?.closest('.verse')?.querySelector<HTMLElement>('span.number')?.innerText || '')
  let lastNodeIndex = parseInt(lastNode?.closest('.verse')?.querySelector<HTMLElement>('span.number')?.innerText || '')

  if(!firstNodeIndex || !lastNodeIndex) return

  if (firstNodeIndex > lastNodeIndex) {
    [firstNode, lastNode] = [lastNode, firstNode];
    [firstNodeIndex, lastNodeIndex] = [lastNodeIndex, firstNodeIndex]
  }

  const verses = props.verses.children

  let text = copySettings.value.quotes[0]
  for (let i = firstNodeIndex - 1; i <= lastNodeIndex - 1; i++) {
    if (i + 1 === lastNodeIndex) { text += verses[i].querySelector('.text').innerText } else { text += verses[i].querySelector('.text').innerText + ' ' }
  }
  text += copySettings.value.quotes[1]
  text += ` (${props.bookShortName}: ${firstNodeIndex === lastNodeIndex
      ? `${firstNodeIndex}`
      : `${firstNodeIndex}-${lastNodeIndex}`
    })`
  navigator.clipboard.writeText(text)
}

</script>
