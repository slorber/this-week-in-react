import React, { ComponentProps, ReactNode } from "react";
import clsx from "clsx";
import SubscribeForm from "@site/src/components/SubscribeForm";
import styles from "./index.module.css";

export default function SubscribeFormEmbed(props: ComponentProps<"div">) {
  return (
    <div {...props} className={clsx("card", styles.subscribeFormEmbed, props)}>
      <p>
        <strong>Don't miss the next article!</strong>
      </p>
      <SubscribeForm />
    </div>
  );
}
