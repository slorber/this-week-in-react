import React from "react";

import ComponentTypes from "@theme-original/NavbarItem/ComponentTypes";
import DefaultNavbarItem from "@theme/NavbarItem/DefaultNavbarItem";
import { useBaseUrlUtils } from "@docusaurus/useBaseUrl";

// TODO we should be able to use "children" instead of "label"?
function TwitterThread(props) {
  const { withBaseUrl } = useBaseUrlUtils();
  const label = (
    <span style={{ display: "flex", alignItems: "center" }}>
      <img
        alt="Twitter icon"
        src={withBaseUrl("/svg/twitter.svg")}
        width={20}
        height={20}
        style={{ marginRight: "0.2rem" }}
      />
      {props.label}
    </span>
  );
  return <DefaultNavbarItem {...props} label={label} />;
}

export default {
  ...ComponentTypes,
  "custom-twitterThread": TwitterThread,
};
