import React from "react";
import clsx from "clsx";
import styles from "./hero.module.css";
import { useBaseUrlUtils } from "@docusaurus/core/lib/client/exports/useBaseUrl";
import SubscribeForm from "@site/src/components/SubscribeForm";
import SimpleTranslate from "@site/src/components/SimpleTranslate";

function HeroSubscribeForm() {
  return <SubscribeForm className={styles.heroSubscribeForm} />;
}

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
            en="The latest news directly in your inbox!"
            fr="Les dernières nouvelles directement dans ta boite mail !"
          />
        </p>
        <HeroSubscribeForm />
      </div>
    </header>
  );
}
