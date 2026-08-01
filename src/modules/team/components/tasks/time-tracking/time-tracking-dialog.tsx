import React, { useState } from "react";
import { X, Clock, AlertCircle } from "lucide-react";
import { parseDuration, formatDuration, validateDurationSyntax } from "../../../utils/duration-parser";
import { Btn, Modal, InputField } from "@/shared/components";
import { cn } from "@/shared/utils";

interface TimeTrackingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  originalEstimateMinutes?: number;
  totalLoggedMinutes: number;
  remainingEstimateMinutes: number;
  onSave: (timeSpentMin: number, remainingEstimateMin: number, dateStarted: string, description: string) => void;
}

export function TimeTrackingDialog({
  isOpen,
  onClose,
  originalEstimateMinutes = 0,
  totalLoggedMinutes,
  remainingEstimateMinutes,
  onSave,
}: TimeTrackingDialogProps) {
  const [timeSpent, setTimeSpent] = useState("");
  const [timeSpentError, setTimeSpentError] = useState<string | null>(null);
  
  const [timeRemaining, setTimeRemaining] = useState(formatDuration(remainingEstimateMinutes));
  const [timeRemainingError, setTimeRemainingError] = useState<string | null>(null);
  
  // Format Date Started as local datetime-local input string
  const [dateStarted, setDateStarted] = useState(() => {
    const d = new Date();
    // offset timezone to match local time for input field (YYYY-MM-DDTHH:MM)
    const tzOffset = d.getTimezoneOffset() * 60000;
    const localISODate = new Date(d.getTime() - tzOffset).toISOString().slice(0, 16);
    return localISODate;
  });
  
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeSpentError(null);
    setTimeRemainingError(null);

    // Validate spent time
    if (!timeSpent.trim()) {
      setTimeSpentError("Time spent is required.");
      return;
    }
    if (!validateDurationSyntax(timeSpent)) {
      setTimeSpentError("Enter a valid format (e.g., 2h 30m, 1d 4h).");
      return;
    }

    // Validate remaining time if changed
    if (timeRemaining.trim() && !validateDurationSyntax(timeRemaining)) {
      setTimeRemainingError("Enter a valid format (e.g., 2h 30m, 1d 4h).");
      return;
    }

    const spentMin = parseDuration(timeSpent);
    
    // Default remaining calculation if not manually entered or cleared
    let remainingMin = remainingEstimateMinutes;
    if (timeRemaining.trim()) {
      remainingMin = parseDuration(timeRemaining);
    } else {
      remainingMin = Math.max(0, remainingEstimateMinutes - spentMin);
    }

    onSave(spentMin, remainingMin, new Date(dateStarted).toISOString(), description.trim());
    
    // Reset state
    setTimeSpent("");
    setDescription("");
    onClose();
  };

  // Calculate stats for Progress Bar
  const totalDuration = totalLoggedMinutes + remainingEstimateMinutes;
  const progressPct = totalDuration > 0 ? Math.round((totalLoggedMinutes / totalDuration) * 100) : 0;

  return (
    <Modal title="Log Time" onClose={onClose} width="max-w-md">
      <form onSubmit={handleSave} className="space-y-4 text-left">
        {/* Progress header */}
        <div className="space-y-2">
          <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            Time Tracking Progress
          </h4>
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden">
              <div
                className="h-full rounded-full bg-[#5C5CFF]"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <span className="text-xs font-bold text-gray-800 shrink-0">
              {progressPct}%
            </span>
          </div>
          <div className="flex justify-between text-[11px] text-gray-500 font-semibold pt-0.5">
            <span>{formatDuration(totalLoggedMinutes)} logged</span>
            <span>{formatDuration(remainingEstimateMinutes)} remaining</span>
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* Time spent input */}
        <div className="space-y-1">
          <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            Time spent *
          </label>
          <InputField
            placeholder="e.g. 2h 30m, 45m, 1d"
            value={timeSpent}
            onChange={(e) => {
              setTimeSpent(e.target.value);
              if (validateDurationSyntax(e.target.value)) setTimeSpentError(null);
            }}
          />
          {timeSpentError && (
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-red-500 font-semibold">
              <AlertCircle size={12} />
              <span>{timeSpentError}</span>
            </div>
          )}
        </div>

        {/* Time remaining input */}
        <div className="space-y-1">
          <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            Time remaining (optional)
          </label>
          <InputField
            placeholder="Defaults to estimation deduction"
            value={timeRemaining}
            onChange={(e) => {
              setTimeRemaining(e.target.value);
              if (validateDurationSyntax(e.target.value)) setTimeRemainingError(null);
            }}
          />
          {timeRemainingError && (
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-red-500 font-semibold">
              <AlertCircle size={12} />
              <span>{timeRemainingError}</span>
            </div>
          )}
        </div>

        {/* Date started input */}
        <div className="space-y-1">
          <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            Date started *
          </label>
          <input
            type="datetime-local"
            value={dateStarted}
            onChange={(e) => setDateStarted(e.target.value)}
            className="w-full h-10 px-3 bg-white border border-[#E5E7EB] rounded-xl text-xs font-semibold text-gray-950 outline-none hover:border-gray-300 focus:ring-1 focus:ring-[#5C5CFF]"
            required
          />
        </div>

        {/* Work description input */}
        <div className="space-y-1">
          <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            Work description
          </label>
          <textarea
            placeholder="Add a description of the work completed..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full min-h-[80px] p-3 text-xs border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:border-[#5C5CFF]"
          />
        </div>

        {/* Footer actions */}
        <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
          <Btn variant="outline" type="button" onClick={onClose}>
            Cancel
          </Btn>
          <Btn
            type="submit"
            className="bg-[#5C5CFF] hover:bg-[#5B57E8] text-white"
            disabled={!timeSpent.trim() || !!timeSpentError || !!timeRemainingError}
          >
            Save Log
          </Btn>
        </div>
      </form>
    </Modal>
  );
}
