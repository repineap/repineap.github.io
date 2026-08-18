<script setup lang="ts">
import About from '../content/about.md'
</script>

<template>
  <section class="measure">
    <About />
  </section>
</template>

<style scoped>
.measure :deep(.prose > h1:first-child) {
  margin-top: 0;
  font-size: clamp(2.1rem, 6vw, 2.75rem);
  letter-spacing: -0.025em;
}
</style>
