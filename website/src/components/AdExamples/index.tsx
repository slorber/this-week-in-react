import React from "react";
import BrowserWindow from "../BrowserWindow";
import { useBaseUrlUtils } from "@docusaurus/useBaseUrl";

function AdExample({ type }: { type: "primary" | "secondary" }) {
  const { withBaseUrl } = useBaseUrlUtils();
  const acmeLogoUrl = withBaseUrl("/img/ACME.png");
  const isPrimary = type === "primary";

  const title = (
    <h2 style={{ flex: 1 }}>
      <a href="https://en.wikipedia.org/wiki/Acme_Corporation">
        ACME Corporation - The best SaaS in the world
      </a>
    </h2>
  );

  const header = isPrimary ? (
    <div
      style={{
        display: "flex",
        flexWrap: "nowrap",
        alignItems: "center",
        marginBottom: "1rem",
      }}
    >
      <img
        alt="ACME Corporation logo"
        src={acmeLogoUrl}
        style={{
          flex: 0,
          maxWidth: 120,
          marginRight: "1rem",
        }}
      />
      {title}
    </div>
  ) : (
    title
  );

  return (
    <BrowserWindow url="mailto:sponsor@thisweekinreact.com">
      {header}
      <p>
        The ACME corporation offers the best React products in the world. This
        is perfect for <b>React and React-Native developers</b> reading this
        newsletter. We have a lot of great JS SDKs and API clients, covering
        every possible stack you might want to use:
        <ul>
          <li>JavaScript & Node.js</li>
          <li>React & React-Native</li>
          <li>Expo config plugin</li>
        </ul>
      </p>
      <p>
        Check{" "}
        <a href="https://animationschooldaily.com/evolution-of-a-peg/">
          <b>all our SDKs</b>
        </a>{" "}
        now! They all have an outstanding <b>native TypeScript support</b>!
      </p>
      {isPrimary && (
        <p>
          We are also hiring! If you are interested to join a top-notch company
          with a remote-first culture and talented engineers, don't miss this
          great offering:{" "}
          <a href="https://en.wikipedia.org/wiki/Acme_Corporation">
            ACME Staff Software Engineer
          </a>
        </p>
      )}
    </BrowserWindow>
  );
}

export function PrimaryAdExample() {
  return <AdExample type="primary" />;
}

export function SecondaryAdExample() {
  return <AdExample type="secondary" />;
}
