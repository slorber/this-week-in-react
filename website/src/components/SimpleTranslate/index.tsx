import React, { ReactNode } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Interpolate, { InterpolateValues } from "@docusaurus/Interpolate";

type Props<Str extends string> = {
  values?: InterpolateValues<Str, ReactNode>;
  fr: Str;
  en: Str;
};

export default function SimpleTranslate<Str extends string>(props: Props<Str>) {
  const { values, fr, en } = props;
  const { i18n } = useDocusaurusContext();
  const message = i18n.currentLocale === "fr" ? fr : en;
  return <Interpolate values={values}>{message}</Interpolate>;
}
