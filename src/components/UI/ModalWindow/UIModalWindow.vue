<template>
  <div
    v-focus
    class="ui-modal-window flex d-column absolute fit overflow-hidden-y no-outline"
    :class="{ 'background-transparent': transparent }"
    @keydown.esc="$emit('close')"
    @click="onCLick"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  transparent?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  transparent: false,
})

const emit = defineEmits(['close'])

const onCLick = (event: any) => {
  if (
    (props.transparent &&
      event.target.parentElement.classList.contains('ui-modal-window')) ||
    event.target.classList.contains('ui-modal-window')
  ) { emit('close') }
}
</script>
