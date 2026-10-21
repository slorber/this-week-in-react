---
name: twir-editorial-line
description: The editorial line of This Week In React (TWIR) - who it's for, what each section covers, what to prefer and what to filter out, how much space an item deserves, item ordering and the email link budget. Use whenever you select, triage, rank, trim or review links or sections for a TWIR issue, or decide whether an item belongs in the newsletter.
---

# TWIR editorial line

Sources, from most to least authoritative:

- **Rules** come from the editor (Sébastien): his public guide for guest curators, [`website/src/pages/curator.mdx`](../../../website/src/pages/curator.mdx) (thisweekinreact.com/curator), and instructions he gave while working on issues (marked with the issue number).
- **Observed patterns** were measured on issues #290–#302. They are defaults, not laws.

When you are unsure whether an item fits, flag it and explain why. Don't silently drop it, and don't silently write it up.

## The promise to readers

TWIR is a weekly curation newsletter for **mid/senior React and React Native developers**, but not limited to React links. The curator guide sets the goal: be the **pulse of the ecosystem**, not a discovery tool for every React npm package.

The ecosystem is thriving, so an issue contains a lot of links. Instead of filtering more aggressively, TWIR optimizes the reading experience despite that density:

- Consistent and easy to scan.
- Information "inlined" whenever possible: **reading the newsletter should provide value without clicking a single link.**
- Never bait someone into clicking a link and then disappoint them.

This only works if someone actually read every link, and if each line says accurately what's new and why it matters.

## Sections and their scope

| Section | Scope | Typical size (#290–#302) |
| --- | --- | --- |
| Intro | A short recap of the week's news | 2–4 short paragraphs |
| 💸 Sponsor (×2) | Sold placements | 1 block each |
| ⚛️ React | Content relevant to all React devs, and to React web devs | 0–2 headlines, 13–28 list items |
| 📱 React-Native | Content relevant to React Native devs | 0–2 headlines, 20–32 list items |
| 🔀 Other | Content for a broader JS audience: TS, CSS, TC39, HTML, tooling… | 8–10 list items, rarely a headline |
| 🤭 Fun | 1–3 memes or fun screenshots, preferably React-related and about this week's news | 1–2 images |

List item counts include the 💸 sponsored links.

### ⚛️ React

React core (releases, docs, RFCs, PRs, security advisories, React Foundation news), React frameworks (Next.js, React Router, TanStack Start, Vinext…), libraries built for React, and articles about building with React.

**Rule (#302): only actual React content qualifies.** Work that only borrows React ideas doesn't. The editor cut a "How ChatGPT Intelligent UI works" teardown: it describes a React-style reconciler, but it isn't React. He also cut OpenUI twice on #302 (from Other, then from React), even with its React bindings.

### 📱 React-Native

React Native core (releases, RFCs, PRs), Expo, RN libraries, and native platform news that affects RN apps: Xcode and iOS SDK releases, Android changes (Xcode 27.1 in #302). Neighboring cross-platform news also fits when RN devs should know about it (observed): Lynx, companies moving away from RN (Shopify and Coinbase in #300), RN-like renderers.

This section is usually the longest, and most of it is 📦 releases.

### 🔀 Other

TypeScript, runtimes (Node.js, Deno, Bun), bundlers and tooling (webpack, Rspack, Vite, Oxc), the web platform, CSS and HTML, TC39, and major security issues outside React (the PHP "php2shell" RCEs in #302).

**Rule (#302): Other is trimmed hard.** The editor went from the 20 items drafted for him to about 10. He kept big releases (TypeScript 7.1 beta, tsrs, webpack, Rsdoctor, Node.js LTS), a few strong articles and one exciting PR. He cut niche or opinion articles, minor packages (maplint, Extension.js, pnpm patch notes), experiments (Handwired) and conference replays.

### Headlines

Rules (curator guide): usually 1–2 React headlines and 1–2 React Native headlines, each with a top banner image. Prefer an image that shows something meaningful (a code screenshot), but a beautiful social card is fine too. Exceptions happen: sometimes a section has no clear headline, sometimes the Other section gets one.

### 💸 Sponsors and 🤭 Fun

**Rule (#302): when reviewing or drafting, ignore the sponsor blocks, the 💸 links and the Fun section.** Sponsors and ad placements are the editor's responsibility (curator guide), and the issue skeleton usually arrives with them already in place. The memes are picked at the end. Never write, rewrite, move or comment on them unless asked.

## What to prefer

Rules (curator guide):

- **Fresh content.** One month is already old: we probably covered it.
- **Event-driven content**: a new release, a new project, a new docs page.
- **Weak signals** that show what the future will look like (PRs, RFCs, experiments from the core teams…).
- Content focusing on **a single idea**, explaining a concept **in depth**.
- **React core techniques**, broadly applicable by a large audience.
- **Novel, innovative or underrated** techniques.
- **Niche topics and weak signals**, when well presented or impactful.
- **Outstanding presentation effort** and a great reading experience, such as interactive articles.

Rule (#302): **free and platform-agnostic.** TWIR usually doesn't feature product news, only things developers can use for free whatever their platform. Example: Void (VoidZero) was cut from #302: it's MIT-licensed, but it only deploys to Cloudflare and needs Workers for Platforms.

Observed patterns:

- **News from ecosystem players** gets in when it changes something for React/RN devs: acquisitions (Margelo joining Callstack), foundation news, Expo launching a service. Vendor-tied items from these players are judgment calls: flag them as such.
- **Official engineering blogs** (Next.js, Expo, Callstack, Software Mansion, Base UI…) and recognized authors (Josh Comeau, Jake Archibald) appear often.
- An older item can come back when it becomes relevant again, ideally linking to the issue that first covered it (see `twir-writing-style`).

## What to filter out

Rules (curator guide):

- Content produced by AI, SEO listicles and other low-quality articles.
- Content behind a paywall, requiring auth, or with a bad reading experience.
- Content for junior developers: 101s, step-by-step tutorials, paraphrased official docs with no added value.
- Content teaching how to use a paid product (that's what sponsorships are for), unless it isn't too promotional and teaches something valuable about React along the way.
- Most UI libraries and boilerplates: there are simply too many. Exceptions: high traction, a long-term maintenance commitment, or an authority behind it. Their launches aren't covered, but a v10 might be, once it's mainstream and has proven its value.
- Weak signals that are too weak: if you can't explain the impact in simple words, or think only a dozen people will benefit, it's probably too soon.
- X/Twitter threads and conversations, which require signing up: prefer external links. A single tweet is fine when it contains all the information, a link, or a video demo.
- Releases with nothing interesting to highlight, which is often the case for patch releases.

Rules (#302), from the editor's trims:

- Product news tied to one vendor or a paid add-on.
- Niche or opinion articles, minor packages and patch notes, experiments without a clear audience, conference replays.
- Content that borrows React ideas without being React.
- One link per release of the same project: **several releases of one project become one link** (see "Link budget").

Exceptions can always be made for outstanding presentation effort. An interactive article explaining basic React concepts is fine, for example: senior devs might share it with their junior colleagues.

When a section is packed, also suggest dropping recaps and items that carry several links.

## How much space an item gets

Three tiers, from most to least space:

1. **Headline** (banner image, bold title link, a paragraph, often a bullet list of highlights): the 0–2 biggest stories of a section. Examples: Next.js 16.4 (#300), React Native 0.88 and Expo SDK 58 (#302). The editor decides which items get one.
2. **List item with a comment**: when readers need context to see why it matters. 48% of non-sponsored items have one (#294–#302); the median comment is 138 characters, rarely more than 270.
3. **Title only**: when the title and its keyword highlights already say it all. Most minor releases.

Rules (curator guide): it's not needed to comment on everything, and it's better not to comment than to make a wrong or useless comment. Rule (#302): keep it concise and skimmable. Go longer only for items that are novel, mainstream, or match the editor's interests (React Compiler internals, for example). When you write more, lead with why it matters: "Exciting news for SPA / client-side routing frameworks!", "The real highlight is the new TypeScript API…".

## Ordering inside a section list

Rule (curator guide): roughly follow the emoji ordering, for a consistent reading order: headlines, weak signals, community articles, media resources. Within an emoji group, put the most interesting links first, usually with a comment.

Observed usual order (#290–#302):

1. 💸 sponsored link(s)
2. News and weak signals: 🔐 security, 📣 announcements, 📅 events, 🐦/🦋 social posts, 👀 PRs and previews, 💬 RFCs and discussions, 📖 docs, 📊 benchmarks and surveys
3. 📜 articles
4. A second 💸 slot, sometimes
5. 📦 releases, most important first
6. 🤖 AI tools, 🎥 videos, 🎙️ podcasts

Severe security advisories go first among the news.

## Link budget (email)

Rule (#302): watch the link count. Gmail clips emails over about 102KB of HTML ("View entire message"), which hides the end of the issue (Other, Fun). The email is sent with Kit (ConvertKit), which rewrites every link into a long tracked URL, so the number of links is the main driver of email size. Inline links inside comments count too.

**Check it with the `twir-email-size` skill**: its calibrated script estimates the email size and says how many links to cut. Rough orders of magnitude: #294 (93 links) was clipped; with a 5% margin, an issue fits about 88 links at 1,400 words, and about 80 at 2,000 words. The median issue has 70 links.

**Rule (#302): several releases of one project = one link.** Title it with an arrow range, e.g. `Vinext 1.2 → 1.3`, `pnpm 12.11 → 12.13`, `Satori 0.36 → 0.55`. Link to the blog index or the GitHub releases page (`vinext.dev/blog`, `github.com/<org>/<repo>/releases`), so readers can reach every release from that one link, and first check that the index shows those releases at the top. The keywords and the comment cover what's new across the whole range.

## Judging an item: checklist

1. Did I read it in full? If not, say so.
2. Is it fresh, and in scope for its section?
3. Is it something to prefer, or something to filter out?
4. Is it free and platform-agnostic, or tied to a vendor?
5. Is it significant enough to spend a link on, compared with the rest of the section?
6. Does it duplicate another item? Merge release ranges, and merge closely related links into one item.
7. Which space tier does it deserve?
