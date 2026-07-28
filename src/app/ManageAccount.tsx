import React, { useState } from "react";
import {
  Users, Settings, Shield, Zap, CheckCircle, FileText, Activity,
  ChevronLeft, ChevronRight, Search, Plus, Download, Upload, MoreHorizontal,
  Check, X, Edit, Trash2, Eye, Lock, UserPlus, UserX, RefreshCw,
  Mail, Bell, Globe, Building2, MapPin, GitBranch, Key, Database,
  Clock, CalendarDays, ArrowRight, AlertTriangle, Info, Send, Megaphone,
  Bot, ClipboardList, ToggleLeft, ToggleRight, Filter, ExternalLink,
  ChevronDown, Star, Award, User, Phone, Briefcase
} from "lucide-react";
import { cn, fmtDate, Employee, EMPLOYEES, DEPT_DIST, EMP_COLORS } from "./data";
import { Avt, StatusBadge, Btn, Modal, InputField, SelectField, TabBar } from "./ui";

// ── Types ──────────────────────────────────────────────────────────────────────
type MASection = "Users"|"Organization Setup"|"User Access Control"|"Manage Services"|"Automation"|"Approvals"|"Audit Logs";
type OrgSetupNav = "Organization Details"|"Organization Policy"|"Organization Structure"|"Locations"|"Departments"|"Designations"|"Domains & Branding"|"Email Authentication";
type ACNav = "General Roles"|"Custom Roles"|"Role Assignment"|"Permission Matrix"|"Administrators";
type AutomNav = "Approval Workflows"|"Attendance Automation"|"Leave Automation"|"Shift Automation"|"Notification Automation"|"Business Rules"|"Scheduled Jobs";
type ApprovalNav = "Attendance"|"Leave"|"Shift"|"Department"|"Employee"|"Delegation"|"Approval Matrix"|"History";

// ── Shared mini-components ─────────────────────────────────────────────────────
function SectionHeader({ title, subtitle, children }: { title:string; subtitle?:string; children?:React.ReactNode }) {
  return (
    <div className="flex items-start justify-between mb-5">
      <div>
        <h2 className="text-base font-semibold text-gray-900">{title}</h2>
        {subtitle&&<p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
      {children&&<div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}

function Toggle({ on, onChange }: { on:boolean; onChange:()=>void }) {
  return (
    <button onClick={onChange} className={cn("w-10 h-5 rounded-full transition-colors flex-shrink-0 relative",on?"bg-[#5C5CFF]":"bg-gray-300")}>
      <div className={cn("absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform",on?"left-5":"left-0.5")}/>
    </button>
  );
}

function TableHead({ cols }: { cols:string[] }) {
  return (
    <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
      <tr>{cols.map(c=><th key={c} className="px-4 py-3 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider">{c}</th>)}</tr>
    </thead>
  );
}

// ── USERS SECTION ──────────────────────────────────────────────────────────────
function UsersSection() {
  const [userTab, setUserTab] = useState("Active");
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const [selected, setSelected] = useState<string[]>([]);
  const [showInvite, setShowInvite] = useState(false);
  const [showResetPw, setShowResetPw] = useState<Employee|null>(null);
  const [showAssignRole, setShowAssignRole] = useState<Employee|null>(null);
  const [showEditUser, setShowEditUser] = useState<Employee|null>(null);
  const [activeUser, setActiveUser] = useState<Employee|null>(null);

  const depts = ["All",...Array.from(new Set(EMPLOYEES.map(e=>e.dept))).sort()];
  const filtered = EMPLOYEES.filter(e=>{
    const matchStatus = userTab==="Active"?e.status==="Active":userTab==="Inactive"?e.status==="Inactive":userTab==="On Leave"?e.status==="On Leave":true;
    const matchSearch = !search||e.name.toLowerCase().includes(search.toLowerCase())||e.email.toLowerCase().includes(search.toLowerCase())||e.id.toLowerCase().includes(search.toLowerCase());
    const matchDept = deptFilter==="All"||e.dept===deptFilter;
    return matchStatus&&matchSearch&&matchDept;
  });

  const PENDING = [
    {email:"john.smith@acmecorp.com",role:"Employee",dept:"Engineering",invited:"Jun 28",by:"Aisha Thompson"},
    {email:"sarah.jones@acmecorp.com",role:"Manager",dept:"Sales",invited:"Jun 30",by:"Alex Admin"},
    {email:"mike.chen@acmecorp.com",role:"Employee",dept:"Design",invited:"Jul 1",by:"Alex Admin"},
  ];

  return (
    <div className="flex h-full overflow-hidden">
      {/* User list */}
      <div className={cn("flex flex-col overflow-hidden",activeUser?"w-[560px] flex-shrink-0 border-r border-gray-200":"flex-1")}>
        {/* Toolbar */}
        <div className="bg-white border-b border-gray-200 px-5 py-3 flex-shrink-0">
          <div className="flex items-center gap-3 mb-3">
            <div className="relative flex-1 max-w-xs">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"/>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search users…" className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C5CFF] bg-white"/>
            </div>
            <div className="relative">
              <select value={deptFilter} onChange={e=>setDeptFilter(e.target.value)} className="pl-2 pr-7 py-1.5 text-xs border border-gray-300 rounded-lg bg-white appearance-none focus:outline-none">
                {depts.map(d=><option key={d}>{d}</option>)}
              </select>
              <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"/>
            </div>
            <div className="ml-auto flex gap-2">
              <Btn size="sm" variant="outline"><Upload size={12}/>Import</Btn>
              <Btn size="sm" variant="outline"><Download size={12}/>Export</Btn>
              <Btn size="sm" onClick={()=>setShowInvite(true)}><UserPlus size={12}/>Invite Users</Btn>
            </div>
          </div>
          <div className="flex gap-1">
            {["Active","Inactive","On Leave","Pending Invitations"].map(t=>(
              <button key={t} onClick={()=>setUserTab(t)} className={cn("px-3 py-1.5 text-xs font-medium rounded-lg transition-colors",userTab===t?"bg-[#EEF2FF] text-[#5C5CFF]":"text-gray-500 hover:bg-gray-100")}>
                {t}
                <span className={cn("ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-semibold",userTab===t?"bg-[#5C5CFF] text-white":"bg-gray-200 text-gray-500")}>
                  {t==="Active"?EMPLOYEES.filter(e=>e.status==="Active").length:t==="Inactive"?EMPLOYEES.filter(e=>e.status==="Inactive").length:t==="On Leave"?EMPLOYEES.filter(e=>e.status==="On Leave").length:PENDING.length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Bulk bar */}
        {selected.length>0&&(
          <div className="bg-[#EEF2FF] border-b border-[#5C5CFF]/20 px-5 py-2 flex items-center gap-2 flex-shrink-0">
            <span className="text-xs font-medium text-[#5C5CFF]">{selected.length} selected</span>
            <Btn size="sm" variant="outline">Assign Role</Btn>
            <Btn size="sm" variant="outline"><RefreshCw size={11}/>Reset Password</Btn>
            <Btn size="sm" variant="danger"><UserX size={11}/>Deactivate</Btn>
            <button className="ml-auto text-gray-400 hover:text-gray-600" onClick={()=>setSelected([])}><X size={14}/></button>
          </div>
        )}

        {/* Table */}
        {userTab!=="Pending Invitations"?(
          <div className="flex-1 overflow-auto">
            <table className="w-full text-sm">
              <TableHead cols={["","Employee","Department","Role","Status","Actions"]}/>
              <tbody className="bg-white divide-y divide-gray-100">
                {filtered.map(emp=>(
                  <tr key={emp.id} className={cn("hover:bg-gray-50 group",activeUser?.id===emp.id&&"bg-[#EEF2FF]")}>
                    <td className="px-4 py-3 w-8">
                      <input type="checkbox" checked={selected.includes(emp.id)} onChange={e=>setSelected(prev=>e.target.checked?[...prev,emp.id]:prev.filter(x=>x!==emp.id))} className="rounded border-gray-300 accent-[#5C5CFF]"/>
                    </td>
                    <td className="px-4 py-3">
                      <button className="flex items-center gap-2.5 text-left" onClick={()=>setActiveUser(activeUser?.id===emp.id?null:emp)}>
                        <Avt initials={emp.initials} color={emp.color} size="sm"/>
                        <div>
                          <p className="text-sm font-medium text-gray-800 group-hover:text-[#5C5CFF] transition-colors">{emp.name}</p>
                          <p className="text-[10px] text-gray-400">{emp.email}</p>
                        </div>
                      </button>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600">{emp.dept}</td>
                    <td className="px-4 py-3"><span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">Employee</span></td>
                    <td className="px-4 py-3"><StatusBadge status={emp.status}/></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={()=>setShowEditUser(emp)} className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600" title="Edit"><Edit size={13}/></button>
                        <button onClick={()=>setShowAssignRole(emp)} className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600" title="Assign Role"><Key size={13}/></button>
                        <button onClick={()=>setShowResetPw(emp)} className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600" title="Reset Password"><Lock size={13}/></button>
                        <button className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-red-500" title="Deactivate"><UserX size={13}/></button>
                        <button className="p-1.5 hover:bg-gray-100 rounded text-gray-400"><MoreHorizontal size={13}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ):(
          <div className="flex-1 overflow-auto">
            <table className="w-full text-sm">
              <TableHead cols={["Email","Role","Department","Invited","Invited By","Actions"]}/>
              <tbody className="bg-white divide-y divide-gray-100">
                {PENDING.map((p,i)=>(
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-3"><div className="flex items-center gap-2"><div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center"><Mail size={12} className="text-gray-400"/></div><span className="text-sm text-gray-700">{p.email}</span></div></td>
                    <td className="px-4 py-3"><span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{p.role}</span></td>
                    <td className="px-4 py-3 text-xs text-gray-600">{p.dept}</td>
                    <td className="px-4 py-3 text-xs text-gray-400">{p.invited}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{p.by}</td>
                    <td className="px-4 py-3 flex items-center gap-2">
                      <button className="text-xs text-[#5C5CFF] hover:underline">Resend</button>
                      <button className="text-xs text-red-500 hover:underline">Revoke</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        <div className="border-t border-gray-200 px-5 py-2.5 flex items-center justify-between flex-shrink-0 bg-white">
          <span className="text-xs text-gray-400">{filtered.length} users</span>
          <div className="flex items-center gap-1">
            <button className="px-2 py-1 text-xs text-gray-500 hover:bg-gray-100 rounded">Previous</button>
            {[1,2,3].map(p=><button key={p} className={cn("w-7 h-7 text-xs rounded",p===1?"bg-[#5C5CFF] text-white":"text-gray-500 hover:bg-gray-100")}>{p}</button>)}
            <button className="px-2 py-1 text-xs text-gray-500 hover:bg-gray-100 rounded">Next</button>
          </div>
        </div>
      </div>

      {/* User detail panel */}
      {activeUser&&(
        <div className="flex-1 flex flex-col overflow-hidden bg-white">
          <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
            <h3 className="text-sm font-semibold text-gray-900">User Profile</h3>
            <button onClick={()=>setActiveUser(null)} className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"><X size={15}/></button>
          </div>
          <div className="flex-1 overflow-auto p-5 space-y-4">
            <div className="flex items-center gap-4">
              <Avt initials={activeUser.initials} color={activeUser.color} size="xl"/>
              <div>
                <h4 className="text-base font-semibold text-gray-900">{activeUser.name}</h4>
                <p className="text-sm text-gray-500">{activeUser.designation} · {activeUser.dept}</p>
                <StatusBadge status={activeUser.status}/>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[["Employee ID",activeUser.id],["Email",activeUser.email],["Phone",activeUser.phone],["Branch",activeUser.branch],["Join Date",fmtDate(activeUser.joinDate)],["Emp Type",activeUser.empType]].map(([k,v])=>(
                <div key={k as string} className="bg-gray-50 rounded-lg p-3"><p className="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">{k}</p><p className="text-xs font-medium text-gray-800">{v}</p></div>
              ))}
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="text-xs font-semibold text-gray-700 mb-3">Role & Permissions</p>
              <div className="space-y-2">
                {[["System Role","Employee"],["Access Level","Standard"],["Last Login","Today, 09:02 AM"],["2FA","Not enabled"]].map(([k,v])=>(
                  <div key={k as string} className="flex justify-between text-xs"><span className="text-gray-500">{k}</span><span className="font-medium text-gray-800">{v}</span></div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Btn onClick={()=>setShowEditUser(activeUser)}><Edit size={13}/>Edit Profile</Btn>
              <Btn variant="outline" onClick={()=>setShowAssignRole(activeUser)}><Key size={13}/>Assign Role</Btn>
              <Btn variant="outline" onClick={()=>setShowResetPw(activeUser)}><Lock size={13}/>Reset Password</Btn>
              <Btn variant="danger"><UserX size={13}/>Deactivate User</Btn>
            </div>
          </div>
        </div>
      )}

      {/* Invite modal */}
      {showInvite&&(
        <Modal title="Invite Users" onClose={()=>setShowInvite(false)}>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">Email Addresses</label>
              <textarea rows={3} placeholder="Enter email addresses (one per line or comma separated)" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C5CFF] resize-none"/>
              <p className="text-[10px] text-gray-400 mt-1">Separate multiple emails with commas or newlines</p>
            </div>
            <SelectField label="Role" options={["Employee","Manager","HR Admin","Super Admin"]} required/>
            <SelectField label="Department" options={DEPT_DIST.map(d=>d.name)} required/>
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 flex items-start gap-2">
              <Info size={13} className="text-blue-500 flex-shrink-0 mt-0.5"/>
              <p className="text-xs text-blue-700">Invitees will receive an email to set up their account and complete their profile.</p>
            </div>
            <div className="flex justify-end gap-3 pt-2 border-t border-gray-200">
              <Btn variant="outline" onClick={()=>setShowInvite(false)}>Cancel</Btn>
              <Btn onClick={()=>setShowInvite(false)}><Send size={13}/>Send Invitations</Btn>
            </div>
          </div>
        </Modal>
      )}

      {showResetPw&&(
        <Modal title="Reset Password" onClose={()=>setShowResetPw(null)}>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Avt initials={showResetPw.initials} color={showResetPw.color} size="sm"/>
              <div><p className="text-sm font-medium text-gray-800">{showResetPw.name}</p><p className="text-xs text-gray-400">{showResetPw.email}</p></div>
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input type="radio" name="pw-reset" defaultChecked className="accent-[#5C5CFF]"/>
                <div><p className="text-sm text-gray-800">Send password reset email</p><p className="text-xs text-gray-400">User receives a link to create a new password</p></div>
              </label>
              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input type="radio" name="pw-reset" className="accent-[#5C5CFF]"/>
                <div><p className="text-sm text-gray-800">Set temporary password</p><p className="text-xs text-gray-400">User must change on first login</p></div>
              </label>
            </div>
            <div className="flex justify-end gap-3 pt-2 border-t border-gray-200">
              <Btn variant="outline" onClick={()=>setShowResetPw(null)}>Cancel</Btn>
              <Btn onClick={()=>setShowResetPw(null)}><RefreshCw size={13}/>Reset Password</Btn>
            </div>
          </div>
        </Modal>
      )}

      {showAssignRole&&(
        <Modal title="Assign Role" onClose={()=>setShowAssignRole(null)}>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Avt initials={showAssignRole.initials} color={showAssignRole.color} size="sm"/>
              <div><p className="text-sm font-medium text-gray-800">{showAssignRole.name}</p><p className="text-xs text-gray-400">Current role: Employee</p></div>
            </div>
            <SelectField label="New Role" options={["Employee","Manager","HR Admin","Super Admin","Custom Role"]} required/>
            <InputField label="Effective From" type="date"/>
            <div className="flex justify-end gap-3 pt-2 border-t border-gray-200">
              <Btn variant="outline" onClick={()=>setShowAssignRole(null)}>Cancel</Btn>
              <Btn onClick={()=>setShowAssignRole(null)}><Check size={13}/>Assign Role</Btn>
            </div>
          </div>
        </Modal>
      )}

      {showEditUser&&(
        <Modal title="Edit User" onClose={()=>setShowEditUser(null)} width="max-w-xl">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <InputField label="First Name" value={showEditUser.name.split(" ")[0]} required/>
              <InputField label="Last Name" value={showEditUser.name.split(" ")[1]||""} required/>
              <InputField label="Email" value={showEditUser.email} type="email" required/>
              <InputField label="Phone" value={showEditUser.phone}/>
              <SelectField label="Department" options={DEPT_DIST.map(d=>d.name)} value={showEditUser.dept}/>
              <SelectField label="Employment Type" options={["Full-Time","Part-Time","Contract","Intern"]} value={showEditUser.empType}/>
            </div>
            <div className="flex justify-end gap-3 pt-2 border-t border-gray-200">
              <Btn variant="outline" onClick={()=>setShowEditUser(null)}>Cancel</Btn>
              <Btn onClick={()=>setShowEditUser(null)}><Check size={13}/>Save Changes</Btn>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── ORGANIZATION SETUP ─────────────────────────────────────────────────────────
function OrgSetupSection() {
  const NAV: OrgSetupNav[] = ["Organization Details","Organization Policy","Organization Structure","Locations","Departments","Designations","Domains & Branding","Email Authentication"];
  const [active, setActive] = useState<OrgSetupNav>("Organization Details");
  const [showAddDept, setShowAddDept] = useState(false);
  const [showAddLoc, setShowAddLoc] = useState(false);

  return (
    <div className="flex h-full overflow-hidden">
      {/* Left nav */}
      <div className="w-52 flex-shrink-0 border-r border-gray-200 bg-gray-50 overflow-auto py-3">
        {NAV.map(n=>(
          <button key={n} onClick={()=>setActive(n)} className={cn("w-full text-left px-4 py-2.5 text-xs font-medium transition-colors",active===n?"bg-white text-[#5C5CFF] border-r-2 border-[#5C5CFF]":"text-gray-600 hover:bg-white hover:text-gray-800")}>{n}</button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">

        {active==="Organization Details"&&(
          <div className="max-w-2xl space-y-5">
            <SectionHeader title="Organization Details" subtitle="Basic information about your organization">
              <Btn size="sm">Save Changes</Btn>
            </SectionHeader>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-start gap-5 mb-5">
                <div className="w-20 h-20 rounded-xl bg-[#EEF2FF] border-2 border-dashed border-[#5C5CFF]/30 flex flex-col items-center justify-center cursor-pointer hover:border-[#5C5CFF] transition-colors">
                  <Building2 size={24} className="text-[#5C5CFF] mb-1"/>
                  <span className="text-[9px] text-gray-400">Upload Logo</span>
                </div>
                <div className="flex-1 space-y-3">
                  <InputField label="Organization Name" value="Acme Corporation" required/>
                  <div className="grid grid-cols-2 gap-3">
                    <InputField label="Portal Subdomain" value="acme"/>
                    <SelectField label="Business Type" options={["Private Ltd","Public Ltd","Partnership","NGO","Government"]}/>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <SelectField label="Industry" options={["Technology","Finance","Healthcare","Manufacturing","Retail","Education","Consulting"]}/>
                <SelectField label="Employee Count" options={["1–10","11–50","51–200","201–500","501–1000","1000+"]}/>
                <InputField label="Website" value="https://acmecorp.com" type="url"/>
                <SelectField label="Currency" options={["USD – US Dollar","EUR – Euro","GBP – British Pound","INR – Indian Rupee"]}/>
                <SelectField label="Timezone" options={["(UTC-8) Pacific","(UTC-5) Eastern","(UTC+0) UTC","(UTC+5:30) IST"]}/>
                <SelectField label="Date Format" options={["MM/DD/YYYY","DD/MM/YYYY","YYYY-MM-DD"]}/>
                <SelectField label="Week Start" options={["Monday","Sunday"]}/>
                <SelectField label="Language" options={["English (US)","English (UK)","French","German","Spanish"]}/>
              </div>
            </div>
          </div>
        )}

        {active==="Organization Policy"&&(
          <div className="max-w-2xl space-y-4">
            <SectionHeader title="Organization Policy" subtitle="Default policies applied across the organization">
              <Btn size="sm">Save Changes</Btn>
            </SectionHeader>
            {[
              {title:"Attendance Policy",items:[["Grace Period","15 minutes"],["Work Hours/Day","9 hours"],["Late Mark After","09:15 AM"],["Biometric Required","Yes"]]},
              {title:"Leave Policy",items:[["Annual Leave","18 days"],["Sick Leave","10 days"],["Casual Leave","6 days"],["Carryover Allowed","Yes"]]},
              {title:"Work From Home",items:[["WFH Allowed","Yes, with approval"],["Max WFH Days/Month","8 days"],["Geo-fence Required","No"]]},
            ].map(s=>(
              <div key={s.title} className="bg-white border border-gray-200 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3"><h4 className="text-sm font-semibold text-gray-800">{s.title}</h4><Btn variant="outline" size="sm"><Edit size={12}/>Edit</Btn></div>
                <div className="grid grid-cols-2 gap-3">
                  {s.items.map(([k,v])=><div key={k} className="bg-gray-50 rounded-lg px-3 py-2.5"><p className="text-[10px] text-gray-400 mb-0.5">{k}</p><p className="text-xs font-medium text-gray-800">{v}</p></div>)}
                </div>
              </div>
            ))}
          </div>
        )}

        {active==="Organization Structure"&&(
          <div className="max-w-3xl space-y-4">
            <SectionHeader title="Organization Structure" subtitle="Manage your reporting hierarchy">
              <Btn variant="outline" size="sm"><Download size={12}/>Export</Btn>
              <Btn size="sm"><Plus size={12}/>Add Level</Btn>
            </SectionHeader>
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="p-5 space-y-3">
                {[["CEO","Executive","1"],["VP","Senior Management","3"],["Director","Management","8"],["Manager","Team Lead","24"],["Employee","Individual Contributor","811"]].map(([level,desc,count])=>(
                  <div key={level} className="flex items-center gap-4 p-3 border border-gray-100 rounded-lg hover:border-[#5C5CFF]/20 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-[#EEF2FF] flex items-center justify-center flex-shrink-0"><Users size={14} className="text-[#5C5CFF]"/></div>
                    <div className="flex-1"><p className="text-sm font-medium text-gray-800">{level}</p><p className="text-xs text-gray-400">{desc}</p></div>
                    <span className="text-sm font-bold text-gray-800">{count}</span>
                    <span className="text-xs text-gray-400">people</span>
                    <div className="flex gap-1"><button className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600"><Edit size={12}/></button><button className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-red-500"><Trash2 size={12}/></button></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {active==="Locations"&&(
          <div className="max-w-3xl space-y-4">
            <SectionHeader title="Locations" subtitle="Manage office locations and branches">
              <Btn variant="outline" size="sm"><Upload size={12}/>Bulk Import</Btn>
              <Btn size="sm" onClick={()=>setShowAddLoc(true)}><Plus size={12}/>Add Location</Btn>
            </SectionHeader>
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <TableHead cols={["Location","Type","Address","Employees","Actions"]}/>
                <tbody className="divide-y divide-gray-100">
                  {[
                    {name:"New York HQ",type:"Headquarters",addr:"350 Fifth Avenue, New York, NY",emp:412},
                    {name:"San Francisco",type:"Regional Office",addr:"101 California St, San Francisco, CA",emp:178},
                    {name:"Chicago",type:"Regional Office",addr:"233 S Wacker Drive, Chicago, IL",emp:142},
                    {name:"Austin",type:"Regional Office",addr:"300 W 6th Street, Austin, TX",emp:115},
                  ].map(l=>(
                    <tr key={l.name} className="hover:bg-gray-50">
                      <td className="px-4 py-3"><div className="flex items-center gap-2"><div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0"><MapPin size={12} className="text-blue-500"/></div><span className="text-sm font-medium text-gray-800">{l.name}</span></div></td>
                      <td className="px-4 py-3"><span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{l.type}</span></td>
                      <td className="px-4 py-3 text-xs text-gray-500">{l.addr}</td>
                      <td className="px-4 py-3 text-xs font-semibold text-gray-800">{l.emp}</td>
                      <td className="px-4 py-3"><div className="flex gap-1"><button className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600"><Edit size={12}/></button><button className="p-1.5 hover:bg-red-50 rounded text-gray-400 hover:text-red-500"><Trash2 size={12}/></button></div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {active==="Departments"&&(
          <div className="max-w-3xl space-y-4">
            <SectionHeader title="Departments" subtitle="Configure organizational departments">
              <Btn variant="outline" size="sm"><Download size={12}/>Export</Btn>
              <Btn size="sm" onClick={()=>setShowAddDept(true)}><Plus size={12}/>Add Department</Btn>
            </SectionHeader>
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <TableHead cols={["Department","Head","Members","Sub-Departments","Status","Actions"]}/>
                <tbody className="divide-y divide-gray-100">
                  {[{name:"Engineering",head:"David Chen",count:234,sub:3,active:true,color:"#5C5CFF"},{name:"Sales",head:"Aisha Thompson",count:156,sub:2,active:true,color:"#22C55E"},{name:"Marketing",head:"Carlos Rivera",count:98,sub:1,active:true,color:"#F59E0B"},{name:"Finance",head:"Jennifer Walsh",count:72,sub:2,active:true,color:"#EF4444"},{name:"HR",head:"Aisha Thompson",count:48,sub:1,active:true,color:"#3B82F6"},{name:"Design",head:"Priya Sharma",count:64,sub:1,active:true,color:"#8B5CF6"},{name:"Operations",head:"Ahmad Patel",count:87,sub:2,active:false,color:"#06B6D4"}].map(d=>(
                    <tr key={d.name} className="hover:bg-gray-50">
                      <td className="px-4 py-3"><div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{backgroundColor:d.color}}/><span className="text-sm font-medium text-gray-800">{d.name}</span></div></td>
                      <td className="px-4 py-3 text-xs text-gray-600">{d.head}</td>
                      <td className="px-4 py-3 text-xs font-semibold text-gray-800">{d.count}</td>
                      <td className="px-4 py-3 text-xs text-gray-500">{d.sub}</td>
                      <td className="px-4 py-3"><StatusBadge status={d.active?"Active":"Inactive"}/></td>
                      <td className="px-4 py-3"><div className="flex gap-1"><button className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600"><Edit size={12}/></button><button className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600"><MoreHorizontal size={12}/></button></div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {active==="Designations"&&(
          <div className="max-w-2xl space-y-4">
            <SectionHeader title="Designations" subtitle="Job titles and designations in your organization">
              <Btn size="sm"><Plus size={12}/>Add Designation</Btn>
            </SectionHeader>
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <TableHead cols={["Designation","Level","Department","Employees","Actions"]}/>
                <tbody className="divide-y divide-gray-100">
                  {[["VP Engineering","Senior Management","Engineering","1"],["Senior Software Engineer","Senior","Engineering","42"],["Product Manager","Mid","Product","12"],["Lead UX Designer","Senior","Design","4"],["HR Manager","Senior","HR","2"],["Financial Analyst","Mid","Finance","8"],["Marketing Specialist","Junior","Marketing","15"]].map(([des,level,dept,count])=>(
                    <tr key={des} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-800">{des}</td>
                      <td className="px-4 py-3"><span className="text-[10px] bg-[#EEF2FF] text-[#5C5CFF] px-2 py-0.5 rounded font-medium">{level}</span></td>
                      <td className="px-4 py-3 text-xs text-gray-500">{dept}</td>
                      <td className="px-4 py-3 text-xs font-semibold text-gray-800">{count}</td>
                      <td className="px-4 py-3"><div className="flex gap-1"><button className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600"><Edit size={12}/></button><button className="p-1.5 hover:bg-red-50 rounded text-gray-400 hover:text-red-500"><Trash2 size={12}/></button></div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {active==="Domains & Branding"&&(
          <div className="max-w-2xl space-y-5">
            <SectionHeader title="Domains & Branding" subtitle="Customize your organization's identity">
              <Btn size="sm">Save Changes</Btn>
            </SectionHeader>
            <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
              <h4 className="text-sm font-semibold text-gray-800">Custom Domain</h4>
              <InputField label="Domain" value="acmecorp.hrms.app" placeholder="yourdomain.hrms.app"/>
              <div className="bg-green-50 border border-green-100 rounded-lg p-3 flex items-center gap-2"><Check size={13} className="text-green-500"/><p className="text-xs text-green-700">Domain verified and active</p></div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
              <h4 className="text-sm font-semibold text-gray-800">Brand Colors</h4>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-sm font-medium text-gray-700 block mb-1.5">Primary Color</label><div className="flex gap-2">{["#5C5CFF","#3B82F6","#22C55E","#F59E0B","#EF4444","#8B5CF6"].map(c=><button key={c} className={cn("w-8 h-8 rounded-full border-2",c==="#5C5CFF"?"border-gray-800":"border-transparent hover:scale-105")} style={{backgroundColor:c}}/>)}</div></div>
                <InputField label="Custom Hex" placeholder="#5C5CFF"/>
              </div>
            </div>
          </div>
        )}

        {active==="Email Authentication"&&(
          <div className="max-w-2xl space-y-5">
            <SectionHeader title="Email Authentication" subtitle="Configure email delivery and authentication">
              <Btn size="sm">Save Changes</Btn>
            </SectionHeader>
            <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
              <h4 className="text-sm font-semibold text-gray-800">SMTP Configuration</h4>
              <div className="grid grid-cols-2 gap-4">
                <InputField label="SMTP Host" placeholder="smtp.gmail.com"/>
                <InputField label="SMTP Port" placeholder="587"/>
                <InputField label="Username" placeholder="noreply@acmecorp.com"/>
                <InputField label="Password" type="password" placeholder="••••••••"/>
                <SelectField label="Encryption" options={["TLS","SSL","None"]}/>
                <InputField label="From Name" value="Acme Corporation"/>
              </div>
              <Btn variant="outline" size="sm"><Send size={12}/>Send Test Email</Btn>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-3">
              <h4 className="text-sm font-semibold text-gray-800">SPF / DKIM Records</h4>
              {[["SPF Record","Verified","Jun 1, 2024"],["DKIM Signature","Verified","Jun 1, 2024"],["DMARC Policy","Not Configured","–"]].map(([rec,status,date])=>(
                <div key={rec} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <span className="text-sm text-gray-700">{rec}</span>
                  <div className="flex items-center gap-3"><span className="text-xs text-gray-400">{date}</span><span className={cn("text-xs font-medium",status==="Verified"?"text-green-600":"text-amber-600")}>{status}</span></div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {showAddDept&&(
        <Modal title="Add Department" onClose={()=>setShowAddDept(false)}>
          <div className="space-y-4">
            <InputField label="Department Name" placeholder="e.g. Customer Success" required/>
            <SelectField label="Parent Department" options={["None (Top-level)",...DEPT_DIST.map(d=>d.name)]}/>
            <SelectField label="Department Head" options={["Assign later",...EMPLOYEES.map(e=>e.name)]}/>
            <InputField label="Cost Center" placeholder="e.g. ENG-005"/>
            <div className="flex justify-end gap-3 pt-2 border-t border-gray-200"><Btn variant="outline" onClick={()=>setShowAddDept(false)}>Cancel</Btn><Btn onClick={()=>setShowAddDept(false)}>Create Department</Btn></div>
          </div>
        </Modal>
      )}

      {showAddLoc&&(
        <Modal title="Add Location" onClose={()=>setShowAddLoc(false)}>
          <div className="space-y-4">
            <InputField label="Location Name" placeholder="e.g. Seattle Office" required/>
            <SelectField label="Type" options={["Headquarters","Regional Office","Satellite Office"]}/>
            <InputField label="Address" placeholder="123 Main Street" required/>
            <div className="grid grid-cols-2 gap-4"><InputField label="City" placeholder="Seattle"/><InputField label="State" placeholder="WA"/></div>
            <InputField label="Timezone" placeholder="(UTC-8) Pacific"/>
            <div className="flex justify-end gap-3 pt-2 border-t border-gray-200"><Btn variant="outline" onClick={()=>setShowAddLoc(false)}>Cancel</Btn><Btn onClick={()=>setShowAddLoc(false)}>Add Location</Btn></div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── USER ACCESS CONTROL ────────────────────────────────────────────────────────
function AccessControlSection() {
  const [nav, setNav] = useState<ACNav>("General Roles");
  const [showCreateRole, setShowCreateRole] = useState(false);
  const [expandedRole, setExpandedRole] = useState<string|null>("HR Admin");
  const ROLES = [
    {name:"Super Admin",desc:"Full platform access — all modules, all data",users:1,color:"#EF4444",permissions:["All Modules","All Data","System Config","Billing","Audit"]},
    {name:"HR Admin",desc:"Full HR operations — employees, attendance, leave",users:3,color:"#5C5CFF",permissions:["Employees","Attendance","Leave","Organization","Reports","Announcements"]},
    {name:"Manager",desc:"Team management, approve leave and attendance",users:24,color:"#F59E0B",permissions:["Team View","Approve Leave","Approve Attendance","Reports (Team)"]},
    {name:"Employee",desc:"Self-service — own attendance, leave, documents",users:819,color:"#22C55E",permissions:["My Space","Own Leave","Own Attendance","Own Documents"]},
  ];
  const MODULES = ["My Space","Team","Organization","Attendance","Leave","Documents","Tasks","Reports","Settings","Access Control","Announcements"];

  return (
    <div className="flex h-full overflow-hidden">
      <div className="w-48 flex-shrink-0 border-r border-gray-200 bg-gray-50 overflow-auto py-3">
        {(["General Roles","Custom Roles","Role Assignment","Permission Matrix","Administrators"] as ACNav[]).map(n=>(
          <button key={n} onClick={()=>setNav(n)} className={cn("w-full text-left px-4 py-2.5 text-xs font-medium transition-colors",nav===n?"bg-white text-[#5C5CFF] border-r-2 border-[#5C5CFF]":"text-gray-600 hover:bg-white hover:text-gray-800")}>{n}</button>
        ))}
      </div>

      <div className="flex-1 overflow-auto p-6">

        {nav==="General Roles"&&(
          <div className="max-w-2xl space-y-4">
            <SectionHeader title="General Roles" subtitle="System-defined roles with fixed permission sets">
              <Btn size="sm" onClick={()=>setShowCreateRole(true)}><Plus size={12}/>Create Role</Btn>
            </SectionHeader>
            {ROLES.map(r=>(
              <div key={r.name} className={cn("bg-white border rounded-xl",expandedRole===r.name?"border-[#5C5CFF] ring-1 ring-[#5C5CFF]/20":"border-gray-200")}>
                <div className="flex items-center gap-4 p-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{backgroundColor:r.color+"18"}}><Shield size={18} style={{color:r.color}}/></div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800">{r.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{r.desc}</p>
                    <div className="flex flex-wrap gap-1 mt-1.5">{r.permissions.slice(0,3).map(p=><span key={p} className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{p}</span>)}{r.permissions.length>3&&<span className="text-[10px] text-gray-400">+{r.permissions.length-3} more</span>}</div>
                  </div>
                  <div className="text-right mr-3 flex-shrink-0"><div className="text-sm font-bold text-gray-800">{r.users}</div><div className="text-[10px] text-gray-400">users</div></div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Btn variant="outline" size="sm" onClick={()=>setExpandedRole(expandedRole===r.name?null:r.name)}><Eye size={12}/>{expandedRole===r.name?"Hide":"View"}</Btn>
                    <Btn variant="ghost" size="sm"><MoreHorizontal size={13}/></Btn>
                  </div>
                </div>
                {expandedRole===r.name&&(
                  <div className="px-4 pb-4 pt-0 border-t border-gray-100">
                    <div className="grid grid-cols-4 gap-2 mt-3 mb-3">
                      {MODULES.map(m=>{
                        const has = r.name==="Super Admin"||(r.name==="HR Admin"&&!["Settings","Access Control"].includes(m))||(r.name==="Manager"&&["My Space","Team","Attendance","Leave","Tasks","Reports"].includes(m))||(r.name==="Employee"&&["My Space","Attendance","Leave","Documents","Tasks"].includes(m));
                        return (<div key={m} className={cn("flex items-center gap-1.5 px-2 py-1.5 rounded text-[10px]",has?"bg-green-50 text-green-700":"bg-gray-50 text-gray-300")}>{has?<Check size={10}/>:<X size={10}/>}{m}</div>);
                      })}
                    </div>
                    <div className="flex gap-2">
                      <Btn size="sm" variant="outline"><Edit size={11}/>Edit Role</Btn>
                      <Btn size="sm" variant="outline"><UserPlus size={11}/>Assign Users</Btn>
                      <Btn size="sm" variant="ghost">Duplicate</Btn>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {nav==="Custom Roles"&&(
          <div className="max-w-2xl space-y-4">
            <SectionHeader title="Custom Roles" subtitle="Create and manage custom permission sets">
              <Btn size="sm" onClick={()=>setShowCreateRole(true)}><Plus size={12}/>Create Custom Role</Btn>
            </SectionHeader>
            <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
              <Shield size={32} className="text-gray-200 mx-auto mb-3"/>
              <p className="text-sm font-medium text-gray-700 mb-1">No custom roles created yet</p>
              <p className="text-xs text-gray-400 mb-4">Custom roles let you define granular permissions tailored to your organization's needs.</p>
              <Btn size="sm" onClick={()=>setShowCreateRole(true)}><Plus size={12}/>Create First Custom Role</Btn>
            </div>
          </div>
        )}

        {nav==="Role Assignment"&&(
          <div className="max-w-3xl space-y-4">
            <SectionHeader title="Role Assignment" subtitle="Assign and manage user roles">
              <Btn size="sm"><Plus size={12}/>Assign Role</Btn>
            </SectionHeader>
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <TableHead cols={["User","Current Role","Department","Assigned By","Assigned On","Actions"]}/>
                <tbody className="divide-y divide-gray-100">
                  {EMPLOYEES.slice(0,8).map((emp,i)=>{
                    const roles = ["Employee","Employee","Manager","HR Admin","Manager","Employee","Employee","Employee"];
                    return (
                      <tr key={emp.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3"><div className="flex items-center gap-2"><Avt initials={emp.initials} color={emp.color} size="sm"/><div><p className="text-xs font-medium text-gray-800">{emp.name}</p><p className="text-[10px] text-gray-400">{emp.email}</p></div></div></td>
                        <td className="px-4 py-3"><span className="text-xs px-2 py-0.5 rounded font-medium" style={{backgroundColor:roles[i]==="HR Admin"?"#EEF2FF":roles[i]==="Manager"?"#FFF7ED":"#F3F4F6",color:roles[i]==="HR Admin"?"#5C5CFF":roles[i]==="Manager"?"#D97706":"#6B7280"}}>{roles[i]}</span></td>
                        <td className="px-4 py-3 text-xs text-gray-500">{emp.dept}</td>
                        <td className="px-4 py-3 text-xs text-gray-500">Alex Admin</td>
                        <td className="px-4 py-3 text-xs text-gray-400">{fmtDate(emp.joinDate)}</td>
                        <td className="px-4 py-3"><button className="text-xs text-[#5C5CFF] hover:underline">Change</button></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {nav==="Permission Matrix"&&(
          <div className="max-w-4xl space-y-4">
            <SectionHeader title="Permission Matrix" subtitle="Module-level access by role">
              <Btn size="sm" variant="outline"><Download size={12}/>Export</Btn>
              <Btn size="sm">Save Changes</Btn>
            </SectionHeader>
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-[10px] font-semibold text-gray-500 uppercase w-32">Module</th>
                    <th className="px-3 py-3 text-left text-[10px] font-semibold text-gray-500 uppercase w-20">Action</th>
                    <th className="px-3 py-3 text-center text-[10px] font-semibold text-red-600 uppercase">Super Admin</th>
                    <th className="px-3 py-3 text-center text-[10px] font-semibold text-[#5C5CFF] uppercase">HR Admin</th>
                    <th className="px-3 py-3 text-center text-[10px] font-semibold text-amber-600 uppercase">Manager</th>
                    <th className="px-3 py-3 text-center text-[10px] font-semibold text-green-600 uppercase">Employee</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[["Organization","View",true,true,false,false],["Organization","Edit",true,true,false,false],["Employees","View",true,true,true,false],["Employees","Create/Edit",true,true,false,false],["Attendance","View",true,true,true,true],["Attendance","Approve",true,true,true,false],["Leave","View",true,true,true,true],["Leave","Approve",true,true,true,false],["Leave","Configure",true,true,false,false],["Reports","View",true,true,true,false],["Reports","Export",true,true,false,false],["Settings","Access",true,false,false,false],["Access Control","Configure",true,false,false,false],["Audit Logs","View",true,true,false,false]].map(([mod,action,sa,hr,mgr,emp],i)=>(
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-4 py-2 text-xs font-medium text-gray-700">{[0,2,4,6,9,11,12,13].includes(i)?mod:""}</td>
                      <td className="px-3 py-2 text-xs text-gray-500">{action as string}</td>
                      {[sa,hr,mgr,emp].map((v,ci)=>(
                        <td key={ci} className="px-3 py-2 text-center">
                          <div className={cn("w-4 h-4 rounded border mx-auto flex items-center justify-center cursor-pointer",v?"bg-[#5C5CFF] border-[#5C5CFF]":"border-gray-300 hover:border-[#5C5CFF]/50")}>
                            {v&&<Check size={10} className="text-white"/>}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {nav==="Administrators"&&(
          <div className="max-w-2xl space-y-4">
            <SectionHeader title="Administrators" subtitle="Users with elevated system access">
              <Btn size="sm"><UserPlus size={12}/>Add Administrator</Btn>
            </SectionHeader>
            {[{name:"Alex Admin",email:"alex.admin@acmecorp.com",role:"Super Admin",color:"#EF4444",since:"Jan 15, 2021"},{name:"Aisha Thompson",email:"aisha.t@acmecorp.com",role:"HR Admin",color:"#5C5CFF",since:"Apr 18, 2019"},{name:"David Chen",email:"david.chen@acmecorp.com",role:"HR Admin",color:"#F59E0B",since:"Nov 5, 2018"}].map((a,i)=>(
              <div key={a.email} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4">
                <Avt initials={a.name.split(" ").map(n=>n[0]).join("")} color={a.color} size="lg"/>
                <div className="flex-1"><p className="text-sm font-semibold text-gray-800">{a.name}</p><p className="text-xs text-gray-500">{a.email}</p><p className="text-[10px] text-gray-400 mt-0.5">Since {a.since}</p></div>
                <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{backgroundColor:a.color+"18",color:a.color}}>{a.role}</span>
                <div className="flex gap-2"><Btn variant="outline" size="sm"><Edit size={12}/>Edit</Btn>{i>0&&<Btn variant="ghost" size="sm" className="text-red-500 hover:bg-red-50">Remove</Btn>}</div>
              </div>
            ))}
          </div>
        )}

      </div>

      {showCreateRole&&(
        <Modal title="Create Custom Role" onClose={()=>setShowCreateRole(false)} width="max-w-xl">
          <div className="space-y-4">
            <InputField label="Role Name" placeholder="e.g. Finance Manager" required/>
            <InputField label="Description" placeholder="Describe this role's purpose"/>
            <SelectField label="Base Permissions From" options={["Start from scratch","Employee","Manager","HR Admin","Super Admin"]}/>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs font-semibold text-gray-700 mb-3">Module Permissions</p>
              <div className="space-y-2">
                {["My Space","Team","Organization","Attendance","Leave","Documents","Reports"].map(mod=>(
                  <div key={mod} className="flex items-center justify-between py-1">
                    <span className="text-sm text-gray-700">{mod}</span>
                    <div className="flex gap-3">{["View","Edit","Delete","Export"].map(p=><label key={p} className="flex items-center gap-1 text-[10px] text-gray-500 cursor-pointer"><input type="checkbox" className="rounded accent-[#5C5CFF]"/>{p}</label>)}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2 border-t border-gray-200"><Btn variant="outline" onClick={()=>setShowCreateRole(false)}>Cancel</Btn><Btn onClick={()=>setShowCreateRole(false)}>Create Role</Btn></div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── MANAGE SERVICES ────────────────────────────────────────────────────────────
function ManageServicesSection() {
  const [services, setServices] = useState([
    {id:"attendance",name:"Attendance",desc:"Track employee check-ins, check-outs and work hours",icon:Clock,enabled:true,license:"847/1000 users"},
    {id:"leave",name:"Leave Management",desc:"Manage leave requests, approvals and balances",icon:CalendarDays,enabled:true,license:"847/1000 users"},
    {id:"tasks",name:"Tasks",desc:"Assign and track employee tasks and projects",icon:ClipboardList,enabled:true,license:"847/1000 users"},
    {id:"documents",name:"Documents",desc:"Centralized document storage and management",icon:FileText,enabled:true,license:"Unlimited"},
    {id:"announcements",name:"Announcements",desc:"Company-wide announcements and notifications",icon:Megaphone,enabled:true,license:"Unlimited"},
    {id:"calendar",name:"Calendar",desc:"Unified calendar for events, leave and schedules",icon:CalendarDays,enabled:true,license:"Unlimited"},
    {id:"ai",name:"AI Assistant",desc:"AI-powered HR copilot and smart suggestions",icon:Bot,enabled:true,license:"Beta"},
    {id:"notifications",name:"Notifications",desc:"Email, push and in-app notification delivery",icon:Bell,enabled:true,license:"Unlimited"},
  ]);
  const toggle = (id:string) => setServices(s=>s.map(svc=>svc.id===id?{...svc,enabled:!svc.enabled}:svc));

  return (
    <div className="flex-1 overflow-auto p-6">
      <SectionHeader title="Manage Services" subtitle="Enable or disable platform modules for your organization"/>
      <div className="grid grid-cols-2 gap-4 max-w-3xl">
        {services.map(svc=>(
          <div key={svc.id} className={cn("bg-white border rounded-xl p-5 transition-all",svc.enabled?"border-gray-200":"border-gray-200 opacity-60")}>
            <div className="flex items-start justify-between mb-3">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center",svc.enabled?"bg-[#EEF2FF]":"bg-gray-100")}>
                <svc.icon size={18} className={svc.enabled?"text-[#5C5CFF]":"text-gray-400"}/>
              </div>
              <Toggle on={svc.enabled} onChange={()=>toggle(svc.id)}/>
            </div>
            <h4 className="text-sm font-semibold text-gray-800 mb-0.5">{svc.name}</h4>
            <p className="text-xs text-gray-500 mb-3">{svc.desc}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5"><Database size={11} className="text-gray-400"/><span className="text-[10px] text-gray-400">{svc.license}</span></div>
              {svc.enabled&&<button className="text-[10px] text-[#5C5CFF] hover:underline">Configure</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── AUTOMATION ─────────────────────────────────────────────────────────────────
function AutomationSection() {
  const [nav, setNav] = useState<AutomNav>("Approval Workflows");
  const [showCreateWf, setShowCreateWf] = useState(false);

  const WORKFLOWS = [
    {name:"Leave Approval",trigger:"Leave Request Submitted",levels:["Direct Manager","HR Manager"],auto:"3 days",active:true,color:"#5C5CFF"},
    {name:"Attendance Correction",trigger:"Correction Request Submitted",levels:["Direct Manager"],auto:"2 days",active:true,color:"#22C55E"},
    {name:"Work From Home",trigger:"WFH Request Submitted",levels:["Direct Manager"],auto:"1 day",active:true,color:"#F59E0B"},
    {name:"Department Transfer",trigger:"Transfer Request Submitted",levels:["Current Manager","HR Admin","Target Manager"],auto:"5 days",active:false,color:"#8B5CF6"},
    {name:"Shift Change",trigger:"Shift Change Request",levels:["HR Admin"],auto:"2 days",active:true,color:"#EF4444"},
  ];

  return (
    <div className="flex h-full overflow-hidden">
      <div className="w-48 flex-shrink-0 border-r border-gray-200 bg-gray-50 overflow-auto py-3">
        {(["Approval Workflows","Attendance Automation","Leave Automation","Shift Automation","Notification Automation","Business Rules","Scheduled Jobs"] as AutomNav[]).map(n=>(
          <button key={n} onClick={()=>setNav(n)} className={cn("w-full text-left px-4 py-2.5 text-xs font-medium transition-colors",nav===n?"bg-white text-[#5C5CFF] border-r-2 border-[#5C5CFF]":"text-gray-600 hover:bg-white hover:text-gray-800")}>{n}</button>
        ))}
      </div>

      <div className="flex-1 overflow-auto p-6">

        {nav==="Approval Workflows"&&(
          <div className="max-w-2xl space-y-4">
            <SectionHeader title="Approval Workflows" subtitle="Configure multi-level approval chains">
              <Btn size="sm" onClick={()=>setShowCreateWf(true)}><Plus size={12}/>Create Workflow</Btn>
            </SectionHeader>
            {WORKFLOWS.map(w=>(
              <div key={w.name} className="bg-white border border-gray-200 rounded-xl p-5">
                <div className="flex items-start justify-between mb-3">
                  <div><h4 className="text-sm font-semibold text-gray-800">{w.name}</h4><p className="text-xs text-gray-400 mt-0.5">Trigger: {w.trigger}</p></div>
                  <div className="flex items-center gap-2"><Toggle on={w.active} onChange={()=>{}}/><Btn variant="outline" size="sm"><Edit size={11}/>Edit</Btn></div>
                </div>
                <div className="flex items-center gap-2 flex-wrap mb-3">
                  {w.levels.map((l,i)=>(
                    <div key={i} className="flex items-center gap-2">
                      {i>0&&<ArrowRight size={12} className="text-gray-300"/>}
                      <span className="px-2.5 py-1 rounded-lg text-xs font-medium text-white" style={{backgroundColor:w.color}}>L{i+1}: {l}</span>
                    </div>
                  ))}
                  <button className="px-2 py-1 border border-dashed border-gray-300 rounded-lg text-[10px] text-gray-400 hover:border-[#5C5CFF]/40 hover:text-[#5C5CFF] flex items-center gap-1"><Plus size={10}/>Add Level</button>
                </div>
                <p className="text-[10px] text-gray-400">Auto-escalate after {w.auto} · Email + In-App notifications</p>
              </div>
            ))}
          </div>
        )}

        {(nav==="Attendance Automation"||nav==="Leave Automation"||nav==="Shift Automation")&&(
          <div className="max-w-2xl space-y-4">
            <SectionHeader title={nav} subtitle="Configure automated rules and triggers">
              <Btn size="sm"><Plus size={12}/>Add Rule</Btn>
            </SectionHeader>
            {[
              {name:"Auto Mark Late",desc:"Automatically mark employee as late if check-in after grace period",enabled:true},
              {name:"Missing Check-out Alert",desc:"Send notification when employee hasn't checked out by shift end",enabled:true},
              {name:"Consecutive Absence Alert",desc:"Alert HR when employee is absent for 3+ consecutive days",enabled:false},
              {name:"Auto Deduct Leave",desc:"Automatically deduct casual leave for approved late arrivals",enabled:false},
            ].map(rule=>(
              <div key={rule.name} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4">
                <div className="flex-1"><h4 className="text-sm font-medium text-gray-800">{rule.name}</h4><p className="text-xs text-gray-500 mt-0.5">{rule.desc}</p></div>
                <Toggle on={rule.enabled} onChange={()=>{}}/>
                <Btn variant="ghost" size="sm"><Edit size={12}/></Btn>
              </div>
            ))}
          </div>
        )}

        {nav==="Notification Automation"&&(
          <div className="max-w-2xl space-y-4">
            <SectionHeader title="Notification Automation" subtitle="Configure automated notification triggers">
              <Btn size="sm"><Plus size={12}/>Add Notification</Btn>
            </SectionHeader>
            {[
              {event:"Leave Request Submitted",channels:["Email","In-App"],recipients:["Direct Manager","HR Admin"],enabled:true},
              {event:"Leave Approved/Rejected",channels:["Email","In-App","Push"],recipients:["Requester"],enabled:true},
              {event:"Work Anniversary",channels:["In-App"],recipients:["Employee","Manager"],enabled:true},
              {event:"Birthday Reminder",channels:["In-App"],recipients:["Team Members"],enabled:false},
              {event:"Attendance Exception",channels:["Email"],recipients:["HR Admin","Manager"],enabled:true},
            ].map(n=>(
              <div key={n.event} className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-800">{n.event}</h4>
                  <Toggle on={n.enabled} onChange={()=>{}}/>
                </div>
                <div className="flex flex-wrap gap-2 text-[10px]">
                  {n.channels.map(c=><span key={c} className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded">{c}</span>)}
                  {n.recipients.map(r=><span key={r} className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded">→ {r}</span>)}
                </div>
              </div>
            ))}
          </div>
        )}

        {nav==="Business Rules"&&(
          <div className="max-w-2xl space-y-4">
            <SectionHeader title="Business Rules" subtitle="Custom logic and validation rules">
              <Btn size="sm"><Plus size={12}/>Create Rule</Btn>
            </SectionHeader>
            {[
              {name:"Minimum Notice Period",rule:"Leave requests must be submitted at least 3 days in advance",type:"Validation",active:true},
              {name:"Maximum WFH Days",rule:"Employees cannot exceed 8 WFH days per month",type:"Limit",active:true},
              {name:"Consecutive Leave Cap",rule:"Maximum 15 consecutive leave days without manager approval at Director level",type:"Validation",active:false},
            ].map(r=>(
              <div key={r.name} className="bg-white border border-gray-200 rounded-xl p-4 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0 mt-0.5"><Zap size={14} className="text-amber-500"/></div>
                <div className="flex-1"><h4 className="text-sm font-medium text-gray-800">{r.name}</h4><p className="text-xs text-gray-500 mt-0.5">{r.rule}</p><span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded mt-1 inline-block">{r.type}</span></div>
                <Toggle on={r.active} onChange={()=>{}}/>
                <Btn variant="ghost" size="sm"><Edit size={12}/></Btn>
              </div>
            ))}
          </div>
        )}

        {nav==="Scheduled Jobs"&&(
          <div className="max-w-3xl space-y-4">
            <SectionHeader title="Scheduled Jobs" subtitle="Automated background tasks">
              <Btn size="sm"><Plus size={12}/>Schedule Job</Btn>
            </SectionHeader>
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <TableHead cols={["Job","Schedule","Last Run","Next Run","Status","Actions"]}/>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["Attendance Summary Report","Daily · 11:59 PM","Jul 1, 11:59 PM","Jul 2, 11:59 PM","Active"],
                    ["Leave Balance Update","Monthly · 1st","Jul 1","Aug 1","Active"],
                    ["Biometric Sync","Every 15 min","Jul 1, 2:30 PM","Jul 1, 2:45 PM","Active"],
                    ["Payroll Data Export","Monthly · 25th","Jun 25","Jul 25","Active"],
                    ["Audit Log Archive","Weekly · Sunday","Jun 30","Jul 7","Paused"],
                  ].map(([job,sched,last,next,status])=>(
                    <tr key={job} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-800">{job}</td>
                      <td className="px-4 py-3 text-xs text-gray-500">{sched}</td>
                      <td className="px-4 py-3 text-xs text-gray-400">{last}</td>
                      <td className="px-4 py-3 text-xs text-gray-500">{next}</td>
                      <td className="px-4 py-3"><StatusBadge status={status==="Active"?"Active":"Pending"}/></td>
                      <td className="px-4 py-3 flex gap-1"><button className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600" title="Run Now"><RefreshCw size={12}/></button><button className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600"><Edit size={12}/></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {showCreateWf&&(
        <Modal title="Create Approval Workflow" onClose={()=>setShowCreateWf(false)} width="max-w-xl">
          <div className="space-y-4">
            <InputField label="Workflow Name" placeholder="e.g. Overtime Approval" required/>
            <SelectField label="Trigger Event" options={["Leave Request","Attendance Correction","WFH Request","Shift Change","Department Transfer","Custom"]} required/>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Approval Levels</p>
              {["Level 1: Direct Manager","Level 2: HR Admin"].map((l,i)=>(
                <div key={i} className="flex items-center gap-2 mb-2"><span className="text-xs text-[#5C5CFF] bg-[#EEF2FF] px-2.5 py-1 rounded-lg font-medium">{l}</span><button className="text-xs text-red-400 hover:text-red-600"><X size={12}/></button></div>
              ))}
              <button className="flex items-center gap-1 text-xs text-[#5C5CFF] hover:underline"><Plus size={11}/>Add Level</button>
            </div>
            <SelectField label="Auto-Escalate After" options={["1 day","2 days","3 days","5 days","1 week"]}/>
            <div className="flex justify-end gap-3 pt-2 border-t border-gray-200"><Btn variant="outline" onClick={()=>setShowCreateWf(false)}>Cancel</Btn><Btn onClick={()=>setShowCreateWf(false)}>Create Workflow</Btn></div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── APPROVALS ──────────────────────────────────────────────────────────────────
function ApprovalsSection() {
  const [nav, setNav] = useState<ApprovalNav>("Leave");
  const [approvals, setApprovals] = useState([
    {id:"A1",type:"Leave",employee:"Sarah Mitchell",dept:"Engineering",detail:"Annual Leave · 5 days · Jul 5–9",applied:"Jun 28",status:"Pending"},
    {id:"A2",type:"Leave",employee:"Yuki Tanaka",dept:"Engineering",detail:"Casual Leave · 1 day · Jul 4",applied:"Jul 2",status:"Pending"},
    {id:"A3",type:"Attendance",employee:"Marcus Johnson",dept:"Product",detail:"Missing check-out · Jul 1",applied:"Jul 1",status:"Pending"},
    {id:"A4",type:"Shift",employee:"Priya Sharma",dept:"Design",detail:"Shift change · General → Morning",applied:"Jun 29",status:"Pending"},
    {id:"A5",type:"Department",employee:"Robert Kim",dept:"Finance",detail:"Transfer · Finance → Operations",applied:"Jun 28",status:"Pending"},
    {id:"A6",type:"Leave",employee:"Marcus Johnson",dept:"Product",detail:"Sick Leave · 2 days",applied:"Jun 28",status:"Approved"},
    {id:"A7",type:"Attendance",employee:"James O'Brien",dept:"Sales",detail:"Late arrival correction",applied:"Jun 27",status:"Rejected"},
  ]);
  const approveFn = (id:string) => setApprovals(a=>a.map(x=>x.id===id?{...x,status:"Approved"}:x));
  const rejectFn  = (id:string) => setApprovals(a=>a.map(x=>x.id===id?{...x,status:"Rejected"}:x));

  const navItems: ApprovalNav[] = ["Attendance","Leave","Shift","Department","Employee","Delegation","Approval Matrix","History"];
  const activeApprovals = approvals.filter(a=>
    nav==="History"?a.status!=="Pending":
    nav==="Approval Matrix"?true:
    a.type===nav&&a.status==="Pending"
  );
  const pendingCount = (type:string) => approvals.filter(a=>a.type===type&&a.status==="Pending").length;

  return (
    <div className="flex h-full overflow-hidden">
      <div className="w-48 flex-shrink-0 border-r border-gray-200 bg-gray-50 overflow-auto py-3">
        {navItems.map(n=>(
          <button key={n} onClick={()=>setNav(n)} className={cn("w-full flex items-center justify-between px-4 py-2.5 text-xs font-medium transition-colors",nav===n?"bg-white text-[#5C5CFF] border-r-2 border-[#5C5CFF]":"text-gray-600 hover:bg-white hover:text-gray-800")}>
            {n}
            {["Attendance","Leave","Shift","Department","Employee"].includes(n)&&pendingCount(n)>0&&(
              <span className="w-4 h-4 bg-amber-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">{pendingCount(n)}</span>
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-auto p-6">

        {nav==="Approval Matrix"&&(
          <div className="max-w-3xl space-y-4">
            <SectionHeader title="Approval Matrix" subtitle="Configure who approves what across the organization"/>
            {[
              {type:"Leave Request",chain:["Direct Manager","HR Manager"],notify:["Requester","HR"],auto:"3 days"},
              {type:"Attendance Correction",chain:["Direct Manager"],notify:["Requester"],auto:"2 days"},
              {type:"Work From Home",chain:["Direct Manager"],notify:["Requester"],auto:"1 day"},
              {type:"Shift Change",chain:["HR Admin"],notify:["Requester","Manager"],auto:"2 days"},
              {type:"Department Transfer",chain:["Current Manager","HR Admin","Target Manager"],notify:["Requester","Both Managers"],auto:"5 days"},
            ].map(m=>(
              <div key={m.type} className="bg-white border border-gray-200 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3"><h4 className="text-sm font-semibold text-gray-800">{m.type}</h4><Btn variant="outline" size="sm"><Edit size={11}/>Edit</Btn></div>
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  {m.chain.map((c,i)=><React.Fragment key={i}>{i>0&&<ArrowRight size={12} className="text-gray-300"/>}<span className="px-2.5 py-1 bg-[#EEF2FF] text-[#5C5CFF] rounded-lg text-xs font-medium">L{i+1}: {c}</span></React.Fragment>)}
                </div>
                <p className="text-[10px] text-gray-400">Auto-escalate after {m.auto} · Notify: {m.notify.join(", ")}</p>
              </div>
            ))}
          </div>
        )}

        {nav==="History"&&(
          <div className="max-w-3xl space-y-4">
            <SectionHeader title="Approval History" subtitle="All past approvals and rejections">
              <Btn variant="outline" size="sm"><Download size={12}/>Export</Btn>
            </SectionHeader>
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <TableHead cols={["Employee","Type","Details","Applied","Status","Reviewed By"]}/>
                <tbody className="divide-y divide-gray-100">
                  {approvals.filter(a=>a.status!=="Pending").map(a=>(
                    <tr key={a.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3"><div className="flex items-center gap-2"><Avt initials={a.employee.split(" ").map(n=>n[0]).join("")} color={EMP_COLORS[parseInt(a.id.slice(-1))%EMP_COLORS.length]} size="sm"/><span className="text-sm font-medium text-gray-800">{a.employee}</span></div></td>
                      <td className="px-4 py-3"><span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded">{a.type}</span></td>
                      <td className="px-4 py-3 text-xs text-gray-500">{a.detail}</td>
                      <td className="px-4 py-3 text-xs text-gray-400">{a.applied}</td>
                      <td className="px-4 py-3"><StatusBadge status={a.status}/></td>
                      <td className="px-4 py-3 text-xs text-gray-500">Alex Admin</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {!["Approval Matrix","History"].includes(nav)&&(
          <div className="max-w-3xl space-y-4">
            <SectionHeader title={`${nav} Approvals`} subtitle={`Pending ${nav.toLowerCase()} approval requests`}>
              {activeApprovals.filter(a=>a.status==="Pending").length>0&&<><Btn variant="outline" size="sm"><Check size={12}/>Approve All</Btn></>}
            </SectionHeader>
            {activeApprovals.length===0?(
              <div className="bg-white border border-gray-200 rounded-xl p-10 text-center">
                <CheckCircle size={28} className="text-green-300 mx-auto mb-2"/>
                <p className="text-sm text-gray-500">No pending {nav.toLowerCase()} approvals</p>
              </div>
            ):(
              <div className="space-y-3">
                {activeApprovals.map(a=>(
                  <div key={a.id} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4">
                    <Avt initials={a.employee.split(" ").map(n=>n[0]).join("")} color={EMP_COLORS[parseInt(a.id.slice(-1))%EMP_COLORS.length]} size="md"/>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-800">{a.employee}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{a.detail}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{a.dept} · Applied {a.applied}</p>
                    </div>
                    {a.status==="Pending"?(
                      <div className="flex gap-2">
                        <button onClick={()=>approveFn(a.id)} className="px-3 py-1.5 bg-green-50 text-green-700 border border-green-200 rounded-lg text-xs font-medium hover:bg-green-100 flex items-center gap-1"><Check size={11}/>Approve</button>
                        <button onClick={()=>rejectFn(a.id)} className="px-3 py-1.5 bg-red-50 text-red-600 border border-red-200 rounded-lg text-xs font-medium hover:bg-red-100 flex items-center gap-1"><X size={11}/>Reject</button>
                        <button className="px-2.5 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-500 hover:bg-gray-50">Comment</button>
                      </div>
                    ):<StatusBadge status={a.status}/>}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

// ── AUDIT LOGS ─────────────────────────────────────────────────────────────────
function AuditLogsSection() {
  const [logTab, setLogTab] = useState("All");
  const [search, setSearch] = useState("");
  const LOGS = [
    {id:1,user:"Alex Admin",action:"Approved leave — Sarah Mitchell",module:"Approvals",type:"Leave",time:"Jul 1, 11:32 AM",ip:"192.168.1.12",status:"Success"},
    {id:2,user:"Aisha Thompson",action:"Updated leave policy FY2025",module:"Organization Setup",type:"Config",time:"Jun 30, 3:15 PM",ip:"192.168.1.8",status:"Success"},
    {id:3,user:"Alex Admin",action:"Added employee: Yuki Tanaka",module:"Users",type:"User",time:"Jun 28, 9:45 AM",ip:"192.168.1.12",status:"Success"},
    {id:4,user:"David Chen",action:"Modified shift: Night Shift schedule",module:"Automation",type:"Config",time:"Jun 27, 4:30 PM",ip:"192.168.1.20",status:"Success"},
    {id:5,user:"Unknown",action:"Failed login attempt — 3 tries",module:"Authentication",type:"Login",time:"Jun 27, 2:14 AM",ip:"203.0.113.45",status:"Failed"},
    {id:6,user:"Alex Admin",action:"Role assigned: Manager → Marcus Johnson",module:"Access Control",type:"Permission",time:"Jun 26, 2:00 PM",ip:"192.168.1.12",status:"Success"},
    {id:7,user:"Aisha Thompson",action:"Exported employee data (CSV, 847 records)",module:"Users",type:"Export",time:"Jun 25, 11:22 AM",ip:"192.168.1.8",status:"Success"},
    {id:8,user:"Alex Admin",action:"Created custom role: Finance Manager",module:"Access Control",type:"Permission",time:"Jun 24, 3:45 PM",ip:"192.168.1.12",status:"Success"},
    {id:9,user:"Alex Admin",action:"Enabled AI Assistant module",module:"Manage Services",type:"Config",time:"Jun 23, 10:00 AM",ip:"192.168.1.12",status:"Success"},
    {id:10,user:"System",action:"Scheduled job: Attendance summary completed",module:"Automation",type:"System",time:"Jun 23, 12:00 AM",ip:"Internal",status:"Success"},
  ];
  const TYPE_COLORS: Record<string,string> = {Login:"bg-blue-50 text-blue-600",Config:"bg-purple-50 text-purple-600",User:"bg-green-50 text-green-600",Permission:"bg-amber-50 text-amber-600",Export:"bg-gray-100 text-gray-600",System:"bg-gray-100 text-gray-500"};
  const filtered = LOGS.filter(l=>{
    const matchTab = logTab==="All"||l.type===logTab||(logTab==="Failed"&&l.status==="Failed");
    const matchSearch = !search||l.user.toLowerCase().includes(search.toLowerCase())||l.action.toLowerCase().includes(search.toLowerCase());
    return matchTab&&matchSearch;
  });

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-3 flex-shrink-0">
        <div className="relative">
          <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"/>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search logs…" className="pl-8 pr-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C5CFF] w-64"/>
        </div>
        <div className="flex gap-1">
          {["All","Login","Config","User","Permission","Export","System","Failed"].map(t=>(
            <button key={t} onClick={()=>setLogTab(t)} className={cn("px-2.5 py-1 text-[10px] font-medium rounded-lg transition-colors",logTab===t?"bg-[#EEF2FF] text-[#5C5CFF]":"text-gray-400 hover:text-gray-600 hover:bg-gray-100")}>{t}</button>
          ))}
        </div>
        <div className="ml-auto flex gap-2">
          <Btn size="sm" variant="outline"><Download size={12}/>Export Logs</Btn>
          <Btn size="sm" variant="outline"><Filter size={12}/>Advanced Filters</Btn>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        <table className="w-full text-sm">
          <TableHead cols={["User","Action","Module","Type","Time","IP","Status"]}/>
          <tbody className="bg-white divide-y divide-gray-100">
            {filtered.map(l=>(
              <tr key={l.id} className="hover:bg-gray-50">
                <td className="px-4 py-3"><div className="flex items-center gap-2"><Avt initials={l.user.split(" ").map(n=>n[0]).join("")} color={EMP_COLORS[l.id%EMP_COLORS.length]} size="sm"/><span className="text-sm font-medium text-gray-800">{l.user}</span></div></td>
                <td className="px-4 py-3 text-xs text-gray-600 max-w-xs">{l.action}</td>
                <td className="px-4 py-3"><span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded">{l.module}</span></td>
                <td className="px-4 py-3"><span className={cn("text-[10px] px-2 py-0.5 rounded font-medium",TYPE_COLORS[l.type]||"bg-gray-100 text-gray-500")}>{l.type}</span></td>
                <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap">{l.time}</td>
                <td className="px-4 py-3 font-mono text-[10px] text-gray-400">{l.ip}</td>
                <td className="px-4 py-3"><span className={cn("text-xs font-medium px-2 py-0.5 rounded",l.status==="Success"?"bg-green-50 text-green-600":"bg-red-50 text-red-600")}>{l.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border-t border-gray-200 px-5 py-2.5 flex items-center justify-between flex-shrink-0 bg-white">
        <span className="text-xs text-gray-400">{filtered.length} events</span>
        <div className="flex items-center gap-1">
          <button className="px-2 py-1 text-xs text-gray-500 hover:bg-gray-100 rounded">Previous</button>
          {[1,2,3].map(p=><button key={p} className={cn("w-7 h-7 text-xs rounded",p===1?"bg-[#5C5CFF] text-white":"text-gray-500 hover:bg-gray-100")}>{p}</button>)}
          <button className="px-2 py-1 text-xs text-gray-500 hover:bg-gray-100 rounded">Next</button>
        </div>
      </div>
    </div>
  );
}

// ── MAIN MANAGE ACCOUNT PAGE ───────────────────────────────────────────────────
export function ManageAccountPage({ onBack }: { onBack: () => void }) {
  const [section, setSection] = useState<MASection>("Users");
  const NAV: { id: MASection; icon: any; label: string }[] = [
    {id:"Users",icon:Users,label:"Users"},
    {id:"Organization Setup",icon:Building2,label:"Organization Setup"},
    {id:"User Access Control",icon:Shield,label:"User Access Control"},
    {id:"Manage Services",icon:Zap,label:"Manage Services"},
    {id:"Automation",icon:RefreshCw,label:"Automation"},
    {id:"Approvals",icon:CheckCircle,label:"Approvals"},
    {id:"Audit Logs",icon:Activity,label:"Audit Logs"},
  ];

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Top bar */}
      <div className="h-12 bg-white border-b border-gray-200 flex items-center flex-shrink-0 px-4 gap-4">
        <button onClick={onBack} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#5C5CFF] transition-colors flex-shrink-0">
          <ChevronLeft size={15}/><span className="font-medium">Settings</span>
        </button>
        <div className="w-px h-4 bg-gray-200"/>
        <div className="flex gap-1 overflow-x-auto">
          {NAV.map(n=>(
            <button key={n.id} onClick={()=>setSection(n.id)} className={cn("flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors flex-shrink-0",section===n.id?"bg-[#EEF2FF] text-[#5C5CFF]":"text-gray-500 hover:text-gray-700 hover:bg-gray-100")}>
              <n.icon size={13}/>{n.label}
            </button>
          ))}
        </div>
        <div className="ml-auto flex-shrink-0">
          <span className="text-[10px] bg-amber-50 text-amber-600 border border-amber-200 px-2 py-0.5 rounded-full font-medium">Admin Console</span>
        </div>
      </div>

      {/* Section content */}
      <div className="flex-1 overflow-hidden">
        {section==="Users"&&<UsersSection/>}
        {section==="Organization Setup"&&<OrgSetupSection/>}
        {section==="User Access Control"&&<AccessControlSection/>}
        {section==="Manage Services"&&<ManageServicesSection/>}
        {section==="Automation"&&<AutomationSection/>}
        {section==="Approvals"&&<ApprovalsSection/>}
        {section==="Audit Logs"&&<AuditLogsSection/>}
      </div>
    </div>
  );
}
