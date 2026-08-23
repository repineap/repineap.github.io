<script setup lang="ts">
import type { Entry } from '../content'

defineProps<{ entry: Entry }>()
</script>

<template>
  <article class="card">
    <div class="frame">
      <img class="thumb" :src="entry.image" :alt="entry.title" loading="lazy" />
      <!-- Bloom: a soft, diffuse light over the photo. Static, no sheen. -->
      <div class="bloom" aria-hidden="true" />
    </div>

    <h2 class="title serif">
      <RouterLink class="stretch" :to="`/interests/${entry.slug}`">{{ entry.title }}</RouterLink>
    </h2>
    <p v-if="entry.blurb" class="caption">{{ entry.blurb }}</p>
  </article>
</template>

<style scoped>
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

/* A plain brown frame around the photo. Flat colour, square corners. */
.frame {
  position: relative;
  overflow: hidden;
  padding: 8px;
  background: var(--frame);
  transition: background-color 0.2s ease;
}

.bloom {
  position: absolute;
  inset: 8px;
  pointer-events: none;
  background: radial-gradient(
    120% 90% at 30% 12%,
    rgba(255, 233, 200, 0.22),
    rgba(255, 220, 175, 0.08) 45%,
    transparent 72%
  );
  transition: opacity 0.2s ease;
}

.card:hover .frame {
  background: var(--frame-lit);
}

.title {
  font-size: 1.2rem;
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

.caption {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text);
}

@media (prefers-reduced-motion: reduce) {
  .frame,
  .bloom {
    transition: none;
  }
}
</style>
