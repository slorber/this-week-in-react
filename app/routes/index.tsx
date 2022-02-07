import { useEffect, useRef } from "react";
import type { ActionFunction } from "remix";
import { Form, json, Link, useActionData, useTransition } from "remix";

import BannerSrc from "~/ThisWeekInReact-banner.png";

declare global {
  export const REVUE_SECRET_KEY: string | undefined;
}

async function subscribeToRevue({ email }: { email: string }) {
  const REVUE_SUBSCRIBE_API = "https://www.getrevue.co/api/v2/subscribers";

  // See https://gomakethings.com/how-to-use-environment-variables-with-cloudflare-workers-and-vanilla-js/

  const revueSecretKey: string | undefined =
    typeof REVUE_SECRET_KEY !== "undefined"
      ? REVUE_SECRET_KEY
      : typeof process !== "undefined"
      ? process.env.REVUE_SECRET_KEY
      : undefined;

  /*
  const revueSecretKey: string | undefined =
    typeof process !== "undefined"
      ? process.env.REVUE_SECRET_KEY
      : typeof REVUE_SECRET_KEY !== "undefined"
      ? REVUE_SECRET_KEY
      : undefined;

   */

  if (!revueSecretKey) {
    throw new Error("REVUE_SECRET_KEY env is not set");
  }

  const revueFormData = new FormData();
  revueFormData.append("email", email);
  revueFormData.append("double_opt_in", "true");

  const result = await fetch(REVUE_SUBSCRIBE_API, {
    method: "POST",
    headers: {
      Authorization: `Token ${revueSecretKey}`,
    },
    body: revueFormData,
  });

  return result;
}

export const action: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData();

    const email = formData.get("email") as string;
    if (!email) {
      return json(
        {
          error: true,
          message: "Email is required to subscribe!",
        },
        {
          status: 400,
        }
      );
    }

    const result = await subscribeToRevue({ email });
    const data = await result.json();

    console.log("Revue result", { status: result.status, data });

    if (result.status !== 200) {
      return json(
        {
          error: true,
          message: data?.error?.email?.join?.(", ") || "Something went wrong",
        },
        {
          status: result.status,
        }
      );
    }

    return {
      subscription: {
        subscribed: true,
        data,
      },
    };
  } catch (e) {
    console.error(e);
    return json(
      {
        error: true,
        message: `Unexpected action error: ${(e as Error).message}`,
      },
      {
        status: 500,
      }
    );
  }
};

export default function Index() {
  const actionData = useActionData();
  const transition = useTransition();
  const state: "idle" | "success" | "error" | "submitting" =
    transition.submission
      ? "submitting"
      : actionData?.subscription
      ? "success"
      : actionData?.error
      ? "error"
      : "idle";

  const inputRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const mounted = useRef<boolean>(false);

  useEffect(() => {
    if (state === "error") {
      inputRef.current?.focus();
    }

    if (state === "idle" && mounted.current) {
      inputRef.current?.select();
    }

    if (state === "success") {
      successRef.current?.focus();
    }

    mounted.current = true;
  }, [state]);

  return (
    <main>
      <Form replace method="post" aria-hidden={state === "success"}>
        <h1 className="text-3xl font-bold	">This Week In React</h1>
        <h2 className="text-2xl mt-4">Subscribe!</h2>
        <p className="">Don't miss any of the action!</p>
        <fieldset className="mt-4 mb-4 flex flex-row">
          <input
            className={`p-2 grow ${state === "error" ? "border-red-500" : ""}`}
            aria-label="Email address"
            aria-describedby="error-message"
            ref={inputRef}
            type="email"
            name="email"
            placeholder="the-best@react.dev"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {state === "submitting" ? "Subscribing..." : "Subscribe"}
          </button>
        </fieldset>

        <p id="error-message" className="text-red-500">
          {state === "error" ? actionData.message : <>&nbsp;</>}
        </p>

        <img className="mt-4" src={BannerSrc} />
      </Form>

      <div aria-hidden={state !== "success"}>
        <h2 ref={successRef} tabIndex={-1}>
          You're subscribed!
        </h2>
        <p>Please check your email to confirm your subscription.</p>
        <Link to=".">Start over</Link>
      </div>
    </main>
  );
}
