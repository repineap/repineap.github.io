<script setup lang="ts">
import EntryCard from '../components/EntryCard.vue'
import { projects } from '../content'
import TopOfMind from '../content/top-of-mind.md'
import { site } from '../site'
</script>

<template>
  <section class="wide">
    <p class="tagline serif">{{ site.tagline }}</p>

    <div class="now">
      <h2 class="meta">Top of mind</h2>
      <TopOfMind />
    </div>

    <hr class="rule divider" />

    <div v-if="projects.length" class="card-grid">
      <EntryCard
        v-for="entry in projects"
        :key="entry.slug"
        :entry="entry"
        collection="projects"
      />
    </div>
    <p v-else class="meta">No projects yet.</p>
  </section>
</template>

<style scoped>
.tagline {
  max-width: var(--measure);
  font-size: clamp(1.6rem, 4.6vw, 2.25rem);
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--ink);
}

.now {
  margin-top: 2rem;
}

.now h2 {
  font-weight: 400;
}

.now :deep(.prose) {
  margin-top: 0.25rem;
  color: var(--ink);
}

.divider {
  margin-block: 2rem 2.5rem;
}
</style>
