<template>
  <q-dialog
    :model-value="true"
    persistent
    seamless
    class="non-selectable"
  >
    <q-page-sticky :offset="positions">
      <q-card
        ref="card"
        class="bg-primary text-white"
        style="width: 300px"
      >
        <q-bar
          v-touch-pan.prevent.mouse="onPane"
          class="cursor-move"
        >
          <div>{{ title }}</div>
          <q-space />
          <q-btn
            v-close-popup
            dense
            flat
            :icon="Icons.Close"
          />
        </q-bar>
        <slot />
      </q-card>
    </q-page-sticky>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icons } from 'src/types/icons'
import { QCard } from 'quasar'


defineProps<{
  title: string
}>()

const positions = ref([10, 10])

const card = ref<InstanceType<typeof QCard> | null>(null)

const onPane = (event: any) => {
  const cardEl = card.value?.$el
  if(!cardEl) return

  const { x, y } = event.delta
  const [prevX, prevY] = positions.value

  const nextX = prevX - x
  const nextY = prevY - y

  const { clientHeight, clientWidth } = cardEl

  positions.value = [
    nextX >= window.innerWidth - clientWidth || nextX <= 0 ? prevX : nextX,
    nextY >= window.innerHeight - clientHeight - 32 || nextY <= 0 ? prevY : nextY,
  ]
}
</script>
