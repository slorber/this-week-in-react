import posthog from "posthog-js";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

if (ExecutionEnvironment.canUseDOM) {
  posthog.init("phc_fxh8DHOkIdy8mnsuyHhJ9WuGEycEVY7EKAq21Qcd27q", {
    api_host: "https://eu.posthog.com",
  });
}
