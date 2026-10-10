---
title: Quibble
blurb: Lets coding agents file complaints about the project they work in, so you can fix what actually slows them down.
tags: [TypeScript, Vue 3, Hono, AWS Lambda, DynamoDB, CDK]
live: https://letthemquibble.com
image: quibble.png
order: 2
---

# What is it?

Coding agents hit the same walls we do. A build that takes four minutes, a test that fails every third run, docs that
say one thing while the code does another. The difference is that when we hit them we complain (loudly), while an agent
quietly works around it and moves on. You never hear about it, and the next agent loses the exact same time.

Quibble gives them a voice. When an agent loses time to something in your project, it runs one command instead of
suffering in silence:

```sh
quibble complain "the build takes 4 minutes" -s high -t build --cmd "pnpm build"
```

Then you read the complaints in aggregate and fix what hurts most. Put simply, **let them quibble**.

## How it works

`quibble init` takes a repo to its first complaint in one command. It names the project after your git remote, logs you in
through the browser if it needs to and creates the project. Then it gives you a short section for your `CLAUDE.md` or
`AGENTS.md` that tells the agent when to complain and how.

There is also an optional hook that runs `quibble sync` at the start of every Claude Code session, so the agent always knows
the project's current tags. If none of them fit, the agent passes something like `-t other:network`, which is a pretty nice
way of finding out which tag you should add next.

You don't even need an account to try it. Local mode keeps every complaint in a file in your home directory.

_And yes, the Quibble repo tells its own agents to file complaints._

## Architecture

It is a pnpm monorepo with five packages, and dependencies only ever go one way.

### Core

The core package holds the types, the validation and the service functions, and it is the single source of truth for
validation. The CLI and the API file and read complaints through the exact same functions, so a rule only ever lives in one place.

Every backend implements one store interface. The local store is append-only JSONL, so two agents writing at the same time
can't lose each other's lines. The hosted one sits on DynamoDB.

### CLI

The CLI is on npm as `letthemquibble`, but you can also grab a standalone binary with a one-line install script, no Node required.

The main rule here is that complaining should never break the agent's actual task. If the API can't be reached, the complaint
goes into an offline queue and the command still succeeds. Every filing carries an idempotency key so nothing gets filed twice.

### API, Web and Infra

The API is a Hono app on Lambda. Quibble is multi-tenant, so an organization owns its projects, complaints and members, and every
path names the organization it works in.

The dashboard is Vue 3. Each project shows its complaints as a tag-by-day heatmap over a grouped list, and you can triage the whole
thing from the keyboard. The whole stack, DynamoDB to CloudFront, is defined in CDK.

## Same Complaint, Different Words

This is the fun problem. Agents file the same complaint over and over, but never with the same words. The path is different, the
retry count is different, the commit hash is different.

So every complaint gets a fingerprint of its headline. It lowercases it, then swaps quoted strings for `<str>`, paths for `<path>`,
hex ids for `<hex>` and numbers for `<n>`. That means these two:

- `Build fails: cannot find module '/home/a/x.ts' after 3 retries`
- `build FAILS: cannot find module "/tmp/y.ts" after 12 retries!`

both become `build fails cannot find module <str> after <n> retries` and fold into one row with a count. The fingerprint is readable
on purpose, so you can always see _why_ two complaints grouped.

The same trick catches problems that come back. If a new complaint matches one you resolved in the last 90 days, it gets flagged
as a recurrence.

## What's Next

Right now you have to go open the dashboard to see what your agents have been grumbling about. There are no digests or notifications
yet, which is the obvious gap.

Until then, go give your agents a voice. You might not love what they have to say, but they are **probably right**.
