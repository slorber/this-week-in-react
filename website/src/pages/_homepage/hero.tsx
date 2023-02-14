import React from "react";
import clsx from "clsx";
import styles from "./hero.module.css";
import { useBaseUrlUtils } from "@docusaurus/core/lib/client/exports/useBaseUrl";
import SubscribeForm from "@site/src/components/SubscribeForm";
import SimpleTranslate from "@site/src/components/SimpleTranslate";
import {
  newsletterStats,
  lastIssueLink,
  testimonialsLink,
} from "@site/src/newsletter";
import Link from "@docusaurus/Link";

function HeroSubscribeForm() {
  return (
    <div className={styles.heroSubscribeForm}>
      <SubscribeForm />
    </div>
  );
}

function HeroValueProposition() {
  return (
    <p className={styles.heroValueProposition}>
      <SimpleTranslate
        en="Join {subscribersCount} readers | {oneEmail} per week | 100% {free}!"
        fr="Rejoins {subscribersCount} abonnés | {oneEmail} par semaine | 100% {free}!"
        values={{
          subscribersCount: (
            <Link
              to={testimonialsLink}
              style={{
                color: "white",
                textDecoration: "underline",
              }}
            >
              <b>{newsletterStats.all.subscribersCount}</b>
            </Link>
          ),
          oneEmail: (
            <Link
              to={lastIssueLink}
              style={{
                color: "white",
                textDecoration: "underline",
              }}
            >
              <b>1 email</b>
            </Link>
          ),
          free: (
            <b>
              <SimpleTranslate en="free" fr="gratuit" />
            </b>
          ),
        }}
      />
    </p>
  );
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
        <HeroValueProposition />
      </div>
    </header>
  );
}
