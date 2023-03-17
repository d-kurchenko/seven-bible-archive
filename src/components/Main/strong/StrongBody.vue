<template>
  <div>
    <template
      v-for="(number, key, index) in strongNumbersInfo"
      :key="index"
    >
      <div
        v-show="strongNumbers.length > 1"
        class="text-bold"
      >
        {{ key.toUpperCase() }}
      </div>
      <div v-html="number.definition" />
      <template v-if="number.cognate.length">
        <q-separator class="q-my-xs" />
        <div
          class="q-gutter-x-sm"
          style="word-break: break-all"
        >
          <span class="text-no-wrap">Однокоренные:</span>
          <span
            v-for="(cognate, i) in number.cognate"
            :key="i"
          >
            <a :href="'S:' + cognate">{{ cognate }}</a>
          </span>
        </div>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import {
  onMounted, ref, watch,
} from 'vue'

const props = defineProps<{
  strongNumbers: string[],
  strongFileName: string,
}>()

const strongNumbersInfo = ref<Record<string, any>>()
const searchInfo = async () => {
  const settings = {
    strongNumbers: [...props.strongNumbers],
    filename: props.strongFileName,
  }
  strongNumbersInfo.value = await window.api.strong.GET_NUMBERS_INFO(settings)
}

onMounted(() => searchInfo())

watch(
  () => props.strongNumbers,
  () => searchInfo(),
)
watch(
  () => props.strongFileName,
  (newFilename, oldFilename) => {
    window.api.strong.DISSCONNECT_DATABASE(oldFilename)
    window.api.strong.CONNECT_DATABASE(newFilename)
    searchInfo()
  },
)

</script>
