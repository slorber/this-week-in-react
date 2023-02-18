import React, { useMemo } from "react";
import BlogSidebar from "@theme-original/BlogSidebar";
import type BlogSidebarType from "@theme/BlogSidebar";
import type { WrapperProps } from "@docusaurus/types";
import { shortenTitle } from "@site/src/utils/newsletterUtils";

type Props = WrapperProps<typeof BlogSidebarType>;

// @ts-expect-error
function useCustomizedSidebar(sidebar: Props["sidebar"]): Props["sidebar"] {
  return useMemo(() => {
    return {
      ...sidebar,
      items: sidebar.items.map((item) => ({
        ...item,
        title: shortenTitle(item.title),
      })),
    };
  }, [sidebar]);
}

export default function BlogSidebarWrapper(props: Props): JSX.Element {
  // @ts-expect-error
  const sidebar = useCustomizedSidebar(props.sidebar);
  return (
    <>
      <BlogSidebar {...props} sidebar={sidebar} />
    </>
  );
}
