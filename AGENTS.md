# AGENTS.md

Instructions for AI agents (and humans) working on [This Week In React](https://thisweekinreact.com) (TWIR), the weekly curation newsletter for mid/senior React and React Native developers.

This repo is the Docusaurus website, and its main content is the weekly newsletter issues. Most work here is editorial: reading links, drafting and reviewing issues, preparing images, building and publishing. This file is the entry point for every agent. `CLAUDE.md` only imports it.

## Who works here

- **Editor**: Sébastien Lorber (`slorber`). He owns the editorial line, the sponsors, the email version and the send.
- **Co-author**: Jan Jaworski (`janjaworski`) co-authors most issues.
- **Guest curators** (e.g. Software Mansion on #279, #290, #293) write some issues, following the [curator guide](website/src/pages/curator.mdx).
- The team prepares each **issue skeleton**, with the sponsors already in place, a few days before publication.

## The weekly cycle

1. A skeleton `website/newsletter/<n>/index.mdx` is created from `website/newsletter/_template/`, with `unlisted: true` and the sponsors filled in.
2. Curation starts on Monday. Links are sourced from X, RSS feeds and organic sources, collected in a shared Google Doc, then filtered, formatted and commented.
3. Agents help in chat: reading and summarizing links, preformatting sections, reviewing drafts.
4. The approved draft is exported from Google Docs to Markdown and converted to MDX. Images are added, the build is checked, the changes are committed.
5. The issue is published on Wednesday: the editor removes `unlisted: true`, Vercel deploys, the email goes out with Kit (about 17:00 UTC), and the announcement tweet is posted.

## Working agreements

These rules apply to every agent, in every session:

1. **Chat first.** Drafts, preformatted sections and reviews go in the chat. Edit an issue's `index.mdx` only when explicitly asked ("put it in the issue"). When the editor pastes his own version, give feedback on it and don't apply it.
2. **Read every link in full** before writing or judging an item, including items someone else already wrote. Never infer content from a URL or a title, and never "verify" with a keyword search. Name the links you couldn't read or only skimmed.
3. **Follow the editorial line and the style** described in the skills below. When unsure whether an item fits, flag it with a reason instead of deciding silently.
4. **Leave the 💸 sponsor content and the 🤭 Fun section alone** unless asked: the editor handles them.
5. **Watch the email size without being asked.** Whenever an issue or a draft has content, run the Gmail clipping check (`twir-email-size`) and report it. From 95% of the limit, propose specific links to cut.
6. **Never commit or push unless asked.** Maintainers commit issue changes directly to `main`, and the commit message is just the issue number (`302`). Other contributors open a pull request.
7. **Keep the rules in this repo, not in your private memory.** When the editor states a new rule or corrects your work in a way that should apply next time, propose an edit to the matching skill (or to this file) in chat, and apply it once approved. That way every contributor and every agent gets it. Label it as a rule, add the issue number, and add the example that motivated it when it helps. Personal setup stays out of the repo: your own API keys and tokens, local paths, sandbox workarounds.

## Skills

Detailed instructions live in [Agent Skills](https://agentskills.io) under `.agents/skills/`. Most agents discover that folder automatically, and `.claude/skills` is a symlink to it for Claude Code. **If your agent doesn't load skills on its own, read the matching `SKILL.md` before starting the task.**

| Skill | Use it when you… |
| --- | --- |
| [`twir-editorial-line`](.agents/skills/twir-editorial-line/SKILL.md) | select, triage, rank or trim links; decide whether an item belongs; check the link budget |
| [`twir-writing-style`](.agents/skills/twir-writing-style/SKILL.md) | draft, rewrite or review any TWIR text: item lines, comments, headlines, intro, issue title |
| [`twir-curation-workflow`](.agents/skills/twir-curation-workflow/SKILL.md) | read links (X, Bluesky, blocked pages), summarize a link, preformat a section, review a draft |
| [`twir-email-size`](.agents/skills/twir-email-size/SKILL.md) | review or preformat anything for an issue (proactively), or get asked about Gmail clipping or the link budget |
| [`twir-issue-file`](.agents/skills/twir-issue-file/SKILL.md) | edit an issue's MDX, add images or authors, build, commit, publish, debug a deploy |
| [`twir-announcement-tweet`](.agents/skills/twir-announcement-tweet/SKILL.md) | draft the weekly announcement tweet |

The editorial skills build on the public [curator guide](website/src/pages/curator.mdx), written for human guest curators. When you change the editorial line in one place, check whether the other needs the same change.

## Repository map

| Path | Content |
| --- | --- |
| `website/newsletter/<n>/index.mdx` | One folder per issue |
| `website/newsletter/_template/`, `_support.mdx`, `authors.yml` | New issue template, shared partial, authors |
| `website/static/emails/issues/<n>/` | Issue images (JPEG, sent in emails) |
| `website/articles/` | Long-form blog articles |
| `website/i18n/fr/` | French translations (stopped at #201, but the French build still runs) |
| `website/src/pages/` | Static pages: sponsor, curator guide, pricing… |
| `website/src/theme/MDXComponents/` | MDX components available in issues (`<Todo />`, `<SubscribeFormEmbed />`…) |
| `website/docusaurus.config.ts` | Site config, with remark plugins for email images and bad Google Docs links |
| `website/api/`, `website/middleware.ts`, `website/vercel.json` | Vercel functions (signup confirmation), edge middleware, redirects |

## Commands

The package manager is Yarn 1 (workspace `website`).

```bash
yarn                                            # install
yarn start                                      # dev server on http://localhost:3000
cd website && ./node_modules/.bin/docusaurus build   # build check (same as `yarn build`)
yarn workspace website typecheck                # TypeScript check for site code
```

Build before committing an issue, then grep `website/build/newsletter/<n>/index.html` for a few key items. See `twir-issue-file` for details.
