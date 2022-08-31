import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./hero.module.css";
import { useBaseUrlUtils } from "@docusaurus/core/lib/client/exports/useBaseUrl";

export default function Hero() {
  const { siteConfig } = useDocusaurusContext();
  const { withBaseUrl } = useBaseUrlUtils();
  return (
    <header className={clsx("hero hero--primary", styles.hero)}>
      <div className="container">
        <img src={withBaseUrl("/img/TWIR_LOGO_SIMPLE_NOBG.png")} />
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/newsletter"
            style={{
              paddingLeft: "1.4rem",
              paddingRight: "1.6rem",
            }}
          >
            📨 Newsletter
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="https://slo.im/thread"
            style={{
              marginLeft: "1rem",
              paddingLeft: "1.4rem",
              paddingRight: "1.6rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src={withBaseUrl("/svg/twitter.svg")}
              width={20}
              height={20}
              style={{ marginRight: 5 }}
            />{" "}
            Thread
          </Link>
        </div>
      </div>
    </header>
  );
}