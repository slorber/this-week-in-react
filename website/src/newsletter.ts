// TODO currently hardcoded in some places
export const sponsorshipCalendarLink = "https://thisweekinreact.com/calendar";

// TODO automate this!
export const lastIssueLink = "/newsletter/132";

export type NewsletterSegment = {
  name: string;
  subscribersCount: number;
  openRate: number;
  clickRate: number;
};

export type Newsletter = {
  fr: NewsletterSegment;
  en: NewsletterSegment;
  all: NewsletterSegment & NewsletterFuture;
};

// TODO temporary hardcoded estimates

const en: NewsletterSegment = {
  name: "English",
  subscribersCount: 12921,
  openRate: 58,
  clickRate: 14,
};

const fr: NewsletterSegment = {
  name: "French",
  subscribersCount: 3342,
  openRate: 56,
  clickRate: 14,
};

export type NextSlot = {
  date: string;
  projectedAudienceSize: number;
};

// TODO refactor
export type NewsletterFuture = {
  nextMainSlot: NextSlot;
  nextSecondSlot: NextSlot;
};

const subscribersCount = fr.subscribersCount + en.subscribersCount;

const growthPerMonth = 1500;

const all: NewsletterSegment & NewsletterFuture = {
  name: "All",
  subscribersCount,
  openRate: 58,
  clickRate: 14,

  // TODO improve this!
  nextMainSlot: {
    date: "July 2023",
    projectedAudienceSize: subscribersCount + 6 * growthPerMonth,
  },
  nextSecondSlot: {
    date: "May 2023",
    projectedAudienceSize: subscribersCount + 4 * growthPerMonth,
  },
};

export const newsletterStats: Newsletter = {
  all,
  en,
  fr,
};
