import React from "react";
import { Filter, Check } from "lucide-react";
import { cn } from "@/shared/utils";

interface ApprovalFiltersProps {
  approvalView: string;
  setApprovalView: (val: string) => void;
  approvalType: string;
  setApprovalType: (val: string) => void;
  allApprovals: any[];
  filteredCount: number;
  showApprovalFilters: boolean;
  setShowApprovalFilters: (val: boolean | ((prev: boolean) => boolean)) => void;
}

export function ApprovalFilters({
  approvalView,
  setApprovalView,
  approvalType,
  setApprovalType,
  allApprovals,
  filteredCount,
  showApprovalFilters,
  setShowApprovalFilters,
}: ApprovalFiltersProps) {
  return (
    <div className="border-b border-gray-200 px-5 py-3 flex items-center justify-between flex-shrink-0 bg-white">
      <div className="flex gap-1">
        {["Pending", "Approved", "Rejected"].map((v) => (
          <button
            key={v}
            onClick={() => setApprovalView(v)}
            className={cn(
              "px-3 py-1.5 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer border-0 bg-transparent",
              approvalView === v ? "bg-[#EEF2FF] text-[#5C5CFF]" : "text-gray-600 hover:bg-gray-100"
            )}
          >
            {v}
            <span
              className={cn(
                "px-1.5 py-0.5 rounded-full text-[10px] font-semibold",
                approvalView === v ? "bg-[#5C5CFF] text-white" : "bg-gray-200 text-gray-500"
              )}
            >
              {allApprovals.filter((a) => a.status === v).length}
            </span>
          </button>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <span className="text-[10px] text-gray-400 font-medium">{filteredCount} items</span>
        <div className="relative">
          <button
            onClick={() => setShowApprovalFilters((v) => !v)}
            className={cn(
              "flex items-center justify-center p-1.5 rounded-lg border transition-colors cursor-pointer bg-white",
              showApprovalFilters || approvalType !== "All"
                ? "border-[#5C5CFF] bg-[#EEF2FF] text-[#5C5CFF]"
                : "border-gray-200 text-gray-600 hover:bg-gray-50"
            )}
            title="Filter Approval Type"
          >
            <Filter size={14} />
            {approvalType !== "All" && (
              <span className="w-4 h-4 bg-[#5C5CFF] text-white text-[9px] rounded-full flex items-center justify-center ml-1 font-bold">
                1
              </span>
            )}
          </button>
          {showApprovalFilters && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowApprovalFilters(false)} />
              <div className="absolute top-full right-0 mt-1.5 w-40 bg-white border border-gray-200 rounded-xl shadow-lg z-50 py-1.5 text-left">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3.5 pt-2 pb-1">
                  Approval Type
                </p>
                {["All", "Leave", "Attendance", "Shift", "Department"].map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setApprovalType(t);
                      setShowApprovalFilters(false);
                    }}
                    className={cn(
                      "w-full text-left px-3.5 py-1.5 text-xs hover:bg-gray-50 flex items-center justify-between cursor-pointer border-0 bg-transparent",
                      approvalType === t ? "text-[#5C5CFF] font-semibold" : "text-gray-700 font-medium"
                    )}
                  >
                    <span>{t}</span>
                    {approvalType === t && <Check size={12} className="text-[#5C5CFF]" />}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
