import type { VercelRequest, VercelResponse } from "@vercel/node";
import { readSignupConfirmationParams } from "./_utils/signupConfirmationUtils";
import { reportTwitterAdsSignup } from "./_utils/twitter";
import { reportFacebookAdsSignup } from "./_utils/facebook";

async function handleSignupConfirmation(request: VercelRequest) {
  const signupConfirmation = await readSignupConfirmationParams(request);

  console.log("[SignupConfirmation]", signupConfirmation);

  if (!signupConfirmation.email) {
    console.error(
      "[SignupConfirmation] No email found in confirmation querystring",
      signupConfirmation,
    );
  }

  if (signupConfirmation.adClickIds.twitter) {
    console.log("[Twitter Ads]", signupConfirmation);
    await reportTwitterAdsSignup(
      signupConfirmation.adClickIds.twitter,
      signupConfirmation,
    );
  }

  if (signupConfirmation.adClickIds.facebook) {
    console.log("[Facebook Ads]", signupConfirmation);
    await reportFacebookAdsSignup(
      signupConfirmation.adClickIds.facebook,
      signupConfirmation,
    );
  }

  if (signupConfirmation.adClickIds.reddit) {
    console.log("[Reddit Ads]", signupConfirmation);
    // TODO
  }

  if (signupConfirmation.adClickIds.google) {
    console.log("[Google Ads]", signupConfirmation);
    // TODO
  }
}

export default async function signupConfirmationHandler(
  request: VercelRequest,
  response: VercelResponse,
) {
  console.log("/api/signup-confirmation");

  await handleSignupConfirmation(request);

  response.status(200).json({
    message: "OK",
  });
}
