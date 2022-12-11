import React, { useState } from "react";
import { Lane } from "@/components/Lanes/Lane.component";
import { DndContext } from "@dnd-kit/core";
import { useDnd } from "@/hooks/useDnd.hook";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

interface LanesProps {
  data: string[];
}

export const Lanes = ({ data }: LanesProps): JSX.Element => {
  const {
    onDragEnd,
    onDragStart,
    onDragMove,
    collision,
    activeItem,
    lanesData,
  } = useDnd(data);

  return (
    <div className="min-w-block flex px-sm sm:px-lg">
      <DndContext
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragMove={onDragMove}
      >
        {lanesData.map(({ id, items }) => (
          <Lane
            key={`lane-${id}`}
            type={id}
            activeItem={activeItem}
            collision={collision === id}
            items={items}
          />
        ))}
      </DndContext>
    </div>
  );
};
