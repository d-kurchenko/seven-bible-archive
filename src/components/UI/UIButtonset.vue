<template>
  <div
    ref="topBar"
    class="top-bar flex full-width overflow-hidden shrink-0"
    @wheel.prevent="horizontalScrollOnWheel($event, $refs.topBar)"
  >
    <slot />
  </div>
</template>

<script setup>
import { horizontalScrollOnWheel } from 'src/hooks/HorizontalScrollOnWheel'
</script>
