import { Employee } from "@/shared/types";
import { CalendarEvent, EventType } from "../types/team-calendar.types";

// Helper to format Date objects as YYYY-MM-DD
export function formatDateStr(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

// Generate team events dynamically based on current team employees and date bounds
export function generateTeamEvents(
  employees: Employee[],
  currentTeam: string,
  leaveRequests: any[],
  tasks: any[]
): CalendarEvent[] {
  const teamEmployees = employees.filter(
    (e) => currentTeam === "All" || e.dept.toLowerCase() === currentTeam.toLowerCase()
  );

  const events: CalendarEvent[] = [];

  // 1. Company Holidays (applicable to all teams)
  // Let's add Independence Day (Aug 15) and others
  events.push({
    id: "H-1",
    type: "Company Holiday",
    title: "Independence Day 🇺🇸",
    date: "2026-08-15",
    duration: "Full Day",
    status: "Active",
    reason: "National Holiday",
  });

  // 2. Birthdays (mapped to August 2026 based on employee info)
  // Priya Sharma: Aug 4 (Design)
  // David Chen: Aug 12 (Engineering)
  // Sarah Mitchell: Aug 1 (Engineering)
  employees.forEach((emp) => {
    if (emp.name === "Priya Sharma") {
      events.push({
        id: `B-${emp.id}`,
        type: "Birthdays",
        title: `${emp.name}'s Birthday 🎂`,
        date: "2026-08-04",
        employee: emp,
        employeeName: emp.name,
        employeeInitials: emp.initials,
        employeeColor: emp.color,
        duration: "Full Day",
        status: "Active",
      });
    } else if (emp.name === "David Chen") {
      events.push({
        id: `B-${emp.id}`,
        type: "Birthdays",
        title: `${emp.name}'s Birthday 🎂`,
        date: "2026-08-12",
        employee: emp,
        employeeName: emp.name,
        employeeInitials: emp.initials,
        employeeColor: emp.color,
        duration: "Full Day",
        status: "Active",
      });
    }
  });

  // 3. Work Anniversaries (mapped to August 2026)
  // Marcus Johnson: Aug 3 (4 Years)
  // Fatima Al-Hassan: Aug 24 (2 Years)
  employees.forEach((emp) => {
    if (emp.name === "Marcus Johnson") {
      events.push({
        id: `WA-${emp.id}`,
        type: "Work Anniversary",
        title: `${emp.name} · 4 Years Anniversary 🎉`,
        date: "2026-08-03",
        employee: emp,
        employeeName: emp.name,
        employeeInitials: emp.initials,
        employeeColor: emp.color,
        duration: "Full Day",
        status: "Active",
      });
    } else if (emp.name === "Fatima Al-Hassan") {
      events.push({
        id: `WA-${emp.id}`,
        type: "Work Anniversary",
        title: `${emp.name} · 2 Years Anniversary 🎉`,
        date: "2026-08-24",
        employee: emp,
        employeeName: emp.name,
        employeeInitials: emp.initials,
        employeeColor: emp.color,
        duration: "Full Day",
        status: "Active",
      });
    }
  });

  // 4. Leave Requests (filter and map to August 2026)
  // Sarah Mitchell: Aug 8 - Aug 10
  // Marcus Johnson: Aug 21
  // Fatima Al-Hassan: Aug 18 - Aug 22
  leaveRequests.forEach((req) => {
    const emp = teamEmployees.find((e) => e.name === req.employee);
    if (!emp) return;

    // Map any July 2024 dates in the mock database to August 2026 dynamically for display
    let mappedFrom = req.from.replace("2024-07-", "2026-08-");
    let mappedTo = req.to.replace("2024-07-", "2026-08-");
    
    // Fallback if formatting is different
    if (!mappedFrom.startsWith("2026-")) {
      if (req.employee === "Sarah Mitchell") {
        mappedFrom = "2026-08-08";
        mappedTo = "2026-08-10";
      } else if (req.employee === "Marcus Johnson") {
        mappedFrom = "2026-08-21";
        mappedTo = "2026-08-21";
      } else {
        mappedFrom = "2026-08-18";
        mappedTo = "2026-08-22";
      }
    }

    // Generate event for each day of the leave
    const start = new Date(mappedFrom);
    const end = new Date(mappedTo);
    const dayCount = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    for (let i = 0; i < dayCount; i++) {
      const current = new Date(start);
      current.setDate(start.getDate() + i);
      const currentDateStr = formatDateStr(current);

      events.push({
        id: `L-${req.id}-${currentDateStr}`,
        type: "Leave",
        title: `${req.employee} · ${req.type}`,
        date: currentDateStr,
        employee: emp,
        employeeName: emp.name,
        employeeInitials: emp.initials,
        employeeColor: emp.color,
        duration: `${req.days} Day(s)`,
        status: req.status,
        approver: "Alex Admin",
        reason: req.reason || "Personal Leave",
        attachments: [{ name: "Leave_Application.pdf", size: "380 KB" }],
        comments: [
          { author: "Alex Admin", text: "Approved, please ensure handoff is complete.", time: "2 days ago" },
        ],
        activity: [
          { type: "Applied", details: "Leave request submitted by employee", time: "3 days ago" },
          { type: "Approved", details: "Approved by Alex Admin", time: "2 days ago" },
        ],
      });
    }
  });

  // 5. Work From Home (WFH)
  // Marcus Johnson: Aug 10, Aug 11
  // Sarah Mitchell: Aug 17, Aug 18
  // Aisha Thompson: Aug 3, Aug 4
  teamEmployees.forEach((emp) => {
    const wfhDays: string[] = [];
    if (emp.name === "Marcus Johnson") wfhDays.push("2026-08-10", "2026-08-11");
    else if (emp.name === "Sarah Mitchell") wfhDays.push("2026-08-17", "2026-08-18");
    else if (emp.name === "Aisha Thompson") wfhDays.push("2026-08-03", "2026-08-04");

    wfhDays.forEach((d) => {
      events.push({
        id: `WFH-${emp.id}-${d}`,
        type: "WFH",
        title: `${emp.name} · WFH`,
        date: d,
        employee: emp,
        employeeName: emp.name,
        employeeInitials: emp.initials,
        employeeColor: emp.color,
        duration: "Full Day",
        status: "Approved",
        reason: "Remote working",
      });
    });
  });

  // 6. Attendance & Shifts (Only for today, e.g. Aug 5, 2026)
  // Let's add check-in events on Aug 5, 2026
  teamEmployees.forEach((emp) => {
    // Attendance on Aug 5, 2026 (Wednesday)
    if (emp.status === "Active") {
      events.push({
        id: `ATT-${emp.id}`,
        type: "Attendance",
        title: `${emp.name} · Present (09:00 AM)`,
        date: "2026-08-05",
        employee: emp,
        employeeName: emp.name,
        employeeInitials: emp.initials,
        employeeColor: emp.color,
        duration: "9 Hours",
        status: "Checked In",
      });

      // Shift Change / Shift details
      events.push({
        id: `SFT-${emp.id}`,
        type: "Shift Change",
        title: `${emp.name} · ${emp.shift} Shift`,
        date: "2026-08-05",
        employee: emp,
        employeeName: emp.name,
        employeeInitials: emp.initials,
        employeeColor: emp.color,
        duration: emp.shift === "Night" ? "22:00 – 06:00" : "09:00 – 18:00",
        status: "Active",
      });
    }
  });

  // 7. Team Meetings & Events
  // Team Meeting: Monday Aug 3 at 10 AM, Thursday Aug 6 at 11 AM
  events.push({
    id: "M-1",
    type: "Team Meeting",
    title: "Weekly Sync Meeting 👥",
    date: "2026-08-03",
    duration: "10:00 AM – 11:00 AM",
    status: "Scheduled",
    reason: "Sprint goals alignment",
    comments: [],
  });
  events.push({
    id: "M-2",
    type: "Team Meeting",
    title: "Backlog Grooming 📋",
    date: "2026-08-06",
    duration: "02:00 PM – 03:00 PM",
    status: "Scheduled",
  });

  // Training Session: Aug 18
  events.push({
    id: "TR-1",
    type: "Training Session",
    title: "Security Compliance Training 🔒",
    date: "2026-08-18",
    duration: "11:00 AM – 12:30 PM",
    status: "Scheduled",
  });

  // Team Event: Dinner on Aug 28
  events.push({
    id: "TE-1",
    type: "Team Event",
    title: "Team Dinner & Social 🍕",
    date: "2026-08-28",
    duration: "06:00 PM onwards",
    status: "Confirmed",
  });

  // 8. Tasks Due
  tasks.forEach((t) => {
    const emp = teamEmployees.find((e) => e.name === t.assignee);
    if (!emp) return;

    // Map task due dates to August 2026 if they match July 2026
    let mappedDue = t.dueDate ? t.dueDate.replace("2026-07-", "2026-08-") : "2026-08-08";
    if (t.id === "TT1" || t.id === "T001") mappedDue = "2026-08-03";
    if (t.id === "TT2" || t.id === "T002") mappedDue = "2026-08-08";
    if (t.id === "TT3" || t.id === "T003") mappedDue = "2026-08-15";

    events.push({
      id: `TSK-${t.id}`,
      type: "Tasks Due",
      title: `${t.assignee} · Task Due: ${t.title}`,
      date: mappedDue,
      employee: emp,
      employeeName: emp.name,
      employeeInitials: emp.initials,
      employeeColor: emp.color,
      status: t.status,
      duration: "End of Day",
      reason: `Task priority: ${t.priority}`,
    });
  });

  return events;
}

// Colors helper matching the event color definitions exactly
export function getEventColors(type: EventType): { bg: string; text: string; border: string; dot: string } {
  switch (type) {
    case "Attendance":
      return {
        bg: "bg-green-50/50",
        text: "text-green-700",
        border: "border-green-150",
        dot: "bg-green-500",
      };
    case "Leave":
      return {
        bg: "bg-red-50/50",
        text: "text-red-700",
        border: "border-red-150",
        dot: "bg-red-500",
      };
    case "WFH":
      return {
        bg: "bg-blue-50/50",
        text: "text-blue-700",
        border: "border-blue-150",
        dot: "bg-blue-500",
      };
    case "Company Holiday":
      return {
        bg: "bg-purple-50/50",
        text: "text-purple-700",
        border: "border-purple-150",
        dot: "bg-purple-500",
      };
    case "Birthdays":
      return {
        bg: "bg-orange-50/50",
        text: "text-orange-700",
        border: "border-orange-150",
        dot: "bg-orange-500",
      };
    case "Work Anniversary":
      return {
        bg: "bg-teal-50/50",
        text: "text-teal-700",
        border: "border-teal-150",
        dot: "bg-teal-500",
      };
    case "Team Meeting":
    case "Team Event":
      return {
        bg: "bg-gray-50/50",
        text: "text-gray-700",
        border: "border-gray-150",
        dot: "bg-gray-500",
      };
    case "Training Session":
      return {
        bg: "bg-indigo-50/50",
        text: "text-indigo-700",
        border: "border-indigo-150",
        dot: "bg-indigo-500",
      };
    case "Tasks Due":
      return {
        bg: "bg-amber-50/50",
        text: "text-amber-700",
        border: "border-amber-150",
        dot: "bg-amber-500",
      };
    default:
      return {
        bg: "bg-gray-50",
        text: "text-gray-600",
        border: "border-gray-200",
        dot: "bg-gray-400",
      };
  }
}
