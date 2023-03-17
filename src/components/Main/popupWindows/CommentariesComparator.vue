<template>
  <UIModalWindow>
    <UIModalWindowHeader @close="close">
      <template #title>
        {{ bookShortName }} {{ chapterNumber }}: {{ verseNumber }} -
        Комментарии
      </template>
    </UIModalWindowHeader>
    <UIModalWindowBody>
      <UILoader v-if="loading" />
      <q-list
        v-else-if="comparedCommentaries.length"
        separator
      >
        <q-item
          v-for="(item, i) in comparedCommentaries"
          :key="i"
        >
          <q-item-section>
            <q-item-label
              class="text-bold"
              v-text="item.filename"
            />
            <q-item-label v-html="item.text" />
          </q-item-section>
        </q-item>
      </q-list>
      <UIError
        v-else
        v-text="$t('nothingFounded')"
      />
    </UIModalWindowBody>
  </UIModalWindow>
</template>

<script lang="ts">
export interface A {
  a: string,
}
</script>

<script setup lang="ts">
import UIModalWindow from 'components/UI/ModalWindow/UIModalWindow.vue'
import UIModalWindowHeader from 'components/UI/ModalWindow/UIModalWindowHeader.vue'
import UIModalWindowBody from 'components/UI/ModalWindow/UIModalWindowBody.vue'
import useSevenBible from 'src/hooks/useSevenBible'
import {
  onMounted, ref, nextTick,
} from 'vue'
import { Commentaries } from 'src-electron/types/commentaries'
import UIError from 'components/UI/UIError.vue'
import UILoader from 'src/components/UI/UILoader.vue'

const props = defineProps<{
  verseNumber: number,
}>()
const emit = defineEmits<{
  (name: 'close'): void
}>()

const {
  bookShortName,
  bible: { value: { chapterNumber, bookNumber } },
} = useSevenBible()

const loading = ref(false)
const close = () => emit('close')
const comparedCommentaries = ref<Commentaries[]>([])

const getCompared = async () => {
  const settings = {
    bookNumber,
    chapterNumber,
    verseNumber: props.verseNumber,
  }
  loading.value = true
  comparedCommentaries.value = await window.api.commentaries.GET_COMPARED(settings)
  nextTick(() => (loading.value = false))
}

onMounted(() => getCompared())

</script>
