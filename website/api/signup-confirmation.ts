import type { VercelRequest, VercelResponse } from "@vercel/node";
import { readSignupConfirmationParams } from "./_utils/signupConfirmationUtls";
import { reportTwitterAdsSignup } from "./_utils/twitter";

// The TWIR query is provided as query=EncodedQuery
// Otherwise the api call gets blocked by AdBlock Plus
function readQueryParams(request: VercelRequest) {
  return new URLSearchParams(String(request.query.query ?? ""));
}

async function handleQuery(query: URLSearchParams) {
  const signupConfirmation = readSignupConfirmationParams(query);

  if (signupConfirmation.adClickIds.twitter) {
    console.log("[Twitter Ads]", signupConfirmation);
    await reportTwitterAdsSignup(
      signupConfirmation.adClickIds.twitter,
      signupConfirmation
    );
  }

  if (signupConfirmation.adClickIds.facebook) {
    console.log("[Facebook Ads]", signupConfirmation);
  }

  if (signupConfirmation.adClickIds.reddit) {
    console.log("[Reddit Ads]", signupConfirmation);
  }

  if (signupConfirmation.adClickIds.google) {
    console.log("[Google Ads]", signupConfirmation);
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
