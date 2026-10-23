---
name: twir-writing-style
description: How This Week In React (TWIR) items are written - list item anatomy, title formats per item type (release, new project, article, PR, RFC, security, event...), comments, emoji palette, headlines, intro, issue title and wording rules. Use whenever you draft, preformat, rewrite or review TWIR text, from a single link line to a whole section or intro.
---

# TWIR writing style

Same sources as the `twir-editorial-line` skill: **rules** come from the editor, either in the curator guide ([`website/src/pages/curator.mdx`](../../../website/src/pages/curator.mdx)) or from issue work (marked with the issue number). **Observed patterns** were measured on issues #290–#302. All examples come from published issues.

## Wording rules

- **Simple language, concise, to the point, no fluff words** (curator guide).
- **Never use "plus" as a connector** ("SSR, plus server functions"). The editor says it reads like AI-generated content. Use "with", "and", or restructure the sentence. (#302)
- **One short, plain sentence** that says why the item matters to React devs. The editor rejected dense, jargon-heavy lines several times. (#302)
- **Never copy an announcement's sentences or verbosity.** Compress them into keywords (titles) or your own short sentence (comments). (#302)
- **Call out the React angle** of significant releases rather than generic features. For the R3F v10 alpha: works with React 19 `<Activity>`, StrictMode no longer rebuilds the Canvas. (#302)
- **Never quote a number out of context.** On #302, a "2.9% lower cost" figure was quoted from a post that said the whole-app numbers weren't attributable to the work being described.

## The list item

```md
- 📦 [Astro 7.4 \- Build timings, separate build/runtime image services, parallel prerendering (experimental)](https://astro.build/blog/astro-740/)
- 📜 [JPEG XL vs AVIF for web use-cases](https://jakearchibald.com/2026/jpeg-xl-vs-avif/) \- JPEG XL recently landed in all browsers. AVIF remains better for lossy compression, but JPEG XL wins for lossless compression and recompressing existing JPEGs.
```

Anatomy: `- <emoji> [<title>](<url>)`, optionally followed by ` - <comment>`.

Rule (curator guide): **what's inside the link is objective** (the release highlights, or a formal project description). **What's outside is your subjective comment**, if any.

The ` \- ` separator comes from the Google Docs export and renders exactly like ` - `. Match the surrounding file, and don't churn existing lines just to change it.

### Titles by item type

| Type | Pattern | Examples |
| --- | --- | --- |
| 📦 Release | `<Name> <version> - <keyword highlights>` | `React Router 8.5 - Deprecated view transition APIs, unstable API-only mode` |
| 📦 Release range | `<Name> <from> → <to> - <highlights>` | `Vinext 1.2 → 1.3 - 69% fewer JS requests per page, 5x faster cold starts, cache key collision fixes` |
| 📦 New project | `<Name> - <objective description>` | `React Trees Playground - Paste React code, see its parent and owner trees` |
| 📜 Article | The article's title, cleaned up if needed | `Pure UI in the Agentic Era` |
| 👀 PR | `<Project> PR - <what>` | `` Next.js PR - `<Link prefetch="navigation">` ``, `React Native PR - ResizeObserver` |
| 👀 / 📖 Docs | `<Project> docs - <topic>` | `React docs - React DevTools for agents` |
| 💬 RFC | `<Project> RFC - <topic>` | `React RFC - React work counters` |
| 🔐 Security | `<Project> vulnerability - <what>` | `React vulnerability - Unauthenticated Remote Code Execution in React Server Components` |
| 📅 Event | `<Event> - <date>, <city>` | `React Foundation Meetup - Nov 11, London` |
| 🎥 / 🎙️ Media | `<Channel or show> - <episode title>` | `Syntax.fm - Why everyone is moving to Stylex?` |
| 🐦 / 🦋 Social post | The news, as a short headline | `Dan Abramov joined the Next.js team at Vercel, part-time` |

Releases (curator guide):

- **Drop the "v" and the patch number**: `3.1`, not `v3.1.9`. Spell out prereleases: `10.0 alpha 6`, `7.1 beta`, `0.88 RC`. Patch numbers only when the patch is the news (security fixes).
- **Put the major highlights as keywords inside the link**, after a dash. Rule (#302): short keyword phrases separated by commas, never sentences. Mark experimental features with "(experimental)". When the editor points to an official tweet or post, pick the same highlights it chose, compressed into keywords. He approved this one on #302: `Astro 7.4 \- Build timings, separate build/runtime image services, parallel prerendering (experimental)`.
- Don't include a release with nothing interesting to highlight.

New projects, or projects featured for the first time (curator guide): replace the keywords with an **objective project description**, inspired by the GitHub repo description, the landing page or the SEO tags. Format it as a release even if there's an introduction blog post.

Articles (curator guide): if a title is too long, click-bait or weirdly capitalized, rewrite it so that all titles are consistent.

Observed: titles have a median length of 70 characters, and 90% are under 110 (#294–#302).

### Comments

- **Optional** (curator guide): it's not needed to comment on everything, and it's better not to comment than to make a wrong or useless comment. About half the items have none (observed).
- **What the title doesn't say**: why it matters, the main change, who should care. Never repeat the title.
- **Length** (observed): median 138 characters, rarely more than 270. One sentence by default, two or three for items that deserve it (see "How much space an item gets" in `twir-editorial-line`).
- **Lead with the angle** for important items: "Exciting news for SPA / client-side routing frameworks!", "The real highlight is…", "Upgrade now!" for severe vulnerabilities.
- **Inline links sparingly**, since each one costs link budget: `Upgrade to [16.4.1 or 15.5.28](…)`, `The [backstory](…) is also interesting`.
- **Link back to past issues** with a text fragment that jumps to the item: `We [recently mentioned](https://thisweekinreact.com/newsletter/300#react:~:text=React%20Foundation%20news) a React Foundation contributor summit`. The pattern is `https://thisweekinreact.com/newsletter/<n>#<section-id>:~:text=<url-encoded words>`.

### Code, names and abbreviations

- Wrap APIs, components, packages, file names and config keys in backticks: `<Activity>`, `"use cache"`, `gradle.properties`, `react-devtools-cdt-mcp`. **This is mandatory for anything that looks like a JSX tag**: MDX breaks on a bare `<Tag>`.
- Use the names projects use themselves: "React Native", "Expo SDK 58", "Next.js", "TypeScript".
- Common abbreviations: RSC, RN, RNW (React Native Web), R3F (React Three Fiber), RNav (React Navigation). They're mostly for the issue title and the announcement tweet, less for item text.

## Emoji palette

The curator guide's palette, with the usage count in #290–#302:

| Emoji | Meaning | Count |
| --- | --- | --- |
| 💸 | Sponsored links (never touch) | 45 |
| 👀 | Preview, PR, weak signals | 40 |
| 💬 | RFC, community discussion | 9 |
| 📊 | Survey, benchmark | 3 |
| 💡 | Interesting idea | 0 |
| 📖 | Docs | 8 |
| 🦋 | Bluesky links | 1 |
| 🐦 | X/Twitter links (avoid if possible) | 7 |
| 🎨 | Visual demos (posted outside X) | 3 |
| 📅 | Events, conference partnerships | 3 |
| 📜 | Articles | 151 |
| 📦 | Releases, npm packages, plugins, repositories | 373 |
| 🔗 | Resources | 0 |
| 🤖 | Tools for AI / agents (skills, CLIs, MCPs…) | 11 |
| 🎥 | Videos | 15 |
| 🎙️ | Podcasts | 15 |

Also used, outside the palette: 🔐 security advisories (10), 📣 announcements such as launches, acquisitions or deprecations (12), 🗓️ conferences (2, same as 📅), 🗳️ polls (1), 💰 a hackathon with prizes (1).

When an item fits several, pick the one that tells readers what they'll find when they click: a blog post announcing a release or a new project is 📦, a PR is 👀 even if it's big news.

## Headlines

```md
![React Native 0.88](/emails/issues/302/react-native-088.jpg)

[**React Native 0.88**](https://reactnative.dev/blog/2026/10/19/react-native-0.88)

The new release is out with one of the largest runtime changes in years! Events are now dispatched through the W3C [`EventTarget`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget) API by default. […]

Other key highlights include:

- **SceneDelegate on iOS** \- support for the `UIScene` lifecycle required by the iOS 27 SDK, added additively.
- **Variable fonts** \- `fontVariationSettings` on `Text` and `TextInput`, on Android and iOS, in object or CSS string form.

---
```

- A top banner image, then the bold title link. Prefer an image showing something meaningful, like a code screenshot (curator guide). Image rules are in the `twir-issue-file` skill.
- Then one paragraph with the big picture (what it is, why it's a big deal), and usually 3–6 bullets with a **bold label** and a short explanation. It can end with a catch-all line: "And a few more: …".
- `---` separates headlines from each other, and the last headline from the list.
- The tone can be more enthusiastic here: "A React Native release is not enough!".

## The intro

Rules:

- When Jan co-authors (check `authors` in the frontmatter), it opens with: `Hi everyone, [Seb](https://x.com/sebastienlorber) and [Jan](https://x.com/jaworek3211) here 👋!`. Guest authors write their own opening, e.g. `Hi everyone, Kasia and Kuba from [Software Mansion](https://swmansion.com/) here.` (#293).
- It **always ends with `Let's dive in!`**. Include that line in every intro draft.
- In between come short paragraphs: React first, then mobile, then Other.

Observed:

- 2–4 paragraphs of 1–3 sentences each, covering the week's biggest stories.
- It sets the mood of the week: "This week is rather quiet on the web side", "It's a heavy security week".
- Some personality: "Wow, 300 issues already!", "Upgrade now!". Bold is used sparingly for the main news (**React 19.3 is finally out**).
- Community asks happen occasionally (a poll, "reply by email").

## The issue title

```yaml
title: "This Week In React #302: Next.js, React Router, DevTools, Security, shadcn, Hydrogen, Vinext, Mutative, R3F | RN 0.88, Expo 58, Navigation, FastImage, Screens, Device Hub, Edge to Edge | TypeScript, PHP, CrUX, Rsdoctor, Astro"
```

- Three keyword groups (React | React Native | Other), separated by ` | `, with keywords separated by `, `.
- 5–10 keywords per group, usually 6–8 (observed).
- Short names readers recognize at a glance: projects, libraries, topics ("Security", "Design Systems"). Versions rarely, mostly for RN and Expo (`RN 0.88`, `Expo 58`).
- Most important first, roughly following the section order.
- Never put a backslash escape in it (`\#`, `\-`): it's a double-quoted YAML string.

## Typography

- The Google Docs Markdown export adds escapes: `\-`, `\!`, `\#`, `\~`, `7\.`, `https\://`. They're harmless in the body and **must never be flagged in reviews** (#302). You don't need to add them when you write MDX yourself.
- Curly quotes and apostrophes also come from Google Docs. Both curly and straight are fine.
- Use `→` for version ranges.
