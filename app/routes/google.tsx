import Index, { createActionFunction, meta } from "./index";

export { meta } from "./index";

export const action = createActionFunction({
  source: "google",
});

export default function IndexTwitter() {
  return (
    <>
      <Index onSubscribe={(email) => {}} />
    </>
  );
}
