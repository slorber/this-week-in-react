import type { ActionFunction } from "remix";
import { Form, json, useActionData, useTransition } from "remix";

import BannerSrc from "~/ThisWeekInReact-banner.png";
import TwitterCards from "~/components/TwitterCards";

declare global {
  export const REVUE_SECRET_KEY: string | undefined;
}

function getRevueSecretKey(context: any): string {
  // context is provided by functions/[[path]].js
  // requires wrangler --binding / forwarding env variables
  const revueSecretKey =
    context?.env?.REVUE_SECRET_KEY ??
    // See https://gomakethings.com/how-to-use-environment-variables-with-cloudflare-workers-and-vanilla-js/
    (typeof REVUE_SECRET_KEY !== "undefined"
      ? REVUE_SECRET_KEY
      : typeof process !== "undefined"
      ? process.env.REVUE_SECRET_KEY
      : undefined);

  if (!revueSecretKey) {
    throw new Error("REVUE_SECRET_KEY env is not set");
  }

  return revueSecretKey;
}

async function subscribeToRevue({
  email,
  revueSecretKey,
}: {
  email: string;
  revueSecretKey: string;
}) {
  const REVUE_SUBSCRIBE_API = "https://www.getrevue.co/api/v2/subscribers";

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

export const action: ActionFunction = async ({ request, context }) => {
  console.log("ActionFunction context", { context });
  try {
    const revueSecretKey = getRevueSecretKey(context);
    const formData = await request.formData();

    let email;
    try {
      email = formData.get("email") as string;
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
    } catch (e) {
      return json(
        {
          error: true,
          message: `Can't read formData email: ${e}`,
        },
        {
          status: 400,
        }
      );
    }

    let result: Response;
    try {
      result = await subscribeToRevue({ email, revueSecretKey });
    } catch (e) {
      return json(
        {
          error: true,
          message: `Can't call subscribeToRevue: ${e}`,
        },
        {
          status: 500,
        }
      );
    }

    if (result.status >= 500) {
      const text = await (async function () {
        try {
          return (await result.text()) || "No Text";
        } catch (e) {
          return `N/A: ${e}`;
        }
      })();
      return json(
        {
          error: true,
          message: `Error while calling Revue. ${result.status} ${
            text ?? "no text()"
          }`,
        },
        {
          status: 500,
        }
      );
    }

    let data;
    try {
      data = await result.json();
    } catch (e) {
      return json(
        {
          error: true,
          message: `${result.status} => can't read Revue JSON: ${e}`,
        },
        {
          status: 500,
        }
      );
    }

    console.log("Revue result", { status: result.status, data });

    if (result.status !== 200) {
      return json(
        {
          error: true,
          message: data?.error?.email?.join?.(", ") || "Something went wrong",
        },
        {
          status: 500,
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
        message: `Unexpected action error: ${e}`,
      },
      {
        status: 500,
      }
    );
  }
};

function HeaderForm() {
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

  return (
    <Form replace method="post" aria-hidden={state === "success"}>
      {state !== "success" && (
        <fieldset className="mt-4 mb-2 flex flex-row rounded-md sm:rounded-lg shadow-2xl overflow-hidden">
          <input
            className={`text-md sm:text-xl w-44 sm:w-80 sm:w-96 p-2 sm:p-4 grow ${
              state === "error" ? "border-red-500" : ""
            }`}
            aria-label="Email address"
            aria-describedby="error-message"
            type="email"
            name="email"
            placeholder="my-email@react.dev"
          />
          <button
            type="submit"
            className="text-md sm:text-xl w-24 sm:w-32 bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 sm:p-4"
          >
            {state === "submitting" ? "..." : "Subscribe"}
          </button>
        </fieldset>
      )}

      {state === "success" && (
        <div className="mt-4 text-slate-100">
          <h2 className="text-2xl">🥳️ You're almost subscribed!</h2>
          <p className="mt-2">
            Please check your email to confirm your subscription.
          </p>
        </div>
      )}

      <p id="error-message" className="text-red-500">
        {state === "error" ? actionData.message : <>&nbsp;</>}
      </p>
    </Form>
  );
}

export default function Index() {
  return (
    <main>
      <header className="relative">
        <div className="p-2 sm:p-4">
          <div className="relative mx-auto w-full max-w-[1000px]">
            <div>
              <img className="rounded-lg shadow-2xl" src={BannerSrc} />
            </div>

            <p className="text-xl sm:text-2xl mt-8 text-slate-100 text-center max-w-3xl mx-auto">
              Stay up-to-date with React!
            </p>
            <p className="text-md mt-2 text-center font-medium text-slate-400">
              One email per week{" ⸱ "}
              <a
                href="https://www.getrevue.co/profile/thisweekinreact"
                className="text-sky-400 hover:text-sky-500"
              >
                Archive
              </a>
            </p>

            <div className="mt-4 flex justify-center space-x-6 text-sm">
              <HeaderForm />
            </div>
          </div>
        </div>
      </header>
      <TwitterCardsSection />
    </main>
  );
}

function TwitterCardsSection() {
  return (
    <section className="">
      <h2 className="text-xl sm:text-2xl mt-2 text-slate-100 text-center max-w-3xl mx-auto">
        Join thousands of{" "}
        <a
          href="https://twitter.com/sebastienlorber/timelines/1448942785814466561"
          target="_blank"
          className="text-sky-400 hover:text-sky-500"
        >
          satisfied readers
        </a>
      </h2>
      <div className="w-full flex flex-row flex-wrap justify-center	">
        {TwitterCards.map((card, i) => (
          <div
            key={i}
            className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 p-2 sm:p-4"
          >
            {card}
          </div>
        ))}
      </div>
    </section>
  );
}
