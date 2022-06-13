import Index, { createActionFunction, createMeta } from "./index";
import { MetaFunction } from "remix";

// https://www.quora.com/ads/pixel?id=527765582369419
const QuoraTracker = `
!function(q,e,v,n,t,s){if(q.qp) return; n=q.qp=function(){n.qp?n.qp.apply(n,arguments):n.queue.push(arguments);}; n.queue=[];t=document.createElement(e);t.async=!0;t.src=v; s=document.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t,s);}(window, 'script', 'https://a.quora.com/qevents.js');
qp('init', '61259a9129024da99de9c2af9aa30067');
qp('track', 'ViewContent');
`;

declare global {
  interface Window {
    qp: any;
  }
}

export const meta: MetaFunction = createMeta({
  // TODO ?
});

export const action = createActionFunction({
  source: "quora",
});

export default function IndexQuora() {
  return (
    <>
      <Index
        onSubscribe={(email) => {
          window.qp("track", "CompleteRegistration");
        }}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: QuoraTracker,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://q.quora.com/_/ad/61259a9129024da99de9c2af9aa30067/pixel?tag=ViewContent&noscript=1"
        />
      </noscript>
    </>
  );
}
