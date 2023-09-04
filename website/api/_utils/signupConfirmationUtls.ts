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
  email: string | null;
  subscriberId: string | null;

  ip: string | null;
  userAgent: string | null;

  initial: {
    referrer: string | null;
    url: string | null;
  };

  adClickIds: {
    twitter: string | null;
    reddit: string | null;
    facebook: string | null;
    google: string | null;
  };
};

async function getSubscriberOrError(subscriberId: string) {}

// TODO Zod validation schema
export function readSignupConfirmationParams(
  request: VercelRequest
): SignupConfirmationParams {
  // The TWIR query is provided as query=EncodedQuery
  // Otherwise the api call gets blocked by AdBlock Plus
  const query = new URLSearchParams(String(request.query.query ?? ""));

  const email = query.get("email");
  const subscriberId: string | null = query.get("ck_subscriber_id");

  // See https://vercel.com/docs/edge-network/headers
  const xForwardedFor =
    typeof request.headers["x-forwarded-for"] === "string"
      ? request.headers["x-forwarded-for"]
      : null;

  // See https://vercel.com/docs/edge-network/headers#x-forwarded-for
  const ip = (xForwardedFor || request.socket.remoteAddress) ?? null;
  const userAgent = request.headers["user-agent"] ?? null;

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
