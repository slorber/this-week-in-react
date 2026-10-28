#!/usr/bin/env node
// Estimates the HTML size of a TWIR issue once pasted into Kit (ConvertKit),
// and compares it with Gmail's 102KB clipping limit.
// Usage:
//   node email-size.mjs 302 301        issue numbers, read from website/newsletter/<n>/index.mdx
//   node email-size.mjs draft.md       any Markdown/MDX file (frontmatter optional)
// Model and calibration: see ../SKILL.md
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const NEWSLETTER_DIR = fileURLToPath(
  new URL("../../../../website/newsletter/", import.meta.url),
);
const LIMIT = 102 * 1024;
const WARNING_RATIO = 0.95;
const K = 1.29; // Calibration scale, fit on #294 (clipped right at the footer)
const T = 18000; // Kit template
const A = 100; // Anchor attributes and inline styles
const B = 175; // Markup per block (list item or paragraph)
const I = 300; // Markup per image
const X = 1.1; // Text expansion (entities, inline styles)

const LINK_REGEX = /\]\((https?:\/\/[^)\s]+)\)/g;
const ABSOLUTE_IMAGE_REGEX = /!\[[^\]]*\]\((https?:\/\/[^)\s]+)\)/g;
const IMAGE_REGEX = /!\[[^\]]*\]\(/g;
const LIST_ITEM_REGEX = /^\s*([-*•]|\d+\.)\s+\S/;

const support = readFileSync(path.join(NEWSLETTER_DIR, "_support.mdx"), "utf8");

const charLength = (string) => [...string].length;
const urlsOf = (text, regex) => [...text.matchAll(regex)].map((m) => m[1]);

function readIssue(arg) {
  const file = /^\d+$/.test(arg)
    ? path.join(NEWSLETTER_DIR, arg, "index.mdx")
    : path.resolve(arg);
  if (!existsSync(file)) {
    throw new Error(`File not found: ${file}`);
  }
  return readFileSync(file, "utf8");
}

// Turns the MDX into what ends up in the email: support partial inlined,
// site-only components, heading ids and 🤖 context sub-items removed
function emailBody(raw) {
  const frontMatter = raw.match(/^---\n[\s\S]*?\n---\n/);
  return (frontMatter ? raw.slice(frontMatter[0].length) : raw)
    .replace(/^import .*$/gm, "")
    // Nested "🤖 <type emoji>" only, like the remark plugin: top-level 🤖 items are AI tools
    .replace(/^[ \t]+([-*•]|\d+\.)[ \t]+🤖[ \t]*\p{Extended_Pictographic}.*(\n|$)/gmu, "")
    .replaceAll("<Support />", () => support)
    .replace(/<SubscribeFormEmbed[^>]*\/>/g, "")
    .replaceAll("<!-- truncate -->", "")
    .replace(/\s\{#[\w-]+\}/g, "");
}

function plainText(body) {
  let text = body.replace(/!\[[^\]]*\]\([^)]*\)/g, "");
  for (let i = 0; i < 3; i++) {
    text = text.replace(/\[([^[\]]*)\]\([^)]*\)/g, "$1");
  }
  text = text
    .replace(/<[^>]+>/g, "")
    .replaceAll("\\", "")
    .replace(/^\s*(#+|[-*•]|\d+\.|>)\s*/gm, "")
    .replace(/[*_`]|^-{3,}$/gm, "");
  return text.replace(/[ \t]+/g, " ").trim();
}

function countLinks(text) {
  const urls = urlsOf(text, LINK_REGEX);
  const imageUrls = urlsOf(text, ABSOLUTE_IMAGE_REGEX);
  return {
    links: urls.length - imageUrls.length,
    urlChars:
      urls.reduce((sum, url) => sum + charLength(url), 0) -
      imageUrls.reduce((sum, url) => sum + charLength(url), 0),
  };
}

function countBlocks(lines) {
  const listItems = lines.filter((line) => LIST_ITEM_REGEX.test(line)).length;
  let paragraphs = 0;
  let previousLineBlank = true;
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      previousLineBlank = true;
      continue;
    }
    if (previousLineBlank && !/^([-*•]|\d+\.)\s/.test(trimmed)) {
      paragraphs++;
    }
    previousLineBlank = false;
  }
  return listItems + paragraphs;
}

function linksPerSection(body) {
  const [intro, ...sections] = body.split(/^## /m);
  return [
    ["Intro", intro],
    ...sections.map((section) => {
      const [heading, ...rest] = section.split("\n");
      return [heading.trim(), rest.join("\n")];
    }),
  ]
    .map(([name, content]) => [name, countLinks(content).links])
    .filter(([, links]) => links > 0);
}

function estimate(raw) {
  const body = emailBody(raw);
  const { links, urlChars } = countLinks(body);
  const text = plainText(body);
  const stats = {
    links,
    urlChars,
    images: (body.match(IMAGE_REGEX) ?? []).length,
    words: (text.match(/[\p{L}\p{N}_’'][\p{L}\p{N}_’'.\-/@]*/gu) ?? []).length,
    textBytes: Buffer.byteLength(text, "utf8"),
    blocks: countBlocks(body.split("\n")),
  };
  // Kit tracked link: fixed part + base64-encoded original URL + attributes
  const perLink = 83 + Math.ceil((4 * (urlChars / Math.max(links, 1))) / 3) + A + 4;
  const bytes =
    K *
    (T +
      X * stats.textBytes +
      links * perLink +
      stats.blocks * B +
      stats.images * I);
  // Removing a link item also removes its list item markup
  const linksToCut = Math.max(
    0,
    Math.ceil((bytes - WARNING_RATIO * LIMIT) / (K * (perLink + 1.45 * B))),
  );
  return { ...stats, bytes, linksToCut, sections: linksPerSection(body) };
}

function verdict(ratio) {
  if (ratio >= 1) return "CLIPPED: cut links";
  if (ratio >= WARNING_RATIO) return "WARNING: at risk, consider cutting";
  return "OK";
}

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error("Usage: node email-size.mjs <issue number | file> [...]");
  process.exit(2);
}
let worstRatio = 0;
for (const arg of args) {
  const result = estimate(readIssue(arg));
  const ratio = result.bytes / LIMIT;
  worstRatio = Math.max(worstRatio, ratio);
  const label = /^\d+$/.test(arg) ? `#${arg}` : arg;
  console.log(
    `${label}: ${result.links} links, ${result.words} words -> ~${(result.bytes / 1024).toFixed(0)}KB (${(100 * ratio).toFixed(0)}% of Gmail limit) ${verdict(ratio)}` +
      (result.linksToCut ? ` | cut ~${result.linksToCut} links to reach 95%` : ""),
  );
  console.log(
    `  links per section: ${result.sections.map(([name, links]) => `${name} ${links}`).join(", ")}`,
  );
}
process.exitCode = worstRatio >= WARNING_RATIO ? 1 : 0;
