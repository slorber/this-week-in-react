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
  query: URLSearchParams
): SignupConfirmationParams {
  const email = query.get("email");
  const subscriberId = query.get("ck_subscriber_id");

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
    initial,
    adClickIds,
  };
}
