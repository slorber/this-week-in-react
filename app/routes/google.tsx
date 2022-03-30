import Index, { createActionFunction, createMeta } from "./index";
import { MetaFunction } from "remix";

// Global site tag (gtag.js) - Google Ads: 10876347443
const GoogleTracker = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'AW-10876347443');
`;

declare global {
  interface Window {
    gtag: any;
  }
}

export const meta: MetaFunction = createMeta({
  // TODO ?
});

export const action = createActionFunction({
  source: "twitter",
});

export default function IndexTwitter() {
  return (
    <>
      <Index
        onSubscribe={(email) => {
          window.gtag("event", "conversion", {
            send_to: "AW-10876347443/tOVbCLiFq64DELPIn8Io",
          });
        }}
      />
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=AW-10876347443"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: GoogleTracker,
        }}
      />
    </>
  );
}
