import React, { Children } from "react";
import MDXComponents from "@theme-original/MDXComponents";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

import BrowserWindow from "@site/src/components/BrowserWindow";

import SponsoringTabs, {
  SponsoringTabsStats,
  SponsoringTabsTestimonials,
  SponsoringTabsFirstSponsor,
  SponsoringTabsSecondSponsor,
  SponsoringTabsQuickLinkSponsor,
} from "./SponsoringTabs";

import SubscribeFormEmbed from "./SubscribeFormEmbed";
import useBaseUrl from "@docusaurus/useBaseUrl";

export default {
  ...MDXComponents,
  SubscribeFormEmbed,
  Tabs,
  TabItem,
  BrowserWindow,
  SponsoringTabs,
  SponsoringTabsStats,
  SponsoringTabsTestimonials,
  SponsoringTabsFirstSponsor,
  SponsoringTabsSecondSponsor,
  SponsoringTabsQuickLinkSponsor,
  Todo: () => (
    <img src={require("@site/static/img/todo.png").default} alt={"TODO"} />
  ),
  hr: () => {
    let imgUrl = useBaseUrl("/emails/separators/christmas.png");

    // Make it easier to copy/paste emails into ConvertKit editor
    if (process.env.NODE_ENV === "production") {
      imgUrl = "https://thisweekinreact.com" + imgUrl;
    }
    return (
      <div role="separator" style={{ textAlign: "center", margin: "10px 0" }}>
        <img
          className="separator"
          src={imgUrl}
          width="600"
          height="64"
          style={{
            width: "100%",
            maxWidth: 600,
            margin: "0 auto",
            objectFit: "contain",
          }}
        />
      </div>
    );
  },
};
