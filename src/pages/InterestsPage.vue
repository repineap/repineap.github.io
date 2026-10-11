<script setup lang="ts">
import EntryCard from '../components/EntryCard.vue'
import { interests } from '../content'
</script>

<template>
  <section class="wide">
    <header class="head">
      <h1 class="page-title">Interests</h1>
      <p class="lede">
          Software isn't everything.
      </p>
    </header>

    <div v-if="interests.length" class="card-grid">
      <EntryCard
        v-for="entry in interests"
        :key="entry.slug"
        :entry="entry"
        collection="interests"
      />
    </div>
    <p v-else class="meta">Nothing here yet.</p>
  </section>
</template>

<style scoped>
.head {
  margin-bottom: 3rem;
}
</style>
