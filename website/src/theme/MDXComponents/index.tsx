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
  SponsoringTabsJobSponsor,
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
  SponsoringTabsJobSponsor,
  Todo: () => (
    <img src={require("@site/static/img/todo.png").default} alt={"TODO"} />
  ),
  hr: () => {
    const imgUrl = useBaseUrl("/emails/separators/christmas.png");
    return (
      <div role="separator" style={{ textAlign: "center", margin: "10px 0" }}>
        <img
          className="separator"
          src={imgUrl}
          style={{ maxWidth: 500, margin: "0 auto" }}
        />
      </div>
    );
  },
};
