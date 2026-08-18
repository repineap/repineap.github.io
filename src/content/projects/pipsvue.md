---
title: PipsVue
blurb: A browser implementation of the Pips domino puzzle, alongside a Rust crate that solves the same puzzles.
tags: [Vue 3, TypeScript, Rust, Vite]
source: https://github.com/repineap/pipsvue
image: pipsvue.svg
order: 3
---

<span class="todo">TODO — replace this body with the real writeup.</span>

Dominoes are dragged onto a board split into constrained regions — sums,
inequalities, all-same, all-distinct — and the regions revalidate on every drop.
The `pips_rust` crate solves the same puzzles, which makes the solver a check on
the game rules rather than a separate project.

## What to cover here

- The constraint model, and how validation stays cheap on every drag.
- What writing the solver twice, in two languages, taught you.
