import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CalendarViewMode } from "../../types/team-calendar.types";

interface CalendarToolbarProps {
  viewMode: CalendarViewMode;
  setViewMode: (v: CalendarViewMode) => void;
  currentDate: Date;
  navigateToday: () => void;
  navigatePrev: () => void;
  navigateNext: () => void;
}

export function CalendarToolbar({
  viewMode,
  setViewMode,
  currentDate,
  navigateToday,
  navigatePrev,
  navigateNext,
}: CalendarToolbarProps) {
  // Format Month Year (e.g., "August 2026")
  const monthYearLabel = currentDate.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  return (
    <div className="flex items-center justify-between py-3 px-6 bg-white border-b border-[#E8E9ED] flex-shrink-0 text-left select-none">
      {/* Left controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={navigateToday}
          className="h-[34px] px-4 text-xs font-bold text-gray-700 bg-white border border-[#E8E9ED] rounded-[8px] hover:bg-gray-50 transition-colors cursor-pointer"
        >
          Today
        </button>
        <div className="flex items-center border border-[#E8E9ED] rounded-[8px] bg-white h-[34px] overflow-hidden">
          <button
            onClick={navigatePrev}
            className="w-9 h-full flex items-center justify-center text-gray-600 hover:bg-gray-50 border-r border-[#E8E9ED] transition-colors cursor-pointer"
          >
            <ChevronLeft size={14} strokeWidth={2} />
          </button>
          <button
            onClick={navigateNext}
            className="w-9 h-full flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <ChevronRight size={14} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Title center */}
      <h2 className="text-sm font-extrabold text-gray-800 uppercase tracking-wider">
        {monthYearLabel}
      </h2>

      {/* Right controls - switcher */}
      <div>
        <select
          value={viewMode}
          onChange={(e) => setViewMode(e.target.value as CalendarViewMode)}
          className="h-[34px] px-3.5 bg-white border border-[#E8E9ED] rounded-[8px] text-xs font-bold text-gray-700 outline-none cursor-pointer hover:bg-gray-50 focus:border-[#5C5CFF]/30 transition-colors"
        >
          <option value="Month">Month</option>
          <option value="Week">Week</option>
        </select>
      </div>
    </div>
  );
}
