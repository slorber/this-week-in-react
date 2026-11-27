---
name: twir-linkedin-post
description: Draft the weekly This Week In React (TWIR) LinkedIn announcement post - exact template built from the published issue's title and intro, and how to adapt the intro's Markdown for LinkedIn (links, backticks, escapes). Use when asked for the issue's LinkedIn post, LinkedIn announcement or LinkedIn version of the intro.
---

# TWIR LinkedIn post

The weekly LinkedIn post announces the published issue. It reuses the issue's frontmatter title and its intro almost word for word: don't rewrite them, don't add news.

Draft it in chat. The editor posts it himself, from his own account.

## Source of truth

The **published** issue: `website/newsletter/<n>/index.mdx` on `main` (pull first), or the live page `https://thisweekinreact.com/newsletter/<n>`. The editor often edits the title and the intro right before publishing, so never draft from an earlier draft, the Google Doc or the issue's pull request branch.

## Template

```
This Week In React <n>: <title keywords>

Hi everyone, Seb and [👹 Jan](https://www.linkedin.com/in/jan-jaworski/) here 👋!

<intro paragraphs>

Let's dive in!

=>>> https://thisweekinreact.com/newsletter/<n>
```

1. **First line**: the frontmatter `title`, without the `#` before the number: `This Week In React #306: UI SDK, …` becomes `This Week In React 306: UI SDK, …`. Keep every keyword and every `|`.
2. **Greeting**: replaces the issue's greeting line, whose links point to X.
   - When Jan co-authors (`janjaworski` in the frontmatter `authors`): `Hi everyone, Seb and [👹 Jan](https://www.linkedin.com/in/jan-jaworski/) here 👋!`
   - Otherwise: `Hi everyone, Seb here 👋!`
   - Seb isn't linked: the post is published from his account.
3. **Intro paragraphs**: the paragraphs between the greeting and `Let's dive in!`, adapted for LinkedIn (see below).
4. `Let's dive in!`
5. **Link**: blank line, then `=>>> https://thisweekinreact.com/newsletter/<n>`. LinkedIn shortens it to an `lnkd.in` link on its own. The `=>>>` arrow is the current norm (#305, #306); #304 had a bare link.

## Adapting the intro

LinkedIn renders neither Markdown nor inline code. Change only what's needed:

- **Links**: keep the link text, remove the Markdown syntax and the URL: `[Fate 2.0](https://…)` becomes `Fate 2.0`. Also drop the `𝕏` prefix that only announced a link to X.
- **Backticks**: LinkedIn has no inline code. `` `random()` `` becomes `random()`, `` `using` `` becomes `using`.
- **Google Docs escapes**: `\!` becomes `!`, `\.` becomes `.`, and so on for any backslash escape.
- **Bold and italics**: remove `**` and `_` markers, keep the text.
- Keep the wording, the emojis and the paragraph breaks.

## Before proposing

- Compare the draft line by line with the final published title and intro: nothing missing, nothing reworded.
- Below the draft, **list every change** you made to the intro: each removed link, backtick, escape or formatting marker, and the greeting swap. The editor checks this list instead of diffing the text himself.

## Example

#306 (title `This Week In React #306: UI SDK, …`, authors `[slorber, janjaworski]`), as posted. LinkedIn had already replaced the link with its `lnkd.in` short link:

```
This Week In React 306: UI SDK, Fate, RSC, Next.js, Dragology, Helmet, React Flow, Virtualized, Anatomy | Expo Simulators, Exact, Bottom Sheet, Node-API, Graphite, Navigation, Nitro SQLite, Trading Charts | Solid, webpack, Node.js, Oxlint, npm, pnpm

Hi everyone, Seb and [👹 Jan](https://www.linkedin.com/in/jan-jaworski/) here 👋!

This week Vercel released the UI SDK: headless behaviors that your agent combines to build your own components. We also have an interesting experiment to stop sending static RSC markup twice. Also, various interesting releases such as Fate 2.0, React Flow 13, React Virtualized 10.

On mobile, Expo launched Cloud Simulators that any agent can drive, and Exact introduced its build and install services.

Elsewhere, Solid 2.0 is finally out. Webpack now handles CSS and HTML natively. Node.js experiments with green threads.

Let's dive in!

=>>> https://lnkd.in/eTuhtDTw
```

Changes from the issue: `#` removed from the title, greeting swapped for the LinkedIn one, `\.` and `\!` escapes removed. That intro had no links or backticks.
