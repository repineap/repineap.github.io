<script setup lang="ts">
// The single hook for the page background. It is flat paper - no wash, no
// texture, no animation - and sits behind everything.
</script>

<template>
  <div class="site-background" aria-hidden="true" />
</template>

<style scoped>
.site-background {
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background: var(--paper);
}
</style>
