import TwitterLite from "@slorber/twitter-lite";
import crypto from "crypto";
import {
  readEnvVariable,
  SignupConfirmationParams,
} from "./signupConfirmationUtls";

function sha256(input) {
  return crypto.createHash("sha256").update(input).digest("hex");
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

export async function reportTwitterAdsSignup(
  twclid: string,
  signupConfirmation: SignupConfirmationParams
) {
  const { email } = signupConfirmation;
  try {
    const PixelId = "o85l6";
    const ConversionEventId = "tw-o85l6-od5nc";
    console.log("");
    console.log("[Twitter Ads] reportTwitterAdsSignup attempt", {
      twclid,
      email,
      signupConfirmation,
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
    console.log("[Twitter Ads] reportTwitterAdsSignup success", {
      twclid,
      email,
      request: result.request,
      data: result.data,
    });
  } catch (e) {
    console.error("[Twitter Ads] reportTwitterAdsSignup failure", e);
    throw new Error(
      `Could not post twitter conversion result for twclid=${twclid} email=${email} => ${e?.message}`
    );
  }
}