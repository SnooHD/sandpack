import React, { useState, useEffect, HTMLAttributes, useRef } from "react";
import { Card } from "@/components/Lanes/Card.component";
import { CardSkeleton } from "@/components/Lanes/CardSkeleton.component";
import { LaneType, LaneTitles } from "@/types/lanes.types";
import { DragOverlay, useDroppable } from "@dnd-kit/core";

interface LaneProps extends HTMLAttributes<HTMLDivElement> {
  type: LaneType;
  items: string[];
  collision: boolean;
  activeItem: string | null;
}

export const Lane = ({
  type,
  items,
  collision,
  activeItem,
}: LaneProps): JSX.Element => {
  const [laneTitle, setLaneTitle] = useState("");
  useEffect(() => {
    if (type === "review") setLaneTitle(LaneTitles.review);
    else if (type === "ready") setLaneTitle(LaneTitles.ready);
    else if (type === "progress") setLaneTitle(LaneTitles.progress);
  }, []);

  const { setNodeRef } = useDroppable({
    id: type,
  });

  /**
   * By keeping a copy of the activeItem we are able to keep the
   * item reference even after the re-render of the new list.
   * This allows us to toggle a class on re-render, and in effect
   * keeping the new item hidden until the drop animation is finished.
   */
  const [newItem, setNewItem] = useState<string | null>(null);
  useEffect(() => {
    setNewItem(activeItem);
  }, [activeItem]);

  return (
    <div
      className="w-1/3 flex-shrink-0 space-y-sm pl-md first-of-type:pl-0"
      ref={setNodeRef}
    >
      <span className="text-xs text-light-shade-2 dark:text-dark-shade-2">{`${laneTitle} (${items.length})`}</span>

      <div
        className={`
          relative
          ${collision ? "z-[-1]" : ""}
        `}
      >
        <div
          className={`
            absolute rounded z-[-1]
            top-[-5px] left-[-5px] right-[5px] bottom-[5px] w-[calc(100%+10px)] h-[calc(100%+10px)]
            bg-light-shade-3 dark:bg-dark-shade-3
            transition-opacity duration-300
            ${collision ? "opacity-100" : "opacity-0"}
          `}
          aria-hidden={true}
        />

        <div aria-hidden={true}>
          <CardSkeleton
            className={`
              transition-[height,_padding] duration-300 overflow-hidden
              ${collision ? "h-[72px] p-md mb-sm" : "h-0 p-0"}
              ${!activeItem && newItem ? "transition-none delay-300" : ""}
            `}
          />
        </div>

        <ul>
          {items.map((item) => (
            <li
              key={`lane-${type}-${item}`}
              className={`
                mb-sm last-of-type:mb-0
                transition-opacity
                ${
                  activeItem === item
                    ? "h-0 !mb-0 opacity-0 delay-0"
                    : "delay-300 !duration-[0ms]"
                }
                ${newItem === item ? "opacity-0 delay-0" : ""}
                ${
                  item === activeItem && activeItem === items[items.length - 1]
                    ? "!-mt-sm"
                    : ""
                }
              `}
            >
              <Card
                type={type}
                item={item}
              />
            </li>
          ))}
        </ul>

        <DragOverlay
          dropAnimation={{
            duration: 300,
          }}
        >
          {activeItem && (
            <Card
              type={type}
              active={true}
              item={activeItem}
            />
          )}
        </DragOverlay>
      </div>
    </div>
  );
};
