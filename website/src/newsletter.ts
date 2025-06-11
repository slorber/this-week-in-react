// TODO currently hardcoded in some places
export const sponsorshipCalendarLink = "https://thisweekinreact.com/calendar";

export const testimonialsLink = "https://thisweekinreact.com/testimonials";

// TODO automate this!
export const lastIssueLink = "/newsletter/238";

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
  subscribersCount: 39225,
  openRate: 53,
  clickRate: 11,
};

const fr: NewsletterSegment = {
  name: "French",
  subscribersCount: 4329,
  openRate: 50,
  clickRate: 11,
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
  openRate: 50,
  clickRate: 11,

  // TODO improve this!
  nextMainSlot: {
    date: "July 2025",
    projectedAudienceSize: 45000,
  },
  nextSecondSlot: {
    date: "May 2025",
    projectedAudienceSize: 45000,
  },
};

export const newsletterStats: Newsletter = {
  all,
  en,
  fr,
  growthPerMonth,
};
