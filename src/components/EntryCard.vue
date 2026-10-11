<script setup lang="ts">
import { computed } from 'vue'
import type { CollectionName, Entry } from '../content'
import DitherCanvas from './DitherCanvas.vue'

const props = defineProps<{ entry: Entry; collection: CollectionName }>()

const alt = computed(() =>
  props.collection === 'projects' ? `Screenshot of ${props.entry.title}` : props.entry.title,
)
</script>

<template>
  <article class="card">
    <div class="thumb">
      <DitherCanvas :src="entry.image" :alt="alt" />
    </div>

    <h2 class="title serif">
      <!-- Stretched: the whole card opens the detail page. -->
      <RouterLink class="stretch" :to="`/${collection}/${entry.slug}`">{{ entry.title }}</RouterLink>
    </h2>

    <p v-if="entry.blurb" class="blurb">{{ entry.blurb }}</p>
  </article>
</template>

<style scoped>
/* One card for both collections: a dithered image, a headline and a blurb. */
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.thumb {
  transition: border-color 0.18s ease;
}

.card:hover .thumb {
  border-color: var(--ink);
}

.title {
  font-size: 1.3rem;
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: -0.015em;
}

.title a {
  text-decoration: none;
}

.card:hover .title a {
  text-decoration: underline;
  text-decoration-thickness: 1px;
}

.stretch::after {
  content: '';
  position: absolute;
  inset: 0;
}

.blurb {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text);
}

@media (prefers-reduced-motion: reduce) {
  .thumb {
    transition: none;
  }
}
</style>
