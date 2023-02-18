import type { VercelRequest, VercelResponse } from "@vercel/node";

// The TWIR query is provided as query=EncodedQuery
// Otherwise the api call gets blocked by AdBlock Plus
function readQueryParams(request: VercelRequest) {
  return new URLSearchParams(String(request.query.query ?? ""));
}

function handleQuery(query: URLSearchParams) {
  const twclid = query.get("twclid");
  const rdt_cid = query.get("rdt_cid");
  const gclid = query.get("gclid");
  const email = query.get("email");
  const ck_subscriber_id = query.get("ck_subscriber_id");

  // Twitter Ads
  if (twclid) {
    console.log("Twitter Ads", { twclid, email });
  }

  // Reddit Ads
  if (rdt_cid) {
    console.log("Reddit Ads", { rdt_cid, email });
  }

  // Google Ads
  if (gclid) {
    console.log("Google Ads", { gclid, email });
  }
}

export default function signupConfirmationHandler(
  request: VercelRequest,
  response: VercelResponse
) {
  const query = readQueryParams(request);
  console.log("/api/signup-confirmation", query);

  handleQuery(query);

  response.status(200).json({
    message: "OK",
  });
}
