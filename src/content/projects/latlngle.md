---
title: latlngle
blurb: A daily luck game. Drop onto one random point on Earth.
tags: [React, TypeScript, Rust, WASM, Cloudflare Workers, R2]
live: https://latlngle.com
image: latlngle.png
order: 1
---

# What is it?

At work we play a set of daily games as part of our daily standup, one of those being [globle](https://globle-game.com/).
These games are all fun, but they don't give me enough dopamine, so I wanted to make something that scratches
that itch.

That is latlngle. Once a day (00:00 UTC for everyone) you press **Drop** and the server picks one random point on Earth.
Then you wait and see if you somehow hit the Eiffel Tower.

Given that about 71% of the Earth is water, most days you are landing in the ocean, but the days you hit land
are quite the emotional high.

## The Game

Every landing earns a stack of badges: the country, the sea, the city, the park, a famous landmark nearby, the trench you
happen to be floating over. Underneath that you get ground badges too, things like the elevation, the tectonic plate, the
age of the rock and the climate.

The odds of a badge are just its area divided by the area of the Earth, and the points are 1 over the odds.

Around that there is a bunch of stuff to chase:
- A fog-of-war globe that starts black and reveals real satellite imagery everywhere you land
- An atlas, levels, streaks and achievements (Five Oceans, Seven Continents, and a very hidden Null Island)
- Leaderboards for the week and the year, plus a feed of the rarest drops of the day
- Land Day every Sunday, where your drop lands on dry land
- The Moon and Mars as smaller side games, with named craters and the Apollo landing sites as badges

## Architecture

### The Globe

The frontend is React and TypeScript with MapLibre rendering the globe.

The reveal is designed to hit that sweet spot between being fast enough to not lose attention and slow enough
to really add suspense. The flashing lights, the spinning globe, the ticking scores and the popping
achievements combine to give a real sense of joy when you hit something good.

### The Worker

The API is a TypeScript Cloudflare Worker.

Every player (guests included) gets their own Durable Object with its own SQLite database for their drops, achievements and atlas.
The one-drop-per-day rule is just a unique constraint inside that object. D1 holds accounts and a slim index of drops, which is
what the leaderboards read, so no board ever has to dig through anyone's history.

### The Rust Core

All of the actual scoring lives in one Rust crate that compiles to Wasm for the Worker and to native code for the data pipeline.
That means the exact same code scores your drop and the millions of simulated drops that decide what "rare" means, so the two
can never drift apart.

The world itself is cut into H3 hexagons and stored as shards in R2. A drop fetches one object per data layer for its cell and
hands the whole thing to Wasm in a single call.

## Fun Problems

### Random is harder than it sounds

If you pick a random latitude and a random longitude you get way too many points near the poles, because the lines of longitude
bunch up there. To be fair to every square meter you have to sample by area instead, which comes out to taking the arcsine of a
random number for the latitude. (Archimedes' Hat-Box Theorem, I guess. Ctrl+C, Ctrl+V served me well here.)

There is one more catch. The map projection can't draw anything past about 85 degrees north or south, so nothing up there ever rolls.
That is 0.37% of the Earth no one will ever visit.

### What does rare actually mean?

Every drop gets a tier from Trash up to Mythic, and those come from simulation. The pipeline drops 4 million random points through
the real scorer and sets the cutoffs so 25% of drops are Trash, 55% Common, and so on up to Mythic at 0.02%.

## What's Next

The plan is to keep adding things to chase: seasonal events, groups so you can have a board with your friends, and a couple more
planets.

Most important, though, is getting people to play the game. I am currently working out a marketing strategy across several
social media platforms, with some moderate success already.
