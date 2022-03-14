import { Link } from "remix";
import { ComponentProps } from "react";
import clsx from "clsx";

function isExternal(to: string) {
  return /^(https?:)?\/\//.test(to);
}

export const AppLinkClassName = "text-sky-300 hover:text-sky-200";

export default function AppLink({ to, ...props }: ComponentProps<typeof Link>) {
  const className = clsx(props.className, AppLinkClassName);

  return typeof to === "string" && isExternal(to) ? (
    <a target="_blank" href={to} {...props} className={className} />
  ) : (
    <Link {...props} to={to} className={className} />
  );
}
