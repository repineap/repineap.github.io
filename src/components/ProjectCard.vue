<script setup lang="ts">
import type { Entry } from '../content'

defineProps<{ entry: Entry }>()
</script>

<template>
  <article class="card">
    <img class="thumb" :src="entry.image" :alt="`Screenshot of ${entry.title}`" loading="lazy" />

    <h2 class="title serif">
      <!-- Stretched: the whole card opens the detail page. -->
      <RouterLink class="stretch" :to="`/projects/${entry.slug}`">{{ entry.title }}</RouterLink>
    </h2>

    <p v-if="entry.blurb" class="blurb">{{ entry.blurb }}</p>

    <ul v-if="entry.tags.length" class="tags">
      <li v-for="tag in entry.tags" :key="tag">{{ tag }}</li>
    </ul>

    <!-- Raised above the stretched link so these stay separately clickable. -->
    <div v-if="entry.live || entry.source" class="links meta">
      <a v-if="entry.live" :href="entry.live" target="_blank" rel="noopener">Live ↗</a>
      <a v-if="entry.source" :href="entry.source" target="_blank" rel="noopener">Source ↗</a>
    </div>
  </article>
</template>

<style scoped>
/* Flat and editorial: a rule under the image, no frame, no fill. */
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.thumb {
  border-radius: 4px;
  border: 1px solid var(--rule);
  transition:
    border-color 0.18s ease,
    opacity 0.18s ease;
}

.card:hover .thumb {
  border-color: var(--accent-deep);
}

.title {
  font-size: 1.3rem;
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: -0.015em;
}

.title a {
  color: var(--text-bright);
  border-bottom: 0;
}

.card:hover .title a {
  color: var(--accent);
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

.links {
  display: flex;
  gap: 1.1rem;
  margin-top: 0.15rem;
}

.links a {
  position: relative;
  z-index: 1;
  color: var(--text-dim);
  border-bottom: 0;
}

.links a:hover {
  color: var(--accent);
}
</style>
