import React, { Children } from "react";
import MDXComponents from "@theme-original/MDXComponents";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

import SponsoringTabs, {
  SponsoringTabsStats,
  SponsoringTabsTestimonials,
} from "./SponsoringTabs";

export default {
  ...MDXComponents,
  Tabs,
  TabItem,
  SponsoringTabs,
  SponsoringTabsStats,
  SponsoringTabsTestimonials,
};
