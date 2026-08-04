import React from "react";
import { Sidebar } from "@/app/layouts/sidebar";
import { SidebarResizeHandle } from "./SidebarResizeHandle";
import { cn } from "@/shared/utils";
import { AppPage } from "@/shared/types";

interface ResizableSidebarProps {
  page: AppPage;
  navigate: (p: AppPage, emp?: any, tabOrSection?: string) => void;
  onLogout: () => void;
  attendanceSection: "My Space" | "My Team";
  leaveSection: "My Space" | "My Team";
  teamSection: "Overview" | "Management";
  orgSection: "Overview" | "Management";

  width: number;
  isDragging: boolean;
  isCollapsed: boolean;
  isHidden: boolean;
  isMobile: boolean;
  handlePointerDown: (e: React.PointerEvent<HTMLDivElement>) => void;
  handlePointerMove: (e: React.PointerEvent<HTMLDivElement>) => void;
  handlePointerUp: (e: React.PointerEvent<HTMLDivElement>) => void;
  toggleSidebar: () => void;
  toggleCollapse: () => void;
}

export function ResizableSidebar({
  page,
  navigate,
  onLogout,
  attendanceSection,
  leaveSection,
  teamSection,
  orgSection,
  width,
  isDragging,
  isCollapsed,
  isHidden,
  isMobile,
  handlePointerDown,
  handlePointerMove,
  handlePointerUp,
  toggleSidebar,
  toggleCollapse,
}: ResizableSidebarProps) {
  return (
    <>
      {/* Mobile Drawer Overlay Backdrop */}
      {isMobile && !isHidden && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/40 z-40 transition-opacity duration-200"
        />
      )}

      <div
        style={{
          width: isHidden ? 0 : width,
          borderRightWidth: isHidden ? 0 : 1,
          transition: isDragging ? "none" : "width 180ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        className={cn(
          "relative h-full flex flex-col flex-shrink-0 bg-white border-r border-gray-200 overflow-hidden",
          isMobile && !isHidden && "fixed left-0 top-0 bottom-0 z-50 shadow-2xl"
        )}
      >
        <Sidebar
          page={page}
          navigate={navigate}
          collapsed={isCollapsed}
          onToggle={toggleCollapse}
          onLogout={onLogout}
          attendanceSection={attendanceSection}
          leaveSection={leaveSection}
          teamSection={teamSection}
          orgSection={orgSection}
          style={{
            width: "100%",
            borderRight: "none",
            transition: "none",
          }}
        />
        {!isHidden && !isMobile && (
          <SidebarResizeHandle
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            isDragging={isDragging}
          />
        )}
      </div>
    </>
  );
}
