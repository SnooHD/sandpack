import React from "react";
import { ChevronRightIcon } from "./ChevronRight.icon";

export const ChevronLeftIcon = (): JSX.Element => (
  <span className="inline-block scale-x-[-1]">
    <ChevronRightIcon />
  </span>
);
