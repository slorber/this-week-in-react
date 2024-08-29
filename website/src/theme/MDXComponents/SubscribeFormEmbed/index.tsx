import React, { ComponentProps, ReactNode } from "react";
import clsx from "clsx";
import SubscribeForm from "@site/src/components/SubscribeForm";
import styles from "./index.module.css";
import useDocusaurusContext from "@docusaurus/core/lib/client/exports/useDocusaurusContext";
import { AllQuotes } from "@site/src/pages/_homepage/quotes";
import { useLocalPathname } from "@docusaurus/theme-common/internal";

const FormTestimonials = [
  AllQuotes.en.theo,
  AllQuotes.en.jackherrington,
  AllQuotes.en.evanbacon,
  AllQuotes.en.grabbou,
  AllQuotes.en.wcandillon,
  AllQuotes.en.tkdodo,
  AllQuotes.en.addyosmani,
];

// not ideal fn but good enough for now to randomize testimonials
function getTestimonial(seed: string, offset: number) {
  function stringToRandomNumber(str: string) {
    let randomNumber = 0;
    for (let i = 0; i < str.length; i++) {
      randomNumber += str.charCodeAt(i);
    }
    return randomNumber;
  }

  return FormTestimonials[
    (stringToRandomNumber(seed) + offset) % FormTestimonials.length
  ];
}

const Placements = ["top", "middle", "bottom", "unknown"] as const;
type Placement = (typeof Placements)[number];

function useTestimonial(placement: Placement) {
  const pathname = useLocalPathname();
  const offset = Placements.indexOf(placement);
  return getTestimonial(pathname, offset);
}

type SubscribeFormEmbedProps = ComponentProps<"div"> & {
  placement?: Placement;
};

export default function SubscribeFormEmbed({
  placement = "unknown",
  ...props
}: SubscribeFormEmbedProps) {
  const { i18n } = useDocusaurusContext();
  const testimonial = useTestimonial(placement);

  const text =
    i18n.currentLocale === "fr"
      ? "Ne manque pas le prochain email !"
      : "Don't miss the next email!";

  return (
    <div {...props} className={clsx("card", styles.subscribeFormEmbed, props)}>
      <p>
        <strong>{text}</strong>
      </p>
      <SubscribeForm />
      <div>{testimonial}</div>
    </div>
  );
}
