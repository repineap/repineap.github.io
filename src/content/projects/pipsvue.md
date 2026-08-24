---
title: PipsVue
blurb: A browser implementation of the Pips domino puzzle + a Rust based solver.
tags: [Vue 3, TypeScript, Rust, Vite, WASM]
source: https://github.com/repineap/pipsvue
image: pipsvue.png
order: 3
---

# What is Pips?

[Pips](https://www.nytimes.com/games/pips) is a New York Times daily game built on constraints... and dominoes.
The basic idea is that you take a set of dominoes and a set of regions with certain constraints that you must fulfill.
Complexity comes in from the fact that it isn't trivial to see how to resolve these constraints (as a human). This lack
of ability on my part led to the want to create my own implementation as a way to learn Vue as well as learn Rust.

## Eventual Goals

- Fully implemented game authoring and sharing platform for Pips games
- Rust based solver that is able to run in WASM to validate human created puzzles
- Puzzle solution generator using provided puzzle layout and reverse solver to create non trivial solve
- ELO ranking system, head to head matches, puzzle ranking system

# Project Basics

- A Rust-based approach to solving the New York Times Pips game.
- The solver attaches to a Vue frontend, so people can build custom puzzles and compete.

## Memory is hard

From the internet it would look as if writing one of these solvers is trivially easy. In my experience, however,
I have found it quite challenging. A lot of this has come down to my lack of ability in Rust. You don't learn
without trying though.

### Major Changes

- Shrunk data structs from 88 bytes -> 32 bytes using `NonZeroU32` types as well as shrinking `Option<T>` types
  - Size is a multiple of the alignment which comes from the largest field
- Built move pool system instead of creating (and allocating) a new vector of moves at each step
- Use flamegraph output to see that `alloc` was the major blocker in speed
- Used benching to compare changes and see if they were making any improvement

I have found that building a solver like this is trivial in concept but quickly increases in complexity as you add
features and more complicated puzzles.

_Note: This project is currently WIP so things will be updated here as they progress_
