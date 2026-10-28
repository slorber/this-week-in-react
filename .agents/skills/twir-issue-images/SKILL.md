---
name: twir-issue-images
description: Rules and commands for This Week In React (TWIR) issue images - email-safe JPEG conversion, size limits, choosing a headline image, sponsor creatives, Fun memes, naming, MDX syntax and the template placeholder. Use whenever you add, convert, check or choose an image for a TWIR issue.
---

# TWIR issue images

Issue images live in `website/static/emails/issues/<n>/`, and the MDX references them as `/emails/issues/<n>/<name>.jpg`. They are sent in emails: in production builds, a remark plugin rewrites these paths to absolute `https://thisweekinreact.com/emails/...` URLs, so that the page can be pasted into the Kit email editor.

## Rules

From the editor:

- **JPEG only**, never WebP or PNG ("no webp for emails! jpg for all is better"). **No alpha channel.**
- **Headline images**: under 1200px wide and under 200KB (#302). Resize only if needed.
- **Other images** (memes…): about 1000px wide, ideally ≤150KB, never more than 250KB. Never upscale small images.
- **Sponsor creatives** are usually prepared and resized by the team already. Leave them as provided, unless one is over 250KB.
- **Fun memes** are plain images named `meme.jpg`, `meme2.jpg`…, **never wrapped in a link** to their source post. That saves link budget (#302).
- **Names**: short and kebab-case, e.g. `react-native-088.jpg`, `expo-sdk-58.jpg`.

## Choosing a headline image

Rule (curator guide): prefer an image that shows something meaningful, like a code screenshot. A beautiful social card is fine too.

Where to find one:

- the hero image of the announcement post,
- its social card: the `og:image` meta tag of the page,
- a screenshot of the key code or feature.

The alt text is the headline title, e.g. `![React Native 0.88](/emails/issues/302/react-native-088.jpg)`.

## Converting

With ImageMagick:

```bash
# Photos, memes, general images
magick in.png -background white -alpha remove -alpha off -resize '1000x>' -strip -sampling-factor 4:2:0 -interlace JPEG -define jpeg:extent=150KB out.jpg

# Text-heavy headline images (code screenshots): keeps the text crisp
# (RN 0.88's image ended up 1200×675, 108KB)
magick in.png -background white -alpha remove -alpha off -resize '1200x>' -strip -quality 90 out.jpg

# Check the result: format, size, channels (3 = no alpha), weight
magick identify -format '%m %wx%h %[channels] %b\n' out.jpg
```

## In the MDX

| Image | Syntax |
| --- | --- |
| Headline | `![<title>](/emails/issues/<n>/<name>.jpg)` on its own line, above the bold title link |
| Sponsor | `[![<title>](/emails/issues/<n>/<name>.jpg)](<sponsor URL>)`, prepared by the team |
| Fun meme | `![<alt>](/emails/issues/<n>/meme.jpg)` |

Docusaurus throws on missing Markdown images, so every referenced image must exist in the repo before you build.

## The template placeholder

The issue template's Fun section points to `/emails/issues/ISSUENUMBER/meme.jpg`, a real placeholder image (a "TODO" picture). That way, an issue freshly prepared from the template builds before its meme exists.

When adding the real meme, save it as `website/static/emails/issues/<n>/meme.jpg` and update the path in the issue. Never delete or replace the placeholder file itself.
