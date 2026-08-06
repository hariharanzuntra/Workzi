import React from "react";
import { Avt } from "@/shared/components";
import { CalendarEvent as ICalendarEvent } from "../../types/team-calendar.types";
import { getEventColors } from "../../utils/team-calendar.utils";
import { cn } from "@/shared/utils";

interface CalendarEventProps {
  event: ICalendarEvent;
  onClick: () => void;
  compact?: boolean;
}

export function CalendarEvent({ event, onClick, compact = false }: CalendarEventProps) {
  const colors = getEventColors(event.type);

  if (compact) {
    return (
      <div
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        className={cn(
          "text-[9px] font-bold py-1 px-1.5 rounded-lg border hover:shadow-sm cursor-pointer transition-all truncate text-left flex items-center gap-1.5",
          colors.bg,
          colors.text,
          colors.border
        )}
        title={event.title}
      >
        <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", colors.dot)} />
        <span className="truncate">{event.title}</span>
      </div>
    );
  }

  const initials = event.employeeInitials || 
    (event.employeeName
      ? event.employeeName.split(" ").map((n) => n[0]).join("").toUpperCase()
      : "UN");

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={cn(
        "p-2.5 rounded-xl border hover:shadow-md cursor-pointer transition-all text-left flex items-start gap-2.5 select-none",
        colors.bg,
        colors.text,
        colors.border
      )}
    >
      {event.employee && (
        <Avt
          initials={initials}
          color={event.employeeColor || event.employee.color}
          size="sm"
          className="w-6 h-6 border-2 border-white shadow-sm shrink-0"
        />
      )}
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-bold truncate leading-none mb-1">
          {event.employeeName || "Company"}
        </p>
        <p className="text-[9px] font-medium leading-tight truncate text-gray-500">
          {event.title}
        </p>
      </div>
    </div>
  );
}
