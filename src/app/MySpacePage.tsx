import React, { useState, useEffect } from "react";
import {
  Plus, Check, X, ChevronLeft, ChevronRight, Download, Upload,
  UserCheck, UserX, CalendarDays, CheckCircle, AlertCircle,
  GitBranch, Shield, Megaphone, Clock, FileText,
  Edit, Eye, Users, UserPlus, Bell, Pin,
  Bookmark, Share2, ThumbsUp, Send,
  MoreHorizontal, Printer, Search, Filter,
  ChevronDown, RefreshCw, Trash2, CheckSquare,
  CornerDownRight, SortAsc, MessageSquare,
  TrendingUp, TrendingDown, AlertTriangle, Activity,
  ArrowUpRight, ArrowDownRight, XCircle, Sliders, MapPin
} from "lucide-react";
import {
  BarChart as RBarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
  AreaChart, Area, LineChart as RLineChart, Line,
  PieChart, Pie, Legend
} from "recharts";
import { AppPage, EMP_COLORS, LEAVE_REQUESTS, cn, fmtDate } from "./data";
import { Avt, StatusBadge, Btn, Modal, SelectField, InputField } from "./ui";

// ── Interfaces ────────────────────────────────────────────────────────────────
interface AppComment {
  id: string;
  parentId: string | null;
  author: string;
  isOwn: boolean;
  text: string;
  timestamp: number;
  edited: boolean;
}

// ── Static Data ───────────────────────────────────────────────────────────────
const GLOBAL_CAL_FILTERS_DEF = [
  { label: "Attendance", color: "#22C55E" },
  { label: "WFH", color: "#3B82F6" },
  { label: "Approved Leave", color: "#5C5CFF" },
  { label: "Holiday", color: "#EF4444" },
  { label: "Birthday", color: "#EC4899" },
  { label: "Work Anniversary", color: "#8B5CF6" },
  { label: "Company Event", color: "#F59E0B" },
  { label: "Meeting", color: "#06B6D4" },
  { label: "Training", color: "#F97316" },
  { label: "Personal", color: "#6B7280" },
  { label: "Shift", color: "#14B8A6" },
];

const GLOBAL_EVENTS = [
  { id: "GE1",  day: 1,  label: "Checked in · 09:02 AM",           type: "Attendance",     color: "#22C55E" },
  { id: "GE2",  day: 4,  label: "Independence Day",                 type: "Holiday",        color: "#EF4444" },
  { id: "GE3",  day: 5,  label: "My Annual Leave",                  type: "Approved Leave", color: "#5C5CFF" },
  { id: "GE4",  day: 6,  label: "My Annual Leave",                  type: "Approved Leave", color: "#5C5CFF" },
  { id: "GE5",  day: 7,  label: "My Annual Leave",                  type: "Approved Leave", color: "#5C5CFF" },
  { id: "GE6",  day: 8,  label: "My Annual Leave",                  type: "Approved Leave", color: "#5C5CFF" },
  { id: "GE7",  day: 9,  label: "My Annual Leave",                  type: "Approved Leave", color: "#5C5CFF" },
  { id: "GE8",  day: 24, label: "Work From Home",                   type: "WFH",            color: "#3B82F6" },
  { id: "GE9",  day: 12, label: "Priya Sharma's Birthday 🎂",       type: "Birthday",       color: "#EC4899" },
  { id: "GE10", day: 22, label: "Robert Kim · 3yr Anniversary",     type: "Work Anniversary", color: "#8B5CF6" },
  { id: "GE11", day: 15, label: "Q2 All-Hands · 3:00 PM",          type: "Company Event",  color: "#F59E0B" },
  { id: "GE12", day: 10, label: "1:1 with David Chen · 2PM",       type: "Meeting",        color: "#06B6D4" },
  { id: "GE13", day: 17, label: "Sprint Review · 10AM",            type: "Meeting",        color: "#06B6D4" },
  { id: "GE14", day: 25, label: "Leadership Training · 9AM",       type: "Training",       color: "#F97316" },
  { id: "GE15", day: 20, label: "Doctor Appointment",              type: "Personal",       color: "#6B7280" },
  { id: "GE16", day: 1,  label: "General Shift · 09:00–18:00",     type: "Shift",          color: "#14B8A6" },
  { id: "GE17", day: 2,  label: "General Shift · 09:00–18:00",     type: "Shift",          color: "#14B8A6" },
  { id: "GE18", day: 3,  label: "General Shift · 09:00–18:00",     type: "Shift",          color: "#14B8A6" },
  { id: "GE19", day: 29, label: "James O'Brien Leave starts",      type: "Approved Leave", color: "#5C5CFF" },
];

const MONTHLY_ATT_DATA = [
  { day:"1",  h:9.2, s:"Present" }, { day:"2",  h:8.7, s:"Late"    },
  { day:"3",  h:9.1, s:"Present" }, { day:"4",  h:0,   s:"Holiday" },
  { day:"5",  h:9.0, s:"WFH"    }, { day:"6",  h:0,   s:"Weekend" },
  { day:"7",  h:0,   s:"Weekend" }, { day:"8",  h:9.2, s:"Present" },
  { day:"9",  h:8.9, s:"Present" }, { day:"10", h:9.1, s:"Present" },
  { day:"11", h:8.6, s:"Late"   }, { day:"12", h:9.0, s:"Present" },
  { day:"13", h:0,   s:"Weekend" }, { day:"14", h:0,   s:"Weekend" },
  { day:"15", h:8.5, s:"Present" }, { day:"16", h:9.0, s:"Present" },
  { day:"17", h:9.3, s:"Present" }, { day:"18", h:0,   s:"Leave"   },
  { day:"19", h:0,   s:"Leave"   }, { day:"20", h:0,   s:"Weekend" },
  { day:"21", h:0,   s:"Weekend" }, { day:"22", h:9.1, s:"Present" },
  { day:"23", h:8.8, s:"Present" }, { day:"24", h:9.0, s:"WFH"    },
  { day:"25", h:9.0, s:"Present" }, { day:"26", h:8.9, s:"Present" },
  { day:"27", h:0,   s:"Weekend" }, { day:"28", h:0,   s:"Weekend" },
  { day:"29", h:8.2, s:"Present" }, { day:"30", h:9.1, s:"Present" },
  { day:"31", h:8.8, s:"Present" },
];

const WEEKLY_ATT_DATA = [
  { day:"Mon", h:9.0, s:"WFH"     },
  { day:"Tue", h:9.1, s:"Present" },
  { day:"Wed", h:8.9, s:"Present" },
  { day:"Thu", h:9.0, s:"Present" },
  { day:"Fri", h:9.2, s:"Present" },
  { day:"Sat", h:0,   s:"Weekend" },
  { day:"Sun", h:0,   s:"Weekend" },
];

function barFill(s: string, h: number): string {
  if (s === "Holiday" || s === "Weekend") return "#E5E7EB";
  if (s === "Leave")  return "#C4B5FD";
  if (s === "WFH")    return "#93C5FD";
  if (s === "Late")   return "#FCD34D";
  if (h >= 9)         return "#5C5CFF";
  return "#A5B4FC";
}

function fmtTs(ts: number): string {
  const d = Date.now() - ts;
  if (d < 60000)    return "Just now";
  if (d < 3600000)  return `${Math.floor(d / 60000)}m ago`;
  if (d < 86400000) return `${Math.floor(d / 3600000)}h ago`;
  return new Date(ts).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

const ATT_TIMELINE = [
  { date:"Jul 1, 2024",  day:"Tue", in:"09:02 AM", out:"06:15 PM", hours:"9h 13m", status:"Present", shift:"General Shift", late:false, wfh:false, ot:"1h 13m" },
  { date:"Jun 30, 2024", day:"Mon", in:"09:18 AM", out:"06:00 PM", hours:"8h 42m", status:"Late",    shift:"General Shift", late:true,  wfh:false, ot:"0h" },
  { date:"Jun 29, 2024", day:"Sun", in:"—",        out:"—",        hours:"—",      status:"Weekend", shift:"",              late:false, wfh:false, ot:"0h" },
  { date:"Jun 28, 2024", day:"Sat", in:"—",        out:"—",        hours:"—",      status:"Weekend", shift:"",              late:false, wfh:false, ot:"0h" },
  { date:"Jun 27, 2024", day:"Fri", in:"09:00 AM", out:"06:05 PM", hours:"9h 05m", status:"Present", shift:"General Shift", late:false, wfh:false, ot:"1h 05m" },
  { date:"Jun 26, 2024", day:"Thu", in:"08:55 AM", out:"05:50 PM", hours:"8h 55m", status:"Present", shift:"General Shift", late:false, wfh:false, ot:"0h 55m" },
  { date:"Jun 25, 2024", day:"Wed", in:"09:00 AM", out:"06:00 PM", hours:"9h 00m", status:"Present", shift:"General Shift", late:false, wfh:false, ot:"1h 00m" },
  { date:"Jun 24, 2024", day:"Tue", in:"09:00 AM", out:"06:00 PM", hours:"9h 00m", status:"WFH",     shift:"General Shift", late:false, wfh:true,  ot:"1h 00m" },
  { date:"Jun 23, 2024", day:"Mon", in:"09:05 AM", out:"06:10 PM", hours:"9h 05m", status:"Present", shift:"General Shift", late:false, wfh:false, ot:"1h 05m" },
  { date:"Jun 22, 2024", day:"Sun", in:"—",        out:"—",        hours:"—",      status:"Weekend", shift:"",              late:false, wfh:false, ot:"0h" },
  { date:"Jun 21, 2024", day:"Sat", in:"—",        out:"—",        hours:"—",      status:"Weekend", shift:"",              late:false, wfh:false, ot:"0h" },
  { date:"Jun 20, 2024", day:"Fri", in:"09:00 AM", out:"06:00 PM", hours:"9h 00m", status:"Present", shift:"General Shift", late:false, wfh:false, ot:"1h 00m" },
  { date:"Jun 19, 2024", day:"Thu", in:"09:22 AM", out:"06:00 PM", hours:"8h 38m", status:"Late",    shift:"General Shift", late:true,  wfh:false, ot:"0h" },
  { date:"Jun 18, 2024", day:"Wed", in:"—",        out:"—",        hours:"—",      status:"Leave",   shift:"General Shift", late:false, wfh:false, ot:"0h" },
  { date:"Jun 17, 2024", day:"Tue", in:"09:00 AM", out:"06:00 PM", hours:"9h 00m", status:"Present", shift:"General Shift", late:false, wfh:false, ot:"1h 00m" },
];

const MY_LEAVE_HIST = [
  { id:"L1", type:"Annual Leave", from:"Mar 15", to:"Mar 22", days:6, status:"Approved", applied:"Mar 10" },
  { id:"L2", type:"Sick Leave",   from:"Feb 5",  to:"Feb 6",  days:2, status:"Approved", applied:"Feb 5" },
  { id:"L3", type:"Casual Leave", from:"Jan 2",  to:"Jan 2",  days:1, status:"Approved", applied:"Dec 29" },
];

const APPROVAL_ITEMS_DEFAULT = [
  { id:"A1", type:"Leave",      employee:"Sarah Mitchell", dept:"Engineering", detail:"Annual Leave · 5 days · Jul 5–9",          applied:"Jun 28", status:"Pending",  leaveType:"Annual Leave",          dateRange:"Jul 5 – Jul 9, 2024",    days:"5 days", reason:"Family vacation planned well in advance." },
  { id:"A2", type:"Leave",      employee:"Yuki Tanaka",    dept:"Engineering", detail:"Casual Leave · 1 day · Jul 4",             applied:"Jul 2",  status:"Pending",  leaveType:"Casual Leave",          dateRange:"Jul 4, 2024",             days:"1 day",  reason:"Personal work appointment." },
  { id:"A3", type:"Leave",      employee:"Lisa Nakamura",  dept:"Design",      detail:"Annual Leave · 6 days · Jul 15–22",        applied:"Jul 1",  status:"Pending",  leaveType:"Annual Leave",          dateRange:"Jul 15 – Jul 22, 2024",   days:"6 days", reason:"Summer holiday trip." },
  { id:"A4", type:"Attendance", employee:"Marcus Johnson", dept:"Product",     detail:"Missing check-out · Jul 1",                applied:"Jul 1",  status:"Pending",  leaveType:"Attendance Correction", dateRange:"Jul 1, 2024",             days:"—",      reason:"Was working from client site and forgot to check out." },
  { id:"A5", type:"Attendance", employee:"James O'Brien",  dept:"Sales",       detail:"Late arrival correction · Jun 30",         applied:"Jun 30", status:"Pending",  leaveType:"Attendance Correction", dateRange:"Jun 30, 2024",            days:"—",      reason:"Train delay due to signal failure." },
  { id:"A6", type:"Shift",      employee:"Priya Sharma",   dept:"Design",      detail:"Shift change · General → Morning",         applied:"Jun 29", status:"Pending",  leaveType:"Shift Change",          dateRange:"Jul 1, 2024 onwards",     days:"Permanent", reason:"Need to pick up kids from school in the evenings." },
  { id:"A7", type:"Department", employee:"Robert Kim",     dept:"Finance",     detail:"Transfer request · Finance → Operations",  applied:"Jun 28", status:"Pending",  leaveType:"Department Transfer",   dateRange:"Aug 1, 2024",             days:"—",      reason:"Interested in operations management career path." },
  { id:"A8", type:"Leave",      employee:"Marcus Johnson", dept:"Product",     detail:"Sick Leave · 2 days · Jun 30",             applied:"Jun 28", status:"Approved", leaveType:"Sick Leave",            dateRange:"Jun 30 – Jul 1, 2024",    days:"2 days", reason:"Medical appointment." },
  { id:"A9", type:"Leave",      employee:"Robert Kim",     dept:"Finance",     detail:"Sick Leave · 2 days · Jul 1",              applied:"Jun 28", status:"Rejected", leaveType:"Sick Leave",            dateRange:"Jul 1 – Jul 2, 2024",     days:"2 days", reason:"Fever and fatigue." },
];

const ANNOUNCEMENTS_DATA = [
  { id:"ANN1", title:"Q2 All-Hands Meeting", body:"Join us on July 15th at 3:00 PM EST for our Q2 All-Hands. We'll cover company performance, departmental highlights, product roadmap updates, and recognize our top performers.\n\nAgenda:\n• Welcome & Q2 recap (15 min)\n• Department highlights (30 min)\n• Product roadmap preview (20 min)\n• Top performer recognition (15 min)\n• Q&A (20 min)\n\nThe meeting will be recorded for those who cannot attend live.", author:"Alex Admin", dept:"All Employees", timeAgo:"2 days ago", priority:"High", pinned:true, category:"Event", readCount:234, audience:"All Employees (847)" },
  { id:"ANN2", title:"Office Closure – Independence Day", body:"All Acme Corporation offices will be closed on July 4th, 2024 in observance of Independence Day.\n\nEmergency contacts:\n• IT Support: it-emergency@acmecorp.com\n• Security: +1 (555) 911-0000\n\nNormal operations resume July 5th.", author:"Aisha Thompson", dept:"All", timeAgo:"5 days ago", priority:"Medium", pinned:false, category:"Notice", readCount:521, audience:"All Employees (847)" },
  { id:"ANN3", title:"Updated Leave Policy – FY2025", body:"Effective January 1, 2025, annual leave entitlement increases from 18 to 20 days for employees with 3+ years of continuous tenure.\n\nKey changes:\n• Annual Leave: 18 → 20 days (3+ years tenure)\n• Carry Forward: increased from 5 to 8 days max\n• Sick Leave documentation: threshold raised to 3+ consecutive days\n\nPlease review and acknowledge by July 31, 2024.", author:"Aisha Thompson", dept:"All", timeAgo:"8 days ago", priority:"High", pinned:false, category:"Policy", readCount:412, audience:"All Employees (847)" },
  { id:"ANN4", title:"New Employee Wellness Program", body:"We're excited to launch the Acme Wellness Program starting August 1st. All full-time employees will have access to mental health support, gym reimbursement up to $50/month, and weekly wellness sessions.", author:"Jennifer Walsh", dept:"HR", timeAgo:"13 days ago", priority:"Medium", pinned:false, category:"Benefits", readCount:189, audience:"Full-Time Employees (634)" },
  { id:"ANN5", title:"Engineering All-Hands – Q2 Sprint Review", body:"The Engineering team all-hands will cover Q2 sprint completion, tech debt roadmap, and H2 architecture decisions. Attendance mandatory for all engineering staff.", author:"David Chen", dept:"Engineering", timeAgo:"15 days ago", priority:"High", pinned:false, category:"Team", readCount:67, audience:"Engineering (148)" },
];

const UPCOMING_EVENTS = [
  { date:"Jul 15", label:"Q2 All-Hands Meeting",              time:"3:00 PM EST", type:"Event",   color:"#5C5CFF" },
  { date:"Jul 20", label:"Performance Review Cycle Opens",     time:"All Day",     type:"HR",      color:"#F59E0B" },
  { date:"Jul 31", label:"Leave Policy Acknowledgment Deadline", time:"EOD",       type:"Policy",  color:"#EF4444" },
  { date:"Aug 1",  label:"Wellness Program Launches",          time:"All Day",     type:"Benefits",color:"#22C55E" },
];

const ATT_CAL_FILTERS_DEFAULT = ["Attendance","WFH","Leave","Holiday","Weekend","Shift"];

const TEAM_ATTENDANCE = [
  {id:"TE1",name:"Sarah Mitchell", dept:"Engineering",initials:"SM",color:"#22C55E",  checkIn:"09:00 AM",checkOut:"06:02 PM",hours:"9h 02m",status:"Present",shift:"General",location:"New York HQ"},
  {id:"TE2",name:"Marcus Johnson",  dept:"Product",    initials:"MJ",color:"#F59E0B",  checkIn:"09:32 AM",checkOut:"—",       hours:"—",     status:"Late",   shift:"General",location:"New York HQ"},
  {id:"TE3",name:"Yuki Tanaka",     dept:"Engineering",initials:"YT",color:"#5C5CFF",  checkIn:"—",       checkOut:"—",       hours:"—",     status:"WFH",    shift:"General",location:"Remote"},
  {id:"TE4",name:"James O'Brien",   dept:"Sales",      initials:"JO",color:"#EF4444",  checkIn:"—",       checkOut:"—",       hours:"—",     status:"Leave",  shift:"General",location:"—"},
  {id:"TE5",name:"Priya Sharma",    dept:"Design",     initials:"PS",color:"#EC4899",  checkIn:"08:58 AM",checkOut:"06:00 PM",hours:"9h 02m",status:"Present",shift:"General",location:"New York HQ"},
  {id:"TE6",name:"Robert Kim",      dept:"Finance",    initials:"RK",color:"#8B5CF6",  checkIn:"09:01 AM",checkOut:"—",       hours:"5h 32m",status:"Present",shift:"General",location:"New York HQ"},
  {id:"TE7",name:"Lisa Nakamura",   dept:"Design",     initials:"LN",color:"#5C5CFF",  checkIn:"—",       checkOut:"—",       hours:"—",     status:"Absent", shift:"General",location:"—"},
  {id:"TE8",name:"David Park",      dept:"Engineering",initials:"DP",color:"#06B6D4",  checkIn:"09:03 AM",checkOut:"06:05 PM",hours:"9h 02m",status:"Present",shift:"General",location:"New York HQ"},
  {id:"TE9",name:"Aisha Thompson",  dept:"HR",         initials:"AT",color:"#22C55E",  checkIn:"08:45 AM",checkOut:"06:00 PM",hours:"9h 15m",status:"Present",shift:"General",location:"New York HQ"},
  {id:"TE10",name:"Carlos Rivera",  dept:"Operations", initials:"CR",color:"#F97316", checkIn:"09:00 AM",checkOut:"—",       hours:"5h 30m",status:"Present",shift:"General",location:"New York HQ"},
];

const ATT_EXCEPTIONS_DATA = [
  {id:"EX1",employee:"Marcus Johnson", dept:"Product",    initials:"MJ",color:"#F59E0B",date:"Jul 1",  issue:"Missing Check-out",                 shift:"General (09:00–18:00)",status:"Pending",  hr:"Aisha Thompson",resolution:"—"},
  {id:"EX2",employee:"James O'Brien",  dept:"Sales",      initials:"JO",color:"#EF4444",date:"Jun 30", issue:"Late Arrival",                      shift:"General (09:00–18:00)",status:"Resolved", hr:"Aisha Thompson",resolution:"Accepted – Train delay"},
  {id:"EX3",employee:"Yuki Tanaka",    dept:"Engineering",initials:"YT",color:"#5C5CFF",date:"Jun 28", issue:"Missed Check-in",                   shift:"General (09:00–18:00)",status:"Pending",  hr:"Aisha Thompson",resolution:"—"},
  {id:"EX4",employee:"Priya Sharma",   dept:"Design",     initials:"PS",color:"#EC4899",date:"Jun 27", issue:"Early Exit",                        shift:"General (09:00–18:00)",status:"Pending",  hr:"Aisha Thompson",resolution:"—"},
  {id:"EX5",employee:"Sarah Mitchell", dept:"Engineering",initials:"SM",color:"#22C55E",date:"Jun 25", issue:"Shift Violation",                   shift:"General (09:00–18:00)",status:"Resolved", hr:"Aisha Thompson",resolution:"Shift change approved"},
  {id:"EX6",employee:"Robert Kim",     dept:"Finance",    initials:"RK",color:"#8B5CF6",date:"Jun 24", issue:"Attendance Regularization Pending", shift:"General (09:00–18:00)",status:"Pending",  hr:"Jennifer Walsh", resolution:"—"},
];

const ATT_DAILY_DATA = [
  {day:"Mon 6/24",present:87,late:8,absent:5},
  {day:"Tue 6/25",present:91,late:5,absent:4},
  {day:"Wed 6/26",present:85,late:9,absent:6},
  {day:"Thu 6/27",present:88,late:7,absent:5},
  {day:"Fri 6/28",present:90,late:6,absent:4},
  {day:"Mon 7/1", present:86,late:8,absent:6},
  {day:"Tue 7/2", present:89,late:7,absent:4},
];

const ATT_YEAR_DATA = [
  {month:"Jan",rate:91,wfh:12,late:6,ot:18,absent:9},
  {month:"Feb",rate:89,wfh:15,late:8,ot:22,absent:11},
  {month:"Mar",rate:93,wfh:18,late:5,ot:16,absent:7},
  {month:"Apr",rate:87,wfh:20,late:9,ot:14,absent:13},
  {month:"May",rate:92,wfh:22,late:6,ot:20,absent:8},
  {month:"Jun",rate:90,wfh:19,late:7,ot:24,absent:10},
  {month:"Jul",rate:94,wfh:25,late:4,ot:19,absent:6},
];

const ATT_ISSUES_DEFAULT = [
  {id:"ISS1",type:"Missing Check-out",    date:"Jul 1",  reason:"Was working from client site", status:"Pending",  submittedOn:"Jul 1",  comment:"Forgot to check out before leaving",rejectNote:""},
  {id:"ISS2",type:"Late Arrival",         date:"Jun 30", reason:"Train delay – signal failure",  status:"Approved", submittedOn:"Jun 30", comment:"20 min delay on Metro line B",       rejectNote:""},
  {id:"ISS3",type:"Incorrect Attendance", date:"Jun 19", reason:"System marked me absent",       status:"Rejected", submittedOn:"Jun 20", comment:"I was present all day",              rejectNote:"Biometric logs show no entry for this date."},
];

const LEAVE_TYPE_DIST = [
  {name:"Annual Leave", value:42,color:"#5C5CFF"},
  {name:"Sick Leave",   value:28,color:"#EF4444"},
  {name:"Casual Leave", value:18,color:"#22C55E"},
  {name:"Unpaid Leave", value:7, color:"#F59E0B"},
  {name:"Compensatory", value:5, color:"#8B5CF6"},
];

const LEAVE_MONTHLY_DATA = [
  {month:"Jan",leaves:24,sick:8, casual:6},
  {month:"Feb",leaves:18,sick:6, casual:3},
  {month:"Mar",leaves:32,sick:10,casual:8},
  {month:"Apr",leaves:21,sick:7, casual:5},
  {month:"May",leaves:19,sick:5, casual:4},
  {month:"Jun",leaves:28,sick:9, casual:7},
  {month:"Jul",leaves:22,sick:6, casual:5},
];

const LEAVE_DEPT_DATA = [
  {dept:"Engineering",count:12,pct:18,upcoming:3},
  {dept:"Sales",      count:8, pct:12,upcoming:2},
  {dept:"HR",         count:5, pct:8, upcoming:1},
  {dept:"Design",     count:6, pct:9, upcoming:2},
  {dept:"Finance",    count:4, pct:7, upcoming:0},
  {dept:"Operations", count:3, pct:5, upcoming:1},
];

const LEAVE_ON_TODAY = [
  {name:"Sarah Mitchell",dept:"Engineering",initials:"SM",color:"#22C55E",type:"Annual Leave",range:"Jul 5–9", days:5},
  {name:"James O'Brien", dept:"Sales",      initials:"JO",color:"#EF4444",type:"Casual Leave",range:"Jul 1",   days:1},
  {name:"Lisa Nakamura", dept:"Design",     initials:"LN",color:"#5C5CFF",type:"Annual Leave",range:"Jul 1–3", days:3},
];

const MY_LEAVE_RICH = [
  {id:"L1",type:"Annual Leave",from:"Jul 5",  to:"Jul 9",  days:5,status:"Pending",  applied:"Jun 28",approver:"David Chen",   reason:"Family vacation planned well in advance.", attachment:false,comment:"",               rejectReason:""},
  {id:"L2",type:"Annual Leave",from:"Mar 15", to:"Mar 22", days:6,status:"Approved", applied:"Mar 10",approver:"David Chen",   reason:"Family trip.",                             attachment:false,comment:"Approved, enjoy!", rejectReason:""},
  {id:"L3",type:"Sick Leave",  from:"Feb 5",  to:"Feb 6",  days:2,status:"Approved", applied:"Feb 5", approver:"David Chen",   reason:"Medical appointment – doctor's note.",     attachment:true, comment:"Get well soon.",  rejectReason:""},
  {id:"L4",type:"Casual Leave",from:"Jan 2",  to:"Jan 2",  days:1,status:"Rejected", applied:"Dec 29",approver:"David Chen",   reason:"Personal work appointment.",               attachment:false,comment:"",               rejectReason:"Insufficient leave balance for this period. Please reapply after Jan 15."},
];

const MapSVG = ({ isInside }: { isInside: boolean }) => {
  const userPinX = isInside ? 165 : 240;
  const userPinY = isInside ? 115 : 60;

  return (
    <svg className="w-full h-full border border-gray-200 rounded-xl bg-slate-50 shadow-inner" viewBox="0 0 300 200">
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" strokeWidth="1"/>
        </pattern>
      </defs>
      
      <rect width="300" height="200" fill="url(#grid)" />
      
      {/* Buildings / Blocks */}
      <rect x="20" y="30" width="80" height="40" rx="4" fill="#e2e8f0" />
      <rect x="120" y="20" width="160" height="30" rx="4" fill="#e2e8f0" />
      <rect x="15" y="120" width="100" height="60" rx="4" fill="#e2e8f0" />
      <rect x="140" y="130" width="140" height="50" rx="4" fill="#e2e8f0" />
      
      {/* Geofence Ring */}
      <circle 
        cx="140" 
        cy="100" 
        r="55" 
        fill="#5C5CFF" 
        fillOpacity="0.06" 
        stroke="#5C5CFF" 
        strokeWidth="1.5" 
        strokeDasharray="4 3" 
      />
      <text x="140" y="148" textAnchor="middle" className="text-[9px] font-bold fill-[#5C5CFF]">200m Geo-fence</text>
      
      {/* Office pin */}
      <circle cx="140" cy="100" r="4" fill="#5C5CFF" />
      <circle cx="140" cy="100" r="10" fill="none" stroke="#5C5CFF" strokeWidth="1" opacity="0.3" />
      <g transform="translate(132, 76)">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 5.25 8 12 8 12s8-6.75 8-12c0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" fill="#5C5CFF" />
      </g>
      <text x="140" y="70" textAnchor="middle" className="text-[9px] font-bold fill-gray-800">New York HQ</text>
      
      {/* User Pin */}
      <g transform={`translate(${userPinX - 8}, ${userPinY - 20})`}>
        <path 
          d="M8 0C3.58 0 0 3.58 0 8c0 5.25 8 12 8 12s8-6.75 8-12c0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" 
          fill={isInside ? "#22C55E" : "#EF4444"} 
        />
        <circle cx="8" cy="8" r="12" fill="none" stroke={isInside ? "#22C55E" : "#EF4444"} strokeWidth="1.5" className="animate-ping" opacity="0.4" />
      </g>
      <text x={userPinX} y={userPinY + 8} textAnchor="middle" className="text-[8px] font-bold fill-gray-600">Your Location</text>
    </svg>
  );
};

// ── Component ─────────────────────────────────────────────────────────────────
export function MySpacePage({
  navigate,
  activeTab,
  hideTabs = false,
  hideAttendanceHeader = false,
  attViewProp,
  setAttViewProp,
  attPeriodProp,
  setAttPeriodProp,
  hideLeaveHeader = false,
  leaveViewProp,
  setLeaveViewProp
}: {
  navigate: (p: AppPage) => void;
  activeTab?: string;
  hideTabs?: boolean;
  hideAttendanceHeader?: boolean;
  attViewProp?: "summary" | "timeline" | "calendar" | "issues";
  setAttViewProp?: (v: "summary" | "timeline" | "calendar" | "issues") => void;
  attPeriodProp?: "Weekly" | "Monthly" | "Yearly";
  setAttPeriodProp?: (p: "Weekly" | "Monthly" | "Yearly") => void;
  hideLeaveHeader?: boolean;
  leaveViewProp?: "Balance" | "Requests" | "Calendar" | "Analytics" | "Status";
  setLeaveViewProp?: (v: "Balance" | "Requests" | "Calendar" | "Analytics" | "Status") => void;
}) {
  const MS_TABS = ["Dashboard","Attendance","Leave","Tasks","Approvals","Calendar"];
  const [tab, setTab] = useState(activeTab || "Dashboard");

  useEffect(() => {
    if (activeTab) {
      setTab(activeTab);
    }
  }, [activeTab]);

  // Shared
  const [checkedIn, setCheckedIn] = useState(true);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [isInsideGeofence, setIsInsideGeofence] = useState(true);
  const [reqs, setReqs] = useState(LEAVE_REQUESTS);

  // Leave modals
  const [approveModalId, setApproveModalId] = useState<string|null>(null);
  const [rejectModalId,  setRejectModalId]  = useState<string|null>(null);
  const [rejectReason,   setRejectReason]   = useState("");
  const [approveComment, setApproveComment] = useState("");
  const [leaveDetailId,  setLeaveDetailId]  = useState<string|null>(null);

  const confirmApprove = () => {
    if (!approveModalId) return;
    setReqs(r => r.map(x => x.id === approveModalId ? { ...x, status:"Approved" } : x));
    setApproveModalId(null); setApproveComment("");
  };
  const confirmReject = () => {
    if (!rejectModalId || !rejectReason.trim()) return;
    setReqs(r => r.map(x => x.id === rejectModalId ? { ...x, status:"Rejected" } : x));
    setRejectModalId(null); setRejectReason("");
  };

  // Approval items
  const [appApproveId,      setAppApproveId]      = useState<string|null>(null);
  const [appRejectId,       setAppRejectId]        = useState<string|null>(null);
  const [appRejectReason,   setAppRejectReason]   = useState("");
  const [appApproveComment, setAppApproveComment] = useState("");
  const [approvals,         setApprovals]         = useState(APPROVAL_ITEMS_DEFAULT);
  const [approvalDetailId,  setApprovalDetailId]  = useState<string|null>(null);
  const [approvalView,      setApprovalView]      = useState("Pending");
  const [approvalType,      setApprovalType]      = useState("All");

  const confirmApproveItem = () => {
    if (!appApproveId) return;
    setApprovals(a => a.map(x => x.id === appApproveId ? { ...x, status:"Approved" } : x));
    setAppApproveId(null); setAppApproveComment("");
  };
  const confirmRejectItem = () => {
    if (!appRejectId || !appRejectReason.trim()) return;
    setApprovals(a => a.map(x => x.id === appRejectId ? { ...x, status:"Rejected" } : x));
    setAppRejectId(null); setAppRejectReason("");
  };

  // Approval comments
  const [approvalComments,  setApprovalComments]  = useState<Record<string, AppComment[]>>({
    "A1": [{ id:"appc1", parentId:null, author:"David Chen", isOwn:false, text:"Please confirm leave balance is sufficient before approving.", timestamp:Date.now()-7200000, edited:false }],
    "A4": [{ id:"appc2", parentId:null, author:"Marcus Johnson", isOwn:false, text:"I was working from client site all day and forgot to check out.", timestamp:Date.now()-3600000, edited:false }],
  });
  const [approvalDraft,    setApprovalDraft]    = useState("");
  const [editCommentId,    setEditCommentId]    = useState<string|null>(null);
  const [editCommentText,  setEditCommentText]  = useState("");
  const [replyToId,        setReplyToId]        = useState<string|null>(null);
  const [replyText,        setReplyText]        = useState("");

  const addApprovalComment = (aid: string) => {
    if (!approvalDraft.trim()) return;
    setApprovalComments(ac => ({ ...ac, [aid]: [...(ac[aid]||[]), { id:`appc${Date.now()}`, parentId:null, author:"Alex Admin", isOwn:true, text:approvalDraft, timestamp:Date.now(), edited:false }] }));
    setApprovalDraft("");
  };
  const addReply = (aid: string, parentId: string) => {
    if (!replyText.trim()) return;
    setApprovalComments(ac => ({ ...ac, [aid]: [...(ac[aid]||[]), { id:`appc${Date.now()}`, parentId, author:"Alex Admin", isOwn:true, text:replyText, timestamp:Date.now(), edited:false }] }));
    setReplyText(""); setReplyToId(null);
  };
  const saveEditComment = (aid: string, cid: string) => {
    if (!editCommentText.trim()) return;
    setApprovalComments(ac => ({ ...ac, [aid]: (ac[aid]||[]).map(c => c.id === cid ? { ...c, text:editCommentText, edited:true } : c) }));
    setEditCommentId(null); setEditCommentText("");
  };
  const deleteComment = (aid: string, cid: string) => {
    setApprovalComments(ac => ({ ...ac, [aid]: (ac[aid]||[]).filter(c => c.id !== cid && c.parentId !== cid) }));
  };

  // Tasks
  const TASK_VIEWS = ["Assigned","In Progress","Completed","Overdue","Archived"];
  const [myTasks, setMyTasks] = useState([
    { id:"TASK-001", title:"Review Q2 attendance report",        priority:"High",   status:"Assigned",    reporter:"David Chen",    assignee:"Alex Admin", created:"Jun 28", updated:"Jul 1",  due:"Jul 1",  done:false, overdue:true  },
    { id:"TASK-002", title:"Update leave policy draft",          priority:"High",   status:"In Progress", reporter:"Jennifer Walsh", assignee:"Alex Admin", created:"Jun 29", updated:"Jul 1",  due:"Jul 3",  done:false, overdue:false },
    { id:"TASK-003", title:"Onboard 3 new engineering hires",    priority:"Medium", status:"Assigned",    reporter:"David Chen",    assignee:"Alex Admin", created:"Jul 1",  updated:"Jul 1",  due:"Jul 8",  done:false, overdue:false },
    { id:"TASK-004", title:"Reply to HR audit request",          priority:"Low",    status:"Overdue",     reporter:"Jennifer Walsh", assignee:"Alex Admin", created:"Jun 20", updated:"Jun 30", due:"Jun 30", done:false, overdue:true  },
    { id:"TASK-005", title:"Configure geo-fence – Austin office",priority:"Low",    status:"Assigned",    reporter:"Carlos Rivera",  assignee:"Alex Admin", created:"Jul 1",  updated:"Jul 1",  due:"Jul 15", done:false, overdue:false },
    { id:"TASK-006", title:"Schedule performance reviews",       priority:"Medium", status:"Completed",   reporter:"Aisha Thompson", assignee:"Alex Admin", created:"Jun 25", updated:"Jul 1",  due:"Jul 20", done:true,  overdue:false },
    { id:"TASK-007", title:"Review updated department org chart",priority:"Medium", status:"Assigned",    reporter:"David Chen",    assignee:"Alex Admin", created:"Jun 26", updated:"Jun 26", due:"Jul 5",  done:false, overdue:false },
  ]);
  const [taskView,        setTaskView]        = useState("Assigned");
  const [activeTaskId,    setActiveTaskId]    = useState<string|null>(null);
  const [taskSearch,      setTaskSearch]      = useState("");
  const [taskSortField,   setTaskSortField]   = useState("due");
  const [taskSortDir,     setTaskSortDir]     = useState<"asc"|"desc">("asc");
  const [selectedTasks,   setSelectedTasks]   = useState<string[]>([]);
  const [taskPriFilter,   setTaskPriFilter]   = useState("All");
  const [showTaskFilters, setShowTaskFilters] = useState(false);
  const [showNewTask,     setShowNewTask]     = useState(false);
  const [newTaskTitle,    setNewTaskTitle]    = useState("");
  const [taskComment,     setTaskComment]     = useState("");
  const [taskComments,    setTaskComments]    = useState<Record<string, { id:string; author:string; text:string; time:string }[]>>({
    "TASK-001": [{ id:"c1", author:"David Chen",    text:"Please include WFH data breakdown in the report.", time:"Jun 30, 9:15 AM" }],
    "TASK-002": [{ id:"c2", author:"Jennifer Walsh", text:"Make sure the new carry-forward rules are reflected.", time:"Jul 1, 10:02 AM" }],
  });
  const [taskChecklists, setTaskChecklists] = useState<Record<string, { id:string; label:string; done:boolean }[]>>({
    "TASK-001": [
      { id:"cl1", label:"Export raw attendance data",       done:true  },
      { id:"cl2", label:"Analyze late arrivals",            done:true  },
      { id:"cl3", label:"Generate department breakdown",    done:false },
      { id:"cl4", label:"Review with manager",              done:false },
    ],
    "TASK-002": [
      { id:"cl5", label:"Review current policy",           done:true  },
      { id:"cl6", label:"Draft changes",                   done:false },
      { id:"cl7", label:"Legal review",                    done:false },
    ],
  });

  const getFilteredTasks = () => {
    let ts = myTasks.filter(t => {
      if (taskView === "Assigned")    return t.status === "Assigned" && !t.done;
      if (taskView === "In Progress") return t.status === "In Progress";
      if (taskView === "Completed")   return t.done;
      if (taskView === "Overdue")     return t.overdue && !t.done;
      return false;
    });
    if (taskSearch)            ts = ts.filter(t => t.title.toLowerCase().includes(taskSearch.toLowerCase()) || t.id.toLowerCase().includes(taskSearch.toLowerCase()));
    if (taskPriFilter !== "All") ts = ts.filter(t => t.priority === taskPriFilter);
    return [...ts].sort((a, b) => {
      const va = (a as any)[taskSortField] || "";
      const vb = (b as any)[taskSortField] || "";
      return taskSortDir === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
    });
  };
  const filteredTasks = getFilteredTasks();
  const activeTask    = myTasks.find(t => t.id === activeTaskId) || null;

  const toggleTask = (id: string) => setMyTasks(ts => ts.map(t => t.id === id ? { ...t, done:!t.done, status:t.done?"Assigned":"Completed" } : t));
  const addTaskComment = (tid: string) => {
    if (!taskComment.trim()) return;
    setTaskComments(tc => ({ ...tc, [tid]: [...(tc[tid]||[]), { id:`c${Date.now()}`, author:"Alex Admin", text:taskComment, time:"Just now" }] }));
    setTaskComment("");
  };
  const toggleChecklist = (tid: string, iid: string) => setTaskChecklists(tl => ({ ...tl, [tid]: (tl[tid]||[]).map(i => i.id === iid ? { ...i, done:!i.done } : i) }));
  const createTask = () => {
    if (!newTaskTitle.trim()) return;
    const id = `TASK-${String(myTasks.length + 1).padStart(3,"0")}`;
    setMyTasks(ts => [...ts, { id, title:newTaskTitle, priority:"Medium", status:"Assigned", reporter:"Alex Admin", assignee:"Alex Admin", created:"Jul 1", updated:"Jul 1", due:"Jul 10", done:false, overdue:false }]);
    setNewTaskTitle(""); setShowNewTask(false);
  };
  const toggleSelectTask = (id: string) => setSelectedTasks(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  const selectAllTasks   = () => setSelectedTasks(s => s.length === filteredTasks.length ? [] : filteredTasks.map(t => t.id));

  // Attendance — section switcher + sub-views
  const [attSection,     setAttSection]     = useState<"My Space"|"My Team">("My Space");
  const [attViewInternal, setAttViewInternal] = useState<"summary"|"timeline"|"calendar"|"issues">(attViewProp || "summary");
  const [attPeriodInternal, setAttPeriodInternal] = useState<"Weekly"|"Monthly"|"Yearly">(attPeriodProp || "Monthly");

  const attView = attViewProp !== undefined ? attViewProp : attViewInternal;
  const attPeriod = attPeriodProp !== undefined ? attPeriodProp : attPeriodInternal;

  const setAttView = (v: any) => {
    setAttViewInternal(v);
    if (setAttViewProp) setAttViewProp(v);
  };

  const setAttPeriod = (p: any) => {
    setAttPeriodInternal(p);
    if (setAttPeriodProp) setAttPeriodProp(p);
  };

  useEffect(() => {
    if (attViewProp !== undefined) setAttViewInternal(attViewProp);
  }, [attViewProp]);

  useEffect(() => {
    if (attPeriodProp !== undefined) setAttPeriodInternal(attPeriodProp);
  }, [attPeriodProp]);

  const [attTeamView,    setAttTeamView]    = useState<"overview"|"exceptions"|"analytics">("overview");
  const [teamEmpSearch,  setTeamEmpSearch]  = useState("");
  const [teamDeptFilter, setTeamDeptFilter] = useState("All");
  const [teamStatusFilter,setTeamStatusFilter]=useState("All");
  const [teamShiftFilter,setTeamShiftFilter]= useState("All");
  const [teamEmpDrawer,  setTeamEmpDrawer]  = useState<string|null>(null);
  const [attCalView,     setAttCalView]     = useState<"month"|"week">("month");
  const [attCalFilters,  setAttCalFilters]  = useState([...ATT_CAL_FILTERS_DEFAULT]);
  const toggleAttCalFilter = (f: string) => setAttCalFilters(fs => fs.includes(f) ? fs.filter(x => x !== f) : [...fs, f]);
  const [attAnalChart,   setAttAnalChart]   = useState("Daily Attendance");
  const [attExcStatus,   setAttExcStatus]   = useState("All");
  const [attExcType,     setAttExcType]     = useState("All");
  const [attExcDrawer,   setAttExcDrawer]   = useState<string|null>(null);
  const [attIssues,      setAttIssues]      = useState(ATT_ISSUES_DEFAULT);
  const [showNewIssue,   setShowNewIssue]   = useState(false);
  const [newIssueType,   setNewIssueType]   = useState("Missing Check-in");
  const [newIssueDate,   setNewIssueDate]   = useState("");
  const [newIssueReason, setNewIssueReason] = useState("");
  const [newIssueCmt,    setNewIssueCmt]    = useState("");
  const [showAttFilter,  setShowAttFilter]  = useState(false);
  const [showAttExport,  setShowAttExport]  = useState(false);
  const [attFMonth,      setAttFMonth]      = useState("All");
  const [attFQuarter,    setAttFQuarter]    = useState("All");
  const [attFDept,       setAttFDept]       = useState("All");
  const [attFShift,      setAttFShift]      = useState("All");
  const [issueRejectId,  setIssueRejectId]  = useState<string|null>(null);
  const [issueRejectNote,setIssueRejectNote]= useState("");
  const confirmIssueReject = () => {
    if (!issueRejectId || !issueRejectNote.trim()) return;
    setAttIssues(is => is.map(x => x.id===issueRejectId ? {...x,status:"Rejected",rejectNote:issueRejectNote} : x));
    setIssueRejectId(null); setIssueRejectNote("");
  };
  const confirmIssueApprove = (id: string) => setAttIssues(is => is.map(x => x.id===id ? {...x,status:"Approved"} : x));

  // Leave
  const [leaveViewInternal, setLeaveViewInternal] = useState(leaveViewProp || "Balance");
  const leaveView = leaveViewProp !== undefined ? leaveViewProp : leaveViewInternal;
  const setLeaveView = (v: any) => {
    setLeaveViewInternal(v);
    if (setLeaveViewProp) setLeaveViewProp(v);
  };
  useEffect(() => {
    if (leaveViewProp !== undefined) setLeaveViewInternal(leaveViewProp);
  }, [leaveViewProp]);
  const [showApplyLeave,    setShowApplyLeave]    = useState(false);
  const [myLeaveHist,       setMyLeaveHist]       = useState(MY_LEAVE_RICH);
  const [leaveDetailId2,    setLeaveDetailId2]    = useState<string|null>(null);
  const [leaveRejectModal,  setLeaveRejectModal]  = useState<string|null>(null);
  const [leaveRejectReason, setLeaveRejectReason] = useState("");
  const [leaveRejectCmt,    setLeaveRejectCmt]    = useState("");
  const [showLeaveExport,   setShowLeaveExport]   = useState(false);
  const [leaveDeptFilter,   setLeaveDeptFilter]   = useState("All");
  const [leaveTypeFilter,   setLeaveTypeFilter]   = useState("All");
  const confirmLeaveReject = () => {
    if (!leaveRejectModal || !leaveRejectReason.trim()) return;
    setMyLeaveHist(h => h.map(x => x.id===leaveRejectModal ? {...x,status:"Rejected",rejectReason:leaveRejectReason} : x));
    setLeaveRejectModal(null); setLeaveRejectReason(""); setLeaveRejectCmt("");
  };
  const confirmLeaveApprove = (id: string) => setMyLeaveHist(h => h.map(x => x.id===id ? {...x,status:"Approved"} : x));

  // Global Calendar
  const [globalCalFilters, setGlobalCalFilters] = useState(GLOBAL_CAL_FILTERS_DEF.map(f => f.label));
  const [globalCalView,    setGlobalCalView]    = useState<"month"|"week"|"list">("month");
  const toggleGlobalFilter = (f: string) => setGlobalCalFilters(fs => fs.includes(f) ? fs.filter(x => x !== f) : [...fs, f]);

  // Announcements
  const [annFilter,    setAnnFilter]    = useState("All");
  const [annDetailId,  setAnnDetailId]  = useState<string|null>(null);
  const [annReadIds,   setAnnReadIds]   = useState<string[]>(["ANN3"]);
  const [annPinnedIds, setAnnPinnedIds] = useState<string[]>(["ANN1"]);
  const [annBookmarks, setAnnBookmarks] = useState<string[]>([]);
  const [annComment,   setAnnComment]   = useState("");
  const [annReactions, setAnnReactions] = useState<Record<string, string[]>>({
    "ANN1": ["👍","👍","❤️","🎉"],
    "ANN2": ["👍","😮"],
    "ANN3": ["👍","👍","👍","❤️","❤️"],
  });

  const [annView,          setAnnView]          = useState<"widget"|"list">("widget");
  const [empStatusFilter,  setEmpStatusFilter]  = useState<string|null>(null);

  // Derived
  const pending          = reqs.filter(r => r.status === "Pending");
  const pendingApprovals = approvals.filter(a => a.status === "Pending");
  const overdueTasks     = myTasks.filter(t => t.overdue && !t.done);
  const completedTasks   = myTasks.filter(t => t.done);
  const unreadCount      = ANNOUNCEMENTS_DATA.filter(a => !annReadIds.includes(a.id)).length;

  const filteredApprovals = approvals.filter(a =>
    (approvalView === "Pending"  ? a.status === "Pending"  :
     approvalView === "Approved" ? a.status === "Approved" : a.status === "Rejected") &&
    (approvalType === "All" || a.type === approvalType)
  );

  const filteredAnn = ANNOUNCEMENTS_DATA.filter(a => {
    if (annFilter === "Pinned") return annPinnedIds.includes(a.id);
    if (annFilter === "Unread") return !annReadIds.includes(a.id);
    return true;
  });

  const annDetail = ANNOUNCEMENTS_DATA.find(a => a.id === annDetailId) || null;

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-full">

      <div className="flex-1 overflow-auto">

        {/* ════════════════════ DASHBOARD ════════════════════ */}
        {tab === "Dashboard" && annView === "widget" && !annDetailId && (
          <div className="px-4 py-3.5 space-y-3 max-w-5xl mx-auto">

            {/* Greeting */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-gray-900">Good morning, Alex 👋</h2>
                <p className="text-xs text-gray-500 mt-0.5">Here's what needs your attention today.</p>
              </div>
              <span className="text-xs text-gray-400 font-mono bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-200">Tue, Jul 1, 2024</span>
            </div>

            {/* Employee Status Quick Widgets */}
            <div className="grid grid-cols-5 gap-2">
              {([
                {label:"Present",  count:612, color:"#22C55E", bg:"#F0FDF4", border:"border-green-100"},
                {label:"WFH",      count:45,  color:"#3B82F6", bg:"#EFF6FF", border:"border-blue-100"},
                {label:"Leave",    count:22,  color:"#8B5CF6", bg:"#F5F3FF", border:"border-purple-100"},
                {label:"Late",     count:12,  color:"#F59E0B", bg:"#FFFBEB", border:"border-amber-100"},
                {label:"Offline",  count:156, color:"#9CA3AF", bg:"#F9FAFB", border:"border-gray-100"},
              ] as {label:string;count:number;color:string;bg:string;border:string}[]).map(s=>(
                <button key={s.label} onClick={()=>setEmpStatusFilter(s.label)}
                  className={`bg-white border ${s.border} rounded-xl p-2.5 text-left hover:shadow-sm transition-all group`}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">{s.label}</span>
                    <div className="w-1.5 h-1.5 rounded-full" style={{backgroundColor:s.color}}/>
                  </div>
                  <div className="text-lg font-bold text-gray-900 group-hover:text-[#5C5CFF] transition-colors">{s.count}</div>
                  <div className="text-[9px] text-gray-400 mt-0.5">Click to view →</div>
                </button>
              ))}
            </div>

            {/* Today's Attendance status */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
                <h3 className="text-xs font-semibold text-gray-800">Today's Attendance</h3>
                <button onClick={() => setTab("Attendance")} className="text-xs text-[#5C5CFF] hover:underline font-medium">View details →</button>
              </div>
              <div className="px-4 py-2.5 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className={cn("w-2 h-2 rounded-full flex-shrink-0", checkedIn ? "bg-green-400 shadow-[0_0_0_3px_rgba(34,197,94,0.15)] animate-pulse" : "bg-gray-300")} />
                  <div>
                    <div className="text-xs font-semibold text-gray-900">{checkedIn ? "Working · General Shift" : "Not Checked In"}</div>
                    <div className="text-[10px] text-gray-400">Mon–Fri · 09:00 – 18:00</div>
                  </div>
                </div>
                {checkedIn && <>
                  <div className="h-8 w-px bg-gray-100" />
                  <div className="text-xs"><span className="text-gray-400">Check-in</span><div className="font-mono font-semibold text-gray-800 mt-0.5">09:02 AM</div></div>
                  <div className="h-8 w-px bg-gray-100" />
                  <div className="text-xs"><span className="text-gray-400">Working</span><div className="font-mono font-semibold text-[#5C5CFF] mt-0.5">5h 32m</div></div>
                  <div className="h-8 w-px bg-gray-100" />
                  <div className="text-xs"><span className="text-gray-400">Expected out</span><div className="font-mono font-semibold text-gray-800 mt-0.5">06:00 PM</div></div>
                  <div className="h-8 w-px bg-gray-100" />
                  <div className="text-xs cursor-pointer hover:opacity-85 transition-opacity select-none text-left" onClick={() => setShowLocationModal(true)}>
                    <span className="text-gray-400">Location</span>
                    <div className="font-semibold text-gray-800 mt-0.5 flex items-center gap-0.5">
                      <MapPin size={12} className="text-red-500 fill-red-100" />
                      New York HQ
                    </div>
                    <div className={cn("text-[9px] font-semibold leading-tight", isInsideGeofence ? "text-green-600" : "text-red-500")}>
                      {isInsideGeofence ? "Inside geo-fence" : "Outside geo-fence"}
                    </div>
                  </div>
                </>}
                <div className="ml-auto flex items-center gap-2">
                  {!checkedIn
                    ? <button onClick={() => setCheckedIn(true)}  className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#5C5CFF] text-white text-xs font-semibold rounded-lg hover:bg-[#4A4AE0]"><UserCheck size={13} />Check In</button>
                    : <button onClick={() => setCheckedIn(false)} className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-red-50 text-red-600 border border-red-200 text-xs font-semibold rounded-lg hover:bg-red-100"><UserX size={13} />Check Out</button>
                  }
                </div>
              </div>
            </div>

            {/* ── Monthly Attendance Graph — Primary, Full Width ── */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
                <div>
                  <h3 className="text-xs font-semibold text-gray-800">Monthly Attendance</h3>
                  <p className="text-[10px] text-gray-400 mt-0.5">July 2024 · Daily hours worked</p>
                </div>
                <div className="flex items-center gap-3 text-[9px] text-gray-400">
                  {([["#5C5CFF","≥9h"],["#A5B4FC","<9h"],["#93C5FD","WFH"],["#FCD34D","Late"],["#C4B5FD","Leave"],["#E5E7EB","Off"]] as [string,string][]).map(([c,l]) => (
                    <div key={l} className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm" style={{ backgroundColor:c }} />{l}</div>
                  ))}
                </div>
              </div>
              <div className="px-4 pt-3 pb-2">
                <ResponsiveContainer width="100%" height={150}>
                  <RBarChart data={MONTHLY_ATT_DATA} barSize={12} margin={{ top:4, right:4, left:-20, bottom:0 }}>
                    <CartesianGrid key="cg-ov" strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis key="xaxis-ov" dataKey="day" tick={{ fontSize:9, fill:"#9CA3AF" }} axisLine={false} tickLine={false} />
                    <YAxis key="yaxis-ov" domain={[0,12]} tick={{ fontSize:9, fill:"#9CA3AF" }} axisLine={false} tickLine={false} tickFormatter={(v:number) => v===0?"":v+"h"} />
                    <Tooltip key="tip-ov" formatter={(v:number) => [`${v}h`,"Hours"]} labelFormatter={(l) => `Jul ${l}`} contentStyle={{ fontSize:11, borderRadius:8, border:"1px solid #e5e7eb" }} />
                    <Bar key="bar-ov" dataKey="h" radius={[2,2,0,0]}>
                      {MONTHLY_ATT_DATA.map((d,i) => <Cell key={`ov-${i}`} fill={barFill(d.s, d.h)} />)}
                    </Bar>
                  </RBarChart>
                </ResponsiveContainer>
                <div className="flex items-center justify-between mt-1.5 pt-1.5 border-t border-gray-50 text-xs">
                  <div className="flex items-center gap-4 text-gray-500">
                    <span>Present: <strong className="text-gray-800">18d</strong></span>
                    <span>WFH: <strong className="text-blue-500">2d</strong></span>
                    <span>Leave: <strong className="text-purple-500">2d</strong></span>
                    <span>Late: <strong className="text-amber-500">2d</strong></span>
                    <span>Total: <strong className="text-gray-800">162h</strong></span>
                  </div>
                  <button onClick={() => setTab("Attendance")} className="text-xs text-[#5C5CFF] hover:underline font-medium">Full report →</button>
                </div>
              </div>
            </div>

            {/* Pending Approvals quick-view */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-semibold text-gray-800">Pending Approvals</h3>
                  {pending.length > 0 && <span className="min-w-[18px] h-4.5 px-1.5 rounded-full bg-[#5C5CFF] text-white text-[9px] font-bold flex items-center justify-center">{pending.length}</span>}
                </div>
                <button onClick={() => setTab("Approvals")} className="text-xs text-[#5C5CFF] hover:underline font-medium">View all →</button>
              </div>
              <div className="grid grid-cols-4 divide-x divide-gray-100 border-b border-gray-100 bg-gray-50/50">
                {[{label:"Leave",count:pending.length,color:"#F59E0B"},{label:"Attendance",count:5,color:"#5C5CFF"},{label:"Shift",count:1,color:"#22C55E"},{label:"Department",count:1,color:"#8B5CF6"}].map(t => (
                  <button key={t.label} onClick={() => { setTab("Approvals"); setApprovalType(t.label); }}
                    className="py-2 text-center hover:bg-gray-50 transition-colors">
                    <div className="text-base font-bold" style={{ color:t.color }}>{t.count}</div>
                    <div className="text-[10px] text-gray-400 font-medium">{t.label}</div>
                  </button>
                ))}
              </div>
              <div className="divide-y divide-gray-100">
                {pending.length === 0 && <div className="py-5 text-center"><CheckCircle size={16} className="text-green-400 mx-auto mb-1" /><p className="text-xs text-gray-400">All caught up</p></div>}
                {pending.slice(0,4).map(r => (
                  <div key={r.id} className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50">
                    <Avt initials={r.employee.split(" ").map((n:string) => n[0]).join("")} color={EMP_COLORS[parseInt(r.id.slice(-1)) % EMP_COLORS.length]} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-800 truncate">{r.employee}</p>
                      <p className="text-[10px] text-gray-500">{r.type} · {r.days}d · {fmtDate(r.from)}</p>
                    </div>
                    <div className="flex gap-1.5">
                      <button onClick={() => setApproveModalId(r.id)} className="px-2.5 py-1 bg-green-50 text-green-700 rounded-lg text-xs font-semibold hover:bg-green-100 flex items-center gap-1"><CheckCircle size={10} />Approve</button>
                      <button onClick={() => setRejectModalId(r.id)}  className="px-2.5 py-1 bg-red-50 text-red-600 rounded-lg text-xs font-semibold hover:bg-red-100 flex items-center gap-1"><X size={10} />Reject</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* My Tasks quick-view */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-semibold text-gray-800">My Tasks</h3>
                  <div className="flex items-center gap-1.5 text-[9px]">
                    {overdueTasks.length > 0   && <span className="bg-red-50 text-red-600 px-2 py-0.5 rounded-full font-semibold">{overdueTasks.length} overdue</span>}
                    {completedTasks.length > 0 && <span className="bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-semibold">{completedTasks.length} done</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setTab("Tasks")} className="text-xs text-[#5C5CFF] hover:underline font-medium">View all →</button>
                  <button onClick={() => setShowNewTask(v => !v)} className="inline-flex items-center gap-1 px-2 py-1 bg-[#5C5CFF] text-white text-xs font-medium rounded-lg hover:bg-[#4A4AE0]"><Plus size={11} />Create</button>
                </div>
              </div>
              {showNewTask && (
                <div className="px-4 py-2 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
                  <input autoFocus value={newTaskTitle} onChange={e => setNewTaskTitle(e.target.value)} onKeyDown={e => e.key === "Enter" && createTask()} placeholder="Task title… (Enter to save)" className="flex-1 px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C5CFF] bg-white" />
                  <button onClick={createTask} className="px-3 py-1.5 bg-[#5C5CFF] text-white text-xs font-medium rounded-lg">Save</button>
                  <button onClick={() => { setShowNewTask(false); setNewTaskTitle(""); }} className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-200"><X size={14} /></button>
                </div>
              )}
              <div className="divide-y divide-gray-100">
                {myTasks.slice(0,6).map(t => (
                  <div key={t.id} onClick={() => { setTab("Tasks"); setActiveTaskId(t.id); }} className={cn("flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer", t.done && "opacity-50")}>
                    <input type="checkbox" checked={t.done} onChange={e => { e.stopPropagation(); toggleTask(t.id); }} onClick={e => e.stopPropagation()} className="rounded border-gray-300 accent-[#5C5CFF] flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className={cn("text-xs text-gray-800", t.done && "line-through text-gray-400")}>{t.title}</span>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[9px] font-mono text-gray-300">{t.id}</span>
                        {t.overdue && !t.done && <span className="text-[9px] text-red-500 font-semibold">Overdue</span>}
                      </div>
                    </div>
                    <span className={cn("text-[10px] font-medium px-2 py-0.5 rounded-full", t.priority==="High"?"bg-red-50 text-red-600":t.priority==="Medium"?"bg-amber-50 text-amber-600":"bg-gray-100 text-gray-500")}>{t.priority}</span>
                    <span className="text-[10px] text-gray-400 font-mono">{t.due}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100"><h3 className="text-sm font-semibold text-gray-800">Recent Activities</h3></div>
              <div className="divide-y divide-gray-100">
                {[
                  { icon:UserPlus,      color:"#5C5CFF", text:"Yuki Tanaka joined the Engineering team",                       time:"9:00 AM"  },
                  { icon:CalendarDays,  color:"#F59E0B", text:"Sarah Mitchell applied for 5 days annual leave",               time:"8:32 AM"  },
                  { icon:CheckCircle,   color:"#22C55E", text:"Marcus Johnson – attendance regularization approved",           time:"Yesterday" },
                  { icon:AlertCircle,   color:"#EF4444", text:"Mei Lin Chen has a missing check-out — requires review",       time:"Yesterday" },
                  { icon:GitBranch,     color:"#8B5CF6", text:"Operations department head updated by Jennifer Walsh",         time:"Yesterday" },
                  { icon:Shield,        color:"#06B6D4", text:"Manager role assigned to Marcus Johnson",                      time:"Jun 30"   },
                ].map((a,i) => (
                  <div key={i} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 cursor-pointer">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor:a.color+"18" }}><a.icon size={13} style={{ color:a.color }} /></div>
                    <p className="text-xs text-gray-700 flex-1 leading-snug">{a.text}</p>
                    <span className="text-[10px] text-gray-400">{a.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Announcements Widget ── */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-gray-800">Announcements</h3>
                  {unreadCount > 0 && <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-[#5C5CFF] text-white text-[9px] font-bold flex items-center justify-center">{unreadCount}</span>}
                </div>
                <button onClick={()=>setAnnView("list")} className="text-xs text-[#5C5CFF] hover:underline">View all →</button>
              </div>
              {/* Pinned */}
              {ANNOUNCEMENTS_DATA.filter(a=>annPinnedIds.includes(a.id)).slice(0,1).map(a=>(
                <div key={a.id} onClick={()=>{setAnnDetailId(a.id);setAnnReadIds(r=>[...new Set([...r,a.id])]);}}
                  className="flex items-start gap-3 px-5 py-3 bg-amber-50/60 border-b border-amber-100 cursor-pointer hover:bg-amber-50 transition-colors">
                  <Pin size={12} className="text-amber-500 mt-0.5 flex-shrink-0"/>
                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] font-semibold bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded uppercase mr-2">Pinned</span>
                    <span className="text-xs font-semibold text-gray-900">{a.title}</span>
                    <p className="text-[10px] text-gray-500 truncate mt-0.5">{a.body.split("\n")[0]}</p>
                  </div>
                  <span className="text-[10px] text-gray-400 flex-shrink-0">{a.timeAgo}</span>
                </div>
              ))}
              {/* Latest */}
              <div className="divide-y divide-gray-100">
                {ANNOUNCEMENTS_DATA.filter(a=>!annPinnedIds.includes(a.id)).slice(0,3).map(a=>(
                  <div key={a.id} onClick={()=>{setAnnDetailId(a.id);setAnnReadIds(r=>[...new Set([...r,a.id])]);}}
                    className={cn("flex items-start gap-3 px-5 py-3 cursor-pointer hover:bg-gray-50 transition-colors",!annReadIds.includes(a.id)&&"bg-[#EEF2FF]/20")}>
                    <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-white mt-0.5",a.priority==="High"?"bg-[#5C5CFF]":"bg-gray-400")}>
                      {a.category==="Event"?<CalendarDays size={12}/>:a.category==="Policy"?<FileText size={12}/>:<Megaphone size={12}/>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        {!annReadIds.includes(a.id)&&<span className="w-1.5 h-1.5 bg-[#5C5CFF] rounded-full flex-shrink-0"/>}
                        <span className="text-xs font-semibold text-gray-900 truncate">{a.title}</span>
                      </div>
                      <p className="text-[10px] text-gray-500 truncate">{a.body.split("\n")[0]}</p>
                      <p className="text-[9px] text-gray-400 mt-0.5">{a.author} · {a.timeAgo}</p>
                    </div>
                    <span className="text-[10px] text-gray-400 flex-shrink-0">{a.category}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ════════════════════ ANNOUNCEMENTS LIST (from Dashboard) ════════════════════ */}
        {tab === "Dashboard" && annView === "list" && !annDetailId && (
          <div className="flex flex-col h-full">
            <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-3 flex-shrink-0">
              <button onClick={()=>setAnnView("widget")} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700"><ChevronLeft size={14}/>Dashboard</button>
              <span className="text-sm font-semibold text-gray-800 ml-1">Announcements</span>
              <div className="flex gap-1 ml-4">
                {["All","Pinned","Unread","Archived"].map(f => (
                  <button key={f} onClick={() => setAnnFilter(f)} className={cn("px-3 py-1.5 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors", annFilter===f?"bg-[#EEF2FF] text-[#5C5CFF]":"text-gray-600 hover:bg-gray-100")}>
                    {f}{f==="Unread"&&unreadCount>0&&<span className="w-4 h-4 bg-[#5C5CFF] text-white text-[9px] font-bold rounded-full flex items-center justify-center">{unreadCount}</span>}
                  </button>
                ))}
              </div>
              <div className="ml-auto"><div className="relative"><Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"/><input placeholder="Search…" className="pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#5C5CFF] w-44"/></div></div>
            </div>
            <div className="flex-1 overflow-auto">
              <div className="max-w-3xl mx-auto px-6 py-5 space-y-5">
                {annFilter === "All" && (
                  <div>
                    <div className="flex items-center gap-2 mb-3"><Pin size={12} className="text-amber-500"/><p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Pinned</p></div>
                    {ANNOUNCEMENTS_DATA.filter(a=>annPinnedIds.includes(a.id)).map(a=>(
                      <div key={a.id} onClick={()=>{setAnnDetailId(a.id);setAnnReadIds(r=>[...new Set([...r,a.id])]);}}
                        className="bg-white border-2 border-amber-200 rounded-xl p-4 mb-3 cursor-pointer hover:border-amber-300 hover:shadow-sm transition-all">
                        <div className="flex items-start gap-3">
                          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-white",a.priority==="High"?"bg-[#5C5CFF]":"bg-amber-400")}>
                            {a.category==="Event"?<CalendarDays size={16}/>:a.category==="Policy"?<FileText size={16}/>:<Megaphone size={16}/>}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1"><span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">{a.category}</span>{!annReadIds.includes(a.id)&&<span className="w-2 h-2 bg-[#5C5CFF] rounded-full"/>}<Pin size={10} className="text-amber-500 ml-auto"/></div>
                            <h3 className="text-sm font-semibold text-gray-900 mb-1">{a.title}</h3>
                            <p className="text-xs text-gray-500 line-clamp-2">{a.body.split("\n")[0]}</p>
                            <div className="flex items-center gap-3 mt-2 text-[10px] text-gray-400"><Avt initials={a.author.split(" ").map(n=>n[0]).join("")} color="#5C5CFF" size="xs"/><span>{a.author}</span><span>·</span><span>{a.timeAgo}</span><span className="ml-auto">{a.readCount} reads</span></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div>
                  {annFilter==="All"&&<div className="flex items-center gap-2 mb-3"><Bell size={12} className="text-gray-400"/><p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Recent Announcements</p></div>}
                  <div className="space-y-2.5">
                    {filteredAnn.filter(a=>annFilter==="All"?!annPinnedIds.includes(a.id):true).map(a=>(
                      <div key={a.id} onClick={()=>{setAnnDetailId(a.id);setAnnReadIds(r=>[...new Set([...r,a.id])]);}}
                        className={cn("bg-white border rounded-xl p-4 cursor-pointer hover:border-[#5C5CFF]/30 hover:shadow-sm transition-all flex items-start gap-3",!annReadIds.includes(a.id)?"border-[#5C5CFF]/20 bg-[#EEF2FF]/20":"border-gray-200")}>
                        <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-white",a.priority==="High"?"bg-[#5C5CFF]":"bg-gray-400")}>
                          {a.category==="Event"?<CalendarDays size={14}/>:a.category==="Policy"?<FileText size={14}/>:a.category==="Team"?<Users size={14}/>:<Megaphone size={14}/>}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5"><span className="text-[10px] font-medium text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">{a.category}</span>{!annReadIds.includes(a.id)&&<span className="text-[10px] font-semibold text-[#5C5CFF] flex items-center gap-1"><span className="w-1.5 h-1.5 bg-[#5C5CFF] rounded-full"/>New</span>}</div>
                          <h3 className="text-sm font-semibold text-gray-900 mb-0.5">{a.title}</h3>
                          <p className="text-xs text-gray-500 line-clamp-1">{a.body.split("\n")[0]}</p>
                          <div className="flex items-center gap-2 mt-1.5 text-[10px] text-gray-400"><span>{a.author}</span><span>·</span><span>{a.timeAgo}</span><span className="ml-auto flex items-center gap-3"><span className="flex items-center gap-1"><Eye size={10}/>{a.readCount}</span><span className="flex items-center gap-1"><ThumbsUp size={10}/>{(annReactions[a.id]||[]).length}</span></span></div>
                        </div>
                      </div>
                    ))}
                    {filteredAnn.length===0&&<div className="py-12 text-center"><Bell size={24} className="text-gray-200 mx-auto mb-2"/><p className="text-sm text-gray-400">No {annFilter.toLowerCase()} announcements</p></div>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ════════════════════ ANNOUNCEMENT DETAIL (from Dashboard) ════════════════════ */}
        {tab === "Dashboard" && annDetailId && annDetail && (
          <div className="flex flex-col h-full">
            <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-3 flex-shrink-0">
              <button onClick={()=>{setAnnDetailId(null);setAnnView(annView==="list"?"list":"widget");}} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700"><ChevronLeft size={14}/>{annView==="list"?"Announcements":"Dashboard"}</button>
              <div className="ml-auto flex items-center gap-2">
                <button onClick={()=>setAnnPinnedIds(p=>p.includes(annDetail.id)?p.filter(x=>x!==annDetail.id):[...p,annDetail.id])} className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors",annPinnedIds.includes(annDetail.id)?"border-amber-300 bg-amber-50 text-amber-700":"border-gray-200 text-gray-500 hover:bg-gray-50")}><Pin size={12}/>{annPinnedIds.includes(annDetail.id)?"Pinned":"Pin"}</button>
                <button onClick={()=>setAnnBookmarks(b=>b.includes(annDetail.id)?b.filter(x=>x!==annDetail.id):[...b,annDetail.id])} className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors",annBookmarks.includes(annDetail.id)?"border-[#5C5CFF] bg-[#EEF2FF] text-[#5C5CFF]":"border-gray-200 text-gray-500 hover:bg-gray-50")}><Bookmark size={12}/>{annBookmarks.includes(annDetail.id)?"Saved":"Save"}</button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-500 hover:bg-gray-50"><Share2 size={12}/>Share</button>
              </div>
            </div>
            <div className="flex-1 overflow-auto">
              <div className="max-w-2xl mx-auto px-6 py-6 space-y-5">
                <div className={cn("h-28 rounded-2xl flex items-center justify-center",annDetail.priority==="High"?"bg-[#5C5CFF]":"bg-gradient-to-br from-amber-400 to-orange-500")}>
                  <div className="text-center">{annDetail.category==="Event"?<CalendarDays size={32} className="text-white/70 mx-auto mb-1"/>:annDetail.category==="Policy"?<FileText size={32} className="text-white/70 mx-auto mb-1"/>:<Megaphone size={32} className="text-white/70 mx-auto mb-1"/>}<span className="text-white/80 text-xs font-medium uppercase tracking-wider">{annDetail.category}</span></div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2"><span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full",annDetail.priority==="High"?"bg-red-100 text-red-600":"bg-amber-100 text-amber-600")}>{annDetail.priority} Priority</span><span className="text-[10px] text-gray-400">{annDetail.audience}</span></div>
                  <h1 className="text-xl font-semibold text-gray-900 mb-3">{annDetail.title}</h1>
                  <div className="flex items-center gap-3"><Avt initials={annDetail.author.split(" ").map(n=>n[0]).join("")} color="#5C5CFF" size="sm"/><div><p className="text-sm font-medium text-gray-800">{annDetail.author}</p><p className="text-xs text-gray-400">Published {annDetail.timeAgo} · {annDetail.readCount} reads</p></div></div>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-5">{annDetail.body.split("\n").map((line,i)=><p key={i} className={cn("text-sm text-gray-700 leading-relaxed",line.startsWith("•")?"ml-3 mt-1":line===""?"my-1.5":"mb-2",line.trim().endsWith(":")&&"font-semibold text-gray-900 mt-3")}>{line}</p>)}</div>
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <p className="text-xs font-semibold text-gray-700 mb-3">Reactions</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {["👍","❤️","🎉","😮","👏"].map(emoji=>{
                      const count=(annReactions[annDetail.id]||[]).filter(r=>r===emoji).length;
                      return <button key={emoji} onClick={()=>setAnnReactions(ar=>({...ar,[annDetail.id]:[...(ar[annDetail.id]||[]),emoji]}))} className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm hover:scale-105 transition-all",count>0?"border-[#5C5CFF]/30 bg-[#EEF2FF] text-[#5C5CFF]":"border-gray-200 hover:border-gray-300")}>{emoji}<span className="text-xs font-medium">{count||""}</span></button>;
                    })}
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <p className="text-xs font-semibold text-gray-700 mb-3">Comments</p>
                  <div className="space-y-3 mb-3">
                    {[{author:"Sarah Mitchell",text:"Thank you for sharing! Looking forward to the all-hands.",time:"2 hours ago",color:"#22C55E"},{author:"Marcus Johnson",text:"Can we get a recording link after the meeting?",time:"1 hour ago",color:"#F59E0B"}].map((c,i)=>(
                      <div key={i} className="flex gap-2.5"><Avt initials={c.author.split(" ").map(n=>n[0]).join("")} color={c.color} size="xs"/><div className="flex-1 bg-gray-50 rounded-lg p-2.5"><div className="flex items-center justify-between mb-1"><span className="text-xs font-semibold text-gray-800">{c.author}</span><span className="text-[10px] text-gray-400">{c.time}</span></div><p className="text-xs text-gray-700">{c.text}</p></div></div>
                    ))}
                  </div>
                  <div className="flex gap-2"><Avt initials="AA" color="#5C5CFF" size="xs"/><div className="flex-1 flex gap-1.5"><input value={annComment} onChange={e=>setAnnComment(e.target.value)} placeholder="Add a comment…" className="flex-1 px-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C5CFF] bg-gray-50"/><button onClick={()=>setAnnComment("")} className="px-2.5 py-1.5 bg-[#5C5CFF] text-white rounded-lg hover:bg-[#4A4AE0]"><Send size={12}/></button></div></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ════════════════════ ATTENDANCE ════════════════════ */}
        {tab === "Attendance" && (
          <div className="flex flex-col h-full">

            {/* ── Section switcher bar ── */}
            {!hideAttendanceHeader && (
              <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between flex-shrink-0">
                {/* Left Section */}
                <div className="flex items-center gap-4">
                  <div className="flex gap-1.5">
                    {(["summary","timeline","calendar","issues"] as const).map(v=>(
                      <button key={v} onClick={()=>setAttView(v)} className={cn("px-3 py-1.5 text-xs font-medium rounded-lg transition-colors",attView===v?"bg-[#EEF2FF] text-[#5C5CFF]":"text-gray-600 hover:bg-gray-100")}>
                        {v==="summary"?"Summary":v==="timeline"?"History":v==="calendar"?"Calendar":"Issues"}
                      </button>
                    ))}
                  </div>
                  {attView==="summary"&&(
                    <>
                      <div className="w-px h-4 bg-gray-200"/>
                      <div className="flex rounded-lg border border-gray-200 overflow-hidden p-0.5 bg-gray-50 gap-0.5">
                        {(["Weekly","Monthly","Yearly"] as const).map(p=>(
                          <button key={p} onClick={()=>setAttPeriod(p)} className={cn("px-2.5 py-1 text-xs font-medium rounded-md transition-colors",attPeriod===p?"bg-white text-gray-900 shadow-sm":"text-gray-500 hover:text-gray-700")}>{p}</button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              {/* Sub-tabs — My Team */}
              {attSection==="My Team" && (
                <div className="flex gap-1">
                  {(["overview","exceptions","analytics"] as const).map(v=>(
                    <button key={v} onClick={()=>setAttTeamView(v)} className={cn("px-3 py-1.5 text-xs font-medium rounded-lg capitalize transition-colors",attTeamView===v?"bg-[#EEF2FF] text-[#5C5CFF]":"text-gray-600 hover:bg-gray-100")}>
                      {v==="overview"?"Overview":v==="exceptions"?"Exceptions":"Analytics"}
                    </button>
                  ))}
                </div>
              )}
              {/* Right actions */}
              <div className="ml-auto flex items-center gap-2">
                {/* Filter — My Space only on Summary; always on My Team */}
                {(attSection==="My Team"||(attSection==="My Space"&&attView==="summary"))&&(
                  <div className="relative">
                    <button onClick={()=>{ setShowAttFilter(v=>!v); setShowAttExport(false); }} className={cn("flex items-center gap-1.5 px-2.5 py-1.5 text-xs border rounded-lg transition-colors",showAttFilter?"border-[#5C5CFF] bg-[#EEF2FF] text-[#5C5CFF]":"border-gray-200 text-gray-600 hover:bg-gray-50")}>
                      <Sliders size={12}/>Filters
                    </button>
                    {showAttFilter&&(
                      <div className="absolute top-full right-0 mt-1 w-72 bg-white border border-gray-200 rounded-xl shadow-xl z-40 p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-semibold text-gray-700">Filters</p>
                          <button onClick={()=>setShowAttFilter(false)}><X size={13} className="text-gray-400"/></button>
                        </div>
                        {attSection==="My Team"&&(
                          <div>
                            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Department</p>
                            <select value={teamDeptFilter} onChange={e=>setTeamDeptFilter(e.target.value)} className="w-full px-2.5 py-1.5 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-[#5C5CFF]">
                              {["All","Engineering","HR","Sales","Design","Finance","Operations"].map(d=><option key={d}>{d}</option>)}
                            </select>
                          </div>
                        )}
                        {attSection==="My Team"&&(
                          <div>
                            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Status</p>
                            <div className="flex flex-wrap gap-1">
                              {["All","Present","Late","WFH","Leave","Absent"].map(s=>(
                                <button key={s} onClick={()=>setTeamStatusFilter(s)} className={cn("px-2.5 py-1 text-[10px] font-medium border rounded-lg transition-colors",teamStatusFilter===s?"border-[#5C5CFF] bg-[#EEF2FF] text-[#5C5CFF]":"border-gray-200 text-gray-500 hover:border-gray-300")}>{s}</button>
                              ))}
                            </div>
                          </div>
                        )}
                        <div>
                          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Quarter</p>
                          <div className="flex gap-1">
                            {["All","Q1","Q2","Q3","Q4"].map(q=>(
                              <button key={q} onClick={()=>setAttFQuarter(q)} className={cn("flex-1 py-1 text-[10px] font-medium border rounded-lg transition-colors",attFQuarter===q?"border-[#5C5CFF] bg-[#EEF2FF] text-[#5C5CFF]":"border-gray-200 text-gray-500 hover:border-gray-300")}>{q}</button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Month</p>
                          <select value={attFMonth} onChange={e=>setAttFMonth(e.target.value)} className="w-full px-2.5 py-1.5 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-[#5C5CFF]">
                            {["All","January","February","March","April","May","June","July","August","September","October","November","December"].map(m=><option key={m}>{m}</option>)}
                          </select>
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Shift</p>
                          <select value={attFShift} onChange={e=>setAttFShift(e.target.value)} className="w-full px-2.5 py-1.5 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-[#5C5CFF]">
                            {["All","General (09:00–18:00)","Morning (06:00–15:00)","Evening (14:00–23:00)","Night (22:00–07:00)"].map(s=><option key={s}>{s}</option>)}
                          </select>
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Date Range</p>
                          <div className="flex gap-2">
                            <input type="date" className="flex-1 px-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#5C5CFF]"/>
                            <input type="date" className="flex-1 px-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#5C5CFF]"/>
                          </div>
                        </div>
                        <div className="pt-2 border-t border-gray-100 flex gap-2">
                          <button onClick={()=>{setAttFMonth("All");setAttFQuarter("All");setAttFDept("All");setAttFShift("All");setTeamDeptFilter("All");setTeamStatusFilter("All");setShowAttFilter(false);}} className="flex-1 px-3 py-1.5 text-xs border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">Reset</button>
                          <button onClick={()=>setShowAttFilter(false)} className="flex-1 px-3 py-1.5 text-xs bg-[#5C5CFF] text-white rounded-lg hover:bg-[#4A4AE0]">Apply</button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {/* Export */}
                <div className="relative">
                  <button onClick={()=>{ setShowAttExport(v=>!v); setShowAttFilter(false); }} className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
                    <Download size={12}/>Export
                  </button>
                  {showAttExport&&(
                    <div className="absolute top-full right-0 mt-1 w-40 bg-white border border-gray-200 rounded-xl shadow-lg z-40 py-1">
                      {["Excel (.xlsx)","CSV (.csv)","PDF Report"].map(fmt=>(
                        <button key={fmt} onClick={()=>setShowAttExport(false)} className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                          <Download size={10} className="text-gray-400"/>{fmt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {/* Check in/out — only in My Space */}
                {attSection==="My Space"&&(
                  !checkedIn
                    ? <button onClick={()=>setCheckedIn(true)} className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#5C5CFF] text-white text-xs font-semibold rounded-lg hover:bg-[#4A4AE0]"><UserCheck size={13}/>Check In</button>
                    : <button onClick={()=>setCheckedIn(false)} className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-red-50 text-red-600 border border-red-200 text-xs font-semibold rounded-lg hover:bg-red-100"><UserX size={13}/>Check Out</button>
                )}
              </div>
            </div>
          )}

            {/* ══════════════════════════════════════════════════════════
                MY SPACE
            ══════════════════════════════════════════════════════════ */}
            {attSection==="My Space" && (
            <div className="flex-1 overflow-auto p-5 space-y-4 max-w-4xl mx-auto w-full">

              {/* ══════════════════════════ SUMMARY ══════════════════════════ */}
              {attView === "summary" && (<>

                {/* Current Status */}
                <div className="bg-white border border-gray-200 rounded-xl px-5 py-4 flex items-center gap-5">
                  <div className="flex items-center gap-2.5">
                    <div className={cn("w-2.5 h-2.5 rounded-full flex-shrink-0", checkedIn?"bg-green-400 shadow-[0_0_0_3px_rgba(34,197,94,0.15)]":"bg-gray-300")}/>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{checkedIn?"Working · General Shift":"Not Checked In Today"}</div>
                      <div className="text-[10px] text-gray-400">Mon–Fri · 09:00 – 18:00 · New York HQ</div>
                    </div>
                  </div>
                  {checkedIn && <>
                    <div className="h-8 w-px bg-gray-100"/>
                    <div className="text-xs"><span className="text-gray-400">Check-in</span><div className="font-mono font-semibold text-gray-800 mt-0.5">09:02 AM</div></div>
                    <div className="h-8 w-px bg-gray-100"/>
                    <div className="text-xs"><span className="text-gray-400">Duration</span><div className="font-mono font-semibold text-[#5C5CFF] mt-0.5">5h 32m</div></div>
                    <div className="h-8 w-px bg-gray-100"/>
                    <div className="text-xs"><span className="text-gray-400">Expected out</span><div className="font-mono font-semibold text-gray-800 mt-0.5">06:00 PM</div></div>
                  </>}
                  <div className="ml-auto"><span className={cn("text-[10px] font-semibold px-2 py-1 rounded-full", checkedIn?"bg-green-50 text-green-700":"bg-gray-100 text-gray-500")}>{checkedIn?"On Time · Today":"Absent"}</span></div>
                </div>

                {/* KPI Cards — period-aware with comparison */}
                <div className="grid grid-cols-4 gap-3">
                  {(attPeriod==="Yearly"
                    ? [{label:"Present Days",value:"218",sub:"of 261 working days",color:"#22C55E",comp:"+12 vs prev year"},{label:"WFH Days",value:"52",sub:"this year",color:"#3B82F6",comp:"+22 vs prev year"},{label:"Leave Days",value:"18",sub:"this year",color:"#8B5CF6",comp:"-3 vs prev year"},{label:"Absent Days",value:"18",sub:"this year",color:"#EF4444",comp:"-5 vs prev year"},{label:"Late Arrivals",value:"34",sub:"avg 16 min late",color:"#F59E0B",comp:"-8 vs prev year"},{label:"Total Hours",value:"1,962h",sub:"this year",color:"#5C5CFF",comp:"+120h"},{label:"Avg Hours/Day",value:"9h 01m",sub:"vs 8h target",color:"#06B6D4",comp:"+3m"},{label:"Attendance %",value:"91.3%",sub:"this year",color:"#22C55E",comp:"+2.1%"}]
                    :attPeriod==="Monthly"
                    ? [{label:"Present Days",value:"18",sub:"of 23 working days",color:"#22C55E",comp:"+2 vs prev month"},{label:"WFH Days",value:"4",sub:"this month",color:"#3B82F6",comp:"+1 vs prev"},{label:"Leave Days",value:"2",sub:"this month",color:"#8B5CF6",comp:"—"},{label:"Absent Days",value:"2",sub:"this month",color:"#EF4444",comp:"-1 vs prev"},{label:"Late Arrivals",value:"3",sub:"avg 14 min late",color:"#F59E0B",comp:"-2 vs prev"},{label:"Total Hours",value:"162h",sub:"this month",color:"#5C5CFF",comp:"+8h"},{label:"Avg Hours/Day",value:"9h 02m",sub:"vs 8h target",color:"#06B6D4",comp:"+2m"},{label:"Attendance %",value:"90.4%",sub:"this month",color:"#22C55E",comp:"+1.3%"}]
                    : [{label:"Present Days",value:"4",sub:"of 5 this week",color:"#22C55E",comp:"+1 vs prev week"},{label:"WFH Days",value:"1",sub:"this week",color:"#3B82F6",comp:"same as prev"},{label:"Leave Days",value:"0",sub:"this week",color:"#8B5CF6",comp:"—"},{label:"Absent Days",value:"0",sub:"this week",color:"#EF4444",comp:"—"},{label:"Late Arrivals",value:"1",sub:"Mon — 18 min",color:"#F59E0B",comp:"-1 vs prev"},{label:"Total Hours",value:"36h 55m",sub:"this week",color:"#5C5CFF",comp:"+2h"},{label:"Avg Hours/Day",value:"9h 13m",sub:"vs 8h target",color:"#06B6D4",comp:"+13m"},{label:"Attendance %",value:"94.0%",sub:"this week",color:"#22C55E",comp:"+3.6%"}]
                  ).map(s => (
                    <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2"><span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">{s.label}</span><div className="w-1.5 h-1.5 rounded-full" style={{backgroundColor:s.color}}/></div>
                      <div className="text-xl font-bold text-gray-900 mb-0.5">{s.value}</div>
                      <div className="text-[10px] text-gray-400">{s.sub}</div>
                      <div className="text-[10px] text-[#5C5CFF] mt-1 font-medium">{s.comp}</div>
                    </div>
                  ))}
                </div>

                {/* Attendance Graph */}
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-800">{attPeriod} Attendance</h3>
                    <div className="flex items-center gap-4 text-[10px] text-gray-400">
                      {([["#5C5CFF","On target"],["#A5B4FC","Below"],["#93C5FD","WFH"],["#FCD34D","Late"],["#C4B5FD","Leave"],["#E5E7EB","Off"]] as [string,string][]).map(([c,l]) => (
                        <div key={l} className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm" style={{backgroundColor:c}}/>{l}</div>
                      ))}
                    </div>
                  </div>
                  <div className="px-4 py-4">
                    <ResponsiveContainer width="100%" height={170}>
                      <RBarChart data={attPeriod==="Yearly"?ATT_YEAR_DATA.map(d=>({day:d.month,h:parseFloat((d.rate/10).toFixed(1)),s:"Present"})):attPeriod==="Monthly"?MONTHLY_ATT_DATA:WEEKLY_ATT_DATA} barSize={attPeriod==="Monthly"?14:attPeriod==="Yearly"?24:36} margin={{top:4,right:4,left:-20,bottom:0}}>
                        <CartesianGrid key="cg-att" strokeDasharray="3 3" vertical={false} stroke="#f3f4f6"/>
                        <XAxis key="xaxis-att" dataKey="day" tick={{fontSize:9,fill:"#9CA3AF"}} axisLine={false} tickLine={false}/>
                        <YAxis key="yaxis-att" domain={[0,12]} tick={{fontSize:9,fill:"#9CA3AF"}} axisLine={false} tickLine={false} tickFormatter={(v:number)=>v===0?"":v+"h"}/>
                        <Tooltip key="tip-att" formatter={(v:number)=>[`${v}h`,"Hours"]} contentStyle={{fontSize:11,borderRadius:8,border:"1px solid #e5e7eb"}}/>
                        <Bar key="bar-att" dataKey="h" radius={[3,3,0,0]}>
                          {(attPeriod==="Yearly"?ATT_YEAR_DATA.map(d=>({day:d.month,h:parseFloat((d.rate/10).toFixed(1)),s:"Present"})):attPeriod==="Monthly"?MONTHLY_ATT_DATA:WEEKLY_ATT_DATA).map((d,i)=><Cell key={`att-${i}`} fill={barFill(d.s,d.h)}/>)}
                        </Bar>
                      </RBarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Current Shift */}
                <div className="bg-white border border-gray-200 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-4"><h3 className="text-sm font-semibold text-gray-800">Current Shift</h3><span className="text-[10px] font-medium text-[#5C5CFF] bg-[#EEF2FF] px-2 py-0.5 rounded-full">General Shift</span></div>
                  <div className="grid grid-cols-4 gap-4 text-xs">
                    <div><div className="text-gray-400 mb-1">Check-in</div><div className="font-semibold text-gray-800">09:00 AM</div></div>
                    <div><div className="text-gray-400 mb-1">Check-out</div><div className="font-semibold text-gray-800">06:00 PM</div></div>
                    <div><div className="text-gray-400 mb-1">Grace Period</div><div className="font-semibold text-gray-800">15 min</div></div>
                    <div><div className="text-gray-400 mb-1">Weekly Off</div><div className="font-semibold text-gray-800">Sat & Sun</div></div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-6 text-xs">
                    <div className="text-gray-400">Half Day after: <span className="text-gray-700 font-medium">4h</span></div>
                    <div className="text-gray-400">Late mark after: <span className="text-amber-600 font-medium">15 min</span></div>
                    <div className="text-gray-400">Location: <span className="text-gray-700 font-medium">New York HQ</span></div>
                  </div>
                </div>

                {/* Recent Attendance */}
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-800">Recent Attendance</h3>
                    <button onClick={() => setAttView("timeline")} className="text-xs text-[#5C5CFF] hover:underline">Full history →</button>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {ATT_TIMELINE.filter(r=>r.status!=="Weekend").slice(0,7).map((r,i)=>(
                      <div key={i} className="px-5 py-3 flex items-center gap-4">
                        <div className={cn("w-2 h-2 rounded-full flex-shrink-0",r.status==="Present"?"bg-green-400":r.status==="Late"?"bg-amber-400":r.status==="WFH"?"bg-blue-400":r.status==="Leave"?"bg-purple-400":"bg-gray-300")}/>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-gray-800">{r.date}</span>
                            <span className="text-gray-300">·</span>
                            <span className="text-[10px] text-gray-400">{r.day}</span>
                            {r.late&&<span className="text-[9px] bg-amber-50 text-amber-600 px-1.5 py-0.5 rounded-full">Late</span>}
                            {r.wfh &&<span className="text-[9px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded-full">WFH</span>}
                          </div>
                        </div>
                        {r.status!=="Leave"
                          ? <span className="font-mono text-[10px] text-gray-500">{r.in} → {r.out}</span>
                          : <span className="text-[10px] text-purple-600 font-medium">Annual Leave</span>
                        }
                        <span className="font-mono text-xs font-semibold text-gray-700 w-14 text-right">{r.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>)}

              {/* ══════════════════════════ HISTORY ══════════════════════════ */}
              {attView === "timeline" && (
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
                    <div><h3 className="text-sm font-semibold text-gray-800">Attendance History</h3><p className="text-[10px] text-gray-400 mt-0.5">July 2024</p></div>
                    <button onClick={()=>setShowAttExport(v=>!v)} className="text-xs text-gray-500 hover:text-[#5C5CFF] flex items-center gap-1"><Download size={12}/>Export</button>
                  </div>
                  <div className="p-5 space-y-3">
                    {ATT_TIMELINE.map((r,i) => (
                      <div key={i}>
                        <div className="flex items-center gap-3 mb-2">
                          <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold text-white",
                            r.status==="Present"?"bg-green-500":r.status==="Late"?"bg-amber-500":r.status==="WFH"?"bg-blue-500":r.status==="Leave"?"bg-purple-500":"bg-gray-300")}>
                            {r.day.slice(0,2)}
                          </div>
                          <div className="flex-1">
                            <div className="text-xs font-semibold text-gray-800">{r.date}</div>
                            <div className="text-[10px] text-gray-400">{r.shift||"Day off"}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            {r.status==="Present"&&<span className="text-[9px] font-semibold bg-green-50 text-green-700 px-2 py-0.5 rounded-full">Present</span>}
                            {r.status==="Late"&&<span className="text-[9px] font-semibold bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full">Late Arrival</span>}
                            {r.status==="WFH"&&<span className="text-[9px] font-semibold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">WFH</span>}
                            {r.status==="Leave"&&<span className="text-[9px] font-semibold bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">On Leave</span>}
                            {r.status==="Weekend"&&<span className="text-[9px] font-semibold bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full">Weekend</span>}
                          </div>
                        </div>
                        {r.status!=="Weekend"&&r.status!=="Leave"&&r.in!=="—"&&(
                          <div className="ml-11 mb-3">
                            <div className="relative h-8 bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                              <div className="absolute top-0 bottom-0 bg-[#EEF2FF]" style={{left:"22.2%",right:"22.2%"}}/>
                              <div className={cn("absolute top-1 bottom-1 rounded",r.wfh?"bg-blue-400":r.late?"bg-amber-400":"bg-green-400")} style={{left:"11%",right:"11%"}}/>
                            </div>
                            <div className="flex items-center gap-5 mt-2 text-xs">
                              <div><span className="text-gray-400">Check-in </span><span className="font-mono font-semibold text-gray-800">{r.in}</span>{r.late&&<span className="text-[9px] text-amber-600 ml-1">(+18 min)</span>}</div>
                              <div className="h-3 w-px bg-gray-200"/>
                              <div><span className="text-gray-400">Check-out </span><span className="font-mono font-semibold text-gray-800">{r.out}</span></div>
                              <div className="h-3 w-px bg-gray-200"/>
                              <div><span className="text-gray-400">Hours </span><span className="font-mono font-semibold text-gray-800">{r.hours}</span></div>
                              {r.ot&&r.ot!=="0h"&&<><div className="h-3 w-px bg-gray-200"/><div><span className="text-gray-400">OT </span><span className="font-mono font-semibold text-[#5C5CFF]">+{r.ot}</span></div></>}
                              {r.wfh&&<span className="text-[9px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full ml-auto">Work from Home</span>}
                            </div>
                          </div>
                        )}
                        {r.status==="Leave"&&<div className="ml-11 mb-3"><div className="h-8 bg-purple-50 border border-purple-100 rounded-lg flex items-center px-3"><span className="text-xs text-purple-600 font-medium">Annual Leave — Full Day</span></div></div>}
                        {r.status==="Weekend"&&<div className="ml-11 mb-3"><div className="h-8 bg-gray-50 border border-gray-100 rounded-lg flex items-center px-3"><span className="text-xs text-gray-400">Weekend — Day off</span></div></div>}
                        {i<ATT_TIMELINE.length-1&&<div className="ml-11 border-b border-gray-100 mb-1"/>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ══════════════════════════ CALENDAR ══════════════════════════ */}
              {attView === "calendar" && (
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <div className="px-5 py-3.5 border-b border-gray-100 flex items-center gap-3 flex-wrap">
                    <div className="flex gap-1">
                      {(["month","week"] as const).map(v=>(
                        <button key={v} onClick={()=>setAttCalView(v)} className={cn("px-3 py-1.5 text-xs font-medium rounded-lg capitalize transition-colors",attCalView===v?"bg-[#EEF2FF] text-[#5C5CFF]":"text-gray-600 hover:bg-gray-100")}>{v==="month"?"Month":"Week"}</button>
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button className="p-1.5 hover:bg-gray-100 rounded"><ChevronLeft size={14}/></button>
                      <span className="text-xs font-semibold text-gray-700 w-20 text-center">July 2024</span>
                      <button className="p-1.5 hover:bg-gray-100 rounded"><ChevronRight size={14}/></button>
                    </div>
                    <button className="px-2.5 py-1 text-xs border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50">Today</button>
                    <div className="ml-auto flex items-center gap-1.5 flex-wrap">
                      {ATT_CAL_FILTERS_DEFAULT.map(f=>(
                        <button key={f} onClick={()=>toggleAttCalFilter(f)} className={cn("text-[10px] px-2 py-0.5 rounded-full border transition-colors",attCalFilters.includes(f)?"bg-[#EEF2FF] border-[#5C5CFF]/30 text-[#5C5CFF]":"border-gray-200 text-gray-400 hover:bg-gray-50")}>{f}</button>
                      ))}
                    </div>
                  </div>
                  {attCalView==="month"&&(
                    <div className="p-4">
                      <div className="grid grid-cols-7 gap-1 mb-2">{["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d=><div key={d} className="text-center text-[10px] font-semibold text-gray-400 py-1">{d}</div>)}</div>
                      <div className="grid grid-cols-7 gap-1">
                        {["","","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"].map((d,i)=>{
                          const isToday=d==="1";const isWeekend=i%7===0||i%7===6;
                          const isHol=d==="4";const isLeave=["18","19"].includes(d);const isWfh=d==="24";
                          const rec=ATT_TIMELINE.find(r=>r.date.startsWith(`Jul ${d},`)||r.date.startsWith(`Jun ${d},`));
                          return (
                            <div key={i} className={cn("h-14 flex flex-col items-center justify-start pt-1.5 rounded-lg text-xs cursor-pointer transition-colors",
                              isToday?"bg-[#5C5CFF]":isHol&&d?"bg-red-50":isLeave&&d?"bg-purple-50":isWfh&&d?"bg-blue-50":isWeekend&&d?"bg-gray-50":d?"hover:bg-gray-50":"",!d&&"pointer-events-none")}>
                              {d&&<span className={cn("text-xs font-semibold",isToday?"text-white":isHol?"text-red-600":isLeave?"text-purple-600":isWfh?"text-blue-600":isWeekend?"text-gray-300":"text-gray-700")}>{d}</span>}
                              {isHol&&d&&<span className="text-[8px] text-red-500 mt-0.5">Holiday</span>}
                              {isLeave&&d&&<span className="text-[8px] text-purple-500 mt-0.5">Leave</span>}
                              {isWfh&&d&&<span className="text-[8px] text-blue-500 mt-0.5">WFH</span>}
                              {isWeekend&&d&&<span className="text-[8px] text-gray-300 mt-0.5">Off</span>}
                              {!isWeekend&&!isHol&&!isLeave&&!isWfh&&d&&!isToday&&<div className={cn("w-1 h-1 rounded-full mt-1",rec?.late?"bg-amber-400":rec?.status==="Present"?"bg-green-400":"bg-gray-200")}/>}
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-4 pt-4 border-t border-gray-100 text-[10px] text-gray-500">
                        {[["bg-green-400","Present"],["bg-amber-400","Late"],["bg-blue-500","WFH"],["bg-purple-500","Leave"],["bg-red-400","Holiday"],["bg-gray-200","Weekend"]].map(([c,l])=>(
                          <div key={l} className="flex items-center gap-1.5"><div className={cn("w-2 h-2 rounded-full",c)}/>{l}</div>
                        ))}
                      </div>
                    </div>
                  )}
                  {attCalView==="week"&&(
                    <div className="p-4">
                      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                        <div className="grid grid-cols-8 border-b border-gray-100">
                          <div className="py-2.5 px-2 border-r border-gray-100"/>
                          {["Mon Jun 24","Tue Jun 25","Wed Jun 26","Thu Jun 27","Fri Jun 28","Sat Jun 29","Sun Jun 30"].map(d=>(
                            <div key={d} className="text-center text-[10px] font-medium text-gray-500 py-2.5 border-r border-gray-100 last:border-0">{d}</div>
                          ))}
                        </div>
                        {["09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00"].map(h=>(
                          <div key={h} className="grid grid-cols-8 border-b border-gray-50 last:border-0">
                            <div className="text-[10px] text-gray-400 px-2 py-3 border-r border-gray-100 text-right">{h}</div>
                            {[0,1,2,3,4,5,6].map(day=><div key={day} className={cn("border-r border-gray-50 last:border-0 h-10",day>=5&&"bg-gray-50/50")}/>)}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* analytics + exceptions moved to My Team — removed from My Space */}
              {false && (<>
                {/* Chart type switcher */}
                <div className="bg-white border border-gray-200 rounded-xl p-1 flex gap-0.5 flex-wrap">
                  {["Daily Attendance","Weekly Trend","Monthly Trend","WFH Trend","Overtime Trend","Late Arrival Trend"].map(c=>(
                    <button key={c} onClick={()=>setAttAnalChart(c)} className={cn("px-3 py-2 text-xs font-medium rounded-lg transition-colors flex-1 min-w-max",attAnalChart===c?"bg-[#5C5CFF] text-white":"text-gray-600 hover:bg-gray-100")}>{c}</button>
                  ))}
                </div>

                {/* Main chart card */}
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-800">{attAnalChart}</h3>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {["7D","30D","90D","1Y"].map(r=>(
                          <button key={r} className="px-2 py-1 text-[10px] border border-gray-200 rounded text-gray-500 hover:border-[#5C5CFF]/40 hover:text-[#5C5CFF] transition-colors">{r}</button>
                        ))}
                      </div>
                      <button className="flex items-center gap-1 px-2 py-1 text-[10px] text-gray-500 border border-gray-200 rounded hover:bg-gray-50"><Download size={10}/>Export</button>
                    </div>
                  </div>
                  <div className="p-5">
                    {(attAnalChart==="Daily Attendance"||attAnalChart==="Weekly Trend")&&(
                      <ResponsiveContainer width="100%" height={240}>
                        <RBarChart data={ATT_DAILY_DATA} barSize={22} margin={{top:4,right:4,left:-20,bottom:0}}>
                          <CartesianGrid key="cg-an1" strokeDasharray="3 3" vertical={false} stroke="#f3f4f6"/>
                          <XAxis key="x-an1" dataKey="day" tick={{fontSize:9,fill:"#9CA3AF"}} axisLine={false} tickLine={false}/>
                          <YAxis key="y-an1" tick={{fontSize:9,fill:"#9CA3AF"}} axisLine={false} tickLine={false} unit="%"/>
                          <Tooltip key="tip-an1" contentStyle={{fontSize:11,borderRadius:8,border:"1px solid #e5e7eb"}}/>
                          <Legend key="leg-an1" iconSize={8} iconType="circle" wrapperStyle={{fontSize:10}}/>
                          <Bar key="bar-present" dataKey="present" stackId="a" fill="#22C55E" radius={[0,0,0,0]} name="Present %"/>
                          <Bar key="bar-late"    dataKey="late"    stackId="a" fill="#F59E0B" radius={[0,0,0,0]} name="Late %"/>
                          <Bar key="bar-absent"  dataKey="absent"  stackId="a" fill="#EF4444" radius={[4,4,0,0]} name="Absent %"/>
                        </RBarChart>
                      </ResponsiveContainer>
                    )}
                    {attAnalChart==="Monthly Trend"&&(
                      <ResponsiveContainer width="100%" height={240}>
                        <RLineChart data={ATT_YEAR_DATA} margin={{top:4,right:4,left:-20,bottom:0}}>
                          <CartesianGrid key="cg-an2" strokeDasharray="3 3" vertical={false} stroke="#f3f4f6"/>
                          <XAxis key="x-an2" dataKey="month" tick={{fontSize:9,fill:"#9CA3AF"}} axisLine={false} tickLine={false}/>
                          <YAxis key="y-an2" domain={[80,100]} tick={{fontSize:9,fill:"#9CA3AF"}} axisLine={false} tickLine={false} unit="%"/>
                          <Tooltip key="tip-an2" contentStyle={{fontSize:11,borderRadius:8,border:"1px solid #e5e7eb"}}/>
                          <Legend key="leg-an2" iconSize={8} iconType="circle" wrapperStyle={{fontSize:10}}/>
                          <Line key="line-rate" type="monotone" dataKey="rate" stroke="#5C5CFF" strokeWidth={2.5} dot={{r:4,fill:"#5C5CFF"}} name="Attendance Rate %"/>
                        </RLineChart>
                      </ResponsiveContainer>
                    )}
                    {attAnalChart==="WFH Trend"&&(
                      <ResponsiveContainer width="100%" height={240}>
                        <AreaChart data={ATT_YEAR_DATA} margin={{top:4,right:4,left:-20,bottom:0}}>
                          <CartesianGrid key="cg-an3" strokeDasharray="3 3" vertical={false} stroke="#f3f4f6"/>
                          <XAxis key="x-an3" dataKey="month" tick={{fontSize:9,fill:"#9CA3AF"}} axisLine={false} tickLine={false}/>
                          <YAxis key="y-an3" tick={{fontSize:9,fill:"#9CA3AF"}} axisLine={false} tickLine={false}/>
                          <Tooltip key="tip-an3" contentStyle={{fontSize:11,borderRadius:8,border:"1px solid #e5e7eb"}}/>
                          <Legend key="leg-an3" iconSize={8} iconType="circle" wrapperStyle={{fontSize:10}}/>
                          <Area key="area-wfh" type="monotone" dataKey="wfh" stroke="#3B82F6" fill="#DBEAFE" strokeWidth={2} name="WFH Days"/>
                        </AreaChart>
                      </ResponsiveContainer>
                    )}
                    {attAnalChart==="Overtime Trend"&&(
                      <ResponsiveContainer width="100%" height={240}>
                        <RBarChart data={ATT_YEAR_DATA} barSize={30} margin={{top:4,right:4,left:-20,bottom:0}}>
                          <CartesianGrid key="cg-an4" strokeDasharray="3 3" vertical={false} stroke="#f3f4f6"/>
                          <XAxis key="x-an4" dataKey="month" tick={{fontSize:9,fill:"#9CA3AF"}} axisLine={false} tickLine={false}/>
                          <YAxis key="y-an4" tick={{fontSize:9,fill:"#9CA3AF"}} axisLine={false} tickLine={false} unit="h"/>
                          <Tooltip key="tip-an4" contentStyle={{fontSize:11,borderRadius:8,border:"1px solid #e5e7eb"}}/>
                          <Bar key="bar-ot" dataKey="ot" radius={[4,4,0,0]} name="Overtime Hours">
                            {ATT_YEAR_DATA.map((_,i)=><Cell key={`ot-${i}`} fill="#EC4899"/>)}
                          </Bar>
                        </RBarChart>
                      </ResponsiveContainer>
                    )}
                    {attAnalChart==="Late Arrival Trend"&&(
                      <ResponsiveContainer width="100%" height={240}>
                        <RLineChart data={ATT_YEAR_DATA} margin={{top:4,right:4,left:-20,bottom:0}}>
                          <CartesianGrid key="cg-an5" strokeDasharray="3 3" vertical={false} stroke="#f3f4f6"/>
                          <XAxis key="x-an5" dataKey="month" tick={{fontSize:9,fill:"#9CA3AF"}} axisLine={false} tickLine={false}/>
                          <YAxis key="y-an5" tick={{fontSize:9,fill:"#9CA3AF"}} axisLine={false} tickLine={false}/>
                          <Tooltip key="tip-an5" contentStyle={{fontSize:11,borderRadius:8,border:"1px solid #e5e7eb"}}/>
                          <Legend key="leg-an5" iconSize={8} iconType="circle" wrapperStyle={{fontSize:10}}/>
                          <Line key="line-late" type="monotone" dataKey="late" stroke="#F59E0B" strokeWidth={2.5} dot={{r:4,fill:"#F59E0B"}} name="Late Arrivals"/>
                          <Line key="line-absent" type="monotone" dataKey="absent" stroke="#EF4444" strokeWidth={2} dot={{r:3,fill:"#EF4444"}} strokeDasharray="4 2" name="Absent Days"/>
                        </RLineChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </div>

                {/* Summary insights row */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3"><TrendingUp size={14} className="text-green-500"/><h4 className="text-xs font-semibold text-gray-700">Best Month</h4></div>
                    <div className="space-y-2">
                      {[["Attendance",  "Mar · 93%"],["Fewest Late",  "Jul · 4"],["Most WFH",     "Jul · 25 days"]].map(([k,v])=>(
                        <div key={k} className="flex items-center justify-between">
                          <span className="text-[10px] text-gray-500">{k}</span>
                          <span className="text-[10px] font-semibold text-gray-800">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3"><TrendingDown size={14} className="text-red-500"/><h4 className="text-xs font-semibold text-gray-700">Needs Attention</h4></div>
                    <div className="space-y-2">
                      {[["Lowest Att.",  "Apr · 87%"],["Most Late",    "Apr · 9"],["Most Absent",  "Apr · 13 days"]].map(([k,v])=>(
                        <div key={k} className="flex items-center justify-between">
                          <span className="text-[10px] text-gray-500">{k}</span>
                          <span className="text-[10px] font-semibold text-red-600">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3"><Activity size={14} className="text-[#5C5CFF]"/><h4 className="text-xs font-semibold text-gray-700">YTD Summary</h4></div>
                    <div className="space-y-2">
                      {[["Avg Rate","91.0%"],["Total Late","34"],["Total OT","133h"]].map(([k,v])=>(
                        <div key={k} className="flex items-center justify-between">
                          <span className="text-[10px] text-gray-500">{k}</span>
                          <span className="text-[10px] font-semibold text-gray-800">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>)}

              {false && (
                <div className="flex gap-4 h-full">
                  {/* Left: table */}
                  <div className="flex-1 space-y-3 min-w-0">
                    {/* Filter bar */}
                    <div className="bg-white border border-gray-200 rounded-xl p-3 flex items-center gap-2 flex-wrap">
                      <div className="relative flex-1 min-w-[160px] max-w-xs">
                        <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"/>
                        <input placeholder="Search exceptions…" className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#5C5CFF]"/>
                      </div>
                      <div className="flex gap-1">
                        {["All","Pending","Resolved"].map(s=>(
                          <button key={s} onClick={()=>setAttExcStatus(s)} className={cn("px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors",attExcStatus===s?"bg-[#EEF2FF] text-[#5C5CFF]":"text-gray-600 hover:bg-gray-100")}>{s}</button>
                        ))}
                      </div>
                      <select value={attExcType} onChange={e=>setAttExcType(e.target.value)} className="px-2.5 py-1.5 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-[#5C5CFF]">
                        {["All","Missed Check-in","Missed Check-out","Late Arrival","Early Exit","Shift Violation","Regularization Pending"].map(t=><option key={t}>{t}</option>)}
                      </select>
                      <span className="ml-auto text-[10px] text-gray-400">
                        {ATT_EXCEPTIONS_DATA.filter(e=>(attExcStatus==="All"||e.status===attExcStatus)&&(attExcType==="All"||e.issue===attExcType)).length} exceptions
                      </span>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr>{["Employee","Date","Issue","Shift","Status","Assigned HR","Resolution",""].map(h=>(
                            <th key={h} className="px-4 py-2.5 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                          ))}</tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {ATT_EXCEPTIONS_DATA.filter(e=>(attExcStatus==="All"||e.status===attExcStatus)&&(attExcType==="All"||e.issue===attExcType)).map(exc=>(
                            <tr key={exc.id} onClick={()=>setAttExcDrawer(attExcDrawer===exc.id?null:exc.id)} className={cn("cursor-pointer hover:bg-gray-50 transition-colors",attExcDrawer===exc.id&&"bg-[#EEF2FF]")}>
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-2">
                                  <Avt initials={exc.initials} color={exc.color} size="xs"/>
                                  <div><p className="text-xs font-medium text-gray-800">{exc.employee}</p><p className="text-[10px] text-gray-400">{exc.dept}</p></div>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{exc.date}</td>
                              <td className="px-4 py-3">
                                <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap",
                                  exc.issue.includes("Miss")||exc.issue.includes("Missed")?"bg-red-50 text-red-600":exc.issue==="Late Arrival"?"bg-amber-50 text-amber-600":exc.issue==="Early Exit"?"bg-orange-50 text-orange-600":exc.issue==="Shift Violation"?"bg-purple-50 text-purple-600":"bg-blue-50 text-blue-600"
                                )}>{exc.issue}</span>
                              </td>
                              <td className="px-4 py-3 text-[10px] text-gray-500 whitespace-nowrap">{exc.shift}</td>
                              <td className="px-4 py-3">
                                <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full",exc.status==="Resolved"?"bg-green-50 text-green-600":"bg-amber-50 text-amber-600")}>{exc.status}</span>
                              </td>
                              <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{exc.hr}</td>
                              <td className="px-4 py-3 text-xs text-gray-500 max-w-[120px] truncate">{exc.resolution}</td>
                              <td className="px-4 py-3"><ChevronRight size={14} className="text-gray-300"/></td>
                            </tr>
                          ))}
                          {ATT_EXCEPTIONS_DATA.filter(e=>(attExcStatus==="All"||e.status===attExcStatus)&&(attExcType==="All"||e.issue===attExcType)).length===0&&(
                            <tr><td colSpan={8} className="py-12 text-center"><AlertTriangle size={24} className="text-gray-200 mx-auto mb-2"/><p className="text-sm text-gray-400">No exceptions found</p></td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Right: Exception drawer */}
                  {attExcDrawer && (() => {
                    const exc = ATT_EXCEPTIONS_DATA.find(e=>e.id===attExcDrawer);
                    if (!exc) return null;
                    return (
                      <div className="w-72 flex-shrink-0 bg-white border border-gray-200 rounded-xl flex flex-col overflow-hidden">
                        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
                          <h4 className="text-sm font-semibold text-gray-800">Exception Detail</h4>
                          <button onClick={()=>setAttExcDrawer(null)}><X size={14} className="text-gray-400 hover:text-gray-600"/></button>
                        </div>
                        <div className="flex-1 overflow-auto p-4 space-y-4">
                          <div className="flex items-center gap-3">
                            <Avt initials={exc.initials} color={exc.color} size="md"/>
                            <div><p className="text-sm font-semibold text-gray-800">{exc.employee}</p><p className="text-[10px] text-gray-400">{exc.dept}</p></div>
                          </div>
                          <div className="bg-gray-50 rounded-xl p-3 space-y-2">
                            {([["Issue",exc.issue],["Date",exc.date],["Shift",exc.shift],["Assigned HR",exc.hr]] as [string,string][]).map(([k,v])=>(
                              <div key={k} className="flex items-start justify-between gap-2">
                                <span className="text-[10px] text-gray-400 flex-shrink-0">{k}</span>
                                <span className="text-[10px] font-medium text-gray-800 text-right">{v}</span>
                              </div>
                            ))}
                            <div className="flex items-center justify-between pt-1 border-t border-gray-200">
                              <span className="text-[10px] text-gray-400">Status</span>
                              <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full",exc.status==="Resolved"?"bg-green-50 text-green-600":"bg-amber-50 text-amber-600")}>{exc.status}</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-2.5">Timeline</p>
                            <div className="space-y-2.5">
                              {[
                                {t:"Exception flagged by system",d:exc.date+" · Automated",c:"#EF4444"},
                                {t:`Assigned to ${exc.hr}`,d:exc.date+" · Auto-assign",c:"#F59E0B"},
                                ...(exc.status==="Resolved"
                                  ? [{t:`Resolved: ${exc.resolution}`,d:"Manual review",c:"#22C55E"}]
                                  : [{t:"Awaiting HR resolution",d:"Pending",c:"#9CA3AF"}]
                                ),
                              ].map((step,i)=>(
                                <div key={i} className="flex items-start gap-2.5">
                                  <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{backgroundColor:step.c}}/>
                                  <div><p className="text-[10px] font-medium text-gray-700">{step.t}</p><p className="text-[9px] text-gray-400 mt-0.5">{step.d}</p></div>
                                </div>
                              ))}
                            </div>
                          </div>
                          {exc.status==="Pending"&&(
                            <div className="pt-3 border-t border-gray-100 space-y-2">
                              <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">Resolve</p>
                              <textarea rows={2} placeholder="Enter resolution note…" className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#5C5CFF] resize-none"/>
                              <div className="flex gap-2">
                                <button className="flex-1 px-3 py-2 bg-[#5C5CFF] text-white text-xs font-medium rounded-lg hover:bg-[#4A4AE0]">Mark Resolved</button>
                                <button className="flex-1 px-3 py-2 border border-gray-200 text-xs text-gray-600 rounded-lg hover:bg-gray-50">Escalate</button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* ══════════════════════════ ISSUES ══════════════════════════ */}
              {attView === "issues" && (
                <div className="space-y-4">
                  {/* Issue submission form */}
                  {showNewIssue ? (
                    <div className="bg-white border border-gray-200 rounded-xl p-5">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-gray-800">Report Attendance Issue</h3>
                        <button onClick={()=>setShowNewIssue(false)}><X size={14} className="text-gray-400"/></button>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Issue Type *</label>
                          <select value={newIssueType} onChange={e=>setNewIssueType(e.target.value)} className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#5C5CFF] bg-white">
                            {["Missing Check-in","Missing Check-out","Incorrect Attendance","Wrong Shift","Wrong Working Hours"].map(t=><option key={t}>{t}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Date *</label>
                          <input type="date" value={newIssueDate} onChange={e=>setNewIssueDate(e.target.value)} className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#5C5CFF]"/>
                        </div>
                        <div className="col-span-2">
                          <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Reason *</label>
                          <input value={newIssueReason} onChange={e=>setNewIssueReason(e.target.value)} placeholder="Briefly describe the issue…" className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#5C5CFF]"/>
                        </div>
                        <div className="col-span-2">
                          <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Additional Comment</label>
                          <textarea value={newIssueCmt} onChange={e=>setNewIssueCmt(e.target.value)} rows={3} placeholder="Any additional details…" className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#5C5CFF] resize-none"/>
                        </div>
                        <div>
                          <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Attachment</label>
                          <button className="flex items-center gap-2 px-3 py-2 border border-dashed border-gray-300 rounded-lg text-xs text-gray-500 hover:border-[#5C5CFF]/40 hover:text-[#5C5CFF] transition-colors w-full">
                            <Upload size={12}/>Attach supporting document
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-100">
                        <button onClick={()=>setShowNewIssue(false)} className="px-4 py-2 text-xs border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">Cancel</button>
                        <button onClick={()=>{
                          if (!newIssueReason.trim()||!newIssueDate) return;
                          setAttIssues(is=>[{id:`ISS${Date.now()}`,type:newIssueType,date:newIssueDate,reason:newIssueReason,status:"Pending",submittedOn:"Today",comment:newIssueCmt,rejectNote:""},...is]);
                          setShowNewIssue(false);setNewIssueReason("");setNewIssueDate("");setNewIssueCmt("");
                        }} disabled={!newIssueReason.trim()||!newIssueDate} className="px-4 py-2 text-xs bg-[#5C5CFF] text-white rounded-lg hover:bg-[#4A4AE0] font-medium disabled:opacity-50 disabled:cursor-not-allowed">Submit Request</button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-gray-800">Attendance Issue Requests</p>
                        <p className="text-xs text-gray-400 mt-0.5">Submit corrections for missed check-ins, late arrivals, or incorrect records</p>
                      </div>
                      <button onClick={()=>setShowNewIssue(true)} className="flex items-center gap-1.5 px-3 py-2 bg-[#5C5CFF] text-white text-xs font-medium rounded-lg hover:bg-[#4A4AE0]"><Plus size={13}/>Report Issue</button>
                    </div>
                  )}

                  {/* Issues list */}
                  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
                      <h3 className="text-xs font-semibold text-gray-700">My Requests</h3>
                      <span className="text-[10px] text-gray-400">{attIssues.length} total · {attIssues.filter(i=>i.status==="Pending").length} pending</span>
                    </div>
                    <div className="divide-y divide-gray-100">
                      {attIssues.map(iss=>(
                        <div key={iss.id} className="px-5 py-4 flex items-start gap-4 hover:bg-gray-50 transition-colors">
                          <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0",
                            iss.status==="Approved"?"bg-green-50":iss.status==="Rejected"?"bg-red-50":"bg-amber-50")}>
                            {iss.status==="Approved"?<CheckCircle size={16} className="text-green-500"/>:iss.status==="Rejected"?<XCircle size={16} className="text-red-500"/>:<Clock size={16} className="text-amber-500"/>}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <p className="text-xs font-semibold text-gray-800">{iss.type}</p>
                              <span className={cn("text-[9px] font-bold px-2 py-0.5 rounded-full flex-shrink-0",
                                iss.status==="Approved"?"bg-green-50 text-green-600":iss.status==="Rejected"?"bg-red-50 text-red-600":"bg-amber-50 text-amber-600")}>{iss.status}</span>
                            </div>
                            <p className="text-[10px] text-gray-600">{iss.reason}</p>
                            {iss.comment&&<p className="text-[10px] text-gray-400 mt-0.5 italic">"{iss.comment}"</p>}
                            {iss.status==="Rejected"&&iss.rejectNote&&(
                              <div className="mt-1.5 bg-red-50 border border-red-100 rounded-lg px-2.5 py-1.5">
                                <p className="text-[9px] font-semibold text-red-600 uppercase tracking-wide mb-0.5">Rejection Reason</p>
                                <p className="text-[10px] text-red-700">{iss.rejectNote}</p>
                              </div>
                            )}
                            <p className="text-[9px] text-gray-400 mt-1.5">Submitted {iss.submittedOn} · Issue date: {iss.date}</p>
                          </div>
                          {iss.status==="Pending"&&(
                            <div className="flex gap-1 flex-shrink-0">
                              <button onClick={()=>confirmIssueApprove(iss.id)} className="px-2.5 py-1.5 bg-green-50 border border-green-200 text-green-700 text-[10px] font-medium rounded-lg hover:bg-green-100">Approve</button>
                              <button onClick={()=>setIssueRejectId(iss.id)} className="px-2.5 py-1.5 bg-red-50 border border-red-200 text-red-700 text-[10px] font-medium rounded-lg hover:bg-red-100">Reject</button>
                            </div>
                          )}
                        </div>
                      ))}
                      {attIssues.length===0&&(
                        <div className="py-12 text-center"><AlertCircle size={24} className="text-gray-200 mx-auto mb-2"/><p className="text-sm text-gray-400">No issue requests submitted yet</p></div>
                      )}
                    </div>
                  </div>
                </div>
              )}

            </div>
            )}
            {/* end My Space */}

            {/* ══════════════════════════════════════════════════════════
                MY TEAM
            ══════════════════════════════════════════════════════════ */}
            {attSection==="My Team" && (
            <div className="flex-1 overflow-auto p-5 space-y-4 max-w-5xl mx-auto w-full">

              {/* ── OVERVIEW ── */}
              {attTeamView==="overview" && (<>

                {/* Org-level rate KPI cards */}
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                  {([
                    {label:"Attendance %",value:"91%", delta:"+2.1%",up:true, color:"#5C5CFF"},
                    {label:"Present %",   value:"78%", delta:"+1.4%",up:true, color:"#22C55E"},
                    {label:"Leave %",     value:"9%",  delta:"-0.8%",up:false,color:"#8B5CF6"},
                    {label:"WFH %",       value:"17%", delta:"+3.5%",up:true, color:"#3B82F6"},
                    {label:"Late %",      value:"13%", delta:"-2.1%",up:false,color:"#F59E0B"},
                    {label:"Absent %",    value:"9%",  delta:"+0.9%",up:false,color:"#EF4444"},
                  ] as {label:string;value:string;delta:string;up:boolean;color:string}[]).map(k=>(
                    <div key={k.label} className="bg-white border border-gray-200 rounded-xl p-3.5">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-wide leading-tight">{k.label}</span>
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{backgroundColor:k.color}}/>
                      </div>
                      <div className="text-xl font-bold text-gray-900 mb-1">{k.value}</div>
                      <div className={cn("text-[10px] font-medium flex items-center gap-0.5",k.up?"text-green-600":"text-red-500")}>
                        {k.up?<ArrowUpRight size={10}/>:<ArrowDownRight size={10}/>}{k.delta} vs last month
                      </div>
                    </div>
                  ))}
                </div>

                {/* Team attendance table */}
                <div className="flex gap-4">
                  <div className="flex-1 min-w-0 space-y-3">
                    {/* Search + filter bar */}
                    <div className="bg-white border border-gray-200 rounded-xl p-3 flex items-center gap-2 flex-wrap">
                      <div className="relative flex-1 min-w-[180px] max-w-xs">
                        <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"/>
                        <input value={teamEmpSearch} onChange={e=>setTeamEmpSearch(e.target.value)} placeholder="Search employees…" className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#5C5CFF]"/>
                      </div>
                      <select value={teamDeptFilter} onChange={e=>setTeamDeptFilter(e.target.value)} className="px-2.5 py-1.5 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-[#5C5CFF]">
                        {["All","Engineering","HR","Sales","Design","Finance","Operations"].map(d=><option key={d}>{d}</option>)}
                      </select>
                      <div className="flex gap-1">
                        {["All","Present","Late","WFH","Leave","Absent"].map(s=>(
                          <button key={s} onClick={()=>setTeamStatusFilter(s)} className={cn("px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors",teamStatusFilter===s?"bg-[#EEF2FF] text-[#5C5CFF]":"text-gray-600 hover:bg-gray-100")}>{s}</button>
                        ))}
                      </div>
                      <span className="ml-auto text-[10px] text-gray-400">
                        {TEAM_ATTENDANCE.filter(e=>(teamDeptFilter==="All"||e.dept===teamDeptFilter)&&(teamStatusFilter==="All"||e.status===teamStatusFilter)&&(!teamEmpSearch||e.name.toLowerCase().includes(teamEmpSearch.toLowerCase()))).length} employees
                      </span>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr>{["Employee","Department","Check In","Check Out","Hours","Status","Shift",""].map(h=>(
                            <th key={h} className="px-4 py-2.5 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                          ))}</tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {TEAM_ATTENDANCE.filter(e=>(teamDeptFilter==="All"||e.dept===teamDeptFilter)&&(teamStatusFilter==="All"||e.status===teamStatusFilter)&&(!teamEmpSearch||e.name.toLowerCase().includes(teamEmpSearch.toLowerCase()))).map(emp=>(
                            <tr key={emp.id} onClick={()=>setTeamEmpDrawer(teamEmpDrawer===emp.id?null:emp.id)} className={cn("cursor-pointer hover:bg-gray-50 transition-colors",teamEmpDrawer===emp.id&&"bg-[#EEF2FF]")}>
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-2">
                                  <Avt initials={emp.initials} color={emp.color} size="xs"/>
                                  <span className="text-xs font-medium text-gray-800">{emp.name}</span>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-xs text-gray-500">{emp.dept}</td>
                              <td className="px-4 py-3 font-mono text-xs text-gray-700">{emp.checkIn}</td>
                              <td className="px-4 py-3 font-mono text-xs text-gray-700">{emp.checkOut}</td>
                              <td className="px-4 py-3 font-mono text-xs font-semibold text-gray-800">{emp.hours}</td>
                              <td className="px-4 py-3">
                                <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap",
                                  emp.status==="Present"?"bg-green-50 text-green-700":emp.status==="Late"?"bg-amber-50 text-amber-700":emp.status==="WFH"?"bg-blue-50 text-blue-700":emp.status==="Leave"?"bg-purple-50 text-purple-700":"bg-red-50 text-red-700"
                                )}>{emp.status}</span>
                              </td>
                              <td className="px-4 py-3 text-[10px] text-gray-500 whitespace-nowrap">{emp.shift}</td>
                              <td className="px-4 py-3"><ChevronRight size={14} className="text-gray-300"/></td>
                            </tr>
                          ))}
                          {TEAM_ATTENDANCE.filter(e=>(teamDeptFilter==="All"||e.dept===teamDeptFilter)&&(teamStatusFilter==="All"||e.status===teamStatusFilter)&&(!teamEmpSearch||e.name.toLowerCase().includes(teamEmpSearch.toLowerCase()))).length===0&&(
                            <tr><td colSpan={8} className="py-12 text-center"><Users size={24} className="text-gray-200 mx-auto mb-2"/><p className="text-sm text-gray-400">No employees match the filters</p></td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Employee attendance drawer */}
                  {teamEmpDrawer&&(()=>{
                    const emp=TEAM_ATTENDANCE.find(e=>e.id===teamEmpDrawer);
                    if(!emp) return null;
                    return (
                      <div className="w-72 flex-shrink-0 bg-white border border-gray-200 rounded-xl flex flex-col overflow-hidden">
                        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
                          <h4 className="text-sm font-semibold text-gray-800">Employee Attendance</h4>
                          <button onClick={()=>setTeamEmpDrawer(null)}><X size={14} className="text-gray-400 hover:text-gray-600"/></button>
                        </div>
                        <div className="flex-1 overflow-auto p-4 space-y-4">
                          <div className="flex items-center gap-3">
                            <Avt initials={emp.initials} color={emp.color} size="md"/>
                            <div>
                              <p className="text-sm font-semibold text-gray-800">{emp.name}</p>
                              <p className="text-[10px] text-gray-400">{emp.dept}</p>
                            </div>
                            <span className={cn("ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full",
                              emp.status==="Present"?"bg-green-50 text-green-700":emp.status==="Late"?"bg-amber-50 text-amber-700":emp.status==="WFH"?"bg-blue-50 text-blue-700":emp.status==="Leave"?"bg-purple-50 text-purple-700":"bg-red-50 text-red-700"
                            )}>{emp.status}</span>
                          </div>
                          <div className="bg-gray-50 rounded-xl p-3 space-y-2">
                            {([["Shift",emp.shift],["Location",emp.location],["Check In",emp.checkIn],["Check Out",emp.checkOut],["Hours Worked",emp.hours]] as [string,string][]).map(([k,v])=>(
                              <div key={k} className="flex items-center justify-between">
                                <span className="text-[10px] text-gray-400">{k}</span>
                                <span className="text-[10px] font-medium text-gray-800 font-mono">{v}</span>
                              </div>
                            ))}
                          </div>
                          <div>
                            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-2.5">This Week</p>
                            <div className="flex gap-1">
                              {["Mon","Tue","Wed","Thu","Fri"].map((d,i)=>(
                                <div key={d} className="flex-1 flex flex-col items-center gap-1">
                                  <div className={cn("w-full h-6 rounded-md",i===0?"bg-amber-100":i===2?"bg-blue-100":"bg-green-100")}/>
                                  <span className="text-[9px] text-gray-400">{d}</span>
                                </div>
                              ))}
                            </div>
                            <div className="flex gap-3 mt-2 text-[9px] text-gray-400">
                              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-green-100"/>Present</div>
                              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-amber-100"/>Late</div>
                              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-blue-100"/>WFH</div>
                            </div>
                          </div>
                          <div>
                            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-2">Recent Issues</p>
                            {ATT_EXCEPTIONS_DATA.filter(e=>e.employee===emp.name).length>0
                              ? ATT_EXCEPTIONS_DATA.filter(e=>e.employee===emp.name).map(ex=>(
                                <div key={ex.id} className="bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 mb-1.5">
                                  <p className="text-[10px] font-semibold text-amber-700">{ex.issue}</p>
                                  <p className="text-[9px] text-amber-600">{ex.date} · {ex.status}</p>
                                </div>
                              ))
                              : <p className="text-[10px] text-gray-400 italic">No recent issues</p>
                            }
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </>)}

              {/* ── EXCEPTIONS (team) ── */}
              {attTeamView==="exceptions" && (
                <div className="flex gap-4 h-full">
                  {/* Left: table */}
                  <div className="flex-1 space-y-3 min-w-0">
                    <div className="bg-white border border-gray-200 rounded-xl p-3 flex items-center gap-2 flex-wrap">
                      <div className="relative flex-1 min-w-[160px] max-w-xs">
                        <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"/>
                        <input placeholder="Search exceptions…" className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#5C5CFF]"/>
                      </div>
                      <div className="flex gap-1">
                        {["All","Pending","Resolved"].map(s=>(
                          <button key={s} onClick={()=>setAttExcStatus(s)} className={cn("px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors",attExcStatus===s?"bg-[#EEF2FF] text-[#5C5CFF]":"text-gray-600 hover:bg-gray-100")}>{s}</button>
                        ))}
                      </div>
                      <select value={attExcType} onChange={e=>setAttExcType(e.target.value)} className="px-2.5 py-1.5 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-[#5C5CFF]">
                        {["All","Missed Check-in","Missed Check-out","Late Arrival","Early Exit","Shift Violation","Regularization Pending"].map(t=><option key={t}>{t}</option>)}
                      </select>
                      <span className="ml-auto text-[10px] text-gray-400">
                        {ATT_EXCEPTIONS_DATA.filter(e=>(attExcStatus==="All"||e.status===attExcStatus)&&(attExcType==="All"||e.issue===attExcType)).length} exceptions
                      </span>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr>{["Employee","Date","Issue","Shift","Status","Assigned HR","Resolution",""].map(h=>(
                            <th key={h} className="px-4 py-2.5 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                          ))}</tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {ATT_EXCEPTIONS_DATA.filter(e=>(attExcStatus==="All"||e.status===attExcStatus)&&(attExcType==="All"||e.issue===attExcType)).map(exc=>(
                            <tr key={exc.id} onClick={()=>setAttExcDrawer(attExcDrawer===exc.id?null:exc.id)} className={cn("cursor-pointer hover:bg-gray-50 transition-colors",attExcDrawer===exc.id&&"bg-[#EEF2FF]")}>
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-2">
                                  <Avt initials={exc.initials} color={exc.color} size="xs"/>
                                  <div><p className="text-xs font-medium text-gray-800">{exc.employee}</p><p className="text-[10px] text-gray-400">{exc.dept}</p></div>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{exc.date}</td>
                              <td className="px-4 py-3">
                                <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap",
                                  exc.issue.includes("Miss")||exc.issue.includes("Missed")?"bg-red-50 text-red-600":exc.issue==="Late Arrival"?"bg-amber-50 text-amber-600":exc.issue==="Early Exit"?"bg-orange-50 text-orange-600":exc.issue==="Shift Violation"?"bg-purple-50 text-purple-600":"bg-blue-50 text-blue-600"
                                )}>{exc.issue}</span>
                              </td>
                              <td className="px-4 py-3 text-[10px] text-gray-500 whitespace-nowrap">{exc.shift}</td>
                              <td className="px-4 py-3">
                                <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full",exc.status==="Resolved"?"bg-green-50 text-green-600":"bg-amber-50 text-amber-600")}>{exc.status}</span>
                              </td>
                              <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{exc.hr}</td>
                              <td className="px-4 py-3 text-xs text-gray-500 max-w-[120px] truncate">{exc.resolution}</td>
                              <td className="px-4 py-3"><ChevronRight size={14} className="text-gray-300"/></td>
                            </tr>
                          ))}
                          {ATT_EXCEPTIONS_DATA.filter(e=>(attExcStatus==="All"||e.status===attExcStatus)&&(attExcType==="All"||e.issue===attExcType)).length===0&&(
                            <tr><td colSpan={8} className="py-12 text-center"><AlertTriangle size={24} className="text-gray-200 mx-auto mb-2"/><p className="text-sm text-gray-400">No exceptions found</p></td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {/* Exception drawer (reused) */}
                  {attExcDrawer&&(()=>{
                    const exc=ATT_EXCEPTIONS_DATA.find(e=>e.id===attExcDrawer);
                    if(!exc) return null;
                    return (
                      <div className="w-72 flex-shrink-0 bg-white border border-gray-200 rounded-xl flex flex-col overflow-hidden">
                        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
                          <h4 className="text-sm font-semibold text-gray-800">Exception Detail</h4>
                          <button onClick={()=>setAttExcDrawer(null)}><X size={14} className="text-gray-400 hover:text-gray-600"/></button>
                        </div>
                        <div className="flex-1 overflow-auto p-4 space-y-4">
                          <div className="flex items-center gap-3">
                            <Avt initials={exc.initials} color={exc.color} size="md"/>
                            <div><p className="text-sm font-semibold text-gray-800">{exc.employee}</p><p className="text-[10px] text-gray-400">{exc.dept}</p></div>
                          </div>
                          <div className="bg-gray-50 rounded-xl p-3 space-y-2">
                            {([["Issue",exc.issue],["Date",exc.date],["Shift",exc.shift],["Assigned HR",exc.hr]] as [string,string][]).map(([k,v])=>(
                              <div key={k} className="flex items-start justify-between gap-2">
                                <span className="text-[10px] text-gray-400 flex-shrink-0">{k}</span>
                                <span className="text-[10px] font-medium text-gray-800 text-right">{v}</span>
                              </div>
                            ))}
                            <div className="flex items-center justify-between pt-1 border-t border-gray-200">
                              <span className="text-[10px] text-gray-400">Status</span>
                              <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full",exc.status==="Resolved"?"bg-green-50 text-green-600":"bg-amber-50 text-amber-600")}>{exc.status}</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-2.5">Timeline</p>
                            <div className="space-y-2.5">
                              {[
                                {t:"Exception flagged by system",d:exc.date+" · Automated",c:"#EF4444"},
                                {t:`Assigned to ${exc.hr}`,d:exc.date+" · Auto-assign",c:"#F59E0B"},
                                ...(exc.status==="Resolved"
                                  ? [{t:`Resolved: ${exc.resolution}`,d:"Manual review",c:"#22C55E"}]
                                  : [{t:"Awaiting HR resolution",d:"Pending",c:"#9CA3AF"}]
                                ),
                              ].map((step,i)=>(
                                <div key={i} className="flex items-start gap-2.5">
                                  <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{backgroundColor:step.c}}/>
                                  <div><p className="text-[10px] font-medium text-gray-700">{step.t}</p><p className="text-[9px] text-gray-400 mt-0.5">{step.d}</p></div>
                                </div>
                              ))}
                            </div>
                          </div>
                          {exc.status==="Pending"&&(
                            <div className="pt-3 border-t border-gray-100 space-y-2">
                              <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">Resolve</p>
                              <textarea rows={2} placeholder="Enter resolution note…" className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#5C5CFF] resize-none"/>
                              <div className="flex gap-2">
                                <button className="flex-1 px-3 py-2 bg-[#5C5CFF] text-white text-xs font-medium rounded-lg hover:bg-[#4A4AE0]">Mark Resolved</button>
                                <button className="flex-1 px-3 py-2 border border-gray-200 text-xs text-gray-600 rounded-lg hover:bg-gray-50">Escalate</button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* ── ANALYTICS (team) ── */}
              {attTeamView==="analytics" && (<>
                {/* Chart type switcher */}
                <div className="bg-white border border-gray-200 rounded-xl p-1 flex gap-0.5 flex-wrap">
                  {["Daily Attendance","Weekly Trend","Monthly Trend","WFH Trend","Overtime Trend","Late Arrival Trend"].map(c=>(
                    <button key={c} onClick={()=>setAttAnalChart(c)} className={cn("px-3 py-2 text-xs font-medium rounded-lg transition-colors flex-1 min-w-max",attAnalChart===c?"bg-[#5C5CFF] text-white":"text-gray-600 hover:bg-gray-100")}>{c}</button>
                  ))}
                </div>
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-800">{attAnalChart}</h3>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {["7D","30D","90D","1Y"].map(r=>(
                          <button key={r} className="px-2 py-1 text-[10px] border border-gray-200 rounded text-gray-500 hover:border-[#5C5CFF]/40 hover:text-[#5C5CFF] transition-colors">{r}</button>
                        ))}
                      </div>
                      <button className="flex items-center gap-1 px-2 py-1 text-[10px] text-gray-500 border border-gray-200 rounded hover:bg-gray-50"><Download size={10}/>Export</button>
                    </div>
                  </div>
                  <div className="p-5">
                    {(attAnalChart==="Daily Attendance"||attAnalChart==="Weekly Trend")&&(
                      <ResponsiveContainer width="100%" height={240}>
                        <RBarChart data={ATT_DAILY_DATA} barSize={22} margin={{top:4,right:4,left:-20,bottom:0}}>
                          <CartesianGrid key="cg-tan1" strokeDasharray="3 3" vertical={false} stroke="#f3f4f6"/>
                          <XAxis key="x-tan1" dataKey="day" tick={{fontSize:9,fill:"#9CA3AF"}} axisLine={false} tickLine={false}/>
                          <YAxis key="y-tan1" tick={{fontSize:9,fill:"#9CA3AF"}} axisLine={false} tickLine={false} unit="%"/>
                          <Tooltip key="tip-tan1" contentStyle={{fontSize:11,borderRadius:8,border:"1px solid #e5e7eb"}}/>
                          <Legend key="leg-tan1" iconSize={8} iconType="circle" wrapperStyle={{fontSize:10}}/>
                          <Bar key="bar-tpresent" dataKey="present" stackId="a" fill="#22C55E" radius={[0,0,0,0]} name="Present %"/>
                          <Bar key="bar-tlate"    dataKey="late"    stackId="a" fill="#F59E0B" radius={[0,0,0,0]} name="Late %"/>
                          <Bar key="bar-tabsent"  dataKey="absent"  stackId="a" fill="#EF4444" radius={[4,4,0,0]} name="Absent %"/>
                        </RBarChart>
                      </ResponsiveContainer>
                    )}
                    {attAnalChart==="Monthly Trend"&&(
                      <ResponsiveContainer width="100%" height={240}>
                        <RLineChart data={ATT_YEAR_DATA} margin={{top:4,right:4,left:-20,bottom:0}}>
                          <CartesianGrid key="cg-tan2" strokeDasharray="3 3" vertical={false} stroke="#f3f4f6"/>
                          <XAxis key="x-tan2" dataKey="month" tick={{fontSize:9,fill:"#9CA3AF"}} axisLine={false} tickLine={false}/>
                          <YAxis key="y-tan2" domain={[80,100]} tick={{fontSize:9,fill:"#9CA3AF"}} axisLine={false} tickLine={false} unit="%"/>
                          <Tooltip key="tip-tan2" contentStyle={{fontSize:11,borderRadius:8,border:"1px solid #e5e7eb"}}/>
                          <Legend key="leg-tan2" iconSize={8} iconType="circle" wrapperStyle={{fontSize:10}}/>
                          <Line key="line-trate" type="monotone" dataKey="rate" stroke="#5C5CFF" strokeWidth={2.5} dot={{r:4,fill:"#5C5CFF"}} name="Attendance Rate %"/>
                        </RLineChart>
                      </ResponsiveContainer>
                    )}
                    {attAnalChart==="WFH Trend"&&(
                      <ResponsiveContainer width="100%" height={240}>
                        <AreaChart data={ATT_YEAR_DATA} margin={{top:4,right:4,left:-20,bottom:0}}>
                          <CartesianGrid key="cg-tan3" strokeDasharray="3 3" vertical={false} stroke="#f3f4f6"/>
                          <XAxis key="x-tan3" dataKey="month" tick={{fontSize:9,fill:"#9CA3AF"}} axisLine={false} tickLine={false}/>
                          <YAxis key="y-tan3" tick={{fontSize:9,fill:"#9CA3AF"}} axisLine={false} tickLine={false}/>
                          <Tooltip key="tip-tan3" contentStyle={{fontSize:11,borderRadius:8,border:"1px solid #e5e7eb"}}/>
                          <Legend key="leg-tan3" iconSize={8} iconType="circle" wrapperStyle={{fontSize:10}}/>
                          <Area key="area-twfh" type="monotone" dataKey="wfh" stroke="#3B82F6" fill="#DBEAFE" strokeWidth={2} name="WFH Days"/>
                        </AreaChart>
                      </ResponsiveContainer>
                    )}
                    {attAnalChart==="Overtime Trend"&&(
                      <ResponsiveContainer width="100%" height={240}>
                        <RBarChart data={ATT_YEAR_DATA} barSize={30} margin={{top:4,right:4,left:-20,bottom:0}}>
                          <CartesianGrid key="cg-tan4" strokeDasharray="3 3" vertical={false} stroke="#f3f4f6"/>
                          <XAxis key="x-tan4" dataKey="month" tick={{fontSize:9,fill:"#9CA3AF"}} axisLine={false} tickLine={false}/>
                          <YAxis key="y-tan4" tick={{fontSize:9,fill:"#9CA3AF"}} axisLine={false} tickLine={false} unit="h"/>
                          <Tooltip key="tip-tan4" contentStyle={{fontSize:11,borderRadius:8,border:"1px solid #e5e7eb"}}/>
                          <Bar key="bar-tot" dataKey="ot" radius={[4,4,0,0]} name="Overtime Hours">
                            {ATT_YEAR_DATA.map((_,i)=><Cell key={`tot-${i}`} fill="#EC4899"/>)}
                          </Bar>
                        </RBarChart>
                      </ResponsiveContainer>
                    )}
                    {attAnalChart==="Late Arrival Trend"&&(
                      <ResponsiveContainer width="100%" height={240}>
                        <RLineChart data={ATT_YEAR_DATA} margin={{top:4,right:4,left:-20,bottom:0}}>
                          <CartesianGrid key="cg-tan5" strokeDasharray="3 3" vertical={false} stroke="#f3f4f6"/>
                          <XAxis key="x-tan5" dataKey="month" tick={{fontSize:9,fill:"#9CA3AF"}} axisLine={false} tickLine={false}/>
                          <YAxis key="y-tan5" tick={{fontSize:9,fill:"#9CA3AF"}} axisLine={false} tickLine={false}/>
                          <Tooltip key="tip-tan5" contentStyle={{fontSize:11,borderRadius:8,border:"1px solid #e5e7eb"}}/>
                          <Legend key="leg-tan5" iconSize={8} iconType="circle" wrapperStyle={{fontSize:10}}/>
                          <Line key="line-tlate" type="monotone" dataKey="late" stroke="#F59E0B" strokeWidth={2.5} dot={{r:4,fill:"#F59E0B"}} name="Late Arrivals"/>
                          <Line key="line-tabsent" type="monotone" dataKey="absent" stroke="#EF4444" strokeWidth={2} dot={{r:3,fill:"#EF4444"}} strokeDasharray="4 2" name="Absent Days"/>
                        </RLineChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3"><TrendingUp size={14} className="text-green-500"/><h4 className="text-xs font-semibold text-gray-700">Best Month</h4></div>
                    <div className="space-y-2">
                      {[["Attendance","Mar · 93%"],["Fewest Late","Jul · 4"],["Most WFH","Jul · 25 days"]].map(([k,v])=>(
                        <div key={k} className="flex items-center justify-between"><span className="text-[10px] text-gray-500">{k}</span><span className="text-[10px] font-semibold text-gray-800">{v}</span></div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3"><TrendingDown size={14} className="text-red-500"/><h4 className="text-xs font-semibold text-gray-700">Needs Attention</h4></div>
                    <div className="space-y-2">
                      {[["Lowest Att.","Apr · 87%"],["Most Late","Apr · 9"],["Most Absent","Apr · 13 days"]].map(([k,v])=>(
                        <div key={k} className="flex items-center justify-between"><span className="text-[10px] text-gray-500">{k}</span><span className="text-[10px] font-semibold text-red-600">{v}</span></div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3"><Activity size={14} className="text-[#5C5CFF]"/><h4 className="text-xs font-semibold text-gray-700">YTD Summary</h4></div>
                    <div className="space-y-2">
                      {[["Avg Rate","91.0%"],["Total Late","34"],["Total OT","133h"]].map(([k,v])=>(
                        <div key={k} className="flex items-center justify-between"><span className="text-[10px] text-gray-500">{k}</span><span className="text-[10px] font-semibold text-gray-800">{v}</span></div>
                      ))}
                    </div>
                  </div>
                </div>
              </>)}

            </div>
            )}
            {/* end My Team */}

          </div>
        )}

        {/* ════════════════════ LEAVE ════════════════════ */}
        {tab === "Leave" && (
          <div className="flex flex-col h-full">
            {!hideLeaveHeader && (
              <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-2 flex-shrink-0 flex-wrap">
                <div className="flex gap-1">
                  {["Balance","Requests","Calendar","Analytics","Status"].map(v=>(
                    <button key={v} onClick={()=>setLeaveView(v)} className={cn("px-3 py-1.5 text-xs font-medium rounded-lg transition-colors",leaveView===v?"bg-[#EEF2FF] text-[#5C5CFF]":"text-gray-600 hover:bg-gray-100")}>{v}</button>
                  ))}
                </div>
                <div className="ml-auto flex items-center gap-2">
                  {/* Type filter */}
                  <select value={leaveTypeFilter} onChange={e=>setLeaveTypeFilter(e.target.value)} className="px-2.5 py-1.5 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-[#5C5CFF]">
                    {["All","Annual Leave","Sick Leave","Casual Leave","Unpaid Leave","Compensatory"].map(t=><option key={t}>{t}</option>)}
                  </select>
                  {/* Export */}
                  <div className="relative">
                    <button onClick={()=>setShowLeaveExport(v=>!v)} className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
                      <Download size={12}/>Export
                    </button>
                    {showLeaveExport&&(
                      <div className="absolute top-full right-0 mt-1 w-40 bg-white border border-gray-200 rounded-xl shadow-lg z-40 py-1">
                        {["Excel (.xlsx)","CSV (.csv)","PDF Report"].map(fmt=>(
                          <button key={fmt} onClick={()=>setShowLeaveExport(false)} className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2"><Download size={10} className="text-gray-400"/>{fmt}</button>
                        ))}
                      </div>
                    )}
                  </div>
                  <button onClick={()=>setShowApplyLeave(true)} className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#5C5CFF] text-white text-xs font-semibold rounded-lg hover:bg-[#4A4AE0]"><Plus size={13}/>Apply Leave</button>
                </div>
              </div>
            )}

            <div className="flex-1 overflow-auto p-5 max-w-4xl mx-auto w-full space-y-4">

              {/* ── BALANCE ── */}
              {leaveView === "Balance" && (<>
                <div className="grid grid-cols-3 gap-4">
                  {[{type:"Annual Leave",used:12,total:18,color:"#5C5CFF",upcoming:"Jul 5–9 · 5 days booked"},{type:"Sick Leave",used:2,total:10,color:"#EF4444",upcoming:"No upcoming"},{type:"Casual Leave",used:1,total:6,color:"#22C55E",upcoming:"No upcoming"}].map(l=>(
                    <div key={l.type} className="bg-white border border-gray-200 rounded-xl p-5">
                      <div className="flex items-center justify-between mb-3"><h4 className="text-sm font-semibold text-gray-800">{l.type}</h4><span className="text-lg font-bold text-gray-900">{l.total-l.used}<span className="text-sm text-gray-400 font-normal">/{l.total}</span></span></div>
                      <div className="mb-3"><div className="flex justify-between text-[10px] text-gray-400 mb-1"><span>Used: {l.used}d</span><span>Remaining: {l.total-l.used}d</span></div><div className="w-full bg-gray-100 rounded-full h-2"><div className="h-2 rounded-full" style={{width:`${(l.used/l.total)*100}%`,backgroundColor:l.color}}/></div></div>
                      <p className="text-[10px] text-gray-400">{l.upcoming}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-800">Leave History</h3>
                    <button onClick={()=>setShowLeaveExport(v=>!v)} className="text-xs text-gray-500 flex items-center gap-1"><Download size={12}/>Export</button>
                  </div>
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>{["Type","From","To","Days","Applied","Approver","Status",""].map(h=><th key={h} className="px-5 py-2.5 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{h}</th>)}</tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {myLeaveHist.filter(r=>leaveTypeFilter==="All"||r.type===leaveTypeFilter).map(r=>(
                        <tr key={r.id} onClick={()=>setLeaveDetailId2(r.id)} className={cn("hover:bg-gray-50 cursor-pointer transition-colors",leaveDetailId2===r.id&&"bg-[#EEF2FF]")}>
                          <td className="px-5 py-3 text-xs font-medium text-gray-800">{r.type}</td>
                          <td className="px-5 py-3 text-xs text-gray-600">{r.from}</td>
                          <td className="px-5 py-3 text-xs text-gray-600">{r.to}</td>
                          <td className="px-5 py-3 text-xs font-semibold text-gray-800">{r.days}</td>
                          <td className="px-5 py-3 text-xs text-gray-400">{r.applied}</td>
                          <td className="px-5 py-3 text-xs text-gray-600">{r.approver}</td>
                          <td className="px-5 py-3"><StatusBadge status={r.status}/></td>
                          <td className="px-5 py-3">
                            {r.status==="Pending"&&(
                              <div className="flex gap-1">
                                <button onClick={e=>{e.stopPropagation();confirmLeaveApprove(r.id);}} className="px-2 py-1 bg-green-50 border border-green-200 text-green-700 text-[9px] font-medium rounded hover:bg-green-100">Approve</button>
                                <button onClick={e=>{e.stopPropagation();setLeaveRejectModal(r.id);}} className="px-2 py-1 bg-red-50 border border-red-200 text-red-700 text-[9px] font-medium rounded hover:bg-red-100">Reject</button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Leave Detail Drawer */}
                {leaveDetailId2 && (() => {
                  const lr = myLeaveHist.find(r=>r.id===leaveDetailId2);
                  if (!lr) return null;
                  return (
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                      <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-gray-800">Leave Details</h3>
                        <button onClick={()=>setLeaveDetailId2(null)}><X size={14} className="text-gray-400 hover:text-gray-600"/></button>
                      </div>
                      <div className="p-5 grid grid-cols-2 gap-5">
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                            <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] flex items-center justify-center flex-shrink-0"><CalendarDays size={18} className="text-[#5C5CFF]"/></div>
                            <div><p className="text-sm font-semibold text-gray-800">{lr.type}</p><p className="text-[10px] text-gray-400">{lr.from} → {lr.to} · {lr.days} working days</p></div>
                            <StatusBadge status={lr.status}/>
                          </div>
                          {([["Applied on",lr.applied],["Approver",lr.approver],["Reason",lr.reason]] as [string,string][]).map(([k,v])=>(
                            <div key={k}><p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1">{k}</p><p className="text-xs text-gray-700">{v}</p></div>
                          ))}
                          {lr.status==="Rejected"&&lr.rejectReason&&(
                            <div className="bg-red-50 border border-red-100 rounded-xl p-3">
                              <p className="text-[10px] font-semibold text-red-600 uppercase tracking-wide mb-1">Rejection Reason</p>
                              <p className="text-xs text-red-700">{lr.rejectReason}</p>
                            </div>
                          )}
                          {lr.attachment&&<div className="flex items-center gap-2 text-xs text-[#5C5CFF]"><FileText size={12}/>Supporting document attached</div>}
                        </div>
                        <div className="space-y-3">
                          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Approval Timeline</p>
                          <div className="space-y-3">
                            {[
                              {t:"Request submitted",d:lr.applied,c:"#5C5CFF"},
                              {t:`Assigned to ${lr.approver}`,d:lr.applied,c:"#F59E0B"},
                              ...(lr.status==="Approved"
                                ? [{t:"Approved",d:"Auto-processed",c:"#22C55E"}]
                                :lr.status==="Rejected"
                                ? [{t:"Rejected",d:"Manual review",c:"#EF4444"}]
                                : [{t:"Awaiting approval",d:"Pending",c:"#9CA3AF"}]
                              ),
                            ].map((step,i)=>(
                              <div key={i} className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full mt-1 flex-shrink-0" style={{backgroundColor:step.c}}/>
                                <div><p className="text-xs font-medium text-gray-700">{step.t}</p><p className="text-[10px] text-gray-400">{step.d}</p></div>
                              </div>
                            ))}
                          </div>
                          {lr.comment&&(
                            <div className="mt-3 bg-gray-50 rounded-xl p-3">
                              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1">Approver Comment</p>
                              <p className="text-xs text-gray-600 italic">"{lr.comment}"</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </>)}

              {/* ── REQUESTS ── */}
              {leaveView === "Requests" && (
                <div className="space-y-3">
                  {myLeaveHist.filter(r=>leaveTypeFilter==="All"||r.type===leaveTypeFilter).map(r=>(
                    <div key={r.id} onClick={()=>setLeaveDetailId2(leaveDetailId2===r.id?null:r.id)} className={cn("bg-white border rounded-xl p-4 flex items-start gap-4 cursor-pointer hover:shadow-sm transition-all",leaveDetailId2===r.id?"border-[#5C5CFF] bg-[#EEF2FF]/30":"border-gray-200 hover:border-[#5C5CFF]/30")}>
                      <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] flex items-center justify-center flex-shrink-0"><CalendarDays size={18} className="text-[#5C5CFF]"/></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className="text-sm font-semibold text-gray-800">{r.type}</p>
                          <StatusBadge status={r.status}/>
                        </div>
                        <p className="text-xs text-gray-500">{r.from} → {r.to} · {r.days} days · Approver: {r.approver}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">Applied {r.applied}</p>
                        {r.status==="Rejected"&&r.rejectReason&&(
                          <div className="mt-2 bg-red-50 border border-red-100 rounded-lg px-2.5 py-1.5">
                            <p className="text-[9px] font-semibold text-red-600 uppercase tracking-wide mb-0.5">Rejected</p>
                            <p className="text-[10px] text-red-700">{r.rejectReason}</p>
                          </div>
                        )}
                      </div>
                      {r.status==="Pending"&&(
                        <div className="flex gap-1 flex-shrink-0" onClick={e=>e.stopPropagation()}>
                          <button onClick={()=>confirmLeaveApprove(r.id)} className="px-2.5 py-1.5 bg-green-50 border border-green-200 text-green-700 text-[10px] font-medium rounded-lg hover:bg-green-100">Approve</button>
                          <button onClick={()=>setLeaveRejectModal(r.id)} className="px-2.5 py-1.5 bg-red-50 border border-red-200 text-red-700 text-[10px] font-medium rounded-lg hover:bg-red-100">Reject</button>
                        </div>
                      )}
                    </div>
                  ))}
                  <button onClick={()=>setShowApplyLeave(true)} className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-sm text-[#5C5CFF] hover:border-[#5C5CFF]/40 flex items-center justify-center gap-2 font-medium"><Plus size={14}/>Apply for Leave</button>
                </div>
              )}

              {/* ── CALENDAR ── */}
              {leaveView === "Calendar" && (
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-800">Leave Calendar · 2024</h3>
                    <div className="flex items-center gap-1.5">
                      <button className="p-1.5 hover:bg-gray-100 rounded"><ChevronLeft size={14}/></button>
                      <span className="text-xs font-semibold text-gray-700 w-20 text-center">July 2024</span>
                      <button className="p-1.5 hover:bg-gray-100 rounded"><ChevronRight size={14}/></button>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-7 gap-1 mb-2">{["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d=><div key={d} className="text-center text-[10px] font-semibold text-gray-400 py-1">{d}</div>)}</div>
                    <div className="grid grid-cols-7 gap-1">
                      {["","","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"].map((d,i)=>{
                        const isLeave=["5","6","7","8","9"].includes(d);const isToday=d==="1";
                        return <div key={i} className={cn("h-12 flex flex-col items-center justify-start pt-1.5 rounded-lg text-xs transition-colors",isToday?"bg-[#5C5CFF] text-white":isLeave?"bg-[#EEF2FF] text-[#5C5CFF]":"hover:bg-gray-50 text-gray-600",!d&&"pointer-events-none")}>
                          <span className="font-semibold">{d}</span>
                          {isLeave&&d&&<span className="text-[8px] mt-0.5 text-[#5C5CFF]/70">Leave</span>}
                        </div>;
                      })}
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-3">Upcoming Leaves</p>
                      <div className="space-y-2">
                        {myLeaveHist.filter(r=>r.status!=="Rejected").map(r=>(
                          <div key={r.id} className="flex items-center gap-3">
                            <div className="w-1.5 h-6 rounded-full" style={{backgroundColor:r.type==="Annual Leave"?"#5C5CFF":r.type==="Sick Leave"?"#EF4444":"#22C55E"}}/>
                            <div className="flex-1">
                              <p className="text-xs font-medium text-gray-700">{r.type}</p>
                              <p className="text-[10px] text-gray-400">{r.from} – {r.to} · {r.days}d</p>
                            </div>
                            <StatusBadge status={r.status}/>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── ANALYTICS ── */}
              {leaveView === "Analytics" && (<>
                {/* Type Distribution + Monthly Trend */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <div className="px-5 py-3 border-b border-gray-100"><h3 className="text-xs font-semibold text-gray-700">Leave Type Distribution</h3></div>
                    <div className="p-4 flex items-center gap-4">
                      <ResponsiveContainer width={140} height={140}>
                        <PieChart>
                          <Pie key="pie-leave" data={LEAVE_TYPE_DIST} cx="50%" cy="50%" innerRadius={35} outerRadius={62} dataKey="value" paddingAngle={2}>
                            {LEAVE_TYPE_DIST.map((e,i)=><Cell key={`lc-${i}`} fill={e.color}/>)}
                          </Pie>
                          <Tooltip key="tip-pie-leave" formatter={(v:number)=>[`${v} days`,"Days"]} contentStyle={{fontSize:11,borderRadius:8,border:"1px solid #e5e7eb"}}/>
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="flex-1 space-y-1.5">
                        {LEAVE_TYPE_DIST.map(d=>(
                          <div key={d.name} className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{backgroundColor:d.color}}/>
                            <span className="text-[10px] text-gray-600 flex-1">{d.name}</span>
                            <span className="text-[10px] font-semibold text-gray-800">{d.value}d</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <div className="px-5 py-3 border-b border-gray-100"><h3 className="text-xs font-semibold text-gray-700">Monthly Leave Trend</h3></div>
                    <div className="p-4">
                      <ResponsiveContainer width="100%" height={150}>
                        <RBarChart data={LEAVE_MONTHLY_DATA} barSize={12} margin={{top:4,right:4,left:-25,bottom:0}}>
                          <CartesianGrid key="cg-lv1" strokeDasharray="3 3" vertical={false} stroke="#f3f4f6"/>
                          <XAxis key="x-lv1" dataKey="month" tick={{fontSize:9,fill:"#9CA3AF"}} axisLine={false} tickLine={false}/>
                          <YAxis key="y-lv1" tick={{fontSize:9,fill:"#9CA3AF"}} axisLine={false} tickLine={false}/>
                          <Tooltip key="tip-lv1" contentStyle={{fontSize:11,borderRadius:8,border:"1px solid #e5e7eb"}}/>
                          <Legend key="leg-lv1" iconSize={7} iconType="circle" wrapperStyle={{fontSize:9}}/>
                          <Bar key="bar-lv-total" dataKey="leaves" stackId="a" fill="#5C5CFF" name="Total"/>
                          <Bar key="bar-lv-sick" dataKey="sick" stackId="a" fill="#EF4444" name="Sick"/>
                          <Bar key="bar-lv-casual" dataKey="casual" stackId="a" fill="#22C55E" radius={[4,4,0,0]} name="Casual"/>
                        </RBarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Department Comparison removed for personal workspace */}

                {/* Balance Utilization */}
                <div className="bg-white border border-gray-200 rounded-xl p-5">
                  <h3 className="text-sm font-semibold text-gray-800 mb-4">Balance Utilization</h3>
                  <div className="space-y-3">
                    {LEAVE_TYPE_DIST.map(lt=>(
                      <div key={lt.name} className="flex items-center gap-3">
                        <span className="text-xs text-gray-600 w-28 flex-shrink-0">{lt.name}</span>
                        <div className="flex-1 bg-gray-100 rounded-full h-2">
                          <div className="h-2 rounded-full transition-all" style={{width:`${(lt.value/50)*100}%`,backgroundColor:lt.color}}/>
                        </div>
                        <span className="text-[10px] font-semibold text-gray-700 w-12 text-right">{lt.value} days</span>
                        <span className="text-[10px] text-gray-400 w-8">{Math.round((lt.value/100)*100)}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>)}

              {/* ── STATUS ── */}
              {leaveView === "Status" && (<>
                {/* Upcoming leaves */}
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <div className="px-5 py-3.5 border-b border-gray-100"><h3 className="text-sm font-semibold text-gray-800">Upcoming This Month</h3></div>
                  <div className="divide-y divide-gray-100">
                    {myLeaveHist.filter(r=>r.status==="Pending"||r.status==="Approved").map(r=>(
                      <div key={r.id} onClick={()=>setLeaveDetailId2(r.id)} className="px-5 py-3.5 flex items-center gap-3 hover:bg-gray-50 cursor-pointer transition-colors">
                        <div className="w-2 h-8 rounded-full flex-shrink-0" style={{backgroundColor:r.type==="Annual Leave"?"#5C5CFF":r.type==="Sick Leave"?"#EF4444":"#22C55E"}}/>
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-gray-800">{r.type}</p>
                          <p className="text-[10px] text-gray-400">{r.from} → {r.to} · {r.days} days</p>
                        </div>
                        <StatusBadge status={r.status}/>
                        {r.status==="Pending"&&(
                          <div className="flex gap-1" onClick={e=>e.stopPropagation()}>
                            <button onClick={()=>confirmLeaveApprove(r.id)} className="px-2 py-1 bg-green-50 border border-green-200 text-green-700 text-[9px] font-medium rounded hover:bg-green-100">Approve</button>
                            <button onClick={()=>setLeaveRejectModal(r.id)} className="px-2 py-1 bg-red-50 border border-red-200 text-red-700 text-[9px] font-medium rounded hover:bg-red-100">Reject</button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Summary stats */}
                <div className="max-w-md mx-auto w-full">
                  <div className="bg-white border border-gray-200 rounded-xl p-5">
                    <h3 className="text-xs font-semibold text-gray-700 mb-3 text-center">Leave Distribution This Month</h3>
                    <ResponsiveContainer width="100%" height={180}>
                      <PieChart>
                        <Pie key="pie-status" data={LEAVE_TYPE_DIST} cx="50%" cy="50%" outerRadius={72} dataKey="value" paddingAngle={2} label={({name,percent})=>`${name.split(" ")[0]} ${(percent*100).toFixed(0)}%`} labelLine={false}>
                          {LEAVE_TYPE_DIST.map((e,i)=><Cell key={`sc-${i}`} fill={e.color}/>)}
                        </Pie>
                        <Tooltip key="tip-pie-status" formatter={(v:number)=>[`${v} days`,"Days"]} contentStyle={{fontSize:11,borderRadius:8,border:"1px solid #e5e7eb"}}/>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </>)}

            </div>
          </div>
        )}

        {/* ════════════════════ TASKS — Jira-style ════════════════════ */}
        {tab === "Tasks" && (
          <div className="flex h-full overflow-hidden">
            {/* Kanban Board */}
            <div className={cn("flex flex-col", activeTask ? "w-[60%] flex-shrink-0 border-r border-gray-200" : "flex-1")}>
              {/* Toolbar */}
              <div className="bg-white border-b border-gray-200 px-5 py-2.5 flex items-center gap-2 flex-shrink-0">
                <div className="relative">
                  <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input value={taskSearch} onChange={e => setTaskSearch(e.target.value)} placeholder="Search tasks…" className="pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#5C5CFF] w-52" />
                </div>
                <div className="relative">
                  <button onClick={() => setShowTaskFilters(v => !v)} className={cn("flex items-center gap-1.5 px-2.5 py-1.5 text-xs border rounded-lg transition-colors", showTaskFilters||taskPriFilter!=="All"?"border-[#5C5CFF] bg-[#EEF2FF] text-[#5C5CFF]":"border-gray-200 text-gray-600 hover:bg-gray-50")}>
                    <Filter size={12} />Filter{taskPriFilter!=="All"&&<span className="w-4 h-4 bg-[#5C5CFF] text-white text-[9px] rounded-full flex items-center justify-center">1</span>}
                  </button>
                  {showTaskFilters && (
                    <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-gray-200 rounded-xl shadow-lg z-20 py-1">
                      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide px-3 pt-2 pb-1">Priority</p>
                      {["All","High","Medium","Low"].map(p => (
                        <button key={p} onClick={() => { setTaskPriFilter(p); setShowTaskFilters(false); }} className={cn("w-full text-left px-3 py-1.5 text-xs hover:bg-gray-50", taskPriFilter===p?"text-[#5C5CFF] font-semibold":"text-gray-700")}>{p}</button>
                      ))}
                    </div>
                  )}
                </div>
                <button onClick={() => setShowNewTask(v => !v)} className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-[#5C5CFF] text-white text-xs font-medium rounded-lg hover:bg-[#4A4AE0]"><Plus size={12} />Create Task</button>
              </div>

              {/* Inline create */}
              {showNewTask && (
                <div className="px-5 py-3 border-b border-gray-100 bg-amber-50/40 flex items-center gap-2 flex-shrink-0">
                  <input autoFocus value={newTaskTitle} onChange={e => setNewTaskTitle(e.target.value)} onKeyDown={e => e.key==="Enter" && createTask()} placeholder="Task title… (Enter to save)" className="flex-1 px-3 py-1.5 text-sm border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C5CFF] bg-white" />
                  <button onClick={createTask} className="px-3 py-1.5 bg-[#5C5CFF] text-white text-xs font-medium rounded-lg">Save</button>
                  <button onClick={() => { setShowNewTask(false); setNewTaskTitle(""); }} className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg"><X size={14} /></button>
                </div>
              )}

              {/* Kanban Columns */}
              <div className="flex-1 overflow-x-auto overflow-y-hidden">
                <div className="flex gap-4 p-4 h-full min-w-max">
                  {([
                    {id:"Assigned",   label:"Assigned",    color:"#6366F1", bg:"bg-indigo-50",   tasks: myTasks.filter(t=>!t.done&&!t.overdue&&t.status==="Assigned")},
                    {id:"In Progress",label:"In Progress", color:"#3B82F6", bg:"bg-blue-50",     tasks: myTasks.filter(t=>!t.done&&!t.overdue&&t.status==="In Progress")},
                    {id:"Completed",  label:"Completed",   color:"#22C55E", bg:"bg-green-50",    tasks: myTasks.filter(t=>t.done)},
                    {id:"Overdue",    label:"Overdue",     color:"#EF4444", bg:"bg-red-50",      tasks: myTasks.filter(t=>t.overdue&&!t.done)},
                    {id:"Archived",   label:"Archived",    color:"#9CA3AF", bg:"bg-gray-100",    tasks: []},
                  ] as {id:string;label:string;color:string;bg:string;tasks:typeof myTasks}[]).map(col => {
                    const colTasks = taskSearch || taskPriFilter!=="All"
                      ? col.tasks.filter(t =>
                          (!taskSearch || t.title.toLowerCase().includes(taskSearch.toLowerCase())) &&
                          (taskPriFilter==="All" || t.priority===taskPriFilter))
                      : col.tasks;
                    return (
                      <div key={col.id} className="w-64 flex-shrink-0 flex flex-col bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                        {/* Column header */}
                        <div className="flex items-center justify-between px-3 py-2.5 border-b border-gray-200 bg-white">
                          <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{backgroundColor:col.color}}/>
                            <span className="text-xs font-semibold text-gray-700">{col.label}</span>
                            <span className="min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold flex items-center justify-center" style={{backgroundColor:col.color+"1A",color:col.color}}>{colTasks.length}</span>
                          </div>
                          <button className="p-1 rounded hover:bg-gray-100 text-gray-400"><Plus size={12}/></button>
                        </div>
                        {/* Cards */}
                        <div className="flex-1 overflow-y-auto p-2 space-y-2">
                          {colTasks.length===0 && (
                            <div className="py-6 flex flex-col items-center justify-center text-gray-300">
                              <CheckCircle size={20} className="mb-1"/>
                              <span className="text-[10px]">No tasks</span>
                            </div>
                          )}
                          {colTasks.map(t => (
                            <div key={t.id} onClick={() => setActiveTaskId(activeTaskId===t.id?null:t.id)}
                              className={cn("bg-white border rounded-xl p-3 cursor-pointer hover:shadow-sm transition-all group",
                                activeTaskId===t.id?"border-[#5C5CFF] shadow-sm ring-1 ring-[#5C5CFF]/20":"border-gray-200 hover:border-gray-300")}>
                              {/* Priority badge */}
                              <div className="flex items-start justify-between gap-1 mb-2">
                                <span className={cn("text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wide",
                                  t.priority==="High"?"bg-red-50 text-red-500":t.priority==="Medium"?"bg-amber-50 text-amber-500":"bg-gray-100 text-gray-400")}>
                                  {t.priority}
                                </span>
                                <button onClick={e=>{e.stopPropagation();toggleTask(t.id);}} className={cn("opacity-0 group-hover:opacity-100 p-0.5 rounded transition-all",t.done?"text-green-500":"text-gray-300 hover:text-green-500")}><Check size={12}/></button>
                              </div>
                              <p className={cn("text-xs font-medium text-gray-800 leading-snug mb-2", t.done&&"line-through text-gray-400")}>{t.title}</p>
                              {taskChecklists[t.id] && (
                                <div className="mb-2">
                                  <div className="flex items-center justify-between mb-1"><span className="text-[9px] text-gray-400">{taskChecklists[t.id].filter(i=>i.done).length}/{taskChecklists[t.id].length} done</span></div>
                                  <div className="h-1 bg-gray-100 rounded-full"><div className="h-1 bg-[#5C5CFF] rounded-full transition-all" style={{width:`${(taskChecklists[t.id].filter(i=>i.done).length/taskChecklists[t.id].length)*100}%`}}/></div>
                                </div>
                              )}
                              <div className="flex items-center justify-between text-[9px] text-gray-400">
                                <div className="flex items-center gap-1"><CalendarDays size={9}/><span className={cn(t.overdue&&!t.done?"text-red-500 font-semibold":"")}>{t.due}</span></div>
                                <div className="flex items-center gap-1"><Avt initials={t.assignee.split(" ").map(n=>n[0]).join("")} color="#5C5CFF" size="xs"/></div>
                              </div>
                              {(taskComments[t.id]||[]).length>0 && (
                                <div className="flex items-center gap-1 mt-1.5 text-[9px] text-gray-300">
                                  <MessageSquare size={9}/><span>{(taskComments[t.id]||[]).length}</span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Task Detail Panel */}
            {activeTask && (
              <div className="flex-1 flex flex-col overflow-hidden bg-white">
                <div className="px-5 py-3.5 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-[10px] font-mono text-gray-400">{activeTask.id}</span>
                    <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded", activeTask.priority==="High"?"bg-red-100 text-red-600":activeTask.priority==="Medium"?"bg-amber-100 text-amber-600":"bg-gray-100 text-gray-500")}>{activeTask.priority}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button onClick={() => toggleTask(activeTask.id)} className={cn("px-2.5 py-1 text-xs font-medium rounded-lg border transition-colors", activeTask.done?"bg-gray-100 border-gray-200 text-gray-500":"bg-green-50 border-green-200 text-green-700 hover:bg-green-100")}>{activeTask.done?"Reopen":"Mark Complete"}</button>
                    <button className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-lg"><MoreHorizontal size={14} /></button>
                    <button onClick={() => setActiveTaskId(null)} className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-lg"><X size={14} /></button>
                  </div>
                </div>
                <div className="flex-1 overflow-auto p-5 space-y-4">
                  <h3 className={cn("text-sm font-semibold text-gray-900", activeTask.done&&"line-through text-gray-400")}>{activeTask.title}</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {([["Status", activeTask.done?"Completed":activeTask.overdue?"Overdue":activeTask.status],["Priority",activeTask.priority],["Due Date",activeTask.due],["Assigned To",activeTask.assignee],["Reporter",activeTask.reporter],["Created",activeTask.created],["Updated",activeTask.updated]] as [string,string][]).map(([k,v]) => (
                      <div key={k} className="bg-gray-50 rounded-lg p-2.5">
                        <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider mb-1">{k}</p>
                        <p className={cn("text-xs font-medium", k==="Status"&&activeTask.overdue&&!activeTask.done?"text-red-600":k==="Status"&&activeTask.done?"text-green-600":"text-gray-800")}>{v}</p>
                      </div>
                    ))}
                  </div>
                  {(taskChecklists[activeTask.id]||[]).length > 0 && (
                    <div className="bg-white border border-gray-200 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3"><p className="text-xs font-semibold text-gray-700">Checklist</p><span className="text-[10px] text-gray-400">{taskChecklists[activeTask.id].filter(i=>i.done).length}/{taskChecklists[activeTask.id].length}</span></div>
                      <div className="w-full h-1 bg-gray-100 rounded-full mb-3"><div className="h-1 bg-[#5C5CFF] rounded-full" style={{ width:`${(taskChecklists[activeTask.id].filter(i=>i.done).length/taskChecklists[activeTask.id].length)*100}%` }} /></div>
                      <div className="space-y-2">
                        {taskChecklists[activeTask.id].map(item => (
                          <label key={item.id} className="flex items-center gap-2.5 cursor-pointer">
                            <input type="checkbox" checked={item.done} onChange={() => toggleChecklist(activeTask.id, item.id)} className="rounded accent-[#5C5CFF]" />
                            <span className={cn("text-sm", item.done?"line-through text-gray-400":"text-gray-700")}>{item.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <p className="text-xs font-semibold text-gray-700 mb-3">Comments</p>
                    <div className="space-y-3 mb-3">
                      {(taskComments[activeTask.id]||[]).map(c => (
                        <div key={c.id} className="flex gap-2.5">
                          <Avt initials={c.author.split(" ").map(n=>n[0]).join("")} color={c.author==="Alex Admin"?"#5C5CFF":"#22C55E"} size="xs" />
                          <div className="flex-1 bg-gray-50 rounded-lg p-2.5">
                            <div className="flex items-center justify-between mb-1"><span className="text-xs font-semibold text-gray-800">{c.author}</span><span className="text-[10px] text-gray-400">{c.time}</span></div>
                            <p className="text-xs text-gray-700">{c.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Avt initials="AA" color="#5C5CFF" size="xs" />
                      <div className="flex-1 flex gap-1.5">
                        <input value={taskComment} onChange={e => setTaskComment(e.target.value)} onKeyDown={e => e.key==="Enter" && addTaskComment(activeTask.id)} placeholder="Comment… (Enter to post)" className="flex-1 px-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C5CFF] bg-gray-50" />
                        <button onClick={() => addTaskComment(activeTask.id)} className="px-2.5 py-1.5 bg-[#5C5CFF] text-white rounded-lg hover:bg-[#4A4AE0]"><Send size={12} /></button>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 pb-2">
                    <Btn size="sm"><Edit size={12} />Edit</Btn>
                    <Btn size="sm" variant="outline"><RefreshCw size={12} />Reassign</Btn>
                    <Btn size="sm" variant="danger"><Trash2 size={12} />Delete</Btn>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ════════════════════ APPROVALS ════════════════════ */}
        {tab === "Approvals" && (
          <div className="flex h-full overflow-hidden">
            {/* List panel */}
            <div className={cn("flex flex-col bg-white", approvalDetailId ? "w-80 flex-shrink-0 border-r border-gray-200" : "flex-1")}>
              <div className="border-b border-gray-200 px-5 py-3 flex items-center gap-2 flex-shrink-0 flex-wrap">
                <div className="flex gap-1">
                  {["Pending","Approved","Rejected"].map(v => (
                    <button key={v} onClick={() => setApprovalView(v)} className={cn("px-3 py-1.5 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors", approvalView===v?"bg-[#EEF2FF] text-[#5C5CFF]":"text-gray-600 hover:bg-gray-100")}>
                      {v}<span className={cn("px-1.5 py-0.5 rounded-full text-[10px] font-semibold", approvalView===v?"bg-[#5C5CFF] text-white":"bg-gray-200 text-gray-500")}>{approvals.filter(a=>a.status===v).length}</span>
                    </button>
                  ))}
                </div>
                {!approvalDetailId && (
                  <div className="flex gap-1 flex-wrap">
                    {["All","Leave","Attendance","Shift","Department"].map(t => (
                      <button key={t} onClick={() => setApprovalType(t)} className={cn("px-2 py-1 text-[10px] font-medium rounded-lg transition-colors", approvalType===t?"text-[#5C5CFF] bg-[#EEF2FF]":"text-gray-400 hover:text-gray-600 hover:bg-gray-100")}>{t}</button>
                    ))}
                  </div>
                )}
                <span className="ml-auto text-[10px] text-gray-400">{filteredApprovals.length} items</span>
              </div>
              <div className="flex-1 overflow-auto divide-y divide-gray-100">
                {filteredApprovals.length === 0 && <div className="py-12 text-center"><CheckCircle size={24} className="text-green-300 mx-auto mb-2" /><p className="text-sm text-gray-400">No {approvalView.toLowerCase()} approvals</p></div>}
                {filteredApprovals.map(a => (
                  <div key={a.id} onClick={() => setApprovalDetailId(approvalDetailId===a.id?null:a.id)}
                    className={cn("flex items-center gap-3 px-5 py-4 hover:bg-gray-50 cursor-pointer transition-colors", approvalDetailId===a.id&&"bg-[#EEF2FF]")}>
                    <Avt initials={a.employee.split(" ").map(n=>n[0]).join("")} color={EMP_COLORS[parseInt(a.id.slice(-1))%EMP_COLORS.length]} size="sm" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-sm font-medium text-gray-800 truncate">{a.employee}</p>
                        <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded font-medium flex-shrink-0">{a.type}</span>
                      </div>
                      <p className="text-xs text-gray-500 truncate">{a.detail}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">Applied {a.applied}</p>
                    </div>
                    {a.status === "Pending" ? <div className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" /> : <StatusBadge status={a.status} />}
                  </div>
                ))}
              </div>
            </div>

            {/* Approval Detail panel */}
            {approvalDetailId && (() => {
              const item = approvals.find(a => a.id === approvalDetailId);
              if (!item) return null;
              const allComments = approvalComments[approvalDetailId] || [];
              const topComments = allComments.filter(c => c.parentId === null);
              return (
                <div className="flex-1 flex flex-col overflow-hidden bg-white border-l border-gray-200">
                  <div className="px-5 py-3.5 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
                    <div className="flex items-center gap-2.5">
                      <Avt initials={item.employee.split(" ").map(n=>n[0]).join("")} color={EMP_COLORS[parseInt(item.id.slice(-1))%EMP_COLORS.length]} size="sm" />
                      <div><p className="text-sm font-semibold text-gray-900">{item.employee}</p><p className="text-xs text-gray-400">{item.dept} · {item.type}</p></div>
                    </div>
                    <div className="flex items-center gap-2"><StatusBadge status={item.status} /><button onClick={() => setApprovalDetailId(null)} className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-lg"><X size={14} /></button></div>
                  </div>
                  <div className="flex-1 overflow-auto p-5 space-y-4">
                    {/* Info grid */}
                    <div className="grid grid-cols-2 gap-2.5">
                      {([["Leave Type",item.leaveType],["Department",item.dept],["Date",item.dateRange],["Days",item.days],["Applied",item.applied],["Status",item.status]] as [string,string][]).map(([k,v]) => (
                        <div key={k} className="bg-gray-50 rounded-lg p-3"><p className="text-[10px] text-gray-400 uppercase tracking-wide mb-1">{k}</p><p className="text-xs font-semibold text-gray-800">{v}</p></div>
                      ))}
                    </div>
                    {/* Reason */}
                    <div className="bg-white border border-gray-200 rounded-xl p-4">
                      <p className="text-xs font-semibold text-gray-700 mb-2">Reason</p>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.reason}</p>
                    </div>
                    {/* Attachment */}
                    <div className="bg-white border border-gray-200 rounded-xl p-4">
                      <p className="text-xs font-semibold text-gray-700 mb-2">Attachment</p>
                      {item.leaveType === "Sick Leave" ? (
                        <div className="flex items-center gap-3 p-2.5 bg-gray-50 rounded-lg border border-gray-200">
                          <FileText size={14} className="text-red-500 flex-shrink-0" />
                          <div className="flex-1"><p className="text-xs font-medium text-gray-700">Medical_Certificate.pdf</p><p className="text-[10px] text-gray-400">0.8 MB</p></div>
                          <button className="text-xs text-[#5C5CFF] flex items-center gap-1 hover:underline"><Download size={11} />Download</button>
                        </div>
                      ) : <p className="text-xs text-gray-400">No attachment required</p>}
                    </div>
                    {/* Approval Timeline */}
                    <div className="bg-white border border-gray-200 rounded-xl p-4">
                      <p className="text-xs font-semibold text-gray-700 mb-3">Approval Timeline</p>
                      <div className="space-y-2">
                        {[
                          { label:"Submitted",      time:`${item.applied} · 9:00 AM`, done:true,                  color:"#5C5CFF" },
                          { label:"Under Review",   time:`${item.applied} · 9:15 AM`, done:true,                  color:"#F59E0B" },
                          { label:item.status==="Pending"?"Awaiting Decision":item.status, time:item.status==="Pending"?"Pending…":"Jul 2 · 10:00 AM", done:item.status!=="Pending", color:item.status==="Approved"?"#22C55E":"#EF4444" },
                        ].map((step,si) => (
                          <div key={si} className="flex items-center gap-3">
                            {step.done
                              ? <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor:step.color }}><Check size={11} className="text-white" /></div>
                              : <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0"><div className="w-2 h-2 rounded-full bg-gray-300" /></div>
                            }
                            <div className="flex-1 flex items-center justify-between">
                              <p className={cn("text-xs font-medium", step.done?"text-gray-800":"text-gray-400")}>{step.label}</p>
                              <p className="text-[10px] text-gray-400">{step.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Comments — full CRUD */}
                    <div className="bg-white border border-gray-200 rounded-xl p-4">
                      <p className="text-xs font-semibold text-gray-700 mb-3">Comments</p>
                      <div className="space-y-3 mb-3">
                        {topComments.length === 0 && <p className="text-xs text-gray-400 text-center py-2">No comments yet</p>}
                        {topComments.map(c => {
                          const replies = allComments.filter(r => r.parentId === c.id);
                          const isEditing = editCommentId === c.id;
                          return (
                            <div key={c.id}>
                              <div className="flex gap-2.5">
                                <Avt initials={c.author.split(" ").map(n=>n[0]).join("")} color={c.isOwn?"#5C5CFF":"#22C55E"} size="xs" />
                                <div className="flex-1">
                                  {isEditing ? (
                                    <div className="bg-gray-50 rounded-lg p-2.5">
                                      <textarea value={editCommentText} onChange={e => setEditCommentText(e.target.value)} rows={2} className="w-full px-2 py-1 text-xs border border-gray-300 rounded-lg bg-white resize-none focus:outline-none focus:ring-1 focus:ring-[#5C5CFF]" />
                                      <div className="flex gap-2 mt-1.5">
                                        <button onClick={() => saveEditComment(approvalDetailId, c.id)} className="px-2 py-1 bg-[#5C5CFF] text-white text-[10px] rounded-lg font-medium">Save</button>
                                        <button onClick={() => { setEditCommentId(null); setEditCommentText(""); }} className="px-2 py-1 text-[10px] text-gray-500 border border-gray-200 rounded-lg">Cancel</button>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="bg-gray-50 rounded-lg p-2.5">
                                      <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs font-semibold text-gray-800">{c.author}</span>
                                        <div className="flex items-center gap-1.5">
                                          <span className="text-[10px] text-gray-400">{fmtTs(c.timestamp)}</span>
                                          {c.edited && <span className="text-[9px] text-gray-400 italic">(edited)</span>}
                                        </div>
                                      </div>
                                      <p className="text-xs text-gray-700">{c.text}</p>
                                      <div className="flex items-center gap-3 mt-2">
                                        <button onClick={() => { setReplyToId(replyToId===c.id?null:c.id); setReplyText(""); }} className="text-[10px] text-gray-400 hover:text-[#5C5CFF] flex items-center gap-1"><CornerDownRight size={10} />Reply</button>
                                        {c.isOwn && <>
                                          <button onClick={() => { setEditCommentId(c.id); setEditCommentText(c.text); }} className="text-[10px] text-gray-400 hover:text-[#5C5CFF]">Edit</button>
                                          <button onClick={() => deleteComment(approvalDetailId, c.id)} className="text-[10px] text-gray-400 hover:text-red-500">Delete</button>
                                        </>}
                                      </div>
                                    </div>
                                  )}
                                  {replies.length > 0 && (
                                    <div className="ml-5 mt-2 space-y-2 border-l-2 border-gray-100 pl-3">
                                      {replies.map(r => (
                                        <div key={r.id} className="flex gap-2">
                                          <Avt initials={r.author.split(" ").map(n=>n[0]).join("")} color={r.isOwn?"#5C5CFF":"#22C55E"} size="xs" />
                                          <div className="flex-1 bg-gray-50 rounded-lg p-2.5">
                                            <div className="flex items-center justify-between mb-1">
                                              <span className="text-xs font-semibold text-gray-800">{r.author}</span>
                                              <div className="flex items-center gap-1.5">
                                                <span className="text-[10px] text-gray-400">{fmtTs(r.timestamp)}</span>
                                                {r.isOwn && <button onClick={() => deleteComment(approvalDetailId, r.id)} className="text-[9px] text-gray-400 hover:text-red-500">Delete</button>}
                                              </div>
                                            </div>
                                            <p className="text-xs text-gray-700">{r.text}</p>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                  {replyToId === c.id && (
                                    <div className="ml-5 mt-2 flex gap-2 border-l-2 border-[#5C5CFF]/20 pl-3">
                                      <Avt initials="AA" color="#5C5CFF" size="xs" />
                                      <div className="flex-1 flex gap-1.5">
                                        <input value={replyText} onChange={e => setReplyText(e.target.value)} onKeyDown={e => e.key==="Enter" && addReply(approvalDetailId, c.id)} placeholder={`Reply to ${c.author}…`} className="flex-1 px-2 py-1 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#5C5CFF] bg-gray-50" />
                                        <button onClick={() => addReply(approvalDetailId, c.id)} className="px-2.5 py-1 bg-[#5C5CFF] text-white rounded-lg text-[10px] font-medium">Reply</button>
                                        <button onClick={() => setReplyToId(null)} className="p-1 text-gray-400 hover:text-gray-600"><X size={12} /></button>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex gap-2">
                        <Avt initials="AA" color="#5C5CFF" size="xs" />
                        <div className="flex-1">
                          <div className="flex gap-1.5">
                            <input value={approvalDraft} onChange={e => setApprovalDraft(e.target.value)} onKeyDown={e => e.key==="Enter" && addApprovalComment(approvalDetailId)} placeholder="Add comment… @mention (Enter to post)" className="flex-1 px-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C5CFF] bg-gray-50" />
                            <button onClick={() => addApprovalComment(approvalDetailId)} className="px-2.5 py-1.5 bg-[#5C5CFF] text-white rounded-lg hover:bg-[#4A4AE0]"><Send size={12} /></button>
                          </div>
                          <p className="text-[9px] text-gray-400 mt-1">Use @ to mention teammates · Enter to post</p>
                        </div>
                      </div>
                    </div>
                    {/* Activity */}
                    <div className="bg-white border border-gray-200 rounded-xl p-4">
                      <p className="text-xs font-semibold text-gray-700 mb-3">Activity</p>
                      <div className="space-y-2.5">
                        {[
                          { actor:"System",     action:"Request created",                 time:`${item.applied} · 9:00 AM`, color:"#9CA3AF" },
                          { actor:"Alex Admin", action:"Assigned to review queue",        time:`${item.applied} · 9:01 AM`, color:"#5C5CFF" },
                          ...(item.status !== "Pending" ? [{ actor:"Alex Admin", action:item.status==="Approved"?"Approved this request":"Rejected this request", time:"Jul 2 · 10:15 AM", color:item.status==="Approved"?"#22C55E":"#EF4444" }] : []),
                        ].map((ev,i) => (
                          <div key={i} className="flex items-start gap-2.5 text-xs">
                            <Avt initials={ev.actor.slice(0,2)} color={ev.color} size="xs" />
                            <div><span className="font-medium text-gray-700">{ev.actor}</span><span className="text-gray-500"> {ev.action}</span><p className="text-[10px] text-gray-400 mt-0.5">{ev.time}</p></div>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Actions */}
                    {item.status === "Pending" && (
                      <div className="flex gap-3">
                        <Btn onClick={() => setAppApproveId(item.id)} className="flex-1 bg-green-600 hover:bg-green-700 justify-center"><Check size={13} />Approve</Btn>
                        <Btn onClick={() => setAppRejectId(item.id)} variant="outline" className="flex-1 border-red-200 text-red-600 hover:bg-red-50 justify-center"><X size={13} />Reject</Btn>
                        <Btn variant="outline"><Printer size={13} /></Btn>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* ════════════════════ GLOBAL CALENDAR ════════════════════ */}
        {tab === "Calendar" && (
          <div className="flex h-full overflow-hidden">
            {/* Filter sidebar */}
            <div className="w-52 flex-shrink-0 border-r border-gray-200 bg-white overflow-auto p-4">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Show on Calendar</p>
              <div className="space-y-0.5">
                {GLOBAL_CAL_FILTERS_DEF.map(f => (
                  <label key={f.label} className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div onClick={() => toggleGlobalFilter(f.label)} className={cn("w-4 h-4 rounded flex items-center justify-center border-2 transition-colors flex-shrink-0", globalCalFilters.includes(f.label)?"border-transparent":"border-gray-300")} style={globalCalFilters.includes(f.label)?{backgroundColor:f.color}:{}}>
                      {globalCalFilters.includes(f.label) && <Check size={10} className="text-white" />}
                    </div>
                    <span className="text-xs text-gray-700">{f.label}</span>
                  </label>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Upcoming</p>
                <div className="space-y-2">
                  {GLOBAL_EVENTS.filter(e => e.day<=15&&globalCalFilters.includes(e.type)).slice(0,5).map(e => (
                    <div key={e.id} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1" style={{ backgroundColor:e.color }} />
                      <div className="flex-1 min-w-0"><p className="text-[10px] text-gray-700 truncate">{e.label}</p><p className="text-[9px] text-gray-400">Jul {e.day}</p></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Calendar main */}
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="bg-white border-b border-gray-200 px-5 py-3 flex items-center gap-3 flex-shrink-0">
                <div className="flex gap-1">
                  {(["month","week","list"] as const).map(v => <button key={v} onClick={() => setGlobalCalView(v)} className={cn("px-3 py-1.5 text-xs font-medium rounded-lg transition-colors", globalCalView===v?"bg-[#EEF2FF] text-[#5C5CFF]":"text-gray-600 hover:bg-gray-100")}>{v==="month"?"Month":v==="week"?"Week":"List"}</button>)}
                </div>
                <div className="flex items-center gap-1.5">
                  <button className="p-1.5 hover:bg-gray-100 rounded"><ChevronLeft size={14}/></button>
                  <span className="text-sm font-semibold text-gray-800 w-28 text-center">July 2024</span>
                  <button className="p-1.5 hover:bg-gray-100 rounded"><ChevronRight size={14}/></button>
                </div>
                <button className="px-3 py-1.5 border border-gray-200 text-xs text-gray-600 rounded-lg hover:bg-gray-50">Today</button>
                <div className="ml-auto text-xs text-gray-400">{globalCalFilters.length} of {GLOBAL_CAL_FILTERS_DEF.length} categories shown</div>
              </div>
              <div className="flex-1 overflow-auto p-4">
                {globalCalView === "month" && (
                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden" style={{ minHeight:500 }}>
                    <div className="grid grid-cols-7 border-b border-gray-100">
                      {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => <div key={d} className="text-center text-[10px] font-semibold text-gray-400 py-2.5 border-r border-gray-100 last:border-0">{d}</div>)}
                    </div>
                    <div className="grid grid-cols-7" style={{ gridAutoRows:"minmax(90px,1fr)" }}>
                      {["","","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","",""].slice(0,35).map((d,i) => {
                        const dayN = parseInt(d) || 0;
                        const dayEvents = GLOBAL_EVENTS.filter(e => e.day===dayN&&globalCalFilters.includes(e.type));
                        const isToday = d === "1"; const isWeekend = i%7===0||i%7===6;
                        return (
                          <div key={i} className={cn("border-r border-b border-gray-100 last:border-r-0 p-1.5 cursor-pointer hover:bg-gray-50/50 transition-colors", isWeekend&&d?"bg-gray-50/50":"", isToday?"bg-[#EEF2FF]/40":"")}>
                            {d && <div className={cn("w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium mb-1", isToday?"bg-[#5C5CFF] text-white":"text-gray-600")}>{d}</div>}
                            <div className="space-y-0.5 overflow-hidden">
                              {dayEvents.slice(0,3).map(ev => (
                                <div key={ev.id} className="text-[9px] font-medium px-1.5 py-0.5 rounded text-white truncate cursor-pointer hover:opacity-90" style={{ backgroundColor:ev.color }}>{ev.label}</div>
                              ))}
                              {dayEvents.length > 3 && <div className="text-[9px] text-gray-400 px-1.5">+{dayEvents.length-3} more</div>}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                {globalCalView === "week" && (
                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="grid grid-cols-8 border-b border-gray-100">
                      <div className="py-2.5 px-2 border-r border-gray-100" />
                      {["Mon Jul 1","Tue Jul 2","Wed Jul 3","Thu Jul 4","Fri Jul 5","Sat Jul 6","Sun Jul 7"].map(d => (
                        <div key={d} className="text-center text-[10px] font-medium text-gray-500 py-2.5 border-r border-gray-100 last:border-0">{d}</div>
                      ))}
                    </div>
                    {["08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00"].map(hour => (
                      <div key={hour} className="grid grid-cols-8 border-b border-gray-50 last:border-0">
                        <div className="text-[10px] text-gray-400 px-2 py-3 border-r border-gray-100 text-right">{hour}</div>
                        {[0,1,2,3,4,5,6].map(day => <div key={day} className={cn("border-r border-gray-50 last:border-0 h-10 cursor-pointer hover:bg-gray-50/80", day>=5?"bg-gray-50/50":day===3?"bg-red-50/20":"")} />)}
                      </div>
                    ))}
                    <div className="px-4 py-2.5 border-t border-gray-100 bg-gray-50/50">
                      <p className="text-[10px] font-semibold text-gray-400 mb-2">Events this week</p>
                      <div className="flex flex-wrap gap-1.5">
                        {GLOBAL_EVENTS.filter(e => e.day>=1&&e.day<=7&&globalCalFilters.includes(e.type)).map(ev => (
                          <div key={ev.id} className="text-[9px] font-medium px-2 py-1 rounded-full text-white cursor-pointer hover:opacity-90" style={{ backgroundColor:ev.color }}>Jul {ev.day} · {ev.label}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {globalCalView === "list" && (
                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden divide-y divide-gray-100">
                    {GLOBAL_EVENTS.filter(e=>globalCalFilters.includes(e.type)).sort((a,b)=>a.day-b.day).map(ev=>(
                      <div key={ev.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 cursor-pointer transition-colors">
                        <div className="w-12 h-12 rounded-xl flex flex-col items-center justify-center flex-shrink-0" style={{backgroundColor:ev.color+"18"}}>
                          <span className="text-[9px] font-semibold uppercase" style={{color:ev.color}}>Jul</span>
                          <span className="text-base font-bold leading-tight" style={{color:ev.color}}>{ev.day}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800">{ev.label}</p>
                          <p className="text-[10px] text-gray-400 mt-0.5 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{backgroundColor:ev.color}}/>
                            {ev.type}
                          </p>
                        </div>
                        <ChevronDown size={14} className="text-gray-300 -rotate-90 flex-shrink-0"/>
                      </div>
                    ))}
                    {GLOBAL_EVENTS.filter(e=>globalCalFilters.includes(e.type)).length===0&&(
                      <div className="py-12 text-center"><CalendarDays size={24} className="text-gray-200 mx-auto mb-2"/><p className="text-sm text-gray-400">No events for selected filters</p></div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ── Apply Leave Modal ── */}
      {showApplyLeave && (
        <Modal title="Apply for Leave" onClose={() => setShowApplyLeave(false)}>
          <div className="space-y-4">
            <SelectField label="Leave Type" options={["Annual Leave","Sick Leave","Casual Leave","Unpaid Leave","Compensatory Leave"]} required />
            <div className="grid grid-cols-2 gap-4"><InputField label="From Date" type="date" required /><InputField label="To Date" type="date" required /></div>
            <InputField label="Reason" placeholder="Brief reason for leave" required />
            <div><label className="text-sm font-medium text-gray-700 block mb-1.5">Attachments</label><button className="flex items-center gap-2 px-3 py-2 border border-dashed border-gray-300 rounded-lg text-xs text-gray-500 hover:border-[#5C5CFF]/40"><Upload size={13} />Attach supporting document</button></div>
            <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-500">Annual Leave balance: <strong className="text-gray-800">6 days remaining</strong></div>
            <div className="flex justify-end gap-3 pt-2 border-t border-gray-200"><Btn variant="outline" onClick={() => setShowApplyLeave(false)}>Cancel</Btn><Btn onClick={() => setShowApplyLeave(false)}>Submit Application</Btn></div>
          </div>
        </Modal>
      )}

      {/* ── Issue Rejection Modal ── */}
      {issueRejectId && (
        <Modal title="Reject Attendance Request" onClose={()=>{setIssueRejectId(null);setIssueRejectNote("");}}>
          <div className="space-y-4">
            <div className="bg-red-50 border border-red-100 rounded-xl p-3 flex items-start gap-2.5">
              <AlertTriangle size={16} className="text-red-500 flex-shrink-0 mt-0.5"/>
              <p className="text-xs text-red-700">A rejection reason is required and will be stored permanently with this request.</p>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Rejection Reason <span className="text-red-500">*</span></label>
              <textarea value={issueRejectNote} onChange={e=>setIssueRejectNote(e.target.value)} rows={3} placeholder="Explain why this request is being rejected…" className={cn("px-3 py-2 text-sm border rounded-lg bg-white resize-none focus:outline-none focus:ring-2 focus:ring-[#5C5CFF]",issueRejectNote.trim()?"border-gray-300":"border-red-200")}/>
              {!issueRejectNote.trim()&&<p className="text-[11px] text-red-500">A reason is required before rejecting.</p>}
            </div>
            <div>
              <p className="text-xs font-medium text-gray-600 mb-2">Quick reasons</p>
              <div className="flex flex-wrap gap-2">
                {["Biometric logs found","Already marked present","Insufficient proof","Policy violation"].map(r=>(
                  <button key={r} onClick={()=>setIssueRejectNote(r)} className={cn("px-2.5 py-1 rounded-full text-xs border transition-colors",issueRejectNote===r?"border-red-400 bg-red-50 text-red-700":"border-gray-200 text-gray-600 hover:bg-gray-50")}>{r}</button>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2 border-t border-gray-200">
              <Btn variant="outline" onClick={()=>{setIssueRejectId(null);setIssueRejectNote("");}}>Cancel</Btn>
              <Btn onClick={confirmIssueReject} disabled={!issueRejectNote.trim()} className={cn(!issueRejectNote.trim()?"opacity-50 cursor-not-allowed":"","bg-red-600 hover:bg-red-700")}><X size={13}/>Reject</Btn>
            </div>
          </div>
        </Modal>
      )}

      {/* ── Leave Rejection Modal ── */}
      {leaveRejectModal && (
        <Modal title="Reject Leave Request" onClose={()=>{setLeaveRejectModal(null);setLeaveRejectReason("");setLeaveRejectCmt("");}}>
          <div className="space-y-4">
            {(() => {
              const lr = myLeaveHist.find(r=>r.id===leaveRejectModal);
              return lr ? (
                <div className="bg-gray-50 rounded-xl p-3 grid grid-cols-2 gap-2 text-xs">
                  {([["Employee","Alex Admin"],["Leave Type",lr.type],["Date Range",`${lr.from} – ${lr.to}`],["Days",`${lr.days} days`]] as [string,string][]).map(([k,v])=>(
                    <div key={k}><p className="text-[9px] text-gray-400 uppercase tracking-wide mb-0.5">{k}</p><p className="font-semibold text-gray-800">{v}</p></div>
                  ))}
                </div>
              ) : null;
            })()}
            <div className="bg-red-50 border border-red-100 rounded-xl p-3 flex items-start gap-2.5">
              <AlertTriangle size={16} className="text-red-500 flex-shrink-0 mt-0.5"/>
              <p className="text-xs text-red-700">Rejection reason is mandatory and will be recorded permanently.</p>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Rejection Reason <span className="text-red-500">*</span></label>
              <textarea value={leaveRejectReason} onChange={e=>setLeaveRejectReason(e.target.value)} rows={3} placeholder="Explain why this leave is being rejected…" className={cn("px-3 py-2 text-sm border rounded-lg bg-white resize-none focus:outline-none focus:ring-2 focus:ring-[#5C5CFF]",leaveRejectReason.trim()?"border-gray-300":"border-red-200")}/>
              {!leaveRejectReason.trim()&&<p className="text-[11px] text-red-500">A reason is required before rejecting.</p>}
            </div>
            <div>
              <p className="text-xs font-medium text-gray-600 mb-2">Quick reasons</p>
              <div className="flex flex-wrap gap-2">
                {["Insufficient leave balance","Business requirement","Project deadline","Duplicate request","Policy violation"].map(r=>(
                  <button key={r} onClick={()=>setLeaveRejectReason(r)} className={cn("px-2.5 py-1 rounded-full text-xs border transition-colors",leaveRejectReason===r?"border-red-400 bg-red-50 text-red-700":"border-gray-200 text-gray-600 hover:bg-gray-50")}>{r}</button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Additional Comment <span className="text-gray-400 font-normal">(optional)</span></label>
              <textarea value={leaveRejectCmt} onChange={e=>setLeaveRejectCmt(e.target.value)} rows={2} placeholder="Any additional notes for the employee…" className="px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white resize-none focus:outline-none focus:ring-2 focus:ring-[#5C5CFF]"/>
            </div>
            <div className="flex justify-end gap-3 pt-2 border-t border-gray-200">
              <Btn variant="outline" onClick={()=>{setLeaveRejectModal(null);setLeaveRejectReason("");setLeaveRejectCmt("");}}>Cancel</Btn>
              <Btn onClick={confirmLeaveReject} disabled={!leaveRejectReason.trim()} className={cn(!leaveRejectReason.trim()?"opacity-50 cursor-not-allowed":"","bg-red-600 hover:bg-red-700")}><X size={13}/>Reject Leave</Btn>
            </div>
          </div>
        </Modal>
      )}

      {/* ── Approve Item Modal ── */}
      {appApproveId && (() => {
        const item = approvals.find(a => a.id === appApproveId);
        return item ? (
          <Modal title="Approve Request" onClose={() => setAppApproveId(null)}>
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-100 rounded-xl p-4 flex items-start gap-3"><CheckCircle size={18} className="text-green-500 flex-shrink-0 mt-0.5"/><div><p className="text-sm font-semibold text-green-800">Confirm Approval</p><p className="text-xs text-green-700 mt-0.5">This will notify {item.employee} and update their records.</p></div></div>
              <div className="grid grid-cols-2 gap-3">{([["Employee",item.employee],["Type",item.leaveType],["Date",item.dateRange],["Days",item.days]] as [string,string][]).map(([k,v]) => <div key={k} className="bg-gray-50 rounded-lg p-3"><p className="text-[10px] text-gray-400 uppercase tracking-wide mb-1">{k}</p><p className="text-sm font-semibold text-gray-800">{v}</p></div>)}</div>
              <div className="flex flex-col gap-1.5"><label className="text-sm font-medium text-gray-700">Comments <span className="text-gray-400 font-normal">(optional)</span></label><textarea value={appApproveComment} onChange={e=>setAppApproveComment(e.target.value)} rows={2} placeholder="Add a note…" className="px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white resize-none focus:outline-none focus:ring-2 focus:ring-[#5C5CFF]"/></div>
              <div className="flex justify-end gap-3 pt-2 border-t border-gray-200"><Btn variant="outline" onClick={() => setAppApproveId(null)}>Cancel</Btn><Btn onClick={confirmApproveItem} className="bg-green-600 hover:bg-green-700"><Check size={13}/>Approve</Btn></div>
            </div>
          </Modal>
        ) : null;
      })()}

      {/* ── Reject Item Modal ── */}
      {appRejectId && (() => {
        const item = approvals.find(a => a.id === appRejectId);
        return item ? (
          <Modal title="Reject Request" onClose={() => setAppRejectId(null)}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">{([["Employee",item.employee],["Type",item.type],["Detail",item.leaveType],["Applied",item.applied]] as [string,string][]).map(([k,v]) => <div key={k} className="bg-gray-50 rounded-lg p-3"><p className="text-[10px] text-gray-400 uppercase tracking-wide mb-1">{k}</p><p className="text-sm font-semibold text-gray-800">{v}</p></div>)}</div>
              <div className="flex flex-col gap-1.5"><label className="text-sm font-medium text-gray-700">Reason for Rejection <span className="text-red-500">*</span></label><textarea value={appRejectReason} onChange={e=>setAppRejectReason(e.target.value)} rows={3} placeholder="Explain why…" className={cn("px-3 py-2 text-sm border rounded-lg bg-white resize-none focus:outline-none focus:ring-2 focus:ring-[#5C5CFF]", appRejectReason.trim()?"border-gray-300":"border-red-200")}/>{!appRejectReason.trim()&&<p className="text-[11px] text-red-500">A reason is required.</p>}</div>
              <div><p className="text-xs font-medium text-gray-600 mb-2">Quick reasons</p><div className="flex flex-wrap gap-2">{["Insufficient leave balance","Business requirement","Project deadline","Duplicate request","Policy violation"].map(r => <button key={r} onClick={() => setAppRejectReason(r)} className={cn("px-2.5 py-1 rounded-full text-xs border transition-colors", appRejectReason===r?"border-red-400 bg-red-50 text-red-700":"border-gray-200 text-gray-600 hover:bg-gray-50")}>{r}</button>)}</div></div>
              <div className="flex justify-end gap-3 pt-2 border-t border-gray-200"><Btn variant="outline" onClick={() => setAppRejectId(null)}>Cancel</Btn><Btn onClick={confirmRejectItem} disabled={!appRejectReason.trim()} className={cn(!appRejectReason.trim()?"opacity-50 cursor-not-allowed":"","bg-red-600 hover:bg-red-700")}><X size={13}/>Reject</Btn></div>
            </div>
          </Modal>
        ) : null;
      })()}

      {/* ── Leave Detail Modal ── */}
      {leaveDetailId && (() => {
        const req = MY_LEAVE_HIST.find(r => r.id === leaveDetailId) || reqs.find(r => r.id === leaveDetailId) as any;
        return req ? (
          <Modal title="Leave Request Details" onClose={() => setLeaveDetailId(null)} width="max-w-2xl">
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200"><Avt initials="AA" color="#5C5CFF" size="md"/><div><p className="text-sm font-semibold text-gray-900">Alex Admin</p><p className="text-xs text-gray-500">Administrator · Administration</p></div><StatusBadge status={req.status} className="ml-auto"/></div>
              <div className="grid grid-cols-3 gap-3">{([["Leave Type",req.type],["From",req.from],["To",req.to],["Days",String(req.days)+" days"],["Applied",req.applied],["Status",req.status]] as [string,string][]).map(([k,v]) => <div key={k} className="bg-white border border-gray-200 rounded-lg p-3"><p className="text-[10px] text-gray-400 uppercase tracking-wide mb-1">{k}</p><p className="text-sm font-semibold text-gray-800">{v}</p></div>)}</div>
              <div className="flex gap-3 pt-2 border-t border-gray-200">
                <Btn variant="outline"><Download size={13}/>Download</Btn>
                <Btn variant="outline"><Printer size={13}/>Print</Btn>
                <div className="flex-1"/>
                {req.status==="Pending"&&<><Btn onClick={()=>{setApproveModalId(req.id);setLeaveDetailId(null);}} className="bg-green-600 hover:bg-green-700"><Check size={13}/>Approve</Btn><Btn onClick={()=>{setRejectModalId(req.id);setLeaveDetailId(null);}} variant="outline" className="border-red-200 text-red-600 hover:bg-red-50"><X size={13}/>Reject</Btn></>}
              </div>
            </div>
          </Modal>
        ) : null;
      })()}

      {/* ── Approve Leave Modal ── */}
      {approveModalId && (() => {
        const req = reqs.find(r => r.id === approveModalId);
        return req ? (
          <Modal title="Approve Leave" onClose={() => setApproveModalId(null)}>
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-100 rounded-xl p-4 flex items-start gap-3"><CheckCircle size={18} className="text-green-500 flex-shrink-0"/><div><p className="text-sm font-semibold text-green-800">Confirm Approval</p><p className="text-xs text-green-700 mt-0.5">This will update the employee's leave balance and send a notification.</p></div></div>
              <div className="grid grid-cols-2 gap-3">{([["Employee",req.employee],["Leave Type",req.type],["Date Range",`${req.from} – ${req.to}`],["Total Days",req.days+" days"]] as [string,string][]).map(([k,v]) => <div key={k} className="bg-gray-50 rounded-lg p-3"><p className="text-[10px] text-gray-400 uppercase tracking-wide mb-1">{k}</p><p className="text-sm font-semibold text-gray-800">{v}</p></div>)}</div>
              <div className="flex flex-col gap-1.5"><label className="text-sm font-medium text-gray-700">Comments <span className="text-gray-400 font-normal">(optional)</span></label><textarea value={approveComment} onChange={e=>setApproveComment(e.target.value)} rows={2} placeholder="Add a note…" className="px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white resize-none focus:outline-none focus:ring-2 focus:ring-[#5C5CFF]"/></div>
              <div className="flex justify-end gap-3 pt-2 border-t border-gray-200"><Btn variant="outline" onClick={() => setApproveModalId(null)}>Cancel</Btn><Btn onClick={confirmApprove} className="bg-green-600 hover:bg-green-700"><Check size={13}/>Approve</Btn></div>
            </div>
          </Modal>
        ) : null;
      })()}

      {/* ── Reject Leave Modal ── */}
      {rejectModalId && (() => {
        const req = reqs.find(r => r.id === rejectModalId);
        return req ? (
          <Modal title="Reject Leave Request" onClose={() => setRejectModalId(null)}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">{([["Employee",req.employee],["Leave Type",req.type],["Date Range",`${req.from} – ${req.to}`],["Total Days",req.days+" days"]] as [string,string][]).map(([k,v]) => <div key={k} className="bg-gray-50 rounded-lg p-3"><p className="text-[10px] text-gray-400 uppercase tracking-wide mb-1">{k}</p><p className="text-sm font-semibold text-gray-800">{v}</p></div>)}</div>
              <div className="flex flex-col gap-1.5"><label className="text-sm font-medium text-gray-700">Reason for Rejection <span className="text-red-500">*</span></label><textarea value={rejectReason} onChange={e=>setRejectReason(e.target.value)} rows={3} placeholder="Explain why…" className={cn("px-3 py-2 text-sm border rounded-lg bg-white resize-none focus:outline-none focus:ring-2 focus:ring-[#5C5CFF]", rejectReason.trim()?"border-gray-300":"border-red-200")}/>{!rejectReason.trim()&&<p className="text-[11px] text-red-500">A reason is required.</p>}</div>
              <div><p className="text-xs font-medium text-gray-600 mb-2">Quick reasons</p><div className="flex flex-wrap gap-2">{["Insufficient leave balance","Business requirement","Project deadline","Duplicate request","Policy violation"].map(r => <button key={r} onClick={() => setRejectReason(r)} className={cn("px-2.5 py-1 rounded-full text-xs border", rejectReason===r?"border-red-400 bg-red-50 text-red-700":"border-gray-200 text-gray-600 hover:bg-gray-50")}>{r}</button>)}</div></div>
              <div className="flex justify-end gap-3 pt-2 border-t border-gray-200"><Btn variant="outline" onClick={() => setRejectModalId(null)}>Cancel</Btn><Btn onClick={confirmReject} disabled={!rejectReason.trim()} className={cn(!rejectReason.trim()?"opacity-50 cursor-not-allowed":"","bg-red-600 hover:bg-red-700")}><X size={13}/>Reject Leave</Btn></div>
            </div>
          </Modal>
        ) : null;
      })()}
      {/* ── Check-in Location Details Modal ── */}
      {showLocationModal && (
        <Modal title="Attendance Location Details" onClose={() => setShowLocationModal(false)} width="max-w-3xl">
          <div className="grid grid-cols-5 gap-6 text-left">
            
            {/* Left side details */}
            <div className="col-span-2 space-y-4">
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wide font-bold">Workplace Location</p>
                <p className="text-base font-semibold text-gray-800 flex items-center gap-1.5 mt-0.5">
                  <MapPin size={16} className="text-red-500 fill-red-100" />
                  New York HQ
                </p>
                <p className="text-xs text-gray-500 mt-0.5">350 Fifth Avenue, New York, NY 10118</p>
              </div>

              <div className="h-px bg-gray-100" />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide font-bold">Geo-fence Radius</p>
                  <p className="text-sm font-semibold text-gray-800 mt-0.5">200 meters</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide font-bold">Check-in Time</p>
                  <p className="text-sm font-semibold text-gray-800 mt-0.5">09:02 AM</p>
                </div>
              </div>

              <div className="h-px bg-gray-100" />

              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wide font-bold">Check-in Coordinates</p>
                <p className="text-xs font-mono font-medium text-gray-700 mt-0.5">
                  {isInsideGeofence ? "40.7485° N, -73.9856° W" : "40.7512° N, -73.9821° W"}
                </p>
                <p className="text-[10px] text-gray-400 mt-0.5">
                  {isInsideGeofence ? "Offset: 45 meters from office center" : "Offset: 380 meters from office center"}
                </p>
              </div>

              <div className="h-px bg-gray-100" />

              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wide font-bold mb-1">Geo-fence Validation Status</p>
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold",
                    isInsideGeofence ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"
                  )}>
                    <div className={cn("w-1.5 h-1.5 rounded-full", isInsideGeofence ? "bg-green-500" : "bg-red-500")} />
                    {isInsideGeofence ? "Inside boundary" : "Outside boundary (Violation)"}
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setIsInsideGeofence(!isInsideGeofence)}
                  className="w-full py-2 bg-gray-50 border border-gray-200 hover:bg-gray-100 text-gray-700 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <RefreshCw size={12} />
                  Simulate {isInsideGeofence ? "Outside" : "Inside"} Geo-fence
                </button>
              </div>
            </div>

            {/* Right side Map SVG */}
            <div className="col-span-3 flex flex-col justify-between">
              <div className="w-full aspect-[4/3] relative">
                <MapSVG isInside={isInsideGeofence} />
              </div>
              <div className="text-[10px] text-gray-400 text-center mt-2">
                Simulated real-time GPS & biometric geofencing verification.
              </div>
            </div>

          </div>
        </Modal>
      )}

    </div>
  );
}
