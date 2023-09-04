import { readEnvVariable } from "./signupConfirmationUtls";

const API_SECRET = readEnvVariable("TWIR_CONVERTKIT_API_SECRET");
const API_SECRET_QS = `api_secret=${API_SECRET}`;

export interface FetchSubscriberResponse {
  subscriber: Subscriber;
}

export interface Subscriber {
  id: number;
  first_name: string | null;
  email_address: string;
  state: string;
  created_at: string;
  fields: Record<string, string | null>;
}

async function fetchWithRetry(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  try {
    return await fetch(input, init);
  } catch (e) {
    console.error("Failed to fetch from ConvertKit API. Will try again once", {
      input,
      init,
      errorMessage: (e as Error)?.message,
    });
    return fetch(input, init);
  }
}

export async function fetchSubscriberById(id: string) {
  const url = `https://api.convertkit.com/v3/subscribers/${id}?${API_SECRET_QS}`;
  return fetch(url);
}
