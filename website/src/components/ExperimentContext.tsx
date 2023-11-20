import React, { createContext, ReactNode, useContext } from "react";

type Experiment = "default" | "no-layout";

type ExperimentContext = { experiment: Experiment };

const ExperimentContext = createContext<ExperimentContext>({
  experiment: "default",
});

export const ProvideExperimentContext = ({
  children,
  ...props
}: ExperimentContext & { children: ReactNode }) => {
  return (
    <ExperimentContext.Provider value={props}>
      {children}
    </ExperimentContext.Provider>
  );
};

export const useExperimentContext = () => useContext(ExperimentContext);

export const useExperiment = () => useContext(ExperimentContext).experiment;
