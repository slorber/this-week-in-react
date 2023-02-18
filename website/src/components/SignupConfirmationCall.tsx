import React, { useEffect } from "react";
import getAppendOnlySearch from "@site/src/utils/getAppendOnlySearch";

function useAPICall() {
  useEffect(() => {
    const url = `/api/signup-confirmation?${getAppendOnlySearch()}`;
    console.log("api call");
    fetch(url).then(console.log, console.error);
  }, []);
}

export default function SignupConfirmationCall() {
  useAPICall();
  return null;
}
