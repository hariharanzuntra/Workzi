import React from "react";
import { cn } from "@/shared/utils";

interface SidebarResizeHandleProps {
  onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => void;
  onPointerMove: (e: React.PointerEvent<HTMLDivElement>) => void;
  onPointerUp: (e: React.PointerEvent<HTMLDivElement>) => void;
  isDragging: boolean;
}

export function SidebarResizeHandle({
  onPointerDown,
  onPointerMove,
  onPointerUp,
  isDragging,
}: SidebarResizeHandleProps) {
  return (
    <div
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      className="absolute top-0 right-0 bottom-0 w-[6px] cursor-col-resize z-50 select-none touch-none group"
    >
      <div
        className={cn(
          "w-[2px] h-full mx-auto transition-colors duration-150",
          isDragging
            ? "bg-[#5C5CFF]"
            : "bg-transparent group-hover:bg-gray-200"
        )}
      />
    </div>
  );
}
