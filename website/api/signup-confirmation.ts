import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function signupConfirmationHandler(
  request: VercelRequest,
  response: VercelResponse
) {
  const query = request.query as Record<string, string>;
  console.log("/api/signup-confirmation", JSON.stringify(query, null, 2));
  response.status(200).json({
    message: "OK",
  });
}
