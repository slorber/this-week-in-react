---
name: twir-announcement-tweet
description: Draft the weekly This Week In React (TWIR) announcement tweet - exact template, how to pick the keywords, and how to measure the 280 weighted-character limit with the bundled script. Use when asked for the issue's announcement tweet, X/Twitter post or social post.
---

# TWIR announcement tweet

The announcement tweet only announces the issue: it should make people stop scrolling, not go viral. Separate tweets cover individual news.

Before drafting, read 2–4 recent announcement tweets with the fxtwitter API (see `twir-reading-links`): `curl -s https://api.fxtwitter.com/sebastienlorber/status/<id>`. Recent ones: #301 `2110084331414937771`, #299 `2105550694665376198`, #297 `2100499004232450143`, #296 `2097766984549007694`.

## Template

React and React Native only, no Other section:

```
This Week In React <n>
⚛️
- <keyword>
- <keyword>
📱
- <keyword>
- <keyword>

🍿 Read: https://thisweekinreact.com/newsletter/<n>

✍️ @jaworek3211 & I
```

- Add the `✍️` line only when Jan co-authors the issue.
- "Read:" is the norm (#296 used "Read/subscribe:" once).
- The tweet is posted from Sébastien's account, and past tweets always attach a photo.

Real example (#301, 275/280):

```
This Week In React 301
⚛️
- TanStack Start
- React Aria Sheet
- Vitest RSC
- MobX + Compiler
- Satori Yoga -> Taffy
- Next.js CVE + ESLint
- Base UI
📱
- RNW
- Tamagui 3
- One 2
- Skia 3
- Observe
- Screens
- Nano Icons

🍿 Read: https://thisweekinreact.com/newsletter/301

✍️ @jaworek3211 & I
```

## Keywords

- 6–8 per section, at least 5 + 5.
- Names people recognize instantly when skimming: big libraries and frameworks.
- **Order matters: most impactful first**, ranked by coreness and impact. React core, RN core, Expo and Next.js news usually come first, but a tiny React core change ranks below a major TanStack Query or Base UI release. See "Ranking by impact" in `twir-writing-style`: it's the same rule as for the issue title.
- Versions only for majors (`Tamagui 3`, `Expo 58`). React Native releases are written bare: `0.88`, `0.88 RC`.
- Short angles are fine: `R3F WebGPU`, `RNav SVG icons`, `Satori Yoga -> Taffy`.
- Known abbreviations: RNav, RNW, RSC, R3F.
- No sentences.

## Length

The X limit is 280 **weighted** characters: a URL counts 23, an emoji counts 2, Latin characters count 1. Past tweets weigh 233–275. Always measure before proposing a draft, and aim for 275 or less:

```bash
node .agents/skills/twir-announcement-tweet/scripts/tweet-length.mjs tweet.txt
# or
pbpaste | node .agents/skills/twir-announcement-tweet/scripts/tweet-length.mjs
```

To trim, drop the least-known item or shorten labels ("RSC RCE + Next.js" → "React RCE").
