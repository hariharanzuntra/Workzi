import React from "react";
import { Users, Calendar, Gift, Award, HelpCircle } from "lucide-react";
import { cn } from "@/shared/utils";

interface CalendarSidebarProps {
  className?: string;
}

export function CalendarSidebar({ className }: CalendarSidebarProps) {
  // Hardcoded values to match the instructions perfectly
  return (
    <div
      className={cn(
        "w-[280px] bg-white border-l border-[#E8E9ED] flex flex-col h-full overflow-y-auto p-5 space-y-6 text-left select-none",
        className
      )}
    >
      {/* Team Availability */}
      <div>
        <h3 className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-3.5 flex items-center gap-1.5">
          <Users size={12} className="text-[#5C5CFF]" />
          Team Availability
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Present", count: 11, color: "text-green-600 bg-green-50 border-green-100" },
            { label: "WFH", count: 2, color: "text-blue-600 bg-blue-50 border-blue-100" },
            { label: "Leave", count: 1, color: "text-[#5C5CFF] bg-[#EEF2FF] border-[#E0E7FF]" },
            { label: "Absent", count: 1, color: "text-red-600 bg-red-50 border-red-100" },
          ].map((item) => (
            <div
              key={item.label}
              className={cn(
                "p-3 rounded-xl border flex flex-col items-center justify-center text-center",
                item.color
              )}
            >
              <span className="text-lg font-black leading-none mb-1">{item.count}</span>
              <span className="text-[9px] font-bold uppercase tracking-wider opacity-80">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full h-[1px] bg-gray-100" />

      {/* Upcoming Leave */}
      <div>
        <h3 className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-3.5 flex items-center gap-1.5">
          <Calendar size={12} className="text-red-500" />
          Upcoming Leave
        </h3>
        <div className="space-y-2.5">
          {[
            { name: "Sarah Mitchell", range: "Aug 8 – Aug 10", color: "bg-red-50 text-red-700 border-red-100" },
            { name: "Marcus Johnson", range: "Aug 21", color: "bg-red-50 text-red-700 border-red-100" },
          ].map((item) => (
            <div key={item.name} className="flex justify-between items-center text-xs font-semibold p-2.5 rounded-xl border border-gray-100 bg-[#F8FAFC]">
              <span className="text-gray-800">{item.name}</span>
              <span className={cn("text-[9px] font-bold px-2 py-0.5 rounded-md", item.color)}>
                {item.range}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full h-[1px] bg-gray-100" />

      {/* Birthdays */}
      <div>
        <h3 className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-3.5 flex items-center gap-1.5">
          <Gift size={12} className="text-orange-500" />
          Birthdays
        </h3>
        <div className="space-y-2.5">
          {[
            { name: "Priya Sharma", date: "Tomorrow 🎂", color: "bg-orange-50 text-orange-700 border-orange-100" },
            { name: "David Chen", date: "Aug 12", color: "bg-gray-50 text-gray-600 border-gray-150" },
          ].map((item) => (
            <div key={item.name} className="flex justify-between items-center text-xs font-semibold p-2.5 rounded-xl border border-gray-100 bg-[#F8FAFC]">
              <span className="text-gray-800">{item.name}</span>
              <span className={cn("text-[9px] font-bold px-2 py-0.5 rounded-md", item.color)}>
                {item.date}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full h-[1px] bg-gray-100" />

      {/* Work Anniversaries */}
      <div>
        <h3 className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-3.5 flex items-center gap-1.5">
          <Award size={12} className="text-teal-500" />
          Work Anniversaries
        </h3>
        <div className="space-y-2.5">
          {[
            { name: "Marcus Johnson", years: "4 Years", color: "bg-teal-50 text-teal-700 border-teal-100" },
            { name: "Fatima Al-Hassan", years: "2 Years", color: "bg-teal-50 text-teal-700 border-teal-100" },
          ].map((item) => (
            <div key={item.name} className="flex justify-between items-center text-xs font-semibold p-2.5 rounded-xl border border-gray-100 bg-[#F8FAFC]">
              <span className="text-gray-800">{item.name}</span>
              <span className={cn("text-[9px] font-bold px-2 py-0.5 rounded-md", item.color)}>
                {item.years}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full h-[1px] bg-gray-100" />

      {/* Upcoming Holidays */}
      <div>
        <h3 className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-3.5 flex items-center gap-1.5">
          <Calendar size={12} className="text-purple-500" />
          Upcoming Holidays
        </h3>
        <div className="space-y-2.5">
          {[
            { name: "Independence Day", date: "Aug 15", color: "bg-purple-50 text-purple-700 border-purple-100" },
          ].map((item) => (
            <div key={item.name} className="flex justify-between items-center text-xs font-semibold p-2.5 rounded-xl border border-gray-100 bg-[#F8FAFC]">
              <span className="text-gray-800">{item.name}</span>
              <span className={cn("text-[9px] font-bold px-2 py-0.5 rounded-md", item.color)}>
                {item.date}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full h-[1px] bg-gray-100" />

      {/* Quick Insights */}
      <div>
        <h3 className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-3.5 flex items-center gap-1.5">
          <HelpCircle size={12} className="text-gray-400" />
          Quick Insights
        </h3>
        <div className="space-y-2">
          {[
            { label: "Meetings Today", val: 2 },
            { label: "People Available", val: 11 },
            { label: "Pending Leave", val: 3 },
          ].map((item) => (
            <div key={item.label} className="flex justify-between items-center text-xs font-semibold py-1.5 border-b border-gray-100 last:border-0">
              <span className="text-gray-500">{item.label}</span>
              <span className="text-gray-900 font-extrabold">{item.val}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
