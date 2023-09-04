import { next, ipAddress, geolocation } from "@vercel/edge";
import type { RequestContext } from "@vercel/edge";

// Vercel edge middleware
// See https://vercel.com/docs/functions/edge-middleware

export const config = {
  matcher: "/", // TODO temp
};

export default function middleware(request: Request, context: RequestContext) {
  const { country } = geolocation(request);
  const ip = ipAddress(request);

  if (country) {
    console.log(`Vercel identified homepage visitor from country=${country}`);
  }

  return next();
}
