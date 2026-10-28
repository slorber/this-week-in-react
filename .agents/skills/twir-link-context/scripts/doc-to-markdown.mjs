#!/usr/bin/env node
// Converts a Google Doc, as returned by the Google Docs connector's read_doc
// (the documents.get JSON), to Markdown: headings, nested list items and links.
// Usage:
//   node doc-to-markdown.mjs <read_doc result file>
import { readFileSync } from "node:fs";

const json = JSON.parse(readFileSync(process.argv[2], "utf8"));
const doc = json.content ?? json;

function inlineMarkdown(elements) {
  const segments = [];
  for (const element of elements) {
    if (element.horizontalRule) {
      segments.push({ text: "---" });
      continue;
    }
    const run = element.textRun;
    if (!run) {
      continue;
    }
    const text = run.content.replace(/\n$/, "");
    const url = run.textStyle?.link?.url;
    const previous = segments.at(-1);
    // Docs splits a link into several runs when its style changes
    if (previous && url && previous.url === url) {
      previous.text += text;
    } else {
      segments.push({ text, url });
    }
  }
  return segments
    .map(({ text, url }) => {
      if (!url || !text.trim() || text.trim() === url) {
        return text;
      }
      return `[${text}](${url})`;
    })
    .join("");
}

function tabMarkdown(tab) {
  const lines = [];
  for (const block of tab.documentTab?.body?.content ?? []) {
    if (block.table) {
      lines.push("[table not converted]", "");
      continue;
    }
    const paragraph = block.paragraph;
    if (!paragraph) {
      continue;
    }
    const text = inlineMarkdown(paragraph.elements);
    const style = paragraph.paragraphStyle?.namedStyleType ?? "";
    if (paragraph.bullet) {
      const depth = paragraph.bullet.nestingLevel ?? 0;
      lines.push(`${"  ".repeat(depth)}- ${text}`);
    } else if (style.startsWith("HEADING_") && text.trim()) {
      lines.push("", `${"#".repeat(Number(style.at(-1)))} ${text}`, "");
    } else {
      lines.push(text, "");
    }
  }
  return lines.join("\n");
}

function allTabs(tabs) {
  return tabs.flatMap((tab) => [tab, ...allTabs(tab.childTabs ?? [])]);
}

const tabs = allTabs(doc.tabs ?? []);
const output = tabs
  .map((tab) =>
    tabs.length > 1
      ? `<!-- tab: ${tab.tabProperties?.title} -->\n\n${tabMarkdown(tab)}`
      : tabMarkdown(tab),
  )
  .join("\n\n");

console.log(`<!-- ${doc.title} -->\n\n${output.replace(/\n{3,}/g, "\n\n").trim()}`);
