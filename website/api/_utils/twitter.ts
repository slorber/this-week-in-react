import TwitterLite from "@slorber/twitter-lite";
import { SignupConfirmationParams } from "./signupConfirmationUtils";

import { readEnvVariable, sha256 } from "./common-utils";

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
  signupConfirmation: SignupConfirmationParams,
) {
  // TODO implicit assumption
  // Use TS 5.1 + type-fest SetNonNullable<SignupConfirmationParams,"email">
  const email = signupConfirmation.email!;
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
      },
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
      `Could not post twitter conversion result for twclid=${twclid} email=${email} => ${
        (e as Error)?.message
      }`,
    );
  }
}
