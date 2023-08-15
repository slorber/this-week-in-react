import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import getAppendOnlySearch from "@site/src/utils/getAppendOnlySearch";

const ParamsToRestore = [
  "rdt_cid",
  "twclid",
  "gclid",
  "fbclid",
  "email",
  "ck_subscriber_id",
];

if (ExecutionEnvironment.canUseDOM) {
  tryRestore();
}

function tryRestore() {
  try {
    if (!window.location.pathname.includes("/workflow/")) {
      return;
    }

    const storageParams = new URLSearchParams(getAppendOnlySearch());

    const url = new URL(window.location.href);
    storageParams.forEach((value, key) => {
      if (ParamsToRestore.includes(key)) {
        console.log("restore", key, value);
        url.searchParams.set(key, url.searchParams.get(key) ?? value);
      }
    });

    history.replaceState(history.state, "", url.toString());
  } catch (e) {
    console.error("restoreAdIds failure", e);
  }
}
