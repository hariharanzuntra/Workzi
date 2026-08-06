import React from "react";
import { Drawer, Avt, StatusBadge } from "@/shared/components";
import { CalendarEvent } from "../../types/team-calendar.types";
import { Paperclip, MessageSquare, Clock } from "lucide-react";
import { getEventColors } from "../../utils/team-calendar.utils";

interface CalendarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  event: CalendarEvent | null;
}

export function CalendarDrawer({ isOpen, onClose, event }: CalendarDrawerProps) {
  if (!event) return null;

  const initials = event.employeeInitials || 
    (event.employeeName
      ? event.employeeName.split(" ").map((n) => n[0]).join("").toUpperCase()
      : "UN");
  const avatarColor = event.employeeColor || (event.employee?.color || "#5C5CFF");
  const colors = getEventColors(event.type);

  // Status mapping
  const status = event.status || "Active";
  const statusVariant = 
    status === "Approved" || status === "Confirmed" || status === "Checked In" ? "success" :
    status === "Pending" || status === "Scheduled" ? "warning" :
    status === "Rejected" ? "error" : "neutral";

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={event.employeeName || "Company Event"}
      avatar={
        event.employeeName ? (
          <Avt initials={initials} color={avatarColor} size="md" className="w-10 h-10 shadow-sm" />
        ) : undefined
      }
      headerAddon={
        <div className="flex items-center gap-2">
          {event.employee && (
            <span className="text-[11px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
              {event.employee.dept}
            </span>
          )}
          <StatusBadge text={status} variant={statusVariant} />
        </div>
      }
    >
      <div className="space-y-6 text-left">
        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-150 p-4">
            <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider mb-1">
              Event Type
            </p>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
              <p className="text-sm font-bold text-gray-800">{event.type}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-150 p-4">
            <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider mb-1">
              Duration
            </p>
            <p className="text-sm font-bold text-gray-800">{event.duration || "Full Day"}</p>
          </div>

          <div className="bg-white rounded-xl border border-[#E8E9ED] p-4 col-span-2">
            <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider mb-1">
              Date & Period
            </p>
            <p className="text-sm font-bold text-gray-800">
              {event.date} {event.endDate ? `– ${event.endDate}` : ""}
            </p>
          </div>

          {event.approver && (
            <div className="bg-white rounded-xl border border-gray-150 p-4 col-span-2">
              <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider mb-1">
                Approver
              </p>
              <p className="text-sm font-bold text-gray-800">{event.approver}</p>
            </div>
          )}
        </div>

        {/* Reason / Details */}
        {event.reason && (
          <div className="bg-white rounded-xl border border-gray-150 p-4">
            <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider mb-1">
              Description / Reason
            </p>
            <p className="text-xs text-gray-700 leading-relaxed font-medium">{event.reason}</p>
          </div>
        )}

        {/* Attachments */}
        {event.attachments && event.attachments.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <Paperclip size={12} />
              Attachments
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {event.attachments.map((file, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 bg-white border border-gray-150 rounded-xl text-xs font-semibold text-gray-800"
                >
                  <span className="truncate">{file.name}</span>
                  <span className="text-[10px] text-gray-400 font-bold shrink-0">{file.size}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Comments */}
        <div className="space-y-3">
          <h4 className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
            <MessageSquare size={12} />
            Comments ({event.comments?.length || 0})
          </h4>
          {event.comments && event.comments.length > 0 ? (
            <div className="space-y-2.5">
              {event.comments.map((c, idx) => (
                <div key={idx} className="p-3 bg-white border border-gray-150 rounded-xl space-y-1">
                  <div className="flex justify-between items-center text-[10px] font-extrabold">
                    <span className="text-gray-900">{c.author}</span>
                    <span className="text-gray-400">{c.time}</span>
                  </div>
                  <p className="text-xs text-gray-700 font-medium leading-relaxed">{c.text}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-450 italic font-medium pl-1">No comments yet</p>
          )}
        </div>

        {/* Activity Timeline */}
        <div className="space-y-3">
          <h4 className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
            <Clock size={12} />
            Activity Timeline
          </h4>
          {event.activity && event.activity.length > 0 ? (
            <div className="relative border-l border-gray-200 pl-4 space-y-4 ml-2.5">
              {event.activity.map((act, idx) => (
                <div key={idx} className="relative">
                  {/* Dot */}
                  <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#5C5CFF] border-2 border-white shadow-sm" />
                  <div className="text-[10px] font-extrabold text-gray-400 flex justify-between items-center leading-none mb-1">
                    <span>{act.type}</span>
                    <span>{act.time}</span>
                  </div>
                  <p className="text-xs font-semibold text-gray-700">{act.details}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-450 italic font-medium pl-1">No activity logged</p>
          )}
        </div>
      </div>
    </Drawer>
  );
}
