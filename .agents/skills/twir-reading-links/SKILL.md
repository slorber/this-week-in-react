---
name: twir-reading-links
description: How to read a link for This Week In React (TWIR) before writing or judging it - the read-in-full rule, how to get the full text instead of a summary, how to detect a failed fetch, and methods per source (articles, client-side rendered blogs, bot-protected pages, X/Twitter posts and threads, Bluesky posts, replies and quotes, GitHub, videos, podcasts). Use whenever you need the content of a link, to summarize, triage, draft or review an item.
---

# Reading links

## The rule: read everything, in full

Rules from the editor (#302):

- **Read the whole content** before writing or judging an item. Not its headings, not its intro, not a keyword search. **Never skim.**
- **Never infer content from the URL, slug, title or link text.** Two posts with similar titles can say very different things.
- **This includes items someone already wrote**, the editor's own included: check that the description captures the main point, and say so when it doesn't.
- **Say what you couldn't read.** If a link failed, or you only read part of it, name it explicitly. Never present it as verified.

Why it matters: on #302, an agent "verified" a pre-written line about a Next.js blog post by searching it for metrics. It missed that the post is mainly about the `next-partial-prefetching-optimizer` skill, and it quoted a "2.9% lower cost" figure that the post said wasn't attributable to the work. The editor's reaction: "How can I trust you then?"

## Get the full text, not a summary

Some fetch tools pass the page through a smaller model, and return a summary or an answer to your question instead of the page. Details and numbers get lost or distorted. To judge an item, get the actual text:

- download the page (`curl -sL <url>`) and extract its main content,
- or use a raw source: the Markdown on GitHub, the site's RSS/Atom feed, an API (see below),
- or open it in a real browser (a browser automation tool) and extract the page text.

If you could only use a summarizing tool, say so.

## Signs that a fetch didn't get the content

| Sign | Likely cause | What to do |
| --- | --- | --- |
| Almost no text, an empty `<div id="root">` or `<div id="__next">`, "Enable JavaScript" | Client-side rendering | See "Client-side rendered pages" |
| "Just a moment…", "Verify you are human", HTTP 403 or 503 | Bot challenge (Cloudflare…) | Real browser |
| A sign-in form, a paywall, a cookie wall | Restricted content | Real browser if the editor has access. Otherwise say so: the editorial line filters out paywalled content anyway |
| The text doesn't match the title | Redirect, moved page, wrong URL | Check the final URL, look for the right page |

## Articles and blog posts

**Static pages**: download the HTML and extract the main content (the `<article>` or `<main>` element).

**Client-side rendered pages**, in order of preference:

1. Data embedded in the HTML: a `<script id="__NEXT_DATA__">` JSON payload, or `<script type="application/ld+json">`.
2. The site's RSS or Atom feed (`/rss.xml`, `/feed.xml`, `/atom.xml`, or the `<link rel="alternate">` in the HTML), which often contains the full post.
3. The source Markdown, when the blog is open source on GitHub.
4. A real browser: let the page render, then extract the text.

**Bot-protected pages** (mattrothenberg.com was behind a Cloudflare challenge on #302): use a real browser.

## X / Twitter

x.com can't be read without logging in. The fxtwitter API is a public mirror that works without an account:

| What | Request | Main fields |
| --- | --- | --- |
| A single post | `curl -s https://api.fxtwitter.com/<user>/status/<id>` | `tweet.text`, `tweet.author`, `tweet.created_at`, `tweet.quote` (the quoted post), `tweet.media` |
| The author's thread | `curl -s https://api.fxtwitter.com/2/thread/<id>` | `thread` (list of posts), `status` with `replies`, `quotes`, `likes` counts and `community_note` |

The thread endpoint was only checked on single posts so far (it then returns a list of one). Update this table once it's confirmed on a real multi-post thread.

fxtwitter limits: it doesn't return the content of replies or quote posts (only their counts), nor images, videos or protected accounts. It's a third-party service: when it's down, use a real browser.

Many posts announce something that has a blog post or release notes: read those too, and suggest linking them instead. X links require an account, so the editorial line prefers external links. A single post is fine when it contains all the information, a link or a video demo.

## Bluesky

The public API works without an account:

```bash
# The post and its replies
curl -s 'https://public.api.bsky.app/xrpc/app.bsky.feed.getPostThread?uri=at://<handle>/app.bsky.feed.post/<id>&depth=1'

# Its quote posts: use the DID-based URI from thread.post.uri, a handle-based URI returns nothing
curl -s 'https://public.api.bsky.app/xrpc/app.bsky.feed.getQuotes?uri=at://did:plc:<did>/app.bsky.feed.post/<id>'
```

The post text is in `thread.post.record.text`, the counts in `thread.post.replyCount` and `thread.post.quoteCount`, and the replies in `thread.replies`.

## Replies and quotes: extra context

For important or surprising items, also look at the replies and quote posts: a maintainer's clarification, a correction, a disputed benchmark, a link to the real source. Treat them as context, not as facts: verify what you use against the primary source. On Bluesky, use the API above. On X, use a real browser.

## GitHub

The unauthenticated API allows 60 requests per hour.

| What | How |
| --- | --- |
| A release | `https://api.github.com/repos/<owner>/<repo>/releases/tags/<tag>`: the notes are in `body` (Markdown) |
| Recent releases | `https://api.github.com/repos/<owner>/<repo>/releases?per_page=5` |
| A PR | `https://api.github.com/repos/<owner>/<repo>/pulls/<n>` for the description, `.../issues/<n>/comments` when the discussion matters |
| An RFC | The full proposal file, not only the PR description: `https://raw.githubusercontent.com/<owner>/<repo>/<branch>/<path>` |
| A README | `https://raw.githubusercontent.com/<owner>/<repo>/HEAD/README.md` |

## Videos and podcasts

Use the description, the chapters, the transcript when there is one, and the show notes for podcasts. Say what the summary is based on.

## When nothing works

Say so, name the link, and ask the editor to paste the content or open it for you.
