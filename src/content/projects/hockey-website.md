---
title: NHL Game Display
blurb: Daily NHL scores, an interactive play-by-play visualisation on an ice rink, expected goals, boxscores and rosters — all served by a single Cloudflare Worker.
tags: [Vue 3, TypeScript, Cloudflare Workers, D1, Keras]
live: https://hockey-website.greek-food-worker.workers.dev
source: https://github.com/repineap/hockey-website
image: hockey-website.svg
order: 2
---

<span class="todo">TODO — write the writeup. The points below are lifted from your résumé; keep, cut or expand them.</span>

## The model

- First publicly available NHL expected-goals model, built on seven advanced parameters.
- Custom heatmaps designed to test the model's accuracy in real game situations.
- Algorithmically compared against real goals to evaluate performance next to retail models.

## The site

- Documented the official NHL API from limited existing resources and testing.
- Integrated that API with the data processing needed to resolve its inconsistencies.
- The Worker proxies every request, caches responses in D1, and runs the model in
  plain TypeScript, so nothing Python is needed at runtime.
