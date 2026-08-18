<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

// The single hook for the page background. It is a static amber wash — no
// animation, no interactivity — and sits behind everything.
const route = useRoute()
const isHome = computed(() => route.name === 'home')
</script>

<template>
  <div class="site-background" :class="{ home: isHome }" aria-hidden="true">
    <div class="bloom" />
  </div>
</template>

<style scoped>
.site-background {
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background: var(--bg);
}

/*
 * A soft amber bloom behind the masthead, fading to flat charcoal well before
 * the fold. Strong enough to give the home page depth, faint elsewhere so it
 * never competes with content.
 */
.bloom {
  position: absolute;
  inset: 0;
  opacity: 0.3;
  background:
    radial-gradient(80rem 38rem at 50% -12rem, rgba(240, 168, 60, 0.26), transparent 68%),
    radial-gradient(46rem 24rem at 18% -4rem, rgba(185, 116, 29, 0.16), transparent 72%),
    radial-gradient(52rem 28rem at 84% 2rem, rgba(240, 168, 60, 0.07), transparent 70%);
}

.site-background.home .bloom {
  opacity: 1;
}
</style>
