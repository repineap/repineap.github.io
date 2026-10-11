<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

// A card image as an Atkinson dither: ink pixels on paper. Error diffusion
// needs the pixels, so the image is drawn on a canvas. One canvas pixel is one
// CSS pixel, and the canvas fills its parent.
const props = defineProps<{ src: string; alt: string }>()

const canvas = ref<HTMLCanvasElement | null>(null)
let image: HTMLImageElement | null = null
let observer: ResizeObserver | null = null

// Atkinson passes on 6/8 of the error: [dx, dy] of each pixel that gets 1/8.
const neighbours = [
  [1, 0],
  [2, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [0, 2],
] as const

// The canvas turns any CSS colour into #rrggbb, so a token can use any format.
function token(ctx: CanvasRenderingContext2D, name: string): [number, number, number] {
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  const hex = ctx.fillStyle
  return [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)) as [number, number, number]
}

function draw() {
  const el = canvas.value
  if (!el || !image) return
  const w = Math.round(el.clientWidth)
  const h = Math.round(el.clientHeight)
  if (!w || !h) return

  el.width = w
  el.height = h
  const ctx = el.getContext('2d', { willReadFrequently: true })
  if (!ctx) return

  const ink = token(ctx, '--ink')
  const paper = token(ctx, '--paper')

  // Same crop as object-fit: cover, on a white ground for transparent images.
  const iw = image.naturalWidth || w
  const ih = image.naturalHeight || h
  const scale = Math.max(w / iw, h / ih)
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, w, h)
  ctx.drawImage(image, (w - iw * scale) / 2, (h - ih * scale) / 2, iw * scale, ih * scale)

  const pixels = ctx.getImageData(0, 0, w, h)
  const data = pixels.data
  const grey = new Float32Array(w * h)
  for (let i = 0; i < grey.length; i++) {
    grey[i] = 0.2126 * data[i * 4] + 0.7152 * data[i * 4 + 1] + 0.0722 * data[i * 4 + 2]
  }

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = y * w + x
      const lit = grey[i] >= 128
      const share = (grey[i] - (lit ? 255 : 0)) / 8
      for (const [dx, dy] of neighbours) {
        const nx = x + dx
        const ny = y + dy
        if (nx >= 0 && nx < w && ny < h) grey[ny * w + nx] += share
      }
      const colour = lit ? paper : ink
      data[i * 4] = colour[0]
      data[i * 4 + 1] = colour[1]
      data[i * 4 + 2] = colour[2]
      data[i * 4 + 3] = 255
    }
  }
  ctx.putImageData(pixels, 0, 0)
}

async function load() {
  const next = new Image()
  next.src = props.src
  try {
    await next.decode()
  } catch {
    return
  }
  image = next
  draw()
}

onMounted(() => {
  if (canvas.value) {
    // A new card width needs a new dither, or the pixels blur.
    observer = new ResizeObserver(draw)
    observer.observe(canvas.value)
  }
  load()
})

onBeforeUnmount(() => observer?.disconnect())

watch(() => props.src, load)
</script>

<template>
  <canvas ref="canvas" class="pixels" role="img" :aria-label="alt" />
</template>

<style scoped>
.pixels {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  image-rendering: pixelated;
}
</style>
