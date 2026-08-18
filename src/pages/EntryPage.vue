<script setup lang="ts">
import { computed, defineAsyncComponent, type Component } from 'vue'
import { useRoute } from 'vue-router'
import { adjacent, bodyLoader, entryBySlug, type CollectionName } from '../content'

// Projects and interests render the same detail page. Interests simply carry
// no tags and no links, so those blocks drop out on their own.
const props = defineProps<{ collection: CollectionName }>()

const route = useRoute()
const slug = computed(() => String(route.params.slug))
const entry = computed(() => entryBySlug(props.collection, slug.value))
const links = computed(() => adjacent(props.collection, slug.value))
const backTo = computed(() => `/${props.collection}`)
const backLabel = computed(() => (props.collection === 'projects' ? 'Projects' : 'Interests'))

const body = computed<Component | null>(() => {
  const loader = bodyLoader(props.collection, slug.value)
  return loader ? defineAsyncComponent(loader) : null
})
</script>

<template>
  <article v-if="entry" class="entry">
    <header class="head wide">
      <RouterLink class="back meta" :to="backTo">← {{ backLabel }}</RouterLink>
      <h1 class="serif">{{ entry.title }}</h1>
      <p v-if="entry.blurb" class="lede">{{ entry.blurb }}</p>

      <ul v-if="entry.tags.length" class="tags">
        <li v-for="tag in entry.tags" :key="tag">{{ tag }}</li>
      </ul>

      <div v-if="entry.live || entry.source" class="actions meta">
        <a v-if="entry.live" :href="entry.live" target="_blank" rel="noopener">Live site ↗</a>
        <a v-if="entry.source" :href="entry.source" target="_blank" rel="noopener">Source ↗</a>
      </div>
    </header>

    <figure class="hero wide">
      <img :src="entry.image" :alt="entry.title" />
    </figure>

    <div class="body wide">
      <component :is="body" v-if="body" :key="slug" />
    </div>

    <nav v-if="links.prev || links.next" class="pager wide">
      <RouterLink v-if="links.prev" class="link prev" :to="`${backTo}/${links.prev.slug}`">
        <span class="arrow">←</span>
        <span class="stack">
          <span class="meta">Previous</span>
          <span class="name">{{ links.prev.title }}</span>
        </span>
      </RouterLink>
      <span v-else />
      <RouterLink v-if="links.next" class="link next" :to="`${backTo}/${links.next.slug}`">
        <span class="stack">
          <span class="meta">Next</span>
          <span class="name">{{ links.next.title }}</span>
        </span>
        <span class="arrow">→</span>
      </RouterLink>
    </nav>
  </article>
</template>

<style scoped>
.head {
  padding-bottom: 2rem;
}

.back {
  display: inline-block;
  color: var(--text-dim);
  border-bottom: 0;
}

.back:hover {
  color: var(--accent);
}

.head h1 {
  margin-top: 0.8rem;
  font-size: clamp(2.1rem, 6vw, 3rem);
  font-weight: 600;
  line-height: 1.08;
  letter-spacing: -0.025em;
  color: var(--text-bright);
}

.head .tags {
  margin-top: 1.4rem;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  margin-top: 1.2rem;
}

.actions a {
  color: var(--accent);
}

.hero {
  margin-bottom: 3rem;
}

.hero img {
  width: 100%;
  border-radius: 6px;
  border: 1px solid var(--rule);
}

.pager {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid var(--rule);
}

.link {
  display: flex;
  gap: 0.7rem;
  align-items: baseline;
  color: var(--text-bright);
  border-bottom: 0;
}

.link.next {
  justify-content: flex-end;
  text-align: right;
}

.stack {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.arrow {
  color: var(--accent);
}

.name {
  font-family: var(--font-serif);
  font-size: 1.1rem;
  line-height: 1.3;
}

.link:hover .name {
  color: var(--accent);
}

.body :deep(.prose) {
  max-width: var(--measure);
}

.body :deep(.prose > *:first-child) {
  margin-top: 0;
}
</style>
