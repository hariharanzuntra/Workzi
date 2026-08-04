import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Building2,
  Clock,
  CalendarDays,
  ClipboardList,
  FileText,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { AppPage } from "@/shared/types";
import { cn } from "@/shared/utils";
import { Avt } from "@/shared/components";

export function Sidebar({
  page,
  navigate,
  collapsed,
  onToggle,
  onLogout,
  style,
}: {
  page: AppPage;
  navigate: (p: AppPage, emp?: any, tabOrSection?: string) => void;
  collapsed: boolean;
  onToggle: () => void;
  onLogout: () => void;
  attendanceSection: "My Space" | "My Team";
  leaveSection: "My Space" | "My Team";
  teamSection: "Overview" | "Management";
  orgSection: "Overview" | "Management";
  style?: React.CSSProperties;
}) {
  const isActive = (p: AppPage) =>
    page === p ||
    (p === "organization" &&
      (page === "employee-add" || page === "employee-profile")) ||
    (p === "team" && page === p);

  const NavItem = ({
    id,
    label,
    icon: Icon,
    tabOrSection,
  }: {
    id: AppPage;
    label: string;
    icon: any;
    tabOrSection?: string;
  }) => (
    <button
      onClick={() => navigate(id, undefined, tabOrSection)}
      title={collapsed ? label : undefined}
      className={cn(
        "w-full flex items-center gap-2.5 px-3.5 py-2 text-sm transition-colors relative",
        isActive(id)
          ? "bg-[#EEF2FF] text-[#5C5CFF] font-medium"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
      )}
    >
      {isActive(id) && (
        <div className="absolute left-0 top-1 bottom-1 w-0.5 bg-[#5C5CFF] rounded-r" />
      )}
      <Icon size={16} className="flex-shrink-0" />
      {!collapsed && <span className="whitespace-nowrap">{label}</span>}
    </button>
  );

  return (
    <div
      style={style}
      className={cn(
        "h-full bg-white border-r border-gray-200 flex flex-col flex-shrink-0 overflow-hidden",
        (!style || style.width === undefined) && (collapsed ? "w-14" : "w-56"),
        (!style || style.transition === undefined) && "transition-all duration-200"
      )}
    >
      <div className="h-14 flex items-center gap-2.5 px-3.5 border-b border-gray-200 flex-shrink-0">
        <div className="w-8 h-8 bg-[#5C5CFF] rounded-lg flex items-center justify-center flex-shrink-0">
          <Users size={16} className="text-white" />
        </div>
        {!collapsed && (
          <span className="font-semibold text-gray-800 text-sm whitespace-nowrap">
            Attendance HRMS
          </span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto py-3 overflow-x-hidden space-y-3">
        <div className="space-y-1">
          <NavItem id="my-space" label="Dashboard" icon={LayoutDashboard} />
          <NavItem id="team" label="Team" icon={Users} />
          <NavItem id="organization" label="Organization" icon={Building2} />
        </div>

        <div className="border-t border-gray-150 my-2 mx-3" />

        <div className="space-y-1">
          <NavItem id="attendance" label="Attendance" icon={Clock} />
          <NavItem id="leave" label="Leave" icon={CalendarDays} />
          <NavItem id="tasks" label="Tasks" icon={ClipboardList} />
          <NavItem id="documents" label="Documents" icon={FileText} />
        </div>

        <div className="border-t border-gray-150 my-2 mx-3" />

        <div className="space-y-1">
          <NavItem id="settings" label="Settings" icon={Settings} />
          <NavItem id="support" label="Help & Support" icon={HelpCircle} />
        </div>
      </div>

      <div className="p-2 flex-shrink-0 flex items-center justify-center">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center py-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>
    </div>
  );
}
