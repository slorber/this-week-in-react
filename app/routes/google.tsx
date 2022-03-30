import Index, { createActionFunction, createMeta } from "./index";
import { MetaFunction } from "remix";

const GoogleTracker = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-224278710-1');
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
      <Index onSubscribe={(email) => {}} />
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=UA-224278710-1"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: GoogleTracker,
        }}
      />
    </>
  );
}
