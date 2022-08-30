export type NewsletterSegment = {
  name: string;
  subscribersCount: number;
  openRate: number;
  clickRate: number;
};

export type NewsletterStats = {
  fr: NewsletterSegment;
  en: NewsletterSegment;
  all: NewsletterSegment;
};

// TODO temporary hardcoded estimates

const en: NewsletterSegment = {
  name: "English",
  subscribersCount: 7223,
  openRate: 58,
  clickRate: 34,
};

const fr: NewsletterSegment = {
  name: "French",
  subscribersCount: 2960,
  openRate: 55,
  clickRate: 25,
};

const all: NewsletterSegment = {
  name: "All",
  subscribersCount: fr.subscribersCount + en.subscribersCount,
  openRate: 55,
  clickRate: 32,
};

const newsletterStats: NewsletterStats = {
  all,
  en,
  fr,
};

export default newsletterStats;
