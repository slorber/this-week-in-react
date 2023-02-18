import React from "react";
import { useBlogPost } from "@docusaurus/theme-common/internal";
import type ContentType from "@theme/BlogPostItem/Content";
import Content from "@theme-original/BlogPostItem/Content";
import SubscribeFormEmbed from "@site/src/theme/MDXComponents/SubscribeFormEmbed";
import useDocusaurusContext from "@docusaurus/core/lib/client/exports/useDocusaurusContext";
import Link from "@docusaurus/Link";

type Props = React.ComponentProps<typeof ContentType>;

function TwitterThreadCTA({ twitterThreadUrl }: { twitterThreadUrl: string }) {
  const { i18n } = useDocusaurusContext();
  const text =
    i18n.currentLocale === "fr"
      ? "Tu as aimé cet article ?"
      : "Did you like this article?";

  const linkText = i18n.currentLocale === "fr" ? "Retweet le!" : "Retweet it!";
  return (
    <div style={{ margin: "1rem 0" }}>
      ❤️️ {text}{" "}
      <Link to={twitterThreadUrl}>
        <strong>{linkText}</strong>
      </Link>{" "}
      🙏
    </div>
  );
}

export default function ContentWrapper(props) {
  const { frontMatter, isBlogPostPage } = useBlogPost();
  return (
    <>
      <Content {...props} />
      {isBlogPostPage && (
        <>
          <br />

          {
            // @ts-expect-error
            frontMatter.twitterThreadUrl && (
              <TwitterThreadCTA
                // @ts-expect-error
                twitterThreadUrl={frontMatter.twitterThreadUrl}
              />
            )
          }
          <SubscribeFormEmbed />
        </>
      )}
    </>
  );
}
