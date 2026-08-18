<script setup lang="ts">
import InterestCard from '../components/InterestCard.vue'
import { interests } from '../content'
</script>

<template>
  <section class="wide">
    <header class="head">
      <h1 class="page-title">Interests</h1>
      <p class="lede">
        <span class="todo">TODO —</span> one line about what you get up to away from a screen.
      </p>
    </header>

    <div v-if="interests.length" class="card-grid">
      <InterestCard v-for="entry in interests" :key="entry.slug" :entry="entry" />
    </div>
    <p v-else class="meta">Nothing here yet.</p>
  </section>
</template>

<style scoped>
.head {
  margin-bottom: 3rem;
}
</style>
