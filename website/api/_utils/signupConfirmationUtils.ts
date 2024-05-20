import type { VercelRequest } from "@vercel/node";
import { mergeParams } from "./common-utils";
import { fetchSubscriberById, Subscriber } from "./convertkit";

export type SignupConfirmationParams = {
  // In theory, subscriberId is supposed to always be provided by ConvertKit as QueryString param
  subscriberId: string | null;

  // Subscriber is provided if subscriberId is provided
  subscriber: Subscriber | null;

  // Email is provided most of the time as ConvertKit param that has been persisted in localStorage
  // But there are edge cases where this can't be sent in QS
  //
  // Ex: FB/Instagram ads will open landing pages an in-app browser, using a different localStorage space
  // And ConvertKit only includes the email QS on "confirm your email" page, but not on "thanks for subscribing" page :/

  // Hard lesson learned: don't rely exclusively on QS params to get the email address
  // It is safer fetch the email address, and other ad click ids, from the ConvertKit API using the subscriberId
  email: string | null;

  ip: string | null;
  userAgent: string | null;

  initial: {
    referrer: string | null;
    url: string | null;
  };

  // convenient for logging/debugging but should probably not be read directly?
  params: Record<string, string>;

  adClickIds: {
    twitter: string | null;
    reddit: string | null;
    facebook: string | null;
    google: string | null;
  };
};

async function getSubscriberOrError({
  subscriberId,
  email,
}: {
  subscriberId: string | null;
  email: string | null;
}): Promise<[Subscriber, null] | [null, Error]> {
  // TODO we should also try to fetch from the API using the email?

  if (!subscriberId) {
    return [
      null,
      new Error(
        "Can't get newsletter subscriber because subscriberId was not provided",
      ),
    ];
  }

  try {
    const subscriber = await fetchSubscriberById(subscriberId);
    return [subscriber, null];
  } catch (error) {
    return [null, error as Error];
  }
}

// The TWIR query is provided as query=EncodedQuery
// Otherwise the api call gets blocked by AdBlock Plus
function parseRequestParams(request: VercelRequest) {
  const params = new URLSearchParams(String(request.query.query ?? ""));
  const email = params.get("email");
  const subscriberId = params.get("ck_subscriber_id");
  return { params, email, subscriberId };
}

// Email is provided most of the time as ConvertKit QS param that has been persisted in localStorage
// Note: email is only provided if configured in the configured CK form UI, there's a checkbox we assume is checked here
// But even when checked, there are edge cases where this can't be sent in QS
//
// Ex: FB/Instagram ads will open landing pages an in-app browser, using a different localStorage space
// And ConvertKit only includes the email QS on "confirm your email" page, but not on "thanks for subscribing" page :/
// Hard lesson learned: don't rely exclusively on QS params to get the email address
// It is safer fetch the email address, and other ad click ids, from the ConvertKit API using the subscriberId
function mergeSubscriberParams(
  subscriber: Subscriber,
  params: URLSearchParams,
): URLSearchParams {
  const subscriberParams = subscriber.fields["qs_params"];
  if (subscriberParams) {
    return mergeParams([
      new URLSearchParams(subscriberParams), // Subscriber params first: fallback values
      params,
    ]);
  }
  return params;
}

async function parseRequest(request: VercelRequest) {
  const urlQuery = parseRequestParams(request);

  // We fetch the subscriber from ConvertKit API because url QS params are not 100% reliable
  // CF the case of Instagram ads, due to opening in in-app browser
  // IE the full instagram ads signup flow on mobile usually involves 2 different browsers (in-app vs regular)
  const [subscriber, error] = await getSubscriberOrError({
    subscriberId: urlQuery.subscriberId,
    email: urlQuery.email,
  });

  if (error) {
    console.error(
      `Unable to get ConvertKit subscriber with subscriberId=${urlQuery.subscriberId} or email=${urlQuery.email}`,
      error,
    );
  }

  // Merge url params with subscriber params, if possible
  const params = subscriber
    ? mergeSubscriberParams(subscriber, urlQuery.params)
    : urlQuery.params;

  return {
    params,
    subscriberId: urlQuery.subscriberId ?? String(subscriber?.id) ?? null,
    email: urlQuery.email ?? subscriber?.["email_address"] ?? null,
    subscriber,
  };
}

function parseRequestUserAgent(request: VercelRequest): string | null {
  return request.headers["user-agent"] ?? null;
}

function parseRequestIP(request: VercelRequest): string | null {
  // See https://vercel.com/docs/edge-network/headers
  const xForwardedFor =
    typeof request.headers["x-forwarded-for"] === "string"
      ? request.headers["x-forwarded-for"]
      : null;

  // See https://vercel.com/docs/edge-network/headers#x-forwarded-for
  return (xForwardedFor || request.socket.remoteAddress) ?? null;
}

// TODO Zod validation schema
export async function readSignupConfirmationParams(
  request: VercelRequest,
): Promise<SignupConfirmationParams> {
  const { params, subscriberId, email, subscriber } =
    await parseRequest(request);

  const userAgent = parseRequestUserAgent(request);
  const ip = parseRequestIP(request);

  const initial = {
    referrer: params.get("initial_referrer"),
    url: params.get("initial_url"),
  };

  const adClickIds = {
    twitter: params.get("twclid"),
    reddit: params.get("rdt_cid"),
    google: params.get("gclid"),
    facebook: params.get("fbclid"),
  };

  const paramsObject = Object.fromEntries(params.entries());

  return {
    email,
    subscriberId,
    subscriber,
    ip,
    userAgent,
    initial,
    params: paramsObject,
    adClickIds,
  };
}
