import React, { HTMLAttributes } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { Icon } from "../Icons/Icon.component";
import { LaneType } from "@/types/lanes.types";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  item: string;
  active?: boolean;
  type: LaneType;
}

export const Card = ({
  type,
  item,
  active,
  className = "",
  ...attrs
}: CardProps): JSX.Element => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item,
    data: {
      parent: type,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      {...attrs}
      className={`
        p-md flex items-center rounded !opacity-100
        bg-light-shade-4 dark:bg-dark-shade-4
        text-light-shade-2 dark:text-dark-shade-2
         ${className}
      `}
    >
      <Icon
        name="chevronLeft"
        className={`
          transition-opacity duration-300
          ${type === "progress" || active ? "opacity-40" : ""}
        `}
      />
      <span
        className="px-sm text-center w-full truncate"
        title={item}
      >
        {item}
      </span>
      <Icon
        name="chevronRight"
        className={`
          transition-opacity duration-300
          ${type === "ready" || active ? "opacity-40" : ""}
        `}
      />
    </div>
  );
};
