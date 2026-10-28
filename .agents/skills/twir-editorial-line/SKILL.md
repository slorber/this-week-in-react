---
name: twir-editorial-line
description: Apply the This Week In React (TWIR) editorial line - the public selection criteria, examples from the editor's past trims, section sizes, how much space an item deserves, item ordering and the email link budget. Use whenever you select, triage, rank, trim or review links or sections for a TWIR issue, decide whether an item belongs, or explain why a submitted link doesn't fit.
---

# TWIR editorial line

**The editorial line itself is public**: [`website/src/pages/editorial-line.mdx`](../../../website/src/pages/editorial-line.mdx), served at https://thisweekinreact.com/editorial-line. **Read it first, every time.** It says what TWIR looks for, what it filters out, and what goes in each section.

This skill adds what agents need on top of it:

- **Examples** from the editor's past trims, to calibrate your judgment.
- **Observed patterns** measured on issues #290–#302. They are defaults, not laws.
- How much **space** an item gets, **ordering**, and the **link budget**.

When the editor changes the editorial line, update the public page, and add the example that motivated it here. When you explain to someone why a link doesn't fit, quote or link the relevant part of the public page.

When you are unsure whether an item fits, flag it and explain why. Don't silently drop it, and don't silently write it up.

## Examples from the editor's trims

Free and platform-agnostic:

- **Void** (VoidZero) was cut from #302. It's MIT-licensed, but it only deploys to Cloudflare and needs Workers for Platforms.

The React section is about React itself:

- A **"How ChatGPT Intelligent UI works"** teardown was cut from #302: it describes a React-style reconciler, but it isn't React.
- **OpenUI** was cut twice on #302 (from Other, then from React), even with its React bindings.

The Other section is kept short:

- On #302, the editor went from the 20 items drafted for him to about 10. He kept big releases (TypeScript 7.1 beta, tsrs, webpack, Rsdoctor, Node.js LTS), a few strong articles and one exciting PR.
- He cut niche or opinion articles, minor packages (maplint, Extension.js, pnpm patch notes), experiments (Handwired) and conference replays.

## Section details

The public page defines the sections. Details observed in past issues:

- **📱 React Native** also covers native platform news that affects RN apps, such as Xcode and iOS SDK releases (Xcode 27.1 in #302). Neighboring cross-platform news fits when RN devs should know about it: Lynx, companies moving away from RN (Shopify and Coinbase in #300), RN-like renderers. This section is usually the longest, and most of it is 📦 releases.
- **🔀 Other** covers TypeScript, runtimes (Node.js, Deno, Bun), bundlers and tooling (webpack, Rspack, Vite, Oxc), the web platform, CSS and HTML, TC39, and major security issues outside React (the PHP "php2shell" RCEs in #302).
- **Headlines** (curator guide): usually 1–2 for React and 1–2 for React Native, each with a top banner image. Sometimes a section has none, sometimes the Other section gets one. The editor decides which items get one.

| Section | Typical size (#290–#302) |
| --- | --- |
| ⚛️ React | 0–2 headlines, 13–28 list items |
| 📱 React-Native | 0–2 headlines, 20–32 list items |
| 🔀 Other | 8–10 list items, rarely a headline |
| 🤭 Fun | 1–2 images |

## Browser releases

**Rule: for a browser release, check whether a new CSS, JS or HTML feature in it unlocks cross-browser support.** That's often what matters most to our readers. It deserves a mention in the keywords or the comment, and sometimes a headline when React devs benefit: on #265, Firefox made view transition types, anchor positioning and the Navigation API available in all browsers.

- **Check each new feature in the other browsers**, with the MDN compatibility table, caniuse or webstatus.dev. "Available in all browsers" means Baseline: Chrome, Edge, Firefox and Safari, on desktop and mobile. Don't infer it from the engines alone, since Safari on iOS or Firefox on Android can lag behind.
- **Check the other browser releases of the same issue too**: together, two releases can make a feature available everywhere.
- **Say it plainly**: "Unlocks cross-browser support for CSS `shape()`, `position-try-order`, and Trusted Types" (Firefox 148 in #271), "the Navigation API that is now supported across all browsers" (Safari 26.2 in #263).

List item counts include the 💸 sponsored links.

## Sponsors and Fun

**Rule (#302): when reviewing or drafting, ignore the sponsor blocks, the 💸 links and the Fun section.** Sponsors are the editor's responsibility, and the issue skeleton usually arrives with them already in place. The memes are picked at the end. Never write, rewrite, move or comment on them unless asked.

## Other observed patterns

- **News from ecosystem players** gets in when it changes something for React/RN devs: acquisitions (Margelo joining Callstack), foundation news, Expo launching a service. Vendor-tied items from these players are judgment calls: flag them as such.
- **Official engineering blogs** (Next.js, Expo, Callstack, Software Mansion, Base UI…) and recognized authors (Josh Comeau, Jake Archibald) appear often.
- **An older item can come back** when it becomes relevant again, ideally linking to the issue that first covered it (see `twir-writing-style`).

## How much space an item gets

Three tiers, from most to least space:

1. **Headline** (banner image, bold title link, a paragraph, often a bullet list of highlights): the 0–2 biggest stories of a section. Examples: Next.js 16.4 (#300), React Native 0.88 and Expo SDK 58 (#302).
2. **List item with a comment**: when readers need context to see why it matters. 48% of non-sponsored items have one (#294–#302). The median comment is 138 characters, and comments rarely go beyond 270.
3. **Title only**: when the title and its keyword highlights already say it all. Most minor releases.

Rules: it's not needed to comment on everything, and it's better not to comment than to make a wrong or useless comment (curator guide). Keep it concise and skimmable (#302). Go longer only for items that are novel, mainstream, or match the editor's interests (React Compiler internals, for example). When you write more, lead with why it matters: "Exciting news for SPA / client-side routing frameworks!", "The real highlight is the new TypeScript API…".

## Ordering inside a section list

Rule (curator guide): roughly follow the emoji ordering, for a consistent reading order: headlines, weak signals, community articles, media resources. Within an emoji group, put the most interesting links first, usually with a comment.

Observed usual order (#290–#302):

1. 💸 sponsored link(s)
2. News and weak signals: 🔐 security, 📣 announcements, 📅 events, 🐦/🦋 social posts, 👀 PRs and previews, 💬 RFCs and discussions, 📖 docs, 📊 benchmarks and surveys
3. 📜 articles
4. A second 💸 slot, sometimes
5. 📦 releases, most impactful first (see "Ranking by impact" in `twir-writing-style`)
6. 🤖 AI tools, 🎥 videos, 🎙️ podcasts

Severe security advisories go first among the news.

## Freshness

**Rule: freshness only applies to what we actively track**, like the regular releases of projects we cover often. Don't be strict about it:

- A release 2–4 weeks old that no issue featured yet is worth featuring: we missed it, and stumbled upon it later.
- For a project never featured in any issue, the date doesn't matter.
- For content you just stumbled upon, the date matters less than its interest.
- Past a month, tracked news is probably old: flag it and let the editors decide.

Check past coverage before calling something old. On #303, neither Biome 2.6 (blog post from two weeks earlier, not featured yet) nor a Video.js post (three weeks old, Video.js never featured) was too old.

## Spotting AI-generated content

**Rule: flag AI-generated articles.** The public page filters out content produced by AI. One signal rarely proves it: look for several, in the article, the blog's index and the author's profile. Judge the text, not the person.

The writing:

- **Convoluted past-tense sentences**, often in headings: "The Boilerplate That Quietly Went Away", "Where the Re-renders Actually Came From". A plain "I tested it on three apps" is fine.
- **A punchy cadence**: short contrast lines ("It didn't.", "That's not a bug. It's the design."), a bold one-liner closing each section, tics like "worth calling out" or "here's the thing".
- **Many dashes (– —) or semicolons.** Newer AI text often avoids dashes, and leaves comma splices instead.

The structure:

- A TL;DR or "The short answer" at the top, a "Key takeaways" box, a recap at the end that repeats them.
- A "Common mistakes" list, a checklist table, bullet lists of bare nouns.
- An FAQ at the end, often an accordion, with questions phrased like searches. Headings phrased like searches too.

The content:

- **It restates an authoritative source**, like react.dev or a framework's docs, and adds nothing. Links to the docs after each claim don't make it original.
- **A stale premise**: old news presented as current or upcoming, like a post on a major version's beta published after the next two majors shipped.
- Placeholder code, appeals to unnamed experience ("in the production apps I've worked on"), a product plug at the end.
- Clickbait contrast titles, or "(Tested)" and "Benchmarked" with oddly precise numbers and no method.

The site and the author:

- **The posting rate**: a long post every day or two across unrelated stacks, or an archive that suddenly speeds up after years of occasional posts.
- **The bio or GitHub profile**, like "AI engineer specialized in automations". It only supports other signals: plenty of good authors use AI tools.

Give a **slop score**, and explain it with the signals you saw, quoting a heading or a sentence:

| Slop | Meaning | Verdict |
| --- | --- | --- |
| 1/5 | Reads human | Judge it on its content |
| 2/5 | One or two weak signals | Judge it on its content, and name the signals |
| 3/5 | Several signals, hard to tell | 🤔: the editors decide |
| 4/5 | Clearly templated, with some original substance | ❌, score 1/5 |
| 5/5 | Templated, and only restates docs or generic advice | ❌, score 1/5 |

## Link budget (email)

Rule (#302): watch the link count. Gmail clips emails over about 102KB of HTML, which hides the end of the issue (Other, Fun) behind "View entire message". The email is sent with Kit (ConvertKit), which rewrites every link into a long tracked URL, so the number of links is the main driver of email size. Inline links inside comments count too.

**Check it with the `twir-email-size` skill**: its calibrated script estimates the email size and says how many links to cut. Rough orders of magnitude: #294 (93 links) was clipped. With a 5% margin, an issue fits about 88 links at 1,400 words, and about 80 at 2,000 words. The median issue has 70 links.

**Rule (#302): several releases of one project = one link.** Title it with an arrow range, e.g. `Vinext 1.2 → 1.3`, `pnpm 12.11 → 12.13`, `Satori 0.36 → 0.55`. Link to the blog index or the GitHub releases page (`vinext.dev/blog`, `github.com/<org>/<repo>/releases`), so readers can reach every release from that one link, and first check that the index shows those releases at the top. The keywords and the comment cover what's new across the whole range.

**Rule: two resources on the same topic = one link.** Feature the best one and drop the other, even when they come from different authors. Prefer the most authoritative first-party source: the project's own blog post, release notes or docs, the author's own post. Pick a third-party resource only when the first-party one reads much worse, like a raw changelog, a long spec or a sprawling thread next to a clear write-up. Tell the editors which link you dropped, so they can swap them.

## Judging an item: checklist

1. Did I read it in full (see `twir-reading-links`)? If not, say so.
2. Is it in scope for its section, and fresh enough (see "Freshness")?
3. Does the public page say to look for it, or to filter it out? For an article, does it read as AI-generated (see "Spotting AI-generated content")?
4. Is it free and platform-agnostic, or tied to a vendor?
5. Is it significant enough to spend a link on, compared with the rest of the section?
6. Does it duplicate another item? Merge release ranges, merge closely related links into one item, and keep one link per topic (see "Link budget").
7. Which space tier does it deserve?
