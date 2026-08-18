<script setup lang="ts">
import { site } from '../site'
</script>

<template>
  <header class="site-header">
    <div class="inner">
      <RouterLink class="mark serif" to="/">{{ site.name }}</RouterLink>
      <nav class="nav meta">
        <RouterLink to="/about">About</RouterLink>
        <span class="dot">·</span>
        <RouterLink to="/projects">Projects</RouterLink>
        <span class="dot">·</span>
        <RouterLink to="/interests">Interests</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  border-bottom: 1px solid var(--rule);
}

.inner {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  max-width: var(--wide);
  margin-inline: auto;
  padding: 1.15rem var(--gutter);
}

.mark {
  font-size: 1.05rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--accent);
  border-bottom: 0;
}

.mark:hover {
  color: var(--text-bright);
}

.nav {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.nav a {
  color: var(--text-dim);
}

.nav a:hover,
.nav a.router-link-active {
  color: var(--text-bright);
  border-bottom-color: transparent;
}

.dot {
  color: var(--rule);
}

/* Below this the name and the nav fight for the same line; stack them. */
@media (max-width: 28rem) {
  .inner {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.6rem;
  }
}
</style>
