import { Employee } from "@/shared/types";

export type EventType =
  | "Attendance"
  | "Leave"
  | "WFH"
  | "Shift Change"
  | "Birthdays"
  | "Work Anniversary"
  | "Company Holiday"
  | "Team Meeting"
  | "Training Session"
  | "Team Event"
  | "Tasks Due";

export interface CalendarEvent {
  id: string;
  type: EventType;
  title: string;
  date: string; // YYYY-MM-DD
  endDate?: string; // Optional for multi-day events
  employee?: Employee;
  employeeName?: string;
  employeeInitials?: string;
  employeeColor?: string;
  duration?: string;
  status?: string;
  approver?: string;
  reason?: string;
  attachments?: { name: string; size: string }[];
  comments?: { author: string; text: string; time: string }[];
  activity?: { type: string; details: string; time: string }[];
}

export type CalendarViewMode = "Month" | "Week";
