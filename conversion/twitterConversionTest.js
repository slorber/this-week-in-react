const Twitter = require("twitter");
const TwitterLite = require("twitter-lite");
const crypto = require("crypto");

function sha256(input) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

function readEnvVariable(name, defaultValue) {
  const value = process.env[name];
  const result = value ?? defaultValue;
  if (typeof result === "undefined") {
    throw new Error(
      `Missing env variable value for ${name} and no default value fallback provided`
    );
  }
  return result;
}

/*
const client = new Twitter({
  consumer_key: readEnvVariable("TWIR_TWITTER_API_KEY"),
  consumer_secret: readEnvVariable("TWIR_TWITTER_API_SECRET"),
  access_token_key: readEnvVariable("TWIR_TWITTER_ACCESS_TOKEN"),
  access_token_secret: readEnvVariable("TWIR_TWITTER_ACCESS_TOKEN_SECRET"),
  // bearer_token: readEnvVariable("TWIR_TWITTER_BEARER_TOKEN"),
});
 */

const client2 = new TwitterLite({
  subdomain: "ads-api",
  version: "11",
  extension: false,
  consumer_key: readEnvVariable("TWIR_TWITTER_API_KEY"),
  consumer_secret: readEnvVariable("TWIR_TWITTER_API_SECRET"),
  access_token_key: readEnvVariable("TWIR_TWITTER_ACCESS_TOKEN"),
  access_token_secret: readEnvVariable("TWIR_TWITTER_ACCESS_TOKEN_SECRET"),
  // bearer_token: readEnvVariable("TWIR_TWITTER_BEARER_TOKEN"),
});

/*
function makeGet(endpoint, params = {}) {
  return new Promise((resolve, reject) => {
    client.get(endpoint, params, (error, data) => {
      error ? reject(error) : resolve(data);
    });
  });
}

function makePost(endpoint, params) {
  return new Promise((resolve, reject) => {
    client.post(endpoint, params, (error, data) => {
      error ? reject(error) : resolve(data);
    });
  });
}

 */

async function run() {
  /*
  console.log(
    "Ads Accounts client1",
    await makeGet("https://ads-api.twitter.com/11/accounts")
  );
  console.log("Ads Accounts client2", await client2.get("accounts"));

   */

  /*
  const postConversionResult = await makePost(
    "https://ads-api.twitter.com/11/measurement/conversions/o85l6",
    {
      conversions: [
        {
          conversion_time: "2023-01-23T00:00:00.000Z",
          event_id: "tw-o85l6-od5nc",
          identifiers: [
            {
              twclid: "23opevjt88psuo13lu8d020qkn",
            },
            {
              hashed_email:
                "d360d510a224510f373931ce2d6215a799f5a9c1cef221b0149b6b6b50cced62",
            },
          ],
	     "conversion_id":"TODO_USE_UUID_CK_OR_EMAIL_FOR_DEDUPLICATION ???",
         "description":"TWIR subscription"
        },
      ],
    }
  );
  console.log("postConversionResult", postConversionResult);

   */

  const postConversionResult2 = await client2.post(
    "measurement/conversions/o85l6",
    {
      conversions: [
        {
          conversion_time: "2023-01-23T00:00:00.000Z",
          event_id: "tw-o85l6-od5nc",
          identifiers: [
            {
              twclid: "23opevjt88psuo13lu8d020qkn",
            },
            {
              hashed_email:
                "d360d510a224510f373931ce2d6215a799f5a9c1cef221b0149b6b6b50cced62",
            },
          ],
          conversion_id: "TODO_USE_UUID_CK_OR_EMAIL_FOR_DEDUPLICATION ???",
          description: "TWIR subscription",
        },
      ],
    }
  );
  console.log("postConversionResult2", postConversionResult2);

  /*
  client.get(
    "https://ads-api.twitter.com/11/accounts",
    {},
    function (error, tweets, response) {
      console.log({ error, tweets });

      if (!error) {
        console.log(tweets);
      }
    }
  );
  
 */

  /*
  var params = { screen_name: "nodejs" };
  client.get(
    "statuses/user_timeline",
    params,
    function (error, tweets, response) {
      console.log({ error, tweets });

      if (!error) {
        console.log(tweets);
      }
    }
  );

   */
  // await new Promise((resolve) => setTimeout(resolve, 1000));
}

run().then(
  () => {
    process.exit(0);
  },
  (e) => {
    console.error("catched run error", e);
    process.exit(1);
  }
);
