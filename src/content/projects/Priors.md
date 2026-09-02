---
title: Priors
blurb: A weekly blog covering little factoids, priors (ha), and anything that I find interesting.
tags: [Vue 3, TypeScript, Vite, ECharts, Data Science, Data Analysis]
source: https://github.com/repineap/priors
live: https://repineap.github.io/priors/
image: priors.png
order: 1
---

I recently read _The Signal and the Noise_ by Nate Silver and ran across
someone online saying that you should know a set of basic facts to orient
the world around you. The name priors comes from the idea of bayesian priors
that help make predictions better.

The biggest one that has stuck with me and really inspired this project is that
the circumference of the earth is **~25,000 miles**. I don't know why this really
stuck with me, but it does help estimate distances, compare sizes of countries,
and much more.

That is really what I wanted to capture with this website, the joy of childhood
and learning captured through a few small facts and base rate takeaways.

# Design

To make this easy the system is built on increasingly specific pieces of
"priors" infrastructure.
- **Categories** hold sets of facts
- **Facts** serve as the building blocks of the blogs
- **Posts** store the context and reasons why someone should care about a fact
- **Base Rates** store dervied, fact based values that help contextualize the world
- **Compendium** serves the collection of facts that have been used in posts

## Categories and Facts

Categories and facts are stored in `ts` to make them easier to access in the future and
work as tileable building blocks that may be used in any number of posts, althrough I intend
to use facts typically only once.

## Posts

These are created as single markdown files to make it easy for me to generate and write new posts
on a weekly cadence.
