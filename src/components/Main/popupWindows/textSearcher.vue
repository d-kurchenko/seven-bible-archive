<template>
  <UIModalWindow>
    <UIModalWindowHeader @close="close">
      <template #title>
        Поиск по библии - {{ bibleFileName }}
      </template>
      <q-btn
        disable
        flat
        round
        :icon="Icons.Dots"
      />
    </UIModalWindowHeader>
    <UIModalWindowBody>
      <UIModalWindowSettings>
        <q-form>
          <q-input
            ref="input"
            v-model="searchInput"
            placeholder="Поиск"
            filled
            counter
            for="btn"
          >
            <template #after>
              <q-btn
                ref="btn"
                name="btn"
                type="submit"
                round
                flat
                :icon="Icons.Search"
                @click="searchText()"
              />
            </template>
          </q-input>
        </q-form>
      </UIModalWindowSettings>

      <q-linear-progress
        v-if="showLoader"
        query
      />

      <DynamicVirtualScroller
        :items="foundedTexts"
        class="overlay separated"
      >
        <template #default="{ item }">
          <q-item
            clickable
            class="q-px-md"
            @click="goToText(item.book_number, item.chapter)"
          >
            <q-item-section>
              <q-item-label caption>
                {{ item.long_name }}
                {{ item.chapter }}:{{ item.verse }}
              </q-item-label>
              <q-item-label v-html="item.text" />
            </q-item-section>
          </q-item>
        </template>
      </DynamicVirtualScroller>
    </UIModalWindowBody>
  </UIModalWindow>
</template>

<script setup>
import useStore from 'src/hooks/useStore'
import { ref, onMounted } from 'vue'
import UIModalWindow from 'components/UI/ModalWindow/UIModalWindow.vue'
import UIModalWindowHeader from 'components/UI/ModalWindow/UIModalWindowHeader.vue'
import UIModalWindowSettings from 'components/UI/ModalWindow/UIModalWindowSettings.vue'
import useSevenBible from 'src/hooks/useSevenBible'
import useTextSearcher from 'src/hooks/useTextSearcher'
import DynamicVirtualScroller from 'components/wrappers/DynamicVirtualScroller.vue'
import UIModalWindowBody from 'components/UI/ModalWindow/UIModalWindowBody.vue'
import { Icons } from 'src/types/icons'

const emit = defineEmits(['close'])

const { id } = useSevenBible()
const close = (ref) => emit('close', ref)

const store = useStore()
const bibleFileName = ref(store.native.state.settings.workPlace[id].bible.fileName)
const { showLoader, searchInput, foundedTexts, searchText } =
  useTextSearcher(bibleFileName)

const goToText = (bookNumber, chapterNumber) => {
  const ref = {
    bookNumber,
    chapterNumber,
  }
  close(ref)
}

const input = ref(null)
onMounted(() => setTimeout(() => input.value.focus(), 300))
</script>
