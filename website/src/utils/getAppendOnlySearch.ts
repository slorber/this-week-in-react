// TODO make it execute at most once per request
export default function getAppendOnlySearch(): string {
  try {
    const key = "appendOnlySearchParams";

    const storageParams = new URLSearchParams(localStorage.getItem(key) ?? "");
    const currentParams = new URLSearchParams(window.location.search);

    const appendOnlySearchParams = new URLSearchParams({
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
