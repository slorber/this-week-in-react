import {
  readEnvVariable,
  SignupConfirmationParams,
} from "./signupConfirmationUtls";

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
  signupConfirmation: SignupConfirmationParams
) {
  const { email } = signupConfirmation;
  try {
    console.log("");
    console.log("[Twitter Ads] reportFacebookAdsSignup attempt", {
      fbclid,
      email,
      signupConfirmation,
    });

    const timestamp = Math.floor(Date.now() / 1000);

    const userData = new UserData()
      .setEmails(["email@xyz.com"])
      // It is recommended to send Client IP and User Agent for Conversions API Events.
      //.setClientIpAddress(request.connection.remoteAddress)
      //.setClientUserAgent(request.headers["user-agent"])
      .setFbc(
        `fb.1.${timestamp}.paaaaxwdph5yshthpa81aekufdjisbi5ufqg86bsrisnfckhkjrxq1n8s9qty_aem_af9lixlablk23ppl88ukyayifsr_wbefb6vwnrl3ftbknpneiczahyhzfokvjb-bhapo9mchxgvubbzmgsobdymy`
      );

    const customData = new CustomData();

    const serverEvent = new ServerEvent()
      .setEventName("Subscribe")
      .setEventTime(timestamp)
      .setUserData(userData)
      .setCustomData(customData)
      .setEventSourceUrl(
        signupConfirmation.initial.url ?? "https://thisweekinreact.com"
      )
      .setActionSource("website");

    const request = new EventRequest(AccessToken, PixelId).setEvents([
      serverEvent,
    ]);

    console.log("Request: ", request);
    const response = await request.execute();

    console.log("[Facebook Ads] reportFacebookAdsSignup success", {
      fbclid,
      email,
      request: request,
      response: response,
    });
  } catch (e) {
    console.error("[Facebook Ads] reportFacebookAdsSignup failure", e);
    throw new Error(
      `Could not post facebook conversion result for fbclid=${fbclid} email=${email} => ${e?.message}`
    );
  }
}
