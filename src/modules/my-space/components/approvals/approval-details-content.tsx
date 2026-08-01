import React from "react";
import { Check, X, FileText, Download, Send, CornerDownRight, Settings } from "lucide-react";
import { cn } from "@/shared/utils";
import { Avt, StatusBadge, UserAvatar } from "@/shared/components";

interface AppComment {
  id: string;
  parentId: string | null;
  author: string;
  isOwn: boolean;
  text: string;
  timestamp: number;
  edited: boolean;
}

interface ApprovalDetailsContentProps {
  item: any;
  comments: AppComment[];
  approvalDraft: string;
  setApprovalDraft: (val: string) => void;
  editCommentId: string | null;
  setEditCommentId: (val: string | null) => void;
  editCommentText: string;
  setEditCommentText: (val: string) => void;
  replyToId: string | null;
  setReplyToId: (val: string | null) => void;
  replyText: string;
  setReplyText: (val: string) => void;
  addApprovalComment: (aid: string) => void;
  addReply: (aid: string, parentId: string) => void;
  saveEditComment: (aid: string, cid: string) => void;
  deleteComment: (aid: string, cid: string) => void;
}

function fmtTs(ts: number): string {
  const d = Date.now() - ts;
  if (d < 60000)    return "Just now";
  if (d < 3600000)  return `${Math.floor(d / 60000)}m ago`;
  if (d < 86400000) return `${Math.floor(d / 3600000)}h ago`;
  return new Date(ts).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function ApprovalDetailsContent({
  item,
  comments,
  approvalDraft,
  setApprovalDraft,
  editCommentId,
  setEditCommentId,
  editCommentText,
  setEditCommentText,
  replyToId,
  setReplyToId,
  replyText,
  setReplyText,
  addApprovalComment,
  addReply,
  saveEditComment,
  deleteComment,
}: ApprovalDetailsContentProps) {
  const topComments = comments.filter(c => c.parentId === null);

  const renderInfoGrid = () => {
    switch (item.type) {
      case "Leave":
        return [
          ["Leave Type", item.leaveType],
          ["Department", item.dept],
          ["Date", item.dateRange],
          ["Days", item.days],
          ["Applied", item.applied],
          ["Status", item.status],
        ];
      case "Attendance":
        return [
          ["Correction Type", item.leaveType],
          ["Attendance Date", item.dateRange],
          ["Existing Time", item.id === "A4" ? "—" : "09:32 AM"],
          ["Requested Time", item.id === "A4" ? "06:00 PM" : "09:00 AM"],
          ["Applied", item.applied],
          ["Status", item.status],
        ];
      case "Shift":
        return [
          ["Current Shift", "General (09:00–18:00)"],
          ["Requested Shift", "Morning (06:00–15:00)"],
          ["Effective Date", item.dateRange],
          ["Applied", item.applied],
          ["Status", item.status],
        ];
      case "Department":
        return [
          ["Current Department", item.dept],
          ["Requested Department", "Operations"],
          ["Effective Date", item.dateRange],
          ["Applied", item.applied],
          ["Status", item.status],
        ];
      default:
        return [
          ["Department", item.dept],
          ["Date", item.dateRange],
          ["Applied", item.applied],
          ["Status", item.status],
        ];
    }
  };

  const showAttachment = item.type === "Leave" || item.type === "Attendance";

  const renderAttachment = () => {
    if (!showAttachment) return null;
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <p className="text-xs font-semibold text-gray-700 mb-2">Attachment</p>
        {item.leaveType === "Sick Leave" ? (
          <div className="flex items-center gap-3 p-2.5 bg-gray-50 rounded-lg border border-gray-200">
            <FileText size={14} className="text-red-500 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-xs font-medium text-gray-700">Medical_Certificate.pdf</p>
              <p className="text-[10px] text-gray-400">0.8 MB</p>
            </div>
            <button className="text-xs text-[#5C5CFF] flex items-center gap-1 hover:underline cursor-pointer bg-transparent border-0">
              <Download size={11} />Download
            </button>
          </div>
        ) : item.type === "Attendance" ? (
          <div className="flex items-center gap-3 p-2.5 bg-gray-50 rounded-lg border border-gray-200">
            <FileText size={14} className="text-blue-500 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-xs font-medium text-gray-700">Client_Site_Checkin_Log.csv</p>
              <p className="text-[10px] text-gray-400">12 KB</p>
            </div>
            <button className="text-xs text-[#5C5CFF] flex items-center gap-1 hover:underline cursor-pointer bg-transparent border-0">
              <Download size={11} />Download
            </button>
          </div>
        ) : (
          <p className="text-xs text-gray-400">No attachment required</p>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Info grid */}
      <div className="grid grid-cols-2 gap-2.5 text-left">
        {renderInfoGrid().map(([k, v]) => (
          <div key={k} className="bg-gray-50 rounded-lg p-3">
            <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-1">{k}</p>
            <p className="text-xs font-semibold text-gray-808">{v}</p>
          </div>
        ))}
      </div>

      {/* Reason */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 text-left">
        <p className="text-xs font-semibold text-gray-700 mb-2">Reason</p>
        <p className="text-sm text-gray-600 leading-relaxed">{item.reason}</p>
      </div>

      {/* Attachment */}
      {renderAttachment()}

      {/* Approval Timeline */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 text-left">
        <p className="text-xs font-semibold text-gray-700 mb-3">Approval Timeline</p>
        <div className="space-y-2">
          {[
            { label: "Submitted", time: `${item.applied} · 9:00 AM`, done: true, color: "#5C5CFF" },
            { label: "Under Review", time: `${item.applied} · 9:15 AM`, done: true, color: "#F59E0B" },
            {
              label: item.status === "Pending" ? "Awaiting Decision" : item.status,
              time: item.status === "Pending" ? "Pending…" : "Jul 2 · 10:00 AM",
              done: item.status !== "Pending",
              color: item.status === "Approved" ? "#22C55E" : "#EF4444",
            },
          ].map((step, si) => (
            <div key={si} className="flex items-center gap-3">
              {step.done ? (
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: step.color }}>
                  <Check size={11} className="text-white" />
                </div>
              ) : (
                <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-gray-300" />
                </div>
              )}
              <div className="flex-1 flex items-center justify-between">
                <p className={cn("text-xs font-medium", step.done ? "text-gray-850" : "text-gray-400")}>{step.label}</p>
                <p className="text-[10px] text-gray-400">{step.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-4 text-left">
        <p className="text-xs font-semibold text-gray-700 mb-3">Comments</p>
        <div className="space-y-4 mb-4">
          {topComments.length === 0 && <p className="text-xs text-gray-400 text-center py-2">No comments yet</p>}
          {topComments.map(c => {
            const replies = comments.filter(r => r.parentId === c.id);
            const isEditing = editCommentId === c.id;
            return (
              <div key={c.id} className="flex gap-2.5 items-start">
                <UserAvatar name={c.author} color={c.isOwn ? "#5C5CFF" : "#22C55E"} size="32px" />
                <div className="flex-1 min-w-0">
                  {isEditing ? (
                    <div className="bg-gray-50 rounded-lg p-2.5">
                      <textarea
                        value={editCommentText}
                        onChange={e => setEditCommentText(e.target.value)}
                        rows={2}
                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded-lg bg-white resize-none focus:outline-none focus:ring-1 focus:ring-[#5C5CFF]"
                      />
                      <div className="flex gap-2 mt-1.5">
                        <button onClick={() => saveEditComment(item.id, c.id)} className="px-2 py-1 bg-[#5C5CFF] text-white text-[10px] rounded-lg font-medium cursor-pointer border-0">Save</button>
                        <button onClick={() => { setEditCommentId(null); setEditCommentText(""); }} className="px-2 py-1 text-[10px] text-gray-500 border border-gray-200 rounded-lg cursor-pointer bg-white">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="bg-gray-55 rounded-lg p-2.5">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold text-gray-800">{c.author}</span>
                          <div className="flex items-center gap-1.5 text-gray-400">
                            <span className="text-[10px]">{fmtTs(c.timestamp)}</span>
                            {c.edited && <span className="text-[9px] italic">(edited)</span>}
                          </div>
                        </div>
                        <p className="text-xs text-gray-700">{c.text}</p>
                      </div>
                      <div className="flex items-center gap-3 mt-1.5 ml-2.5">
                        <button onClick={() => { setReplyToId(replyToId === c.id ? null : c.id); setReplyText(""); }} className="text-[10px] text-gray-400 hover:text-[#5C5CFF] flex items-center gap-1 cursor-pointer bg-transparent border-0"><CornerDownRight size={10} />Reply</button>
                        {c.isOwn && (
                          <>
                            <button onClick={() => { setEditCommentId(c.id); setEditCommentText(c.text); }} className="text-[10px] text-gray-400 hover:text-[#5C5CFF] cursor-pointer bg-transparent border-0">Edit</button>
                            <button onClick={() => deleteComment(item.id, c.id)} className="text-[10px] text-gray-400 hover:text-red-500 cursor-pointer bg-transparent border-0">Delete</button>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Replies list */}
                  {replies.length > 0 && (
                    <div className="mt-3 space-y-3 border-l-2 border-gray-100 pl-3">
                      {replies.map(r => (
                        <div key={r.id} className="flex gap-2 items-start">
                          <UserAvatar name={r.author} color={r.isOwn ? "#5C5CFF" : "#22C55E"} size="28px" />
                          <div className="flex-1 min-w-0 bg-gray-50 rounded-lg p-2.5">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-semibold text-gray-800">{r.author}</span>
                              <div className="flex items-center gap-1.5 text-gray-400">
                                <span className="text-[10px]">{fmtTs(r.timestamp)}</span>
                                {r.isOwn && (
                                  <>
                                    <span>·</span>
                                    <button onClick={() => deleteComment(item.id, r.id)} className="text-[9px] text-gray-400 hover:text-red-500 cursor-pointer bg-transparent border-0 font-semibold">Delete</button>
                                  </>
                                )}
                              </div>
                            </div>
                            <p className="text-xs text-gray-700">{r.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Reply Composer */}
                  {replyToId === c.id && (
                    <div className="mt-3 flex items-center gap-2 border-l-2 border-[#5C5CFF]/20 pl-3">
                      <UserAvatar name="Alex Admin" initials="AA" color="#5C5CFF" size="28px" />
                      <div className="flex-1 flex gap-1.5 items-center">
                        <input
                          value={replyText}
                          onChange={e => setReplyText(e.target.value)}
                          onKeyDown={e => e.key === "Enter" && addReply(item.id, c.id)}
                          placeholder={`Reply to ${c.author}…`}
                          className="flex-1 px-2.5 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#5C5CFF] bg-gray-50"
                        />
                        <button onClick={() => addReply(item.id, c.id)} className="px-2.5 py-1.5 bg-[#5C5CFF] text-white rounded-lg text-[10px] font-medium cursor-pointer border-0">Reply</button>
                        <button onClick={() => setReplyToId(null)} className="p-1 text-gray-400 hover:text-gray-600 bg-transparent border-0 cursor-pointer"><X size={12} /></button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Comment Composer */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2.5">
            <UserAvatar name="Alex Admin" initials="AA" color="#5C5CFF" size="32px" />
            <input
              value={approvalDraft}
              onChange={e => setApprovalDraft(e.target.value)}
              onKeyDown={e => e.key === "Enter" && addApprovalComment(item.id)}
              placeholder="Add comment… @mention (Enter to post)"
              className="flex-1 min-w-0 px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C5CFF] bg-gray-55"
              style={{ height: "36px" }}
            />
            <button
              onClick={() => addApprovalComment(item.id)}
              className="w-9 h-9 flex items-center justify-center bg-[#5C5CFF] text-white rounded-lg hover:bg-[#4A4AE0] cursor-pointer border-0 flex-shrink-0"
              style={{ width: "36px", height: "36px" }}
            >
              <Send size={14} />
            </button>
          </div>
          <p className="text-[9px] text-gray-400 mt-1 ml-[42px]">Use @ to mention teammates · Enter to post</p>
        </div>
      </div>

      {/* Activity */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 text-left">
        <p className="text-xs font-semibold text-gray-700 mb-3">Activity</p>
        <div className="space-y-3.5">
          {[
            { actor: "System", action: "Request created", time: `${item.applied} · 9:00 AM`, color: "#9CA3AF" },
            { actor: "Alex Admin", action: "Assigned to review queue", time: `${item.applied} · 9:01 AM`, color: "#5C5CFF" },
            ...(item.status !== "Pending"
              ? [
                  {
                    actor: "Alex Admin",
                    action: item.status === "Approved" ? "Approved this request" : "Rejected this request",
                    time: "Jul 2 · 10:15 AM",
                    color: item.status === "Approved" ? "#22C55E" : "#EF4444",
                  },
                ]
              : []),
          ].map((ev, i) => {
            const isSystem = ev.actor === "System";
            return (
              <div key={i} className="grid text-xs" style={{ gridTemplateColumns: "28px minmax(0, 1fr)", columnGap: "10px", alignItems: "start" }}>
                {isSystem ? (
                  <div
                    className="rounded-full bg-gray-100 text-gray-500 flex items-center justify-center flex-shrink-0"
                    style={{ width: "28px", height: "28px", minWidth: "28px", minHeight: "28px", flex: "0 0 auto" }}
                  >
                    <Settings size={13} className="text-gray-500" />
                  </div>
                ) : (
                  <UserAvatar name={ev.actor} color={ev.color} size="28px" />
                )}
                <div className="text-left flex flex-col gap-0.5">
                  <p className="font-semibold text-gray-808">{ev.actor}</p>
                  <p className="text-gray-600 leading-normal">{ev.action}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{ev.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
