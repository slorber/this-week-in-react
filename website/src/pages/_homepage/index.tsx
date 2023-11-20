import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Quotes from "./quotes";
import Hero from "./hero";
import { useExperiment } from "@site/src/components/ExperimentContext";

function HomeContent() {
  return (
    <>
      <Hero />
      <main style={{ marginTop: "1.5rem" }}>
        <Quotes />
      </main>
    </>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const experiment = useExperiment();

  if (experiment === "no-layout") {
    return <HomeContent />;
  } else {
    return (
      <Layout
        title={`${siteConfig.title}`}
        description="A weekly newsletter to stay up-to-date with React & React-Native"
      >
        <HomeContent />
      </Layout>
    );
  }
}
