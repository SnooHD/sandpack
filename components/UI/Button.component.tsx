import React, { ButtonHTMLAttributes, HTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: JSX.Element | string;
}

export const Button = ({
  children,
  className = "",
  ...attrs
}: ButtonProps): JSX.Element => (
  <button
    className={`
      will-change-transform
      transition-[background,_transform] duration-300
      bg-light-shade-4 dark:bg-dark-shade-4
      hover:bg-light-shade-3 dark:hover:bg-dark-shade-3
      active:scale-active
      text-light-shade-1 dark:text-dark-shade-1
      px-sm py-xs text-md capitalize rounded
      ${className}
    `}
    {...attrs}
  >
    {children}
  </button>
);
