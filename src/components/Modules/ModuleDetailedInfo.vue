<template>
  <q-dialog :model-value="show">
    <q-card>
      <q-card-section class="row q-pb-none">
        <span class="text-h6">{{ $t('infoAboutModule') }} {{ module.abr }}</span>
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
        <p>
          <b>{{ $t('abr') }}</b>: {{ module.abr }}
        </p>
        <p v-if="module.lng">
          <b>{{ $t('lng') }}</b>: {{ module.lng }}
        </p>
        <p>
          <b>{{ $t('siz') }}</b>: {{ module.siz }}
        </p>
        <p>
          <b>{{ $t('des') }}</b>: {{ module.des }}
        </p>
        <p v-if="module.inf">
          <b>{{ $t('inf') }}</b>: <span v-html="module.inf" />
        </p>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { Download } from 'types/registry'
import { Icons } from 'src/types/icons'

interface Props {
  module: Download
  show: boolean
}
defineProps<Props>()
</script>
