---
name: twir-issue-file
description: The technical anatomy of a This Week In React (TWIR) issue - MDX file layout, frontmatter, section skeleton, MDX components, MDX pitfalls, build check, commit, publishing and deploy troubleshooting. Use when you create or edit website/newsletter/<n>/index.mdx, add an author, build the site, commit an issue or debug a deploy.
---

# TWIR issue file

## Files

| What | Where |
| --- | --- |
| Issue content | `website/newsletter/<n>/index.mdx` |
| Issue images | `website/static/emails/issues/<n>/`, referenced as `/emails/issues/<n>/<file>.jpg`: see the `twir-issue-images` skill |
| Template for a new issue | `website/newsletter/_template/index.mdx` |
| Social links + top subscribe form | `website/newsletter/_support.mdx` (imported by every issue) |
| Authors | `website/newsletter/authors.yml` **and** `website/i18n/fr/docusaurus-plugin-content-blog-newsletter/authors.yml` |
| Custom MDX components | `website/src/theme/MDXComponents/` |
| Remark plugins, blog config | `website/docusaurus.config.ts` |

French translations stopped at #201, but the French locale still builds every issue. A new author must be added to **both** `authors.yml` files, or the French build fails.

## Frontmatter

```yaml
---
slug: /302
title: "This Week In React #302: <React keywords> | <RN keywords> | <Other keywords>"
authors: [slorber, janjaworski]
date: 10-21-2026
unlisted: true
---
```

- `slug`: `/<n>`.
- `title`: see "The issue title" in the `twir-writing-style` skill. It's a double-quoted YAML string, so never put a backslash escape in it: `\#` is invalid YAML there.
- `authors`: keys from `authors.yml`.
- `date`: `MM-DD-YYYY`, the day the issue is published: a Wednesday, or a Tuesday from 2027.
- `unlisted: true` until publication. **Publishing = removing that line**, and the editor does it himself.

## Body skeleton

Section headings and their ids are fixed: other issues and text-fragment links point to them.

```md
Hi everyone, … here 👋!

<intro paragraphs>

Let's dive in!

<!-- truncate -->

import Support from "../_support.mdx";

<Support />

---

## 💸 Sponsor {#sponsor1}

---

## ⚛️ React {#react}

<headline blocks, separated by --->

- <list items>

<SubscribeFormEmbed placement="middle" />

---

## 💸 Sponsor {#sponsor2}

---

## 📱 React-Native {#react-native}

---

## 🔀 Other {#other}

---

## 🤭 Fun {#fun}

![<alt>](/emails/issues/<n>/meme.jpg)

See ya! 👋
```

- `<!-- truncate -->` ends the excerpt shown on the newsletter index page.
- `<SubscribeFormEmbed placement="middle" />` closes the React section.
- `<Todo />` renders a big TODO image. The template is full of them: none may remain in a published issue.
- A top-level item that starts with `🚧` followed by its emoji (`- 🚧 📦 [...]`), or a paragraph that starts with `🚧` (a headline draft), is agent work that an editor hasn't reviewed yet (see `twir-link-context`): none may remain in a published issue either. Once `unlisted: true` is removed, the build stops on a `🚧` followed by an emoji, but not on a headline draft's `🚧 [**Title**]`: check those by hand.
- `---` renders as an image separator, both on the site and in the email.

## Images

See the `twir-issue-images` skill: email-safe JPEG rules, conversion commands, headline images, sponsors, memes and the template placeholder.

## MDX pitfalls

| Problem | Symptom | Fix |
| --- | --- | --- |
| Bare `<Tag>` in text | MDX compile error | Wrap it in backticks: `` `<Activity>` `` |
| Bare `{` or `}` in text | MDX parses it as a JS expression | Wrap it in backticks |
| Google Docs autolinks project names ending in `.js` (`Next.js` becomes a link to `http://next.js`). These links are never intended, and those `.js` domains don't exist in practice | A remark plugin stops the build with "This Week In React - Newsletter bug!", with the file and line | Remove the link, keep the text |
| A nested item starts with `🤖` but no type emoji follows (`  - 🤖 [Some MCP](…)`) | A remark plugin stops the build with "This Week In React - Newsletter bug!", with the file and line | Add the type emoji (`🤖 ✅ …`) if it's an agent note, or move the AI tool link to a top-level item (see `twir-link-context`) |
| A published issue still has `🚧` followed by an emoji (`- 🚧 📦 [...]`) | A remark plugin stops the build with "This Week In React - Newsletter bug!", with the file and line | Have an editor review the item, then remove the `🚧 ` prefix |
| Blank lines between list items, as in `twir-link-context` drafts | No error, but the whole list turns loose: each item is wrapped in a `<p>`, with more spacing on the website and in the email | Remove the blank lines |
| `\#` in the frontmatter `title` | Invalid YAML escape | Remove the backslash |
| Missing image | Build error | Add the file, check the path |

The other Google Docs escapes (`\-`, `\!`, `\~`, `7\.`) are harmless in the body: leave them.

## Build check

Run it before committing an issue:

```bash
yarn build
```

Then check the output contains the key items:

```bash
grep -c "React Native 0.88" website/build/newsletter/302/index.html
```

For live preview, use `yarn start` (http://localhost:3000/newsletter/<n>).

In production builds, a remark plugin rewrites `/emails/...` image URLs (and the separator images) to absolute `https://thisweekinreact.com/...` URLs. The rendered page can then be copy-pasted into the Kit (ConvertKit) email editor.

## Commit and publish

- **Never commit or push unless asked.** Drafting and reviews happen in chat first (see `AGENTS.md`).
- **Maintainers** commit issue changes directly to `main`. The commit message is just the issue number (`302`), and several commits with the same number per issue are normal.
- **Other contributors** open a pull request instead.
- Vercel deploys every push to `main`. The issue stays hidden until `unlisted: true` is removed: the maintainer does it at the very end, once they have reviewed everything.

### Deploy troubleshooting

If a push doesn't trigger a Vercel deploy:

1. Check the commit status: `https://api.github.com/repos/slorber/this-week-in-react/commits/<sha>/status`. Vercel posts "Deployment has completed" there.
2. Check [githubstatus.com](https://www.githubstatus.com/) for Webhooks incidents. On #302, a GitHub webhook delay was the cause.
