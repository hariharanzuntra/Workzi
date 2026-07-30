import React from "react";
import { LogOut, RefreshCw } from "lucide-react";
import { AppPage } from "@/shared/types";
import { Sidebar } from "./sidebar";
import { AppHeader } from "./top-navigation";
import { NotificationsPanel } from "./notifications-panel";
import { QuickActionsMenu } from "./quick-actions-menu";
import { AIPanel } from "./ai-panel";

export function AppShell({
  page,
  navigate,
  sidebarCollapsed,
  setSidebarCollapsed,
  aiOpen,
  setAiOpen,
  notifOpen,
  setNotifOpen,
  quickActionsOpen,
  setQuickActionsOpen,
  showLogoutConfirm,
  setShowLogoutConfirm,
  loggingOut,
  handleLogout,
  headerTitle,
  workspaceSwitch,
  headerTabs,
  activeHeaderTab,
  onHeaderTabChange,
  headerToolbar,
  onQuickCreate,
  onSearchResultClick,
  unreadNotifications,
  children,
}: {
  page: AppPage;
  navigate: (p: AppPage, emp?: any, tabOrSection?: string) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (c: boolean) => void;
  aiOpen: boolean;
  setAiOpen: (o: boolean) => void;
  notifOpen: boolean;
  setNotifOpen: (o: boolean) => void;
  quickActionsOpen: boolean;
  setQuickActionsOpen: (o: boolean) => void;
  showLogoutConfirm: boolean;
  setShowLogoutConfirm: (o: boolean) => void;
  loggingOut: boolean;
  handleLogout: () => void;
  headerTitle: string;
  workspaceSwitch?: React.ReactNode;
  headerTabs?: string[];
  activeHeaderTab?: string;
  onHeaderTabChange?: (tab: string) => void;
  headerToolbar?: React.ReactNode;
  onQuickCreate?: (action: string) => void;
  onSearchResultClick?: (category: string, item: any) => void;
  unreadNotifications?: number;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background overflow-hidden text-left">
      <Sidebar
        page={page}
        navigate={navigate}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        onLogout={() => setShowLogoutConfirm(true)}
        attendanceSection="My Space"
        leaveSection="My Space"
        teamSection="Overview"
        orgSection="Overview"
      />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <AppHeader
          title={headerTitle}
          workspaceSwitch={workspaceSwitch}
          tabs={headerTabs}
          activeTab={activeHeaderTab}
          onTabChange={onHeaderTabChange}
          toolbar={headerToolbar}
          onQuickCreate={onQuickCreate}
          onSearchResultClick={onSearchResultClick}
          onNotifClick={() => setNotifOpen(true)}
          onSettingsClick={() => navigate("settings")}
          onProfileClick={() => navigate("profile")}
          onLogout={() => setShowLogoutConfirm(true)}
          unreadNotifications={unreadNotifications}
        />
        <main className="flex-1 overflow-auto bg-[#F7F8FA] relative">
          {children}
        </main>

        {notifOpen && (
          <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)}>
            <div onClick={(e) => e.stopPropagation()}>
              <NotificationsPanel
                onClose={() => setNotifOpen(false)}
                navigate={navigate}
                onViewAll={() => {
                  setNotifOpen(false);
                  navigate("notifications");
                }}
              />
            </div>
          </div>
        )}
        {quickActionsOpen && (
          <div className="fixed inset-0 z-40" onClick={() => setQuickActionsOpen(false)}>
            <div onClick={(e) => e.stopPropagation()}>
              <QuickActionsMenu
                onClose={() => setQuickActionsOpen(false)}
                navigate={navigate}
              />
            </div>
          </div>
        )}
      </div>
      {aiOpen && <AIPanel onClose={() => setAiOpen(false)} navigate={navigate} />}

      {/* Logout Confirmation */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowLogoutConfirm(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
              <LogOut size={24} className="text-red-500" />
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-2">
              Sign out of Attendance HRMS?
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to sign out? Any unsaved changes will be lost.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="flex-1 px-4 py-2.5 bg-red-500 rounded-xl text-sm font-medium text-white hover:bg-red-600 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {loggingOut ? (
                  <>
                    <RefreshCw size={14} className="animate-spin" />
                    Signing out…
                  </>
                ) : (
                  <>
                    <LogOut size={14} />
                    Sign Out
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
