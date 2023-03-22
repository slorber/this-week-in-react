// TODO currently hardcoded in some places
export const sponsorshipCalendarLink = "https://thisweekinreact.com/calendar";

export const testimonialsLink = "https://thisweekinreact.com/testimonials";

// TODO automate this!
export const lastIssueLink = "/newsletter/139";

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
  subscribersCount: 15305,
  openRate: 58,
  clickRate: 14,
};

const fr: NewsletterSegment = {
  name: "French",
  subscribersCount: 3501,
  openRate: 57,
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
  openRate: 58,
  clickRate: 14,

  // TODO improve this!
  nextMainSlot: {
    date: "December 2023",
    projectedAudienceSize: subscribersCount + 8 * growthPerMonth,
  },
  nextSecondSlot: {
    date: "May 2023",
    projectedAudienceSize: subscribersCount + 2 * growthPerMonth,
  },
};

export const newsletterStats: Newsletter = {
  all,
  en,
  fr,
  growthPerMonth,
};
