// ── Types ──────────────────────────────────────────────────────────────────────
export type AppPage =
  | "login" | "admin-account" | "getting-started" | "setup"
  | "my-space" | "team" | "organization"
  | "attendance" | "leave" | "tasks"
  | "documents" | "settings" | "support"
  | "employee-add" | "employee-profile";

export interface Employee {
  id: string; name: string; email: string; phone: string;
  dept: string; designation: string; status: string; shift: string;
  joinDate: string; manager: string; branch: string; empType: string;
  initials: string; attendance: number; color: string;
}

// ── Utilities ──────────────────────────────────────────────────────────────────
export function cn(...c: (string|undefined|false|null)[]) { return c.filter(Boolean).join(" "); }
export function fmtDate(d: string) { return new Date(d).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}); }

// ── Mock Data ──────────────────────────────────────────────────────────────────
export const EMP_COLORS = ["#5C5CFF","#22C55E","#F59E0B","#EF4444","#3B82F6","#8B5CF6","#06B6D4","#EC4899","#14B8A6","#F97316"];

export const EMPLOYEES: Employee[] = [
  { id:"E001", name:"Sarah Mitchell", email:"sarah.mitchell@acmecorp.com", phone:"+1 (555) 234-5678", dept:"Engineering", designation:"Senior Software Engineer", status:"Active", shift:"General", joinDate:"2021-03-15", manager:"David Chen", branch:"New York HQ", empType:"Full-Time", initials:"SM", attendance:97.2, color:EMP_COLORS[0] },
  { id:"E002", name:"Marcus Johnson", email:"marcus.j@acmecorp.com", phone:"+1 (555) 345-6789", dept:"Product", designation:"Product Manager", status:"Active", shift:"General", joinDate:"2020-07-22", manager:"Emily Rodriguez", branch:"New York HQ", empType:"Full-Time", initials:"MJ", attendance:94.5, color:EMP_COLORS[1] },
  { id:"E003", name:"Priya Sharma", email:"priya.sharma@acmecorp.com", phone:"+1 (555) 456-7890", dept:"Design", designation:"Lead UX Designer", status:"Active", shift:"General", joinDate:"2022-01-10", manager:"Marcus Johnson", branch:"San Francisco", empType:"Full-Time", initials:"PS", attendance:98.1, color:EMP_COLORS[2] },
  { id:"E004", name:"David Chen", email:"david.chen@acmecorp.com", phone:"+1 (555) 567-8901", dept:"Engineering", designation:"VP Engineering", status:"Active", shift:"General", joinDate:"2018-11-05", manager:"CEO", branch:"New York HQ", empType:"Full-Time", initials:"DC", attendance:92.3, color:EMP_COLORS[3] },
  { id:"E005", name:"Aisha Thompson", email:"aisha.t@acmecorp.com", phone:"+1 (555) 678-9012", dept:"HR", designation:"HR Manager", status:"Active", shift:"General", joinDate:"2019-04-18", manager:"David Chen", branch:"New York HQ", empType:"Full-Time", initials:"AT", attendance:96.7, color:EMP_COLORS[4] },
  { id:"E006", name:"Robert Kim", email:"robert.kim@acmecorp.com", phone:"+1 (555) 789-0123", dept:"Finance", designation:"Financial Analyst", status:"Active", shift:"General", joinDate:"2021-09-01", manager:"Jennifer Walsh", branch:"Chicago", empType:"Full-Time", initials:"RK", attendance:99.0, color:EMP_COLORS[5] },
  { id:"E007", name:"Fatima Al-Hassan", email:"fatima.ah@acmecorp.com", phone:"+1 (555) 890-1234", dept:"Marketing", designation:"Marketing Specialist", status:"On Leave", shift:"General", joinDate:"2022-05-23", manager:"Carlos Rivera", branch:"Austin", empType:"Full-Time", initials:"FA", attendance:88.9, color:EMP_COLORS[6] },
  { id:"E008", name:"James O'Brien", email:"james.ob@acmecorp.com", phone:"+1 (555) 901-2345", dept:"Sales", designation:"Account Executive", status:"Active", shift:"Morning", joinDate:"2023-02-14", manager:"Aisha Thompson", branch:"New York HQ", empType:"Full-Time", initials:"JO", attendance:95.4, color:EMP_COLORS[7] },
  { id:"E009", name:"Mei Lin Chen", email:"meilin.c@acmecorp.com", phone:"+1 (555) 012-3456", dept:"Engineering", designation:"Backend Developer", status:"Active", shift:"Night", joinDate:"2022-08-30", manager:"David Chen", branch:"San Francisco", empType:"Contract", initials:"MC", attendance:96.2, color:EMP_COLORS[8] },
  { id:"E010", name:"Carlos Rivera", email:"carlos.r@acmecorp.com", phone:"+1 (555) 123-4567", dept:"Marketing", designation:"Marketing Director", status:"Active", shift:"General", joinDate:"2017-06-12", manager:"CEO", branch:"Austin", empType:"Full-Time", initials:"CR", attendance:91.8, color:EMP_COLORS[9] },
  { id:"E011", name:"Yuki Tanaka", email:"yuki.t@acmecorp.com", phone:"+1 (555) 234-5679", dept:"Engineering", designation:"Frontend Developer", status:"Active", shift:"General", joinDate:"2023-06-01", manager:"David Chen", branch:"New York HQ", empType:"Full-Time", initials:"YT", attendance:97.8, color:EMP_COLORS[0] },
  { id:"E012", name:"Jennifer Walsh", email:"jennifer.w@acmecorp.com", phone:"+1 (555) 345-6780", dept:"Finance", designation:"CFO", status:"Active", shift:"General", joinDate:"2016-09-20", manager:"CEO", branch:"New York HQ", empType:"Full-Time", initials:"JW", attendance:93.1, color:EMP_COLORS[1] },
  { id:"E013", name:"Ahmad Patel", email:"ahmad.p@acmecorp.com", phone:"+1 (555) 456-7891", dept:"Operations", designation:"Operations Manager", status:"Inactive", shift:"General", joinDate:"2020-12-07", manager:"Jennifer Walsh", branch:"Chicago", empType:"Full-Time", initials:"AP", attendance:0, color:EMP_COLORS[2] },
  { id:"E014", name:"Lisa Nakamura", email:"lisa.n@acmecorp.com", phone:"+1 (555) 567-8902", dept:"Design", designation:"UI Designer", status:"Active", shift:"General", joinDate:"2023-01-16", manager:"Priya Sharma", branch:"San Francisco", empType:"Full-Time", initials:"LN", attendance:98.5, color:EMP_COLORS[3] },
  { id:"E015", name:"Benjamin Okafor", email:"ben.o@acmecorp.com", phone:"+1 (555) 678-9013", dept:"Legal", designation:"Legal Counsel", status:"Active", shift:"General", joinDate:"2021-07-28", manager:"Jennifer Walsh", branch:"New York HQ", empType:"Full-Time", initials:"BO", attendance:94.8, color:EMP_COLORS[4] },
];

export const ATT_TREND = [
  { day:"Jun 1", present:812, absent:22, late:13 },{ day:"Jun 5", present:819, absent:18, late:10 },
  { day:"Jun 10", present:808, absent:27, late:12 },{ day:"Jun 15", present:821, absent:16, late:10 },
  { day:"Jun 20", present:815, absent:20, late:12 },{ day:"Jun 25", present:823, absent:15, late:9 },
  { day:"Jun 30", present:827, absent:14, late:6 },
];
export const DEPT_DIST = [
  { name:"Engineering", value:234, color:"#5C5CFF" },{ name:"Sales", value:156, color:"#22C55E" },
  { name:"Marketing", value:98, color:"#F59E0B" },{ name:"Finance", value:72, color:"#EF4444" },
  { name:"HR", value:48, color:"#3B82F6" },{ name:"Design", value:64, color:"#8B5CF6" },
  { name:"Operations", value:87, color:"#06B6D4" },{ name:"Legal", value:32, color:"#EC4899" },
  { name:"Product", value:56, color:"#14B8A6" },
];
export const LEAVE_MONTHLY = [
  { month:"Jan", annual:34, sick:18, casual:12 },{ month:"Feb", annual:28, sick:22, casual:10 },
  { month:"Mar", annual:42, sick:15, casual:14 },{ month:"Apr", annual:38, sick:12, casual:16 },
  { month:"May", annual:31, sick:19, casual:11 },{ month:"Jun", annual:44, sick:14, casual:13 },
];
export const HEADCOUNT_TREND = [
  { month:"Jan", count:798 },{ month:"Feb", count:812 },{ month:"Mar", count:821 },
  { month:"Apr", count:835 },{ month:"May", count:841 },{ month:"Jun", count:847 },
];
export const LEAVE_REQUESTS = [
  { id:"LR001", employee:"Sarah Mitchell", type:"Annual Leave", from:"2024-07-05", to:"2024-07-09", days:5, status:"Pending", reason:"Family vacation", applied:"2024-06-28" },
  { id:"LR002", employee:"Marcus Johnson", type:"Sick Leave", from:"2024-07-02", to:"2024-07-03", days:2, status:"Approved", reason:"Medical appointment", applied:"2024-07-01" },
  { id:"LR003", employee:"Fatima Al-Hassan", type:"Annual Leave", from:"2024-07-10", to:"2024-07-19", days:10, status:"Approved", reason:"International travel", applied:"2024-06-20" },
  { id:"LR004", employee:"Yuki Tanaka", type:"Casual Leave", from:"2024-07-04", to:"2024-07-04", days:1, status:"Pending", reason:"Personal work", applied:"2024-07-02" },
  { id:"LR005", employee:"Robert Kim", type:"Sick Leave", from:"2024-07-01", to:"2024-07-02", days:2, status:"Rejected", reason:"Fever", applied:"2024-06-30" },
  { id:"LR006", employee:"Lisa Nakamura", type:"Annual Leave", from:"2024-07-15", to:"2024-07-22", days:6, status:"Pending", reason:"Summer holiday", applied:"2024-07-01" },
];
export const ATTENDANCE_RECORDS = [
  { id:"E001", name:"Sarah Mitchell", dept:"Engineering", checkIn:"09:02", checkOut:"18:15", status:"Present", hours:9.2 },
  { id:"E002", name:"Marcus Johnson", dept:"Product", checkIn:"09:45", checkOut:"18:30", status:"Late", hours:8.75 },
  { id:"E003", name:"Priya Sharma", dept:"Design", checkIn:"09:00", checkOut:"18:00", status:"Present", hours:9.0 },
  { id:"E004", name:"David Chen", dept:"Engineering", checkIn:"08:30", checkOut:"19:00", status:"Present", hours:10.5 },
  { id:"E005", name:"Aisha Thompson", dept:"HR", checkIn:"–", checkOut:"–", status:"WFH", hours:8.0 },
  { id:"E006", name:"Robert Kim", dept:"Finance", checkIn:"09:00", checkOut:"18:00", status:"Present", hours:9.0 },
  { id:"E007", name:"Fatima Al-Hassan", dept:"Marketing", checkIn:"–", checkOut:"–", status:"On Leave", hours:0 },
  { id:"E008", name:"James O'Brien", dept:"Sales", checkIn:"06:58", checkOut:"15:00", status:"Present", hours:8.0 },
  { id:"E009", name:"Mei Lin Chen", dept:"Engineering", checkIn:"–", checkOut:"–", status:"Absent", hours:0 },
  { id:"E011", name:"Yuki Tanaka", dept:"Engineering", checkIn:"09:05", checkOut:"18:10", status:"Present", hours:9.1 },
  { id:"E014", name:"Lisa Nakamura", dept:"Design", checkIn:"09:00", checkOut:"18:00", status:"Present", hours:9.0 },
  { id:"E015", name:"Benjamin Okafor", dept:"Legal", checkIn:"09:30", checkOut:"18:30", status:"Late", hours:9.0 },
];
export const NOTIFICATIONS = [
  { id:1, type:"leave", title:"Leave Request", message:"Sarah Mitchell applied for 5 days annual leave", time:"10 min ago", read:false, action:"leave" as AppPage },
  { id:2, type:"attendance", title:"Missing Punch", message:"14 employees have missing check-out today", time:"1 hr ago", read:false, action:"attendance" as AppPage },
  { id:3, type:"employee", title:"New Joiner", message:"Yuki Tanaka joins Engineering team today", time:"3 hr ago", read:true, action:"organization" as AppPage },
  { id:4, type:"leave", title:"Leave Approved", message:"Marcus Johnson's sick leave has been approved", time:"5 hr ago", read:true, action:"leave" as AppPage },
  { id:5, type:"system", title:"System Update", message:"Attendance biometric sync completed successfully", time:"1 day ago", read:true, action:"attendance" as AppPage },
];
export const DOCUMENTS_LIST = [
  { id:"D001", name:"Employee Handbook 2024", category:"Policy", size:"2.4 MB", updatedBy:"Aisha Thompson", updated:"2024-01-15", status:"Published" },
  { id:"D002", name:"Code of Conduct", category:"Policy", size:"1.1 MB", updatedBy:"Benjamin Okafor", updated:"2024-02-01", status:"Published" },
  { id:"D003", name:"Offer Letter Template", category:"Template", size:"0.3 MB", updatedBy:"Aisha Thompson", updated:"2024-03-10", status:"Published" },
  { id:"D004", name:"NDA Agreement", category:"Legal", size:"0.8 MB", updatedBy:"Benjamin Okafor", updated:"2024-01-20", status:"Published" },
  { id:"D005", name:"Performance Review Form Q2", category:"Template", size:"0.5 MB", updatedBy:"Aisha Thompson", updated:"2024-06-01", status:"Draft" },
  { id:"D006", name:"Leave Policy 2024", category:"Policy", size:"1.3 MB", updatedBy:"Aisha Thompson", updated:"2024-01-01", status:"Published" },
];
