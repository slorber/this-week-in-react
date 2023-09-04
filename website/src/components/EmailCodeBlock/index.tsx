import React, { useRef, useState } from "react";
// @ts-ignore: why?
import Playground from "@theme/Playground";
import styles from "./index.module.css";

const sample = `function subscribe(callback) {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}

function useOnlineStatus() {
  return useSyncExternalStore(
    subscribe,
    () => navigator.onLine,
    () => true
  );
}

function ChatIndicator() {
  const isOnline = useOnlineStatus();
  // ...
}

function useSyncExternalStore<Snapshot>(
  subscribe: (onStoreChange: () => void) => () => void,
  getSnapshot: () => Snapshot,
  getServerSnapshot?: () => Snapshot
): Snapshot;`;

export default function EmailCodeBlock(props: any) {
  const ref = useRef<HTMLDivElement>();

  const [copiedHTML, setCopiedHTML] = useState("");

  const fontSize = 12;
  const lineHeight = 16;

  const copyToEmail = async () => {
    const pre = ref.current!.querySelector("pre");

    // Seems useful to render code blocks in emails :/
    function divToSpan(div) {
      const span = document.createElement("span");
      // @ts-expect-error
      span.style = `font-size: ${fontSize}px; line-height: ${lineHeight}px;`;
      while (div.firstChild) {
        span.appendChild(div.firstChild);
      }
      console.log({ parentNode: div.parentNode, div, span });
      div.parentNode.replaceChild(span, div);

      if (span.nextSibling) {
        span.parentNode.insertBefore(
          document.createElement("br"),
          span.nextSibling
        );
      }
    }

    Array.from(pre.querySelectorAll("div.token-line")).forEach((line) => {
      divToSpan(line);
    });

    const innerHTML = pre.innerHTML;
    const emailHTML = `<pre style="background-color: #f6f8fa; font-size: ${fontSize}px; line-height: ${lineHeight}px; border-radius: 5px; padding: 5px; margin: 0; border: 0;">
<code style="font-size: ${fontSize}px; line-height: ${lineHeight}px;">${innerHTML}</code></pre>`;
    console.log({ emailHTML });
    await navigator.clipboard.writeText(emailHTML);
    console.log("copied to clipboard")!;
    setCopiedHTML(emailHTML);
  };

  return (
    <div ref={ref} className={styles.emailCodeBlock}>
      <Playground {...props} language="typescript">
        {sample}
      </Playground>
      <button style={{ margin: 5 }} onClick={copyToEmail}>
        Copy to email
      </button>
      {copiedHTML && (
        <div style={{ marginTop: 10 }}>
          <h1>Copied to clipboard:</h1>
          <div dangerouslySetInnerHTML={{ __html: copiedHTML }}></div>
        </div>
      )}
    </div>
  );
}
