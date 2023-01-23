// TODO currently hardcoded in some places
export const sponsorshipCalendarLink = "https://thisweekinreact.com/calendar";

// TODO automate this!
export const lastIssueLink = "/newsletter/130";

export type NewsletterSegment = {
  name: string;
  subscribersCount: number;
  openRate: number;
  clickRate: number;
};

export type Newsletter = {
  fr: NewsletterSegment;
  en: NewsletterSegment;
  all: NewsletterSegment;
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

const all: NewsletterSegment = {
  name: "All",
  subscribersCount: fr.subscribersCount + en.subscribersCount,
  openRate: 58,
  clickRate: 14,
};

export const newsletterStats: Newsletter = {
  all,
  en,
  fr,
};
