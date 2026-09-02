---
title: Greek Food NYC
blurb: A collection of greek restaurants in Manhattan and the surrounding area with tracking and menus.
tags: [Vue 3, TypeScript, Google Places API, Cloudflare Workers, D1]
live: https://greek-food.greek-food-worker.workers.dev/
source: https://github.com/repineap/greek-food
image: greek-food.png
order: 2
---

# The project

Following a trip to Greece in the summer of 2025 I have become somewhat obsessed with greek food and for some reason
I have always found it challenging to find and track the places I have been. Given that, I was inspired to make something
akin to Beli, but for my own use and with some of the improvements that I see fit.

## Architecture

The app is relatively simple with three layers:
- The frontend webpage which exposes all of the data to the user in a very greek themed way. I'm a big stats person so I wanted to have the ability to keep track
of where I have eaten, and what percent that represents of the total amount. Similarly I wanted to use the tool as a discover lever for when me or me and my girlfriend
do not know where to eat, making it easy to find nearby or any kind of restaurant the fits in the vaguely mediterranean genre. Complete with (very simple) accounts
the app serves every purpose that I need with menu search and menu item ranking
- The backend API serves all of the data the appears on the website, largely taken from a two phase pass over the data I could find. The first pass was taking the google places API
data and properly filtering it down to the kind of things that I wanted to see (mediterranean/middle eastern/greek) and transforming it into something that was useful for display
and tracking. The second pass was building an agentic data pipeline that involved scraping restaurant websites for their menu, data validation steps (reasonable item counts, reasonable prices,
etc.), and then finally transformation into a form that is trackable and easy to serve to a web page.
- The D1 Cloudflare sqlite DB holds all of the data listed above and serves that data to the worker API. Given the scale and use case, this kind of simple database serves exactly the purpose that I need
but given enough demand I would upgrade to something like a postgres.

## Improvements over Beli

Beli is the major competitor in this category, but obviously it didn't serve my purposes, hence the need for the website. There are a couple
of cool features that I have shipped that I think give me a leg up, especially for how I use this kind of tool.
1. The ability to search for menu items across all restaurants. Craving a tasty plate of chicken gyro and some tzatziki, go ahead and search and
filter your heart out and you can narrow down exactly what you want.
2. The ability to rank (automatically) the dishes at each different restaurants. Being a more focused app rather than generally ranking restaurants,
you rate them normally with stars, but if a dish is seen to be similar enough to another "collection" using word embeddings you are asked to do
a rank choice voting to determine your favorite horiatiki.
3. Stats tracking by neighborhood. This also comes from the fact that the app is serving a smaller niche, but the fact that I am able to see progress bars for each of the 
neighborhoods and boroughs brings me enormous joy.
