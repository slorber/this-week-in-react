#!/usr/bin/env node
// Weighted tweet length, following the twitter-text v3 rules used by X:
// URLs count 23, emoji count 2, Latin and most punctuation count 1, other scripts count 2.
// Usage: node tweet-length.mjs tweet.txt   (or pipe the tweet on stdin)
import { readFileSync } from "node:fs";

const LIMIT = 280;
const URL_WEIGHT = 23;
const EMOJI_WEIGHT = 2;
// Code point ranges that weigh 1, every other code point weighs 2
const LIGHT_RANGES = [
  [0, 4351],
  [8192, 8205],
  [8208, 8223],
  [8242, 8247],
];
const URL_REGEX = /https?:\/\/\S+/g;
const EMOJI_REGEX = /\p{Extended_Pictographic}|\p{Regional_Indicator}/u;

function codePointWeight(codePoint) {
  return LIGHT_RANGES.some(([min, max]) => codePoint >= min && codePoint <= max)
    ? 1
    : 2;
}

function tweetWeight(text) {
  let weight = 0;
  const withoutUrls = text.normalize("NFC").replace(URL_REGEX, () => {
    weight += URL_WEIGHT;
    return "";
  });
  const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
  for (const { segment } of segmenter.segment(withoutUrls)) {
    if (EMOJI_REGEX.test(segment)) {
      weight += EMOJI_WEIGHT;
      continue;
    }
    for (const char of segment) {
      weight += codePointWeight(char.codePointAt(0));
    }
  }
  return weight;
}

const input = readFileSync(process.argv[2] ?? 0, "utf8").replace(/\n+$/, "");
const weight = tweetWeight(input);
console.log(`${weight}/${LIMIT}${weight > LIMIT ? " (too long!)" : ""}`);
process.exitCode = weight > LIMIT ? 1 : 0;
