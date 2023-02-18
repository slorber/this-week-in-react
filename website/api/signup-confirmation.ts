import type { VercelRequest, VercelResponse } from "@vercel/node";

import TwitterLite from "@slorber/twitter-lite";
import crypto from "crypto";

function sha256(input) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

function readEnvVariable(name: string) {
  const value = process.env[name];
  if (typeof value === "undefined") {
    throw new Error(
      `Missing env variable value for ${name} and no default value fallback provided`
    );
  }
  return value;
}

const TwitterLiteClient = new TwitterLite({
  subdomain: "ads-api",
  version: "11",
  extension: false,
  consumer_key: readEnvVariable("TWIR_TWITTER_API_KEY"),
  consumer_secret: readEnvVariable("TWIR_TWITTER_API_SECRET"),
  access_token_key: readEnvVariable("TWIR_TWITTER_ACCESS_TOKEN"),
  access_token_secret: readEnvVariable("TWIR_TWITTER_ACCESS_TOKEN_SECRET"),
});

async function handleTwitterAds({
  twclid,
  email,
}: {
  twclid: string;
  email?: string;
}) {
  try {
    const PixelId = "o85l6";
    const ConversionEventId = "tw-o85l6-od5nc";
    console.log("");
    console.log("[Twitter Ads] postTwitterConversion attempt", {
      twclid,
      email,
    });
    const result = await TwitterLiteClient.post(
      `measurement/conversions/${PixelId}`,
      {
        conversions: [
          {
            conversion_time: new Date().toISOString(),
            event_id: ConversionEventId,
            identifiers: [
              {
                twclid,
              },
              email && {
                hashed_email: sha256(email),
              },
            ].filter(Boolean),
            conversion_id: `${twclid}_${email}`, // Used for conversion deduplication? to improve?
            description: "TWIR subscription",
          },
        ],
      }
    );
    console.log("[Twitter Ads] postTwitterConversion success", {
      twclid,
      email,
      request: result.request,
      data: result.data,
    });
  } catch (e) {
    console.error("[Twitter Ads] postTwitterConversion failure", e);
    throw new Error(
      `Could not post twitter conversion result for twclid=${twclid} email=${email} => ${e?.message}`
    );
  }
}

// The TWIR query is provided as query=EncodedQuery
// Otherwise the api call gets blocked by AdBlock Plus
function readQueryParams(request: VercelRequest) {
  return new URLSearchParams(String(request.query.query ?? ""));
}

async function handleQuery(query: URLSearchParams) {
  const twclid = query.get("twclid");
  const rdt_cid = query.get("rdt_cid");
  const gclid = query.get("gclid");
  const email = query.get("email");
  const ck_subscriber_id = query.get("ck_subscriber_id");

  // Twitter Ads
  if (twclid) {
    await handleTwitterAds({ twclid, email });
  }
  // Reddit Ads
  if (rdt_cid) {
    console.log("[Reddit Ads]", { rdt_cid, email });
  }
  // Google Ads
  if (gclid) {
    console.log("[Google Ads]", { gclid, email });
  }
}

export default async function signupConfirmationHandler(
  request: VercelRequest,
  response: VercelResponse
) {
  const query = readQueryParams(request);
  console.log("/api/signup-confirmation", query);

  await handleQuery(query);

  response.status(200).json({
    message: "OK",
  });
}
