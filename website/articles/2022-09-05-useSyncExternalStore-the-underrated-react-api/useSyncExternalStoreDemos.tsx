import React, { ReactNode, useCallback } from "react";
import { useSyncExternalStore as useSyncExternalStoreShim } from "use-sync-external-store/shim";
import { useLocation, useHistory } from "@docusaurus/router";
import Link from "@docusaurus/Link";
import BrowserWindow from "@site/src/components/BrowserWindow";
import styles from "./index.module.css";
import clsx from "clsx";

function useSyncExternalStore<Snapshot>(
  subscribe: (onStoreChange: () => void) => () => void,
  getSnapshot: () => Snapshot,
  getServerSnapshot?: () => Snapshot
): Snapshot {
  return useSyncExternalStoreShim(subscribe, getSnapshot, getServerSnapshot);
}

function RenderIndicator() {
  return <span className={clsx(styles.rerender)}>Render</span>;
}

function RenderBox({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const renderKey = Math.random();

  const border = "solid grey 2px";
  const borderRadius = 5;

  return (
    <div
      key={renderKey}
      className={clsx(
        styles.component
        // "bg-gray-900 rounded text-white p-4 border-2 border-gray-400 relative mt-4"
      )}
      style={{
        position: "relative",
        border,
        borderRadius: 5,
        boxShadow: "var(--ifm-global-shadow-md)",
        marginBottom: "1rem",
        overflow: "hidden",
      }}
    >
      <div>
        <span
          style={{
            fontSize: 24,
            fontWeight: "bold",
            borderWidth: 2,
            borderBottom: border,
            borderRight: border,
            borderBottomRightRadius: borderRadius,
            padding: "0.4rem",
          }}
        >
          {title}
        </span>
        <RenderIndicator />
      </div>
      <div style={{ marginTop: "0.5rem", padding: "0.5rem" }}>{children}</div>
    </div>
  );
}

function CurrentPathname() {
  const { pathname } = useLocation();
  return <RenderBox title="Pathname">{pathname}</RenderBox>;
}

function CurrentHash() {
  const { hash } = useLocation();
  return <RenderBox title="Hash">{hash || "undefined"}</RenderBox>;
}

function Links() {
  return (
    <RenderBox title="Links">
      <Link to="#link1">#link1</Link>
      <Link to="#link2" style={{ marginLeft: "2rem" }}>
        #link2
      </Link>
      <Link to="#link3" style={{ marginLeft: "2rem" }}>
        #link3
      </Link>
    </RenderBox>
  );
}

export const App = React.memo(function App() {
  return (
    <BrowserWindow>
      <CurrentPathname />
      <CurrentHash />
      <Links />
    </BrowserWindow>
  );
});

type History = ReturnType<typeof useHistory>;

function useHistorySelector<Result>(selector: (history: History) => Result) {
  const history = useHistory();
  return useSyncExternalStore(history.listen, () => selector(history));
}

function CurrentPathnameOptimized() {
  const pathname = useHistorySelector((history) => history.location.pathname);
  return <RenderBox title="Pathname">{pathname}</RenderBox>;
}

function CurrentHashOptimized() {
  const hash = useHistorySelector((history) => history.location.hash);
  return <RenderBox title="Hash">{hash || "undefined"}</RenderBox>;
}

export const AppFixed = React.memo(function App() {
  return (
    <BrowserWindow>
      <CurrentPathnameOptimized />
      <CurrentHashOptimized />
      <Links />
    </BrowserWindow>
  );
});

function useScrollY(selector = (id) => id) {
  const subscribe = useCallback((onStoreChange) => {
    window.addEventListener("scroll", onStoreChange);
    return () => window.removeEventListener("scroll", onStoreChange);
  }, []);

  return useSyncExternalStore(
    subscribe,
    () => selector(window.scrollY),
    () => undefined // Can't read scroll positiuon on the server
  );
}

function ScrollY() {
  const scrollY = useScrollY();
  return <RenderBox title="ScrollY">{scrollY}</RenderBox>;
}

function ScrollYFloored() {
  const to = 100;
  const scrollYFloored = useScrollY((y) => Math.floor(y / to) * to);
  return <RenderBox title="ScrollY Floored">{scrollYFloored}</RenderBox>;
}

export const ScrollApp = React.memo(function App() {
  return (
    <BrowserWindow>
      <ScrollY />
      <ScrollYFloored />
    </BrowserWindow>
  );
});
