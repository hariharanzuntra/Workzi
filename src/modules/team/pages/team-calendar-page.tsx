import React, { useState, useEffect, useMemo } from "react";
import { CalendarToolbar } from "../components/calendar/CalendarToolbar";
import { MonthCalendar } from "../components/calendar/MonthCalendar";
import { WeekCalendar } from "../components/calendar/WeekCalendar";
import { CalendarSidebar } from "../components/calendar/CalendarSidebar";
import { CalendarDrawer } from "../components/calendar/CalendarDrawer";
import { useTeamCalendar } from "../hooks/useTeamCalendar";
import { generateTeamEvents } from "../utils/team-calendar.utils";
import { CalendarEvent } from "../types/team-calendar.types";
import { EMPLOYEES } from "@/modules/organization/data/employees";
import { Drawer } from "@/shared/components";
import { Sliders } from "lucide-react";

interface TeamCalendarPageProps {
  deptFilter: string;
  teamReqs: any[];
  tasks: any[];
}

export function TeamCalendarPage({ deptFilter, teamReqs, tasks }: TeamCalendarPageProps) {
  // Determine current department team
  const currentTeam = useMemo(() => {
    return deptFilter === "All" ? "HR" : deptFilter;
  }, [deptFilter]);

  // Generate events based on current team and date
  const events = useMemo(() => {
    return generateTeamEvents(EMPLOYEES, currentTeam, teamReqs, tasks);
  }, [currentTeam, teamReqs, tasks]);

  const {
    viewMode,
    setViewMode,
    currentDate,
    navigateToday,
    navigatePrev,
    navigateNext,
  } = useTeamCalendar(events);

  // Selected event state for detail drawer
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  // Handle responsive screens
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;
  const isDesktop = windowWidth >= 1024;

  return (
    <div className="flex flex-col h-full bg-[#F7F8FA] overflow-hidden select-none">
      {/* Calendar Navigation Toolbar */}
      <CalendarToolbar
        viewMode={viewMode}
        setViewMode={setViewMode}
        currentDate={currentDate}
        navigateToday={navigateToday}
        navigatePrev={navigatePrev}
        navigateNext={navigateNext}
      />

      {/* Mobile Sidebar Trigger (Floating Button or Header row) */}
      {isMobile && (
        <div className="px-6 py-2 bg-white border-b border-[#E8E9ED] text-left flex justify-between items-center">
          <span className="text-xs font-semibold text-gray-500">
            Team: <strong className="text-gray-800">{currentTeam}</strong>
          </span>
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#EEF2FF] hover:bg-[#E0E7FF] text-[#5C5CFF] text-[11px] font-bold rounded-lg transition-colors cursor-pointer"
          >
            <Sliders size={12} />
            Show Insights
          </button>
        </div>
      )}

      {/* Main Layout Area */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Calendar Viewport */}
        <div className="flex-1 h-full overflow-y-auto flex flex-col">
          {events.length === 0 ? (
            <div className="flex-1 flex items-center justify-center bg-white p-8">
              <p className="text-xs font-semibold text-gray-400 italic">
                No team events scheduled.
              </p>
            </div>
          ) : viewMode === "Month" ? (
            <MonthCalendar
              currentDate={currentDate}
              events={events}
              onEventClick={setSelectedEvent}
            />
          ) : (
            <WeekCalendar
              currentDate={currentDate}
              events={events}
              onEventClick={setSelectedEvent}
            />
          )}
        </div>

        {/* Desktop Sidebar (inline) */}
        {isDesktop && <CalendarSidebar />}

        {/* Tablet Sidebar (below calendar inside scroll) */}
        {isTablet && (
          <div className="w-full border-t border-[#E8E9ED] bg-white max-h-[300px] overflow-y-auto">
            <CalendarSidebar className="w-full flex-row flex-wrap gap-x-8 gap-y-4 border-l-0" />
          </div>
        )}

        {/* Mobile Sidebar (rendered inside a Drawer modal overlay) */}
        {isMobile && (
          <Drawer
            isOpen={mobileSidebarOpen}
            onClose={() => setMobileSidebarOpen(false)}
            title="Team Insights & Availability"
          >
            <CalendarSidebar className="w-full border-l-0 p-0" />
          </Drawer>
        )}
      </div>

      {/* Event Details Drawer */}
      <CalendarDrawer
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        event={selectedEvent}
      />
    </div>
  );
}
