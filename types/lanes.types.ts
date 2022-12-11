import { HTMLAttributes } from "react";

export type LaneType = "review" | "ready" | "progress";

export const enum LaneTitles {
  review = "Review",
  ready = "Ready to merge",
  progress = "In progress",
}

export interface ItemDataProps {
  id: string;
  parent: LaneType;
}

export interface LanesDataProps {
  id: LaneType;
  items: string[];
}
