import React from "react";
import { Employee } from "@/shared/types";
import { cn, fmtDate } from "@/shared/utils";
import { Avt, StatusBadge, Drawer } from "@/shared/components";
import { getAttendanceDetails } from "@/modules/attendance";

interface EmployeeProfileDrawerProps {
  employee: Employee | null;
  open: boolean;
  onClose: () => void;
}

export function EmployeeProfileDrawer({
  employee,
  open,
  onClose,
}: EmployeeProfileDrawerProps) {
  if (!employee) return null;

  const att = getAttendanceDetails(employee);

  // Leave balances (mocked consistently with EmployeeProfilePage)
  const leaveBalance = [
    { type: "Annual Leave", total: 18, remaining: 12, color: "bg-[#5C5CFF]" },
    { type: "Sick Leave", total: 10, remaining: 8, color: "bg-red-500" },
    { type: "Casual Leave", total: 6, remaining: 5, color: "bg-amber-500" },
  ];

  return (
    <Drawer
      isOpen={open}
      onClose={onClose}
      avatar={<Avt initials={employee.initials} color={employee.color} size="md" />}
      title={
        <div className="text-left">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-gray-900">{employee.name}</h3>
            <StatusBadge status={employee.status} />
          </div>
          <p className="text-xs text-gray-500 font-medium mt-0.5">
            {employee.designation} · {employee.dept}
          </p>
        </div>
      }
    >
      <div className="space-y-5 text-left">
        {/* Overview Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm space-y-4">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Overview
          </h4>
          <div className="grid grid-cols-2 gap-4 text-xs">
            {[
              ["Employee ID", employee.id],
              ["Email", employee.email],
              ["Phone", employee.phone],
              ["Department", employee.dept],
              ["Designation", employee.designation],
              ["Manager", employee.manager],
              ["Location", employee.branch],
              ["Employment Type", employee.empType],
              ["Joining Date", fmtDate(employee.joinDate)],
            ].map(([k, v]) => (
              <div key={k}>
                <div className="text-gray-400 font-medium mb-0.5">{k}</div>
                <div className="font-semibold text-gray-808 break-all">{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Work Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm space-y-4">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Work
          </h4>
          <div className="grid grid-cols-2 gap-4 text-xs">
            {[
              ["Current Shift", employee.shift],
              ["Reporting Manager", employee.manager],
              ["Department", employee.dept],
            ].map(([k, v]) => (
              <div key={k}>
                <div className="text-gray-400 font-medium mb-0.5">{k}</div>
                <div className="font-semibold text-gray-808">{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Attendance Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm space-y-4">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Attendance
          </h4>
          <div className="grid grid-cols-3 gap-4 text-xs">
            <div>
              <div className="text-gray-400 font-medium mb-0.5">Today's Status</div>
              <div className="flex items-center gap-1.5 mt-1 font-semibold text-gray-808">
                <span className={cn("w-1.5 h-1.5 rounded-full", att.dotColor)} />
                {att.status}
              </div>
            </div>
            <div>
              <div className="text-gray-400 font-medium mb-0.5">Check-In Time</div>
              <div className="font-semibold text-gray-808 mt-1">{att.checkIn}</div>
            </div>
            <div>
              <div className="text-gray-400 font-medium mb-0.5">Working Hours</div>
              <div className="font-semibold text-gray-808 mt-1">{att.workingHours}</div>
            </div>
          </div>
        </div>

        {/* Leave Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm space-y-3.5">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Available Leave Summary
          </h4>
          <div className="space-y-3">
            {leaveBalance.map((b) => (
              <div key={b.type} className="text-xs">
                <div className="flex justify-between font-semibold text-gray-700 mb-1.5">
                  <span>{b.type}</span>
                  <span>
                    {b.remaining} / {b.total} Days Left
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className={cn("h-full rounded-full", b.color)}
                    style={{
                      width: `${(b.remaining / b.total) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Drawer>
  );
}
