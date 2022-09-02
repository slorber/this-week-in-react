import React, { ReactNode } from "react";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import styles from "./index.module.css";
import clsx from "clsx";
import { newsletterStats, NewsletterSegment } from "@site/src/newsletter";
import { AllQuotes } from "@site/src/pages/_homepage/quotes";

export default function SponsoringTabs({ children }) {
  const array = React.Children.toArray(children);
  if (array.length !== 3) {
    throw new Error(
      "Bad SponsoringTabs children array length of " + array.length
    );
  }
  const [all, en, fr] = array;
  return (
    <div className={clsx("card", styles.tabs)}>
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
    </div>
  );
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

function SponsoringTabsFirstSponsorHeader({ count }: { count: number }) {
  return (
    <>
      <div>
        <b>Audience size</b>: ~{count}
      </div>
      <div>
        <b>Price:</b>
      </div>
    </>
  );
}

export function SponsoringTabsFirstSponsor() {
  return (
    <SponsoringTabs>
      <>
        <SponsoringTabsFirstSponsorHeader
          count={newsletterStats.all.subscribersCount}
        />
        <ul>
          <li>
            <b>1 issue</b>: 450€
          </li>
          <li>
            <b>4 issues</b>: 1000€
          </li>
          <li>
            <b>8 issues</b>: 1800€
          </li>
        </ul>
      </>
      <>
        <SponsoringTabsFirstSponsorHeader
          count={newsletterStats.en.subscribersCount}
        />
        <ul>
          <li>
            <b>1 issue</b>: 300€
          </li>
          <li>
            <b>4 issues</b>: 600€
          </li>
          <li>
            <b>8 issues</b>: 1100€
          </li>
        </ul>
      </>
      <>
        <SponsoringTabsFirstSponsorHeader
          count={newsletterStats.fr.subscribersCount}
        />
        <ul>
          <li>
            <b>1 issue</b>: 250€
          </li>
          <li>
            <b>4 issues</b>: 550€
          </li>
          <li>
            <b>8 issues</b>: 1000€
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
        <SponsoringTabsFirstSponsorHeader
          count={newsletterStats.all.subscribersCount}
        />
        <ul>
          <li>
            <b>1 issue</b>: 400€
          </li>
          <li>
            <b>4 issues</b>: 900€
          </li>
          <li>
            <b>8 issues</b>: 1600€
          </li>
        </ul>
      </>
      <>
        <SponsoringTabsFirstSponsorHeader
          count={newsletterStats.en.subscribersCount}
        />
        <ul>
          <li>
            <b>1 issue</b>: 250€
          </li>
          <li>
            <b>4 issues</b>: 550€
          </li>
          <li>
            <b>8 issues</b>: 1000€
          </li>
        </ul>
      </>
      <>
        <SponsoringTabsFirstSponsorHeader
          count={newsletterStats.fr.subscribersCount}
        />
        <ul>
          <li>
            <b>1 issue</b>: 200€
          </li>
          <li>
            <b>4 issues</b>: 500€
          </li>
          <li>
            <b>8 issues</b>: 850€
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
        <SponsoringTabsFirstSponsorHeader
          count={newsletterStats.all.subscribersCount}
        />
        <ul>
          <li>
            <b>1 issues</b>: 🚫 N/A
          </li>
          <li>
            <b>4 issues</b>: 500€
          </li>
          <li>
            <b>8 issues</b>: 800€
          </li>
          <li>
            <b>12 issues</b>: 1000€
          </li>
        </ul>
      </>
      <>
        <SponsoringTabsFirstSponsorHeader
          count={newsletterStats.en.subscribersCount}
        />
        <ul>
          <li>
            <b>1 issues</b>: 🚫 N/A
          </li>
          <li>
            <b>4 issues</b>: 300€
          </li>
          <li>
            <b>8 issues</b>: 500€
          </li>
          <li>
            <b>12 issues</b>: 700€
          </li>
        </ul>
      </>
      <>
        <SponsoringTabsFirstSponsorHeader
          count={newsletterStats.fr.subscribersCount}
        />
        <ul>
          <li>
            <b>1 issues</b>: 🚫 N/A
          </li>
          <li>
            <b>4 issues</b>: 300€
          </li>
          <li>
            <b>8 issues</b>: 500€
          </li>
          <li>
            <b>12 issues</b>: 700€
          </li>
        </ul>
      </>
    </SponsoringTabs>
  );
}
