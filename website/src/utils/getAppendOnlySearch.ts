// TODO make it execute at most once per request

function getInitialSearchParams() {
  const params = new URLSearchParams();
  params.set("initial_referrer", document.referrer);
  params.set("initial_url", document.location.href);
  return params;
}

export default function getAppendOnlySearch(): string {
  try {
    const key = "appendOnlySearchParams";

    const initialParams = getInitialSearchParams();
    const storageParams = new URLSearchParams(localStorage.getItem(key) ?? "");
    const currentParams = new URLSearchParams(window.location.search);

    const appendOnlySearchParams = new URLSearchParams({
      ...Object.fromEntries(initialParams),
      ...Object.fromEntries(storageParams),
      ...Object.fromEntries(currentParams),
    });
    appendOnlySearchParams.sort();

    const appendOnlySearch = appendOnlySearchParams
      .toString()
      // normalize
      .toLowerCase();

    localStorage.setItem(key, appendOnlySearch);

    console.log("appendOnlySearch", appendOnlySearch);
    return appendOnlySearch;
  } catch (e) {
    console.error("getAppendOnlySearch failure", e);
    return "";
  }
}
