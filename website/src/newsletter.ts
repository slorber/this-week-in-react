// TODO currently hardcoded in some places
export const sponsorshipCalendarLink = "https://thisweekinreact.com/calendar";

export const testimonialsLink = "https://thisweekinreact.com/testimonials";

// TODO automate this!
export const lastIssueLink = "/newsletter/179";

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
  subscribersCount: 32424,
  openRate: 54,
  clickRate: 12,
};

const fr: NewsletterSegment = {
  name: "French",
  subscribersCount: 4282,
  openRate: 54,
  clickRate: 12,
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
  openRate: 54,
  clickRate: 12,

  // TODO improve this!
  nextMainSlot: {
    date: "August 2024",
    projectedAudienceSize: 42000,
  },
  nextSecondSlot: {
    date: "August 2023",
    projectedAudienceSize: 42000,
  },
};

export const newsletterStats: Newsletter = {
  all,
  en,
  fr,
  growthPerMonth,
};
