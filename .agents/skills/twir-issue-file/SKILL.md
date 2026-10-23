---
name: twir-issue-file
description: The technical anatomy of a This Week In React (TWIR) issue - MDX file layout, frontmatter, section skeleton, MDX components, email image rules (JPEG conversion commands), MDX pitfalls, build check, commit, publishing and deploy troubleshooting. Use when you create or edit website/newsletter/<n>/index.mdx, add images under website/static/emails/issues/<n>/, add an author, build the site, commit an issue or debug a deploy.
---

# TWIR issue file

## Files

| What | Where |
| --- | --- |
| Issue content | `website/newsletter/<n>/index.mdx` |
| Issue images | `website/static/emails/issues/<n>/`, referenced as `/emails/issues/<n>/<file>.jpg` |
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
- `authors`: keys from `authors.yml`. Guest issues list their own authors (e.g. `[jakubkowalski, katarzynapodmokla]` on #293).
- `date`: `MM-DD-YYYY`, the Wednesday the issue is published.
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
- `---` renders as an image separator, both on the site and in the email.

## Images

Images are sent in emails, so (rules):

- **JPEG only**: never WebP or PNG. **No alpha channel.**
- **Headline images**: under 1200px wide and under 200KB. Resize only if needed.
- **Other images** (memes…): about 1000px wide, ideally ≤150KB, never more than 250KB. Never upscale small images.
- **Sponsor creatives** are left as the sponsor provided them.
- **Fun memes** are plain images named `meme.jpg`, `meme2.jpg`…, **never wrapped in a link** to their source tweet (that saves link budget).
- Use short kebab-case names: `react-native-088.jpg`, `expo-sdk-58.jpg`.

Convert with ImageMagick:

```bash
# Photos, memes, general images
magick in.png -background white -alpha remove -alpha off -resize '1000x>' -strip -sampling-factor 4:2:0 -interlace JPEG -define jpeg:extent=150KB out.jpg

# Text-heavy headline images (code screenshots): keeps text crisp, RN 0.88's image ended up 1200×675, 108KB
magick in.png -background white -alpha remove -alpha off -resize '1200x>' -strip -quality 90 out.jpg

# Check the result: format, size, channels (no alpha), weight
magick identify -format '%m %wx%h %[channels] %b\n' out.jpg
```

Docusaurus throws on missing Markdown images, so every referenced image must exist in the repo before you build.

## MDX pitfalls

| Problem | Symptom | Fix |
| --- | --- | --- |
| Bare `<Tag>` in text | MDX compile error | Wrap it in backticks: `` `<Activity>` `` |
| Bare `{` or `}` in text | MDX parses it as a JS expression | Wrap it in backticks |
| Google Docs autolinks `Next.js`, `Three.js`… to `http://next.js` | Build stops with "This Week In React - Newsletter bug!" and the file and line | Remove the link, keep the text |
| `\#` in the frontmatter `title` | Invalid YAML escape | Remove the backslash |
| Missing image | Build error | Add the file, check the path |

The other Google Docs escapes (`\-`, `\!`, `\~`, `7\.`) are harmless in the body: leave them.

## Build check

Run it before committing an issue:

```bash
cd website && ./node_modules/.bin/docusaurus build
```

Then check the output contains the key items:

```bash
grep -c "React Native 0.88" website/build/newsletter/302/index.html
```

`yarn build` from the repo root does the same. Some sandboxed agents can't run it, because yarn reads `~/.yarnrc.yml` and sandboxes often block that file. Calling the Docusaurus binary directly avoids that. For live preview, use `yarn start` (http://localhost:3000/newsletter/<n>).

In production builds, a remark plugin rewrites `/emails/...` image URLs (and the separator images) to absolute `https://thisweekinreact.com/...` URLs. The rendered page can then be copy-pasted into the Kit (ConvertKit) email editor.

## Commit and publish

- **Never commit or push unless asked.** Drafting and reviews happen in chat first (see `AGENTS.md`).
- **Maintainers** commit issue changes directly to `main`. The commit message is just the issue number (`302`), and several commits with the same number per issue are normal.
- **External contributors and guest authors** open a pull request instead (e.g. #45 for issue #293).
- Vercel deploys every push to `main`. The issue stays hidden until `unlisted: true` is removed.

### Deploy troubleshooting

If a push doesn't trigger a Vercel deploy:

1. Check the commit status: `https://api.github.com/repos/slorber/this-week-in-react/commits/<sha>/status`. Vercel posts "Deployment has completed" there.
2. Check [githubstatus.com](https://www.githubstatus.com/) for Webhooks incidents. On #302, a GitHub webhook delay was the cause.

A `Co-Authored-By` trailer in the commit message doesn't block deploys.
