import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function signupConfirmationPage(
  request: VercelRequest,
  response: VercelResponse
) {
  console.log("signupConfirmationPage", request.query);
  response.status(200).json({
    message: "OK",
  });
}
