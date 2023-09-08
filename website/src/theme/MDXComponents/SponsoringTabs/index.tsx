import React, { ReactNode } from "react";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import styles from "./index.module.css";
import clsx from "clsx";
import {
  newsletterStats,
  NewsletterSegment,
  NextSlot,
} from "@site/src/newsletter";
import { AllQuotes } from "@site/src/pages/_homepage/quotes";

export default function SponsoringTabs({ children }) {
  const array = React.Children.toArray(children);
  if (array.length !== 1 && array.length !== 3) {
    throw new Error(
      "Bad SponsoringTabs children array length of " + array.length
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

export function SponsoringTabsStats() {
  return (
    <SponsoringTabs>
      <>
        <ul>
          <li>
            <b>Subscribers count</b>:{" "}
            <span>{newsletterStats.all.subscribersCount}</span> (🇬🇧
            {newsletterStats.en.subscribersCount} + 🇫🇷
            {newsletterStats.fr.subscribersCount})
          </li>
          <li>
            <b>Monthly growth</b>:{" "}
            <span>+{newsletterStats.growthPerMonth}</span>
          </li>
          <li>
            <b>Open-rate</b>: <span>{newsletterStats.all.openRate}%</span>
          </li>
          <li>
            <b>Click-rate</b>: <span>{newsletterStats.all.clickRate}%</span>
          </li>
        </ul>
        <span>
          <b>
            <a href="https://thisweekinreact.com/ck">ConvertKit</a> email
            provider screenshot
          </b>
          {" (February 2023)"}
        </span>

        <img
          alt="screenshot"
          src="https://user-images.githubusercontent.com/749374/223171660-1fe93f8a-e67d-48c1-94ad-d0c6a1afed29.png"
        />
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
        {AllQuotes.en.addyosmani}
        {AllQuotes.en.jackherrington}
        {AllQuotes.en.wcandillon}
        {AllQuotes.en.tkdodo}
        {AllQuotes.en.evanbacon}
        {AllQuotes.en.threepointone}
        {AllQuotes.en.yangshunz}
      </SponsoringTabsTestimonialsTabItem>
    </SponsoringTabs>
  );
}

function SponsoringHeader({
  count,
  nextSlot,
}: {
  count: number;
  nextSlot?: NextSlot;
}) {
  return (
    <>
      <div>
        <b>Audience size</b>: ~{count}
      </div>
      {nextSlot && (
        <div>
          <b>Next availability</b>: {nextSlot.date} -{" "}
          <b>Projected audience size</b>: ~{nextSlot.projectedAudienceSize}
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
            <b>1 issue</b>: 1000€
          </li>
          <li>
            <b>4 issues</b>: 3300€ <RecommendedOffer />
          </li>
          <li>
            <b>8 issues</b>: 5700€
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
            <b>1 issue</b>: 600€
          </li>
          <li>
            <b>4 issues</b>: 1600€ <RecommendedOffer />
          </li>
          <li>
            <b>8 issues</b>: 3000€
          </li>
        </ul>
      </>
    </SponsoringTabs>
  );
}

export function SponsoringTabsJobSponsor() {
  return (
    <SponsoringTabs>
      <>
        <SponsoringHeader count={newsletterStats.all.subscribersCount} />
        <ul>
          <li>
            <b>4 issues</b>: 350€
          </li>
          <li>
            <b>8 issues</b>: 500€ <RecommendedOffer />
          </li>
          <li>
            <b>12 issues</b>: 650€
          </li>
        </ul>
      </>
    </SponsoringTabs>
  );
}
