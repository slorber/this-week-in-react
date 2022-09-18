// TODO currently hardcoded in some places
export const sponsorshipCalendarLink = "https://thisweekinreact.com/calendar";

// TODO automate this!
export const lastIssueLink = "/newsletter/115";

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
  subscribersCount: 7884,
  openRate: 58,
  clickRate: 34,
};

const fr: NewsletterSegment = {
  name: "French",
  subscribersCount: 3010,
  openRate: 55,
  clickRate: 25,
};

const all: NewsletterSegment = {
  name: "All",
  subscribersCount: fr.subscribersCount + en.subscribersCount,
  openRate: 55,
  clickRate: 32,
};

export const newsletterStats: Newsletter = {
  all,
  en,
  fr,
};
