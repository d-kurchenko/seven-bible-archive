<template>
  <UIModalWindow @close="close">
    <q-dialog
      v-model="showCategoryCreator"
      persistent
    >
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div
            class="text-h6"
            v-text="$t('newCategory')"
          />
          <q-space />
          <q-btn
            v-close-popup
            icon="close"
            flat
            round
            dense
          />
        </q-card-section>

        <q-card-section>
          <q-form
            class="q-gutter-y-sm"
            @submit.prevent="createCategory"
          >
            <q-input
              v-model="categoryName"
              outlined
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || $t('emptyField'),
                (val) =>
                  !bookmarks.categoriesList.value.some(
                    (c) => c.name.toLowerCase() === val.toLowerCase()
                  ) || $t('categoryExists'),
              ]"
              :label="$t('name')"
            />
            <q-input
              v-model="categoryColor"
              outlined
              lazy-rules
              readonly
              :rules="[(val) => (val && val.length > 0) || t('emptyField')]"
              :label="$t('color')"
            >
              <template #append>
                <q-icon
                  :name="Icons.Colorize"
                  class="cursor-pointer"
                >
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-color
                      v-model="categoryColor"
                      no-header-tabs
                      no-footer
                      format-model="hex"
                      default-value="#000000"
                    />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <div
              v-if="categoryColor"
              style="width: 100%; height: 7px"
              :style="{ backgroundColor: categoryColor }"
            />
            <q-btn
              :label="$t('create')"
              type="submit"
            />
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="showDeleteCategoryConfirm"
      persistent
    >
      <q-card>
        <q-card-section class="q-pb-none">
          <q-item-label v-text="$t('deleteCategoryConfirm')" />
          <q-item-label class="flex justify-center q-gutter-x-sm">
            <q-btn
              v-close-popup
              :label="$t('cancel')"
              flat
              dense
            />
            <q-btn
              :label="$t('proceed')"
              flat
              dense
              @click.stop="deleteCategory"
            />
          </q-item-label>
        </q-card-section>
      </q-card>
    </q-dialog>
    <UIModalWindowHeader @close="close">
      <template #title>
        <span v-text="$t('bookmarksManager')" />
      </template>
    </UIModalWindowHeader>
    <UIModalWindowBody>
      <div class="container">
        <q-select
          :model-value="
            selectedCategory.index === 0
              ? $t(selectedCategory.name)
              : selectedCategory.name
          "
          :options="bookmarks.categoriesList.value"
          @update:model-value="selectedCategory = $event"
        >
          <template #option="{ itemProps, opt }">
            <q-item v-bind="itemProps">
              <q-item-section>
                <q-item-label class="flex">
                  <span v-text="opt.index === 0 ? $t(opt.name) : opt.name" />
                  <q-space />
                  <q-btn
                    v-if="opt.index !== 0"
                    :icon="Icons.Delete"
                    flat
                    dense
                    round
                    @click.stop="onBeforeDeleteCategory(opt.name)"
                  />
                </q-item-label>
                <!--                <q-space/>-->
              </q-item-section>
            </q-item>
          </template>

          <template #append>
            <q-btn
              round
              dense
              flat
              :icon="Icons.Plus"
              :title="$t('addCategory')"
              @click.stop="openCategoryCreator"
            />
          </template>
        </q-select>
      </div>

      <q-separator />

      <q-list
        class="overlay"
        separator
      >
        <template
          v-for="(category, i) in selectedCategories"
          :key="i"
        >
          <q-item
            v-for="(bookmark, j) in category.bookmarks"
            :key="i + '-' + j"
            clickable
            class="container"
            @click="goToText(bookmark)"
          >
            <q-item-section class="q-gutter-y-sm">
              <q-item-label class="text-subtitle2 q-gutter-x-sm flex">
                <span v-text="convertRef(bookmark)" />
                <template v-if="allCategoriesSelected">
                  <q-space />
                  <div class="relative-position">
                    <div
                      class="fit absolute-top"
                      style="opacity: 0.3"
                      :style="{
                        backgroundColor:
                          category.backgroundColor ?? 'var(--bookmark-default)',
                      }"
                    />
                    <span v-text="category.name" />
                  </div>
                </template>
              </q-item-label>

              <BibleVerses :verses="bookmark.texts" />

              <q-item-label
                v-if="bookmark.description.length"
                caption
                v-text="bookmark.description"
              />
            </q-item-section>
            <q-item-section
              side
              class="flex"
            >
              <q-btn
                size="12px"
                flat
                dense
                round
                :icon="Icons.Edit"
                @click.stop="onEdit(bookmark, category.name)"
              />
              <q-btn
                size="12px"
                flat
                dense
                round
                :icon="Icons.Delete"
                @click.stop="onDelete(bookmark, category.name)"
              />
            </q-item-section>
          </q-item>
        </template>
      </q-list>
    </UIModalWindowBody>
  </UIModalWindow>
</template>

<script setup lang="ts">
import UIModalWindow from 'components/UI/ModalWindow/UIModalWindow.vue'
import UIModalWindowBody from 'components/UI/ModalWindow/UIModalWindowBody.vue'
import UIModalWindowHeader from 'components/UI/ModalWindow/UIModalWindowHeader.vue'
import useSevenBible from 'src/hooks/useSevenBible'
import {
  computed, onMounted, ref,
} from 'vue'
import { useI18n } from 'vue-i18n'
import { PreparedBookmark, PreparedCategory } from 'types/api-modified/categories'
import { GetPreparedCategoriesArgs } from 'types/api-args/categories'
import { refToString } from 'src/helpers'
import BibleVerses from 'components/Main/BibleVerses.vue'
import useStore from 'src/hooks/useStore'
import { Icons } from 'src/types/icons'
import { notify } from 'src/wrappers/notify'
import useCategoryCreator from 'src/hooks/useCategoryCreator'

const emit = defineEmits(['close'])
const close = () => emit('close')

const { t } = useI18n()
const { bookmarks, bible, id, updateBibleWindows, popup } = useSevenBible()
const store = useStore()

const selectedCategory = ref(bookmarks.categoriesList.value[0])

const preparedCategories = ref<PreparedCategory[]>()
const getPreparedCategories = async () => {
  const settings: GetPreparedCategoriesArgs = {
    bibleFileName: bible.value.fileName,
    categories: bookmarks.bookmarkCategories.value,
  }
  preparedCategories.value = await window.api.categories.GET_PREPARED_CATEGORIES(settings)
}
onMounted(() => getPreparedCategories())

const allCategoriesSelected = computed(() => selectedCategory.value.index === 0)

const selectedCategories = computed<PreparedCategory[]>(() => {
  if (!preparedCategories.value?.length) { return [] }
  if (allCategoriesSelected.value) { return preparedCategories.value } else {
    const preparedCategory = preparedCategories.value.find(
      (category) => category.name === selectedCategory.value.name,
    )

    return preparedCategory ? [preparedCategory] : []
  }
})

const convertRef = (bookmark: PreparedBookmark) =>
  refToString(
    bookmark.bookShortName,
    bookmark.startChapterNumber,
    bookmark.startVerseNumber,
    bookmark.endVerseNumber,
  )

const goToText = (bookmark: PreparedBookmark) => {
  store.state.setBibleRef(id, {
    bookNumber: bookmark.bookNumber,
    chapterNumber: bookmark.startChapterNumber,
  })
  close()
}
const onEdit = async (bookmark: PreparedBookmark, categoryName: string) => {
  await popup.showBookmarkCreator({
    modelValue: {
      bookNumber: bookmark.bookNumber,
      dateCreated: bookmark.dateCreated,
      dateModified: bookmark.dateModified,
      description: bookmark.description,
      endChapterNumber: bookmark.endChapterNumber,
      endVerseNumber: bookmark.endVerseNumber,
      isForRussianNumbering: bookmark.isForRussianNumbering,
      startChapterNumber: bookmark.startChapterNumber,
      startVerseNumber: bookmark.startVerseNumber,
    },
    isEditMode: true,
    categoryNameToDeleteIn: categoryName,
  })
  popup.showBookmarksManager({
  })
  updateBibleWindows()
}
const onDelete = async (bookmark: PreparedBookmark, categoryName: string) => {
  await bookmarks.deleteBookmark(categoryName, bookmark)
  getPreparedCategories()
  updateBibleWindows()
  notify.showInfo(t('bookmarkWasDeleted'))
}

const {
  categoryName,
  categoryColor,
  showCategoryCreator,
  openCategoryCreator,
  createCategory,
} = useCategoryCreator({
  getPreparedCategories,
})

const showDeleteCategoryConfirm = ref(false)
let categoryToDelete: string
const onBeforeDeleteCategory = (categoryName: string) => {
  categoryToDelete = categoryName
  showDeleteCategoryConfirm.value = true
}
const deleteCategory = async () => {
  showDeleteCategoryConfirm.value = false
  await bookmarks.deleteCategory(categoryToDelete)
  updateBibleWindows()
}
</script>
