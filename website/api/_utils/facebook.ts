import { SignupConfirmationParams } from "./signupConfirmationUtils";
import { readEnvVariable } from "./common-utils";

import {
  FacebookAdsApi,
  ServerEvent,
  EventRequest,
  UserData,
  CustomData,
} from "facebook-nodejs-business-sdk";

const AccessToken = readEnvVariable("TWIR_FACEBOOK_ACCESS_TOKEN");
const PixelId = readEnvVariable("TWIR_FACEBOOK_PIXEL_ID");

FacebookAdsApi.init(AccessToken);

export async function reportFacebookAdsSignup(
  fbclid: string,
  signupConfirmation: SignupConfirmationParams,
) {
  // TODO implicit assumption
  // Use TS 5.1 + type-fest SetNonNullable<SignupConfirmationParams,"email">
  const email = signupConfirmation.email!;
  try {
    console.log("[Facebook Ads] reportFacebookAdsSignup attempt", {
      fbclid,
      email,
      signupConfirmation,
    });

    const timestamp = Math.floor(Date.now() / 1000);

    const userData = new UserData();
    userData.setEmails([email]);
    // See https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/fbp-and-fbc
    userData.setFbc(`fb.1.${timestamp}.${fbclid}`);
    // It is recommended to send Client IP and User Agent for Conversions API Events.
    signupConfirmation.ip && userData.setClientIpAddress(signupConfirmation.ip);
    signupConfirmation.userAgent &&
      userData.setClientUserAgent(signupConfirmation.userAgent);

    const customData = new CustomData();

    const serverEvent = new ServerEvent()
      // This depends on the Campaign type!
      // This EventName is for Lead > Conversion
      // see https://developers.facebook.com/docs/meta-pixel/reference#standard-events
      .setEventName("CompleteRegistration")
      // EventId is used for event deduplication
      // See https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/server-event
      .setEventId(email)
      .setEventTime(timestamp)
      .setUserData(userData)
      .setCustomData(customData)
      .setEventSourceUrl(
        // TODO initial.url is not always the ad landing page
        signupConfirmation.initial.url ?? "https://thisweekinreact.com",
      )
      .setActionSource("website");

    const request = new EventRequest(AccessToken, PixelId).setEvents([
      serverEvent,
    ]);

    const response = await request.execute();

    if (response.events_received !== 1) {
      throw new Error(
        `Facebook Ads was supposed to receive 1 event, but received ${response.events_received}`,
      );
    }

    console.log("[Facebook Ads] reportFacebookAdsSignup success", {
      fbclid,
      email,
      timestamp,
      response: {
        events_received: response.events_received,
        messages: response.messages,
        num_processed_entries: response.num_processed_entries,
      },
    });
  } catch (e) {
    console.error("[Facebook Ads] reportFacebookAdsSignup failure", e);
    throw new Error(
      `Could not post facebook conversion result for fbclid=${fbclid} email=${email} => ${
        (e as Error)?.message
      }`,
    );
  }
}
