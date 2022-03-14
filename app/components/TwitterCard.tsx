import { ReactNode } from "react";
import TwitterIcon from "./TwitterIcon";
import clsx from "clsx";

export default function TwitterCard({
  className,
  href,
  avatarSrc,
  fullName,
  username,
  children,
}: {
  className?: string;
  href: string;
  avatarSrc: string;
  fullName: string;
  username: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target={"_blank"}
      className={clsx(
        "block w-full mx-auto p-4 relative bg-slate-700 transition border border-slate-700 hover:border-slate-500 shadow-xl hover:shadow-2xl rounded-lg text-white",
        className
      )}
    >
      <div className=" flex">
        <img
          className="rounded-full w-12 h-12 mr-2"
          src={avatarSrc}
          alt={`Twitter avatar for @${username}`}
        />
        <div className="flex-1">
          <p className="font-bold text-md ">{fullName}</p>
          <p className="text-sky-300">@{username}</p>
        </div>
        <div>
          <TwitterIcon />
        </div>
      </div>
      <p className="text-sm lg:text-base mt-2 font-light text-white">
        {children}
      </p>
    </a>
  );
}
