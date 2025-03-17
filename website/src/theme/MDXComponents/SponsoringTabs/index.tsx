import React, { ReactNode } from "react";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import Details from "@theme/Details";
import styles from "./index.module.css";
import clsx from "clsx";
import {
  newsletterStats,
  NewsletterSegment,
  NextSlot,
} from "@site/src/newsletter";
import Prices from "@site/src/prices";
import { AllQuotes } from "@site/src/pages/_homepage/quotes";

export default function SponsoringTabs({ children }) {
  const array = React.Children.toArray(children);
  if (array.length !== 1 && array.length !== 3) {
    throw new Error(
      "Bad SponsoringTabs children array length of " + array.length,
    );
  }
  const [all, en, fr] = array;

  // TODO refactor this temporary change
  const content =
    array.length === 1 ? (
      all
    ) : (
      <Tabs groupId="sponsoring-tabs">
        <TabItem
          value="all"
          label="All"
          default
          attributes={{ className: styles.tab }}
        >
          {all}
        </TabItem>
        <TabItem
          value="en"
          label="🇬🇧 English"
          attributes={{ className: styles.tab }}
        >
          {en}
        </TabItem>
        <TabItem
          value="fr"
          label="🇫🇷 French"
          attributes={{ className: styles.tab }}
        >
          {fr}
        </TabItem>
      </Tabs>
    );
  return <div className={clsx("card", styles.tabs)}>{content}</div>;
}

export function SponsoringTabsStats({ children }: { children: ReactNode }) {
  return (
    <SponsoringTabs>
      <>
        <ul>
          <li>
            <b>Subscribers count</b>:{" "}
            <span>{newsletterStats.all.subscribersCount}</span>
          </li>
          <li>
            <b>Monthly growth</b>:{" "}
            <span>+~ {newsletterStats.growthPerMonth}</span>
          </li>
          <li>
            <b>Open-rate</b>: <span>{newsletterStats.all.openRate}%</span>
          </li>
          <li>
            <b>Click-rate</b>: <span>{newsletterStats.all.clickRate}%</span>
          </li>
        </ul>
        {children}
      </>
    </SponsoringTabs>
  );
}

export function SponsoringTabsTestimonialsTabItem({
  children,
}: {
  children: ReactNode[];
}) {
  return (
    <>
      {React.Children.map(children, (quote, index) => (
        <div key={index} style={{ marginTop: index === 0 ? "1rem" : "2rem" }}>
          {quote}
        </div>
      ))}
    </>
  );
}
export function SponsoringTabsTestimonials() {
  return (
    <SponsoringTabs>
      <SponsoringTabsTestimonialsTabItem>
        {AllQuotes.en.theo}
        {AllQuotes.en.tkdodo}
        {AllQuotes.en.jackherrington}
        {AllQuotes.en.evanbacon}
        {AllQuotes.en.addyosmani}

        <Details summary={<summary>More testimonials?</summary>}>
          <SponsoringTabsTestimonialsTabItem>
            {AllQuotes.en.wcandillon}
            {AllQuotes.en.threepointone}
            {AllQuotes.en.kzzzf}
            {AllQuotes.en.yangshunz}
            {AllQuotes.en.michal}
            {AllQuotes.en.ericclemmons}
            {AllQuotes.en.johnnyreilly}
            {AllQuotes.en.ane_naiz}
            {AllQuotes.en.asidorenko_}
            {AllQuotes.en.beaussan}
            {AllQuotes.en.elijahmanor}
            {AllQuotes.en.fredmaiaarantes}
          </SponsoringTabsTestimonialsTabItem>
        </Details>
      </SponsoringTabsTestimonialsTabItem>
    </SponsoringTabs>
  );
}

function SponsoringHeader({
  count,
  nextSlot,
}: {
  count?: number;
  nextSlot?: NextSlot;
}) {
  return (
    <>
      {/*}
      {typeof count !== "undefined" ? (
        <div>
          <b>Audience size</b>: ~{count}
        </div>
      ) : null}
      */}
      {nextSlot && (
        <div>
          <b>Next availability</b>: {nextSlot.date}
        </div>
      )}
      {nextSlot && (
        <div>
          <b>Audience size projection</b>: ~{nextSlot.projectedAudienceSize}
        </div>
      )}
      <div>
        <b>Price:</b>
      </div>
    </>
  );
}

const RecommendedOffer = () => (
  <span style={{ color: "red", fontWeight: "bold" }}>(recommended offer)</span>
);

export function SponsoringTabsFirstSponsor() {
  return (
    <SponsoringTabs>
      <>
        <SponsoringHeader
          count={newsletterStats.all.subscribersCount}
          nextSlot={newsletterStats.all.nextMainSlot}
        />
        <ul>
          <li>
            <b>1 issue</b>: {Prices.main.x1}€
          </li>
          <li>
            <b>2 issue</b>: {Prices.main.x2}€
          </li>
          <li>
            <b>4 issues</b>: {Prices.main.x4}€ <RecommendedOffer />
          </li>
          <li>
            <b>8 issues</b>: {Prices.main.x8}€
          </li>
        </ul>
      </>
    </SponsoringTabs>
  );
}

export function SponsoringTabsSecondSponsor() {
  return (
    <SponsoringTabs>
      <>
        <SponsoringHeader
          count={newsletterStats.all.subscribersCount}
          nextSlot={newsletterStats.all.nextSecondSlot}
        />
        <ul>
          <li>
            <b>1 issue</b>: {Prices.second.x1}€
          </li>
          <li>
            <b>2 issue</b>: {Prices.second.x2}€
          </li>
          <li>
            <b>4 issues</b>: {Prices.second.x4}€ <RecommendedOffer />
          </li>
          <li>
            <b>8 issues</b>: {Prices.second.x8}€
          </li>
        </ul>
      </>
    </SponsoringTabs>
  );
}

export function SponsoringTabsQuickLinkSponsor() {
  return (
    <SponsoringTabs>
      <>
        <SponsoringHeader />
        <ul>
          <li>
            <b>⚛️ 4 * React Links</b>
            <>: {Prices.quickLinkReact.x4}€</>
          </li>
          <li>
            <b>📱 4 * React Native Links</b>
            <>{" " + Prices.quickLinkReactNative.x4}€</>
          </li>
        </ul>
      </>
    </SponsoringTabs>
  );
}
