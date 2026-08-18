<script setup lang="ts">
import { links, site } from '../site'
</script>

<template>
  <section class="masthead measure">
    <h1 class="serif">{{ site.name }}</h1>
    <p class="tagline">{{ site.tagline }}</p>

    <hr class="rule divider" />

    <p class="intro">
        Been writing code since I can remember at this point. This website serves as my trophy case for the
        things I feel are cool enough to earn their place. Things are always in flux so I hope to have this as
        my second brain.
    </p>

    <nav class="contact meta">
      <a v-for="link in links" :key="link.label" :href="link.href" rel="me noopener">
        {{ link.label }}
      </a>
    </nav>
  </section>
</template>

<style scoped>
.masthead {
  text-align: center;
  padding-block: 3rem 2rem;
}

.masthead h1 {
  font-size: clamp(2.8rem, 9vw, 4.75rem);
  font-weight: 600;
  line-height: 1.02;
  letter-spacing: -0.03em;
  color: var(--text-bright);
}

.tagline {
  margin-top: 1.1rem;
  font-family: var(--font-serif);
  font-size: 1.2rem;
  font-style: italic;
  color: var(--text-dim);
}

.divider {
  max-width: 4rem;
  margin: 2.75rem auto;
}

.intro {
  font-size: 1.0625rem;
  line-height: 1.75;
}

.contact {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 2.5rem;
}

.contact a {
  color: var(--text-dim);
  border-bottom: 0;
}

.contact a:hover {
  color: var(--accent);
}
</style>
