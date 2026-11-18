---
name: twir-issue-images
description: Rules and commands for This Week In React (TWIR) issue images - email-safe JPEG conversion, size limits, choosing a headline image, sponsor creatives, Fun memes, screenshots of X posts, naming, MDX syntax and the template placeholder. Use whenever you add, convert, check, choose or screenshot an image for a TWIR issue, including when given an X post URL for a meme.
---

# TWIR issue images

Issue images live in `website/static/emails/issues/<n>/`, and the MDX references them as `/emails/issues/<n>/<name>.jpg`. They are sent in emails: in production builds, a remark plugin rewrites these paths to absolute `https://thisweekinreact.com/emails/...` URLs, so that the page can be pasted into the Kit email editor.

## Rules

From the editor:

- **JPEG only**, never WebP or PNG ("no webp for emails! jpg for all is better"). **No alpha channel.**
- **Headline images**: under 1200px wide and under 200KB. Resize only if needed.
- **Other images** (memes…): about 1000px wide, ideally ≤150KB, never more than 250KB. Never upscale small images.
- **Sponsor creatives** are usually prepared and resized by the team already. Leave them as provided, unless one is over 250KB.
- **Fun memes** are plain images named `meme.jpg`, `meme2.jpg`…, **never wrapped in a link** to their source post. That saves link budget.
- **Which memes to feature**: only the 1 or 2 memes at the top of the Fun section, before its `Backlog:` list. The backlog holds memes the editor bookmarked in previous weeks, for a week with nothing better. Never pick one from it.
- **Names**: short and kebab-case, e.g. `react-native-088.jpg`, `expo-sdk-58.jpg`.

## Choosing a headline image

Rule (curator guide): prefer an image that shows something meaningful, like a code screenshot. A beautiful social card is fine too.

Where to find one:

- the hero image of the announcement post,
- its social card: the `og:image` meta tag of the page,
- a screenshot of the key code or feature.

The alt text is the headline title, e.g. `![React Native 0.88](/emails/issues/302/react-native-088.jpg)`.

## Screenshots of X posts (memes)

**When the editor gives you an X post URL for a meme, take the screenshot yourself.** Save it as the meme image (see "Rules"), then convert it (see "Converting").

- **Browser**: use your own browser. Use the editor's browser only when yours can't show the post, and only temporarily: open your own tab, close it when done, and change none of the editor's settings.
- **Dark mode**: emulate the dark color scheme, or switch the theme of your own browser session.
- **Capture the post only**: the author's name, avatar and **@username** (always), the text and the media. Not the date and stats bar, nor the action bar below it.
- **Clean up the DOM before capturing**: remove the follow, subscribe or boost button, and the top-right menu and Grok buttons. Remove trailing line breaks at the end of the text, to reduce the height.
- **Padding**: the same small padding on all four sides (about 16px), in the dark background color. Add it with CSS before the capture, or with `magick … -bordercolor black -border 16` after a tight crop.
- **Width: at least 800px.** Capture larger when you can: the conversion resizes it down to 1000px.
- **Check the result**: look at the image before saving it. At least 800px wide, nothing cut off, nothing extra, padding even on every side. Then check that each edge is pure black, since a thin grey bar is easy to miss by eye: `magick in.png -crop 1x<height>+<width-1>+0 +repage -colorspace gray -format '%[max]' info:` must print `0`, and the same for the other three edges.

How it worked in the built-in browser of the Claude desktop app, logged out:

- The logged-out page has no `data-testid`. The first `<article>` is the post: its first child holds the header, an optional "Show translation" row, the text, the media and the date row, and its second child is the action bar. Remove the translation row too.
- Move the `<article>` into a new `position: fixed; inset: 0` black overlay, inside a wrapper with the padding, then capture the wrapper's region.
- Hide the page scrollbar (`document.documentElement.style.overflow = 'hidden'`). The overlay doesn't cover it, and it shows as a grey bar on the right edge (#62).
- Captures are at most 800px wide, whatever the viewport size. Emulate a 1000px-wide viewport, scale the wrapper with CSS `zoom` until it fills that width, and capture the full 800px width.
- Convert with `-background black`, not white.

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
