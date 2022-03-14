export { action, meta } from "./index";
import Index from "./index";

const RedditTracker = `
!function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};p.callQueue=[];var t=d.createElement("script");t.src="https://www.redditstatic.com/ads/pixel.js",t.async=!0;var s=d.getElementsByTagName("script")[0];s.parentNode.insertBefore(t,s)}}(window,document);rdt('init','t2_u97lv');rdt('track', 'PageVisit');
`;

declare global {
  interface Window {
    rdt: any;
  }
}

export default function IndexReddit() {
  return (
    <>
      <Index
        onSubscribe={(email) => {
          window.rdt("track", "SignUp");
        }}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: RedditTracker,
        }}
      />
    </>
  );
}
