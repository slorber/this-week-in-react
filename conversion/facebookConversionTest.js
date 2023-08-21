const bizSdk = require("facebook-nodejs-business-sdk");
const ServerEvent = bizSdk.ServerEvent;
const EventRequest = bizSdk.EventRequest;
const UserData = bizSdk.UserData;
const CustomData = bizSdk.CustomData;
const Content = bizSdk.Content;

const access_token = process.env.TWIR_FACEBOOK_ACCESS_TOKEN;
const pixel_id = process.env.TWIR_FACEBOOK_PIXEL_ID;

const api = bizSdk.FacebookAdsApi.init(access_token);

let timestamp = Math.floor(new Date() / 1000);

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
  //    .setEventSourceUrl('http://jaspers-market.com/product/123')
  .setActionSource("website");

const eventRequest = new EventRequest(access_token, pixel_id).setEvents([
  serverEvent,
]);

console.log("Request: ", eventRequest);
eventRequest.execute().then(
  (response) => {
    console.log("Response: ", response);
  },
  (err) => {
    console.error("Error: ", err);
  }
);
