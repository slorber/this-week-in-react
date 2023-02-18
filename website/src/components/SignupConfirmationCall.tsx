import React, { useEffect } from "react";
import getAppendOnlySearch from "@site/src/utils/getAppendOnlySearch";

function getSignupConfirmationQuery() {
  return `query=${encodeURIComponent(getAppendOnlySearch())}`;
  // return getAppendOnlySearch();
}

function useAPICall() {
  useEffect(() => {
    const url = `/api/signup-confirmation?${getSignupConfirmationQuery()}`;
    console.log("api call");
    fetch(url).then(console.log, console.error);
  }, []);
}

export default function SignupConfirmationCall() {
  useAPICall();
  return null;
}
