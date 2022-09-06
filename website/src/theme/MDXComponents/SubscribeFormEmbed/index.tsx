import React, { ComponentProps, ReactNode } from "react";
import clsx from "clsx";
import SubscribeForm from "@site/src/components/SubscribeForm";
import styles from "./index.module.css";
import useDocusaurusContext from "@docusaurus/core/lib/client/exports/useDocusaurusContext";

export default function SubscribeFormEmbed(props: ComponentProps<"div">) {
  const { i18n } = useDocusaurusContext();
  const text =
    i18n.currentLocale === "fr"
      ? "Ne manque pas le prochain article !"
      : "Don't miss the next article!";
  return (
    <div {...props} className={clsx("card", styles.subscribeFormEmbed, props)}>
      <p>
        <strong>{text}</strong>
      </p>
      <SubscribeForm />
    </div>
  );
}
