<script setup lang="ts">
import SiteBackground from './components/SiteBackground.vue'
import SiteHeader from './components/SiteHeader.vue'
import { links, site } from './site'

const year = new Date().getFullYear()
</script>

<template>
  <SiteBackground />
  <SiteHeader />
  <main class="main">
    <RouterView />
  </main>
  <footer class="site-footer">
    <div class="inner meta">
      <span>© {{ year }} {{ site.name }}</span>
      <nav class="links">
        <a v-for="link in links" :key="link.label" :href="link.href" rel="me noopener">
          {{ link.label }}
        </a>
      </nav>
    </div>
  </footer>
</template>

<style scoped>
.main {
  min-height: 70vh;
  padding-block: 3.5rem 5rem;
}

.site-footer {
  border-top: 1px solid var(--rule);
}

.inner {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.5rem 1rem;
  max-width: var(--wide);
  margin-inline: auto;
  padding: 1.6rem var(--gutter);
}

.links {
  display: flex;
  gap: 1.1rem;
}

.links a {
  color: var(--text-dim);
  border-bottom: 0;
}

.links a:hover {
  color: var(--accent);
}
</style>
