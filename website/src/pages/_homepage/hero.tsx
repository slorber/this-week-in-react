import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./hero.module.css";
import { useBaseUrlUtils } from "@docusaurus/core/lib/client/exports/useBaseUrl";
import SubscribeForm from "@site/src/components/SubscribeForm";
import SimpleTranslate from "@site/src/components/SimpleTranslate";

export default function Hero() {
  const { withBaseUrl } = useBaseUrlUtils();
  return (
    <header className={clsx("hero hero--primary", styles.hero)}>
      <div className="container">
        <img src={withBaseUrl("/img/TWIR_LOGO_SIMPLE_NOBG.png")} />
        <h1 className="hero__title">
          <SimpleTranslate en="This Week In React" fr="React Hebdo" />
        </h1>
        <p className="hero__subtitle">
          <SimpleTranslate
            en="The latest React news, directly in your mailbox!"
            fr="Les dernières nouveautés React, directement dans ta boite mail !"
          />
        </p>
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
        <SubscribeForm style={{ margin: "0 auto", marginTop: "1rem" }} />
      </div>
    </header>
  );
}
