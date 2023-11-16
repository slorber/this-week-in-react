import posthog from "posthog-js";

posthog.init("phc_fxh8DHOkIdy8mnsuyHhJ9WuGEycEVY7EKAq21Qcd27q", {
  api_host: "https://eu.posthog.com",
});

posthog.capture("my event", { property: "value" });
