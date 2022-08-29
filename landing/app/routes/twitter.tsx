import Index, { createActionFunction, meta } from "./index";

export { meta } from "./index";

const TwitterTracker = `
!function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
},s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='//static.ads-twitter.com/uwt.js',
a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
// Insert Twitter Pixel ID and Standard Event data below
twq('init','o85l6');
`;

// twq('track','Test Newsletter Signup');
// twq('track','PageView');

declare global {
  interface Window {
    twq: any;
  }
}

export const action = createActionFunction({
  source: "twitter",
});

export default function IndexTwitter() {
  return (
    <>
      <Index
        onSubscribe={(email) => {
          // Totally weird Twitter tracking...
          // See https://stackoverflow.com/questions/43937596/are-there-any-different-twitter-pixel-events-than-pageview
          window.twq("track", "PageView");
          // window.twq("track", "SignUp");
        }}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: TwitterTracker,
        }}
      />
    </>
  );
}
