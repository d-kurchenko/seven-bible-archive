<template>
  <div
    style="transition: 0.2s"
    class="q-gutter-y-sm"
  >
    <div
      v-if="
        chapterNumber === 1 && (info?.detailed_info?.length || moduleIntroduction.length)
      "
    >
      <span
        class="introduction text-h6"
        @click="moduleIntroductionWindow = true"
      >
        {{ info.introduction_string || 'Введение' }}
      </span>

      <q-dialog v-model="moduleIntroductionWindow">
        <q-card>
          <q-card-section class="row q-pb-none">
            <span class="text-h6">{{ info.description }}</span>
            <q-space />
            <q-btn
              v-close-popup
              :icon="Icons.Close"
              flat
              round
              dense
            />
          </q-card-section>

          <q-separator />

          <q-card-section
            class="scroll-container"
            style="max-height: 50vh"
          >
            <span v-html="info.detailed_info" />

            <template v-if="moduleIntroduction.length">
              <q-separator />
              <span v-html="moduleIntroduction" />
            </template>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>

    <div>
      <span
        class="book-name text-h4"
        :class="{ introduction: bookIntroduction }"
        @click="
          () => {
            if (bookIntroduction) bookIntroductionWindow = true
          }
        "
      >
        {{ bookFullName }}
      </span>
      <q-dialog v-model="bookIntroductionWindow">
        <q-card>
          <q-card-section class="row q-pb-none">
            <div class="text-h6">
              {{ bookFullName }}
            </div>
            <q-space />
            <q-btn
              v-close-popup
              :icon="Icons.Close"
              flat
              round
              dense
            />
          </q-card-section>

          <q-separator />

          <q-card-section
            class="scroll-container"
            style="max-height: 50vh"
            v-html="bookIntroduction"
          />
        </q-card>
      </q-dialog>
    </div>

    <div class="chapter-number text-h4">
      {{
        String.hasReplacer(chapterString)
          ? chapterString.format(chapterNumber)
          : `${chapterString} ${chapterNumber}`
      }}
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  watch, onMounted, ref,
} from 'vue'
import useSevenBible from 'src/hooks/useSevenBible'
import { Icons } from 'src/types/icons'

const props = defineProps<{
  chapterString: string,
  bookNumber: number,
  chapterNumber: number,
  bookFullName: string,
  bibleFileName: string,
}>()

const { bibleModuleInfo: info, refString } = useSevenBible()
const moduleIntroductionWindow = ref(false)
const bookIntroductionWindow = ref(false)
const moduleIntroduction = ref('')
const bookIntroduction = ref('')

const getIntroductions = async () => {
  moduleIntroduction.value = ''
  bookIntroduction.value = ''
  const settings = {
    chapterNumber: props.chapterNumber,
    bookNumber: props.bookNumber,
    filename: props.bibleFileName,
  }
  const data = await window.api.bible.GET_INTRODUCTIONS(settings)

  data?.forEach((item: any) => {
    if (item.book_number === 0) {
      moduleIntroduction.value = item.introduction
    }
    if (item.book_number === settings.bookNumber && !item.chapter_number) {
      bookIntroduction.value = item.introduction
    }
  })
}

onMounted(() => getIntroductions())
watch([refString, () => props.bibleFileName], () => {
  setTimeout(() => getIntroductions())
})

</script>
