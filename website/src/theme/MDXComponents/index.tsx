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
  Todo: () => <img src={require("@site/static/img/todo.png").default} alt={"TODO"}/>
};
