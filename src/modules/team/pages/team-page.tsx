import React, { useState, useEffect } from "react";
import { Clock, Plus, Send, Check, X, Phone } from "lucide-react";
import { FeedPost, Employee, AppPage } from "@/shared/types";
import { TeamTask } from "../types";
import { cn } from "@/shared/utils";
import { Btn, Modal, Drawer, InputField, SelectField, Avt, StatusBadge } from "@/shared/components";
import { OverviewTab } from "../components/overview/overview-tab";
import { ReporteesTab } from "../components/reportees/reportees-tab";
import { ApprovalsTab } from "../components/approvals/approvals-tab";
import { CreateTaskDrawer, TaskDetailsDrawer } from "@/modules/tasks";
import { FeedTab } from "../components/feed/feed-tab";
import { AnnouncementsTab } from "../components/announcements/announcements-tab";
import { TeamCalendarPage } from "./team-calendar-page";
import { INITIAL_POSTS, TEAM_TASKS } from "../data/team-data";
import { EMPLOYEES } from "@/modules/organization/data/employees";
import { LEAVE_REQUESTS } from "@/modules/leave/data/leave-requests";

interface TeamPageProps {
  navigate: (p: AppPage, emp?: any, tabOrSection?: string) => void;
  activeTab: string;
  search?: string;
  showCreatePost: boolean;
  setShowCreatePost: (b: boolean) => void;
  showCreateAnnouncement: boolean;
  setShowCreateAnnouncement: (b: boolean) => void;
  showCreateTask: boolean;
  setShowCreateTask: (b: boolean) => void;
  reporteesViewMode: "list" | "grid";
  showTeamFilter: boolean;
  setShowTeamFilter: (b: boolean) => void;
  deptFilter: string;
  setDeptFilter: (v: string) => void;
  locationFilter: string;
  setLocationFilter: (v: string) => void;
  showCreateDiscussion: boolean;
  setShowCreateDiscussion: (b: boolean) => void;
  setAttendanceSection: (sec: "My Space" | "My Team") => void;
  setLeaveSection: (sec: "My Space" | "My Team") => void;
  boardInsightsOpen: boolean;
  setBoardInsightsOpen: (b: boolean) => void;
  tasks: TeamTask[];
  setTasks: React.Dispatch<React.SetStateAction<TeamTask[]>>;
}

export function TeamPage({
  navigate,
  activeTab,
  search = "",
  showCreatePost,
  setShowCreatePost,
  showCreateAnnouncement,
  setShowCreateAnnouncement,
  showCreateTask,
  setShowCreateTask,
  reporteesViewMode,
  showTeamFilter,
  setShowTeamFilter,
  deptFilter,
  setDeptFilter,
  locationFilter,
  setLocationFilter,
  showCreateDiscussion,
  setShowCreateDiscussion,
  setAttendanceSection,
  setLeaveSection,
  boardInsightsOpen,
  setBoardInsightsOpen,
  tasks: teamTasks,
  setTasks: setTeamTasks,
}: TeamPageProps) {
  const [tab, setTab] = useState("Overview");

  // Sync activeTab to local tab state
  useEffect(() => {
    setTab(activeTab);
  }, [activeTab]);

  const [statusFilter, setStatusFilter] = useState("All");
  const [desigFilter, setDesigFilter] = useState("All");
  const [selectedEmp, setSelectedEmp] = useState<Employee | null>(null);
  const [teamReqs, setTeamReqs] = useState(LEAVE_REQUESTS);


  const [tApproveId, setTApproveId] = useState<string | null>(null);
  const [tRejectId, setTRejectId] = useState<string | null>(null);
  const [tRejectReason, setTRejectReason] = useState("");
  const [tApprovalDetailId, setTApprovalDetailId] = useState<string | null>(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailBody, setEmailBody] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [showCallModal, setShowCallModal] = useState(false);
  const [showAssignTask, setShowAssignTask] = useState(false);
  const [showAssignShift, setShowAssignShift] = useState(false);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };



  // --- FEED COLLABORATION SPACE STATE ---
  const [posts, setPosts] = useState<FeedPost[]>(INITIAL_POSTS);

  // Centralized Modal State System
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const handleCloseModal = () => {
    setActiveModal(null);
    setShowCreateDiscussion(false);
    setTApproveId(null);
    setTRejectId(null);
    setShowTeamFilter(false);
    setShowEmailModal(false);
    setShowCallModal(false);
    setShowAssignTask(false);
    setShowAssignShift(false);
  };

  // Sync prop-based triggers to activeModal
  useEffect(() => {
    if (showCreateDiscussion) {
      setActiveModal("new-discussion");
    }
  }, [showCreateDiscussion]);



  useEffect(() => {
    if (showAssignShift) {
      setActiveModal("assign-shift");
    } else if (activeModal === "assign-shift") {
      setActiveModal(null);
    }
  }, [showAssignShift]);

  useEffect(() => {
    if (showEmailModal) {
      setActiveModal("email");
    } else if (activeModal === "email") {
      setActiveModal(null);
    }
  }, [showEmailModal]);

  useEffect(() => {
    if (showCallModal) {
      setActiveModal("call");
    } else if (activeModal === "call") {
      setActiveModal(null);
    }
  }, [showCallModal]);

  useEffect(() => {
    if (tApproveId) {
      setActiveModal("approve-leave");
    } else if (activeModal === "approve-leave") {
      setActiveModal(null);
    }
  }, [tApproveId]);

  useEffect(() => {
    if (tRejectId) {
      setActiveModal("reject-leave");
    } else if (activeModal === "reject-leave") {
      setActiveModal(null);
    }
  }, [tRejectId]);

  useEffect(() => {
    if (showTeamFilter) {
      setActiveModal("filter-members");
    } else if (activeModal === "filter-members") {
      setActiveModal(null);
    }
  }, [showTeamFilter]);

  const approveT = (id: string) => {
    setTApprovalDetailId(null);
    setTApproveId(id);
    setActiveModal("approve-leave");
  };
  const rejectT = (id: string) => {
    setTApprovalDetailId(null);
    setTRejectId(id);
    setTRejectReason("");
    setActiveModal("reject-leave");
  };
  const confirmApproveT = () => {
    if (!tApproveId) return;
    setTeamReqs((r) =>
      r.map((x) => (x.id === tApproveId ? { ...x, status: "Approved" } : x))
    );
    handleCloseModal();
  };
  const confirmRejectT = () => {
    if (!tRejectId || !tRejectReason.trim()) return;
    setTeamReqs((r) =>
      r.map((x) =>
        x.id === tRejectId
          ? { ...x, status: "Rejected", rejectReason: tRejectReason }
          : x
      )
    );
    handleCloseModal();
  };

  const filtered = EMPLOYEES.filter((e) => {
    const ms =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.designation.toLowerCase().includes(search.toLowerCase());
    const md = deptFilter === "All" || e.dept === deptFilter;
    const mst = statusFilter === "All" || e.status === statusFilter;
    const mdg = desigFilter === "All" || e.designation === desigFilter;
    const mloc = locationFilter === "All" || e.branch === locationFilter;
    return ms && md && mst && mdg && mloc;
  });

  const depts = ["All", ...Array.from(new Set(EMPLOYEES.map((e) => e.dept))).sort()];
  const desigs = ["All", ...Array.from(new Set(EMPLOYEES.map((e) => e.designation))).sort()];
  const locations = ["All", ...Array.from(new Set(EMPLOYEES.map((e) => e.branch))).sort()];

  // Redesigned Tasks selection
  const [selectedTeamTask, setSelectedTeamTask] = useState<any>(null);

  return (
    <div className="flex flex-col h-full bg-[#F7F8FA] overflow-hidden">
      <div className="flex-1 overflow-hidden">
        {/* ── OVERVIEW TAB ── */}
        {tab === "Overview" && (
          <OverviewTab
            deptFilter={deptFilter}
            teamReqs={teamReqs}
            setTeamTab={setTab}
            setAttendanceSection={setAttendanceSection}
            setLeaveSection={setLeaveSection}
            navigate={navigate}
            tasks={teamTasks}
          />
        )}

        {/* ── FEED TAB ── */}
        {tab === "Feed" && (
          <FeedTab
            posts={posts}
            setPosts={setPosts}
            depts={depts}
            showCreateDiscussion={showCreateDiscussion}
            setShowCreateDiscussion={setShowCreateDiscussion}
          />
        )}

        {/* ── ANNOUNCEMENTS TAB ── */}
        {tab === "Announcements" && (
          <AnnouncementsTab
            showCreateAnnouncement={showCreateAnnouncement}
            setShowCreateAnnouncement={setShowCreateAnnouncement}
          />
        )}

        {/* ── REPORTEES TAB ── */}
        {tab === "Reportees" && (
          <ReporteesTab
            filtered={filtered}
            reporteesViewMode={reporteesViewMode}
            navigate={navigate}
          />
        )}

        {/* ── APPROVALS TAB ── */}
        {tab === "Approvals" && (
          <ApprovalsTab
            teamReqs={teamReqs}
            tApprovalDetailId={tApprovalDetailId}
            setTApprovalDetailId={setTApprovalDetailId}
            approveT={approveT}
            rejectT={rejectT}
          />
        )}

        {/* ── CALENDAR TAB ── */}
        {tab === "Calendar" && (
          <TeamCalendarPage
            deptFilter={deptFilter}
            teamReqs={teamReqs}
            tasks={teamTasks}
          />
        )}
      </div>

      {/* ── TeamPage: Assign Shift Modal ── */}
      {activeModal === "assign-shift" && selectedEmp && (
        <Modal
          title={`Assign Shift · ${selectedEmp.name}`}
          onClose={() => {
            setShowAssignShift(false);
            handleCloseModal();
          }}
          width="max-w-md"
        >
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-4 bg-gray-55 rounded-xl">
              <Avt initials={selectedEmp.initials} color={selectedEmp.color} size="sm" />
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {selectedEmp.name}
                </p>
                <p className="text-xs text-gray-500">
                  Current: {selectedEmp.shift}
                </p>
              </div>
            </div>
            <SelectField label="New Shift">
              <option>Morning (6AM–2PM)</option>
              <option>General (9AM–6PM)</option>
              <option>Evening (2PM–10PM)</option>
              <option>Night (10PM–6AM)</option>
              <option>Flexible</option>
            </SelectField>
            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
              <Btn
                variant="outline"
                onClick={() => {
                  setShowAssignShift(false);
                  handleCloseModal();
                }}
              >
                Cancel
              </Btn>
              <Btn
                onClick={() => {
                  setShowAssignShift(false);
                  handleCloseModal();
                }}
              >
                <Clock size={13} />
                Save Shift
              </Btn>
            </div>
          </div>
        </Modal>
      )}

      {/* ── TeamPage: Approve Leave Modal ── */}
      {activeModal === "approve-leave" &&
        tApproveId &&
        (() => {
          const req = teamReqs.find((r) => r.id === tApproveId);
          return req ? (
            <Modal
              title="Approve Leave"
              onClose={() => {
                setTApproveId(null);
                handleCloseModal();
              }}
            >
              <div className="space-y-4 text-left">
                <div className="bg-green-50 border border-green-100 rounded-xl p-4 flex items-start gap-3">
                  <CheckCircle
                    size={18}
                    className="text-green-500 flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <p className="text-sm font-semibold text-green-808">
                      Confirm Approval
                    </p>
                    <p className="text-xs text-green-700 mt-0.5">
                      This will notify the employee and update their leave balance.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {(
                    [
                      ["Employee", req.employee],
                      ["Leave Type", req.type],
                      ["Date Range", `${fmtDate(req.from)} – ${fmtDate(req.to)}`],
                      ["Total Days", req.days + " days"],
                    ] as [string, string][]
                  ).map(([k, v]) => (
                    <div key={k} className="bg-gray-55 rounded-lg p-3">
                      <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-1">
                        {k}
                      </p>
                      <p className="text-sm font-semibold text-gray-808">{v}</p>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end gap-3 pt-2 border-t border-gray-200">
                  <Btn
                    variant="outline"
                    onClick={() => {
                      setTApproveId(null);
                      handleCloseModal();
                    }}
                  >
                    Cancel
                  </Btn>
                  <Btn
                    onClick={confirmApproveT}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Check size={13} />
                    Approve
                  </Btn>
                </div>
              </div>
            </Modal>
          ) : null;
        })()}

      {/* ── TeamPage: Reject Leave Modal ── */}
      {activeModal === "reject-leave" &&
        tRejectId &&
        (() => {
          const req = teamReqs.find((r) => r.id === tRejectId);
          return req ? (
            <Modal
              title="Reject Leave Request"
              onClose={() => {
                setTRejectId(null);
                handleCloseModal();
              }}
            >
              <div className="space-y-4 text-left">
                <div className="grid grid-cols-2 gap-3">
                  {(
                    [
                      ["Employee", req.employee],
                      ["Type", req.type],
                      ["Period", `${fmtDate(req.from)} – ${fmtDate(req.to)}`],
                      ["Days", req.days + " days"],
                    ] as [string, string][]
                  ).map(([k, v]) => (
                    <div key={k} className="bg-gray-55 rounded-lg p-3">
                      <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-1">
                        {k}
                      </p>
                      <p className="text-sm font-semibold text-gray-808">{v}</p>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end gap-3 pt-2 border-t border-gray-200">
                  <Btn
                    variant="outline"
                    onClick={() => {
                      setTRejectId(null);
                      handleCloseModal();
                    }}
                  >
                    Cancel
                  </Btn>
                  <Btn
                    onClick={confirmRejectT}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    <X size={13} />
                    Reject Leave
                  </Btn>
                </div>
              </div>
            </Modal>
          ) : null;
        })()}

      {/* ── TeamPage: Email Modal ── */}
      {activeModal === "email" && selectedEmp && (
        <Modal
          title={`Email · ${selectedEmp.name}`}
          onClose={() => {
            setShowEmailModal(false);
            handleCloseModal();
          }}
          width="max-w-xl"
        >
          <div className="space-y-3 text-left">
            <InputField
              label="Subject"
              value={emailSubject}
              onChange={(e) => setEmailSubject(e.target.value)}
              placeholder="Subject…"
            />
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-500">Message</label>
              <textarea
                rows={6}
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                placeholder="Write your message…"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#5C5CFF] text-gray-900 bg-white"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
              <Btn
                variant="outline"
                onClick={() => {
                  setShowEmailModal(false);
                  handleCloseModal();
                }}
              >
                Cancel
              </Btn>
              <Btn
                onClick={() => {
                  setShowEmailModal(false);
                  handleCloseModal();
                }}
              >
                <Send size={13} />
                Send Email
              </Btn>
            </div>
          </div>
        </Modal>
      )}

      {/* ── TeamPage: Call Modal ── */}
      {activeModal === "call" && selectedEmp && (
        <Modal
          title="Contact Details"
          onClose={() => {
            setShowCallModal(false);
            handleCloseModal();
          }}
          width="max-w-sm"
        >
          <div className="space-y-3 text-left">
            <div className="flex items-center gap-3 p-4 bg-gray-55 rounded-xl">
              <Avt initials={selectedEmp.initials} color={selectedEmp.color} size="md" />
              <div>
                <p className="font-semibold text-gray-900">{selectedEmp.name}</p>
                <p className="text-xs text-gray-500">{selectedEmp.designation}</p>
              </div>
            </div>
            <Btn
              className="w-full justify-center"
              onClick={() => {
                setShowCallModal(false);
                handleCloseModal();
              }}
            >
              <Phone size={13} />
              Call Now
            </Btn>
          </div>
        </Modal>
      )}

      {/* ── TeamPage: Filters Modal ── */}
      {activeModal === "filter-members" && (
        <Modal
          title="Filter Members &amp; Reportees"
          onClose={() => {
            setShowTeamFilter(false);
            handleCloseModal();
          }}
          width="max-w-md"
        >
          <div className="space-y-4 text-left">
            <SelectField
              label="Department"
              options={depts}
              value={deptFilter}
              onChange={(v) => setDeptFilter(v)}
            />
            <SelectField
              label="Location"
              options={locations}
              value={locationFilter}
              onChange={(v) => setLocationFilter(v)}
            />
            <SelectField
              label="Designation"
              options={desigs}
              value={desigFilter}
              onChange={(v) => setDesigFilter(v)}
            />
            <SelectField
              label="Status"
              options={["All", "Active", "On Leave", "Inactive"]}
              value={statusFilter}
              onChange={(v) => setStatusFilter(v)}
            />
            <div className="flex justify-end gap-2 pt-2 border-t border-gray-150">
              <Btn
                variant="outline"
                size="sm"
                onClick={() => {
                  setDeptFilter("All");
                  setLocationFilter("All");
                  setDesigFilter("All");
                  setStatusFilter("All");
                  setShowTeamFilter(false);
                  handleCloseModal();
                }}
              >
                Reset
              </Btn>
              <Btn
                size="sm"
                onClick={() => {
                  setShowTeamFilter(false);
                  handleCloseModal();
                }}
              >
                Apply Filters
              </Btn>
            </div>
          </div>
        </Modal>
      )}
      {/* Board Insights Right Panel */}
      {tab === "Tasks" && (
        <BoardInsightsPanel
          isOpen={boardInsightsOpen}
          onClose={() => setBoardInsightsOpen(false)}
          tasks={teamTasks}
          onSelectTask={setSelectedTeamTask}
        />
      )}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-[200] bg-[#111827] text-white text-xs font-semibold px-4.5 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-bounce">
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
