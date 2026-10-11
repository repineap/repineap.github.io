---
title: Greek Food NYC
blurb: A collection of Greek restaurants in the New York Metro area.
tags: [Vue 3, TypeScript, Google Places API, Cloudflare Workers, D1]
live: https://greek-food.greek-food-worker.workers.dev/
source: https://github.com/repineap/greek-food
image: greek-food.png
order: 4
---

# The project

Following a trip to Greece in the summer of 2025 I have become somewhat obsessed with Greek food and for some reason
I have always found it challenging to find and track the places I have been. 
Given that, I was inspired to make something akin to Beli, but for my own use and with some of the improvements that I see fit.

## Architecture

The app is relatively simple with three layers:
- A frontend which exposes all of the data to the user in a very Greek-themed way.
  - Ability to track where I have eaten, what I have eaten, and if it was good.
  - Tools to discover new nearby locations when dinner inspiration is hard to come by.
- The backend API serves all of the data that appears on the website, largely taken from a two-phase pass over the data.
  - Google Places API data, properly filtered down to the kind of things that I wanted to see (Mediterranean/Middle Eastern/Greek) and transformed into something that was useful for display.
  - An agentic data pipeline that scrapes restaurant websites for their menus and runs data validation steps (reasonable item counts, reasonable prices, etc.).
- The D1 Cloudflare SQLite DB holds all of the data listed above and serves that data to the worker API. Given the scale and use case, this kind of simple database serves exactly the purpose that I need.

## Improvements over Beli

Beli is the major competitor in this category, but obviously it didn't serve my purposes, hence the need for the website. There are a couple
of cool features that I have shipped that I think give me a leg up, especially for how I use this kind of tool.
1. The ability to search for menu items across all restaurants. Craving a tasty plate of chicken gyro and some tzatziki? Go ahead and search and filter your heart out and you can narrow down exactly what you want.
2. Ranking (automatically) the dishes at each restaurant. The app is more focused than a general restaurant ranker. You still rate restaurants normally with stars, but if word embeddings show that a dish is similar enough to an existing "collection" of dishes, you are asked to do a ranked-choice vote to determine your favorite!
3. Stats tracking by neighborhood.
