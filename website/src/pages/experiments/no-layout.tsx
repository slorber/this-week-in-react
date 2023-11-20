import React from "react";
import Homepage from "@site/src/pages/_homepage";
import { ProvideExperimentContext } from "@site/src/components/ExperimentContext";

export default function Home(): JSX.Element {
  return (
    <ProvideExperimentContext experiment="no-layout">
      <Homepage />
    </ProvideExperimentContext>
  );
}
