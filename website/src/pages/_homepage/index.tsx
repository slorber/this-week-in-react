import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Quotes from "./quotes";
import styles from "./index.module.css";
import { useBaseUrlUtils } from "@docusaurus/core/lib/client/exports/useBaseUrl";

function Header() {
  const { siteConfig } = useDocusaurusContext();
  const { withBaseUrl } = useBaseUrlUtils();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <img
          src={withBaseUrl("/img/TWIR_LOGO_SIMPLE_NOBG.png")}
          style={{ maxWidth: 160 }}
        />
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/newsletter"
          >
            📨 Newsletter
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="https://slo.im/thread"
            style={{ marginLeft: "2rem" }}
          >
            <img src={withBaseUrl("/svg/twitter.svg")} /> Thread
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <Header />
      <main>
        <Quotes />
      </main>
    </Layout>
  );
}
