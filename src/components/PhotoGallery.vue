<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { gallery } from '../galleries'

// A quick slide-through of a folder of photos. The folder is the gallery:
// `folder="outdoors"` reads every image in `src/assets/galleries/outdoors/`.
const props = defineProps<{ folder: string }>()

const slides = computed(() => gallery(props.folder))
const index = ref(0)

// Swapping folders on the same rendered component must not strand the index.
watch(slides, () => {
  index.value = 0
})

function go(step: number) {
  const n = slides.value.length
  if (n) index.value = (index.value + step + n) % n
}

// A horizontal drag is a slide change; a vertical one is the page scrolling.
const dragFrom = ref<number | null>(null)

function onPointerDown(event: PointerEvent) {
  dragFrom.value = event.clientX
}

function onPointerUp(event: PointerEvent) {
  const from = dragFrom.value
  dragFrom.value = null
  if (from === null) return
  const dx = event.clientX - from
  if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1)
}
</script>

<template>
  <figure v-if="slides.length" class="gallery">
    <div
      class="frame"
      tabindex="0"
      role="group"
      :aria-label="`${folder} photos`"
      @keydown.left.prevent="go(-1)"
      @keydown.right.prevent="go(1)"
      @pointerdown="onPointerDown"
      @pointerup="onPointerUp"
      @pointercancel="dragFrom = null"
    >
      <img
        v-for="(slide, i) in slides"
        :key="slide.id"
        class="shot"
        :class="{ on: i === index }"
        :src="slide.src"
        :alt="slide.alt"
        :aria-hidden="i === index ? undefined : 'true'"
        :loading="i === 0 ? 'eager' : 'lazy'"
        draggable="false"
      />

      <template v-if="slides.length > 1">
        <button class="nav prev" type="button" aria-label="Previous photo" @click="go(-1)">
          ‹
        </button>
        <button class="nav next" type="button" aria-label="Next photo" @click="go(1)">›</button>
      </template>
    </div>

    <figcaption v-if="slides.length > 1" class="bar meta">
      <span aria-live="polite">{{ index + 1 }} / {{ slides.length }}</span>
      <ol class="dots">
        <li v-for="(slide, i) in slides" :key="slide.id">
          <button
            type="button"
            :class="{ on: i === index }"
            :aria-label="`Photo ${i + 1}`"
            :aria-current="i === index ? 'true' : undefined"
            @click="index = i"
          />
        </li>
      </ol>
    </figcaption>
  </figure>

  <p v-else class="todo">TODO: add photos to src/assets/galleries/{{ folder }}/</p>
</template>

<style scoped>
/* The frame is fixed at 16:9 so the page never jumps between slides. Photos
   are letterboxed rather than cropped: a portrait shot survives intact. */
.frame {
  position: relative;
  aspect-ratio: 16 / 9;
  background: var(--surface);
  border: 1px solid var(--rule);
  overflow: hidden;
  touch-action: pan-y;
}

.frame:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.shot {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: 0;
  transition: opacity 0.35s ease;
  user-select: none;
  -webkit-user-drag: none;
}

.shot.on {
  opacity: 1;
}

.nav {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 3.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 0;
  cursor: pointer;
  font-size: 1.9rem;
  line-height: 1;
  color: var(--text-bright);
  background: linear-gradient(to right, rgba(28, 30, 33, 0.55), transparent);
  opacity: 0.65;
  transition:
    opacity 0.15s ease,
    color 0.15s ease;
}

.nav.prev {
  left: 0;
}

.nav.next {
  right: 0;
  background: linear-gradient(to left, rgba(28, 30, 33, 0.55), transparent);
}

.nav:hover,
.nav:focus-visible {
  opacity: 1;
  color: var(--accent);
}

.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 0.7rem;
}

.bar .dots {
  display: flex;
  gap: 0.45rem;
  padding-left: 0;
  list-style: none;
}

.bar .dots li {
  margin-top: 0;
}

/* Square ticks, not pills — the site rounds nothing. */
.dots button {
  display: block;
  width: 1.1rem;
  height: 3px;
  padding: 0;
  border: 0;
  cursor: pointer;
  background: var(--rule);
  transition: background-color 0.15s ease;
}

.dots button:hover,
.dots button.on {
  background: var(--accent);
}

@media (prefers-reduced-motion: reduce) {
  .shot,
  .nav,
  .dots button {
    transition: none;
  }
}
</style>
