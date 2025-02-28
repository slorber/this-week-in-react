import { next, ipAddress, geolocation } from "@vercel/edge";
import type { RequestContext } from "@vercel/edge";

// Vercel edge middleware
// See https://vercel.com/docs/functions/edge-middleware

export const config = {
  matcher: "/", // TODO temp
};

const BlacklistedIps = [
  // "86.77.184.19", // remove, it's me

  // Ips from Feb 2025 fake subscriber attacks
  "134.202.152",
  "134.202.160",
  "139.190.242",
  "139.190.243",
  "66.97.121",
];

function isBlacklistedIp(ip: string) {
  return BlacklistedIps.some((blacklistedIp) => ip.startsWith(blacklistedIp));
}

// See https://vercel.com/docs/functions/edge-middleware/middleware-api
export default function middleware(request: Request, context: RequestContext) {
  const { country } = geolocation(request);
  const ip = ipAddress(request);

  if (country) {
    console.log(`Vercel identified homepage visitor from country=${country}`);
  }

  if (isBlacklistedIp(ip)) {
    console.log(`[SPAMMER] Blacklisted ip ${ip}`);
    return new Response("Spammer go to hell", {
      status: 200,
    });
  }

  return next();
}
