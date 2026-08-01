import React, { useState } from "react";
import { CalendarDays, MessageSquare, Paperclip, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { cn } from "@/shared/utils";
import { TeamTask, TaskStatus } from "../../types";
import { Avt } from "@/shared/components";
import { EMP_COLORS } from "@/shared/constants/colors";

interface TasksTabProps {
  search: string;
  setSelectedTeamTask: (task: any) => void;
  tasks: TeamTask[];
  setTasks: React.Dispatch<React.SetStateAction<TeamTask[]>>;
}

export function TasksTab({
  search = "",
  setSelectedTeamTask,
  tasks = [],
  setTasks,
}: TasksTabProps) {
  const [draggedOverCol, setDraggedOverCol] = useState<string | null>(null);

  // Overdue detection: Due Date < Today AND Status != Completed
  const isTaskOverdue = (t: TeamTask) => {
    if (t.status === "Done") return false;
    if (!t.dueDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(t.dueDate);
    return due < today;
  };

  const getProgressPct = (t: TeamTask) => {
    if (t.status === "Done") return 100;
    if (t.status === "In Progress") return 50;
    if (isTaskOverdue(t)) return 30;
    return 0;
  };

  // Kanban Columns definition
  const columns = [
    { id: "Todo", title: "To Do", bg: "bg-[#F8FAFC]", text: "text-gray-700", border: "border-gray-200", dot: "bg-gray-400" },
    { id: "Overdue", title: "Overdue", bg: "bg-red-50/30", text: "text-red-700", border: "border-red-100", dot: "bg-red-500" },
    { id: "In Progress", title: "In Progress", bg: "bg-blue-50/30", text: "text-blue-700", border: "border-blue-100", dot: "bg-[#5C5CFF]" },
    { id: "Done", title: "Completed", bg: "bg-green-50/30", text: "text-green-700", border: "border-green-100", dot: "bg-green-500" },
    { id: "Archived", title: "Archived", bg: "bg-purple-50/30", text: "text-purple-700", border: "border-purple-100", dot: "bg-purple-500" },
  ];

  // Distribute tasks to columns
  const getColumnTasks = (colId: string) => {
    // Filter tasks based on Search query (match title, assignee, or label)
    const filteredBySearch = tasks.filter(
      (t) =>
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.assignee.toLowerCase().includes(search.toLowerCase()) ||
        (t.labels && t.labels.some((l) => l.toLowerCase().includes(search.toLowerCase())))
    );

    return filteredBySearch.filter((t) => {
      if (colId === "Archived") return t.status === "Archived";
      if (colId === "Done") return t.status === "Done";
      if (t.status === "Archived" || t.status === "Done") return false;

      // Check overdue
      const overdue = isTaskOverdue(t);
      if (colId === "Overdue") return overdue;
      if (overdue) return false;

      if (colId === "In Progress") return t.status === "In Progress";
      return t.status === "Todo" || !t.status;
    });
  };

  // Drag and Drop handlers
  const handleMoveTask = (taskId: string, targetColId: string) => {
    const todayStr = new Date().toISOString().split("T")[0];
    const yesterdayStr = new Date(Date.now() - 86400000).toISOString().split("T")[0];

    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId) return t;

        let nextStatus: TaskStatus = t.status;
        let nextDueDate = t.dueDate;
        let nextDue = t.due;

        if (targetColId === "Todo") {
          nextStatus = "Todo";
          if (isTaskOverdue(t)) {
            const tomorrow = new Date(Date.now() + 86400000);
            nextDueDate = tomorrow.toISOString().split("T")[0];
            nextDue = tomorrow.toLocaleDateString("en-US", { month: "short", day: "numeric" });
          }
        } else if (targetColId === "In Progress") {
          nextStatus = "In Progress";
          if (isTaskOverdue(t)) {
            const tomorrow = new Date(Date.now() + 86400000);
            nextDueDate = tomorrow.toISOString().split("T")[0];
            nextDue = tomorrow.toLocaleDateString("en-US", { month: "short", day: "numeric" });
          }
        } else if (targetColId === "Overdue") {
          nextStatus = "Todo";
          nextDueDate = yesterdayStr;
          const yesterday = new Date(Date.now() - 86400000);
          nextDue = yesterday.toLocaleDateString("en-US", { month: "short", day: "numeric" });
        } else if (targetColId === "Done") {
          nextStatus = "Done";
        } else if (targetColId === "Archived") {
          nextStatus = "Archived";
        }

        const details = `moved task to column: ${targetColId}`;
        const newAct = {
          id: `act-${Date.now()}`,
          taskId: t.id,
          userId: "E004",
          userName: "Alex Admin",
          userInitials: "AA",
          type: "status_change" as const,
          details,
          createdAt: new Date().toISOString(),
        };

        const statusHistory = { ...t.statusHistory };
        if (nextStatus === "Done") {
          statusHistory.Done = (statusHistory.Done || 0) + 1;
        } else if (nextStatus === "In Progress") {
          statusHistory["In Progress"] = (statusHistory["In Progress"] || 0) + 1;
        }

        return {
          ...t,
          status: nextStatus,
          dueDate: nextDueDate,
          due: nextDue,
          statusHistory,
          activity: [newAct, ...(t.activity || [])],
        };
      })
    );
  };

  const getPriorityColor = (p: string) => {
    switch (p) {
      case "High":
        return "bg-red-50 text-red-600 border border-red-100";
      case "Medium":
        return "bg-amber-50 text-amber-600 border border-amber-100";
      default:
        return "bg-gray-50 text-gray-500 border border-gray-150";
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] border-t border-gray-200 text-left">
      {/* Board columns view wrapper */}
      <div className="flex-1 overflow-x-auto p-6 flex gap-5 items-start select-none">
        {columns.map((col) => {
          const colTasks = getColumnTasks(col.id);
          const isOver = draggedOverCol === col.id;
          
          return (
            <div
              key={col.id}
              onDragOver={(e) => {
                e.preventDefault();
                setDraggedOverCol(col.id);
              }}
              onDragLeave={() => setDraggedOverCol(null)}
              onDrop={(e) => {
                e.preventDefault();
                setDraggedOverCol(null);
                const taskId = e.dataTransfer.getData("taskId");
                if (taskId) handleMoveTask(taskId, col.id);
              }}
              className={cn(
                "w-[280px] shrink-0 rounded-2xl p-4 border flex flex-col max-h-[82vh] transition-all",
                col.bg,
                col.border,
                isOver ? "ring-2 ring-[#5C5CFF]/30 border-[#5C5CFF]/50 shadow-md" : ""
              )}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between mb-4.5">
                <div className="flex items-center gap-2">
                  <span className={cn("w-2 h-2 rounded-full", col.dot)} />
                  <h4 className="text-xs font-bold text-gray-900 tracking-wide uppercase">
                    {col.title}
                  </h4>
                </div>
                <span className="text-[10px] font-extrabold bg-white border border-gray-150 px-2 py-0.5 rounded-full text-gray-500">
                  {colTasks.length}
                </span>
              </div>

              {/* Tasks Cards List */}
              <div className="flex-1 overflow-y-auto space-y-3.5 scrollbar-thin">
                {colTasks.length === 0 ? (
                  <div className="border border-dashed border-gray-200 bg-white/40 rounded-xl p-6 text-center text-[10px] text-gray-400 font-semibold italic">
                    No tasks here
                  </div>
                ) : (
                  colTasks.map((t) => {
                    const progress = getProgressPct(t);
                    const commentCount = t.comments?.length || 0;
                    const attachmentCount = t.attachments?.length || 0;
                    const isBlocked = t.isBlocked;

                    const initials = t.assignee
                      ? t.assignee
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()
                      : "UN";
                    
                    const charSum = t.assignee
                      ? t.assignee.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
                      : 0;
                    const avColor = EMP_COLORS[charSum % EMP_COLORS.length];

                    return (
                      <div
                        key={t.id}
                        draggable
                        onDragStart={(e) => {
                          e.dataTransfer.setData("taskId", t.id);
                        }}
                        onClick={() => setSelectedTeamTask(t)}
                        className={cn(
                          "bg-white border rounded-xl p-4 shadow-sm hover:shadow-md hover:border-[#5C5CFF]/45 transition-all cursor-grab active:cursor-grabbing text-left space-y-3 relative group",
                          isBlocked ? "border-red-200 bg-red-50/5" : "border-gray-150",
                          t.isFlagged ? "border-amber-200 bg-amber-50/5" : ""
                        )}
                      >
                        {/* Top Meta: Priority and Assignee */}
                        <div className="flex justify-between items-center gap-2">
                          <span
                            className={cn(
                              "text-[9px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider",
                              getPriorityColor(t.priority)
                            )}
                          >
                            {t.priority}
                          </span>
                          
                          {/* Assignee Avatar */}
                          <div className="flex items-center gap-1">
                            <Avt
                              initials={initials}
                              color={avColor}
                              size="sm"
                              className="w-6 h-6 border-2 border-white shadow-sm"
                            />
                          </div>
                        </div>

                        {/* Title & Flags */}
                        <div className="space-y-1">
                          <h4 className="text-xs font-bold text-gray-900 leading-snug group-hover:text-[#5C5CFF] transition-colors">
                            {t.title}
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {t.isFlagged && (
                              <span className="text-[9px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded border border-red-100">
                                🚩 Flagged
                              </span>
                            )}
                            {isBlocked && (
                              <span className="text-[9px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-100 uppercase">
                                Blocked
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Labels chips */}
                        {t.labels && t.labels.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {t.labels.map((l) => (
                              <span
                                key={l}
                                className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-gray-50 border border-gray-150 text-gray-500"
                              >
                                {l}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Progress bar */}
                        <div className="space-y-1">
                          <div className="w-full bg-gray-100 rounded-full h-1 overflow-hidden">
                            <div
                              className={cn(
                                "h-full rounded-full",
                                t.status === "Done"
                                  ? "bg-green-500"
                                  : isTaskOverdue(t)
                                  ? "bg-red-500"
                                  : "bg-[#5C5CFF]"
                              )}
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-[9px] text-gray-400 font-semibold">
                            <span>Progress</span>
                            <span>{progress}%</span>
                          </div>
                        </div>

                        {/* Footer details: Due date & activity counters */}
                        <div className="flex justify-between items-center text-[10px] text-gray-400 pt-2.5 border-t border-gray-100 font-medium">
                          <div className="flex items-center gap-1 text-gray-500">
                            <CalendarDays size={11} />
                            <span className="font-semibold text-gray-400">
                              {t.due || "Jul 8"}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2 font-semibold">
                            {commentCount > 0 && (
                              <span className="flex items-center gap-0.5" title={`${commentCount} comments`}>
                                <MessageSquare size={11} />
                                <span>{commentCount}</span>
                              </span>
                            )}
                            {attachmentCount > 0 && (
                              <span className="flex items-center gap-0.5" title={`${attachmentCount} attachments`}>
                                <Paperclip size={11} />
                                <span>{attachmentCount}</span>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
