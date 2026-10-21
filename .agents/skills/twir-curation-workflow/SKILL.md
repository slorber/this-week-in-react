---
name: twir-curation-workflow
description: Day-to-day This Week In React (TWIR) curation workflows - reading links (X/Twitter, Bluesky, GitHub, blocked pages, videos), summarizing a single link, preformatting a section from a list of links, reviewing a draft pasted from Google Docs, and turning an approved draft into the issue file. Use whenever you are given links to read, summarize, triage or write up for TWIR, or a TWIR draft to review.
---

# TWIR curation workflow

## Ground rules

These three rules come from the editor and apply to every workflow below.

1. **Chat first.** Drafts, preformatted sections and reviews go in the chat. Edit `index.mdx` or commit only when explicitly asked ("put it in the issue"). When the editor pastes his own version ("my final version: …"), give feedback on it in chat and don't apply it.
2. **Read every link in full** before writing or judging it: not its headings, its intro or a keyword search. That includes the items the editor already wrote: check that his description captures the main point, and say so when it doesn't. Never infer content from a URL, slug or title. If you couldn't read a link, or only skimmed it, name it explicitly instead of presenting it as verified.
3. **Follow the editorial line and the style**: the `twir-editorial-line` and `twir-writing-style` skills.

Why rule 2 matters: on #302, an agent "verified" a pre-written line about the Next.js v0 post by searching it for metrics. It missed that the post is mainly about the `next-partial-prefetching-optimizer` skill, and it quoted a number out of context. The editor's reaction: "How can I trust you then?"

## Reading links

| Source | How to read it |
| --- | --- |
| X / Twitter | x.com can't be fetched without logging in. Use the public fxtwitter API: `curl -s https://api.fxtwitter.com/<user>/status/<id>`. It returns JSON with `tweet.text`, `tweet.author`, `tweet.created_at`, `tweet.quote` and media types. |
| Bluesky | `curl -s 'https://public.api.bsky.app/xrpc/app.bsky.feed.getPostThread?uri=at://<handle>/app.bsky.feed.post/<id>'` |
| GitHub | The page itself, or the API: `https://api.github.com/repos/<owner>/<repo>/releases/tags/<tag>`, `.../pulls/<n>`. For RFCs, read the full proposal, not only the PR description. |
| Pages behind a bot challenge (Cloudflare…) | Open them in a real browser (a browser automation tool) and extract the page text. Example: mattrothenberg.com. |
| Videos, podcasts | Use the description, chapters or transcript, and say what the summary is based on. |

fxtwitter limits: no replies or threads, no image or video content, no protected accounts. It's a third-party mirror: when it's down, use a real browser.

When a post announces something that has a blog post or release notes, read those too, and suggest linking them instead. X links require signing up, so the curator guide prefers external links; a single tweet is fine when it contains all the information, a link or a video demo. When nothing works, say so and ask the editor to paste the content.

## Summarize a single link

1. Read the full content. Never infer it from the URL. If you can't fetch it, say so explicitly.
2. Propose **3 distinct, concise summaries** of 150 characters max: one sentence (two at most), straight to the point, in TWIR style.
3. Then briefly assess it for the editor:
   - What is it about?
   - Is it a good article?
   - Is it relevant for mid/senior React / React Native devs, and why should they read it?
4. If useful, propose the full list item line, with its emoji and title format (see `twir-writing-style`).

## Preformat a section from a list of links

Input: raw links, often grouped by section, sometimes with notes from the editor.

1. Read every link in full.
2. Triage with `twir-editorial-line`. Don't silently drop or write up questionable items (out of scope, vendor-tied, minor, duplicates). List them as **suggested cuts**, each with a one-line reason.
3. Merge several releases of the same project into one `→` range link.
4. Write each item with `twir-writing-style`, and order the list as described in `twir-editorial-line`.
5. Run the email size check on the whole issue with that section in it (`twir-email-size` skill).
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
- The email size, always: run the `twir-email-size` skill.

Reply with a concise list of concrete problems, grouped by section, each with a proposed replacement line. Keep the editor's voice: don't rewrite lines that are fine. Name the links you couldn't read. End with the email size line and, if it reaches 95%, the links you propose to cut. Don't apply anything to the file unless asked.

## From an approved draft to the issue file

Only when asked:

1. Write the content into `website/newsletter/<n>/index.mdx` following `twir-issue-file`. Always drop `\#` in the frontmatter title, and feel free to drop the other Google Docs escapes.
2. Save and convert the images (JPEG rules in `twir-issue-file`).
3. Run the build check and the email size check (`twir-email-size`).
4. Commit only if asked. Maintainers use the issue number as the commit message.
5. Once the issue is ready, the editor may ask for the announcement tweet: see `twir-announcement-tweet`.
