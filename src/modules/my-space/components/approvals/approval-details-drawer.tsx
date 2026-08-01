import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/shared/utils";
import { Avt, StatusBadge, UserAvatar } from "@/shared/components";
import { EMP_COLORS } from "@/shared/constants/colors";
import { ApprovalDetailsContent } from "./approval-details-content";

interface ApprovalDetailsDrawerProps {
  approval: any;
  open: boolean;
  onClose: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;

  // Comments props
  comments: any[];
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

export function ApprovalDetailsDrawer({
  approval,
  open,
  onClose,
  onApprove,
  onReject,
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
}: ApprovalDetailsDrawerProps) {
  const [render, setRender] = useState(open);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (open) {
      setRender(true);
      setIsClosing(false);
      document.body.style.overflow = "hidden";
    } else {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setRender(false);
        setIsClosing(false);
        document.body.style.overflow = "";
      }, 200);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!render || !approval) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex justify-end bg-[#0F172A]/35 backdrop-blur-[4px] transition-opacity duration-200"
      style={{
        animation: isClosing ? "backdropOut 200ms ease-in forwards" : "backdropIn 200ms ease-out forwards"
      }}
      onClick={onClose}
    >
      <div
        className="flex flex-col h-full bg-white border-l border-gray-200 shadow-2xl relative w-full sm:w-[85%] md:w-[680px] transition-transform duration-200"
        style={{
          animation: isClosing ? "drawerOut 200ms ease-in forwards" : "drawerIn 200ms cubic-bezier(0.16, 1, 0.3, 1) forwards"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <UserAvatar
              name={approval.employee}
              color={EMP_COLORS[parseInt(approval.id.slice(-1)) % EMP_COLORS.length]}
              size="40px"
            />
            <div className="text-left">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold text-gray-900">{approval.employee}</h3>
                <StatusBadge status={approval.status} />
              </div>
              <p className="text-xs text-gray-500 font-medium mt-0.5">
                {approval.dept} · {approval.type}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer bg-transparent border-0"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-white">
          <ApprovalDetailsContent
            item={approval}
            comments={comments}
            approvalDraft={approvalDraft}
            setApprovalDraft={setApprovalDraft}
            editCommentId={editCommentId}
            setEditCommentId={setEditCommentId}
            editCommentText={editCommentText}
            setEditCommentText={setEditCommentText}
            replyToId={replyToId}
            setReplyToId={setReplyToId}
            replyText={replyText}
            setReplyText={setReplyText}
            addApprovalComment={addApprovalComment}
            addReply={addReply}
            saveEditComment={saveEditComment}
            deleteComment={deleteComment}
          />
        </div>

        {/* Sticky Action Footer */}
        {approval.status === "Pending" && (
          <div className="px-6 py-4 border-t border-gray-200 bg-white sticky bottom-0 z-10 flex gap-3 justify-end shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
            <button
              onClick={() => onReject(approval.id)}
              className="flex-1 px-4 py-2.5 text-xs font-semibold border border-red-200 text-red-650 hover:bg-red-50 rounded-lg transition-colors cursor-pointer bg-white"
            >
              Reject
            </button>
            <button
              onClick={() => onApprove(approval.id)}
              className="flex-1 px-4 py-2.5 text-xs font-semibold bg-green-600 text-white hover:bg-green-700 rounded-lg transition-colors cursor-pointer border-0"
            >
              Approve
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
