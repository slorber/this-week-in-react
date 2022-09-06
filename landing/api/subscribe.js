export default function handler(request, response) {
  response.status(200).json({
    body: request.body,
    typeRequest: typeof request,
    typeResponse: typeof response,
    test: "yeah",
    query: request.query,
    cookies: request.cookies,
  });
}
