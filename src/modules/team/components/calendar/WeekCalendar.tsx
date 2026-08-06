import React from "react";
import { CalendarEvent as ICalendarEvent } from "../../types/team-calendar.types";
import { CalendarEvent } from "./CalendarEvent";
import { cn } from "@/shared/utils";

interface WeekCalendarProps {
  currentDate: Date;
  events: ICalendarEvent[];
  onEventClick: (event: ICalendarEvent) => void;
}

export function WeekCalendar({ currentDate, events, onEventClick }: WeekCalendarProps) {
  // Today's date Wednesday, Aug 5, 2026
  const todayStr = "2026-08-05";

  // Calculate Monday date of the week
  const monday = React.useMemo(() => {
    const day = currentDate.getDay();
    const distanceToMonday = (day === 0 ? 7 : day) - 1;
    const mon = new Date(currentDate);
    mon.setDate(currentDate.getDate() - distanceToMonday);
    return mon;
  }, [currentDate]);

  // Weekdays structure
  const weekDays = React.useMemo(() => {
    const result = [];
    const weekdaysLabels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      const dateStr = formatDateStr(d);
      result.push({
        label: weekdaysLabels[i],
        date: d,
        dateStr,
        dayOfMonth: d.getDate(),
        monthLabel: d.toLocaleDateString("en-US", { month: "short" }),
      });
    }
    return result;
  }, [monday]);

  function formatDateStr(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  // Get date range label (e.g. "Jul 27 – Aug 2")
  const dateRangeLabel = React.useMemo(() => {
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    const formatDay = (d: Date) => d.getDate();
    const formatMonth = (d: Date) => d.toLocaleDateString("en-US", { month: "short" });

    if (monday.getMonth() === sunday.getMonth()) {
      return `${formatMonth(monday)} ${formatDay(monday)} – ${formatDay(sunday)}`;
    } else {
      return `${formatMonth(monday)} ${formatDay(monday)} – ${formatMonth(sunday)} ${formatDay(sunday)}`;
    }
  }, [monday]);

  // Filter events for day
  const getEventsForDate = (dateStr: string) => {
    return events.filter((e) => e.date === dateStr);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#F8FAFC]">
      {/* Date Range Subheader */}
      <div className="px-6 py-2 bg-white border-b border-[#E8E9ED] text-left flex-shrink-0">
        <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-[6px]">
          {dateRangeLabel}
        </span>
      </div>

      {/* Week Columns Grid */}
      <div className="grid grid-cols-7 flex-1 divide-x divide-[#E8E9ED] bg-white overflow-hidden select-none">
        {weekDays.map((wd) => {
          const dayEvents = getEventsForDate(wd.dateStr);
          const isToday = wd.dateStr === todayStr;

          return (
            <div
              key={wd.dateStr}
              className={cn(
                "flex flex-col h-full overflow-hidden bg-white border-r border-[#E8E9ED] last:border-r-0",
                isToday && "bg-[#5C5CFF]/5"
              )}
            >
              {/* Column Header */}
              <div className="p-3 border-b border-[#E8E9ED] text-left flex-shrink-0">
                <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wide leading-none mb-1.5">
                  {wd.label}
                </p>
                <div className="flex items-baseline gap-1">
                  <span
                    className={cn(
                      "text-sm font-extrabold font-mono",
                      isToday ? "text-[#5C5CFF]" : "text-gray-800"
                    )}
                  >
                    {wd.dayOfMonth}
                  </span>
                  <span className="text-[10px] text-gray-400 font-semibold">
                    {wd.monthLabel}
                  </span>
                </div>
              </div>

              {/* Events lists scrollable container */}
              <div className="flex-1 overflow-y-auto p-2.5 space-y-2.5 scrollbar-thin">
                {dayEvents.length === 0 ? (
                  <div className="border border-dashed border-gray-150 rounded-xl py-6 text-center text-[10px] text-gray-400 font-semibold italic">
                    No events
                  </div>
                ) : (
                  dayEvents.map((evt) => (
                    <CalendarEvent
                      key={evt.id}
                      event={evt}
                      onClick={() => onEventClick(evt)}
                    />
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
