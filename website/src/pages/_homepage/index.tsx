import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Quotes from "./quotes";
import Hero from "./hero";

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="A weekly newsletter to stay up-to-date with React & React-Native"
    >
      <Hero />
      <main>
        <Quotes />
      </main>
    </Layout>
  );
}
