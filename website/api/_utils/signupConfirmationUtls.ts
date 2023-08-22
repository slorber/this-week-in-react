import type { VercelRequest } from "@vercel/node";

export function readEnvVariable(name: string) {
  const value = process.env[name];
  if (typeof value === "undefined") {
    throw new Error(
      `Missing env variable value for ${name} and no default value fallback provided`
    );
  }
  return value;
}

export type SignupConfirmationParams = {
  email: string;
  subscriberId: string;

  ip: string;
  userAgent: string;

  initial: {
    referrer: string;
    url: string;
  };

  adClickIds: {
    twitter?: string;
    reddit?: string;
    facebook?: string;
    google?: string;
  };
};

// TODO Zod validation schema
export function readSignupConfirmationParams(
  request: VercelRequest
): SignupConfirmationParams {
  // The TWIR query is provided as query=EncodedQuery
  // Otherwise the api call gets blocked by AdBlock Plus
  const query = new URLSearchParams(String(request.query.query ?? ""));

  const email = query.get("email");
  const subscriberId = query.get("ck_subscriber_id");

  const xForwardedFor =
    typeof request.headers["x-forwarded-for"] === "string"
      ? request.headers["x-forwarded-for"]
      : null;

  // See https://vercel.com/docs/edge-network/headers#x-forwarded-for
  const ip = xForwardedFor || request.socket.remoteAddress;
  const userAgent = request.headers["user-agent"];

  const initial = {
    referrer: query.get("initial_referrer"),
    url: query.get("initial_url"),
  };

  const adClickIds = {
    twitter: query.get("twclid"),
    reddit: query.get("rdt_cid"),
    google: query.get("gclid"),
    facebook: query.get("fbclid"),
  };

  return {
    email,
    subscriberId,
    ip,
    userAgent,
    initial,
    adClickIds,
  };
}
