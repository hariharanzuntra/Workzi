import React, { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { CalendarEvent as ICalendarEvent } from "../../types/team-calendar.types";
import { CalendarEvent } from "./CalendarEvent";
import { cn } from "@/shared/utils";

interface MonthCalendarProps {
  currentDate: Date;
  events: ICalendarEvent[];
  onEventClick: (event: ICalendarEvent) => void;
}

interface CalendarCell {
  day: number;
  dateStr: string;
  isCurrentMonth: boolean;
}

export function MonthCalendar({ currentDate, events, onEventClick }: MonthCalendarProps) {
  const [openPopoverDate, setOpenPopoverDate] = useState<string | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Reference date Wednesday, Aug 5, 2026
  const todayStr = "2026-08-05";

  // Weekdays header starting on Monday
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Generate calendar cells
  const cells = useMemo(() => {
    const firstDay = new Date(year, month, 1);
    const firstDayIdx = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const startOffset = (firstDayIdx === 0 ? 7 : firstDayIdx) - 1;

    const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const result: CalendarCell[] = [];

    // Prev month days
    for (let i = startOffset - 1; i >= 0; i--) {
      const prevDay = daysInPrevMonth - i;
      const prevDate = new Date(year, month - 1, prevDay);
      result.push({
        day: prevDay,
        dateStr: formatDateStr(prevDate),
        isCurrentMonth: false,
      });
    }

    // Current month days
    for (let i = 1; i <= daysInCurrentMonth; i++) {
      const currDate = new Date(year, month, i);
      result.push({
        day: i,
        dateStr: formatDateStr(currDate),
        isCurrentMonth: true,
      });
    }

    // Next month days to pad to 42 cells (6 rows)
    const remaining = 42 - result.length;
    for (let i = 1; i <= remaining; i++) {
      const nextDate = new Date(year, month + 1, i);
      result.push({
        day: i,
        dateStr: formatDateStr(nextDate),
        isCurrentMonth: false,
      });
    }

    return result;
  }, [year, month]);

  function formatDateStr(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  // Filter events for a cell date
  const getEventsForDate = (dateStr: string) => {
    return events.filter((e) => e.date === dateStr);
  };

  // Close popover on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setOpenPopoverDate(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex-1 flex flex-col h-full bg-[#F8FAFC]">
      {/* Weekday Header */}
      <div className="grid grid-cols-7 border-b border-[#E8E9ED] bg-white flex-shrink-0">
        {weekdays.map((w) => (
          <div
            key={w}
            className="py-2.5 text-center text-[10px] font-bold text-gray-500 uppercase tracking-wider border-r border-[#E8E9ED] last:border-r-0"
          >
            {w}
          </div>
        ))}
      </div>

      {/* Month Days Grid */}
      <div className="grid grid-cols-7 grid-rows-6 flex-1 divide-x divide-y divide-[#E8E9ED] border-b border-[#E8E9ED] overflow-hidden bg-white select-none">
        {cells.map((cell, idx) => {
          const dateEvents = getEventsForDate(cell.dateStr);
          const isToday = cell.dateStr === todayStr;
          const displayEvents = dateEvents.slice(0, 3);
          const remainingCount = dateEvents.length - 3;

          return (
            <div
              key={idx}
              className={cn(
                "p-2 flex flex-col min-h-[80px] bg-white transition-colors relative border-r border-b border-[#E8E9ED] last:border-r-0 hover:bg-[#F8FAFC]/40",
                !cell.isCurrentMonth && "bg-[#F8FAFC]/50 text-gray-400"
              )}
            >
              {/* Day Number Label */}
              <div className="flex justify-between items-center mb-1 flex-shrink-0">
                <span
                  className={cn(
                    "text-xs font-bold font-mono w-6 h-6 flex items-center justify-center rounded-full",
                    isToday ? "bg-[#5C5CFF] text-white" : "text-gray-700",
                    !cell.isCurrentMonth && "text-gray-400"
                  )}
                >
                  {cell.day}
                </span>
                {isToday && (
                  <span className="text-[8px] font-extrabold text-[#5C5CFF] bg-[#EEF2FF] px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                    Today
                  </span>
                )}
              </div>

              {/* Events stack */}
              <div className="flex-1 space-y-1.5 overflow-hidden">
                {displayEvents.map((evt) => (
                  <CalendarEvent
                    key={evt.id}
                    event={evt}
                    onClick={() => onEventClick(evt)}
                    compact
                  />
                ))}

                {remainingCount > 0 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenPopoverDate(cell.dateStr);
                    }}
                    className="w-full text-left text-[9px] font-bold text-[#5C5CFF] hover:text-[#4A4AFF] bg-[#EEF2FF]/60 hover:bg-[#EEF2FF] px-1.5 py-1 rounded-md transition-colors cursor-pointer"
                  >
                    +{remainingCount} more
                  </button>
                )}
              </div>

              {/* Popover overlay for remaining events */}
              {openPopoverDate === cell.dateStr && (
                <div
                  ref={popoverRef}
                  className="absolute left-2 right-2 top-2 z-[60] bg-white rounded-xl border border-gray-200 shadow-2xl p-3 space-y-2 text-left"
                >
                  <div className="flex justify-between items-center border-b border-gray-100 pb-1.5 mb-2">
                    <span className="text-xs font-bold text-gray-900">
                      Events for Aug {cell.day}
                    </span>
                    <button
                      onClick={() => setOpenPopoverDate(null)}
                      className="text-gray-400 hover:text-gray-600 p-0.5 rounded-md hover:bg-gray-150 transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </div>
                  <div className="space-y-1.5 max-h-[160px] overflow-y-auto">
                    {dateEvents.map((evt) => (
                      <CalendarEvent
                        key={evt.id}
                        event={evt}
                        onClick={() => {
                          setOpenPopoverDate(null);
                          onEventClick(evt);
                        }}
                        compact
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Helper to memoize cell calculations
import { useMemo } from "react";
