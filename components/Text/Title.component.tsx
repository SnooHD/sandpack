import React, { HTMLAttributes } from "react";

interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: JSX.Element | string;
}

export const Title = ({
  children,
  className = "",
  ...attrs
}: TitleProps): JSX.Element => (
  <h1
    {...attrs}
    className={`
      text-lg xs:text-xl
      ${className}
    `}
  >
    {children}
  </h1>
);
