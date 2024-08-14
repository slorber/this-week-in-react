import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import { useBlogPost } from "@docusaurus/plugin-content-blog/client";
import type { Props } from "@theme/BlogPostItem/Header/Title";
import { shortenTitle } from "@site/src/utils/newsletterUtils";

import styles from "./styles.module.css";

export default function BlogPostItemHeaderTitle({
  className,
}: Props): JSX.Element {
  const { metadata, isBlogPostPage } = useBlogPost();
  const { permalink, title: longTitle } = metadata;
  const TitleHeading = isBlogPostPage ? "h1" : "h2";

  const title = shortenTitle(longTitle);
  return (
    <TitleHeading className={clsx(styles.title, className)} itemProp="headline">
      {isBlogPostPage ? (
        title
      ) : (
        <Link itemProp="url" to={permalink}>
          {title}
        </Link>
      )}
    </TitleHeading>
  );
}
