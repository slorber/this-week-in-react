import { ReactNode } from "react";
import TwitterIcon from "./TwitterIcon";

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
      className={`block w-full mx-auto p-4 relative bg-slate-700 shadow-2xl rounded-lg text-white ${
        className ?? ""
      }`}
      href={href}
      target={"_blank"}
    >
      <div className="flex">
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
      <p className="text-md md:text-lg mt-2 font-medium text-slate-300">
        {children}
      </p>
    </a>
  );
}
