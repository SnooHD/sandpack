import React, { HTMLAttributes } from "react";

interface ParagraphProps extends HTMLAttributes<HTMLParagraphElement> {
  children: JSX.Element | string;
}

export const Paragraph = ({
  children,
  className = "",
  ...attrs
}: ParagraphProps): JSX.Element => (
  <p
    {...attrs}
    className={`
      text-sm text-light-shade-2 dark:text-dark-shade-2
      ${className}
    `}
  >
    {children}
  </p>
);
