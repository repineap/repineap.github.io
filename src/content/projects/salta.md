---
title: Salta
blurb: An atlas of webpages downloaded in simple markdown.
tags: [Rust, Tauri, TypeScript, WASM, Web Extension]
source: https://github.com/repineap/salta
image: salta.png
order: 6
---

# What is it?

In the AI era, it feels even more important to force yourself to read the sources (or at least have an agent read real sources).

That is exactly what I am building Salta for. It is meant to be your atlas (salta <=> atlas)
of all of your sources so that you can easily synthesize information together.

It is also meant to transform the way that you interact with agents and the internet. A lot
of the harnesses have a way to access the HTML of a web page, but spend a lot of time pulling
out facts and information which you typically have to go check yourself on the website after
it gives a link.

Salta changes that: you save a website, it passes through the parsing pipeline
and you have a clean markdown file that you can cite to each other or easily search.

## Architecture

### Tauri App

The actual app interface is powered by Tauri, a more modern Rust-based native application system (like an Electron).
Built out of a simple TypeScript frontend and an extensive Rust backend, it is a very quick application
that also manages to be quite easy to develop.

### Web Extension

The Tauri app itself is designed in a way where it does not actually talk to or scrape websites itself,
but instead you are able to ship whatever page you are currently looking at to the parsing pipeline through
the Salta web extension.

`Ctrl+Shift+S` ships the currently visible page to the app for parsing and categorization, something that
is extremely quick and straightforward.

I chose this approach because it allows the user to take web pages that require credentials or human interaction
to reach and easily scrape those down.

This requires a bit more work but provides so nice benefits of getting to chose exactly the page and content that is scraped.

### WASM Plugin System

I will talk more about the parsing pipeline below, but one of the coolest features I have shipped with Salta is the ability
to add custom Rust -> WASM plugins for parsing specific URLs.

This idea came to me when thinking of how the app should function on something like YouTube. Should it just parse
what the user sees: comments, recommended video titles, description, and other bloated stuff... or should it show you
the video, description, creator, and transcript in one clean format.

The second felt quite a bit more appealing to me, but didn't make much sense to bake into the basic pipeline. So,
as the direction of many tools is going towards the plugin approach I decided to do a similar thing for Salta.
You are able to add any kind of plugin to the app plugins folder which registers with the app for specific URLs.
This kind of extensibility makes it easy to adapt to different people's workflows and specific use cases which all
parse down to the same markdown that can easily be shared between team members and to agents.

## The Parsing Pipeline

Raw HTML in -> HTML parser scrapes what we want (custom or native basic scraper)
-> Parsed content run against a word embedding model to categorize it ->
If nothing matches, lands in the inbox for categorization.

When a new document arrives a local embedding model scans it and tries to classify it into one of your predefined categories
based on certain keywords associated with that category.

## What's Next

I want to use this tool to build a local vector database to power simple RAG on your atlas
likely powered through an MCP or some kind of CLI.
