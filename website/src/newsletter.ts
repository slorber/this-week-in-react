// TODO currently hardcoded in some places
export const sponsorshipCalendarLink = "https://thisweekinreact.com/calendar";

export const testimonialsLink = "https://thisweekinreact.com/testimonials";

// TODO automate this!
export const lastIssueLink = "/newsletter/162";

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
  growthPerMonth: number;
};

// TODO temporary hardcoded estimates

const en: NewsletterSegment = {
  name: "English",
  subscribersCount: 23729,
  openRate: 56,
  clickRate: 14,
};

const fr: NewsletterSegment = {
  name: "French",
  subscribersCount: 4000,
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

const growthPerMonth = 1300;

const all: NewsletterSegment & NewsletterFuture = {
  name: "All",
  subscribersCount,
  openRate: 56,
  clickRate: 14,

  // TODO improve this!
  nextMainSlot: {
    date: "December 2023",
    projectedAudienceSize: 31000,
  },
  nextSecondSlot: {
    date: "December 2023",
    projectedAudienceSize: 31000,
  },
};

export const newsletterStats: Newsletter = {
  all,
  en,
  fr,
  growthPerMonth,
};
