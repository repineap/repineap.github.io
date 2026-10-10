---
title: latlngle
blurb: A daily luck game. Drop onto one random point on Earth each day, clear the fog on your globe and find out just how unlikely your landing was.
tags: [React, TypeScript, Rust, WASM, Cloudflare Workers, MapLibre]
live: https://latlngle.com
image: latlngle.png
order: 1
---

# What is it?

At work we play a set of daily games as part of our daily bonding, one of those being [globle](https://globle-game.com/).
The thing is, they all reward some kind of skill. In globle's case that means knowing roughly where countries are and
being able to estimate distance and direction. I wanted one where skill doesn't matter at all. Pure luck, and the whole
world is the board, oceans and all.

That is latlngle. Once a day (00:00 UTC for everyone) you press **Drop** and the server picks one random point on Earth
just for you. Then it tells you what you landed in, what you landed near, and how unlikely that was.

Given that about 71% of the Earth is water, most days you are landing in the ocean. Roughly 2% of drops land in Antarctica
and only about 1 in 500 lands somewhere built up. _So if you hit a city, enjoy it._

## The Game

Every landing earns a stack of badges: the country, the sea, the city, the park, a famous landmark nearby, the trench you
happen to be floating over. Underneath that you get ground badges too, things like the elevation, the tectonic plate, the
age of the rock and the climate.

The odds of a badge are just its area divided by the area of the Earth, and the points are 1 over the odds. Dead simple and
a little ridiculous. Open ocean is worth basically nothing, while landing inside Vatican City sends your score into the billions.

Around that there is a bunch of stuff to chase:
- A fog-of-war globe that starts black and reveals real satellite imagery everywhere you land
- An atlas, levels, streaks and achievements (Five Oceans, Seven Continents, and a very hidden Null Island)
- Leaderboards for the week and the year, plus a feed of the rarest drops of the day
- Land Day every Sunday, where your drop lands on dry land
- The Moon and Mars as smaller side games, with named craters and the Apollo landing sites as badges

## Architecture

### The Globe

The frontend is React and TypeScript with MapLibre rendering the globe. I went with MapLibre over globe.gl because globe.gl
can't zoom down to street level, and diving from space into your little hex is the whole point.

The fog is where it gets fun. There is no mask drawn over the map, the imagery loader _is_ the fog. Every tile gets
checked against the areas you have revealed, and tiles you haven't earned are never even fetched.

Then there is the reveal. The globe spins, the coordinates tick in, the camera dives down onto your point and the badges pop
in from commonest to rarest before the tier stamp lands. It takes about 19 seconds (you can skip it, but where is the fun in that).

### The Worker

The API is a TypeScript Cloudflare Worker. The one rule everything hangs off is that the server picks the point and the client
never can, so no peeking at tomorrow.

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
random number for the latitude.

There is one more catch. The map projection can't draw anything past about 85° north or south, so nothing up there ever rolls.
That is 0.37% of the Earth you will simply never visit.

### What does rare actually mean?

Every drop gets a tier from Trash up to Mythic, and those come from simulation. The pipeline drops 4 million random points through
the real scorer and sets the cutoffs so 25% of drops are Trash, 55% Common, and so on up to Mythic at 0.02%.

## What's Next

The plan is to keep adding things to chase: seasonal events, groups so you can have a board with your friends, and a couple more
planets. It is a luck game, so the only strategy I can offer is **show up every day**.
