import Index, { createActionFunction, createMeta } from "./index";
import { ActionFunction, MetaFunction, useParams } from "remix";

export const meta: MetaFunction = createMeta();

export const action: ActionFunction = createActionFunction({
  source: null,
});

// Ability to use/track any unknown path segment as a subscribe source
// This gives flexibility + avoid 404
export default function IndexOtherSources() {
  const { source } = useParams() as { source: string };

  return (
    <>
      <Index
        onSubscribe={(email) => {
          console.log("subscribed from source", { email, source });
        }}
      />
    </>
  );
}
