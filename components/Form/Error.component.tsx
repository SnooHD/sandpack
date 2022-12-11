import React from "react";
import { HTMLAttributes } from "react";

export interface ErrorProps extends HTMLAttributes<HTMLDivElement> {
  error?: string;
}

export const Error = ({
  error,
  className = "",
  ...attrs
}: ErrorProps): JSX.Element => (
  <>
    <div
      className={`
        duration-300 transition-opacity py-xs
        text-light-red dark:text-dark-red text-md
        ${error ? "opacity-1 visible" : "opacity-0 invisible"}
        ${className}
      `}
      {...attrs}
    >
      {error || "&nbsp;"}
    </div>
  </>
);
