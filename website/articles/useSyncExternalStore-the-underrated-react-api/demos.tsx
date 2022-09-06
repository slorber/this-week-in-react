import React, { ReactNode, useCallback } from "react";
import { useSyncExternalStore as useSyncExternalStoreShim } from "use-sync-external-store/shim";
import { useLocation, useHistory } from "@docusaurus/router";
import Link from "@docusaurus/Link";
import BrowserWindow from "@site/src/components/BrowserWindow";
import RenderBox from "@site/src/components/RenderBox";

function useSyncExternalStore<Snapshot>(
  subscribe: (onStoreChange: () => void) => () => void,
  getSnapshot: () => Snapshot,
  getServerSnapshot?: () => Snapshot
): Snapshot {
  return useSyncExternalStoreShim(subscribe, getSnapshot, getServerSnapshot);
}

function CurrentPathname() {
  const { pathname } = useLocation();
  return <RenderBox title="CurrentPathname">{pathname}</RenderBox>;
}

function CurrentHash() {
  const { hash } = useLocation();
  return <RenderBox title="CurrentHash">{hash || "undefined"}</RenderBox>;
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
  return <RenderBox title="CurrentPathname">{pathname}</RenderBox>;
}

function CurrentHashOptimized() {
  const hash = useHistorySelector((history) => history.location.hash);
  return <RenderBox title="CurrentHash">{hash || "undefined"}</RenderBox>;
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

function subscribe(onStoreChange) {
  global.window?.addEventListener("scroll", onStoreChange);
  return () => global.window?.removeEventListener("scroll", onStoreChange);
}

function useScrollY(selector = (id) => id) {
  return useSyncExternalStore(
    subscribe,
    () => selector(global.window?.scrollY),
    () => undefined
  );
}

function ScrollY() {
  const scrollY = useScrollY();
  return <RenderBox title="ScrollY">{scrollY ?? "undefined"}</RenderBox>;
}

function ScrollYFloored() {
  const to = 100;
  const scrollYFloored = useScrollY((y) =>
    y ? Math.floor(y / to) * to : undefined
  );
  return (
    <RenderBox title="ScrollY Floored">
      {scrollYFloored ?? "undefined"}
    </RenderBox>
  );
}

export const ScrollApp = React.memo(function App() {
  return (
    <BrowserWindow>
      <ScrollY />
      <ScrollYFloored />
    </BrowserWindow>
  );
});
