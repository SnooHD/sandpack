import { LanesDataProps, LaneType } from "@/types/lanes.types";
import { DragEndEvent, DragMoveEvent } from "@dnd-kit/core";
import { useState, useEffect, useCallback } from "react";

export const useDnd = (data: string[]) => {
  const [lanesData, setLanesData] = useState<LanesDataProps[]>([
    {
      id: "progress",
      items: [],
    },
    {
      id: "review",
      items: [],
    },
    {
      id: "ready",
      items: [],
    },
  ]);

  useEffect(() => {
    const lanes = localStorage.getItem("lanes");
    if (!lanes) {
      setLanesData(
        lanesData.map((lane) => {
          const { id } = lane;
          return id === "progress" ? { id, items: data } : lane;
        })
      );
      return;
    }

    setLanesData(JSON.parse(lanes) as LanesDataProps[]);
  }, []);

  const onDragEnd = useCallback(
    (event: DragEndEvent) => {
      // reset items
      setActiveItem(null);
      setCollision(null);

      if (!event.over || !event.active.data.current) return;

      const overId = event.over.id as string;
      const { parent: parentId } = event.active.data.current;
      const parent = lanesData.find(({ id }) => id === parentId);
      if (!parent) return;

      const { id: itemId } = event.active;
      const activeItem = parent.items.find((id) => id === itemId);
      if (!activeItem) return;

      const updatedLanes = lanesData.map(({ id, items }) => {
        if (id === overId) {
          if (parentId === overId) {
            items = items.filter((id) => id !== itemId);
          }
          items = [activeItem, ...items];
        } else if (id === parentId) {
          items = items.filter((id) => id !== itemId);
        }

        return {
          id,
          items,
        };
      });

      setLanesData(updatedLanes);
      localStorage.setItem("lanes", JSON.stringify(updatedLanes));
    },
    [lanesData]
  );

  const [collision, setCollision] = useState<LaneType | null>(null);
  const onDragMove = useCallback(
    (event: DragMoveEvent) =>
      setCollision((event.over?.id as LaneType) || null),
    []
  );

  const [activeItem, setActiveItem] = useState<string | null>(null);
  const onDragStart = useCallback((event: DragMoveEvent) => {
    setActiveItem((event.active?.id as string) || null);
    setCollision((event.active?.data.current?.parent as LaneType) || null);
  }, []);

  return {
    onDragEnd,
    onDragMove,
    onDragStart,
    activeItem,
    collision,
    lanesData,
  };
};
