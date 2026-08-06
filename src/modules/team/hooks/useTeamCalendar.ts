import { useState, useMemo } from "react";
import { CalendarViewMode, CalendarEvent } from "../types/team-calendar.types";

export function useTeamCalendar(initialEvents: CalendarEvent[]) {
  const [viewMode, setViewMode] = useState<CalendarViewMode>("Month");
  // Default reference date is Wednesday, August 5, 2026
  const [currentDate, setCurrentDate] = useState<Date>(new Date("2026-08-05"));

  const navigateToday = () => {
    setCurrentDate(new Date("2026-08-05"));
  };

  const navigatePrev = () => {
    setCurrentDate((prev) => {
      const next = new Date(prev);
      if (viewMode === "Month") {
        next.setMonth(prev.getMonth() - 1);
      } else {
        next.setDate(prev.getDate() - 7);
      }
      return next;
    });
  };

  const navigateNext = () => {
    setCurrentDate((prev) => {
      const next = new Date(prev);
      if (viewMode === "Month") {
        next.setMonth(prev.getMonth() + 1);
      } else {
        next.setDate(prev.getDate() + 7);
      }
      return next;
    });
  };

  return {
    viewMode,
    setViewMode,
    currentDate,
    setCurrentDate,
    navigateToday,
    navigatePrev,
    navigateNext,
  };
}
