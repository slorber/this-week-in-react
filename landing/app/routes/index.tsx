import type { ActionFunction, MetaFunction } from "remix";
import {
  Form,
  json,
  useActionData,
  useTransition,
  HtmlMetaDescriptor,
} from "remix";

import BannerSrc from "~/ThisWeekInReact-banner.png";
import TwitterCards from "~/components/TwitterCards";
import AppLink from "~/components/AppLink";
import TwitterIcon from "~/components/TwitterIcon";
import clsx from "clsx";
import { useEffect, useState } from "react";

export const createMeta: (meta?: HtmlMetaDescriptor) => MetaFunction = () => {
  return () => {
    const title = "This Week In React";
    const description = `Weekly newsletter for React professionals`;
    return {
      title,
      description,
      keywords: "reactjs,reactnative,typescript,nodejs",

      // TODO not ideal banner ratio, see https://socialsharepreview.com/?url=https://thisweekinreact.com/subscribe
      "og:image": BannerSrc,
      "twitter:image": BannerSrc,
      "twitter:card": "summary_large_image",
      "twitter:creator": "@sebastienlorber",
      "twitter:site": "@sebastienlorber",
      "twitter:title": "This Week In React",
      "twitter:description": description,
      ...meta,
    };
  };
};

export const meta: MetaFunction = createMeta();

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

export const createActionFunction: ({
  source,
}: {
  source:
    | null
    | "homepage"
    | "twitter"
    | "reddit"
    | "facebook"
    | "instagram"
    | "google"
    | "quora";
}) => ActionFunction =
  ({ source: sourceAttribute }) =>
  async ({ request, context, params }) => {
    const source: string = sourceAttribute ?? params.source ?? "unknown";

    console.log("Revue action called", { source });
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

      console.log("attempt to subscribe to revue with email", {
        source,
        email,
      });

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

      console.log("Revue result", {
        source,
        email,
        status: result.status,
        data,
      });

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

      console.log("Revue subscription ok", { source, email });

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

export const action: ActionFunction = createActionFunction({
  source: "homepage",
});

function SubscribeForm({
  onSubscribe,
}: {
  onSubscribe?: (email: string) => void;
}) {
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

  const [email, setEmail] = useState("");

  useEffect(() => {
    if (state === "success") {
      // TODO remove when shitty Revue issue get fixed
      alert(
        "Almost subscribed!\n\nPlease look in your SPAM for the confirmation email\nTemporary email provider issue :/"
      );
      onSubscribe?.(email);
    }
  }, [state, email]);

  return (
    <Form replace method="post" aria-hidden={state === "success"}>
      {state !== "success" && (
        <fieldset className="mt-4 mb-2 flex flex-row rounded-md sm:rounded-lg shadow-2xl overflow-hidden m-auto max-w-[600px]">
          <input
            autoFocus
            className={`text-md sm:text-xl w-56 sm:w-80 md:w-96 p-2 sm:p-4 grow ${
              state === "error" ? "border-red-500" : ""
            }`}
            aria-label="Email address"
            aria-describedby="error-message"
            type="email"
            name="email"
            placeholder="my-email@react.dev"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <div className="text-center my-8">
          <h2 className="text-2xl text-slate-100">
            🥳️ You're almost subscribed!
          </h2>
          <p className="mt-2 text-orange-400">
            ⚠️ Please confirm your subscription: check your emails
          </p>
        </div>
      )}

      {state === "error" && (
        <p id="error-message" className="text-red-500">
          {actionData.message}
        </p>
      )}
    </Form>
  );
}

function Separator({ className }: { className?: string }) {
  return <span className={clsx(className, "mx-2 md:mx-4")}>{"⸱"}</span>;
}

function Space() {
  return <span className="mx-1" />;
}

export default function Index({
  onSubscribe,
}: {
  onSubscribe?: (email: string) => void;
}) {
  return (
    <main>
      <header className="p-2 pb-0 sm:p-4 sm:pb-0">
        <div className="mx-auto w-full max-w-[1000px]">
          <div>
            <img className="rounded-lg shadow-2xl" src={BannerSrc} />
          </div>
          <div className="text-xl sm:text-2xl mt-12 text-slate-100 text-center max-w-3xl mx-auto">
            Stay up-to-date with React!
          </div>
          <div className="text-md mt-2 text-center font-medium text-slate-200">
            <span>One email per week</span>
            <Separator className="hidden sm:inline" />
            <div className="pt-1 sm:inline sm:pt-0">
              <AppLink to="https://www.getrevue.co/profile/thisweekinreact">
                📨
                <Space />
                Archive
              </AppLink>
              <Separator />
              <AppLink to="https://slo.im/thread">
                <TwitterIcon className="inline" />
                <Space />
                Thread
              </AppLink>
            </div>
          </div>
          <div className="mt-8 mb-8 flex justify-center space-x-6 text-sm">
            <SubscribeForm onSubscribe={onSubscribe} />
          </div>
        </div>
      </header>
      <TwitterCardsSection />
    </main>
  );
}

function TwitterCardsSection() {
  return (
    <section className="w-full max-w-[1800px] m-auto lg:px-2 xl:px-4 2xl:px-10 py-6">
      <h2 className="text-xl sm:text-2xl text-slate-100 text-center max-w-3xl mx-auto">
        Join thousands of{" "}
        <AppLink
          to="https://twitter.com/sebastienlorber/timelines/1448942785814466561"
          target="_blank"
        >
          satisfied readers
        </AppLink>
      </h2>
      <div className="flex flex-row flex-wrap justify-center pt-1">
        {TwitterCards.map((card, i) => (
          <div
            key={i}
            className="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 p-0.5 md:p-1 xl:p-2 2xl:p-4"
          >
            {card}
          </div>
        ))}
      </div>
    </section>
  );
}
