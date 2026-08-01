import React from "react";
import { CheckCircle } from "lucide-react";
import { cn } from "@/shared/utils";
import { Avt, StatusBadge } from "@/shared/components";
import { EMP_COLORS } from "@/shared/constants/colors";

interface ApprovalListProps {
  approvals: any[];
  approvalView: string;
  selectedApprovalId: string | null;
  onSelectApproval: (id: string) => void;
}

export function ApprovalList({
  approvals,
  approvalView,
  selectedApprovalId,
  onSelectApproval,
}: ApprovalListProps) {
  return (
    <div className="flex-1 overflow-auto divide-y divide-gray-100">
      {approvals.length === 0 && (
        <div className="py-12 text-center bg-white h-full flex flex-col items-center justify-center">
          <CheckCircle size={24} className="text-green-300 mx-auto mb-2" />
          <p className="text-sm text-gray-400">No {approvalView.toLowerCase()} approvals</p>
        </div>
      )}
      {approvals.map((a) => (
        <div
          key={a.id}
          onClick={() => onSelectApproval(a.id)}
          className={cn(
            "flex items-center gap-3 px-5 py-4 hover:bg-gray-50 cursor-pointer transition-colors text-left bg-white",
            selectedApprovalId === a.id && "bg-[#EEF2FF]"
          )}
        >
          <Avt
            initials={a.employee.split(" ").map((n: string) => n[0]).join("")}
            color={EMP_COLORS[parseInt(a.id.slice(-1)) % EMP_COLORS.length]}
            size="sm"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <p className="text-sm font-semibold text-gray-800 truncate">{a.employee}</p>
              <span className="text-[10px] bg-gray-100 text-gray-505 px-1.5 py-0.5 rounded font-medium flex-shrink-0">
                {a.type}
              </span>
            </div>
            <p className="text-xs text-gray-500 truncate">{a.detail}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">Applied {a.applied}</p>
          </div>
          {a.status === "Pending" ? (
            <div className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
          ) : (
            <StatusBadge status={a.status} />
          )}
        </div>
      ))}
    </div>
  );
}
