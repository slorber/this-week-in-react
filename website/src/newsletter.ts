// TODO currently hardcoded in some places
export const sponsorshipCalendarLink = "https://thisweekinreact.com/calendar";

export const testimonialsLink = "https://thisweekinreact.com/testimonials";

// TODO automate this!
export const lastIssueLink = "/newsletter/171";

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
  subscribersCount: 29324,
  openRate: 55,
  clickRate: 13,
};

const fr: NewsletterSegment = {
  name: "French",
  subscribersCount: 4082,
  openRate: 55,
  clickRate: 13,
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
  openRate: 55,
  clickRate: 14,

  // TODO improve this!
  nextMainSlot: {
    date: "May 2024",
    projectedAudienceSize: 39000,
  },
  nextSecondSlot: {
    date: "May 2023",
    projectedAudienceSize: 39000,
  },
};

export const newsletterStats: Newsletter = {
  all,
  en,
  fr,
  growthPerMonth,
};
