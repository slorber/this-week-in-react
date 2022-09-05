import React, { useRef, useState } from "react";
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
  // ✅ Good: Subscribing to an external store with a built-in Hook
  return useSyncExternalStore(
    subscribe, // React won't resubscribe for as long as you pass the same function
    () => navigator.onLine, // How to get the value on the client
    () => true // How to get the value on the server
  );
}

function ChatIndicator() {
  const isOnline = useOnlineStatus();
  // ...
}`;

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
    const emailHTML = `<pre style="background-color: #f6f8fa; font-size: ${fontSize}px; line-height: ${lineHeight}px; border-radius: 3px; padding: 3px; margin: 0; border: 0;">
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
