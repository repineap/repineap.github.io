<script setup lang="ts">
import type { Entry } from '../content'

defineProps<{ entry: Entry }>()
</script>

<template>
  <article class="card">
    <div class="frame">
      <img class="thumb" :src="entry.image" :alt="entry.title" loading="lazy" />
      <!-- Static glass: a fixed diagonal sheen plus an inset highlight ring. -->
      <div class="glint" aria-hidden="true" />
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

/* The frame is the card's chrome: a raised pane the photo sits inside. */
.frame {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  padding: 6px;
  background: linear-gradient(160deg, var(--frame-lit), var(--frame-mid) 55%, var(--frame-shade));
  box-shadow:
    inset 0 0 0 1px rgba(240, 200, 150, 0.1),
    0 1px 0 0 rgba(255, 226, 186, 0.05),
    0 12px 28px -18px rgba(0, 0, 0, 0.9);
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.thumb {
  border-radius: 4px;
}

.glint {
  position: absolute;
  inset: 0;
  border-radius: 8px;
  pointer-events: none;
  background: linear-gradient(
    118deg,
    rgba(255, 255, 255, 0.14) 0%,
    rgba(255, 255, 255, 0.05) 14%,
    transparent 34%,
    transparent 62%,
    rgba(240, 168, 60, 0.08) 88%,
    rgba(240, 168, 60, 0.14) 100%
  );
  opacity: 0.75;
  transition: opacity 0.25s ease;
}

.card:hover .frame {
  transform: translateY(-3px);
  box-shadow:
    inset 0 0 0 1px rgba(240, 168, 60, 0.28),
    0 1px 0 0 rgba(255, 255, 255, 0.06),
    0 18px 34px -18px rgba(0, 0, 0, 0.95);
}

.card:hover .glint {
  opacity: 1;
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
  .glint {
    transition: none;
  }

  .card:hover .frame {
    transform: none;
  }
}
</style>
