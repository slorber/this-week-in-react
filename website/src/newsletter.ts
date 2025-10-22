// TODO currently hardcoded in some places
export const sponsorshipCalendarLink = "https://thisweekinreact.com/calendar";

export const testimonialsLink = "https://thisweekinreact.com/testimonials";

// TODO automate this!
export const lastIssueLink = "/newsletter/255";

///////////////////////////////////////////////

export type NewsletterSegment = {
  name: string;
  subscribersCount: number;
  openRate: number;
  clickRate: number;
};

export type Newsletter = {
  // fr: NewsletterSegment;
  // en: NewsletterSegment;
  all: NewsletterSegment & NewsletterFuture;
  // growthPerMonth: number;
};

export type NextSlot = {
  date: string;
  // projectedAudienceSize: number;
};

// TODO refactor
export type NewsletterFuture = {
  nextMainSlot: NextSlot;
  nextSecondSlot: NextSlot;
};

const all: NewsletterSegment & NewsletterFuture = {
  name: "All",
  subscribersCount: 41097,
  openRate: 56,
  clickRate: 11,

  // TODO improve this!
  nextMainSlot: {
    date: "September 2025",
    // projectedAudienceSize: 45000,
  },
  nextSecondSlot: {
    date: "September 2025",
    // projectedAudienceSize: 45000,
  },
};

export const newsletterStats: Newsletter = {
  all,
};
