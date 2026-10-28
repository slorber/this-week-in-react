---
name: twir-curation-workflow
description: Day-to-day This Week In React (TWIR) curation workflows - summarizing a single link, preformatting a section from a list of links, reviewing a draft pasted from Google Docs, and turning an approved draft into the published issue. Use whenever you are given links to summarize, triage or write up for TWIR, or a TWIR draft to review.
---

# TWIR curation workflow

The working agreements of `AGENTS.md` apply to every workflow below, chat first in particular. Read every link with the `twir-reading-links` skill, and apply `twir-editorial-line` and `twir-writing-style`.

## Summarize a single link

1. Read the full content (`twir-reading-links`). If you can't, say so explicitly.
2. Propose **3 distinct, concise summaries** of 150 characters max: one sentence (two at most), straight to the point, in TWIR style.
3. Then briefly assess it for the editor:
   - What is it about?
   - Is it a good article?
   - Is it relevant for mid/senior React / React Native devs, and why should they read it?
4. If useful, propose the full list item line, with its emoji and title format (see `twir-writing-style`).

## Preformat a section from a list of links

Input: raw links, often grouped by section, sometimes with notes from the editor.

To prepare raw links for the editors instead (draft items with 🤖 context sub-items to paste into the Doc), use `twir-link-context`.

1. Read every link in full.
2. Triage with `twir-editorial-line`. Don't silently drop or write up questionable items (out of scope, vendor-tied, minor, duplicates). List them as **suggested cuts**, each with a one-line reason.
3. Merge several releases of the same project into one `→` range link.
4. Write each item with `twir-writing-style`, and order the list as described in `twir-editorial-line`.
5. Run the email size check on the whole issue with that section in it (`twir-email-size`).
6. Reply in chat with the section Markdown ready to paste, then the suggested cuts, then the links you couldn't read, then the email size line (and the links to cut if it reaches 95%).

Expect heavy trimming: the editor cuts more than you'd think (Other on #302 went from 20 drafted items to about 10).

## Review a draft

The editor drafts in Google Docs, exports to Markdown, and pastes a section or the whole issue.

Ignore:

- The Google Docs escapes (`\-`, `\!`, `\#`, `\~`, `7\.`, `https\://`). Never mention them.
- The 💸 sponsor blocks and links, and the 🤭 Fun section.

Check:

- Every item against its source, read in full: accuracy, main point captured, numbers in context.
- Scope and editorial line: anything that should be cut or moved to another section.
- Wording rules ("plus"…), title formats, emoji choice and ordering.
- MDX pitfalls: bare `<Tag>` or `{`, `.js` autolinks (see `twir-issue-file`).
- The email size, always (`twir-email-size`).

Reply with a concise list of concrete problems, grouped by section, each with a proposed replacement line. Keep the editor's voice: don't rewrite lines that are fine. Name the links you couldn't read. End with the email size line and, if it reaches 95%, the links you propose to cut. Don't apply anything to the file unless asked.

## From an approved draft to publication

Only when asked:

1. Write the content into `website/newsletter/<n>/index.mdx` following `twir-issue-file`. Always drop `\#` in the frontmatter title, and feel free to drop the other Google Docs escapes.
2. Add and convert the images (`twir-issue-images`).
3. Run the build check and the email size check (`twir-email-size`).
4. Commit only if asked. Maintainers use the issue number as the commit message.
5. The editor may ask for the announcement tweet: see `twir-announcement-tweet`.
6. At the very end, once they have reviewed everything, the maintainer publishes the issue by removing `unlisted: true` from the frontmatter. Don't do it yourself unless asked.
