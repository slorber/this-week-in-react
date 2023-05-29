/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { type ReactNode } from "react";

import clsx from "clsx";

import styles from "./styles.module.css";
import { useBaseUrlUtils } from "@docusaurus/core/lib/client/exports/useBaseUrl";

export interface Props {
  className?: string;
  url: string;
  handle: string | null;
  github: string | null;
  name: string;
  job: string;
  children: ReactNode;

  // optionals
  avatarUrl?: string;
  profileUrl?: string;
}

const fallbackAvatarPath = "/svg/noAvatar.svg";

export default function TweetQuote({
  className,
  url,
  handle,
  github,
  name,
  job,
  children,
  ...props
}: Props): JSX.Element {
  const { withBaseUrl } = useBaseUrlUtils();

  const githubAvatar = github ? `https://github.com/${github}.png` : undefined;
  const fallbackAvatar = githubAvatar ?? withBaseUrl(fallbackAvatarPath);
  const avatarUrl =
    props.avatarUrl ??
    (handle
      ? `https://unavatar.io/twitter/${handle}?fallback=${fallbackAvatar}`
      : fallbackAvatar);

  const profileUrl =
    props.profileUrl ??
    (handle
      ? `https://twitter.com/${handle}`
      : github
      ? `https://github.com/${github}`
      : null);

  if (profileUrl === null) {
    throw new Error(`no profile url for ${name}`);
  }
  return (
    <figure className={clsx(styles.tweetQuote, className)}>
      <blockquote>
        <a href={url} target="_blank" rel="noreferrer nofollow">
          {children}
        </a>
      </blockquote>
      <figcaption>
        <a href={profileUrl} target="_blank" rel="noreferrer nofollow">
          <div className="avatar">
            <img
              alt={name}
              className={clsx("avatar__photo shadow--md", styles.avatarImg)}
              src={avatarUrl}
              // loading="lazy"
            />
            <div className={clsx("avatar__intro")}>
              <strong className="avatar__name">
                <cite>{name}</cite>
              </strong>
              <small className="avatar__subtitle" itemProp="description">
                {job}
              </small>
            </div>
          </div>
        </a>
      </figcaption>
    </figure>
  );
}
