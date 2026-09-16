---
title: Taat
blurb: A teaching harness to make learning the goal.
tags: [TypeScript, LLM Harness, Claude Code SDK, PI-AI, PI-UI]
source: https://github.com/repineap/taat
image: taat.svg
order: 3
---

# Get TAAT

AI is a great tool for learning but the lure of not using it for learning at all is far too strong
to actually make it teach you and guide you, at least it has been for me at times.

The use of AI has made many people, including me, less willing and honestly less able to truly
sit down and learn something new. The process of taking in information, metabolizing it, and
logging a working model of that thing in your brain has been significantly hurt by AI models.

The dopamine of having a model do everything for you, just to claim that it was largely your
brain power that led to it being completed feels great in the moment. But, the second you
look back and think how you have developed and learned it feels significantly worse.

That is **exactly** what I built taat for, well, along with wanting to learn custom harnesses.

## The Product

Take all of the powers of an agentic harness except for its ability to write code for you,
and that sounds like a perfect pair programmer. It can research, write tests against your code, generate lessons
simply by asking to learn something new (specific or conceptual). 

That is what I wanted to build with taat, it teaches you without giving you the answer. The harness has a task,
lesson, step grain that allows it to break down learning into digestible chunks.

It takes a big task like migrating off legacy code and breaks it into a set of applied steps that each come with
a very visual lesson. The harness generates a set of single page HTML lessons that you can open in your browser
and get started with right away. Along with this it generates a simple worksheet and a set of test cases to ensure that
the current step passes.

Combined, this gives the harness (and underlying model) the ability to give you lessons and teach you about your codebase by
working and verifying in it, without all the drawbacks of it handing the answers to you.

Tie this with a set of conceptual questions that cement each piece of learning without disrupting the coding learning and
I have found the tool extremely useful for learning many different domains in a very regular manner.

## The Programming

Along with wanting to learn generally, custom harnesses are all the rage so this served as a perfect opportunity to venture into that world.

The PI harness has become all the rage and for good reason, so I decided to build off of the packages that are provided by them for interacting
with models and generating a TUI.

This harness is built in a way that makes it impossible for it to write anything to a different directory than `.taat`. At times this makes it challenging
to teach, but that hard barrier that is built into the harness is what makes it safe to use for learning.

Combined with that project sandboxing it is able to handle monolith projects with various sub projects by taking in just a test command for any working directory
and applying that when you run a `/check` for the current task.

The prompts are custom built to make it a teaching agent while shipping with various personas that fit a specific use case for each individual to make it widely usable.

It has a very limited set of tools that allow it to read your code, research the web, write + run tests, and generate lessons and the infrastructure around the lessons.

It has some rough edges, but in my use it has been extremely useful in guiding me towards solutions and forcing me to internalize everything I've done through quizzes.


## What's Next

I will keep working on and using this harness as a sort of RSI with myself and the harness to make it better and better at teaching. I really just want everyone with a
model to be able to learn from their codebase without feeling left behind in the AI world.

Custom lessons will beat misaligned projects 10 times out of 10.
