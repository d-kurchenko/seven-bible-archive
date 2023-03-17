<template>
  <UIModalWindow>
    <UIModalWindowHeader @close="close">
      <template #title>
        Закладка {{ bookShortName }} {{ bible.chapterNumber }}:{{
          convertedVerses
        }}
      </template>
      <q-btn
        disable
        flat
        round
        :icon="Icons.Dots"
      />
    </UIModalWindowHeader>
    <UIModalWindowBody>
      <div class="container fit flex d-column">
        <q-select
          v-model="selectedCategory"
          :options="categoriesList"
        />
        <textarea
          v-model="bookmark.description"
          v-focus.next
          maxlength="1000"
          :placeholder="$t('noteToBookmark')"
          class="fit overlay reset shadow-4 rounded-borders container"
        />
      </div>
      <q-separator />
      <div class="container q-gutter-y-sm">
        <BibleVerses
          style="max-height: 150px"
          :verses="verses"
          class="shadow-4 rounded-borders overlay"
        />
        <div class="flex justify-around">
          <UIButton
            :tooltip="$t('cancel')"
            :icon="Icons.Cancel"
            @click="close"
          />
          <UIButton
            :tooltip="$t('accept')"
            :icon="Icons.Done"
            @click="makeBookmark"
          />
        </div>
      </div>
    </UIModalWindowBody>
  </UIModalWindow>
</template>

<script setup lang="ts">
import UIModalWindow from 'components/UI/ModalWindow/UIModalWindow.vue'
import UIModalWindowHeader from 'components/UI/ModalWindow/UIModalWindowHeader.vue'
import UIModalWindowBody from 'components/UI/ModalWindow/UIModalWindowBody.vue'
import useSevenBible from 'src/hooks/useSevenBible'
import {
  computed, onMounted, ref,
} from 'vue'
import BibleVerses from 'components/Main/BibleVerses.vue'
import UIButton from 'components/UI/UIButton.vue'
import { createDateString } from 'src/helpers'
import { notify } from 'src/wrappers/notify'
import { useI18n } from 'vue-i18n'
import { Bookmark } from 'types/bookmark'
import { Icons } from 'src/types/icons'
import { PreparedVerse } from 'types/api-modified/bible'
import { BookmarkArgs } from 'src/hooks/useBookmarks'

interface Props {
  modelValue: Bookmark
  isEditMode?: boolean
  categoryNameToDeleteIn?: string
}

let props = defineProps<Props>()

const emit = defineEmits(['close'])

const {
  bible: { value: bible },
  bookShortName,
  bibleModuleInfo: { value: info },
  bookmarks,
  updateBibleWindows,
} = useSevenBible()

const { modelValue, isEditMode, categoryNameToDeleteIn } = props

const bookmark = ref<Bookmark>({
  bookNumber: bible.bookNumber,
  startChapterNumber: bible.chapterNumber,
  endChapterNumber: bible.chapterNumber,
  startVerseNumber: modelValue.startVerseNumber,
  endVerseNumber: modelValue.endVerseNumber ?? modelValue.startVerseNumber,
  description: '',
  isForRussianNumbering: Boolean.parse(info.russian_numbering),
})
bookmark.value = {
  ...bookmark.value,
  ...modelValue,
}

const close = () => emit('close')
const verses = ref<PreparedVerse[]>()

const getVersesText = async () => {
  const settings = {
    filename: bible.fileName,
    bookNumber: bible.bookNumber,
    chapterNumber: bible.chapterNumber,
    selectedVerseFrom: bookmark.value.startVerseNumber,
    selectedVerseTo: bookmark.value.endVerseNumber,
  }
  verses.value = await window.api.bible.GET_VERSES(settings)
}

onMounted(() => {
  getVersesText()
})

const { t } = useI18n()

const convertedVerses = computed(() => {
  return !bookmark.value.endVerseNumber ||
    bookmark.value.endVerseNumber === bookmark.value.startVerseNumber
    ? bookmark.value.startVerseNumber
    : `${bookmark.value.startVerseNumber}-${bookmark.value.endVerseNumber}`
})

const categoriesList = bookmarks.bookmarkCategories.value.map((category) => category.name)
const selectedCategory = ref(categoryNameToDeleteIn ?? categoriesList[0])

const makeBookmark = async () => {
  if (!bookmark.value.startVerseNumber) { return }
  const settings: BookmarkArgs = {
    categoryName: selectedCategory.value,
    bookmark: {
      ...bookmark.value,
    },
  }
  const date = createDateString()
  if (isEditMode) { settings.bookmark.dateModified = date } else {
    settings.bookmark.dateCreated = date
    settings.bookmark.dateModified = date
  }
  if (isEditMode && categoryNameToDeleteIn) {
    await bookmarks.editBookmark(settings, {
      categoryName: categoryNameToDeleteIn,
      bookmark: {
        ...modelValue,
      },
    })
    notify.showInfo(t('bookmarkWasEdited'))
  } else {
    await bookmarks.addBookmark(settings)
    notify.showInfo(t('bookmarkWasCreated'))
  }
  close()
  updateBibleWindows()
}
</script>
