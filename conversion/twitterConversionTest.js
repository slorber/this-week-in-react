const Twitter = require("twitter");

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

const client = new Twitter({
  consumer_key: readEnvVariable("TWIR_TWITTER_API_KEY"),
  consumer_secret: readEnvVariable("TWIR_TWITTER_API_SECRET"),
  access_token_key: readEnvVariable("TWIR_TWITTER_ACCESS_TOKEN"),
  access_token_secret: readEnvVariable("TWIR_TWITTER_ACCESS_TOKEN_SECRET"),
});

function makeGet(endpoint, params = {}) {
  return new Promise((resolve, reject) => {
    client.get(endpoint, params, (error, data) => {
      error ? reject(error) : resolve(data);
    });
  });
}

async function run() {
  const result = await makeGet("https://ads-api.twitter.com/11/accounts");
  // const result = await makeGet("/11/measurement/conversions/o85l6");

  console.log("result", result);

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
  await new Promise((resolve) => setTimeout(resolve, 1000));
}

run().then(
  () => {
    process.exit(0);
  },
  (e) => {
    console.error("error", e);
    process.exit(1);
  }
);
