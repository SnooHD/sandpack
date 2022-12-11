import React, { HTMLAttributes } from "react";

export const CardSkeleton = ({
  className = "",
  ...attrs
}: HTMLAttributes<HTMLDivElement>): JSX.Element => {
  return (
    <div
      className={`
        rounded flex
        bg-light-shade-2 dark:bg-dark-shade-2
        text-light-shade-3/40 dark:text-dark-shade-3/40
         ${className}
      `}
      {...attrs}
    >
      <span className="w-full text-center font-semibold uppercase">
        Drop here
      </span>
    </div>
  );
};
