import { readEnvVariable } from "./common-utils";

const API_SECRET = readEnvVariable("TWIR_CONVERTKIT_API_SECRET");
const API_SECRET_QS = `api_secret=${API_SECRET}`;

export interface Subscriber {
  id: number;
  first_name: string | null;
  email_address: string;
  state: string;
  created_at: string;
  fields: Record<string, string | null>;
}

async function apiCall<T = unknown>(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(input, init);
  if (response.status !== 200) {
    throw new Error(
      `ConvertKit API call failed\nStatus=${response.status}\nFetch Input=${input}`,
    );
  }
  return (await response.json()) as T;
}

async function apiCallWithRetry<T = unknown>(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<T> {
  try {
    return await apiCall<T>(input, init);
  } catch (e) {
    console.error("Failed to fetch from ConvertKit API. Will try again once", {
      input,
      init,
      errorMessage: (e as Error)?.message,
    });
    return apiCall<T>(input, init);
  }
}

export async function fetchSubscriberById(id: string) {
  const url = `https://api.convertkit.com/v3/subscribers/${id}?${API_SECRET_QS}`;
  const response = await apiCallWithRetry<{ subscriber: Subscriber }>(url);
  return response.subscriber;
}
