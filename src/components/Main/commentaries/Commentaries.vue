<template>
  <UIWorkPlaceWindow>
    <UIWorkPlaceWindowHeader>
      <CommentariesTopBar
        :commentaries-file-name="commentariesModule.fileName"
        :book-short-name="bookShortName || ''"
        :chapter-number="chapterNumber"
      />
    </UIWorkPlaceWindowHeader>

    <UIWorkPlaceWindowBody>
      <template v-if="!showLoader">
        <div
          class="text-center"
          v-if="!commentaries.length"
          v-text="
            `В модуле &quot;${commentariesModule.fileName}&quot; не найдено комментариев на выбраную главу.`
          "
        />
        <div
          v-else
          v-for="(item, id) in (commentaries as any[])"
          :key="id"
          :items="commentaries"
        >
          <div>
            <a
              class="text-weight-bold"
              v-text="
                bookShortName + ' ' + item.chapter + ':' + item.verseNumber
              "
            />
          </div>
          <span v-html="item.text" />
        </div>
      </template>

      <UILoader v-else />
    </UIWorkPlaceWindowBody>
  </UIWorkPlaceWindow>
</template>

<script setup lang="ts">
import UILoader from 'src/components/UI/UILoader.vue';
import CommentariesTopBar from 'components/Main/commentaries/commentariesTopBar.vue';
import UIWorkPlaceWindow from 'components/UI/WorkPlaceWindow/UIWorkPlaceWindow.vue';
import UIWorkPlaceWindowHeader from 'components/UI/WorkPlaceWindow/UIWorkPlaceWindowHeader.vue';
import UIWorkPlaceWindowBody from 'components/UI/WorkPlaceWindow/UIWorkPlaceWindowBody.vue';

import { onMounted, watch, computed } from 'vue';
import useStore from 'src/hooks/useStore';
import useSevenBible from 'src/hooks/useSevenBible';
import useCommentaries from 'src/hooks/useCommentaries';
import { useCommentariesDatabaseConnection } from 'src/hooks/DBconnectionController';


const { id, bookShortName, refString } = useSevenBible();
const store = useStore();
const commentariesModule = store.state.getReactive(
  `workPlace.${id}.commentaries`
);
const commentariesFilename = computed(
  () => commentariesModule.value.fileName
);
useCommentariesDatabaseConnection(commentariesFilename);
const chapterNumber = store.state.getReactive(
  `workPlace.${id}.bible.chapterNumber`
);

const { commentaries, showLoader, getCommentaries } = useCommentaries(
  id,
  store,
  commentariesModule
);

watch(refString as any, () => {
  getCommentaries();
});
watch(
  () => commentariesModule.value.fileName,
  (newFilename, oldFilename) => {
    window.api.commentaries.disconnectDatabase(oldFilename);
    window.api.commentaries.connectDatabase(newFilename);
    getCommentaries();
  }
);
onMounted(() => getCommentaries());
</script>
