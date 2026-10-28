---
name: twir-link-context
description: Pre-contextualize raw links for a This Week In React (TWIR) draft - group and deduplicate a messy list of links, then turn each group into a 🚧 draft item line followed by 🤖 context sub-items (verdict, section, score, AI slop score, comment ideas, past coverage, warnings, sources) that editors use to finalize each item fast, and delimited blocks into 🚧 headline drafts. Use when given raw links, a messy draft section or a Google Doc draft to pre-contextualize, group, deduplicate, annotate or prepare for the editors.
---

# Pre-contextualizing links

The editors collect raw links in the issue's Google Doc draft. Google Docs can't attach structured data to a link, and comments are awkward for it, so the context goes in **nested list items under each link**, all starting with `🤖`. Each item you prepare also starts with `🚧`, the mark of AI work in progress: editors read the sub-items, finalize the top line, and remove the `🚧`. The website strips the 🤖 sub-items, so they can stay in the draft until publication.

The working agreements of `AGENTS.md` apply. Read every link in full (`twir-reading-links`), and apply `twir-editorial-line` and `twir-writing-style`.

## Input

Expect a mess: bare URLs, blank lines, several URLs on one line or joined with `+` across lines, short hints before a link ("action sheet v11", "crnl"), `???` and editor notes ("framer motion 14.5 ?", "What is Charlie Cheever working on???", `# Did Jamie publish something better?` after a link), reader submissions, `—` separators, TODOs ("Verify sponsor slot"), and items already written by an editor (leave those alone: see "The top line"). Links are often already grouped under section headings, but the input can also be a partial list with no heading (see step 6). A block at the top of a section closed by a delimiter is a headline candidate (see "Headline drafts").

It comes pasted in chat, as Markdown or any other text (one URL per line, text copied from X or Slack…), or as a Google Doc. To read a Doc, call the Google Docs connector's `read_doc` with the ID from its URL (`docs.google.com/document/d/<id>/edit`). It works on native Docs and on `.md` files. Large drafts don't fit in the tool output and get saved to a file: convert that file to Markdown with the bundled script.

```bash
node .agents/skills/twir-link-context/scripts/doc-to-markdown.mjs <read_doc result file>
```

### Partially handled drafts

A draft often mixes three kinds of items:

| Item | How to recognize it | What to do |
| --- | --- | --- |
| Ready to publish | A written item without `🚧` | Leave it untouched |
| Waiting for review | `- 🚧 <emoji> [...]`, with 🤖 sub-items | Leave it as it is: an agent already prepared it. Redo it only when asked |
| Raw | URLs, hints, notes | Pre-contextualize it |

Output only the items you prepared, grouped by section: the others stay in the Doc as they are. A raw link already covered by one of the other items isn't drafted again (see "Grouping and deduplication"). When it adds a source to a 🚧 item, suggest adding it to that item's ℹ️ line.

## Steps

1. **List every URL** in the input. Leave the 💸 sponsor content, the 🤭 Fun section, TODOs, and the items that are ready or waiting for review alone (see "Partially handled drafts").
2. **Read each link in full.** Name the ones you couldn't read. For an article, also open the blog's index and the author's bio or GitHub profile: they help spot AI-generated content (see "Spotting AI-generated content" in `twir-editorial-line`). Then, when it can help, **do a quick web search** on its subject: the community often adds context the link doesn't have. The Node.js security release never says "node2shell", but many posts call its Brotli RCE that way, and that's what the editor's hint meant. A search can also turn up reactions, known problems or a better main link. It adds to reading the link, never replaces it: read in full each result you use, and list it in ℹ️. When a hint names something your sources don't, search before you disagree with it. Search with public terms only, like the project, the release or the hint. Never put a reader's name, an email's content or news that isn't public yet in a query.
3. **Group and deduplicate** (rules below).
4. **Check past coverage**: search `website/newsletter/*/index.mdx` for the URL, the repo and the project name. For a release, find the previous version's item: its link choice, its title, and whether this one repeats it. Past coverage also tells you whether freshness matters (see "Freshness" in `twir-editorial-line`).
5. **Write each item**: the top line with its `🚧` marker, then its 🤖 sub-items (format below). Write headline candidates as headline drafts instead. For a browser release, first check which of its features become cross-browser, alone or with the other browser releases of the input (see "Browser releases" in `twir-editorial-line`).
6. **Keep the sections, and order** the items as `twir-editorial-line` says. Within an emoji group, higher scores first. Never move an item to another section on your own. When you think it belongs elsewhere, say so in its 🎯 sub-item and in chat. Links that come without a section heading get one from you: once you've read a link, pick ⚛️ React, 📱 React Native or 🔀 Other as the "Sections" part of the public editorial line defines them, give it in 🎯, and group the output by section.
7. **Run the email size check** (`twir-email-size`) on the whole issue with these items. The script ignores the 🤖 sub-items. From 95%, propose cuts, lowest scores first.

## Output

Reply in chat with Markdown ready to paste into the Doc, grouped by section, headline drafts first:

```md
## 📱 React Native

- 🚧 📦 [RN Windows 0.85 - Legacy architecture removed, Visual Studio 2026 and .NET 10, faster text rendering](https://devblogs.microsoft.com/react-native/react-native-windows-v0-85-is-here/)
  - 🤖 ✅ Keep: regular RNW release, we cover every one (0.84 in #288)
  - 🤖 🎯 React Native, among the 📦 releases
  - 🤖 💯 3/5: title only. Matters for Windows apps, minor for most RN devs
  - 🤖 ✍️ Apps still on the legacy architecture must migrate to Fabric before upgrading.
  - 🤖 🔁 0.84 in #288. 0.82 was already titled "New-Architecture only" in #274, so "Legacy architecture removed" is more precise for 0.85
  - 🤖 ℹ️ Sources, read in full: [blog post](https://devblogs.microsoft.com/react-native/react-native-windows-v0-85-is-here/) (main link), [GitHub release](https://github.com/microsoft/react-native-windows/releases/tag/react-native-windows_v0.85.0) (same content, with PR links)
```

After the Markdown block, give the notes on each headline draft, then your questions for the editors (unclear groupings, suggested section moves), then list what you didn't process (links you couldn't read, TODOs left as they were), then the email size line.

**Every input URL ends up in exactly one ℹ️ line or headline draft, or in the "not processed" list.** Nothing gets dropped silently.

Writing straight into the Doc isn't supported yet. The Docs API rejects writes to `.md` files ("The document must not be an Office file", checked on 2026-10-28), and native Docs need more testing first.

### The top line

`- 🚧 <emoji> [<title>](<main link>)`: a complete item following `twir-writing-style` (emoji, title format for its type, main link), behind the review marker. Keep the comment out of it: comment ideas go in ✍️, and the editor adds one if he wants.

Put one space between emojis, and between the last emoji and the link or text: `- 🚧 📦 [link](url)`, `- 🤖 ✅ Keep…`, never `- 🚧📦[link](url)`.

Leave a blank line after each top-level item, its sub-items included: with the 🤖 sub-items, the list is long, and the blank lines make it easier to scan. They must go before publication (see "Cleanup before publication").

**`🚧` marks AI work in progress that an editor must review.** Put it on every item and headline you prepare. The editor removes it once the item is ready for publication, and may delete the 🤖 sub-items or leave them (the website strips them).

- Never remove a `🚧` yourself, and never put one back on an item an editor already reviewed.
- A top-level item without `🚧` counts as reviewed, including items an editor wrote by hand: don't annotate or rewrite it unless asked. Report the problems you notice in chat, as in the review workflow of `twir-curation-workflow`.

On an item, the marker is always followed by the item's emoji. Old issues (#116–#120, #166) used 🚧 as an item emoji, directly followed by a link: that's not the marker.

### The 🤖 sub-items

Every sub-item is `- 🤖 <type emoji> <text>`, nested under its item, on one line, in this order. The type emoji is required: without it, the build fails (see "Cleanup before publication").

| Type | When | Content |
| --- | --- | --- |
| ✅ / 🤔 / ❌ | Always | Keep / judgment call / suggest cut, with a one-line reason based on the editorial line |
| 🎯 | Always | The group in its list (news, articles, releases, AI tools, media), and the section you'd suggest if it seems to belong elsewhere |
| 💯 | Always | The score, `n/5` (scale below), and the space tier it implies |
| 🗑️ | Every 📜 article, and any other link that shows signals | The slop score, `n/5`, and the signals seen (see "Spotting AI-generated content" in `twir-editorial-line`) |
| ✍️ | When a comment would add something | A proposed comment |
| 📝 | When the input had a note or question from the editor | The note, quoted, then the answer |
| 🔁 | When the repo has past coverage | The issues that covered it, and what that means for this item |
| ⚠️ | When needed | Couldn't read or only partially read, a claim the sources don't support, vendor-tied, paywalled, only on X, links grouped by the editor with no obvious connection |
| ℹ️ | Always, last | Every input URL merged into this item, then the links you found and used (search results, a better main link), each labeled by type, the main link marked, and what was read in full |

Score scale:

| Score | Meaning |
| --- | --- |
| 5/5 | Headline candidate: one of the biggest stories of the section |
| 4/5 | List item that deserves a comment |
| 3/5 | Title-only list item |
| 2/5 | Weak: first to cut when over the email budget |
| 1/5 | Suggest cutting it (goes with ❌) |

Comments: one sentence by default (see `twir-writing-style`). For larger releases and blog posts, write a longer comment, and you can add a second ✍️ with a different angle: for example, one on the main change and one on who should care or the React angle.

Write notes you'd be fine with the project's authors reading: the 🤖 sub-items stay in the issue's MDX, and this repo is public.

### Headline drafts

**A delimited block at the top of a section is a headline candidate.** In the drafts, it's a few links, often under a short label ("Redact", "Expo Desktop?"), closed by a delimiter line: `---`, `—`, `***` or a horizontal rule. Turn it into a headline draft in the classic style (see "Headlines" in `twir-writing-style`), with `🚧` in front of the title link:

```md
🚧 🖼️ Image idea: <what the banner could show (see twir-issue-images)>

🚧 [**<Title>**](<main link>)

<One paragraph: what it is, and why it's a big deal.>

Other key highlights include:

- **<Label>** - <short explanation>
- **<Label>** - <short explanation>

---
```

- **It's only a starting point**: the editors usually rewrite headlines heavily. Get the facts right and cover the main points, without polishing.
- **No 🤖 sub-items**: a headline has no list item to nest them under. Link its sources in the draft, and give the rest of its context (score, past coverage, warnings, unused links) in chat, after the Markdown block.
- **Headlines an editor already wrote** (a paragraph, highlights) are reviewed: leave them alone. When a raw block covers the same news as a written headline, don't draft it again: say so in chat. On #303, the raw "Expo Desktop?" block and the written "React Native on desktop" headline are about the same news.

## Grouping and deduplication

- **One link per topic.** A blog post, a release and a social post about the same thing become one item. So does a third-party article on the same topic: it's dropped, not drafted as its own item. Pick the most authoritative first-party source as the main link, in this order: the official blog post or announcement, the release notes, the docs, a social post. Pick a third-party one only when the first-party source reads much worse (see "Link budget" in `twir-editorial-line`). List the dropped links in ℹ️, marked "dropped", so the editors can swap them. A single post can be the main link when it holds everything, like a video demo (see `twir-reading-links`). Check which link past items of the same project used.
- **Several releases of one project** become one `→` range item that links to the releases page (see "Link budget" in `twir-editorial-line`).
- **The same URL twice** (tracking parameters, `twitter.com` vs `x.com`, a trailing slash) is merged silently, and listed once in ℹ️.
- **Links on the same line, or joined with `+`** (often with a short comment), are links the editor considered related: they stay one item. Don't split them on your own. When the connection isn't obvious, say so in a ⚠️ sub-item and in chat, and ask the editors.
- **Related but distinct news** stays separate, like two unrelated posts from the same project.
- **Links already covered** by a written item or headline of the draft (the same URL, or the same news) aren't drafted again: list them in chat.
- **Private links** (Gmail, Google Drive) can't be read. Never copy them into the output, which ends up in the public repo: write "reader submission (email)" in ℹ️ instead.

## Examples

Real inputs live in [`examples/`](examples/), one file per issue, each with the shapes it shows and the decisions expected. Read them when an input shape is unclear. After changing a rule in this skill, run the skill on them, check the expected decisions, and update the ones the change affects. Their content is a past week: never use it as current news. When you rerun one, ignore sources published after its issue, such as the published issue itself.

## Cleanup before publication

**No `🚧` marker may remain**: an item still marked has not been reviewed by an editor (see the publication checks in `twir-issue-file`). In a published issue (no `unlisted: true`), `remarkPluginUnreviewedAgentWork` stops the build on a `🚧` followed by an emoji. It doesn't catch a headline draft's `🚧 [**Title**]` line, since `🚧 [link]` was a regular item emoji in old issues: check those by hand.

Nothing to do for the 🤖 sub-items. The website's `remarkPluginStripAgentSubItems` (in `website/docusaurus.config.ts`) strips every **nested** list item that starts with `🤖` followed by an emoji, and the email size script ignores them too. Top-level `🤖` items are kept: 🤖 is also the palette emoji for AI tools.

**A nested item that starts with `🤖` but has no emoji after it stops the build.** It's ambiguous: an AI/agent link featured as a sub-item, or a note missing its type emoji. An editor must review it: add the type emoji, or move the link to a top-level item.

**Remove the blank lines between items** when converting the draft to MDX. A single blank line makes the whole list loose: every item gets wrapped in a paragraph, which adds spacing on the website and in the email. Published issues use tight lists.

**Sub-items without 🤖 are published.** A note an editor adds under a link must start with 🤖 too, or be deleted before publication.
