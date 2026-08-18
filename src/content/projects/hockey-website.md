---
title: NHL Game Display
blurb: Daily NHL scores, an interactive play-by-play visualisation on an ice rink, expected goals, boxscores and rosters — all served by a single Cloudflare Worker.
tags: [Vue 3, TypeScript, Cloudflare Workers, D1, Keras]
live: https://hockey-website.greek-food-worker.workers.dev
source: https://github.com/repineap/hockey-website
image: hockey-website.png
order: 2
---

# The project

Currently there are many hockey stats/analysis websites out there.
- [moneypuck](https://moneypuck.com/)
- [naturalstattrick](https://www.naturalstattrick.com/)
- [hockeystats](https://hockeystats.com/)

### So why make my own?

In the era where everyone is making everything, it is fun to have the reins. There a visualization and choices that I can make
for my website allow me to serve special views. My brother and I are huge Colorado Avalanche fans so having an easy website
to see all the same information, but made by me feels awesome.

Additionally, it seemed cool to make my own expected goals model. These kinds of models are the pinnacle of what was possible
with hockey (at least a few years ago). The modern private models use far more complicated methods than I am using, but working
with what I can it is fun to see something that at least directionally makes sense.

Calculating time between shots, angle, distance, etc. are all _relatively_ easy from the data the nhl provides. I highlight relatively because
this data is very dirty. From changing schemas to misrepresented information to human error there are many glaring issues that need to be worked through.
But, that is part of the fun of developing a model around real data, working with that **data**.

## The model

- Publicly available NHL expected-goals model, built on seven advanced parameters.
- Custom heat maps designed to test the model's accuracy in real game situations.
- Algorithmically compared against real goals to evaluate performance next to privatized models.

## The site

- Documented the official NHL API from limited existing resources and testing.
- Integrated that API with the data processing needed to resolve its inconsistencies.
- The Worker proxies every request, caches responses in D1, improving efficiency
