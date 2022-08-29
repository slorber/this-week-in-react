import { Link } from "remix";
import { ComponentProps, ReactNode } from "react";
import clsx from "clsx";

function isExternal(to: string) {
  return /^(https?:)?\/\//.test(to);
}

const AppLinkClassName = "text-sky-300 hover:text-sky-200";

export default function AppLink({ to, ...props }: ComponentProps<typeof Link>) {
  const className = clsx(props.className, AppLinkClassName);

  return typeof to === "string" && isExternal(to) ? (
    <a target="_blank" href={to} {...props} className={className} />
  ) : (
    <Link {...props} to={to} className={className} />
  );
}

// Because nested <a> are not allowed
// Probably not the best in terms of accessibility, but convenient...
export function AppLinkButton({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <button
      onClick={() => {
        window.open(href, "_blank");
      }}
      className={AppLinkClassName}
    >
      {children}
    </button>
  );
}
