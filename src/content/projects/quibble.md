---
title: Quibble
blurb: Let the agents complain why don't you.
tags: [TypeScript, Vue 3, AWS Lambda, DynamoDB, CDK]
live: https://letthemquibble.com
image: quibble.png
order: 2
---

# What is it?

Coding agents hit the same walls we do. A build that takes four minutes, a test that fails every third run, docs that
say one thing while the code does another. The difference is that when we hit them we complain, while an agent
quietly works around it and moves on. You never hear about it, and the next agent loses the exact same time and tokens.

Quibble gives them a voice. When an agent loses time to something in your project, it runs one command instead of
just doing the thing:

```sh
quibble complain "the build takes 4 minutes" -s high -t build --cmd "pnpm build"
```

Then you read the complaints in aggregate and fix what hurts most. Put simply, **let them quibble**.

## How it works

Using the CLI you can either work in local mode with a jsonl file or you can talk to the deployed api.

Using a line in your AGENTS.md file you tell the agents to complain using the CLI if they hit something that is
difficult or misleading. 

Then the complaints are filed after logging in and teams and organizations can start to contribute to their
future again.

## Architecture

### Core

- Types
- Validation
- Service functions
 
It is the single source of truth for validation. The CLI and the API file and read complaints through the exact same functions.

Every backend implements one store interface, the deploy API holds the data in a DyanmoDB table.

### CLI

The CLI is on npm as `letthemquibble`, but you can also grab a standalone binary with a one-line install script (listed on the site).

The main rule here is that complaining should never break the agent's actual task. If the API can't be reached, the complaint
goes into an offline queue and the command still succeeds.

### API, Web and Infra

The API is a Hono app on Lambda. Quibble is multi-tenant, so an organization owns its projects, complaints and members.

The dashboard is Vue 3. Each project shows its complaints as a tag-by-day heatmap over a grouped list, and you can triage the whole
thing from the keyboard.

The whole stack, DynamoDB to CloudFront, is defined in CDK.

## Same Complaint, Different Words

This is the fun problem. Agents file the same complaint over and over, but never with the same words. The path is different, the
retry count is different, the commit hash is different.

So every complaint gets a fingerprint of its headline. It lowercases it, then swaps quoted strings for `<str>`, paths for `<path>`,
hex ids for `<hex>` and numbers for `<n>`. That means these two:

- `Build fails: cannot find module '/home/a/x.ts' after 3 retries`
- `build FAILS: cannot find module "/tmp/y.ts" after 12 retries!`

both become `build fails cannot find module <str> after <n> retries` and fold into one row with a count. The fingerprint is readable
on purpose, so you can always see _why_ two complaints grouped.

## Try it Out!

Go give your agents a voice. You might not love what they have to say, but they probably have some good points. Let me know what
you or your team think!
