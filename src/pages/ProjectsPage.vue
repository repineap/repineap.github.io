<script setup lang="ts">
import ProjectCard from '../components/ProjectCard.vue'
import { projects } from '../content'
</script>

<template>
  <section class="wide">
    <header class="head">
      <h1 class="page-title">Projects</h1>
      <p class="lede">
          Building anything that spikes my interest and feels good to build.
      </p>
    </header>

    <div v-if="projects.length" class="card-grid">
      <ProjectCard v-for="entry in projects" :key="entry.slug" :entry="entry" />
    </div>
    <p v-else class="meta">No projects yet.</p>
  </section>
</template>

<style scoped>
.head {
  margin-bottom: 3rem;
}
</style>
