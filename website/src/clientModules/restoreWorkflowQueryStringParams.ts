import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

const ParamsToRestore = [
  "rdt_cid",
  "twclid",
  "gclid",
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

    const key = "appendOnlySearchParams";

    const storageParams = new URLSearchParams(localStorage.getItem(key) ?? "");

    const url = new URL(window.location.href);
    storageParams.forEach((value, key) => {
      if (ParamsToRestore.includes(key)) {
        url.searchParams.set(key, value);
      }
    });

    history.replaceState(history.state, "", url.toString());
  } catch (e) {
    console.error("restoreAdIds failure", e);
  }
}
