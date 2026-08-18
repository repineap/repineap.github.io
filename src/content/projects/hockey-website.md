---
title: NHL Game Display
blurb: Daily NHL scores, an interactive play-by-play visualisation on an ice rink, expected goals, boxscores and rosters — all served by a single Cloudflare Worker.
tags: [Vue 3, TypeScript, Cloudflare Workers, D1, Keras]
live: https://hockey-website.greek-food-worker.workers.dev
source: https://github.com/repineap/hockey-website
image: hockey-website.svg
order: 2
---

<span class="todo">TODO — replace this body with the real writeup.</span>

The NHL API sends no CORS headers, so every request goes through a Worker that
proxies it, caches responses in D1, and runs a 9,859-parameter expected-goals
model in plain TypeScript — small enough that no Python is needed at runtime.
Finished games are archived as scored shots, so the analysis dataset grows as
the site is used.

## What to cover here

- Why the model was ported to TypeScript instead of served from Python.
- What the D1 cache buys, and what it costs.
