<script setup lang="ts">
import { site } from '../site'
</script>

<template>
  <header class="site-header">
    <div class="inner">
      <RouterLink class="mark serif" to="/">{{ site.name }}</RouterLink>
      <nav class="nav meta">
        <RouterLink to="/about">About</RouterLink>
        <span class="sep">|</span>
        <RouterLink to="/interests">Interests</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
/* The heavy rule under the header is the one loud line on the page. */
.site-header {
  border-bottom: 2px solid var(--ink);
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
  text-decoration: none;
}

.mark:hover {
  text-decoration: underline;
  text-decoration-thickness: 1px;
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
  color: var(--ink);
}

.sep {
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
