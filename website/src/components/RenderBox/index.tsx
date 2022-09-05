import React, { ReactNode } from "react";
import styles from "./index.module.css";
import clsx from "clsx";

function RenderIndicator() {
  return <span className={clsx(styles.rerender)}>Render</span>;
}

export default function RenderBox({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const renderKey = Math.random();
  return (
    <div key={renderKey} className={clsx(styles.renderBox)}>
      <div>
        <span className={styles.renderTitle}>{title}</span>
        <RenderIndicator />
      </div>
      <div style={{ marginTop: "0.5rem", padding: "0.5rem" }}>{children}</div>
    </div>
  );
}
