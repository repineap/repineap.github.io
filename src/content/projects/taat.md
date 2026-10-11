---
title: Taat
blurb: A teaching harness to make learning the goal.
tags: [TypeScript, LLM Harness, Claude Code SDK, PI-AI, PI-UI]
source: https://github.com/repineap/taat
image: taat.svg
order: 5
---

# Get Taat

AI is a great tool for learning but the lure of not using it for learning at all is far too strong
to actually make it teach you and guide you, at least it has been for me at times.

The use of AI has made many people, including me, less willing and honestly less able to truly
sit down and learn something new. The process of taking in information, metabolizing it, and
logging a working model of that thing in your brain has been significantly hurt by AI models.

The dopamine of having a model do everything for you, just to claim that it was largely your
brain power that led to it being completed feels great in the moment. But, the second you
look back and think how you have developed and learned it feels significantly worse.

That is **exactly** what I built Taat for... along with wanting to learn custom harnesses.

## The Product

Take all of the powers of an agentic harness except for its ability to write code for you,
and that sounds like a perfect pair programmer. It can research, write tests against your code, generate lessons
simply by asking to learn something new (specific or conceptual). 

That is what I wanted to build with Taat: it teaches you without giving you the answer.

It takes a big task like migrating off legacy code and breaks it into a set of applied steps that each come with
a very visual lesson. The harness generates a set of single page HTML lessons that you can open in your browser
and get started with right away.

Combined, this gives the harness (and underlying model) the ability to give you lessons and teach you about your codebase by
working and verifying in it, without all the mental drawbacks of it handing the answers to you.

## The Programming

Along with wanting to learn generally, custom harnesses are everywhere right now so this served as a perfect opportunity to venture into that world.

The PI harness has become all the rage and for good reason, so I decided to build off of the packages that are provided by them for interacting
with models and generating a TUI.

This harness is built in a way that makes it impossible for it to write anything to a different directory than `.taat`. At times this makes it challenging
to teach, but that hard barrier that is built into the harness is what makes it safe to use for learning.

It has some rough edges, but in my use it has been extremely useful in guiding me towards solutions and forcing me to internalize everything I've done.

## What's Next

I will keep working on and using this harness as a sort of RSI with myself and the harness to make it better and better at teaching. I really just want everyone with a
model to be able to learn from their codebase without feeling left behind in the AI world.
