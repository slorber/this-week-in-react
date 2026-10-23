---
name: twir-email-size
description: Estimate whether a This Week In React (TWIR) issue will be clipped by Gmail (102KB HTML limit) with the bundled calibrated script, and proactively suggest which links to cut. Use whenever an issue or a draft has content (after preformatting a section, when reviewing a draft, before the final review), and whenever email size, Gmail clipping or truncation, or the link budget comes up.
---

# TWIR email size check (Gmail clipping)

## Why it matters

Gmail clips emails above **102KB of HTML**. The end of the issue (Other, Fun, the footer) then hides behind a "View entire message" link that most readers never click.

The editor copy-pastes the website page into Kit (ConvertKit) to send it. Kit's template, inline styles and tracked links make the email HTML much heavier than the MDX. Each link is rewritten into a long tracked URL that embeds the original URL in base64. **Links are the main driver: one link with its list item markup costs about 650–700 bytes, as much as about 65 words of text.**

## When to run it

Rule (#302): the editor wants an advance warning, so he can remove links before sending. **Run the check without being asked:**

- after preformatting a section for an issue,
- when reviewing a draft or an issue,
- before the final review.

Always report the result line. When the estimate reaches 95%, propose links to cut (see below).

## How to run it

```bash
# An issue in the repo
node .agents/skills/twir-email-size/scripts/email-size.mjs 302

# Compare with recent issues
node .agents/skills/twir-email-size/scripts/email-size.mjs 302 301 300

# A draft pasted in chat: save it to a temporary file outside the repo first
node .agents/skills/twir-email-size/scripts/email-size.mjs /tmp/302-draft.md
```

Example output:

```
#294: 93 links, 2046 words -> ~103KB (101% of Gmail limit) CLIPPED: cut links | cut ~9 links to reach 95%
  links per section: Intro 6, 💸 Sponsor 3, ⚛️ React 37, 💸 Sponsor 4, 📱 React-Native 33, 🔀 Other 8, 🤭 Fun 2
```

The exit code is 1 when an estimate reaches 95%. A file path works with or without frontmatter, so a raw Google Docs export is fine.

**Estimate the whole issue.** A draft with only some sections underestimates the email. Combine it with the rest of the issue file in the temporary copy, or say that the estimate is partial.

## Thresholds

| Estimate | Verdict | What to do |
| --- | --- | --- |
| Under 95% | OK | Report the line. |
| 95–100% | At risk | Propose cutting the weakest links: the script says how many to reach 95%. |
| 100% or more | Will be clipped | Links must go: propose the cuts. |

## Picking the links to cut

Propose a concrete list with the section, the item and a one-line reason, weakest first, adding up to at least the number of links the script asks for. The editor decides: never remove anything from the file yourself.

Cheapest wins first:

1. **Merge release series**: several releases of one project become one `→` range link (see "Link budget" in `twir-editorial-line`). This saves one link per extra release, without losing content.
2. **Inline links in comments** that aren't essential. Each one costs a full link.
3. **Items carrying several links**, and recaps.
4. **Minor releases** with little to highlight: patches, small libraries.
5. **Weak items in the longest lists.** React Native is usually the longest list, and Other is trimmed hard anyway.
6. **Items the editorial line filters out**: niche or opinion articles, experiments, conference replays (see "What to filter out" in `twir-editorial-line`).

Never propose cutting the 💸 sponsor blocks or links, the support links of the intro, or the Fun memes. Don't propose cutting headlines: that's the editor's call. Shortening text helps much less (about 65 words per link). Suggest it only for very long comments.

To check a proposal, apply it to a temporary copy of the issue and run the script again.

## The model

```
estimate = K × (T + X × text bytes + links × per-link + blocks × B + images × I)
per-link = 83 + ⌈4/3 × average URL length⌉ + A + 4
```

| Constant | Value | Meaning |
| --- | --- | --- |
| `T` | 18,000 | Kit template |
| `A` | 100 | Anchor attributes and inline styles |
| `B` | 175 | Markup per block (list item or paragraph) |
| `I` | 300 | Markup per image |
| `X` | 1.10 | Text expansion (entities, inline styles) |
| `K` | 1.29 | Calibration scale, fit on #294 |

What gets counted: the body after the frontmatter, with `_support.mdx` inlined, and without `<SubscribeFormEmbed />`, `<!-- truncate -->` and heading ids. Image URLs are not counted as links.

## Calibration data

Measured on 2026-10-21, during issue #302.

**The single calibration point: #294 (93 links including the support links, about 2,050 words) was clipped by Gmail right at the footer.** So its weight is the limit, about 101% in the model.

| Issue | Links | Words | Estimate | Known outcome |
| --- | --- | --- | --- | --- |
| #294 | 93 | 2,046 | 101% | Clipped at the footer |
| #271 | 82 | 2,073 | 100% | – |
| #257 | 86 | 1,817 | 97% | – |
| #295 | 85 | 2,054 | 97% | – |
| #286 | 88 | 1,645 | 95% | – |
| #297 | 82 | 1,867 | 93% | – |
| #302 | 71 | 1,895 | 89% | – |
| #301 | 78 | 1,482 | 86% | – |
| #300 | 65 | 1,517 | 84% | – |
| #298 | 73 | 1,458 | 83% | – |
| #299 | 70 | 1,485 | 81% | – |

Still unknown: whether #271, #257 and #295 were clipped. Ask the editor if it comes up.

Over the last 100 issues (#203–#302), the median issue has 70 links and 1,350 words. With a 5% margin, the maximum is about **88 links at 1,400 words** and about **80 links at 2,000 words**.

## Improving the calibration

With a single calibration point, treat the percentages as ±5%. To refine the model:

1. Get Kit `.eml` exports of past issues (the editor has #294 and #301), copied to a folder the agent can read. Don't commit them.
2. Measure the size of their HTML part, once decoded.
3. Fit `K`, `T` and `B` to the exact sizes, update the constants in `scripts/email-size.mjs`, and update the table above.

When the editor says whether an issue was clipped, add it to the table: each known outcome makes the model more reliable. As with any rule (see `AGENTS.md`), propose the edit in chat first.
