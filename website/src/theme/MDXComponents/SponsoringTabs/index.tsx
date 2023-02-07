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

function SponsoringTabsStatsTab({
  segment,
  children,
}: {
  segment: NewsletterSegment;
  children: ReactNode;
}) {
  // TODO i18n
  return (
    <>
      <ul>
        <li>
          <b>Subscribers count</b>: <span>{segment.subscribersCount}</span>
        </li>
        <li>
          <b>Open-rate</b>: <span>{segment.openRate}%</span>
        </li>
        <li>
          <b>Click-rate</b>: <span>{segment.clickRate}%</span>
        </li>
      </ul>
      {children}
    </>
  );
}

export function SponsoringTabsStats() {
  return (
    <SponsoringTabs>
      <SponsoringTabsStatsTab segment={newsletterStats.all}>
        <img
          alt="en screenshot"
          src="https://user-images.githubusercontent.com/749374/148784977-26dabc23-c4c5-4879-859f-45072b0c4d31.png"
        />
      </SponsoringTabsStatsTab>
      <SponsoringTabsStatsTab segment={newsletterStats.en}>
        <img
          alt="en screenshot"
          src="https://user-images.githubusercontent.com/749374/148784977-26dabc23-c4c5-4879-859f-45072b0c4d31.png"
        />
      </SponsoringTabsStatsTab>
      <SponsoringTabsStatsTab segment={newsletterStats.fr}>
        <img
          alt="en screenshot"
          src="https://user-images.githubusercontent.com/749374/148398533-eee3aab1-6916-4a55-b5ed-fa3ef1c42063.png"
        />
      </SponsoringTabsStatsTab>
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
        {AllQuotes.en.threepointone}
        {AllQuotes.en.NoriSte}
        {AllQuotes.en.yangshunz}
        {AllQuotes.en.wcandillon}
        {AllQuotes.fr.lauthieb}
        {AllQuotes.fr.xavier_seignard}
      </SponsoringTabsTestimonialsTabItem>
      <SponsoringTabsTestimonialsTabItem>
        {AllQuotes.en.johnnyreilly}
        {AllQuotes.en.ane_naiz}
        {AllQuotes.en.Jonsamp}
        {AllQuotes.en.fredmaiaarantes}
        {AllQuotes.en.mcavaliere}
        {AllQuotes.en.ericclemmons}
      </SponsoringTabsTestimonialsTabItem>
      <SponsoringTabsTestimonialsTabItem>
        {AllQuotes.fr.lauthieb}
        {AllQuotes.fr.xavier_seignard}
        {AllQuotes.fr.lereacteurIO}
        {AllQuotes.fr.dbuchet}
        {AllQuotes.fr.sylvainpauly}
        {AllQuotes.fr.pierver}
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
            <b>1 issue</b>: 800€
          </li>
          <li>
            <b>4 issues</b>: 1800€ <RecommendedOffer />
          </li>
          <li>
            <b>8 issues</b>: 3200€
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
            <b>1 issue</b>: 700€
          </li>
          <li>
            <b>4 issues</b>: 1400€ <RecommendedOffer />
          </li>
          <li>
            <b>8 issues</b>: 2400€
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
            <b>1 issues</b>: 200€
          </li>
          <li>
            <b>4 issues</b>: 600€
          </li>
          <li>
            <b>8 issues</b>: 800€ <RecommendedOffer />
          </li>
          <li>
            <b>12 issues</b>: 1100€
          </li>
        </ul>
      </>
      <>
        <SponsoringHeader count={newsletterStats.en.subscribersCount} />
        <ul>
          <li>
            <b>1 issues</b>: 150€
          </li>
          <li>
            <b>4 issues</b>: 500€
          </li>
          <li>
            <b>8 issues</b>: 650€ <RecommendedOffer />
          </li>
          <li>
            <b>12 issues</b>: 800€
          </li>
        </ul>
      </>
      <>
        <SponsoringHeader count={newsletterStats.fr.subscribersCount} />
        <ul>
          <li>
            <b>1 issues</b>: 200€
          </li>
          <li>
            <b>4 issues</b>: 340€
          </li>
          <li>
            <b>8 issues</b>: 520€ <RecommendedOffer />
          </li>
          <li>
            <b>12 issues</b>: 720€
          </li>
        </ul>
      </>
    </SponsoringTabs>
  );
}
