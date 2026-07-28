import React, { useState, useEffect } from "react";
import {
  LayoutDashboard, Users, Clock, Calendar, FileText,
  Megaphone, BarChart2, Settings, ChevronLeft, ChevronRight,
  Search, Bell, Plus, Filter, Download, Upload, MoreHorizontal,
  Check, X, ChevronDown, ArrowUpRight, ArrowDownRight, UserPlus,
  Building2, MapPin, Briefcase, LogOut, Bot, Zap, TrendingUp,
  CheckCircle, Edit, Trash2, Eye, Shield, HelpCircle, Activity,
  List, ChevronUp, Globe, Phone, Mail, Lock, User, AlertCircle,
  ArrowRight, SlidersHorizontal, Database, AlertTriangle,
  RefreshCw, Send, UserCheck, UserX, ExternalLink, CalendarDays,
  Award, FileBarChart, GitBranch, BookOpen, Building, Hash,
  Layers, ClipboardList, Network, Key, Target, Star, Info,
  ChevronRight as CR, Inbox, Package, Copy, XCircle,
  Pin, Bookmark, Share2, Printer, Paperclip, MessageCircle, Archive, Monitor,
  Play, Circle
} from "lucide-react";
import {
  AreaChart, Area, BarChart as RBarChart, Bar,
  LineChart as RLineChart, Line, PieChart as RPieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import {
  AppPage, Employee,
  EMP_COLORS, EMPLOYEES, ATT_TREND, DEPT_DIST, LEAVE_MONTHLY, HEADCOUNT_TREND,
  LEAVE_REQUESTS, ATTENDANCE_RECORDS, NOTIFICATIONS, DOCUMENTS_LIST,
  cn, fmtDate
} from "./data";
import { Avt, StatusBadge, Btn, KPICard, PageHeader, Modal, TabBar, InputField, SelectField } from "./ui";
import { OrganizationPage } from "./OrganizationPage";
import { AppHeader, SegmentedControl } from "./AppHeader";
import { ManageAccountPage } from "./ManageAccount";
import { SetupWizard } from "./SetupWizard";
import { MySpacePage } from "./MySpacePage";

// ── Login ──────────────────────────────────────────────────────────────────────
function LoginPage({ onLogin }: { onLogin:()=>void }) {
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"sso"|"email">("sso");
  const handle = () => { setLoading(true); setTimeout(()=>{setLoading(false);onLogin();},1000); };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left brand panel */}
      <div className="hidden lg:flex lg:w-[52%] bg-[#5C5CFF] flex-col justify-between p-12 relative overflow-hidden">
        {/* Abstract background shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5"/>
          <div className="absolute top-1/3 -left-8 w-48 h-48 rounded-full bg-white/5"/>
          <div className="absolute bottom-12 right-12 w-96 h-96 rounded-full bg-white/5"/>
        </div>
        <div className="relative flex items-center gap-3">
          <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center"><Users size={20} className="text-white"/></div>
          <span className="text-white font-semibold text-lg">Attendance HRMS</span>
        </div>
        <div className="relative">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs px-3 py-1.5 rounded-full mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse"/><span>Enterprise Edition · Trusted by 200+ organizations</span>
          </div>
          <h2 className="text-4xl font-light text-white leading-tight mb-6">Your complete<br/><span className="font-semibold">HR Workspace.</span></h2>
          <p className="text-white/70 text-sm mb-8 leading-relaxed max-w-sm">Attendance, leave, shifts, teams, and approvals — unified in one intelligent platform built for growing organizations.</p>
          <div className="space-y-3">
            {[
              {icon:Users, text:"Unified employee management"},
              {icon:Clock, text:"Real-time attendance & shift tracking"},
              {icon:CheckCircle, text:"Smart approvals & delegation"},
            ].map(({icon:Icon,text})=>(
              <div key={text} className="flex items-center gap-3 text-white/80 text-sm">
                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0"><Icon size={14} className="text-white"/></div>{text}
              </div>
            ))}
          </div>
        </div>
        <p className="relative text-white/30 text-xs">© 2024 Attendance HRMS. All rights reserved.</p>
      </div>

      {/* Right sign-in panel */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-[#5C5CFF] rounded-lg flex items-center justify-center"><Users size={16} className="text-white"/></div>
            <span className="font-semibold text-gray-800">Attendance HRMS</span>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">Sign in</h1>
          <p className="text-gray-500 text-sm mb-8">Access your admin workspace</p>

          {mode === "sso" ? (
            <div className="space-y-3">
              {/* SSO buttons */}
              <button onClick={handle} className="w-full flex items-center gap-3 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
                {/* Google icon */}
                <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>
              <button onClick={handle} className="w-full flex items-center gap-3 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
                {/* Microsoft icon */}
                <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0">
                  <rect x="1" y="1" width="10" height="10" fill="#F25022"/>
                  <rect x="13" y="1" width="10" height="10" fill="#7FBA00"/>
                  <rect x="1" y="13" width="10" height="10" fill="#00A4EF"/>
                  <rect x="13" y="13" width="10" height="10" fill="#FFB900"/>
                </svg>
                Continue with Microsoft
              </button>
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"/></div>
                <div className="relative flex justify-center"><span className="bg-white px-3 text-xs text-gray-400">or</span></div>
              </div>
              <button onClick={()=>setMode("email")} className="w-full py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                Sign in with Email
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <button onClick={()=>setMode("sso")} className="flex items-center gap-1.5 text-xs text-[#5C5CFF] hover:underline mb-2"><ChevronLeft size={13}/>Back to sign-in options</button>
              <InputField label="Work Email" type="email" placeholder="admin@company.com" value="admin@acmecorp.com"/>
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between">
                  <label className="text-sm font-medium text-gray-700">Password</label>
                  <button className="text-xs text-[#5C5CFF] hover:underline">Forgot password?</button>
                </div>
                <input type="password" defaultValue="••••••••••" className="px-3 py-2 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#5C5CFF]"/>
              </div>
              <div className="flex items-center gap-2"><input type="checkbox" defaultChecked className="rounded border-gray-300 accent-[#5C5CFF]"/><label className="text-sm text-gray-600">Keep me signed in</label></div>
              <button onClick={handle} disabled={loading} className="w-full py-2.5 bg-[#5C5CFF] text-white text-sm font-medium rounded-lg hover:bg-[#4A4AE0] transition-colors disabled:opacity-70 flex items-center justify-center gap-2">
                {loading ? <><RefreshCw size={14} className="animate-spin"/>Signing in…</> : "Sign in"}
              </button>
            </div>
          )}

          <p className="mt-8 text-center text-xs text-gray-400">
            By signing in you agree to our <button className="text-[#5C5CFF] hover:underline">Terms of Service</button> and <button className="text-[#5C5CFF] hover:underline">Privacy Policy</button>.
          </p>
          <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg">
            <p className="text-xs text-blue-700 font-medium mb-0.5">Demo access</p>
            <p className="text-xs text-blue-600">Click any sign-in option above to continue with demo credentials.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Create Administrator Account ───────────────────────────────────────────────
function CreateAdminAccountPage({ onContinue, onBack }: { onContinue:()=>void; onBack:()=>void }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [timezone, setTimezone] = useState("(UTC-5) Eastern Time");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [mfaMethod, setMfaMethod] = useState<"app"|"sms">("app");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string|null>(null);
  const [activeSection, setActiveSection] = useState<"personal"|"role"|"security"|"legal">("personal");
  const [submitted, setSubmitted] = useState(false);

  const emailFromAuth = "admin@acmecorp.com";
  const authMethod: "sso"|"email" = "sso";

  const pwdStrength = (() => {
    if (!password) return 0;
    let s = 0;
    if (password.length >= 8) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[0-9]/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return s;
  })();
  const pwdLabel = ["","Weak","Fair","Strong","Very Strong"][pwdStrength];
  const pwdColor = ["","bg-red-400","bg-amber-400","bg-blue-400","bg-green-500"][pwdStrength];

  const SECTIONS = [
    { id:"personal" as const, label:"Personal Information", icon:User },
    { id:"role"     as const, label:"Organization Role",    icon:Briefcase },
    { id:"security" as const, label:"Security",             icon:Shield },
    { id:"legal"    as const, label:"Legal & Consent",      icon:CheckCircle },
  ];

  const isPersonalComplete = firstName.trim()&&lastName.trim()&&mobile.trim();
  const isRoleComplete = jobTitle.trim();
  const isSecurityComplete = authMethod==="sso" || (password.length>=8 && password===confirmPassword);
  const isLegalComplete = acceptTerms && acceptPrivacy;
  const canSubmit = isPersonalComplete && isRoleComplete && isSecurityComplete && isLegalComplete;

  const handleContinue = () => {
    setSubmitted(true);
    if (canSubmit) onContinue();
  };

  const SectionNav = () => (
    <nav className="space-y-1">
      {SECTIONS.map(s => {
        const isComplete =
          s.id==="personal"?!!isPersonalComplete:
          s.id==="role"?!!isRoleComplete:
          s.id==="security"?!!isSecurityComplete:
          isLegalComplete;
        return (
          <button key={s.id} onClick={()=>setActiveSection(s.id)}
            className={cn("w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors text-sm",
              activeSection===s.id?"bg-[#EEF2FF] text-[#5C5CFF] font-medium":"text-gray-600 hover:bg-gray-100"
            )}>
            <div className={cn("w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0",
              isComplete?"bg-green-500":"bg-gray-200"
            )}>
              {isComplete
                ? <Check size={11} className="text-white"/>
                : <s.icon size={11} className="text-gray-500"/>
              }
            </div>
            {s.label}
          </button>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left brand panel */}
      <div className="hidden lg:flex lg:w-[38%] bg-[#5C5CFF] flex-col justify-between p-10 relative overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/5"/>
          <div className="absolute top-1/2 -left-10 w-52 h-52 rounded-full bg-white/5"/>
          <div className="absolute -bottom-10 right-10 w-80 h-80 rounded-full bg-white/5"/>
        </div>
        <div className="relative flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center"><Users size={16} className="text-white"/></div>
          <span className="text-white font-semibold text-sm">Attendance HRMS</span>
        </div>
        <div className="relative space-y-8">
          {/* Step indicator */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              {[1,2,3].map(n=>(
                <React.Fragment key={n}>
                  <div className={cn("w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold",
                    n===1?"bg-white text-[#5C5CFF]":n===2?"bg-white/20 text-white border border-white/30":"bg-white/10 text-white/40 border border-white/10"
                  )}>{n===1?<Check size={13}/>:n}</div>
                  {n<3&&<div className={cn("flex-1 h-px",n===1?"bg-white/40":"bg-white/15")}/>}
                </React.Fragment>
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-white/50 px-0.5">
              <span className="text-white/80 font-medium">Sign in</span>
              <span className="text-white font-semibold">Your Account</span>
              <span>Workspace Setup</span>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white leading-snug mb-3">
              Tell us about<br/>yourself
            </h2>
            <p className="text-white/65 text-sm leading-relaxed">
              This creates your administrator identity for the workspace. Your profile will be visible to employees you invite.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {icon:User,     text:"Your admin profile stays separate from the organization setup."},
              {icon:Shield,   text:"You can enable two-factor authentication to protect this account."},
              {icon:Building, text:"Organization details come next in the setup wizard."},
            ].map(({icon:Icon,text})=>(
              <div key={text} className="flex items-start gap-3 text-white/70 text-xs leading-relaxed">
                <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon size={12} className="text-white"/>
                </div>
                {text}
              </div>
            ))}
          </div>
        </div>
        <p className="relative text-white/25 text-xs">© 2024 Attendance HRMS. All rights reserved.</p>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-8 py-3 flex items-center gap-4">
          <button onClick={onBack} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 transition-colors">
            <ChevronLeft size={14}/>Back to Sign In
          </button>
          <div className="ml-auto flex items-center gap-3">
            <div className="flex gap-1">
              {SECTIONS.map((s,i)=>(
                <div key={s.id} className={cn("h-1 rounded-full transition-all",
                  activeSection===s.id?"w-8 bg-[#5C5CFF]":"w-4",
                  (i===0&&isPersonalComplete)||(i===1&&isRoleComplete)||(i===2&&isSecurityComplete)||(i===3&&isLegalComplete)
                    ?"bg-green-400":"bg-gray-200"
                )}/>
              ))}
            </div>
            <span className="text-xs text-gray-400">{SECTIONS.findIndex(s=>s.id===activeSection)+1} of 4</span>
          </div>
        </div>

        <div className="flex-1 flex gap-0">
          {/* Section sidebar */}
          <div className="hidden xl:block w-56 border-r border-gray-100 p-5 flex-shrink-0 sticky top-[53px] self-start h-[calc(100vh-53px)]">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">Sections</p>
            <SectionNav/>
          </div>

          {/* Main form */}
          <div className="flex-1 px-8 py-8 max-w-2xl">
            <div className="mb-6">
              <h1 className="text-xl font-semibold text-gray-900">Create Administrator Account</h1>
              <p className="text-sm text-gray-500 mt-1">Set up your identity before configuring the workspace.</p>
            </div>

            {/* Mobile section nav */}
            <div className="xl:hidden mb-6">
              <div className="flex gap-2 overflow-x-auto pb-1">
                {SECTIONS.map(s=>(
                  <button key={s.id} onClick={()=>setActiveSection(s.id)} className={cn("flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                    activeSection===s.id?"bg-[#5C5CFF] text-white":"bg-gray-100 text-gray-600 hover:bg-gray-200"
                  )}>{s.label}</button>
                ))}
              </div>
            </div>

            {/* ── PERSONAL INFORMATION ── */}
            {activeSection==="personal"&&(
              <div className="space-y-5">
                <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">
                  <h2 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                    <User size={15} className="text-[#5C5CFF]"/>Personal Information
                  </h2>

                  {/* Photo upload */}
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-full bg-[#EEF2FF] flex items-center justify-center text-[#5C5CFF] font-bold text-xl flex-shrink-0 overflow-hidden border-2 border-[#5C5CFF]/20">
                      {photoPreview
                        ? <img src={photoPreview} className="w-full h-full object-cover" alt=""/>
                        : <span>{(firstName?.[0]||"A").toUpperCase()}{(lastName?.[0]||"").toUpperCase()}</span>
                      }
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Profile Photo</p>
                      <p className="text-xs text-gray-400 mb-2">Optional · JPG or PNG, max 2MB</p>
                      <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                        <Upload size={12}/>Upload Photo
                        <input type="file" accept="image/*" className="hidden" onChange={e=>{
                          const f=e.target.files?.[0];
                          if(f){const r=new FileReader();r.onload=ev=>setPhotoPreview(ev.target?.result as string);r.readAsDataURL(f);}
                        }}/>
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium text-gray-700">First Name <span className="text-red-500">*</span></label>
                      <input value={firstName} onChange={e=>setFirstName(e.target.value)}
                        placeholder="Alex" className={cn("px-3 py-2 text-sm border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#5C5CFF]",submitted&&!firstName.trim()?"border-red-300 focus:ring-red-300":"border-gray-300")}/>
                      {submitted&&!firstName.trim()&&<p className="text-[11px] text-red-500">First name is required</p>}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium text-gray-700">Last Name <span className="text-red-500">*</span></label>
                      <input value={lastName} onChange={e=>setLastName(e.target.value)}
                        placeholder="Johnson" className={cn("px-3 py-2 text-sm border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#5C5CFF]",submitted&&!lastName.trim()?"border-red-300":"border-gray-300")}/>
                      {submitted&&!lastName.trim()&&<p className="text-[11px] text-red-500">Last name is required</p>}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-gray-700">Work Email</label>
                    <div className="relative">
                      <input value={emailFromAuth} readOnly
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-500 pr-24 cursor-not-allowed"/>
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Check size={9}/>Verified
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-400">Pre-filled from your authentication. Cannot be changed here.</p>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-gray-700">Mobile Number <span className="text-red-500">*</span></label>
                    <div className="flex gap-2">
                      <div className="relative flex-shrink-0">
                        <select className="pl-3 pr-7 py-2 text-sm border border-gray-300 rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#5C5CFF]">
                          <option>+1 (US)</option>
                          <option>+44 (UK)</option>
                          <option>+91 (IN)</option>
                          <option>+61 (AU)</option>
                          <option>+1 (CA)</option>
                        </select>
                        <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"/>
                      </div>
                      <input value={mobile} onChange={e=>setMobile(e.target.value)}
                        type="tel" placeholder="(555) 000-0000"
                        className={cn("flex-1 px-3 py-2 text-sm border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#5C5CFF]",submitted&&!mobile.trim()?"border-red-300":"border-gray-300")}/>
                    </div>
                    {submitted&&!mobile.trim()&&<p className="text-[11px] text-red-500">Mobile number is required</p>}
                  </div>
                </div>

                <div className="flex justify-end">
                  <button onClick={()=>setActiveSection("role")} className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#5C5CFF] text-white text-sm font-medium rounded-lg hover:bg-[#4A4AE0] transition-colors">
                    Next: Organization Role<ArrowRight size={14}/>
                  </button>
                </div>
              </div>
            )}

            {/* ── ORGANIZATION ROLE ── */}
            {activeSection==="role"&&(
              <div className="space-y-5">
                <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">
                  <h2 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                    <Briefcase size={15} className="text-[#5C5CFF]"/>Organization Role
                  </h2>
                  <p className="text-xs text-gray-500 -mt-2">This will appear on your admin profile and in the organization directory.</p>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-gray-700">Job Title <span className="text-red-500">*</span></label>
                    <input value={jobTitle} onChange={e=>setJobTitle(e.target.value)}
                      placeholder="e.g. HR Manager, IT Director, CEO"
                      className={cn("px-3 py-2 text-sm border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#5C5CFF]",submitted&&!jobTitle.trim()?"border-red-300":"border-gray-300")}/>
                    {submitted&&!jobTitle.trim()&&<p className="text-[11px] text-red-500">Job title is required</p>}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-gray-700">Department <span className="text-gray-400 font-normal">(optional)</span></label>
                    <div className="relative">
                      <select value={department} onChange={e=>setDepartment(e.target.value)}
                        className="w-full pl-3 pr-8 py-2 text-sm border border-gray-300 rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#5C5CFF]">
                        <option value="">Select department</option>
                        {["Engineering","Product","Design","Marketing","Sales","HR","Finance","Operations","Legal","IT"].map(d=><option key={d}>{d}</option>)}
                      </select>
                      <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"/>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      Time Zone
                      <span className="text-[10px] font-normal text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">Auto-detected from browser</span>
                    </label>
                    <div className="relative">
                      <select value={timezone} onChange={e=>setTimezone(e.target.value)}
                        className="w-full pl-3 pr-8 py-2 text-sm border border-gray-300 rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#5C5CFF]">
                        {["(UTC-12) International Date Line West","(UTC-8) Pacific Time","(UTC-7) Mountain Time","(UTC-6) Central Time","(UTC-5) Eastern Time","(UTC+0) UTC / Greenwich","(UTC+1) Central European Time","(UTC+3) Moscow / Riyadh","(UTC+5:30) India Standard Time","(UTC+8) China / Singapore","(UTC+9) Japan Standard Time","(UTC+10) Australian Eastern","(UTC+12) New Zealand"].map(tz=><option key={tz}>{tz}</option>)}
                      </select>
                      <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"/>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <button onClick={()=>setActiveSection("personal")} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                    <ChevronLeft size={14}/>Back
                  </button>
                  <button onClick={()=>setActiveSection("security")} className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#5C5CFF] text-white text-sm font-medium rounded-lg hover:bg-[#4A4AE0] transition-colors">
                    Next: Security<ArrowRight size={14}/>
                  </button>
                </div>
              </div>
            )}

            {/* ── SECURITY ── */}
            {activeSection==="security"&&(
              <div className="space-y-5">
                {/* Password (email sign-up only) */}
                {authMethod==="email"?(
                  <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">
                    <h2 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                      <Lock size={15} className="text-[#5C5CFF]"/>Set Password
                    </h2>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium text-gray-700">Password <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <input type={showPwd?"text":"password"} value={password} onChange={e=>setPassword(e.target.value)}
                          placeholder="Min 8 characters"
                          className="w-full px-3 py-2 pr-10 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#5C5CFF]"/>
                        <button type="button" onClick={()=>setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                          <Eye size={14}/>
                        </button>
                      </div>
                      {password&&(
                        <div className="space-y-1.5">
                          <div className="flex gap-1">
                            {[1,2,3,4].map(i=><div key={i} className={cn("h-1 flex-1 rounded-full transition-colors",i<=pwdStrength?pwdColor:"bg-gray-200")}/>)}
                          </div>
                          <p className={cn("text-[11px] font-medium",pwdStrength<=1?"text-red-500":pwdStrength===2?"text-amber-500":pwdStrength===3?"text-blue-500":"text-green-500")}>{pwdLabel}</p>
                          <ul className="text-[11px] text-gray-400 space-y-0.5">
                            {[["8+ characters",password.length>=8],[/[A-Z]/.test(password),"Uppercase letter"],[/[0-9]/.test(password),"Number"],[/[^A-Za-z0-9]/.test(password),"Special character"]].map(([val,label])=>(
                              <li key={label as string} className={cn("flex items-center gap-1.5",val?"text-green-600":"text-gray-400")}>
                                <Check size={9} className={cn(val?"opacity-100":"opacity-0")}/>{label}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium text-gray-700">Confirm Password <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <input type={showConfirm?"text":"password"} value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)}
                          placeholder="Re-enter password"
                          className={cn("w-full px-3 py-2 pr-10 text-sm border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#5C5CFF]",
                            confirmPassword&&confirmPassword!==password?"border-red-300":"border-gray-300")}/>
                        <button type="button" onClick={()=>setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                          <Eye size={14}/>
                        </button>
                      </div>
                      {confirmPassword&&confirmPassword!==password&&<p className="text-[11px] text-red-500">Passwords do not match</p>}
                      {confirmPassword&&confirmPassword===password&&password.length>=8&&<p className="text-[11px] text-green-600 flex items-center gap-1"><Check size={10}/>Passwords match</p>}
                    </div>
                  </div>
                ):(
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h2 className="text-sm font-semibold text-gray-800 flex items-center gap-2 mb-3">
                      <Lock size={15} className="text-[#5C5CFF]"/>Password
                    </h2>
                    <div className="flex items-start gap-3 p-3.5 bg-green-50 rounded-lg border border-green-100">
                      <CheckCircle size={16} className="text-green-500 flex-shrink-0 mt-0.5"/>
                      <div>
                        <p className="text-sm font-medium text-green-800">Authenticated via SSO</p>
                        <p className="text-xs text-green-700 mt-0.5">Your account is secured through Google / Microsoft Single Sign-On. No password is required.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2FA */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                        <Shield size={15} className="text-[#5C5CFF]"/>Two-Factor Authentication
                        <span className="text-[10px] font-medium text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded ml-1">Optional</span>
                      </h2>
                      <p className="text-xs text-gray-500 mt-0.5">Add a second layer of security to your administrator account.</p>
                    </div>
                    <button onClick={()=>setMfaEnabled(!mfaEnabled)}
                      className={cn("w-11 h-6 rounded-full relative transition-colors flex-shrink-0 mt-0.5",mfaEnabled?"bg-[#5C5CFF]":"bg-gray-300")}>
                      <div className={cn("absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform",mfaEnabled?"left-5":"left-0.5")}/>
                    </button>
                  </div>

                  {mfaEnabled&&(
                    <div className="space-y-3 pt-2 border-t border-gray-100">
                      <p className="text-xs font-medium text-gray-600">Choose authentication method</p>
                      <div className="grid grid-cols-2 gap-3">
                        {([
                          {id:"app",icon:Key,title:"Authenticator App",sub:"Google Authenticator, Authy, etc."},
                          {id:"sms",icon:Phone,title:"SMS / Text Message",sub:"Receive codes via your mobile number"},
                        ] as const).map(opt=>(
                          <button key={opt.id} onClick={()=>setMfaMethod(opt.id)}
                            className={cn("p-3.5 rounded-xl border-2 text-left transition-all",
                              mfaMethod===opt.id?"border-[#5C5CFF] bg-[#EEF2FF]":"border-gray-200 hover:border-gray-300"
                            )}>
                            <opt.icon size={18} className={cn("mb-2",mfaMethod===opt.id?"text-[#5C5CFF]":"text-gray-400")}/>
                            <p className={cn("text-xs font-semibold",mfaMethod===opt.id?"text-[#5C5CFF]":"text-gray-700")}>{opt.title}</p>
                            <p className="text-[10px] text-gray-400 mt-0.5">{opt.sub}</p>
                          </button>
                        ))}
                      </div>
                      {mfaMethod==="app"&&(
                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex items-start gap-4">
                          {/* Mock QR code */}
                          <div className="w-20 h-20 bg-white rounded-lg border border-gray-200 flex-shrink-0 grid grid-cols-5 gap-0.5 p-2">
                            {Array.from({length:25},(_,i)=>(
                              <div key={i} className={cn("rounded-[1px]",[0,1,2,3,4,5,9,10,14,15,19,20,21,22,23,24,7,12,17].includes(i)?"bg-gray-900":"bg-white")}/>
                            ))}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-gray-800 mb-1">Scan with your authenticator app</p>
                            <p className="text-[11px] text-gray-500 mb-2 leading-relaxed">Open your app and scan the QR code, or enter the key manually:</p>
                            <code className="text-[11px] font-mono bg-gray-100 px-2 py-1 rounded text-gray-700 break-all">JBSW Y3DP EHPK 3PXP</code>
                          </div>
                        </div>
                      )}
                      {mfaMethod==="sms"&&(
                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                          <p className="text-xs text-gray-600 mb-2">A verification code will be sent to your registered mobile number ending in <strong>•••• {mobile.slice(-4)||"0000"}</strong>.</p>
                          <button className="text-xs text-[#5C5CFF] hover:underline">Change mobile number</button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <button onClick={()=>setActiveSection("role")} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                    <ChevronLeft size={14}/>Back
                  </button>
                  <button onClick={()=>setActiveSection("legal")} className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#5C5CFF] text-white text-sm font-medium rounded-lg hover:bg-[#4A4AE0] transition-colors">
                    Next: Legal &amp; Consent<ArrowRight size={14}/>
                  </button>
                </div>
              </div>
            )}

            {/* ── LEGAL & CONSENT ── */}
            {activeSection==="legal"&&(
              <div className="space-y-5">
                <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">
                  <h2 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                    <CheckCircle size={15} className="text-[#5C5CFF]"/>Legal &amp; Consent
                  </h2>

                  <div className="space-y-4">
                    {/* Terms */}
                    <label className={cn("flex items-start gap-3.5 p-4 rounded-xl border-2 cursor-pointer transition-all",
                      acceptTerms?"border-[#5C5CFF] bg-[#EEF2FF]":"border-gray-200 hover:border-gray-300"
                    )}>
                      <input type="checkbox" checked={acceptTerms} onChange={e=>setAcceptTerms(e.target.checked)}
                        className="mt-0.5 rounded accent-[#5C5CFF] flex-shrink-0"/>
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          I accept the <button type="button" className="text-[#5C5CFF] hover:underline font-semibold" onClick={e=>e.stopPropagation()}>Terms &amp; Conditions</button>
                          <span className="text-red-500 ml-1">*</span>
                        </p>
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                          By accepting, you agree to be bound by the Attendance HRMS Terms of Service, including the acceptable use policy and administrator responsibilities.
                        </p>
                      </div>
                    </label>

                    {/* Privacy */}
                    <label className={cn("flex items-start gap-3.5 p-4 rounded-xl border-2 cursor-pointer transition-all",
                      acceptPrivacy?"border-[#5C5CFF] bg-[#EEF2FF]":"border-gray-200 hover:border-gray-300"
                    )}>
                      <input type="checkbox" checked={acceptPrivacy} onChange={e=>setAcceptPrivacy(e.target.checked)}
                        className="mt-0.5 rounded accent-[#5C5CFF] flex-shrink-0"/>
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          I accept the <button type="button" className="text-[#5C5CFF] hover:underline font-semibold" onClick={e=>e.stopPropagation()}>Privacy Policy</button>
                          <span className="text-red-500 ml-1">*</span>
                        </p>
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                          You confirm that you have read and understood how we collect, use, and protect personal data under GDPR, CCPA, and applicable data protection laws.
                        </p>
                      </div>
                    </label>
                  </div>

                  {/* Completion summary */}
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-xs font-semibold text-gray-500 mb-3">Account Summary</p>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        {label:"Name",value:firstName&&lastName?`${firstName} ${lastName}`:"—"},
                        {label:"Email",value:emailFromAuth},
                        {label:"Mobile",value:mobile||"—"},
                        {label:"Job Title",value:jobTitle||"—"},
                        {label:"Department",value:department||"—"},
                        {label:"Time Zone",value:timezone.split(")")[1]?.trim()||timezone},
                        {label:"2FA",value:mfaEnabled?`Enabled (${mfaMethod==="app"?"Authenticator":"SMS"})`:"Not enabled"},
                        {label:"Auth",value:authMethod==="sso"?"SSO (Google/Microsoft)":"Email & Password"},
                      ].map(r=>(
                        <div key={r.label} className="flex items-start gap-2 text-xs">
                          <span className="text-gray-400 flex-shrink-0 w-20">{r.label}</span>
                          <span className="font-medium text-gray-800 truncate">{r.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {submitted&&!isLegalComplete&&(
                    <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-lg">
                      <AlertCircle size={14} className="text-red-500 flex-shrink-0"/>
                      <p className="text-xs text-red-600">Please accept both Terms &amp; Conditions and Privacy Policy to continue.</p>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <button onClick={()=>setActiveSection("security")} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                    <ChevronLeft size={14}/>Back
                  </button>
                  <button onClick={handleContinue}
                    className={cn("inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all",
                      canSubmit
                        ?"bg-[#5C5CFF] text-white hover:bg-[#4A4AE0] shadow-md shadow-[#5C5CFF]/20"
                        :"bg-gray-200 text-gray-400 cursor-not-allowed"
                    )}>
                    Continue to Workspace Setup<ArrowRight size={15}/>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Getting Started Page ───────────────────────────────────────────────────────
const GS_STEPS = [
  "Organization Information","Branch & Locations","Departments","Designations",
  "Holiday Calendar","Shift Management","Attendance Policy","Leave Policy",
  "Approval Workflow","Roles & Permissions","Employees","Launch Workspace",
];

function GettingStartedPage({ onStart, onSkip }: { onStart:()=>void; onSkip:()=>void }) {
  const [slide, setSlide] = useState(0);
  const SLIDES = [
    { title:"Welcome to Attendance HRMS", body:"Your complete HR workspace — attendance, leave, shifts, teams and approvals all in one place.", icon:Users },
    { title:"Set up in minutes", body:"Our guided setup wizard walks you through every configuration step. You can always come back and change anything.", icon:CheckCircle },
    { title:"Everything connected", body:"Every module talks to every other. Shifts connect to attendance, leave connects to approvals, and teams connect to everything.", icon:Zap },
  ];
  const S = SLIDES[slide];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left — illustration + intro */}
      <div className="hidden lg:flex lg:w-3/5 bg-[#5C5CFF] flex-col relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-white/5 pointer-events-none"/>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-white/5 pointer-events-none"/>

        {/* Top bar */}
        <div className="relative flex items-center gap-3 p-8">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center"><Users size={16} className="text-white"/></div>
          <span className="text-white font-semibold text-sm">Attendance HRMS</span>
          <button onClick={onSkip} className="ml-auto text-white/50 text-xs hover:text-white/80 transition-colors">Skip tour</button>
        </div>

        {/* Illustration area */}
        <div className="flex-1 flex flex-col items-center justify-center px-16">
          {/* Abstract illustration */}
          <div className="w-56 h-56 relative mb-10">
            <div className="absolute inset-0 rounded-3xl bg-white/10 flex items-center justify-center">
              <S.icon size={72} className="text-white/60"/>
            </div>
            <div className="absolute -top-4 -right-4 w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center">
              <Users size={20} className="text-white/70"/>
            </div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center">
              <Clock size={16} className="text-white/70"/>
            </div>
            <div className="absolute top-1/2 -right-8 w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <CalendarDays size={14} className="text-white/60"/>
            </div>
          </div>

          {/* Slide content */}
          <div className="text-center max-w-md">
            <h2 className="text-3xl font-semibold text-white mb-3 leading-tight">{S.title}</h2>
            <p className="text-white/70 text-sm leading-relaxed">{S.body}</p>
          </div>

          {/* Carousel nav */}
          <div className="flex items-center gap-4 mt-10">
            <button onClick={()=>setSlide(s=>Math.max(0,s-1))} disabled={slide===0} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white disabled:opacity-30 hover:bg-white/20 transition-colors"><ChevronLeft size={16}/></button>
            <div className="flex gap-2">
              {SLIDES.map((_,i)=><button key={i} onClick={()=>setSlide(i)} className={cn("w-2 h-2 rounded-full transition-all",i===slide?"bg-white w-6":"bg-white/30")}/>)}
            </div>
            <button onClick={()=>setSlide(s=>Math.min(SLIDES.length-1,s+1))} disabled={slide===SLIDES.length-1} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white disabled:opacity-30 hover:bg-white/20 transition-colors"><ChevronRight size={16}/></button>
          </div>
        </div>
      </div>

      {/* Right — checklist */}
      <div className="flex-1 flex flex-col bg-white overflow-auto">
        <div className="flex-1 flex flex-col justify-center px-10 py-12 max-w-md mx-auto w-full">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-[#EEF2FF] text-[#5C5CFF] text-xs font-medium px-3 py-1.5 rounded-full mb-4">
              <Zap size={12}/>Setup takes about 5 minutes
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-1">Set up your workspace</h2>
            <p className="text-sm text-gray-500">Complete these steps to activate all modules. You can skip steps and return later.</p>
          </div>

          {/* Checklist */}
          <div className="space-y-1 mb-8">
            {GS_STEPS.map((label, i) => (
              <button key={i} onClick={()=>onStart()}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 text-left group transition-colors">
                <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors",
                  i === 0 ? "border-green-500 bg-green-500" : "border-gray-300 group-hover:border-[#5C5CFF]")}>
                  {i === 0 && <Check size={11} className="text-white"/>}
                </div>
                <span className={cn("text-sm flex-1",i===0?"text-gray-400 line-through":"text-gray-700 group-hover:text-gray-900")}>{label}</span>
                {i > 0 && <ChevronRight size={14} className="text-gray-300 group-hover:text-[#5C5CFF] flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all"/>}
                {i === 0 && <span className="text-xs text-green-600 font-medium flex-shrink-0">Done</span>}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            <button onClick={()=>onStart()} className="w-full py-3 bg-[#5C5CFF] text-white text-sm font-medium rounded-xl hover:bg-[#4A4AE0] transition-colors flex items-center justify-center gap-2">
              Start Setup <ArrowRight size={16}/>
            </button>
            <button onClick={onSkip} className="w-full py-2.5 text-sm text-gray-500 hover:text-gray-700 transition-colors">
              Skip for now — go to Dashboard
            </button>
          </div>
        </div>

        <div className="px-10 py-4 border-t border-gray-100">
          <p className="text-xs text-gray-400">Organization Information has been pre-configured. Continue from Branch & Locations.</p>
        </div>
      </div>
    </div>
  );
}

// ── Sidebar ────────────────────────────────────────────────────────────────────
function Sidebar({ page, navigate, collapsed, onToggle, onLogout, attendanceSection, leaveSection, teamSection, orgSection }: {
  page:AppPage;
  navigate:(p:AppPage, emp?:any, tabOrSection?:string)=>void;
  collapsed:boolean;
  onToggle:()=>void;
  onLogout:()=>void;
  attendanceSection: "My Space" | "My Team";
  leaveSection: "My Space" | "My Team";
  teamSection: "Overview" | "Management";
  orgSection: "Overview" | "Management";
}) {
  const [moreOpen, setMoreOpen] = useState(true);

  const isActive = (p: AppPage) => page === p || (p==="organization" && (page==="employee-add"||page==="employee-profile")) || (p==="team" && page==="team");

  const NavItem = ({ id, label, icon:Icon, tabOrSection }: { id:AppPage; label:string; icon:any; tabOrSection?:string }) => (
    <button onClick={()=>navigate(id, undefined, tabOrSection)} title={collapsed?label:undefined}
      className={cn("w-full flex items-center gap-2.5 px-3.5 py-2 text-sm transition-colors relative",isActive(id)?"bg-[#EEF2FF] text-[#5C5CFF] font-medium":"text-gray-600 hover:bg-gray-50 hover:text-gray-800")}>
      {isActive(id)&&<div className="absolute left-0 top-1 bottom-1 w-0.5 bg-[#5C5CFF] rounded-r"/>}
      <Icon size={16} className="flex-shrink-0"/>{!collapsed&&<span className="whitespace-nowrap">{label}</span>}
    </button>
  );

  const SubNavItem = ({ label, active, onClick }: { label:string; active:boolean; onClick:()=>void }) => (
    <button onClick={onClick}
      className={cn("w-full flex items-center gap-2.5 pl-9 pr-3.5 py-1.5 text-xs transition-colors relative",active?"text-[#5C5CFF] font-semibold":"text-gray-500 hover:text-gray-800 hover:bg-gray-50")}>
      {active&&<div className="absolute left-[34px] w-1 h-1 rounded-full bg-[#5C5CFF]"/>}
      {!collapsed&&<span className="whitespace-nowrap">{label}</span>}
    </button>
  );

  return (
    <div className={cn("bg-white border-r border-gray-200 flex flex-col flex-shrink-0 transition-all duration-200 overflow-hidden",collapsed?"w-14":"w-56")}>
      <div className="h-14 flex items-center gap-2.5 px-3.5 border-b border-gray-200 flex-shrink-0">
        <div className="w-8 h-8 bg-[#5C5CFF] rounded-lg flex items-center justify-center flex-shrink-0"><Users size={16} className="text-white"/></div>
        {!collapsed&&<span className="font-semibold text-gray-800 text-sm whitespace-nowrap">Attendance HRMS</span>}
      </div>

      <div className="flex-1 overflow-y-auto py-3 overflow-x-hidden space-y-3">
        <div className="space-y-1">
          <NavItem id="my-space" label="Dashboard" icon={LayoutDashboard}/>
          <NavItem id="team" label="Team" icon={Users}/>
          <NavItem id="organization" label="Organization" icon={Building2}/>
        </div>

        <div className="border-t border-gray-150 my-2 mx-3" />

        <div className="space-y-1">
          <NavItem id="attendance" label="Attendance" icon={Clock}/>
          <NavItem id="leave" label="Leave" icon={CalendarDays}/>
          <NavItem id="tasks" label="Tasks" icon={ClipboardList}/>
          <NavItem id="documents" label="Documents" icon={FileText}/>
        </div>

        <div className="border-t border-gray-150 my-2 mx-3" />

        <div className="space-y-1">
          <NavItem id="settings" label="Settings" icon={Settings}/>
          <NavItem id="support" label="Help & Support" icon={HelpCircle}/>
        </div>
      </div>

      <div className="border-t border-gray-200 p-2 flex-shrink-0">
        <div className={cn("flex items-center gap-2.5 px-2 py-2 rounded-md cursor-pointer hover:bg-gray-50")} onClick={()=>navigate("profile")}>
          <Avt initials="AA" color="#5C5CFF" size="sm"/>
          {!collapsed&&<div className="flex-1 min-w-0"><p className="text-xs font-medium text-gray-800 truncate">Alex Admin</p><p className="text-[10px] text-gray-400 truncate">Administrator</p></div>}
          {!collapsed&&<button onClick={e=>{e.stopPropagation();onLogout();}} className="p-1 rounded hover:bg-red-50 hover:text-red-500 text-gray-400 transition-colors flex-shrink-0" title="Logout"><LogOut size={14}/></button>}
        </div>
        <button onClick={onToggle} className="w-full flex items-center justify-center py-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-md mt-1 transition-colors">
          {collapsed?<ChevronRight size={14}/>:<ChevronLeft size={14}/>}
        </button>
      </div>
    </div>
  );
}

// ── Header ─────────────────────────────────────────────────────────────────────
function Header({
  onAI, onNotif, onQuickAction, navigate, onLogout, page,
  mySpaceTab, setMySpaceTab,
  teamSection, setTeamSection,
  orgSection, setOrgSection,
  attendanceSection, setAttendanceSection,
  attendanceTab, setAttendanceTab,
  leaveSection, setLeaveSection,
  leaveTab, setLeaveTab,
  tasksTab, setTasksTab,
  documentsTab, setDocumentsTab,
  settingsTab, setSettingsTab
}: {
  onAI:()=>void; onNotif:()=>void; onQuickAction:()=>void; navigate:(p:AppPage)=>void; onLogout:()=>void;
  page: AppPage;
  mySpaceTab: string; setMySpaceTab: (t:string)=>void;
  teamSection: "Overview" | "Management"; setTeamSection: (s:"Overview"|"Management")=>void;
  orgSection: "Overview" | "Management"; setOrgSection: (s:"Overview"|"Management")=>void;
  attendanceSection: "My Space" | "My Team"; setAttendanceSection: (s:"My Space"|"My Team")=>void;
  attendanceTab: string; setAttendanceTab: (t:string)=>void;
  leaveSection: "My Space" | "My Team"; setLeaveSection: (s:"My Space"|"My Team")=>void;
  leaveTab: string; setLeaveTab: (t:string)=>void;
  tasksTab: string; setTasksTab: (t:string)=>void;
  documentsTab: string; setDocumentsTab: (t:string)=>void;
  settingsTab: string; setSettingsTab: (t:string)=>void;
}) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const unread = NOTIFICATIONS.filter(n=>!n.read).length;
  const results = search.length>1 ? EMPLOYEES.filter(e=>e.name.toLowerCase().includes(search.toLowerCase())||e.dept.toLowerCase().includes(search.toLowerCase())).slice(0,5) : [];

  const PROFILE_ITEMS = [
    { icon: User,        label: "View Profile",        action: ()=>navigate("profile") },
    { icon: Settings,    label: "Account Settings",     action: ()=>navigate("settings") },
    { icon: Shield,      label: "Manage Account",       action: ()=>navigate("manage-account") },
    { icon: Bell,        label: "Notifications",        action: ()=>navigate("notifications") },
    { icon: Zap,         label: "Keyboard Shortcuts",   action: ()=>setShowShortcuts(true) },
    { icon: Globe,       label: "Switch Workspace",     action: ()=>{}, disabled: true, badge: "Soon" },
  ];

  // Dynamically determine title, switcher, and sub-tabs
  let title = "";
  let showSwitcher: React.ReactNode = null;
  let tabs: string[] = [];
  let activeTab = "";
  let setActiveTab: (t: string) => void = () => {};

  if (page === "my-space") {
    title = "My Space";
    tabs = ["Dashboard", "Attendance", "Leave", "Tasks", "Approvals", "Calendar"];
    activeTab = mySpaceTab;
    setActiveTab = setMySpaceTab;
  } else if (page === "team") {
    title = "Team";
    tabs = ["Overview", "Management"];
    activeTab = teamSection;
    setActiveTab = (t) => setTeamSection(t as any);
  } else if (page === "organization") {
    title = "Organization";
    tabs = ["Overview", "Management"];
    activeTab = orgSection;
    setActiveTab = (t) => setOrgSection(t as any);
  } else if (page === "attendance") {
    title = "Attendance";
    showSwitcher = (
      <div className="flex rounded-lg border border-gray-200 overflow-hidden p-0.5 bg-gray-50 gap-0.5 text-[11px] font-semibold h-fit">
        {(["My Space", "My Team"] as const).map(s => (
          <button key={s} onClick={() => setAttendanceSection(s)} className={cn("px-2.5 py-1 rounded-md transition-colors whitespace-nowrap", attendanceSection === s ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700")}>
            {s}
          </button>
        ))}
      </div>
    );
    tabs = ["Overview", "Exceptions", "Analytics"];
    activeTab = attendanceTab;
    setActiveTab = setAttendanceTab;
  } else if (page === "leave") {
    title = "Leave";
    showSwitcher = (
      <div className="flex rounded-lg border border-gray-200 overflow-hidden p-0.5 bg-gray-50 gap-0.5 text-[11px] font-semibold h-fit">
        {(["My Space", "My Team"] as const).map(s => (
          <button key={s} onClick={() => setLeaveSection(s)} className={cn("px-2.5 py-1 rounded-md transition-colors whitespace-nowrap", leaveSection === s ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700")}>
            {s}
          </button>
        ))}
      </div>
    );
    tabs = ["Overview", "Requests", "Analytics"];
    activeTab = leaveTab;
    setActiveTab = setLeaveTab;
  } else if (page === "tasks") {
    title = "Tasks";
    tabs = ["Board", "List", "Calendar"];
    activeTab = tasksTab;
    setActiveTab = setTasksTab;
  } else if (page === "documents") {
    title = "Documents";
    tabs = ["Company", "Employee", "Policies", "Templates"];
    activeTab = documentsTab;
    setActiveTab = setDocumentsTab;
  } else if (page === "settings" || page === "manage-account" || page === "notifications") {
    title = "Settings";
    tabs = ["General", "Notifications", "Security", "Integrations", "Manage Account"];
    activeTab = settingsTab;
    setActiveTab = (t) => {
      setSettingsTab(t);
      if (t === "General") navigate("settings");
      else if (t === "Notifications") navigate("notifications");
      else if (t === "Manage Account") navigate("manage-account");
    };
  } else if (page === "support") {
    title = "Help & Support";
  } else if (page === "profile") {
    title = "User Profile";
  } else if (page === "employee-profile") {
    title = "Employee Profile";
  } else if (page === "employee-add") {
    title = "Add Employee";
  }

  return (
    <div className="bg-white border-b border-gray-200 flex flex-col flex-shrink-0 relative z-20 sticky top-0">
      {/* Upper Row: Title, Selector & Fixed Search/Actions */}
      <div className="h-14 flex items-center justify-between px-6 border-b border-gray-100 gap-4">
        <div className="flex items-center gap-4">
          <h2 className="text-base font-semibold text-gray-950">{title}</h2>
          {showSwitcher}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-64" onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget as Node))setOpen(false);}}>
            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"/>
            <input type="text" placeholder="Search employees, departments…" value={search} onChange={e=>{setSearch(e.target.value);setOpen(true);}} onFocus={()=>setOpen(true)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#5C5CFF] focus:bg-white transition-all"/>
            {open&&results.length>0&&(
              <div className="absolute top-full mt-1 left-0 right-0 bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden z-50">
                {results.map(e=>(
                  <button key={e.id} onMouseDown={()=>{navigate("employee-profile", e);setSearch("");setOpen(false);}}
                    className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 text-left">
                    <Avt initials={e.initials} color={e.color} size="sm"/>
                    <div><p className="text-xs text-gray-800 font-semibold">{e.name}</p><p className="text-[10px] text-gray-500">{e.designation} · {e.dept}</p></div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button onClick={onQuickAction} className="flex items-center gap-1 px-3 py-1.5 bg-[#5C5CFF] text-white text-xs font-semibold rounded-lg hover:bg-[#4A4AE0] transition-colors"><Plus size={12}/>Create</button>
          <button onClick={onAI} className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#EEF2FF] hover:text-[#5C5CFF] transition-colors" title="AI Assistant"><Bot size={15}/></button>
          <button onClick={onNotif} className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors relative" title="Notifications">
            <Bell size={15}/>
            {unread>0&&<span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">{unread}</span>}
          </button>
          <button onClick={()=>navigate("settings")} className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors" title="Settings"><Settings size={14}/></button>
          
          {/* Profile Avatar + Dropdown */}
          <div className="relative pl-3 border-l border-gray-200">
            <button onClick={()=>setProfileOpen(v=>!v)} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Avt initials="AA" color="#5C5CFF" size="sm"/>
              <div className="hidden md:block text-left"><p className="text-xs font-medium text-gray-800">Alex Admin</p><p className="text-[10px] text-gray-400">Administrator</p></div>
              <ChevronDown size={12} className={cn("text-gray-400 transition-transform",profileOpen&&"rotate-180")}/>
            </button>
            {profileOpen&&(
              <div className="absolute right-0 top-full mt-2 w-60 bg-white rounded-xl border border-gray-200 shadow-xl z-50 overflow-hidden" onClick={()=>setProfileOpen(false)}>
                <div className="px-4 py-3 bg-gradient-to-br from-[#EEF2FF] to-white border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <Avt initials="AA" color="#5C5CFF" size="md"/>
                    <div><p className="text-xs font-bold text-gray-900">Alex Admin</p><p className="text-[10px] text-gray-500">alex.admin@acmecorp.com</p><span className="text-[9px] bg-[#5C5CFF] text-white px-1.5 py-0.5 rounded-full font-medium">Administrator</span></div>
                  </div>
                </div>
                <div className="py-1">
                  {PROFILE_ITEMS.map(item=>(
                    <button key={item.label} onClick={item.action} disabled={item.disabled} className={cn("w-full flex items-center gap-3 px-4 py-2 text-xs text-left transition-colors",item.disabled?"text-gray-300 cursor-not-allowed":"text-gray-700 hover:bg-gray-50")}>
                      <item.icon size={13} className={item.disabled?"text-gray-300":"text-gray-400"}/>
                      {item.label}
                      {item.badge&&<span className="ml-auto text-[9px] bg-gray-100 text-gray-400 px-1.5 py-0.5 rounded-full">{item.badge}</span>}
                    </button>
                  ))}
                </div>
                <div className="border-t border-gray-100 py-1">
                  <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors">
                    <LogOut size={13}/>Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lower Row: Context-Specific Tabs */}
      {tabs.length > 0 && (
        <div className="h-10 flex items-center px-6 border-t border-gray-50 overflow-x-auto whitespace-nowrap">
          <div className="flex gap-5">
            {tabs.map(v => (
              <button
                key={v}
                onClick={() => setActiveTab(v)}
                className={cn(
                  "px-0.5 py-2.5 text-xs font-semibold border-b-2 transition-colors relative whitespace-nowrap -mb-px",
                  activeTab === v ? "border-[#5C5CFF] text-[#5C5CFF]" : "border-transparent text-gray-500 hover:text-gray-750 hover:border-gray-200"
                )}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Keyboard Shortcuts Modal */}
      {showShortcuts&&(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={()=>setShowShortcuts(false)}>
          <div className="absolute inset-0 bg-black/40"/>
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md p-6" onClick={e=>e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-900">Keyboard Shortcuts</h3>
              <button onClick={()=>setShowShortcuts(false)} className="text-gray-400 hover:text-gray-600"><X size={15}/></button>
            </div>
            <div className="space-y-1">
              {([["Ctrl + K","Open AI Assistant"],["Ctrl + /","Search"],["Ctrl + N","Create New"],["G then D","Go to Dashboard"],["G then T","Go to Team"],["G then A","Go to Attendance"],["G then L","Go to Leave"],["Esc","Close panel / modal"]] as [string,string][]).map(([key,desc])=>(
                <div key={key} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0 text-xs">
                  <span className="text-gray-700">{desc}</span>
                  <kbd className="px-2 py-1 bg-gray-100 rounded text-[10px] font-mono text-gray-600">{key}</kbd>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


function TeamPage({
  navigate,
  activeTab,
  search = "",
  showCreatePost,
  setShowCreatePost,
  showCreateAnnouncement,
  setShowCreateAnnouncement,
  showCreateTask,
  setShowCreateTask
}: {
  navigate: (p: AppPage, emp?: any, tabOrSection?: string) => void;
  activeTab: string;
  search?: string;
  showCreatePost: boolean;
  setShowCreatePost: (b: boolean) => void;
  showCreateAnnouncement: boolean;
  setShowCreateAnnouncement: (b: boolean) => void;
  showCreateTask: boolean;
  setShowCreateTask: (b: boolean) => void;
}) {
  const [tab, setTab] = useState("Members");

  // Sync activeTab to local tab state
  useEffect(() => {
    setTab(activeTab);
  }, [activeTab]);

  const [deptFilter, setDeptFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [desigFilter, setDesigFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");
  const [selectedEmp, setSelectedEmp] = useState<Employee|null>(null);
  const [empTab, setEmpTab] = useState("Activities");
  const [feedPost, setFeedPost] = useState("");
  const [likes, setLikes] = useState<Record<string,number>>({F1:12,F2:5,F3:8});
  const [teamReqs, setTeamReqs] = useState(LEAVE_REQUESTS);
  const [tApproveId, setTApproveId] = useState<string|null>(null);
  const [tRejectId,  setTRejectId]  = useState<string|null>(null);
  const [tRejectReason, setTRejectReason] = useState("");
  const [tApproveComment, setTApproveComment] = useState("");
  const [tApprovalDetailId, setTApprovalDetailId] = useState<string|null>(null);
  const [showEmailModal,   setShowEmailModal]   = useState(false);
  const [emailBody,        setEmailBody]         = useState("");
  const [emailSubject,     setEmailSubject]      = useState("");
  const [showCallModal,    setShowCallModal]     = useState(false);
  const [showAssignTask,   setShowAssignTask]    = useState(false);
  const [showAssignShift,  setShowAssignShift]   = useState(false);

  // Redesigned Tasks selection
  const [selectedTeamTask, setSelectedTeamTask] = useState<any>(null);

  const approveT = (id:string) => { setTApproveId(id); setTApproveComment(""); };
  const rejectT  = (id:string) => { setTRejectId(id);  setTRejectReason(""); };
  const confirmApproveT = () => {
    if (!tApproveId) return;
    setTeamReqs(r=>r.map(x=>x.id===tApproveId?{...x,status:"Approved"}:x));
    setTApproveId(null); setTApproveComment("");
  };
  const confirmRejectT = () => {
    if (!tRejectId || !tRejectReason.trim()) return;
    setTeamReqs(r=>r.map(x=>x.id===tRejectId?{...x,status:"Rejected",rejectReason:tRejectReason}:x));
    setTRejectId(null); setTRejectReason("");
  };

  // Team Announcements
  const [teamAnnTab, setTeamAnnTab] = useState("All");
  const [teamAnnDetailId, setTeamAnnDetailId] = useState<string|null>(null);
  const TEAM_ANN = [
    {id:"TA1",title:"Q2 All-Hands Meeting – July 15",body:"Join us on July 15th at 3:00 PM EST. Attendance mandatory for all team leads. The meeting covers Q2 performance, roadmap for H2, and team recognition.",author:"Alex Admin",time:"Jul 1",category:"Event",priority:"High",pinned:true,dept:"All Teams"},
    {id:"TA2",title:"Updated Leave Policy – FY2025",body:"Annual leave increased to 20 days for 3+ year employees effective Jan 1, 2025. Please review the attached document.",author:"Aisha Thompson",time:"Jun 28",category:"Policy",priority:"High",pinned:false,dept:"All Teams"},
    {id:"TA3",title:"Engineering Sync – New Architecture Decision",body:"The engineering team will adopt a microservices architecture for the new billing module. All engineers must review the ADR document before Jul 10.",author:"David Chen",time:"Jun 25",category:"Technical",priority:"Medium",pinned:false,dept:"Engineering"},
    {id:"TA4",title:"Welcome Yuki Tanaka to the Engineering Team!",body:"Please join us in welcoming Yuki Tanaka who joins the engineering team on July 8 as a Senior Frontend Engineer. Yuki comes from Meta and brings 7 years of React expertise.",author:"David Chen",time:"Jun 22",category:"New Joiner",priority:"Low",pinned:false,dept:"Engineering"},
  ];
  const filteredTeamAnn = TEAM_ANN;
  const teamAnnDetail = TEAM_ANN.find(a=>a.id===teamAnnDetailId)||null;

  const depts = ["All",...Array.from(new Set(EMPLOYEES.map(e=>e.dept))).sort()];
  const desigs = ["All",...Array.from(new Set(EMPLOYEES.map(e=>e.designation))).sort()];
  const locations = ["All",...Array.from(new Set(EMPLOYEES.map(e=>e.branch))).sort()];
  const filtered = EMPLOYEES.filter(e=>{
    const ms = e.name.toLowerCase().includes(search.toLowerCase())||e.designation.toLowerCase().includes(search.toLowerCase());
    const md = deptFilter==="All"||e.dept===deptFilter;
    const mst = statusFilter==="All"||e.status===statusFilter;
    const mdg = desigFilter==="All"||e.designation===desigFilter;
    const mloc = locationFilter==="All"||e.branch===locationFilter;
    return ms&&md&&mst&&mdg&&mloc;
  });

  const TEAM_TASKS = [
    {id:"TT1",title:"Review Sarah's leave documentation",assignee:"Alex Admin",dept:"HR",priority:"High",due:"Jul 3",status:"In Progress"},
    {id:"TT2",title:"Update onboarding checklist for Q3",assignee:"Aisha Thompson",dept:"HR",priority:"Medium",due:"Jul 8",status:"Todo"},
    {id:"TT3",title:"Schedule Q3 performance reviews",assignee:"David Chen",dept:"Engineering",priority:"Medium",due:"Jul 15",status:"Todo"},
    {id:"TT4",title:"Send reminder – policy acknowledgement",assignee:"Alex Admin",dept:"HR",priority:"Low",due:"Jun 30",status:"Overdue"},
    {id:"TT5",title:"Configure biometric for Chicago office",assignee:"Ahmad Patel",dept:"Operations",priority:"High",due:"Jul 5",status:"In Progress"},
    {id:"TT6",title:"Complete exit interview – Ahmad Patel",assignee:"Aisha Thompson",dept:"HR",priority:"High",due:"Jun 28",status:"Done"},
  ];

  const FEED_POSTS = [
    {id:"F1",author:"Alex Admin",initials:"AA",color:"#5C5CFF",time:"2h ago",text:"Reminder: Q2 All-Hands Meeting is on July 15th at 3pm EST. Please confirm your attendance by end of week.",dept:"All",pinned:true},
    {id:"F2",author:"Aisha Thompson",initials:"AT",color:EMP_COLORS[4],time:"5h ago",text:"Updated leave policy for FY2025 has been published. Key change: employees with 3+ years tenure get 20 days annual leave. Review the document in Documents.",dept:"HR",pinned:false},
    {id:"F3",author:"David Chen",initials:"DC",color:EMP_COLORS[3],time:"Yesterday",text:"Welcome Yuki Tanaka to the Engineering team! Yuki joins as a Frontend Developer and will be working on the Design System initiative. Please give them a warm welcome.",dept:"Engineering",pinned:false},
  ];

  const TEAM_CELEBRATIONS = [
    {type:"Birthday",employee:"Sarah Mitchell",detail:"Turning 32 today 🎂",date:"Today",color:"#EC4899"},
    {type:"Anniversary",employee:"Marcus Johnson",detail:"4 years at Acme 🎉",date:"Jul 3",color:"#8B5CF6"},
    {type:"New Joiner",employee:"Yuki Tanaka",detail:"Starting Jul 8 · Engineering",date:"Jul 8",color:"#22C55E"},
  ];

  return (
    <div className="flex flex-col h-full bg-[#F7F8FA] overflow-hidden">
      <div className="flex-1 overflow-hidden">

        {/* ── MEMBERS TAB ── */}
        {tab==="Members"&&(
          <div className="flex h-full overflow-hidden">
            {/* Sidebar List */}
            <div className={cn("flex flex-col bg-white border-r border-gray-200 transition-all duration-300",selectedEmp?"w-[350px] flex-shrink-0":"flex-1")}>
              <div className="flex-1 overflow-auto divide-y divide-gray-100">
                {filtered.map(e=>(
                  <div key={e.id} onClick={()=>setSelectedEmp(e)} className={cn("p-4 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors",selectedEmp?.id===e.id&&"bg-indigo-50/50 border-l-4 border-[#5C5CFF]")}>
                    <Avt initials={e.initials} color={e.color} size="md"/>
                    <div className="flex-1 min-w-0 text-left">
                      <div className="flex justify-between items-center mb-0.5"><span className="text-xs font-semibold text-gray-800 truncate">{e.name}</span><StatusBadge status={e.status}/></div>
                      <p className="text-[10px] text-gray-500 truncate">{e.designation} · {e.dept}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Profile detail */}
            {selectedEmp?(
              <div className="flex-1 flex flex-col overflow-hidden bg-[#F7F8FA]">
                <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between flex-shrink-0">
                  <div className="flex items-center gap-3">
                    <Avt initials={selectedEmp.initials} color={selectedEmp.color} size="md"/>
                    <div className="text-left">
                      <h3 className="text-sm font-semibold text-gray-900">{selectedEmp.name}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">{selectedEmp.designation} · {selectedEmp.dept}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Btn variant="outline" size="sm" onClick={()=>setShowEmailModal(true)}><Mail size={12}/>Email</Btn>
                    <Btn variant="outline" size="sm" onClick={()=>setShowCallModal(true)}><Phone size={12}/>Call</Btn>
                    <button onClick={()=>setSelectedEmp(null)} className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-lg"><X size={14}/></button>
                  </div>
                </div>
                <div className="flex-1 overflow-auto p-6 space-y-6">
                  {/* Actions summary row */}
                  <div className="grid grid-cols-4 gap-4">
                    {[
                      {label:"Schedule Shift",icon:Clock,color:"#3B82F6",bg:"bg-blue-50",onClick:()=>setShowAssignShift(true)},
                      {label:"Assign Task",icon:ClipboardList,color:"#6366F1",bg:"bg-indigo-50",onClick:()=>setShowAssignTask(true)},
                      {label:"View Profile",icon:User,color:"#22C55E",bg:"bg-green-50",onClick:()=>setEmpTab("Profile")},
                      {label:"History Log",icon:Activity,color:"#F59E0B",bg:"bg-amber-50",onClick:()=>setEmpTab("Activities")}
                    ].map(a=>(
                      <button key={a.label} onClick={a.onClick} className={cn("rounded-xl p-3 border border-transparent hover:border-gray-200 transition-all flex flex-col items-center justify-center text-center",a.bg)}>
                        <div className="w-8 h-8 rounded-full flex items-center justify-center mb-2" style={{backgroundColor:a.color+"18"}}><a.icon size={15} style={{color:a.color}}/></div>
                        <span className="text-[10px] font-semibold text-gray-800">{a.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Tab Selector inside profile details */}
                  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <div className="px-4 border-b border-gray-100 flex gap-4">
                      {["Activities","Profile","Attendance","Leave","Shift","Tasks"].map(t=>(
                        <button key={t} onClick={()=>setEmpTab(t)} className={cn("py-3 text-xs font-semibold border-b-2 transition-colors",empTab===t?"border-[#5C5CFF] text-[#5C5CFF]":"border-transparent text-gray-500 hover:text-gray-700")}>{t}</button>
                      ))}
                    </div>
                    <div className="p-4 overflow-auto max-h-[380px]">
                      {empTab==="Activities"&&(
                        <div className="space-y-3 max-w-xl">
                          {[
                            {icon:UserPlus,color:"#5C5CFF",text:`${selectedEmp.name} joined ${selectedEmp.dept}`,sub:"Employee onboarded",time:fmtDate(selectedEmp.joinDate)},
                            {icon:CalendarDays,color:"#F59E0B",text:"Applied for 2 days sick leave",sub:"Approved by manager",time:"Jun 15, 2024"},
                            {icon:Clock,color:"#22C55E",text:"Attendance regularization submitted",sub:"Late mark on Jun 12",time:"Jun 12, 2024"},
                            {icon:GitBranch,color:"#8B5CF6",text:"Department updated",sub:`Moved to ${selectedEmp.dept}`,time:"Jan 10, 2024"},
                            {icon:Award,color:"#F97316",text:"Designation updated",sub:`Promoted to ${selectedEmp.designation}`,time:"Nov 1, 2023"},
                          ].map((a,i)=>(
                            <div key={i} className="flex items-start gap-3 p-3 bg-white border border-gray-200 rounded-xl hover:border-[#5C5CFF]/30 cursor-pointer transition-colors text-left">
                              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{backgroundColor:a.color+"18"}}><a.icon size={14} style={{color:a.color}}/></div>
                              <div className="flex-1"><p className="text-xs font-medium text-gray-800">{a.text}</p><p className="text-[10px] text-gray-500 mt-0.5">{a.sub}</p></div>
                              <span className="text-[10px] text-gray-400">{a.time}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {empTab==="Profile"&&(
                        <div className="max-w-xl space-y-4 text-left">
                          {[{title:"Personal Information",items:[["Full Name",selectedEmp.name],["Employee ID",selectedEmp.id],["Email",selectedEmp.email],["Phone",selectedEmp.phone],["Join Date",fmtDate(selectedEmp.joinDate)]]},{title:"Employment",items:[["Department",selectedEmp.dept],["Designation",selectedEmp.designation],["Branch",selectedEmp.branch],["Employment Type",selectedEmp.empType],["Shift",selectedEmp.shift]]},{title:"Reporting Structure",items:[["Reports To",selectedEmp.manager],["Team","Engineering Platform"]]},{title:"Emergency Contact",items:[["Name","Jane "+selectedEmp.name.split(" ")[1]],["Relationship","Spouse"],["Phone","+1 (555) 999-0001"]]}].map(s=>(
                            <div key={s.title} className="bg-white border border-gray-200 rounded-xl p-4">
                              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">{s.title}</h4>
                              <div className="grid grid-cols-2 gap-3">
                                {s.items.map(([k,v])=>(
                                  <div key={k}><p className="text-[10px] text-gray-400">{k}</p><p className="text-xs font-medium text-gray-800 mt-0.5">{v}</p></div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      {empTab==="Attendance"&&(
                        <div className="max-w-xl space-y-4">
                          <div className="grid grid-cols-3 gap-3">
                            {[["Present Days","22","of 26"],["Late Arrivals","2","this month"],["Attendance Rate",`${selectedEmp.attendance}%`,"Jun 2024"]].map(([t,v,s])=>(
                              <div key={t as string} className="bg-white border border-gray-200 rounded-xl p-3 text-center"><p className="text-[10px] text-gray-400 mb-1">{t}</p><p className="text-lg font-bold text-gray-900">{v}</p><p className="text-[10px] text-gray-400">{s}</p></div>
                            ))}
                          </div>
                          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between"><h4 className="text-xs font-semibold text-gray-700">Recent Log</h4><Btn variant="outline" size="sm"><Download size={11}/>Export</Btn></div>
                            <table className="w-full text-xs text-left"><thead className="bg-gray-50"><tr>{["Date","Check In","Check Out","Hours","Status"].map(h=><th key={h} className="px-4 py-2 font-medium text-gray-500">{h}</th>)}</tr></thead>
                            <tbody className="divide-y divide-gray-100">{[["Jun 28","09:02","18:15","9h 13m","Present"],["Jun 27","09:00","18:05","9h 05m","Present"],["Jun 26","09:45","18:30","8h 45m","Late"],["Jun 25","09:01","18:00","8h 59m","Present"],["Jun 21","–","–","–","On Leave"]].map(([d,ci,co,h,s])=>(
                              <tr key={d as string} className="hover:bg-gray-50"><td className="px-4 py-2 text-gray-600">{d}</td><td className="px-4 py-2 font-mono">{ci}</td><td className="px-4 py-2 font-mono">{co}</td><td className="px-4 py-2 font-mono">{h}</td><td className="px-4 py-2"><StatusBadge status={s as string}/></td></tr>
                            ))}</tbody></table>
                          </div>
                        </div>
                      )}
                      {empTab==="Leave"&&(
                        <div className="max-w-xl space-y-4 text-left">
                          <div className="bg-white border border-gray-200 rounded-xl p-4">
                            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-3">Balance</h4>
                            {[["Annual",18,12],["Sick",10,8],["Casual",6,5]].map(([t,tot,used])=>(
                              <div key={t as string} className="mb-3"><div className="flex justify-between text-xs mb-1"><span className="text-gray-600">{t}</span><span className="font-medium text-gray-800">{(tot as number)-(used as number)}/{tot} left</span></div><div className="bg-gray-100 rounded-full h-1.5"><div className="h-1.5 bg-[#5C5CFF] rounded-full" style={{width:`${((used as number)/(tot as number))*100}%`}}/></div></div>
                            ))}
                          </div>
                          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                            <div className="px-4 py-3 border-b border-gray-100"><h4 className="text-xs font-semibold text-gray-700">Leave History</h4></div>
                            {teamReqs.filter(r=>r.employee===selectedEmp.name).length>0
                              ? teamReqs.filter(r=>r.employee===selectedEmp.name).map(r=>(
                                <div key={r.id} className="px-4 py-3 border-b border-gray-100 last:border-0 flex items-center gap-3 hover:bg-gray-50">
                                  <div className="flex-1"><p className="text-xs font-medium text-gray-800">{r.type}</p><p className="text-[10px] text-gray-500">{fmtDate(r.from)} → {fmtDate(r.to)} · {r.days}d · {r.reason}</p></div>
                                  <StatusBadge status={r.status}/>
                                </div>
                              ))
                              : <div className="px-4 py-6 text-center text-xs text-gray-400">No leave history</div>
                            }
                          </div>
                        </div>
                      )}
                      {empTab==="Shift"&&(
                        <div className="max-w-xl space-y-4 text-left">
                          <div className="bg-white border border-gray-200 rounded-xl p-4">
                            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-3">Current Shift</h4>
                            <div className="flex items-center gap-3 p-3 bg-[#EEF2FF] rounded-lg">
                              <div className="w-9 h-9 rounded-lg bg-[#5C5CFF] flex items-center justify-center"><Clock size={16} className="text-white"/></div>
                              <div><p className="text-sm font-semibold text-gray-800">{selectedEmp.shift} Shift</p><p className="text-xs text-gray-500">{selectedEmp.shift==="General"?"09:00 – 18:00":selectedEmp.shift==="Morning"?"06:00 – 15:00":selectedEmp.shift==="Night"?"22:00 – 07:00":"14:00 – 23:00"} · Mon–Fri</p></div>
                            </div>
                          </div>
                        </div>
                      )}
                      {empTab==="Tasks"&&(
                        <div className="max-w-2xl space-y-4 text-left">
                          <div className="grid grid-cols-4 gap-3">
                            {[
                              {label:"In Progress",count:2,color:"#3B82F6",bg:"bg-blue-50"},
                              {label:"Assigned",count:3,color:"#6366F1",bg:"bg-indigo-50"},
                              {label:"Completed",count:8,color:"#22C55E",bg:"bg-green-50"},
                              {label:"Overdue",count:1,color:"#EF4444",bg:"bg-red-50"},
                            ].map(s=>(
                              <div key={s.label} className={cn("rounded-xl p-3 border",s.bg,"border-transparent")}>
                                <div className="text-xl font-bold" style={{color:s.color}}>{s.count}</div>
                                <div className="text-[10px] font-medium text-gray-500 mt-0.5">{s.label}</div>
                              </div>
                            ))}
                          </div>
                          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                              <h4 className="text-xs font-semibold text-gray-700">Active Tasks</h4>
                              <button onClick={()=>setShowAssignTask(true)} className="text-xs text-[#5C5CFF] hover:underline">Assign Task →</button>
                            </div>
                            <div className="divide-y divide-gray-100">
                              {TEAM_TASKS.filter(t=>t.assignee===selectedEmp.name).slice(0,5).map(t=>(
                                <div key={t.id} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50">
                                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{backgroundColor:t.status==="Done"?"#22C55E":t.status==="Overdue"?"#EF4444":t.status==="In Progress"?"#3B82F6":"#9CA3AF"}}/>
                                  <div className="flex-1 min-w-0">
                                    <p className={cn("text-xs font-medium text-gray-800 truncate",t.status==="Done"&&"line-through text-gray-400")}>{t.title}</p>
                                    <p className="text-[10px] text-gray-400 mt-0.5">Due {t.due} · {t.dept}</p>
                                  </div>
                                  <span className={cn("text-[9px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0",
                                    t.priority==="High"?"bg-red-50 text-red-500":t.priority==="Medium"?"bg-amber-50 text-amber-500":"bg-gray-100 text-gray-400")}>{t.priority}</span>
                                  <span className={cn("text-[9px] font-semibold px-1.5 py-0.5 rounded-full flex-shrink-0",
                                    t.status==="Done"?"bg-green-50 text-green-600":t.status==="Overdue"?"bg-red-50 text-red-500":t.status==="In Progress"?"bg-blue-50 text-blue-600":"bg-gray-100 text-gray-500")}>{t.status}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        )}

        {/* ── FEED TAB ── */}
        {tab==="Feed"&&(
          <div className="flex h-full justify-center">
            <div className="flex-1 overflow-auto p-5 max-w-2xl">
              {/* Compose */}
              {showCreatePost && (
                <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
                  <div className="flex items-start gap-3">
                    <Avt initials="AA" color="#5C5CFF" size="sm"/>
                    <div className="flex-1">
                      <textarea value={feedPost} onChange={e=>setFeedPost(e.target.value)} placeholder="Write something on feed..." className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#5C5CFF] min-h-[72px]"/>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex gap-2">
                          <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 px-2 py-1 rounded hover:bg-gray-100"><Upload size={12}/>Attach</button>
                        </div>
                        <Btn size="sm" disabled={!feedPost.trim()} onClick={()=>{setFeedPost(""); setShowCreatePost(false);}}><Send size={12}/>Post</Btn>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* Posts */}
              <div className="space-y-3">
                {FEED_POSTS.map(p=>(
                  <div key={p.id} className="bg-white border border-gray-200 rounded-xl p-4 hover:border-[#5C5CFF]/20 transition-colors">
                    <div className="flex items-start gap-3">
                      <Avt initials={p.initials} color={p.color} size="sm"/>
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold text-gray-800">{p.author}</span>
                          {p.pinned&&<span className="text-[9px] bg-[#EEF2FF] text-[#5C5CFF] px-1.5 py-0.5 rounded font-semibold">PINNED</span>}
                          <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{p.dept}</span>
                          <span className="text-[10px] text-gray-400 ml-auto">{p.time}</span>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed">{p.text}</p>
                        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100">
                          <button onClick={()=>setLikes(l=>({...l,[p.id]:(l[p.id]||0)+1}))} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#5C5CFF] transition-colors">
                            <Star size={13}/>{likes[p.id]||0} Like
                          </button>
                          <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#5C5CFF] transition-colors"><Send size={13}/>Comment</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── ANNOUNCEMENTS TAB ── */}
        {tab==="Announcements"&&!teamAnnDetailId&&(
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-auto">
              <div className="max-w-4xl mx-auto px-6 py-5 space-y-5 text-left">
                {showCreateAnnouncement && (
                  <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <h4 className="text-xs font-semibold text-gray-700 mb-2">Compose Announcement</h4>
                    <textarea rows={3} placeholder="Compose team announcement..." className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#5C5CFF]"/>
                    <div className="flex justify-end gap-2 mt-2">
                      <Btn variant="outline" size="sm" onClick={()=>setShowCreateAnnouncement(false)}>Cancel</Btn>
                      <Btn size="sm" onClick={()=>setShowCreateAnnouncement(false)}><Send size={12}/>Publish</Btn>
                    </div>
                  </div>
                )}
                {/* Celebrations */}
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-2"><Star size={12} className="text-amber-400"/>Celebrations & Milestones</p>
                  <div className="grid grid-cols-3 gap-3">
                    {TEAM_CELEBRATIONS.map((c,i)=>(
                      <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 hover:border-[#5C5CFF]/30 hover:shadow-sm transition-all cursor-pointer">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm" style={{backgroundColor:c.color}}>
                            {c.type==="Birthday"?"🎂":c.type==="Anniversary"?"🎉":"👋"}
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-gray-800">{c.employee}</p>
                            <p className="text-[10px] text-gray-400">{c.date}</p>
                          </div>
                        </div>
                        <p className="text-xs text-gray-600">{c.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Announcements list */}
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-2"><Megaphone size={12} className="text-[#5C5CFF]"/>Team Announcements</p>
                  <div className="space-y-3">
                    {filteredTeamAnn.map(a=>(
                      <div key={a.id} onClick={()=>setTeamAnnDetailId(a.id)}
                        className="bg-white border border-gray-200 rounded-xl p-4 cursor-pointer hover:border-[#5C5CFF]/30 hover:shadow-sm transition-all flex items-start gap-3">
                        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-white",a.priority==="High"?"bg-[#5C5CFF]":a.category==="New Joiner"?"bg-green-500":"bg-gray-400")}>
                          {a.category==="Event"?<CalendarDays size={16}/>:a.category==="Policy"?<FileText size={16}/>:a.category==="New Joiner"?<UserPlus size={16}/>:<Megaphone size={16}/>}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-semibold bg-[#EEF2FF] text-[#5C5CFF] px-1.5 py-0.5 rounded uppercase">{a.category}</span>
                            <span className="text-[10px] text-gray-400 ml-auto">{a.time}</span>
                          </div>
                          <h3 className="text-sm font-semibold text-gray-900 mb-1">{a.title}</h3>
                          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{a.body.split("\n")[0]}</p>
                          <div className="flex items-center gap-2 mt-2 text-[10px] text-gray-400">
                            <Avt initials={a.author.split(" ").map(n=>n[0]).join("")} color="#5C5CFF" size="xs"/>
                            <span>{a.author}</span><span>·</span><span>{a.dept}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── ANNOUNCEMENT DETAIL VIEW ── */}
        {tab==="Announcements"&&teamAnnDetailId&&teamAnnDetail&&(
          <div className="flex flex-col h-full bg-[#F7F8FA] overflow-auto p-6">
            <div className="max-w-2xl mx-auto space-y-4 w-full text-left">
              <button onClick={()=>setTeamAnnDetailId(null)} className="flex items-center gap-1 text-xs text-[#5C5CFF] hover:underline mb-2">
                <ChevronLeft size={13}/>Back to Announcements
              </button>
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h1 className="text-base font-bold text-gray-900">{teamAnnDetail.title}</h1>
                <p className="text-xs text-gray-400 mt-1">By {teamAnnDetail.author} · {teamAnnDetail.time}</p>
                <div className="text-sm text-gray-700 mt-4 whitespace-pre-line leading-relaxed">
                  {teamAnnDetail.body}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── REPORTEES TAB ── */}
        {tab==="Reportees"&&(
          <div className="flex-1 h-full overflow-auto p-6 bg-[#F7F8FA]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto">
              {EMPLOYEES.filter(e => e.name.toLowerCase().includes(search.toLowerCase())).map(e => {
                const isCheckedIn = e.id !== "E013" && e.id !== "E007";
                return (
                  <div key={e.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-sm transition-all flex items-start gap-4 text-left">
                    <Avt initials={e.initials} color={e.color} size="md" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-gray-900 truncate">{e.name}</h4>
                      <p className="text-xs text-gray-500 truncate">{e.designation}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">{e.dept} · {e.branch}</p>
                      
                      <div className="flex items-center gap-2 mt-4">
                        <div className={cn("w-2 h-2 rounded-full", isCheckedIn ? "bg-green-500 animate-pulse" : "bg-gray-300")} />
                        <span className="text-[11px] font-medium text-gray-600">
                          {isCheckedIn ? "Checked In (09:00 AM)" : "Checked Out"}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── APPROVALS TAB ── */}
        {tab==="Approvals"&&(
          <div className="flex h-full overflow-hidden">
            <div className={cn("flex flex-col",tApprovalDetailId?"w-[52%] flex-shrink-0 border-r border-gray-200":"flex-1")}>
              <div className="flex-1 overflow-auto p-5">
                <div className="bg-white rounded-xl border border-gray-200">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        {["Employee","Type","Details","Applied","Status","Actions"].map(h=><th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{h}</th>)}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {teamReqs.map(r=>(
                        <tr key={r.id} onClick={()=>setTApprovalDetailId(tApprovalDetailId===r.id?null:r.id)} className={cn("cursor-pointer hover:bg-gray-50 transition-colors",tApprovalDetailId===r.id&&"bg-[#EEF2FF]")}>
                          <td className="px-4 py-3"><div className="flex items-center gap-2.5"><Avt initials={r.employee.split(" ").map(n=>n[0]).join("")} color={EMP_COLORS[parseInt(r.id.slice(-1))%EMP_COLORS.length]} size="sm"/><span className="font-medium text-gray-800 text-xs">{r.employee}</span></div></td>
                          <td className="px-4 py-3 text-gray-600 text-xs">{r.type}</td>
                          <td className="px-4 py-3 text-gray-500 text-xs max-w-[180px] truncate">{fmtDate(r.from)} – {fmtDate(r.to)} · {r.days}d</td>
                          <td className="px-4 py-3 text-gray-400 text-xs">{fmtDate(r.applied)}</td>
                          <td className="px-4 py-3"><StatusBadge status={r.status}/></td>
                          <td className="px-4 py-3" onClick={e=>e.stopPropagation()}>
                            {r.status==="Pending"&&(
                              <div className="flex gap-1.5">
                                <button onClick={()=>approveT(r.id)} className="px-2.5 py-1 bg-green-50 text-green-700 rounded-lg text-xs font-medium hover:bg-green-100 flex items-center gap-1"><Check size={10}/>Approve</button>
                                <button onClick={()=>rejectT(r.id)} className="px-2.5 py-1 bg-red-50 text-red-600 rounded-lg text-xs font-medium hover:bg-red-100 flex items-center gap-1"><X size={10}/>Reject</button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/* Detail Panel */}
            {tApprovalDetailId&&(()=>{
              const req=teamReqs.find(r=>r.id===tApprovalDetailId);
              if(!req) return null;
              return (
                <div className="flex-1 flex flex-col overflow-hidden bg-white">
                  <div className="px-5 py-3.5 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
                    <div className="flex items-center gap-2.5 text-left">
                      <Avt initials={req.employee.split(" ").map(n=>n[0]).join("")} color={EMP_COLORS[parseInt(req.id.slice(-1))%EMP_COLORS.length]} size="sm"/>
                      <div><p className="text-sm font-semibold text-gray-900">{req.employee}</p><p className="text-xs text-gray-400">{req.type} Request</p></div>
                    </div>
                    <div className="flex items-center gap-2"><StatusBadge status={req.status}/><button onClick={()=>setTApprovalDetailId(null)} className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-lg"><X size={14}/></button></div>
                  </div>
                  <div className="flex-1 overflow-auto p-5 space-y-4 text-left">
                    <div className="grid grid-cols-2 gap-2.5">
                      {([["Employee",req.employee],["Department","Engineering"],["Leave Type",req.type],["Date Range",`${fmtDate(req.from)} – ${fmtDate(req.to)}`],["Days",req.days+" days"],["Applied",fmtDate(req.applied)]] as [string,string][]).map(([k,v])=>(
                        <div key={k} className="bg-gray-50 rounded-lg p-3"><p className="text-[10px] text-gray-400 uppercase tracking-wide mb-1">{k}</p><p className="text-xs font-semibold text-gray-800">{v}</p></div>
                      ))}
                    </div>
                    {req.status==="Pending"&&(
                      <div className="flex gap-3">
                        <Btn onClick={()=>{setTApprovalDetailId(null);approveT(req.id);}} className="flex-1 bg-green-600 hover:bg-green-700 justify-center"><Check size={13}/>Approve</Btn>
                        <Btn onClick={()=>{setTApprovalDetailId(null);rejectT(req.id);}} variant="outline" className="flex-1 border-red-200 text-red-600 hover:bg-red-50 justify-center"><X size={13}/>Reject</Btn>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* ── TASKS TAB (Redesigned layout) ── */}
        {tab === "Tasks" && (
          <div className="flex h-full overflow-hidden p-6 gap-6 max-w-7xl mx-auto w-full">
            {/* Left Panel: Profile and Summary Cards */}
            <div className="w-80 space-y-6 flex-shrink-0">
              {/* Profile Card */}
              <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-[#5B57E8] text-white text-2xl font-semibold flex items-center justify-center mb-4">
                  AA
                </div>
                <h3 className="text-base font-semibold text-gray-900">Alex Admin</h3>
                <p className="text-xs text-gray-500 mt-1">Administrator · Department Head</p>
                <div className="mt-4 flex items-center gap-2.5 px-3 py-1.5 bg-[#F6F7F9] rounded-lg text-xs text-gray-600">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span>Active Session</span>
                </div>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-2 gap-4 text-left">
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">Total Tasks</span>
                  <div className="text-2xl font-bold text-gray-950 mt-1">{TEAM_TASKS.length}</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">In Progress</span>
                  <div className="text-2xl font-bold text-[#5B57E8] mt-1">
                    {TEAM_TASKS.filter(t => t.status === "In Progress").length}
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">Overdue</span>
                  <div className="text-2xl font-bold text-red-500 mt-1">
                    {TEAM_TASKS.filter(t => t.status === "Overdue").length}
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">Completed</span>
                  <div className="text-2xl font-bold text-green-500 mt-1">
                    {TEAM_TASKS.filter(t => t.status === "Done").length}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel: Task List */}
            <div className="flex-1 bg-white border border-gray-200 rounded-xl flex flex-col overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-800">Team Tasks List</h3>
                <span className="text-xs text-gray-500">{TEAM_TASKS.length} tasks assigned</span>
              </div>
              
              <div className="flex-1 overflow-auto p-4 space-y-3">
                {TEAM_TASKS.filter(t => t.title.toLowerCase().includes(search.toLowerCase()) || t.assignee.toLowerCase().includes(search.toLowerCase())).map(t => {
                  const progressPct = t.status === "Done" ? 100 : t.status === "In Progress" ? 50 : t.status === "Overdue" ? 30 : 0;
                  return (
                    <div
                      key={t.id}
                      onClick={() => setSelectedTeamTask(t)}
                      className="bg-white border border-gray-200 rounded-xl p-4 hover:border-[#5B57E8]/40 hover:shadow-sm transition-all cursor-pointer flex flex-col gap-3"
                    >
                      <div className="flex items-center gap-3">
                        {/* Creator avatar (Manager/Department Head) */}
                        <div className="w-8 h-8 rounded-full bg-[#5B57E8] text-white text-xs font-semibold flex items-center justify-center flex-shrink-0">
                          AA
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-gray-900 truncate hover:text-[#5B57E8] transition-colors text-left">{t.title}</h4>
                          <p className="text-xs text-gray-500 truncate mt-0.5 text-left">Assigned to: {t.assignee}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full uppercase",
                            t.priority === "High" ? "bg-red-50 text-red-500" : t.priority === "Medium" ? "bg-amber-50 text-amber-500" : "bg-gray-100 text-gray-400"
                          )}>
                            {t.priority}
                          </span>
                          <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full",
                            t.status === "Done" ? "bg-green-50 text-green-600" : t.status === "Overdue" ? "bg-red-50 text-red-500" : t.status === "In Progress" ? "bg-blue-50 text-blue-600" : "bg-gray-100 text-gray-500"
                          )}>
                            {t.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-gray-100">
                        <div className="flex items-center gap-1">
                          <CalendarDays size={12} />
                          <span>Due {t.due}</span>
                        </div>
                        <div className="w-1/3 flex items-center gap-3">
                          <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                            <div
                              className={cn("h-full rounded-full", t.status === "Done" ? "bg-green-500" : t.status === "Overdue" ? "bg-red-500" : "bg-[#5B57E8]")}
                              style={{ width: `${progressPct}%` }}
                            />
                          </div>
                          <span className="text-[10px] font-semibold text-gray-500">{progressPct}%</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ── TeamPage: Task Detail Modal ── */}
      {selectedTeamTask && (
        <Modal title="Task Details" onClose={() => setSelectedTeamTask(null)}>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-150">
              <div className="w-10 h-10 rounded-full bg-[#5B57E8] text-white text-sm font-semibold flex items-center justify-center">AA</div>
              <div className="text-left">
                <h4 className="text-sm font-bold text-gray-900">{selectedTeamTask.title}</h4>
                <p className="text-xs text-gray-500">Created by Manager Alex Admin</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-left">
              {[
                ["Assigned To", selectedTeamTask.assignee],
                ["Due Date", selectedTeamTask.due],
                ["Priority", selectedTeamTask.priority],
                ["Status", selectedTeamTask.status]
              ].map(([k, v]) => (
                <div key={k} className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-1">{k}</p>
                  <p className="text-sm font-semibold text-gray-800">{v}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
              <Btn variant="outline" onClick={() => setSelectedTeamTask(null)}>Close</Btn>
            </div>
          </div>
        </Modal>
      )}

      {/* ── TeamPage: Assign Task Modal ── */}
      {showAssignTask && (
        <Modal title="Assign Task" onClose={() => setShowAssignTask(false)}>
          <div className="space-y-3">
            <InputField label="Task Title" placeholder="e.g. Complete Q3 Performance Review…"/>
            <div className="grid grid-cols-2 gap-3">
              <SelectField label="Priority"><option>Medium</option><option>High</option><option>Low</option><option>Critical</option></SelectField>
              <SelectField label="Category"><option>Admin</option><option>Project</option><option>Compliance</option><option>Training</option></SelectField>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Due Date" type="date"/>
              <SelectField label="Linked To"><option>None</option><option>Q3 Review</option><option>Onboarding</option></SelectField>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
              <Btn variant="outline" onClick={() => setShowAssignTask(false)}>Cancel</Btn>
              <Btn onClick={() => setShowAssignTask(false)}><Plus size={13}/>Assign Task</Btn>
            </div>
          </div>
        </Modal>
      )}

      {/* ── TeamPage: Assign Shift Modal ── */}
      {showAssignShift && selectedEmp && (
        <Modal title={`Assign Shift · ${selectedEmp.name}`} onClose={()=>setShowAssignShift(false)} width="max-w-md">
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
              <Avt initials={selectedEmp.initials} color={selectedEmp.color} size="sm"/>
              <div><p className="text-sm font-semibold text-gray-900">{selectedEmp.name}</p><p className="text-xs text-gray-400">Current: {selectedEmp.shift}</p></div>
            </div>
            <SelectField label="New Shift">
              <option>Morning (6AM–2PM)</option><option>General (9AM–6PM)</option><option>Evening (2PM–10PM)</option><option>Night (10PM–6AM)</option><option>Flexible</option>
            </SelectField>
            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
              <Btn variant="outline" onClick={()=>setShowAssignShift(false)}>Cancel</Btn>
              <Btn onClick={()=>setShowAssignShift(false)}><Clock size={13}/>Save Shift</Btn>
            </div>
          </div>
        </Modal>
      )}

      {/* ── TeamPage: Approve Leave Modal ── */}
      {tApproveId&&(()=> {
        const req = teamReqs.find(r => r.id === tApproveId);
        return req ? (
          <Modal title="Approve Leave" onClose={() => setTApproveId(null)}>
            <div className="space-y-4 text-left">
              <div className="bg-green-50 border border-green-100 rounded-xl p-4 flex items-start gap-3">
                <CheckCircle size={18} className="text-green-500 flex-shrink-0 mt-0.5"/>
                <div><p className="text-sm font-semibold text-green-800">Confirm Approval</p><p className="text-xs text-green-700 mt-0.5">This will notify the employee and update their leave balance.</p></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {([["Employee",req.employee],["Leave Type",req.type],["Date Range",`${fmtDate(req.from)} – ${fmtDate(req.to)}`],["Total Days",req.days+" days"]] as [string,string][]).map(([k,v])=>(
                  <div key={k} className="bg-gray-50 rounded-lg p-3"><p className="text-[10px] text-gray-400 uppercase tracking-wide mb-1">{k}</p><p className="text-sm font-semibold text-gray-800">{v}</p></div>
                ))}
              </div>
              <div className="flex justify-end gap-3 pt-2 border-t border-gray-200">
                <Btn variant="outline" onClick={() => setTApproveId(null)}>Cancel</Btn>
                <Btn onClick={confirmApproveT} className="bg-green-600 hover:bg-green-700"><Check size={13}/>Approve</Btn>
              </div>
            </div>
          </Modal>
        ) : null;
      })()}

      {/* ── TeamPage: Reject Leave Modal ── */}
      {tRejectId&&(() => {
        const req = teamReqs.find(r => r.id === tRejectId);
        return req ? (
          <Modal title="Reject Leave Request" onClose={() => setTRejectId(null)}>
            <div className="space-y-4 text-left">
              <div className="grid grid-cols-2 gap-3">
                {([["Employee",req.employee],["Type",req.type],["Period",`${fmtDate(req.from)} – ${fmtDate(req.to)}`],["Days",req.days+" days"]] as [string,string][]).map(([k,v])=>(
                  <div key={k} className="bg-gray-50 rounded-lg p-3"><p className="text-[10px] text-gray-400 uppercase tracking-wide mb-1">{k}</p><p className="text-sm font-semibold text-gray-800">{v}</p></div>
                ))}
              </div>
              <div className="flex justify-end gap-3 pt-2 border-t border-gray-200">
                <Btn variant="outline" onClick={() => setTRejectId(null)}>Cancel</Btn>
                <Btn onClick={confirmRejectT} className="bg-red-600 hover:bg-red-700"><X size={13}/>Reject Leave</Btn>
              </div>
            </div>
          </Modal>
        ) : null;
      })()}

      {/* ── TeamPage: Email Modal ── */}
      {showEmailModal&&selectedEmp&&(
        <Modal title={`Email · ${selectedEmp.name}`} onClose={()=>setShowEmailModal(false)} width="max-w-xl">
          <div className="space-y-3 text-left">
            <InputField label="Subject" value={emailSubject} onChange={e=>setEmailSubject(e.target.value)} placeholder="Subject…"/>
            <div className="flex flex-col gap-1"><label className="text-xs font-semibold text-gray-500">Message</label><textarea rows={6} value={emailBody} onChange={e=>setEmailBody(e.target.value)} placeholder="Write your message…" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#5C5CFF]"/></div>
            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
              <Btn variant="outline" onClick={()=>setShowEmailModal(false)}>Cancel</Btn>
              <Btn onClick={()=>setShowEmailModal(false)}><Send size={13}/>Send Email</Btn>
            </div>
          </div>
        </Modal>
      )}

      {/* ── TeamPage: Call Modal ── */}
      {showCallModal&&selectedEmp&&(
        <Modal title="Contact Details" onClose={()=>setShowCallModal(false)} width="max-w-sm">
          <div className="space-y-3 text-left">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
              <Avt initials={selectedEmp.initials} color={selectedEmp.color} size="md"/>
              <div><p className="font-semibold text-gray-900">{selectedEmp.name}</p><p className="text-xs text-gray-500">{selectedEmp.designation}</p></div>
            </div>
            <Btn className="w-full justify-center" onClick={()=>setShowCallModal(false)}><Phone size={13}/>Call Now</Btn>
          </div>
        </Modal>
      )}

    </div>
  );
}

// ── Attendance Page ────────────────────────────────────────────────────────────
function AttendancePage({
  navigate,
  section,
  onSectionChange,
  activeTab
}: {
  navigate: (p: AppPage, emp?: any, tabOrSection?: string) => void;
  section: "My Space" | "My Team";
  onSectionChange: (s: "My Space" | "My Team") => void;
  activeTab: string;
}) {
  const [tab, setTab] = useState("Overview"); // For team view
  const [attView, setAttView] = useState<"summary"|"timeline"|"calendar"|"issues">("summary"); // For personal view
  const [attPeriod, setAttPeriod] = useState<"Weekly"|"Monthly"|"Yearly">("Monthly"); // For personal view
  const [checkedIn, setCheckedIn] = useState(true);

  // Sync activeTab with local tab states
  useEffect(() => {
    if (section === "My Space") {
      if (activeTab === "Overview") setAttView("summary");
      else if (activeTab === "Exceptions") setAttView("issues");
      else if (activeTab === "Analytics") setAttView("timeline");
    } else {
      setTab(activeTab);
    }
  }, [activeTab, section]);

  // Filters for personal summary
  const [showAttFilter, setShowAttFilter] = useState(false);
  const [showAttExport, setShowAttExport] = useState(false);

  // Filters for team view
  const [teamDeptFilter, setTeamDeptFilter] = useState("All");
  const [teamStatusFilter, setTeamStatusFilter] = useState("All");
  const [teamEmpSearch, setTeamEmpSearch] = useState("");
  const [attFMonth, setAttFMonth] = useState("All");
  const [attFQuarter, setAttFQuarter] = useState("All");
  const [attFShift, setAttFShift] = useState("All");

  const [exTab, setExTab] = useState("Missing Check-In");
  const [attToast, setAttToast] = useState<string|null>(null);
  const attMsg = (m:string) => { setAttToast(m); setTimeout(()=>setAttToast(null),2500); };

  return (
    <div className="flex flex-col h-full bg-[#F7F8FA] overflow-hidden">

      {/* Floating Filter Popover */}
      {showAttFilter && (
        <div className="absolute right-8 top-4 w-72 bg-white border border-gray-200 rounded-xl shadow-xl z-40 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-gray-700">Filters</p>
            <button onClick={()=>setShowAttFilter(false)}><X size={13} className="text-gray-400"/></button>
          </div>
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
          <div className="pt-2 border-t border-gray-100 flex gap-2">
            <button onClick={()=>{setAttFMonth("All");setAttFQuarter("All");setAttFShift("All");setShowAttFilter(false);}} className="flex-1 px-3 py-1.5 text-xs border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">Reset</button>
            <button onClick={()=>setShowAttFilter(false)} className="flex-1 px-3 py-1.5 text-xs bg-[#5C5CFF] text-white rounded-lg hover:bg-[#4A4AE0]">Apply</button>
          </div>
        </div>
      )}

      {/* Exception sub-bar inside content area when view is exceptions */}
      {section === "My Team" && tab === "Exceptions" && (
        <div className="bg-white border-b border-gray-100 px-6 py-2.5 flex items-center justify-between flex-shrink-0">
          <div className="flex gap-1 bg-gray-50 border border-gray-200 rounded-lg p-0.5">
            {["Missing Check-In","Missing Check-Out","Geo Fence Violations","Attendance Corrections"].map(t => (
              <button
                key={t}
                onClick={() => setExTab(t)}
                className={cn(
                  "px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5",
                  exTab === t ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                )}
              >
                {t}
                <span className={cn("px-1.5 py-0.5 rounded-full text-[9px] font-bold", exTab === t ? "bg-[#5C5CFF] text-white" : "bg-gray-200 text-gray-600")}>
                  {{"Missing Check-In":"8","Missing Check-Out":"14","Geo Fence Violations":"3","Attendance Corrections":"6"}[t]}
                </span>
              </button>
            ))}
          </div>
          <span className="text-[11px] text-gray-400 font-medium">Auto-detected exceptions</span>
        </div>
      )}

      {/* ── Content Area ── */}
      <div className="flex-1 overflow-auto bg-[#F7F8FA]">
        {section === "My Space" ? (
          <MySpacePage
            navigate={navigate}
            activeTab="Attendance"
            hideTabs={true}
            hideAttendanceHeader={true}
            attViewProp={attView}
            setAttViewProp={setAttView}
            attPeriodProp={attPeriod}
            setAttPeriodProp={setAttPeriod}
          />
        ) : (
          <div className="h-full">
            {tab==="Overview"&&(
              <div>
                <div className="bg-white border-b border-gray-200 px-6 py-3 grid grid-cols-5 gap-3">
                  {[["Present","734","bg-green-50 text-green-600"],["Late","32","bg-amber-50 text-amber-600"],["On Leave","43","bg-purple-50 text-purple-600"],["WFH","21","bg-blue-50 text-blue-600"],["Absent","17","bg-red-50 text-red-600"]].map(([l,v,cls])=>(
                    <div key={l as string} className={cn("rounded-lg px-4 py-2.5 flex items-center justify-between",cls)}>
                      <span className="text-sm text-gray-700">{l}</span><span className="text-lg font-semibold">{v}</span>
                    </div>
                  ))}
                </div>
                <div className="p-4">
                  <table className="w-full text-sm bg-white rounded-lg border border-gray-200">
                    <thead className="bg-gray-50 border-b border-gray-200"><tr>{["Employee","Department","Check In","Check Out","Hours","Status"].map(h=><th key={h} className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">{h}</th>)}</tr></thead>
                    <tbody className="divide-y divide-gray-100">
                      {ATTENDANCE_RECORDS.filter(r => (teamDeptFilter === "All Departments" || teamDeptFilter === "All" || r.dept === teamDeptFilter) && (teamStatusFilter === "All" || r.status === teamStatusFilter) && (!teamEmpSearch || r.name.toLowerCase().includes(teamEmpSearch.toLowerCase()))).map(r=>(
                        <tr key={r.id} className="hover:bg-gray-50">
                          <td className="px-5 py-3"><div className="flex items-center gap-2.5"><Avt initials={r.name.split(" ").map(n=>n[0]).join("")} color={EMP_COLORS[EMPLOYEES.findIndex(e=>e.id===r.id)%EMP_COLORS.length]||"#5C5CFF"} size="sm"/><div><div className="font-medium text-gray-800">{r.name}</div><div className="text-xs text-gray-400">{r.id}</div></div></div></td>
                          <td className="px-5 py-3 text-gray-600">{r.dept}</td>
                          <td className="px-5 py-3 font-mono text-xs text-gray-700">{r.checkIn}</td>
                          <td className="px-5 py-3 font-mono text-xs text-gray-700">{r.checkOut}</td>
                          <td className="px-5 py-3 font-mono text-xs text-gray-600">{r.hours>0?`${r.hours}h`:"–"}</td>
                          <td className="px-5 py-3"><StatusBadge status={r.status}/></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {tab==="Exceptions"&&(
              <div className="flex flex-col h-full">
                <div className="flex-1 overflow-auto p-6">
                  <div className="bg-white rounded-lg border border-gray-200">
                    <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-gray-800">{exTab}</h3>
                      <button className="text-xs text-[#5C5CFF] hover:underline">Batch Action ({{"Missing Check-In":"8","Missing Check-Out":"14","Geo Fence Violations":"3","Attendance Corrections":"6"}[exTab]} pending)</button>
                    </div>
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 border-b border-gray-200"><tr>{["Employee","Details","Date","Actions"].map(h=><th key={h} className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">{h}</th>)}</tr></thead>
                      <tbody className="divide-y divide-gray-100">
                        {EMPLOYEES.slice(0,5).map(emp=>(
                          <tr key={emp.id} className="hover:bg-gray-50">
                            <td className="px-5 py-3"><div className="flex items-center gap-2.5"><Avt initials={emp.initials} color={emp.color} size="sm"/><div><div className="font-medium text-gray-800">{emp.name}</div><div className="text-xs text-gray-400">{emp.dept}</div></div></div></td>
                            <td className="px-5 py-3 text-xs text-red-600 font-medium">{exTab==="Geo Fence Violations"?"Checked in 1.2km outside geofence":exTab}</td>
                            <td className="px-5 py-3 text-xs text-gray-500">Jul 1, 2024</td>
                            <td className="px-5 py-3"><div className="flex gap-1.5"><button onClick={()=>attMsg("Request approved")} className="px-2.5 py-1.5 bg-green-50 border border-green-200 text-green-700 text-xs font-semibold rounded-lg hover:bg-green-100">Approve</button><button onClick={()=>attMsg("Request rejected")} className="px-2.5 py-1.5 bg-red-50 border border-red-200 text-red-600 text-xs font-semibold rounded-lg hover:bg-red-100">Reject</button></div></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {tab==="Analytics"&&(
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg border border-gray-200 p-5">
                    <h4 className="text-sm font-semibold text-gray-800 mb-3">Attendance Rate Trend</h4>
                    <ResponsiveContainer width="100%" height={200}>
                      <AreaChart id="att-rate" data={ATT_TREND}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6"/>
                        <XAxis dataKey="date" tick={{fontSize:11,fill:"#9CA3AF"}} axisLine={false} tickLine={false}/>
                        <YAxis tick={{fontSize:11,fill:"#9CA3AF"}} axisLine={false} tickLine={false}/>
                        <Tooltip contentStyle={{fontSize:12,borderRadius:8}}/>
                        <Area type="monotone" dataKey="rate" stroke="#5C5CFF" fill="#5C5CFF" fillOpacity={0.1}/>
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="bg-white rounded-lg border border-gray-200 p-5">
                    <h4 className="text-sm font-semibold text-gray-800 mb-3">WFH Trends</h4>
                    <div className="space-y-3">
                      {[["Engineering",42,234],["Product",18,56],["Design",28,64],["Marketing",15,98],["HR",12,48]].map(([dept,wfh,total])=>(
                        <div key={dept as string} className="flex items-center gap-3">
                          <div className="w-20 text-xs text-gray-600 text-right">{dept}</div>
                          <div className="flex-1 bg-gray-100 rounded-full h-2"><div className="h-2 bg-blue-400 rounded-full" style={{width:`${((wfh as number)/(total as number))*100}%`}}/></div>
                          <div className="w-16 text-xs text-gray-500">{wfh}/{total} ({Math.round(((wfh as number)/(total as number))*100)}%)</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {attToast&&(
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-gray-900 text-white text-sm px-4 py-2.5 rounded-xl shadow-lg">
          <CheckCircle size={15} className="text-green-400 flex-shrink-0"/>{attToast}
        </div>
      )}
    </div>
  );
}

// ── Leave Page ─────────────────────────────────────────────────────────────────
function LeavePage({
  navigate,
  section,
  onSectionChange,
  activeTab
}: {
  navigate: (p: AppPage, emp?: any, tabOrSection?: string) => void;
  section: "My Space" | "My Team";
  onSectionChange: (s: "My Space" | "My Team") => void;
  activeTab: string;
}) {
  const [tab, setTab] = useState("Overview"); // For team view
  const [leaveView, setLeaveView] = useState<"Balance"|"Requests"|"Calendar"|"Analytics"|"Status">("Balance"); // For personal view
  const [reqs, setReqs] = useState(LEAVE_REQUESTS);
  const [showApply, setShowApply] = useState(false);
  const approve = (id:string) => setReqs(r=>r.map(x=>x.id===id?{...x,status:"Approved"}:x));
  const reject = (id:string) => setReqs(r=>r.map(x=>x.id===id?{...x,status:"Rejected"}:x));

  // Sync activeTab with local tab states
  useEffect(() => {
    if (section === "My Space") {
      if (activeTab === "Overview") setLeaveView("Balance");
      else if (activeTab === "Requests") setLeaveView("Requests");
      else if (activeTab === "Analytics") setLeaveView("Analytics");
    } else {
      setTab(activeTab);
    }
  }, [activeTab, section]);

  const [attToast, setAttToast] = useState<string|null>(null);
  const attMsg = (m:string) => { setAttToast(m); setTimeout(()=>setAttToast(null),2500); };

  return (
    <div className="flex flex-col h-full bg-[#F7F8FA] overflow-hidden">

      {/* ── Content Area ── */}
      <div className="flex-1 overflow-auto bg-[#F7F8FA]">
        {section === "My Space" ? (
          <MySpacePage
            navigate={navigate}
            activeTab="Leave"
            hideTabs={true}
            hideLeaveHeader={true}
            leaveViewProp={leaveView}
            setLeaveViewProp={setLeaveView}
          />
        ) : (
          <div className="flex-1 flex flex-col overflow-hidden h-full">
            <div className="flex-1 overflow-auto">
              {tab === "Overview" && (
                <div className="p-6 space-y-5">
                  <div className="grid grid-cols-4 gap-4">
                    {[["Pending Approval","3","text-amber-600","bg-amber-50"],["Approved Today","2","text-green-600","bg-green-50"],["On Leave Now","43","text-blue-600","bg-blue-50"],["Upcoming (7 days)","18","text-purple-600","bg-purple-50"]].map(([l,v,tc,bc])=>(
                      <div key={l as string} className={cn("flex items-center justify-between px-5 py-3.5 rounded-lg",bc)}>
                        <span className="text-sm text-gray-700">{l}</span><span className={cn("text-xl font-semibold",tc)}>{v}</span>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {EMPLOYEES.slice(0,9).map(emp=>(
                      <div key={emp.id} className="bg-white rounded-lg border border-gray-200 p-4">
                        <div className="flex items-center gap-3 mb-3"><Avt initials={emp.initials} color={emp.color} size="sm"/><div><p className="text-sm font-medium text-gray-800">{emp.name}</p><p className="text-xs text-gray-500">{emp.dept}</p></div></div>
                        <div className="space-y-2">
                          {[["Annual",12,18],["Sick",8,10],["Casual",5,6]].map(([t,u,total])=>(
                            <div key={t as string}><div className="flex justify-between text-xs text-gray-500 mb-0.5"><span>{t}</span><span>{(total as number)-(u as number)} left / {total}</span></div><div className="w-full bg-gray-100 rounded-full h-1"><div className="h-1 bg-[#5C5CFF] rounded-full" style={{width:`${((u as number)/(total as number))*100}%`}}/></div></div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {tab === "Requests" && (
                <div className="p-6">
                  <div className="bg-white rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                      <h3 className="text-sm font-semibold text-gray-800">Leave Requests</h3>
                      <div className="flex gap-2"><div className="relative"><select className="pl-3 pr-7 py-1.5 text-xs border border-gray-300 rounded-md bg-white appearance-none focus:outline-none"><option>All Status</option><option>Pending</option><option>Approved</option><option>Rejected</option></select><ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"/></div></div>
                    </div>
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50"><tr>{["Employee","Type","From","To","Days","Reason","Status","Actions"].map(h=><th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{h}</th>)}</tr></thead>
                      <tbody className="divide-y divide-gray-100">
                        {reqs.map(r=>(
                          <tr key={r.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3"><div className="flex items-center gap-2"><Avt initials={r.employee.split(" ").map(n=>n[0]).join("")} color={EMP_COLORS[parseInt(r.id.slice(-1))%EMP_COLORS.length]} size="sm"/><span className="font-medium text-gray-800">{r.employee}</span></div></td>
                            <td className="px-4 py-3 text-gray-600">{r.type}</td>
                            <td className="px-4 py-3 text-gray-600 text-xs">{fmtDate(r.from)}</td>
                            <td className="px-4 py-3 text-gray-600 text-xs">{fmtDate(r.to)}</td>
                            <td className="px-4 py-3 font-medium text-gray-800">{r.days}</td>
                            <td className="px-4 py-3 text-gray-500 text-xs max-w-xs truncate">{r.reason}</td>
                            <td className="px-4 py-3"><StatusBadge status={r.status}/></td>
                            <td className="px-4 py-3">{r.status==="Pending"&&<div className="flex gap-1"><button onClick={()=>approve(r.id)} className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs hover:bg-green-100 flex items-center gap-1"><Check size={10}/>Approve</button><button onClick={()=>reject(r.id)} className="px-2 py-1 bg-red-50 text-red-600 rounded text-xs hover:bg-red-100 flex items-center gap-1"><X size={10}/>Reject</button></div>}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {tab === "Analytics" && (
                <div className="p-6 space-y-5">
                  <div className="grid grid-cols-2 gap-5">
                    <div className="bg-white rounded-lg border border-gray-200 p-5">
                      <h4 className="text-sm font-semibold text-gray-800 mb-4">Leave Utilization by Month</h4>
                      <ResponsiveContainer width="100%" height={200}>
                        <RBarChart id="leave-util" data={LEAVE_MONTHLY}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6"/>
                          <XAxis dataKey="month" tick={{fontSize:11,fill:"#9CA3AF"}} axisLine={false} tickLine={false}/>
                          <YAxis tick={{fontSize:11,fill:"#9CA3AF"}} axisLine={false} tickLine={false}/>
                          <Tooltip contentStyle={{fontSize:12,borderRadius:8}}/>
                          <Bar key="annual" dataKey="annual" name="Annual" fill="#5C5CFF" radius={[3,3,0,0]}/>
                          <Bar key="sick" dataKey="sick" name="Sick" fill="#F59E0B" radius={[3,3,0,0]}/>
                          <Bar key="casual" dataKey="casual" name="Casual" fill="#22C55E" radius={[3,3,0,0]}/>
                          <Legend/>
                        </RBarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-5">
                      <h4 className="text-sm font-semibold text-gray-800 mb-4">Leave by Department</h4>
                      <div className="space-y-3 mt-2">
                        {[["Engineering",42],["Sales",38],["Marketing",31],["HR",28],["Finance",22],["Design",19],["Legal",12]].map(([dept,days])=>(
                          <div key={dept as string} className="flex items-center gap-3">
                            <div className="w-20 text-xs text-gray-600 text-right">{dept}</div>
                            <div className="flex-1 bg-gray-100 rounded-full h-2"><div className="h-2 bg-[#5C5CFF] rounded-full" style={{width:`${((days as number)/50)*100}%`}}/></div>
                            <div className="w-12 text-xs font-medium text-gray-700">{days} days</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {showApply&&(
        <Modal title="Apply Leave" onClose={()=>setShowApply(false)}>
          <div className="space-y-4">
            <SelectField label="Leave Type" options={["Annual Leave","Sick Leave","Casual Leave","Maternity Leave","Paternity Leave","Unpaid Leave"]}/>
            <div className="grid grid-cols-2 gap-4">
              <InputField label="From Date" type="date" required/>
              <InputField label="To Date" type="date" required/>
            </div>
            <InputField label="Reason" placeholder="Brief reason for leave…" required/>
            <div className="p-3 bg-blue-50 rounded-lg text-xs text-blue-700">
              <span className="font-semibold">Annual Leave Balance:</span> 6 days remaining out of 18
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <Btn variant="outline" onClick={()=>setShowApply(false)}>Cancel</Btn>
              <Btn onClick={()=>setShowApply(false)}><Check size={13}/>Submit Request</Btn>
            </div>
          </div>
        </Modal>
      )}
      {attToast&&(
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-gray-900 text-white text-sm px-4 py-2.5 rounded-xl shadow-lg">
          <CheckCircle size={15} className="text-green-400 flex-shrink-0"/>{attToast}
        </div>
      )}
    </div>
  );
}

// ── Employee Profile Page ──────────────────────────────────────────────────────
function EmployeeProfilePage({ employee, navigate }: { employee:Employee; navigate:(p:AppPage)=>void }) {
  const [tab, setTab] = useState("Activities");
  const [showEdit, setShowEdit] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white border-b border-gray-200 px-6 py-5">
        <div className="flex items-start justify-between mb-4">
          <div className="text-xs text-gray-400 flex items-center gap-1">
            <button onClick={()=>navigate("my-space")} className="hover:text-[#5C5CFF]">Home</button><ChevronRight size={12}/>
            <button onClick={()=>navigate("organization")} className="hover:text-[#5C5CFF]">Organization</button><ChevronRight size={12}/>
            <span>{employee.name}</span>
          </div>
          <div className="flex gap-2 relative">
            <Btn variant="outline" size="sm" onClick={()=>setShowEdit(true)}><Edit size={13}/>Edit</Btn>
            <div className="relative">
              <Btn variant="outline" size="sm" onClick={()=>setShowMenu(!showMenu)}><MoreHorizontal size={13}/></Btn>
              {showMenu&&(
                <div className="absolute right-0 top-full mt-1 w-52 bg-white rounded-xl border border-gray-200 shadow-lg z-30 py-1" onClick={()=>setShowMenu(false)}>
                  {([{icon:Edit,label:"Edit Employee"},{icon:ClipboardList,label:"Assign Task"},{icon:Clock,label:"Assign Shift"},{icon:FileText,label:"View Documents"},{icon:Download,label:"Download Profile"},{icon:Upload,label:"Export Details"}] as {icon:React.ElementType,label:string}[]).map(({icon:Icon,label})=>(
                    <button key={label} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2.5"><Icon size={13} className="text-gray-400"/>{label}</button>
                  ))}
                  <div className="border-t border-gray-100 my-1"/>
                  <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2.5"><Key size={13} className="text-gray-400"/>Reset Password</button>
                  <button className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2.5"><UserX size={13}/>Deactivate Employee</button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <Avt initials={employee.initials} color={employee.color} size="xl"/>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-xl font-semibold text-gray-900">{employee.name}</h2>
              <StatusBadge status={employee.status}/>
              <span className="text-xs text-gray-400 font-mono">{employee.id}</span>
            </div>
            <p className="text-sm text-gray-600">{employee.designation} · {employee.dept}</p>
            <div className="flex items-center gap-4 mt-2">
              <span className="flex items-center gap-1.5 text-xs text-gray-500"><Mail size={12}/>{employee.email}</span>
              <span className="flex items-center gap-1.5 text-xs text-gray-500"><Phone size={12}/>{employee.phone}</span>
              <span className="flex items-center gap-1.5 text-xs text-gray-500"><MapPin size={12}/>{employee.branch}</span>
              <span className="flex items-center gap-1.5 text-xs text-gray-500"><Briefcase size={12}/>{employee.empType}</span>
            </div>
          </div>
          <div className="flex gap-6 text-center">
            <div><div className="text-xl font-semibold text-gray-900">{employee.attendance}%</div><div className="text-xs text-gray-500">Attendance</div></div>
            <div><div className="text-xl font-semibold text-gray-900">{employee.shift}</div><div className="text-xs text-gray-500">Shift</div></div>
          </div>
        </div>
      </div>
      <TabBar tabs={["Activities","Profile","Attendance","Leave","Shift"]} active={tab} onChange={setTab}/>
      <div className="flex-1 overflow-auto p-6">
        {tab==="Profile"&&(
          <div className="grid grid-cols-3 gap-5">
            <div className="col-span-2 space-y-5">
              <div className="bg-white rounded-lg border border-gray-200 p-5">
                <h4 className="text-sm font-semibold text-gray-800 mb-4">Employment Details</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {[["Employee ID",employee.id],["Join Date",fmtDate(employee.joinDate)],["Department",employee.dept],["Designation",employee.designation],["Branch",employee.branch],["Shift",employee.shift],["Employment Type",employee.empType],["Reporting Manager",employee.manager]].map(([k,v])=>(
                    <div key={k}><div className="text-xs text-gray-500 mb-0.5">{k}</div><div className="font-medium text-gray-800">{v}</div></div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-5">
                <h4 className="text-sm font-semibold text-gray-800 mb-4">Contact Information</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {[["Work Email",employee.email],["Phone",employee.phone],["Emergency Contact","+1 (555) 999-0001"],["Personal Email",employee.email.replace("acmecorp","gmail")]].map(([k,v])=>(
                    <div key={k}><div className="text-xs text-gray-500 mb-0.5">{k}</div><div className="font-medium text-gray-800">{v}</div></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h4 className="text-sm font-semibold text-gray-800 mb-3">Leave Balance</h4>
                {[["Annual",18,12],["Sick",10,8],["Casual",6,5]].map(([type,total,remaining])=>(
                  <div key={type as string} className="mb-3">
                    <div className="flex justify-between text-xs text-gray-600 mb-1"><span>{type}</span><span className="font-medium">{remaining}/{total} days</span></div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5"><div className="h-1.5 bg-[#5C5CFF] rounded-full" style={{width:`${((remaining as number)/(total as number))*100}%`}}/></div>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h4 className="text-sm font-semibold text-gray-800 mb-3">Quick Actions</h4>
                <div className="space-y-2">
                  {([{icon:Edit,label:"Edit Employee"},{icon:ClipboardList,label:"Assign Task"},{icon:Clock,label:"Assign Shift"},{icon:MessageCircle,label:"Send Message"},{icon:BarChart2,label:"View Attendance"},{icon:CalendarDays,label:"View Leave History"},{icon:Download,label:"Download Profile"},{icon:UserX,label:"Deactivate Employee",danger:true}] as {icon:React.ElementType,label:string,danger?:boolean}[]).map(({icon:Icon,label,danger})=>(
                    <button key={label} className={cn("w-full flex items-center gap-2.5 px-3 py-2 text-sm rounded-lg border border-gray-200 text-left transition-colors",danger?"text-red-600 hover:bg-red-50 border-red-100":"text-gray-600 hover:bg-gray-50")}><Icon size={14} className={danger?"text-red-500":"text-[#5C5CFF]"}/>{label}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {tab==="Activities"&&(
          <div className="space-y-3 max-w-2xl">
            {[{action:"Checked in",time:"Today, 9:02 AM",icon:Clock,color:"text-green-600 bg-green-50"},{action:"Leave approved – Annual Leave 2 days",time:"Yesterday, 3:15 PM",icon:CalendarDays,color:"text-purple-600 bg-purple-50"},{action:"Task completed: Q2 report submission",time:"Jun 27, 2:00 PM",icon:ClipboardList,color:"text-blue-600 bg-blue-50"},{action:"Shift changed to General (9AM–6PM)",time:"Jun 25, 11:30 AM",icon:AlertCircle,color:"text-amber-600 bg-amber-50"},{action:"Profile updated by Admin",time:"Jun 20, 4:00 PM",icon:Edit,color:"text-gray-600 bg-gray-100"}].map(({action,time,icon:Icon,color},i)=>(
              <div key={i} className="flex items-start gap-3 bg-white border border-gray-200 rounded-xl p-4">
                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",color.split(" ")[1])}><Icon size={14} className={color.split(" ")[0]}/></div>
                <div className="flex-1"><p className="text-sm text-gray-800">{action}</p><p className="text-xs text-gray-400 mt-0.5">{time}</p></div>
              </div>
            ))}
          </div>
        )}
        {tab==="Attendance"&&(
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-4">
              {[["Present Days","22","of 26 working days"],["Late Arrivals","2","this month"],["Avg Hours","9.1 hrs","per day"],["Attendance Rate","97.2%","this month"]].map(([t,v,s])=>(
                <div key={t as string} className="bg-white rounded-lg border border-gray-200 p-4"><div className="text-xs text-gray-500 mb-1">{t}</div><div className="text-xl font-semibold text-gray-900">{v}</div><div className="text-xs text-gray-400 mt-0.5">{s}</div></div>
              ))}
            </div>
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between"><h4 className="text-sm font-semibold text-gray-800">Log – June 2024</h4><Btn variant="outline" size="sm"><Download size={12}/>Export</Btn></div>
              <table className="w-full text-sm">
                <thead className="bg-gray-50"><tr>{["Date","Check In","Check Out","Hours","Status"].map(h=><th key={h} className="px-5 py-2.5 text-left text-xs font-medium text-gray-500 uppercase">{h}</th>)}</tr></thead>
                <tbody className="divide-y divide-gray-100">
                  {[["Jun 28, Fri","09:02","18:15","9h 13m","Present"],["Jun 27, Thu","09:00","18:05","9h 05m","Present"],["Jun 26, Wed","09:45","18:30","8h 45m","Late"],["Jun 25, Tue","09:01","18:00","8h 59m","Present"],["Jun 21, Fri","–","–","–","On Leave"]].map(([d,ci,co,h,s])=>(
                    <tr key={d as string} className="hover:bg-gray-50">
                      <td className="px-5 py-3 text-gray-700">{d}</td>
                      <td className="px-5 py-3 font-mono text-xs text-gray-700">{ci}</td>
                      <td className="px-5 py-3 font-mono text-xs text-gray-700">{co}</td>
                      <td className="px-5 py-3 font-mono text-xs text-gray-600">{h}</td>
                      <td className="px-5 py-3"><StatusBadge status={s as string}/></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {(tab==="Leave"||tab==="Shift")&&(
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center text-gray-500">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
              {tab==="Leave"&&<CalendarDays size={20} className="text-gray-400"/>}
              {tab==="Shift"&&<Clock size={20} className="text-gray-400"/>}
            </div>
            <p className="text-sm font-medium text-gray-700 mb-1">{tab} – {employee.name}</p>
            <p className="text-xs text-gray-400">All {tab.toLowerCase()} data appears here</p>
          </div>
        )}
      </div>
      {showEdit&&(
        <Modal title={`Edit – ${employee.name}`} onClose={()=>setShowEdit(false)} width="max-w-2xl">
          <div className="grid grid-cols-2 gap-4">
            <InputField label="First Name" value={employee.name.split(" ")[0]} required/>
            <InputField label="Last Name" value={employee.name.split(" ").slice(1).join(" ")} required/>
            <InputField label="Work Email" value={employee.email} type="email" required/>
            <InputField label="Phone" value={employee.phone} type="tel"/>
            <SelectField label="Department" options={["Engineering","Product","Design","Marketing","Sales","Finance","HR","Legal","Operations"]} value={employee.dept}/>
            <InputField label="Designation" value={employee.designation} required/>
            <SelectField label="Branch" options={["New York HQ","San Francisco","Chicago","Austin"]} value={employee.branch}/>
            <SelectField label="Shift" options={["General","Morning","Evening","Night"]} value={employee.shift}/>
          </div>
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200"><Btn variant="outline" onClick={()=>setShowEdit(false)}>Cancel</Btn><Btn onClick={()=>setShowEdit(false)}>Save Changes</Btn></div>
        </Modal>
      )}
    </div>
  );
}

// ── Add Employee Page ──────────────────────────────────────────────────────────
function AddEmployeePage({ navigate }: { navigate:(p:AppPage)=>void }) {
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<"form"|"invite-review"|"invite-sent">("form");
  const [sending, setSending] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showActivity, setShowActivity] = useState(false);
  const [inviteActivity, setInviteActivity] = useState<{action:string;time:string}[]>([]);
  const [inviteToken] = useState(() => Math.random().toString(36).slice(2,10).toUpperCase());
  const STEPS = ["Personal Info","Contact Details","Employment","Assign Team","Shift & Leave","Review"];

  const empName = "John Smith";
  const empEmail = "john.smith@acmecorp.com";

  const handleSend = () => {
    setSending(true);
    setTimeout(()=>{
      setInviteActivity([{action:"Invitation email sent",time:"Jul 15, 2024 · 10:32 AM"}]);
      setSending(false);
      setPhase("invite-sent");
    }, 1200);
  };

  // ── Phase: invite-review ──────────────────────────────────────────────────
  if (phase==="invite-review") return (
    <div className="flex flex-col h-full">
      <PageHeader title="Review & Send Invitation" breadcrumbs={[{label:"Home",onClick:()=>navigate("my-space")},{label:"Organization",onClick:()=>navigate("organization")},{label:"Add Employee",onClick:()=>setPhase("form")},{label:"Send Invitation"}]}>
        <Btn variant="outline" onClick={()=>setPhase("form")}>Edit Profile</Btn>
      </PageHeader>

      <div className="flex-1 overflow-auto">
        <div className="max-w-2xl mx-auto p-8 space-y-6">
          {/* Lifecycle bar */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 overflow-x-auto">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Employee Lifecycle</p>
            <div className="flex items-center gap-1 flex-wrap">
              {["Draft","Ready to Invite","Invitation Sent","Invitation Viewed","Accepted","Active"].map((s,i)=>(
                <div key={s} className="flex items-center gap-1">
                  <div className={cn("flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-colors",s==="Ready to Invite"?"bg-indigo-100 text-indigo-700 ring-1 ring-indigo-300":"bg-gray-100 text-gray-400")}>
                    {i<1&&<Check size={10}/>}{s}
                  </div>
                  {i<5&&<ChevronRight size={12} className="text-gray-300 flex-shrink-0"/>}
                </div>
              ))}
            </div>
          </div>

          {/* Employee card */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-[#5C5CFF] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">JS</div>
              <div className="flex-1">
                <div className="flex items-center gap-2"><h3 className="text-base font-semibold text-gray-900">{empName}</h3><StatusBadge status="Ready to Invite"/></div>
                <p className="text-sm text-gray-500">Software Engineer · Engineering</p>
                <p className="text-xs text-gray-400 mt-0.5">New York HQ · Joins Jul 15, 2024 · Reports to David Chen</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[["Employee ID","E016 (auto)"],["Employment Type","Full-Time"],["Shift","General 09:00–18:00"]].map(([k,v])=>(
                <div key={k} className="bg-gray-50 rounded-lg px-3 py-2.5">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">{k}</p>
                  <p className="text-xs font-medium text-gray-800">{v}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Invitation details */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-5 py-3.5 border-b border-gray-100 flex items-center gap-2">
              <Send size={14} className="text-[#5C5CFF]"/>
              <h4 className="text-sm font-semibold text-gray-800">Invitation Details</h4>
            </div>
            {[
              ["To",empEmail],
              ["Subject","You've been invited to Acme Corporation HRMS"],
              ["Expires In","7 days — Jul 22, 2024"],
              ["Sent From","noreply@acmecorp.hrms.app"],
            ].map(([k,v])=>(
              <div key={k} className="flex items-center justify-between px-5 py-3 border-b border-gray-100 last:border-0">
                <span className="text-xs text-gray-500 w-24 flex-shrink-0">{k}</span>
                <span className="text-sm font-medium text-gray-800 flex-1">{v}</span>
              </div>
            ))}
          </div>

          {/* Info box */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 space-y-2">
            <p className="text-xs font-semibold text-blue-900">What happens when you send the invitation</p>
            {["An email is sent to john.smith@acmecorp.com with a secure activation link","The employee sets their own password and completes their profile","Their status changes from Invitation Sent → Accepted → Active","Login is blocked until the employee accepts the invitation","The invitation link expires in 7 days — you can resend anytime"].map((s,i)=>(
              <div key={i} className="flex items-start gap-2"><div className="w-4 h-4 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0 mt-0.5 text-[9px] font-bold text-blue-700">{i+1}</div><p className="text-xs text-blue-700">{s}</p></div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 bg-white px-8 py-4 flex items-center justify-between">
        <Btn variant="outline" onClick={()=>setPhase("form")}><ChevronLeft size={16}/>Back to Profile</Btn>
        <Btn onClick={handleSend} disabled={sending}>
          {sending?<><div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"/>Sending…</> : <><Send size={15}/>Send Invitation</>}
        </Btn>
      </div>
    </div>
  );

  // ── Phase: invite-sent ─────────────────────────────────────────────────────
  if (phase==="invite-sent") return (
    <div className="flex flex-col h-full">
      <PageHeader title="Invitation Sent" breadcrumbs={[{label:"Home",onClick:()=>navigate("my-space")},{label:"Organization",onClick:()=>navigate("organization")},{label:"Add Employee",onClick:()=>setPhase("form")},{label:"Invitation Sent"}]}/>

      <div className="flex-1 overflow-auto">
        <div className="max-w-2xl mx-auto p-8 space-y-6">
          {/* Lifecycle bar */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 overflow-x-auto">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Employee Lifecycle</p>
            <div className="flex items-center gap-1 flex-wrap">
              {["Draft","Ready to Invite","Invitation Sent","Invitation Viewed","Accepted","Active"].map((s,i)=>(
                <div key={s} className="flex items-center gap-1">
                  <div className={cn("flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-colors",i<2?"bg-gray-100 text-gray-400 ring-1 ring-gray-200":s==="Invitation Sent"?"bg-amber-100 text-amber-700 ring-1 ring-amber-300":"bg-gray-100 text-gray-300")}>
                    {i<2&&<Check size={10}/>}{s}
                  </div>
                  {i<5&&<ChevronRight size={12} className={cn("flex-shrink-0",i<2?"text-[#5C5CFF]":"text-gray-200")}/>}
                </div>
              ))}
            </div>
          </div>

          {/* Success */}
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <Send size={28} className="text-green-500"/>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Invitation sent successfully!</h3>
            <p className="text-sm text-gray-500 mb-4">An invitation email was delivered to <strong className="text-gray-700">{empEmail}</strong>.</p>
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-1.5">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"/>
              <span className="text-xs font-medium text-amber-700">Waiting for {empName} to accept</span>
            </div>
          </div>

          {/* Invitation record */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
              <h4 className="text-sm font-semibold text-gray-800">Invitation Record</h4>
              <StatusBadge status="Invitation Sent"/>
            </div>
            {[["Employee",empName],["Email",empEmail],["Sent At","Jul 15, 2024 · 10:32 AM"],["Expires","Jul 22, 2024 · 10:32 AM (7 days)"],["Token",`ACT-${inviteToken}`],["Status","Awaiting acceptance"]].map(([k,v])=>(
              <div key={k} className="flex items-center justify-between px-5 py-2.5 border-b border-gray-100 last:border-0">
                <span className="text-xs text-gray-500 w-24 flex-shrink-0">{k}</span>
                <span className="text-xs font-medium text-gray-800 font-mono">{v}</span>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-5 py-3.5 border-b border-gray-100"><h4 className="text-sm font-semibold text-gray-800">Actions</h4></div>
            {[
              {icon:RefreshCw,label:"Resend Invitation",sub:`Resend to ${empEmail}`,action:()=>setInviteActivity(a=>[...a,{action:"Invitation resent",time:"Jul 15, 2024 · 10:45 AM"}]),danger:false},
              {icon:Copy,label:copied?"Link Copied!":"Copy Invitation Link",sub:`acmecorp.hrms.app/activate/${inviteToken}`,action:()=>{setCopied(true);setTimeout(()=>setCopied(false),2000);},danger:false},
              {icon:Edit,label:"Edit Employee",sub:"Update profile before they activate",action:()=>setPhase("form"),danger:false},
              {icon:Activity,label:"View Invitation Activity",sub:`${inviteActivity.length} event${inviteActivity.length!==1?"s":""} recorded`,action:()=>setShowActivity(v=>!v),danger:false},
              {icon:XCircle,label:"Cancel Invitation",sub:"Revoke link and return to Draft",action:()=>{},danger:true},
            ].map(({icon:Icon,label,sub,action,danger},i)=>(
              <button key={i} onClick={action} className={cn("w-full flex items-center gap-3 px-5 py-3.5 border-b border-gray-100 last:border-0 text-left transition-colors",danger?"hover:bg-red-50":"hover:bg-gray-50")}>
                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",danger?"bg-red-50":"bg-gray-100")}>
                  <Icon size={14} className={danger?"text-red-400":"text-gray-500"}/>
                </div>
                <div className="flex-1"><p className={cn("text-sm font-medium",danger?"text-red-600":"text-gray-800")}>{label}</p><p className="text-[10px] text-gray-400">{sub}</p></div>
                <ChevronRight size={13} className="text-gray-300"/>
              </button>
            ))}
            {showActivity&&inviteActivity.length>0&&(
              <div className="bg-gray-50 px-5 py-3 space-y-1.5 border-t border-gray-100">
                {inviteActivity.map((a,i)=>(
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0"/>
                    <div className="flex-1"><p className="text-xs text-gray-700">{a.action}</p></div>
                    <p className="text-[10px] text-gray-400">{a.time}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 bg-white px-8 py-4 flex items-center justify-between">
        <Btn variant="outline" onClick={()=>navigate("organization")}>Back to Employee List</Btn>
        <Btn onClick={()=>navigate("organization")}>Done</Btn>
      </div>
    </div>
  );

  // ── Phase: form ───────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Add Employee" breadcrumbs={[{label:"Home",onClick:()=>navigate("my-space")},{label:"Organization",onClick:()=>navigate("organization")},{label:"Add Employee"}]}>
        <Btn variant="outline" onClick={()=>navigate("organization")}>Cancel</Btn>
        <Btn variant="ghost" size="sm">Save Draft</Btn>
      </PageHeader>
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
        <div className="flex items-center">
          {STEPS.map((s,i)=>(
            <div key={i} className="flex items-center flex-1 last:flex-none">
              <button onClick={()=>i<step&&setStep(i)} className="flex flex-col items-center gap-1.5 flex-shrink-0">
                <div className={cn("w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors",i<step?"bg-green-500 text-white":i===step?"bg-[#5C5CFF] text-white":"bg-gray-100 text-gray-400")}>{i<step?<Check size={13}/>:i+1}</div>
                <span className={cn("text-[10px] whitespace-nowrap",i===step?"text-[#5C5CFF] font-medium":i<step?"text-green-600":"text-gray-400")}>{s}</span>
              </button>
              {i<STEPS.length-1&&<div className={cn("h-0.5 flex-1 mx-2 mb-4",i<step?"bg-green-300":"bg-gray-200")}/>}
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-2xl mx-auto">
          {step===0&&<div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4"><h3 className="text-sm font-semibold text-gray-800 mb-2">Personal Information</h3><div className="grid grid-cols-2 gap-4"><InputField label="First Name" placeholder="John" required/><InputField label="Last Name" placeholder="Smith" required/><div className="col-span-2"><InputField label="Work Email" type="email" placeholder="john.smith@company.com" required/></div><InputField label="Date of Birth" type="date"/><SelectField label="Gender" options={["Select…","Male","Female","Non-binary","Prefer not to say"]}/><InputField label="National ID" placeholder="ABC-123456"/><SelectField label="Nationality" options={["United States","United Kingdom","Canada","India","Other"]}/></div></div>}
          {step===1&&<div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4"><h3 className="text-sm font-semibold text-gray-800 mb-2">Contact Details</h3><div className="grid grid-cols-2 gap-4"><InputField label="Phone Number" type="tel" placeholder="+1 (555) 000-0000" required/><InputField label="Personal Email" type="email" placeholder="john@gmail.com"/><div className="col-span-2"><InputField label="Address" placeholder="123 Main Street, Apt 4B"/></div><InputField label="City" placeholder="New York"/><InputField label="Zip Code" placeholder="10001"/><InputField label="Emergency Contact" placeholder="Jane Smith" required/><InputField label="Emergency Phone" type="tel" placeholder="+1 (555) 000-0001" required/></div></div>}
          {step===2&&<div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4"><h3 className="text-sm font-semibold text-gray-800 mb-2">Employment Details</h3><div className="grid grid-cols-2 gap-4"><InputField label="Employee ID" placeholder="Auto-generated: E016"/><InputField label="Join Date" type="date" required/><SelectField label="Employment Type" options={["Full-Time","Part-Time","Contract","Intern"]} required/><SelectField label="Department" options={["Engineering","Product","Design","Marketing","Sales","Finance","HR","Legal","Operations"]} required/><div className="col-span-2"><InputField label="Designation / Job Title" placeholder="Software Engineer" required/></div><SelectField label="Branch" options={["New York HQ","San Francisco","Chicago","Austin"]} required/><SelectField label="Work Mode" options={["Office","WFH","Hybrid"]}/></div></div>}
          {step===3&&<div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4"><h3 className="text-sm font-semibold text-gray-800 mb-2">Assign Team</h3><div className="grid grid-cols-2 gap-4"><div className="col-span-2"><SelectField label="Reporting Manager" options={["David Chen – VP Engineering","Priya Sharma – Lead Designer","Marcus Johnson – Product Manager","Carlos Rivera – Marketing Director"]} required/></div><SelectField label="Business Unit" options={["North America Operations","EMEA Operations","APAC Operations","Global Product & Engineering"]}/><SelectField label="Team" options={["Frontend","Backend","Mobile","DevOps","QA","Design System"]}/></div></div>}
          {step===4&&<div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4"><h3 className="text-sm font-semibold text-gray-800 mb-2">Shift & Leave</h3><div className="grid grid-cols-2 gap-4"><SelectField label="Shift Template" options={["General (9am–6pm)","Morning (6am–3pm)","Evening (2pm–11pm)","Night (10pm–7am)"]} required/><SelectField label="Leave Policy" options={["Standard Policy","Executive Policy","Contractor Policy"]} required/><SelectField label="Weekly Off" options={["Saturday & Sunday","Sunday only","Custom"]}/><SelectField label="Holiday Calendar" options={["US Federal 2024","New York State 2024","California State 2024"]}/></div></div>}
          {step===5&&(
            <div className="space-y-5">
              {/* Lifecycle notice */}
              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex items-start gap-3">
                <Send size={15} className="text-indigo-600 flex-shrink-0 mt-0.5"/>
                <div><p className="text-sm font-semibold text-indigo-900">Next: Send invitation email</p><p className="text-xs text-indigo-700 mt-0.5">Saving creates a "Ready to Invite" profile. The employee won't be able to log in until they accept the invitation and create a password.</p></div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-sm font-semibold text-gray-800 mb-4">Review Profile</h3>
                <div className="space-y-4">
                  {[{label:"Personal",items:[["Name","John Smith"],["Work Email","john.smith@acmecorp.com"],["Join Date","Jul 15, 2024"]]},{label:"Employment",items:[["Department","Engineering"],["Designation","Software Engineer"],["Branch","New York HQ"]]},{label:"Team",items:[["Manager","David Chen – VP Engineering"],["Shift","General (9am–6pm)"],["Leave Policy","Standard Policy"]]}].map(s=>(
                    <div key={s.label} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{s.label}</h4>
                        <button onClick={()=>setStep(["Personal","Employment","Team"].indexOf(s.label)*2)} className="text-xs text-[#5C5CFF] hover:underline">Edit</button>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {s.items.map(([k,v])=><div key={k}><div className="text-xs text-gray-400">{k}</div><div className="text-sm font-medium text-gray-800">{v}</div></div>)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="border-t border-gray-200 bg-white px-8 py-4 flex justify-between">
        <Btn variant="outline" onClick={()=>step>0?setStep(step-1):navigate("organization")}><ChevronLeft size={16}/>Back</Btn>
        {step<STEPS.length-1
          ? <Btn onClick={()=>setStep(step+1)}>Continue<ChevronRight size={16}/></Btn>
          : <Btn onClick={()=>setPhase("invite-review")}><Send size={15}/>Save & Send Invitation</Btn>
        }
      </div>
    </div>
  );
}

// ── Documents Page ─────────────────────────────────────────────────────────────
function DocumentsPage({ navigate }: { navigate:(p:AppPage)=>void }) {
  const [docCat, setDocCat] = useState("All");
  const [showUpload, setShowUpload] = useState(false);
  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Documents" subtitle="Company policies, templates, and employee documents" breadcrumbs={[{label:"Home",onClick:()=>navigate("my-space")},{label:"Documents"}]}>
        <Btn variant="outline" size="sm" onClick={()=>setShowUpload(true)}><Upload size={13}/>Upload</Btn>
        <Btn size="sm" onClick={()=>setShowUpload(true)}><Plus size={13}/>New Document</Btn>
      </PageHeader>
      <div className="flex-1 overflow-auto p-6">
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div className="flex gap-2">{["All","Policy","Template","Legal"].map(cat=><button key={cat} onClick={()=>setDocCat(cat)} className={cn("px-3 py-1.5 text-xs font-medium rounded-lg transition-colors",cat===docCat?"bg-[#5C5CFF] text-white":"text-gray-600 hover:bg-gray-100")}>{cat}</button>)}</div>
            <div className="relative"><Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"/><input className="pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5C5CFF]" placeholder="Search…"/></div>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-gray-50"><tr>{["Document","Category","Size","Updated By","Updated","Status","Actions"].map(h=><th key={h} className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-gray-100">
              {DOCUMENTS_LIST.filter(d=>docCat==="All"||d.category===docCat).map(d=>(
                <tr key={d.id} className="hover:bg-gray-50 group">
                  <td className="px-5 py-3"><div className="flex items-center gap-2.5"><div className="w-8 h-8 rounded bg-red-50 flex items-center justify-center"><FileText size={14} className="text-red-500"/></div><span className="font-medium text-gray-800">{d.name}</span></div></td>
                  <td className="px-5 py-3"><span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">{d.category}</span></td>
                  <td className="px-5 py-3 text-gray-500 text-xs">{d.size}</td>
                  <td className="px-5 py-3 text-gray-600">{d.updatedBy}</td>
                  <td className="px-5 py-3 text-gray-500 text-xs">{fmtDate(d.updated)}</td>
                  <td className="px-5 py-3"><StatusBadge status={d.status}/></td>
                  <td className="px-5 py-3"><div className="flex gap-1.5 opacity-0 group-hover:opacity-100"><button className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-[#5C5CFF]"><Eye size={13}/></button><button className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600"><Download size={13}/></button><button className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-red-500"><Trash2 size={13}/></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showUpload&&(
        <Modal title="Upload Document" onClose={()=>setShowUpload(false)}>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-[#5C5CFF] transition-colors cursor-pointer">
              <Upload size={28} className="mx-auto text-gray-400 mb-3"/>
              <p className="text-sm font-medium text-gray-700 mb-1">Drag & drop files here</p>
              <p className="text-xs text-gray-400">PDF, DOCX, XLSX up to 25 MB</p>
              <Btn variant="outline" size="sm" className="mt-4">Browse Files</Btn>
            </div>
            <SelectField label="Category" options={["Policy","Template","Legal","Other"]}/>
            <InputField label="Document Name" placeholder="e.g. Employee Handbook 2025"/>
            <SelectField label="Access Level" options={["All Employees","HR Only","Admins Only"]}/>
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <Btn variant="outline" onClick={()=>setShowUpload(false)}>Cancel</Btn>
              <Btn onClick={()=>setShowUpload(false)}><Upload size={13}/>Upload</Btn>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── Settings Page (trimmed) ────────────────────────────────────────────────────
function SettingsPage({ navigate }: { navigate:(p:AppPage)=>void }) {
  const [section, setSection] = useState("General");
  const [settingsToast, setSettingsToast] = useState(false);
  const showSettingsToast = () => { setSettingsToast(true); setTimeout(()=>setSettingsToast(false),2000); };
  const [privacyToggles, setPrivacyToggles] = useState([true,true,false,true]);
  const togglePrivacy = (i:number) => setPrivacyToggles(p=>p.map((v,j)=>j===i?!v:v));
  const [notifChannels, setNotifChannels] = useState([true,true,false,false]);
  const toggleNotifChannel = (i:number) => setNotifChannels(p=>p.map((v,j)=>j===i?!v:v));
  const [notifTopics, setNotifTopics] = useState([true,true,true,false,true]);
  const toggleNotifTopic = (i:number) => setNotifTopics(p=>p.map((v,j)=>j===i?!v:v));
  const [showSecurityPwd, setShowSecurityPwd] = useState(false);

  // If Manage Account is active, render it full-screen
  if (section==="Manage Account") {
    return <ManageAccountPage onBack={()=>setSection("General")}/>;
  }

  const NAV = [
    {id:"General",icon:Settings,label:"General"},
    {id:"Appearance",icon:Eye,label:"Appearance"},
    {id:"Notifications",icon:Bell,label:"Notifications"},
    {id:"Security",icon:Shield,label:"Security"},
    {id:"Integrations",icon:Globe,label:"Integrations"},
    {id:"Manage Account",icon:Users,label:"Manage Account",admin:true},
    {id:"About",icon:Info,label:"About"},
  ];

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Settings" breadcrumbs={[{label:"Home",onClick:()=>navigate("my-space")},{label:"Settings"}]}/>
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-52 flex-shrink-0 border-r border-gray-200 bg-gray-50 overflow-auto py-3">
          {NAV.map(n=>(
            <button key={n.id} onClick={()=>setSection(n.id)} className={cn("w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium transition-colors",section===n.id?"bg-white text-[#5C5CFF] border-r-2 border-[#5C5CFF]":"text-gray-600 hover:bg-white hover:text-gray-800",n.admin&&"mt-4 first-of-type:mt-0")}>
              <n.icon size={14} className={section===n.id?"text-[#5C5CFF]":"text-gray-400"}/>
              {n.label}
              {n.admin&&<span className="ml-auto text-[9px] bg-amber-100 text-amber-600 px-1.5 py-0.5 rounded font-semibold">Admin</span>}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">

          {section==="General"&&(
            <div className="max-w-lg space-y-5">
              <h2 className="text-base font-semibold text-gray-900">General Settings</h2>
              <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
                <h4 className="text-sm font-semibold text-gray-800">Language & Region</h4>
                <SelectField label="Language" options={["English (US)","English (UK)","French","German","Spanish","Arabic","Hindi"]}/>
                <div className="grid grid-cols-2 gap-4">
                  <SelectField label="Date Format" options={["MM/DD/YYYY","DD/MM/YYYY","YYYY-MM-DD"]}/>
                  <SelectField label="Time Format" options={["12-hour (AM/PM)","24-hour"]}/>
                </div>
                <SelectField label="Timezone" options={["(UTC-8) Pacific Time","(UTC-5) Eastern Time","(UTC+0) UTC","(UTC+5:30) IST"]}/>
                <div className="pt-1"><Btn size="sm" onClick={showSettingsToast}>Save Changes</Btn></div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
                <h4 className="text-sm font-semibold text-gray-800">Privacy</h4>
                {["Show my profile to team members","Show my attendance to my manager","Allow location tracking for WFH","Share analytics with organization"].map((label,i)=>(
                  <div key={label} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <span className="text-sm text-gray-700">{label}</span>
                    <button onClick={()=>togglePrivacy(i)} className={cn("w-10 h-5 rounded-full transition-colors flex-shrink-0 relative",privacyToggles[i]?"bg-[#5C5CFF]":"bg-gray-300")}><div className={cn("absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform",privacyToggles[i]?"left-5":"left-0.5")}/></button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {section==="Appearance"&&(
            <div className="max-w-sm space-y-5">
              <h2 className="text-base font-semibold text-gray-900">Appearance</h2>
              <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
                <h4 className="text-sm font-semibold text-gray-800">Theme</h4>
                <div className="grid grid-cols-3 gap-3">
                  {["Light","Dark","System"].map(t=>(
                    <button key={t} className={cn("py-3 rounded-lg border text-xs font-medium transition-colors",t==="Light"?"border-[#5C5CFF] bg-[#EEF2FF] text-[#5C5CFF]":"border-gray-200 text-gray-600 hover:border-gray-300")}>{t}</button>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
                <h4 className="text-sm font-semibold text-gray-800">Accent Color</h4>
                <div className="flex gap-3">{["#5C5CFF","#22C55E","#F59E0B","#EF4444","#8B5CF6","#06B6D4"].map(c=><button key={c} className={cn("w-8 h-8 rounded-full border-2 transition-all",c==="#5C5CFF"?"border-gray-900 scale-110":"border-transparent hover:scale-105")} style={{backgroundColor:c}}/>)}</div>
              </div>
            </div>
          )}

          {section==="Notifications"&&(
            <div className="max-w-lg space-y-5">
              <h2 className="text-base font-semibold text-gray-900">Notifications</h2>
              <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
                <h4 className="text-sm font-semibold text-gray-800 mb-1">Channels</h4>
                {["Email Notifications","In-App Notifications","Push Notifications","SMS Alerts"].map((label,i)=>(
                  <div key={label} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <span className="text-sm text-gray-700">{label}</span>
                    <button onClick={()=>toggleNotifChannel(i)} className={cn("w-10 h-5 rounded-full transition-colors flex-shrink-0 relative",notifChannels[i]?"bg-[#5C5CFF]":"bg-gray-300")}><div className={cn("absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform",notifChannels[i]?"left-5":"left-0.5")}/></button>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
                <h4 className="text-sm font-semibold text-gray-800 mb-1">Notify me about</h4>
                {["Leave requests awaiting my approval","Attendance exceptions","New announcements","System updates","Team activities"].map((label,i)=>(
                  <div key={label} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <span className="text-sm text-gray-700">{label}</span>
                    <button onClick={()=>toggleNotifTopic(i)} className={cn("w-10 h-5 rounded-full transition-colors flex-shrink-0 relative",notifTopics[i]?"bg-[#5C5CFF]":"bg-gray-300")}><div className={cn("absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform",notifTopics[i]?"left-5":"left-0.5")}/></button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {section==="Security"&&(
            <div className="max-w-lg space-y-5">
              <h2 className="text-base font-semibold text-gray-900">Security</h2>
              <div className="space-y-3">
                {[{label:"Two-Factor Authentication",desc:"Add an extra layer of security to your account",state:"Enabled",action:"Manage",onClick:()=>navigate("profile")},{label:"Active Sessions",desc:"2 devices currently signed in",state:"Active",action:"View All",onClick:()=>navigate("profile")},{label:"Login History",desc:"See recent sign-in activity and locations",state:"",action:"View",onClick:()=>navigate("profile")}].map(s=>(
                  <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between">
                    <div><h4 className="text-sm font-medium text-gray-800">{s.label}</h4><p className="text-xs text-gray-500 mt-0.5">{s.desc}</p></div>
                    <div className="flex items-center gap-2">{s.state&&<span className="text-xs font-medium text-green-600">{s.state}</span>}<Btn variant="outline" size="sm" onClick={s.onClick}>{s.action}</Btn></div>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
                <h4 className="text-sm font-semibold text-gray-800">Change Password</h4>
                <InputField label="Current Password" type="password" placeholder="••••••••"/>
                <InputField label="New Password" type="password" placeholder="••••••••" required/>
                <InputField label="Confirm New Password" type="password" placeholder="••••••••" required/>
                <Btn size="sm" onClick={showSettingsToast}>Update Password</Btn>
              </div>
            </div>
          )}

          {section==="Integrations"&&(
            <div className="max-w-2xl space-y-5">
              <h2 className="text-base font-semibold text-gray-900">Integrations</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {name:"Google Workspace",desc:"Sync users and calendar events",connected:true,icon:"G"},
                  {name:"Slack",desc:"Send notifications to Slack channels",connected:false,icon:"S"},
                  {name:"Microsoft 365",desc:"Sync with Office 365 and Teams",connected:false,icon:"M"},
                  {name:"BambooHR",desc:"Import employee data from BambooHR",connected:false,icon:"B"},
                  {name:"Zapier",desc:"Automate workflows with 5000+ apps",connected:false,icon:"Z"},
                  {name:"Payroll System",desc:"Sync attendance data for payroll",connected:true,icon:"P"},
                ].map(i=>(
                  <div key={i.name} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-600 flex-shrink-0">{i.icon}</div>
                    <div className="flex-1"><p className="text-sm font-medium text-gray-800">{i.name}</p><p className="text-xs text-gray-400">{i.desc}</p></div>
                    <Btn size="sm" variant={i.connected?"outline":"primary"}>{i.connected?"Manage":"Connect"}</Btn>
                  </div>
                ))}
              </div>
            </div>
          )}

          {section==="About"&&(
            <div className="max-w-sm space-y-5">
              <h2 className="text-base font-semibold text-gray-900">About</h2>
              <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
                {[["Product","Attendance HRMS"],["Version","3.2.1"],["Edition","Enterprise"],["License","Acme Corporation"],["Users","847 / 1000"],["Support","Priority Support"],["Expires","Dec 31, 2025"]].map(([k,v])=>(
                  <div key={k as string} className="flex justify-between text-sm py-1.5 border-b border-gray-100 last:border-0"><span className="text-gray-500">{k}</span><span className="font-medium text-gray-800">{v}</span></div>
                ))}
              </div>
              <div className="flex gap-3">
                <Btn variant="outline" size="sm">Documentation</Btn>
                <Btn variant="outline" size="sm">Release Notes</Btn>
              </div>
            </div>
          )}

        </div>
      </div>
      {settingsToast&&(
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-gray-900 text-white text-sm px-4 py-2.5 rounded-xl shadow-lg">
          <CheckCircle size={15} className="text-green-400 flex-shrink-0"/>Settings saved successfully
        </div>
      )}
    </div>
  );
}

// ── View Profile Page ──────────────────────────────────────────────────────────
function ViewProfilePage({ navigate }: { navigate:(p:AppPage)=>void }) {
  const [tab, setTab] = useState("Personal");
  const [editMode, setEditMode] = useState(false);
  const [showChangePwd, setShowChangePwd] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const toast = () => { setShowToast(true); setTimeout(()=>setShowToast(false),2500); };

  const SESSIONS = [
    {device:"Chrome on macOS",location:"New York, USA",time:"Now · Current session",current:true},
    {device:"Safari on iPhone 15",location:"New York, USA",time:"2 hours ago"},
    {device:"Chrome on Windows",location:"Chicago, USA",time:"Jun 28, 2024"},
  ];
  const CONNECTED = [
    {name:"Google Workspace",icon:"G",connected:true,last:"Jun 25"},
    {name:"Microsoft 365",icon:"M",connected:false,last:"—"},
    {name:"Slack",icon:"S",connected:true,last:"Jun 28"},
  ];

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="My Profile" breadcrumbs={[{label:"Home",onClick:()=>navigate("my-space")},{label:"Profile"}]}>
        {!editMode
          ? <Btn variant="outline" onClick={()=>setEditMode(true)}><Edit size={13}/>Edit Profile</Btn>
          : <div className="flex gap-2"><Btn variant="outline" onClick={()=>setEditMode(false)}>Cancel</Btn><Btn onClick={()=>{setEditMode(false);toast();}}>Save Changes</Btn></div>
        }
      </PageHeader>
      <div className="flex-1 overflow-auto p-6 max-w-4xl mx-auto w-full">
        {/* Profile Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 flex items-center gap-6">
          <div className="relative">
            <Avt initials="AA" color="#5C5CFF" size="xl"/>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#5C5CFF] flex items-center justify-center border-2 border-white hover:bg-[#4A4AE0] transition-colors" onClick={()=>toast()}><Upload size={11} className="text-white"/></button>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900">Alex Admin</h2>
            <p className="text-sm text-gray-500">Administrator · Acme Corporation</p>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-xs text-gray-500 flex items-center gap-1"><Mail size={12}/>alex.admin@acmecorp.com</span>
              <span className="text-xs text-gray-500 flex items-center gap-1"><Phone size={12}/>+1 (555) 000-0001</span>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-xs text-gray-400 mb-1">Member since</div>
            <div className="text-sm font-medium text-gray-800">Jan 15, 2024</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200 px-4">
            <div className="flex gap-0">
              {["Personal","Employment","Security","Devices","Sessions","Preferences","Notifications"].map(t=>(
                <button key={t} onClick={()=>setTab(t)} className={cn("px-4 py-3 text-xs font-medium border-b-2 whitespace-nowrap transition-colors",tab===t?"border-[#5C5CFF] text-[#5C5CFF]":"border-transparent text-gray-500 hover:text-gray-700")}>{t}</button>
              ))}
            </div>
          </div>
          <div className="p-5">
            {tab==="Personal"&&(
              <div className="grid grid-cols-2 gap-4">
                {editMode
                  ? <><InputField label="First Name" defaultValue="Alex"/><InputField label="Last Name" defaultValue="Admin"/><InputField label="Work Email" type="email" defaultValue="alex.admin@acmecorp.com"/><InputField label="Phone" type="tel" defaultValue="+1 (555) 000-0001"/><InputField label="Date of Birth" type="date"/><SelectField label="Gender"><option>Prefer not to say</option><option>Male</option><option>Female</option><option>Non-binary</option></SelectField><div className="col-span-2"><InputField label="Address" placeholder="Street, City, State, ZIP"/></div></>
                  : ([["First Name","Alex"],["Last Name","Admin"],["Work Email","alex.admin@acmecorp.com"],["Phone","+1 (555) 000-0001"],["Date of Birth","—"],["Gender","Prefer not to say"],["Address","350 Fifth Avenue, New York, NY"]] as [string,string][]).map(([k,v])=>(
                      <div key={k}><p className="text-xs text-gray-400 mb-0.5">{k}</p><p className="text-sm font-medium text-gray-800">{v}</p></div>
                    ))
                }
              </div>
            )}
            {tab==="Employment"&&(
              <div className="grid grid-cols-2 gap-4">
                {([["Employee ID","ADM-001"],["Join Date","Jan 15, 2024"],["Department","Administration"],["Designation","System Administrator"],["Branch","New York HQ"],["Employment Type","Full-Time"],["Reporting Manager","CEO"],["Shift","General (9AM–6PM)"]] as [string,string][]).map(([k,v])=>(
                  <div key={k}><p className="text-xs text-gray-400 mb-0.5">{k}</p><p className="text-sm font-medium text-gray-800">{v}</p></div>
                ))}
              </div>
            )}
            {tab==="Security"&&(
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div><p className="text-sm font-semibold text-gray-800">Password</p><p className="text-xs text-gray-400">Last changed 30 days ago</p></div>
                  <Btn variant="outline" size="sm" onClick={()=>setShowChangePwd(true)}><Key size={12}/>Change Password</Btn>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div><p className="text-sm font-semibold text-gray-800">Two-Factor Authentication</p><p className="text-xs text-gray-400">Enabled via Authenticator App</p></div>
                  <div className="flex items-center gap-2"><span className="text-xs text-green-600 font-medium">Active</span><div className="w-9 h-5 rounded-full bg-green-400 flex items-center px-0.5 cursor-pointer"><div className="w-4 h-4 rounded-full bg-white ml-auto shadow-sm"/></div></div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div><p className="text-sm font-semibold text-gray-800">Login Notifications</p><p className="text-xs text-gray-400">Email alert on new sign-in</p></div>
                  <div className="w-9 h-5 rounded-full bg-[#5C5CFF] flex items-center px-0.5 cursor-pointer"><div className="w-4 h-4 rounded-full bg-white ml-auto shadow-sm"/></div>
                </div>
              </div>
            )}
            {tab==="Devices"&&(
              <div className="space-y-3">
                {CONNECTED.map(d=>(
                  <div key={d.name} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center font-bold text-gray-600 text-sm">{d.icon}</div>
                    <div className="flex-1"><p className="text-sm font-semibold text-gray-800">{d.name}</p><p className="text-xs text-gray-400">Last sync: {d.last}</p></div>
                    {d.connected
                      ? <Btn size="sm" variant="outline" onClick={()=>toast()}>Disconnect</Btn>
                      : <Btn size="sm" onClick={()=>toast()}>Connect</Btn>
                    }
                  </div>
                ))}
              </div>
            )}
            {tab==="Sessions"&&(
              <div className="space-y-3">
                {SESSIONS.map((s,i)=>(
                  <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center"><Monitor size={15} className="text-gray-500"/></div>
                    <div className="flex-1"><p className="text-sm font-semibold text-gray-800">{s.device}</p><p className="text-xs text-gray-400">{s.location} · {s.time}</p></div>
                    {s.current
                      ? <span className="text-xs text-green-600 font-medium px-2 py-0.5 bg-green-50 rounded-full">Current</span>
                      : <button onClick={()=>toast()} className="text-xs text-red-500 hover:text-red-700 font-medium">Revoke</button>
                    }
                  </div>
                ))}
                <button onClick={()=>toast()} className="text-xs text-red-500 hover:text-red-700 font-medium mt-1">Revoke all other sessions</button>
              </div>
            )}
            {tab==="Preferences"&&(
              <div className="space-y-4">
                {([["Theme","System Default",["Light","Dark","System Default"]],["Language","English (US)",["English (US)","English (UK)","Spanish","French"]],["Date Format","MM/DD/YYYY",["MM/DD/YYYY","DD/MM/YYYY","YYYY-MM-DD"]],["Time Format","12-hour",["12-hour","24-hour"]]] as [string,string,string[]][]).map(([label,def,opts])=>(
                  <div key={label} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <p className="text-sm font-medium text-gray-800">{label}</p>
                    <select defaultValue={def} className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-[#5C5CFF]">{opts.map(o=><option key={o}>{o}</option>)}</select>
                  </div>
                ))}
              </div>
            )}
            {tab==="Notifications"&&(
              <div className="space-y-3">
                {([["Leave Requests","Email + In-app",true],["Attendance Alerts","In-app only",true],["Task Assignments","Email + In-app",true],["System Updates","Email",false],["Announcements","In-app only",true],["Approval Decisions","Email + In-app",true]] as [string,string,boolean][]).map(([label,method,enabled])=>(
                  <div key={label} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <div><p className="text-sm font-medium text-gray-800">{label}</p><p className="text-xs text-gray-400">{method}</p></div>
                    <div className={cn("w-9 h-5 rounded-full flex items-center px-0.5 cursor-pointer transition-colors",enabled?"bg-[#5C5CFF]":"bg-gray-200")}>
                      <div className={cn("w-4 h-4 rounded-full bg-white shadow-sm transition-transform",enabled&&"translate-x-4")}/>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {showChangePwd&&(
        <Modal title="Change Password" onClose={()=>setShowChangePwd(false)} width="max-w-sm">
          <div className="space-y-3">
            <InputField label="Current Password" type="password"/>
            <InputField label="New Password" type="password"/>
            <InputField label="Confirm New Password" type="password"/>
            <div className="flex justify-end gap-2 pt-2 border-t border-gray-200">
              <Btn variant="outline" onClick={()=>setShowChangePwd(false)}>Cancel</Btn>
              <Btn onClick={()=>{setShowChangePwd(false);toast();}}>Update Password</Btn>
            </div>
          </div>
        </Modal>
      )}

      {showToast&&<div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-gray-900 text-white px-4 py-3 rounded-xl shadow-lg text-sm font-medium"><CheckCircle size={15} className="text-green-400"/>Changes saved successfully.</div>}
    </div>
  );
}

// ── Notification Center Page ───────────────────────────────────────────────────
function NotificationCenterPage({ navigate }: { navigate:(p:AppPage)=>void }) {
  const ALL_NOTIFS = [
    {id:"n1",type:"leave",title:"Leave Request – Sarah Mitchell",msg:"Applied for 5 days Annual Leave (Jul 8–12)",time:"10 min ago",read:false,page:"leave" as AppPage},
    {id:"n2",type:"attendance",title:"Missing Punch – 14 Employees",msg:"14 employees have missing check-out today",time:"1 hr ago",read:false,page:"attendance" as AppPage},
    {id:"n3",type:"employee",title:"New Joiner – Yuki Tanaka",msg:"Yuki Tanaka joins Engineering team today",time:"3 hr ago",read:true,page:"organization" as AppPage},
    {id:"n4",type:"leave",title:"Leave Approved – Marcus Johnson",msg:"Sick leave request approved for 2 days",time:"5 hr ago",read:true,page:"leave" as AppPage},
    {id:"n5",type:"system",title:"Attendance Sync Complete",msg:"Biometric sync completed — 834 records updated",time:"1 day ago",read:true,page:"attendance" as AppPage},
    {id:"n6",type:"approval",title:"Approval Required – Shift Change",msg:"David Chen requested shift modification for Engineering",time:"2 days ago",read:false,page:"my-space" as AppPage},
    {id:"n7",type:"tasks",title:"Task Overdue – Q2 Report",msg:"Q2 Performance Report submission is 2 days overdue",time:"2 days ago",read:false,page:"tasks" as AppPage},
    {id:"n8",type:"announcement",title:"New Announcement – Policy Update",msg:"Leave policy FY2025 has been published",time:"3 days ago",read:true,page:"my-space" as AppPage},
    {id:"n9",type:"attendance",title:"Late Arrivals – 8 Employees",msg:"8 employees arrived more than 30 minutes late today",time:"3 days ago",read:true,page:"attendance" as AppPage},
    {id:"n10",type:"system",title:"System Maintenance Scheduled",msg:"Platform maintenance Jul 7, 11 PM – 3 AM EST",time:"4 days ago",read:true,page:"support" as AppPage},
  ];

  const [notifs, setNotifs] = useState(ALL_NOTIFS);
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [archived, setArchived] = useState<string[]>([]);

  const TABS = ["All","Unread","Approvals","Attendance","Leave","Tasks","Announcements","System"];
  const TYPE_MAP: Record<string,{icon:any;color:string}> = {
    leave:{icon:CalendarDays,color:"#F59E0B"},
    attendance:{icon:Clock,color:"#5C5CFF"},
    employee:{icon:UserPlus,color:"#3B82F6"},
    system:{icon:CheckCircle,color:"#6B7280"},
    approval:{icon:CheckCircle,color:"#8B5CF6"},
    tasks:{icon:ClipboardList,color:"#22C55E"},
    announcement:{icon:Megaphone,color:"#EC4899"},
  };

  const filtered = notifs
    .filter(n=>!archived.includes(n.id))
    .filter(n=>activeTab==="All"?true:activeTab==="Unread"?!n.read:n.type===activeTab.toLowerCase()||n.type===activeTab.slice(0,-1).toLowerCase())
    .filter(n=>!search||(n.title+n.msg).toLowerCase().includes(search.toLowerCase()));

  const markRead = (id:string) => setNotifs(ns=>ns.map(n=>n.id===id?{...n,read:true}:n));
  const markAllRead = () => setNotifs(ns=>ns.map(n=>({...n,read:true})));
  const archive = (id:string) => setArchived(a=>[...a,id]);
  const del = (id:string) => setNotifs(ns=>ns.filter(n=>n.id!==id));
  const unreadCount = notifs.filter(n=>!n.read&&!archived.includes(n.id)).length;

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Notification Center" breadcrumbs={[{label:"Home",onClick:()=>navigate("my-space")},{label:"Notifications"}]}>
        <div className="flex gap-2">
          <Btn variant="outline" size="sm" onClick={markAllRead}><CheckCircle size={12}/>Mark All Read</Btn>
          <Btn variant="outline" size="sm"><Download size={12}/>Export</Btn>
        </div>
      </PageHeader>
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-3 flex-shrink-0">
          <div className="relative flex-1 max-w-xs"><Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"/><input type="text" placeholder="Search notifications…" value={search} onChange={e=>setSearch(e.target.value)} className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C5CFF]"/></div>
          {unreadCount>0&&<span className="text-xs text-[#5C5CFF] font-medium">{unreadCount} unread</span>}
        </div>
        {/* Tab bar */}
        <div className="bg-white border-b border-gray-200 px-6 flex gap-0 flex-shrink-0 overflow-x-auto">
          {TABS.map(t=>{
            const cnt = t==="Unread" ? unreadCount : t==="All" ? notifs.filter(n=>!archived.includes(n.id)).length : notifs.filter(n=>!archived.includes(n.id)&&(n.type===t.toLowerCase()||n.type===t.slice(0,-1).toLowerCase())).length;
            return (
              <button key={t} onClick={()=>setActiveTab(t)} className={cn("px-4 py-3 text-xs font-medium border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5",activeTab===t?"border-[#5C5CFF] text-[#5C5CFF]":"border-transparent text-gray-500 hover:text-gray-700")}>
                {t}{cnt>0&&<span className={cn("text-[9px] font-bold px-1.5 py-0.5 rounded-full",activeTab===t?"bg-[#5C5CFF] text-white":"bg-gray-100 text-gray-500")}>{cnt}</span>}
              </button>
            );
          })}
        </div>
        {/* List */}
        <div className="flex-1 overflow-auto">
          {filtered.length===0&&(
            <div className="flex flex-col items-center justify-center h-48 text-gray-400">
              <Bell size={32} className="mb-3 opacity-30"/>
              <p className="text-sm font-medium">No notifications</p>
              <p className="text-xs mt-0.5">You're all caught up!</p>
            </div>
          )}
          {filtered.map(n=>{
            const {icon:Icon,color}=TYPE_MAP[n.type]||TYPE_MAP.system;
            return (
              <div key={n.id} className={cn("flex items-start gap-4 px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors group",!n.read&&"bg-[#EEF2FF]/30")}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{backgroundColor:color+"18"}}><Icon size={15} style={{color}}/></div>
                <button className="flex-1 text-left min-w-0" onClick={()=>{markRead(n.id);navigate(n.page);}}>
                  <div className="flex items-center gap-2"><p className={cn("text-sm font-medium",!n.read?"text-gray-900":"text-gray-700")}>{n.title}</p>{!n.read&&<div className="w-2 h-2 rounded-full bg-[#5C5CFF] flex-shrink-0"/>}</div>
                  <p className="text-xs text-gray-500 mt-0.5 truncate">{n.msg}</p>
                  <p className="text-[10px] text-gray-400 mt-1">{n.time}</p>
                </button>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                  {!n.read&&<button onClick={()=>markRead(n.id)} title="Mark as read" className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-400 hover:text-gray-600"><CheckCircle size={13}/></button>}
                  <button onClick={()=>archive(n.id)} title="Archive" className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-400 hover:text-gray-600"><Archive size={13}/></button>
                  <button onClick={()=>del(n.id)} title="Delete" className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500"><Trash2 size={13}/></button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Support Page ───────────────────────────────────────────────────────────────
function SupportPage({ navigate }: { navigate:(p:AppPage)=>void }) {
  const [modal, setModal] = useState<string|null>(null);
  const [tab, setTab] = useState("Home");
  const [chatMsg, setChatMsg] = useState("");
  const [chatHistory, setChatHistory] = useState<{role:string;text:string}[]>([{role:"agent",text:"Hi! I'm the support assistant. How can I help you today?"}]);
  const [ticketForm, setTicketForm] = useState({subject:"",priority:"Medium",category:"Technical",desc:""});
  const [submitted, setSubmitted] = useState(false);

  const sendChat = () => {
    if(!chatMsg.trim()) return;
    const msg = chatMsg;
    setChatMsg("");
    setChatHistory(h=>[...h,{role:"user",text:msg}]);
    setTimeout(()=>setChatHistory(h=>[...h,{role:"agent",text:"Thanks for reaching out! Our team will look into this. In the meantime, you can check our documentation for quick answers."}]),800);
  };

  const ARTICLES = [
    {title:"Getting started with Attendance HRMS",category:"Onboarding",views:1243},
    {title:"How to configure shift policies",category:"Operations",views:892},
    {title:"Setting up approval workflows",category:"Approvals",views:754},
    {title:"Managing leave balances and types",category:"Leave",views:631},
    {title:"Bulk importing employees via CSV",category:"Employees",views:589},
    {title:"Geo-fencing setup for remote workers",category:"Attendance",views:412},
  ];

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Help & Support" breadcrumbs={[{label:"Home",onClick:()=>navigate("my-space")},{label:"Help & Support"}]}/>
      <div className="flex-1 overflow-auto">
        {/* Tab bar */}
        <div className="bg-white border-b border-gray-200 px-6">
          <div className="flex gap-0">
            {["Home","Documentation","Knowledge Base","Release Notes"].map(t=>(
              <button key={t} onClick={()=>setTab(t)} className={cn("px-4 py-3 text-sm font-medium border-b-2 transition-colors",tab===t?"border-[#5C5CFF] text-[#5C5CFF]":"border-transparent text-gray-500 hover:text-gray-700")}>{t}</button>
            ))}
          </div>
        </div>

        <div className="p-6 max-w-5xl mx-auto space-y-6">
          {tab==="Home"&&(
            <>
              {/* Hero */}
              <div className="bg-gradient-to-br from-[#5C5CFF] to-[#4A4AE0] rounded-2xl p-8 text-white text-center">
                <h2 className="text-2xl font-semibold mb-2">How can we help you?</h2>
                <p className="text-white/70 text-sm mb-5">Search our knowledge base or reach out directly</p>
                <div className="relative max-w-md mx-auto">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50"/>
                  <input type="text" placeholder="Search for answers…" className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"/>
                </div>
              </div>

              {/* Primary CTAs */}
              <div className="grid grid-cols-3 gap-4">
                {([
                  {icon:MessageCircle,label:"Live Chat",desc:"Chat with support in real time",color:"#5C5CFF",action:"chat"},
                  {icon:Send,label:"Raise a Ticket",desc:"Submit a support request",color:"#22C55E",action:"ticket"},
                  {icon:BookOpen,label:"Knowledge Base",desc:"Browse articles and guides",color:"#F59E0B",action:()=>setTab("Knowledge Base")},
                ] as any[]).map(s=>(
                  <button key={s.label} onClick={()=>typeof s.action==="string"?setModal(s.action):s.action()} className="bg-white rounded-xl border border-gray-200 p-5 text-left hover:border-[#5C5CFF]/40 hover:shadow-sm transition-all group">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{backgroundColor:s.color+"18"}}><s.icon size={18} style={{color:s.color}}/></div>
                    <h4 className="text-sm font-semibold text-gray-800 mb-1">{s.label}</h4>
                    <p className="text-xs text-gray-500">{s.desc}</p>
                  </button>
                ))}
              </div>

              {/* Secondary CTAs */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <h4 className="text-sm font-semibold text-gray-800 mb-3">More Options</h4>
                  <div className="space-y-1">
                    {([
                      {icon:AlertCircle,label:"Report a Bug",action:"bug"},
                      {icon:Star,label:"Feature Request",action:"feature"},
                      {icon:FileText,label:"Release Notes",action:()=>setTab("Release Notes")},
                      {icon:Info,label:"About Product",action:"about"},
                    ] as any[]).map(item=>(
                      <button key={item.label} onClick={()=>typeof item.action==="string"?setModal(item.action):item.action()} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 text-left transition-colors">
                        <item.icon size={14} className="text-gray-400 flex-shrink-0"/>
                        <span className="text-sm text-gray-700">{item.label}</span>
                        <ArrowRight size={13} className="ml-auto text-gray-300"/>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <h4 className="text-sm font-semibold text-gray-800 mb-3">Legal</h4>
                  <div className="space-y-1">
                    {([
                      {icon:Shield,label:"Privacy Policy",action:"privacy"},
                      {icon:FileText,label:"Terms of Service",action:"terms"},
                      {icon:Lock,label:"Security Policy",action:"security"},
                    ] as any[]).map(item=>(
                      <button key={item.label} onClick={()=>setModal(item.action)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 text-left transition-colors">
                        <item.icon size={14} className="text-gray-400 flex-shrink-0"/>
                        <span className="text-sm text-gray-700">{item.label}</span>
                        <ArrowRight size={13} className="ml-auto text-gray-300"/>
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-400">Attendance HRMS v2.4.1 · © 2024 Acme Corp</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {tab==="Documentation"&&(
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                {([
                  {icon:Users,label:"Employee Management",count:24},
                  {icon:Clock,label:"Attendance & Shifts",count:18},
                  {icon:CalendarDays,label:"Leave Management",count:15},
                  {icon:ClipboardList,label:"Tasks & Approvals",count:12},
                  {icon:Building2,label:"Organization Setup",count:20},
                  {icon:Settings,label:"System Configuration",count:31},
                ] as any[]).map(cat=>(
                  <button key={cat.label} className="bg-white rounded-xl border border-gray-200 p-4 text-left hover:border-[#5C5CFF]/40 hover:shadow-sm transition-all">
                    <div className="w-9 h-9 rounded-lg bg-[#EEF2FF] flex items-center justify-center mb-3"><cat.icon size={16} className="text-[#5C5CFF]"/></div>
                    <p className="text-sm font-semibold text-gray-800">{cat.label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{cat.count} articles</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {tab==="Knowledge Base"&&(
            <div className="space-y-3">
              {ARTICLES.map((a,i)=>(
                <button key={i} className="w-full bg-white rounded-xl border border-gray-200 p-4 text-left flex items-center gap-4 hover:border-[#5C5CFF]/40 hover:shadow-sm transition-all">
                  <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0"><BookOpen size={15} className="text-gray-400"/></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{a.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{a.category} · {a.views.toLocaleString()} views</p>
                  </div>
                  <ArrowRight size={14} className="text-gray-300 flex-shrink-0"/>
                </button>
              ))}
            </div>
          )}

          {tab==="Release Notes"&&(
            <div className="space-y-4">
              {([
                {version:"2.4.1",date:"Jun 28, 2024",notes:["Fixed attendance sync for biometric devices","Improved leave balance calculation","Bug fix: shift overlap detection"]},
                {version:"2.4.0",date:"Jun 10, 2024",notes:["New: Geo-fence attendance tracking","New: Bulk employee import via CSV","Improved: Dashboard analytics performance","New: Notification preferences"]},
                {version:"2.3.5",date:"May 22, 2024",notes:["Fixed approval email notifications","New: Department hierarchy view","Improved: Mobile responsiveness"]},
              ] as any[]).map(r=>(
                <div key={r.version} className="bg-white rounded-xl border border-gray-200 p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-sm font-bold text-[#5C5CFF]">v{r.version}</span>
                    <span className="text-xs text-gray-400">{r.date}</span>
                    {r.version==="2.4.1"&&<span className="text-[10px] bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium">Latest</span>}
                  </div>
                  <ul className="space-y-1.5">
                    {r.notes.map((n:string,i:number)=>(
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600"><div className="w-1.5 h-1.5 rounded-full bg-[#5C5CFF] mt-1.5 flex-shrink-0"/>{n}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Live Chat Modal ── */}
      {modal==="chat"&&(
        <div className="fixed inset-0 z-50 flex items-end justify-end p-6" onClick={()=>setModal(null)}>
          <div className="absolute inset-0 bg-black/20"/>
          <div className="relative bg-white rounded-2xl shadow-2xl w-80 flex flex-col" style={{height:"480px"}} onClick={e=>e.stopPropagation()}>
            <div className="flex items-center gap-3 px-4 py-3.5 bg-[#5C5CFF] rounded-t-2xl">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"><MessageCircle size={14} className="text-white"/></div>
              <div className="flex-1"><p className="text-sm font-semibold text-white">Live Support</p><p className="text-[10px] text-white/70 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-300 rounded-full inline-block"/>Online · avg reply &lt;2 min</p></div>
              <button onClick={()=>setModal(null)} className="text-white/60 hover:text-white"><X size={15}/></button>
            </div>
            <div className="flex-1 overflow-auto p-4 space-y-3">
              {chatHistory.map((m,i)=>(
                <div key={i} className={cn("flex",m.role==="user"?"justify-end":"justify-start")}>
                  <div className={cn("max-w-[80%] rounded-xl px-3.5 py-2.5 text-sm",m.role==="user"?"bg-[#5C5CFF] text-white":"bg-gray-100 text-gray-800")}>{m.text}</div>
                </div>
              ))}
            </div>
            <div className="px-3 py-3 border-t border-gray-100 flex gap-2">
              <input value={chatMsg} onChange={e=>setChatMsg(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendChat()} placeholder="Type a message…" className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C5CFF]"/>
              <button onClick={sendChat} className="w-9 h-9 bg-[#5C5CFF] rounded-lg flex items-center justify-center text-white"><Send size={13}/></button>
            </div>
          </div>
        </div>
      )}

      {/* ── Raise Ticket Modal ── */}
      {modal==="ticket"&&(
        <Modal title="Raise a Support Ticket" onClose={()=>{setModal(null);setSubmitted(false);}} width="max-w-lg">
          {submitted?(
            <div className="text-center py-8">
              <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4"><CheckCircle size={28} className="text-green-500"/></div>
              <p className="text-base font-semibold text-gray-900 mb-1">Ticket Submitted!</p>
              <p className="text-sm text-gray-500 mb-1">Your ticket ID is <strong>#TKT-2024-0847</strong></p>
              <p className="text-xs text-gray-400">We'll respond within 4 business hours.</p>
              <Btn className="mt-5" onClick={()=>{setModal(null);setSubmitted(false);}}>Done</Btn>
            </div>
          ):(
            <div className="space-y-3">
              <InputField label="Subject" value={ticketForm.subject} onChange={(e:any)=>setTicketForm(p=>({...p,subject:e.target.value}))} placeholder="Brief description of the issue" required/>
              <div className="grid grid-cols-2 gap-3">
                <SelectField label="Priority" value={ticketForm.priority} onChange={(e:any)=>setTicketForm(p=>({...p,priority:e.target.value}))}>
                  <option>Low</option><option>Medium</option><option>High</option><option>Critical</option>
                </SelectField>
                <SelectField label="Category" value={ticketForm.category} onChange={(e:any)=>setTicketForm(p=>({...p,category:e.target.value}))}>
                  <option>Technical</option><option>Billing</option><option>Feature</option><option>Other</option>
                </SelectField>
              </div>
              <div className="flex flex-col gap-1"><label className="text-xs font-semibold text-gray-600">Description <span className="text-red-500">*</span></label><textarea rows={4} value={ticketForm.desc} onChange={e=>setTicketForm(p=>({...p,desc:e.target.value}))} placeholder="Describe the issue in detail…" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#5C5CFF]"/></div>
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-3 text-center cursor-pointer hover:border-[#5C5CFF]/40 transition-colors">
                <p className="text-xs text-gray-400">Attach screenshots (optional) · Click to upload</p>
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-gray-200">
                <Btn variant="outline" onClick={()=>setModal(null)}>Cancel</Btn>
                <Btn onClick={()=>setSubmitted(true)}>Submit Ticket</Btn>
              </div>
            </div>
          )}
        </Modal>
      )}

      {/* ── Report Bug Modal ── */}
      {modal==="bug"&&(
        <Modal title="Report a Bug" onClose={()=>setModal(null)} width="max-w-md">
          <div className="space-y-3">
            <InputField label="Bug Title" placeholder="What went wrong?" required/>
            <SelectField label="Severity"><option>Minor</option><option>Major</option><option>Critical</option></SelectField>
            <div className="flex flex-col gap-1"><label className="text-xs font-semibold text-gray-600">Steps to Reproduce</label><textarea rows={3} placeholder="1. Go to…&#10;2. Click on…&#10;3. See error" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#5C5CFF]"/></div>
            <div className="flex justify-end gap-2 pt-2 border-t border-gray-200">
              <Btn variant="outline" onClick={()=>setModal(null)}>Cancel</Btn>
              <Btn onClick={()=>setModal("bug-sent")}>Submit Bug Report</Btn>
            </div>
          </div>
        </Modal>
      )}
      {modal==="bug-sent"&&(
        <Modal title="Bug Reported" onClose={()=>setModal(null)}>
          <div className="text-center py-6">
            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-3"><CheckCircle size={24} className="text-green-500"/></div>
            <p className="text-sm font-semibold text-gray-900 mb-1">Bug report submitted</p>
            <p className="text-xs text-gray-400">Our engineering team will investigate. Ref: #BUG-2024-0441</p>
            <Btn className="mt-4" onClick={()=>setModal(null)}>Close</Btn>
          </div>
        </Modal>
      )}

      {/* ── Feature Request Modal ── */}
      {modal==="feature"&&(
        <Modal title="Feature Request" onClose={()=>setModal(null)} width="max-w-md">
          <div className="space-y-3">
            <InputField label="Feature Title" placeholder="What would you like to see?" required/>
            <div className="flex flex-col gap-1"><label className="text-xs font-semibold text-gray-600">Description</label><textarea rows={4} placeholder="Describe the feature and its use case…" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#5C5CFF]"/></div>
            <SelectField label="Priority"><option>Nice to have</option><option>Important</option><option>Critical</option></SelectField>
            <div className="flex justify-end gap-2 pt-2 border-t border-gray-200">
              <Btn variant="outline" onClick={()=>setModal(null)}>Cancel</Btn>
              <Btn onClick={()=>setModal(null)}>Submit Request</Btn>
            </div>
          </div>
        </Modal>
      )}

      {/* ── About Modal ── */}
      {modal==="about"&&(
        <Modal title="About Attendance HRMS" onClose={()=>setModal(null)} width="max-w-sm">
          <div className="text-center py-4 space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-[#5C5CFF] flex items-center justify-center mx-auto"><Users size={28} className="text-white"/></div>
            <div><p className="text-base font-bold text-gray-900">Attendance HRMS</p><p className="text-xs text-gray-400">Enterprise Edition · v2.4.1</p></div>
            <div className="text-xs text-gray-500 space-y-0.5">
              <p>Build: 2024.06.28</p><p>License: Enterprise · Acme Corporation</p><p>Support: support@attendancehrms.com</p>
            </div>
            <Btn className="w-full justify-center" onClick={()=>setModal(null)}>Close</Btn>
          </div>
        </Modal>
      )}

      {/* ── Privacy / Terms / Security Modals ── */}
      {(modal==="privacy"||modal==="terms"||modal==="security")&&(
        <Modal title={modal==="privacy"?"Privacy Policy":modal==="terms"?"Terms of Service":"Security Policy"} onClose={()=>setModal(null)} width="max-w-lg">
          <div className="prose prose-sm max-w-none text-gray-600 space-y-3 max-h-80 overflow-auto">
            <p className="font-semibold text-gray-800">{modal==="privacy"?"Last updated: June 1, 2024":modal==="terms"?"Effective: January 1, 2024":"Version: 3.0 · June 2024"}</p>
            {modal==="privacy"&&<><p>Attendance HRMS collects and processes personal data in accordance with applicable data protection laws including GDPR and CCPA. Data is used solely for HR management purposes and is never sold to third parties.</p><p>Employee data including attendance records, personal information, and employment history is stored securely using AES-256 encryption at rest and TLS 1.3 in transit.</p><p>You have the right to access, correct, and delete your personal data at any time by contacting your HR administrator.</p></>}
            {modal==="terms"&&<><p>By accessing or using Attendance HRMS, you agree to be bound by these Terms of Service. The software is licensed, not sold. Your organization's administrator is responsible for proper use and configuration.</p><p>Attendance HRMS is provided "as is" for enterprise HR management. Usage is subject to your organization's license agreement with Acme Corporation.</p></>}
            {modal==="security"&&<><p>Attendance HRMS implements enterprise-grade security including multi-factor authentication, role-based access control, and comprehensive audit logging.</p><p>All data transmissions are encrypted using TLS 1.3. Data at rest uses AES-256 encryption. Regular security audits are conducted by third-party firms.</p></>}
          </div>
          <div className="flex justify-end mt-4 pt-3 border-t border-gray-200"><Btn onClick={()=>setModal(null)}>Close</Btn></div>
        </Modal>
      )}
    </div>
  );
}

// ── AI Panel ───────────────────────────────────────────────────────────────────
function AIPanel({ onClose, navigate }: { onClose:()=>void; navigate:(p:AppPage)=>void }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{role:string;content:string}[]>([]);
  const [loading, setLoading] = useState(false);

  const COMMANDS = [
    {label:"Search Employees",icon:Search,action:()=>navigate("organization"),reply:"Opening Employee Directory…"},
    {label:"Show Today's Absentees",icon:UserX,action:()=>navigate("attendance"),reply:"Today: 17 absent, 14 missing check-outs. Opening Attendance Exceptions…"},
    {label:"Show Missing Check-ins",icon:Clock,action:()=>navigate("attendance"),reply:"8 employees haven't checked in yet. Opening Attendance…"},
    {label:"Review Pending Approvals",icon:CheckCircle,action:()=>navigate("my-space"),reply:"17 approvals pending: 3 leave, 8 attendance, 6 access control. Opening approvals…"},
    {label:"Open Leave Requests",icon:CalendarDays,action:()=>navigate("leave"),reply:"3 leave requests awaiting approval. Opening Leave…"},
    {label:"Generate Attendance Summary",icon:BarChart2,action:()=>navigate("attendance"),reply:"Today: 734 present (86.7%), 32 late, 17 absent, 21 WFH, 43 on leave. Opening Attendance…"},
    {label:"Create Task",icon:ClipboardList,action:()=>navigate("tasks"),reply:"Opening task creation…"},
    {label:"Open Organization",icon:Building2,action:()=>navigate("organization"),reply:"Opening Organization module…"},
  ];

  const SUGGESTIONS = [
    "How many employees are on leave today?",
    "Show attendance exceptions",
    "Find employees in Engineering",
    "What needs my attention today?",
  ];

  const send = (text: string) => {
    const q = text || input;
    if (!q.trim()) return;
    setMessages(m => [...m, {role:"user", content:q}]);
    setInput(""); setLoading(true);
    setTimeout(() => {
      let reply = "Let me look that up for you.";
      const ql = q.toLowerCase();
      if (ql.includes("leave")) { reply = "Currently 43 employees on leave. 3 requests pending approval. Opening Leave…"; setTimeout(()=>navigate("leave"),1500); }
      else if (ql.includes("absent") || ql.includes("exception") || ql.includes("check-in") || ql.includes("attendance")) { reply = "Today: 734 present, 32 late, 17 absent. 14 missing check-outs need review. Opening Attendance…"; setTimeout(()=>navigate("attendance"),1500); }
      else if (ql.includes("engineer") || ql.includes("employee") || ql.includes("find") || ql.includes("search")) { reply = "Engineering has 234 employees. Opening Organization → Employees…"; setTimeout(()=>navigate("organization"),1500); }
      else if (ql.includes("task")) { reply = "You have 5 open tasks: 2 high priority, 2 overdue. Opening Tasks…"; setTimeout(()=>navigate("tasks"),1500); }
      else if (ql.includes("approval") || ql.includes("pending") || ql.includes("attention")) { reply = "17 pending approvals: 3 leave requests, 8 attendance corrections, 6 access reviews. Opening My Space…"; setTimeout(()=>navigate("my-space"),1500); }
      else if (ql.includes("summary") || ql.includes("report")) { reply = "Organization health is at 82%. Attendance avg: 95.8%. Headcount: 847 (+12 this month). See Reports for full details."; }
      setMessages(m => [...m, {role:"assistant", content:reply}]);
      setLoading(false);
    }, 900);
  };

  const runCommand = (cmd: typeof COMMANDS[0]) => {
    setMessages(m => [...m, {role:"user", content:cmd.label}, {role:"assistant", content:cmd.reply}]);
    setTimeout(cmd.action, 1200);
  };

  return (
    <div className="fixed right-0 top-0 bottom-0 w-80 bg-white border-l border-gray-200 flex flex-col z-30 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-200 flex-shrink-0 bg-gradient-to-r from-[#EEF2FF] to-white">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#5C5CFF] flex items-center justify-center shadow-sm"><Bot size={15} className="text-white"/></div>
          <div>
            <p className="text-sm font-semibold text-gray-900">AI Assistant</p>
            <p className="text-[10px] text-green-500 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block"/>Online</p>
          </div>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"><X size={15}/></button>
      </div>

      {/* Command shortcuts — shown when no messages */}
      {messages.length === 0 && (
        <div className="flex-1 overflow-auto">
          <div className="p-4">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Quick Commands</p>
            <div className="space-y-1">
              {COMMANDS.map(cmd => (
                <button key={cmd.label} onClick={() => runCommand(cmd)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#EEF2FF] hover:text-[#5C5CFF] text-left transition-colors group border border-transparent hover:border-[#5C5CFF]/20">
                  <cmd.icon size={14} className="text-gray-400 group-hover:text-[#5C5CFF] flex-shrink-0"/>
                  <span className="text-sm text-gray-700 group-hover:text-[#5C5CFF]">{cmd.label}</span>
                  <ArrowRight size={12} className="ml-auto text-gray-300 group-hover:text-[#5C5CFF]"/>
                </button>
              ))}
            </div>
          </div>
          <div className="px-4 pb-4">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2.5">Smart Suggestions</p>
            <div className="space-y-1.5">
              {SUGGESTIONS.map(s => (
                <button key={s} onClick={() => send(s)} className="w-full text-left text-xs text-gray-600 px-3 py-2 bg-gray-50 hover:bg-[#EEF2FF] hover:text-[#5C5CFF] rounded-lg transition-colors border border-gray-100">
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Messages */}
      {messages.length > 0 && (
        <div className="flex-1 overflow-auto p-4 space-y-3">
          {messages.map((m,i) => (
            <div key={i} className={cn("flex", m.role==="user"?"justify-end":"justify-start")}>
              {m.role==="assistant"&&<div className="w-6 h-6 rounded-full bg-[#5C5CFF] flex items-center justify-center flex-shrink-0 mr-2 mt-0.5"><Bot size={11} className="text-white"/></div>}
              <div className={cn("max-w-[80%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed", m.role==="user"?"bg-[#5C5CFF] text-white rounded-br-sm":"bg-gray-100 text-gray-800 rounded-bl-sm")}>{m.content}</div>
            </div>
          ))}
          {loading&&(
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#5C5CFF] flex items-center justify-center flex-shrink-0"><Bot size={11} className="text-white"/></div>
              <div className="bg-gray-100 rounded-xl px-3.5 py-2.5"><div className="flex gap-1">{[0,150,300].map(d=><div key={d} className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay:`${d}ms`}}/>)}</div></div>
            </div>
          )}
          <button onClick={()=>setMessages([])} className="w-full text-center text-[10px] text-gray-400 hover:text-[#5C5CFF] py-1">← Back to commands</button>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-gray-200 p-3 flex-shrink-0">
        <div className="flex gap-2">
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send(input)} placeholder="Ask me anything…" className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C5CFF] bg-gray-50 focus:bg-white transition-colors"/>
          <button onClick={()=>send(input)} className="w-9 h-9 bg-[#5C5CFF] rounded-lg flex items-center justify-center text-white hover:bg-[#4A4AE0] transition-colors flex-shrink-0 disabled:opacity-50" disabled={!input.trim()}><Send size={13}/></button>
        </div>
        <p className="text-[10px] text-gray-400 mt-1.5 text-center">Ctrl+K to open · Esc to close</p>
      </div>
    </div>
  );
}

// ── Notifications Panel ────────────────────────────────────────────────────────
function NotificationsPanel({ onClose, navigate, onViewAll }: { onClose:()=>void; navigate:(p:AppPage)=>void; onViewAll:()=>void }) {
  const iconMap: Record<string,{icon:any;color:string}> = {
    leave:{icon:CalendarDays,color:"#F59E0B"},attendance:{icon:Clock,color:"#5C5CFF"},employee:{icon:UserPlus,color:"#3B82F6"},system:{icon:CheckCircle,color:"#6B7280"}
  };
  return (
    <div className="absolute right-4 top-14 w-80 bg-white rounded-xl border border-gray-200 shadow-xl z-50" onClick={e=>e.stopPropagation()}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-800">Notifications</h3>
        <div className="flex gap-2"><button className="text-xs text-[#5C5CFF] hover:underline">Mark all read</button><button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={14}/></button></div>
      </div>
      <div className="max-h-80 overflow-auto divide-y divide-gray-100">
        {NOTIFICATIONS.map(n=>{
          const {icon:Icon,color}=iconMap[n.type]||iconMap.system;
          return (
            <button key={n.id} onClick={()=>{navigate(n.action);onClose();}} className={cn("w-full flex gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors",!n.read&&"bg-[#EEF2FF]/40")}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{backgroundColor:color+"18"}}><Icon size={14} style={{color}}/></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2"><p className="text-xs font-medium text-gray-800">{n.title}</p>{!n.read&&<div className="w-1.5 h-1.5 bg-[#5C5CFF] rounded-full flex-shrink-0"/>}</div>
                <p className="text-xs text-gray-500 mt-0.5 truncate">{n.message}</p>
                <p className="text-[10px] text-gray-400 mt-1">{n.time}</p>
              </div>
            </button>
          );
        })}
      </div>
      <div className="px-4 py-3 border-t border-gray-200 text-center"><button onClick={onViewAll} className="text-xs text-[#5C5CFF] hover:underline font-medium">View all notifications</button></div>
    </div>
  );
}

// ── Quick Actions Menu ─────────────────────────────────────────────────────────
function QuickActionsMenu({ onClose, navigate }: { onClose:()=>void; navigate:(p:AppPage)=>void }) {
  const actions = [
    { icon:UserPlus,  label:"Add Employee",        page:"employee-add"  as AppPage, desc:"Create a new employee profile" },
    { icon:GitBranch, label:"Add Department",       page:"organization"  as AppPage, desc:"Add a new department" },
    { icon:ClipboardList, label:"Create Task",      page:"tasks"         as AppPage, desc:"Assign a task to a team member" },
    { icon:Megaphone, label:"Create Announcement",  page:"my-space"      as AppPage, desc:"Post to the organization" },
    { icon:CalendarDays, label:"Create Holiday",    page:"organization"  as AppPage, desc:"Add to the holiday calendar" },
    { icon:Clock,     label:"Create Shift",         page:"organization"  as AppPage, desc:"Define a new shift template" },
  ];
  return (
    <div className="absolute left-1/2 top-14 -translate-x-1/2 w-80 bg-white rounded-xl border border-gray-200 shadow-xl z-50" onClick={e=>e.stopPropagation()}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-800">Quick Actions</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={14}/></button>
      </div>
      <div className="p-2 grid grid-cols-2 gap-1">
        {actions.map(a=>(
          <button key={a.label} onClick={()=>{navigate(a.page);onClose();}} className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg hover:bg-[#EEF2FF] text-left transition-colors group">
            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 group-hover:bg-[#5C5CFF]/10 transition-colors"><a.icon size={15} className="text-gray-500 group-hover:text-[#5C5CFF] transition-colors"/></div>
            <div className="min-w-0"><p className="text-xs font-semibold text-gray-800 group-hover:text-[#5C5CFF] transition-colors leading-snug">{a.label}</p><p className="text-[10px] text-gray-400 truncate">{a.desc}</p></div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Tasks Page ─────────────────────────────────────────────────────────────────
function TasksPage({ navigate }: { navigate:(p:AppPage)=>void }) {
  const [filter, setFilter] = useState("All");
  const [tasks, setTasks] = useState([
    { id:"T001", title:"Review Q2 attendance report", assignee:"Alex Admin", dept:"HR", priority:"High", due:"Jul 3, 2024", status:"In Progress" },
    { id:"T002", title:"Update leave policy for FY2025", assignee:"Aisha Thompson", dept:"HR", priority:"High", due:"Jul 5, 2024", status:"Todo" },
    { id:"T003", title:"Onboard 3 new engineering hires", assignee:"David Chen", dept:"Engineering", priority:"Medium", due:"Jul 8, 2024", status:"Todo" },
    { id:"T004", title:"Prepare department headcount report", assignee:"Jennifer Walsh", dept:"Finance", priority:"Medium", due:"Jul 10, 2024", status:"In Progress" },
    { id:"T005", title:"Configure geo-fence for Austin office", assignee:"Alex Admin", dept:"Operations", priority:"Low", due:"Jul 15, 2024", status:"Todo" },
    { id:"T006", title:"Send welcome email to new joiners", assignee:"Aisha Thompson", dept:"HR", priority:"Low", due:"Jul 1, 2024", status:"Done" },
    { id:"T007", title:"Audit access roles for Finance team", assignee:"Alex Admin", dept:"Security", priority:"High", due:"Jul 2, 2024", status:"Done" },
  ]);
  const [showCreate, setShowCreate] = useState(false);
  const [taskMenu, setTaskMenu] = useState<string|null>(null);
  const deleteTask = (id:string) => setTasks(ts=>ts.filter(t=>t.id!==id));
  const setTaskStatus = (id:string, status:string) => setTasks(ts=>ts.map(t=>t.id===id?{...t,status}:t));

  const toggleDone = (id:string) => setTasks(ts=>ts.map(t=>t.id===id?{...t,status:t.status==="Done"?"Todo":"Done"}:t));
  const filtered = filter==="All"?tasks:tasks.filter(t=>t.status===filter);

  const priorityColor: Record<string,string> = { High:"text-red-600 bg-red-50", Medium:"text-amber-600 bg-amber-50", Low:"text-gray-500 bg-gray-100" };
  const statusColor: Record<string,string> = { Todo:"text-gray-500 bg-gray-100", "In Progress":"text-blue-600 bg-blue-50", Done:"text-green-700 bg-green-50" };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white border-b border-gray-200 px-6 pt-5 pb-0">
        <div className="flex items-center justify-between mb-4">
          <div><h1 className="text-lg font-semibold text-gray-900">Tasks</h1><p className="text-sm text-gray-500 mt-0.5">{tasks.filter(t=>t.status!=="Done").length} open · {tasks.filter(t=>t.status==="Done").length} completed</p></div>
          <Btn onClick={()=>setShowCreate(true)}><Plus size={14}/>Create Task</Btn>
        </div>
        <div className="flex items-center gap-1 pb-3">
          {["All","Todo","In Progress","Done"].map(f=>(
            <button key={f} onClick={()=>setFilter(f)} className={cn("px-3 py-1.5 text-xs font-medium rounded-lg transition-colors",filter===f?"bg-[#5C5CFF] text-white":"text-gray-600 hover:bg-gray-100")}>{f}</button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="bg-white rounded-lg border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>{["Task","Assignee","Department","Priority","Due Date","Status",""].map(h=><th key={h} className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(t=>(
                <tr key={t.id} className={cn("hover:bg-gray-50 transition-colors",t.status==="Done"&&"opacity-60")}>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <input type="checkbox" checked={t.status==="Done"} onChange={()=>toggleDone(t.id)} className="rounded border-gray-300 accent-[#5C5CFF] flex-shrink-0"/>
                      <span className={cn("font-medium text-gray-800",t.status==="Done"&&"line-through text-gray-400")}>{t.title}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <Avt initials={t.assignee.split(" ").map(n=>n[0]).join("")} color={EMP_COLORS[parseInt(t.id.slice(-1))%EMP_COLORS.length]} size="sm"/>
                      <span className="text-gray-600 text-xs">{t.assignee}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-gray-500 text-xs">{t.dept}</td>
                  <td className="px-5 py-3"><span className={cn("px-2 py-0.5 rounded text-xs font-medium",priorityColor[t.priority])}>{t.priority}</span></td>
                  <td className="px-5 py-3 text-gray-500 text-xs">{t.due}</td>
                  <td className="px-5 py-3"><span className={cn("px-2 py-0.5 rounded text-xs font-medium",statusColor[t.status])}>{t.status}</span></td>
                  <td className="px-5 py-3 relative">
                    <button onClick={()=>setTaskMenu(taskMenu===t.id?null:t.id)} className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100"><MoreHorizontal size={14}/></button>
                    {taskMenu===t.id&&(
                      <div className="absolute right-5 top-full z-30 mt-1 w-44 bg-white rounded-xl border border-gray-200 shadow-lg py-1" onClick={()=>setTaskMenu(null)}>
                        <button onClick={()=>setTaskStatus(t.id,"In Progress")} className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2"><Play size={11} className="text-blue-500"/>Mark In Progress</button>
                        <button onClick={()=>setTaskStatus(t.id,"Done")} className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2"><CheckCircle size={11} className="text-green-500"/>Mark Done</button>
                        <button onClick={()=>setTaskStatus(t.id,"Todo")} className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2"><Circle size={11} className="text-gray-400"/>Reset to Todo</button>
                        <div className="border-t border-gray-100 my-1"/>
                        <button onClick={()=>deleteTask(t.id)} className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2"><Trash2 size={11}/>Delete Task</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showCreate&&(
        <Modal title="Create Task" onClose={()=>setShowCreate(false)}>
          <div className="space-y-4">
            <InputField label="Task Title" placeholder="Describe the task…" required/>
            <SelectField label="Assignee" options={["Alex Admin","Aisha Thompson","David Chen","Jennifer Walsh","Marcus Johnson"]}/>
            <div className="grid grid-cols-2 gap-4">
              <SelectField label="Priority" options={["High","Medium","Low"]}/>
              <InputField label="Due Date" type="date"/>
            </div>
            <SelectField label="Department" options={["HR","Engineering","Finance","Marketing","Sales","Design","Legal","Operations"]}/>
            <InputField label="Description" placeholder="Optional notes…"/>
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <Btn variant="outline" onClick={()=>setShowCreate(false)}>Cancel</Btn>
              <Btn onClick={()=>setShowCreate(false)}><Check size={14}/>Create Task</Btn>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── App Root ───────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<AppPage>("login");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee>(EMPLOYEES[0]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [quickActionsOpen, setQuickActionsOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const [attendanceSection, setAttendanceSection] = useState<"My Space" | "My Team">("My Space");
  const [leaveSection, setLeaveSection] = useState<"My Space" | "My Team">("My Space");
  const [teamSection, setTeamSection] = useState<"Overview" | "Management">("Overview");
  const [orgSection, setOrgSection] = useState<"Overview" | "Management">("Overview");
  const [mySpaceTab, setMySpaceTab] = useState<string>("Dashboard");

  const [attendanceTab, setAttendanceTab] = useState<string>("Overview");
  const [leaveTab, setLeaveTab] = useState<string>("Overview");
  const [tasksTab, setTasksTab] = useState<string>("Board");
  const [documentsTab, setDocumentsTab] = useState<string>("Company");
  const [settingsTab, setSettingsTab] = useState<string>("General");

  // Lifted child views & filter toolbar states
  const [teamTab, setTeamTab] = useState<string>("Members");
  const [orgTab, setOrgTab] = useState<string>("Overview");
  const [supportTab, setSupportTab] = useState<string>("Home");
  const [attPeriod, setAttPeriod] = useState<"Weekly" | "Monthly" | "Yearly">("Monthly");
  const [checkedIn, setCheckedIn] = useState<boolean>(true);
  const [reporteesViewMode, setReporteesViewMode] = useState<"list"|"org">(() => (sessionStorage.getItem("reportees_view_mode") as "list"|"org") || "list");

  useEffect(() => {
    sessionStorage.setItem("reportees_view_mode", reporteesViewMode);
  }, [reporteesViewMode]);

  // Search input states
  const [tasksSearch, setTasksSearch] = useState<string>("");
  const [orgSearch, setOrgSearch] = useState<string>("");
  const [teamSearch, setTeamSearch] = useState<string>("");
  const [docsSearch, setDocsSearch] = useState<string>("");

  // Modal / popups trigger states
  const [showAttFilter, setShowAttFilter] = useState(false);
  const [showLeaveFilter, setShowLeaveFilter] = useState(false);
  const [showTeamFilter, setShowTeamFilter] = useState(false);
  const [showTasksFilter, setShowTasksFilter] = useState(false);
  const [showApplyLeave, setShowApplyLeave] = useState(false);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showCreateAnnouncement, setShowCreateAnnouncement] = useState(false);
  const [showUploadDoc, setShowUploadDoc] = useState(false);
  const [showNewDoc, setShowNewDoc] = useState(false);

  const [attToast, setAttToast] = useState<string|null>(null);
  const attMsg = (m:string) => { setAttToast(m); setTimeout(()=>setAttToast(null),2500); };

  const navigate = (p: AppPage, emp?: Employee, tabOrSection?: string) => {
    if(emp) setSelectedEmployee(emp);
    if(p === "my-space" && tabOrSection) {
      setMySpaceTab(tabOrSection);
    }
    if(p === "attendance" && tabOrSection) {
      setAttendanceSection(tabOrSection as any);
    }
    if(p === "leave" && tabOrSection) {
      setLeaveSection(tabOrSection as any);
    }
    if(p === "team" && tabOrSection) {
      setTeamSection(tabOrSection as any);
    }
    if(p === "organization" && tabOrSection) {
      setOrgSection(tabOrSection as any);
    }
    setPage(p);
    setNotifOpen(false);
    setQuickActionsOpen(false);
  };

  const handleLogout = () => {
    setLoggingOut(true);
    setTimeout(()=>{ setLoggingOut(false); setShowLogoutConfirm(false); setPage("login"); }, 1000);
  };

  // Sync sub-tabs on workspace changes
  useEffect(() => {
    if (teamSection === "Overview") {
      setTeamTab("Members");
    } else {
      setTeamTab("Approvals");
    }
  }, [teamSection]);

  useEffect(() => {
    if (orgSection === "Overview") {
      setOrgTab("Overview");
    } else {
      setOrgTab("Policies");
    }
  }, [orgSection]);

  if(page==="login") return <LoginPage onLogin={()=>setPage("admin-account")}/>;
  if(page==="admin-account") return <CreateAdminAccountPage onContinue={()=>setPage("getting-started")} onBack={()=>setPage("login")}/>;
  if(page==="getting-started") return <GettingStartedPage onStart={()=>setPage("setup")} onSkip={()=>setPage("my-space")}/>;
  if(page==="setup") return <SetupWizard onComplete={()=>setPage("my-space")}/>;

  const unread = NOTIFICATIONS.filter(n=>!n.read).length;

  // Row 1 Title
  let headerTitle = "";
  if (page === "my-space") headerTitle = "My Space";
  else if (page === "team") headerTitle = "Team";
  else if (page === "organization") headerTitle = "Organization";
  else if (page === "attendance") headerTitle = "Attendance";
  else if (page === "leave") headerTitle = "Leave";
  else if (page === "tasks") headerTitle = "Tasks";
  else if (page === "documents") headerTitle = "Documents";
  else if (page === "settings") headerTitle = "Settings";
  else if (page === "support") headerTitle = "Help & Support";
  else if (page === "profile") headerTitle = "User Profile";
  else if (page === "employee-profile") headerTitle = "Employee Profile";
  else if (page === "employee-add") headerTitle = "Add Employee";

  // Row 1 Switcher
  let workspaceSwitch: React.ReactNode = null;
  if (page === "attendance") {
    workspaceSwitch = (
      <SegmentedControl
        items={["My Space", "My Team"] as const}
        activeItem={attendanceSection}
        onChange={setAttendanceSection}
      />
    );
  } else if (page === "leave") {
    workspaceSwitch = (
      <SegmentedControl
        items={["My Space", "My Team"] as const}
        activeItem={leaveSection}
        onChange={setLeaveSection}
      />
    );
  } else if (page === "organization") {
    workspaceSwitch = (
      <SegmentedControl
        items={["Overview", "Management"] as const}
        activeItem={orgSection}
        onChange={setOrgSection}
      />
    );
  }

  // Row 2 Tabs
  let headerTabs: string[] = [];
  let activeHeaderTab = "";
  let onHeaderTabChange: (t: string) => void = () => {};

  if (page === "my-space") {
    headerTabs = ["Dashboard", "Attendance", "Leave", "Tasks", "Approvals", "Calendar"];
    activeHeaderTab = mySpaceTab;
    onHeaderTabChange = setMySpaceTab;
  } else if (page === "attendance") {
    headerTabs = ["Overview", "Exceptions", "Analytics"];
    activeHeaderTab = attendanceTab;
    onHeaderTabChange = setAttendanceTab;
  } else if (page === "leave") {
    headerTabs = ["Overview", "Requests", "Analytics"];
    activeHeaderTab = leaveTab;
    onHeaderTabChange = setLeaveTab;
  } else if (page === "team") {
    headerTabs = ["Members", "Feed", "Announcements", "Reportees", "Approvals", "Tasks"];
    activeHeaderTab = teamTab;
    onHeaderTabChange = setTeamTab;
  } else if (page === "organization") {
    headerTabs = orgSection === "Overview" 
      ? ["Overview", "Employees", "Departments", "Operations"] 
      : ["Policies", "Access Control", "Announcements", "Reports"];
    activeHeaderTab = orgTab;
    onHeaderTabChange = setOrgTab;
  } else if (page === "tasks") {
    headerTabs = ["Board", "List", "Calendar"];
    activeHeaderTab = tasksTab;
    onHeaderTabChange = setTasksTab;
  } else if (page === "documents") {
    headerTabs = ["All", "Policies", "Templates", "Legal"];
    activeHeaderTab = documentsTab;
    onHeaderTabChange = setDocumentsTab;
  } else if (page === "settings") {
    headerTabs = ["General", "Appearance", "Notifications", "Security", "Integrations", "Manage Account"];
    activeHeaderTab = settingsTab;
    onHeaderTabChange = setSettingsTab;
  } else if (page === "support") {
    headerTabs = ["Home", "Documentation", "Knowledge Base", "Release Notes"];
    activeHeaderTab = supportTab;
    onHeaderTabChange = setSupportTab;
  }

  // Row 3 Toolbar
  let headerToolbar: React.ReactNode = null;
  if (page === "attendance") {
    headerToolbar = (
      <>
        {attendanceSection === "My Space" && (
          <SegmentedControl
            items={["Weekly", "Monthly", "Yearly"] as const}
            activeItem={attPeriod}
            onChange={setAttPeriod}
          />
        )}
        <div className="flex-1" />
        <button
          onClick={() => setShowAttFilter(true)}
          className="h-10 w-10 flex items-center justify-center p-0 rounded-[10px] border border-[#E5E7EB] bg-[#FFFFFF] text-[#16181D] hover:bg-gray-50 transition-colors"
        >
          <SlidersHorizontal size={16} />
        </button>
        <button
          onClick={() => attMsg("Attendance data exported")}
          className="h-10 px-[18px] rounded-[10px] border border-[#E5E7EB] bg-[#FFFFFF] text-[#16181D] text-[14px] font-medium flex items-center gap-2 hover:bg-gray-50 transition-colors"
        >
          <Download size={16} />
          Export
        </button>
        <button
          onClick={() => {
            setCheckedIn(!checkedIn);
            attMsg(checkedIn ? "Checked out successfully" : "Checked in successfully");
          }}
          className="h-10 px-[18px] rounded-[10px] border border-[#E5E7EB] bg-[#FFFFFF] text-[#16181D] text-[14px] font-medium flex items-center gap-2 hover:bg-gray-50 transition-colors"
        >
          {checkedIn ? <LogOut size={16} className="text-red-500" /> : <Play size={16} className="text-green-500" />}
          {checkedIn ? "Check out" : "Check in"}
        </button>
      </>
    );
  } else if (page === "leave") {
    headerToolbar = (
      <>
        <div className="flex-1" />
        <button
          onClick={() => setShowLeaveFilter(true)}
          className="h-10 w-10 flex items-center justify-center p-0 rounded-[10px] border border-[#E5E7EB] bg-[#FFFFFF] text-[#16181D] hover:bg-gray-50 transition-colors"
        >
          <SlidersHorizontal size={16} />
        </button>
        <button
          onClick={() => attMsg("Leave data exported")}
          className="h-10 px-[18px] rounded-[10px] border border-[#E5E7EB] bg-[#FFFFFF] text-[#16181D] text-[14px] font-medium flex items-center gap-2 hover:bg-gray-50 transition-colors"
        >
          <Download size={16} />
          Export
        </button>
        <button
          onClick={() => setShowApplyLeave(true)}
          className="h-10 px-[18px] rounded-[10px] border border-[#E5E7EB] bg-[#FFFFFF] text-[#16181D] text-[14px] font-medium flex items-center gap-2 hover:bg-gray-50 transition-colors"
        >
          <Plus size={16} strokeWidth={2.2} />
          Apply Leave
        </button>
      </>
    );
  } else if (page === "tasks") {
    headerToolbar = (
      <>
        <div className="relative w-64 h-[38px] flex items-center gap-2 px-3 bg-[#F6F7F9] border border-[#E8E9ED] rounded-[9px]">
          <Search size={14} className="text-[#9CA0AB] flex-shrink-0" />
          <input
            type="text"
            placeholder="Search..."
            value={tasksSearch}
            onChange={(e) => setTasksSearch(e.target.value)}
            className="w-full bg-transparent text-[13px] text-[#16181D] placeholder-[#9CA0AB] outline-none"
          />
        </div>
        <div className="flex-1" />
        <button
          onClick={() => setShowTasksFilter(true)}
          className="h-10 w-10 flex items-center justify-center p-0 rounded-[10px] border border-[#E5E7EB] bg-[#FFFFFF] text-[#16181D] hover:bg-gray-50 transition-colors"
        >
          <SlidersHorizontal size={16} />
        </button>
        <button
          onClick={() => setShowCreateTask(true)}
          className="h-10 px-[18px] rounded-[10px] border border-[#E5E7EB] bg-[#FFFFFF] text-[#16181D] text-[14px] font-medium flex items-center gap-2 hover:bg-gray-50 transition-colors"
        >
          <Plus size={16} strokeWidth={2.2} />
          Create Task
        </button>
      </>
    );
  } else if (page === "organization") {
    headerToolbar = (
      <>
        <div className="relative w-64 h-[38px] flex items-center gap-2 px-3 bg-[#F6F7F9] border border-[#E8E9ED] rounded-[9px]">
          <Search size={14} className="text-[#9CA0AB] flex-shrink-0" />
          <input
            type="text"
            placeholder="Search..."
            value={orgSearch}
            onChange={(e) => setOrgSearch(e.target.value)}
            className="w-full bg-transparent text-[13px] text-[#16181D] placeholder-[#9CA0AB] outline-none"
          />
        </div>
        <div className="flex-1" />
        <button
          onClick={() => setShowTeamFilter(true)}
          className="h-10 w-10 flex items-center justify-center p-0 rounded-[10px] border border-[#E5E7EB] bg-[#FFFFFF] text-[#16181D] hover:bg-gray-50 transition-colors"
        >
          <SlidersHorizontal size={16} />
        </button>
        <button
          onClick={() => attMsg("Organization directory exported")}
          className="h-10 px-[18px] rounded-[10px] border border-[#E5E7EB] bg-[#FFFFFF] text-[#16181D] text-[14px] font-medium flex items-center gap-2 hover:bg-gray-50 transition-colors"
        >
          <Download size={16} />
          Export
        </button>
        <button
          onClick={() => navigate("employee-add")}
          className="h-10 px-[18px] rounded-[10px] border border-[#E5E7EB] bg-[#FFFFFF] text-[#16181D] text-[14px] font-medium flex items-center gap-2 hover:bg-gray-50 transition-colors"
        >
          <Plus size={16} strokeWidth={2.2} />
          Add Employee
        </button>
      </>
    );
  } else if (page === "team") {
    if (teamTab === "Members") {
      headerToolbar = (
        <>
          <div className="relative w-64 h-[38px] flex items-center gap-2 px-3 bg-[#F6F7F9] border border-[#E8E9ED] rounded-[9px]">
            <Search size={14} className="text-[#9CA0AB] flex-shrink-0" />
            <input
              type="text"
              placeholder="Search Members..."
              value={teamSearch}
              onChange={(e) => setTeamSearch(e.target.value)}
              className="w-full bg-transparent text-[13px] text-[#16181D] placeholder-[#9CA0AB] outline-none"
            />
          </div>
          <div className="flex-1" />
          <button
            onClick={() => setShowTeamFilter(true)}
            className="h-10 w-10 flex items-center justify-center p-0 rounded-[10px] border border-[#E5E7EB] bg-[#FFFFFF] text-[#16181D] hover:bg-gray-50 transition-colors"
          >
            <SlidersHorizontal size={16} />
          </button>
          <button
            onClick={() => navigate("employee-add")}
            className="h-10 px-[18px] rounded-[10px] border border-[#E5E7EB] bg-[#FFFFFF] text-[#16181D] text-[14px] font-medium flex items-center gap-2 hover:bg-gray-50 transition-colors"
          >
            <Plus size={16} strokeWidth={2.2} />
            Add Employee
          </button>
        </>
      );
    } else if (teamTab === "Feed") {
      headerToolbar = (
        <>
          <div className="relative w-64 h-[38px] flex items-center gap-2 px-3 bg-[#F6F7F9] border border-[#E8E9ED] rounded-[9px]">
            <Search size={14} className="text-[#9CA0AB] flex-shrink-0" />
            <input
              type="text"
              placeholder="Search..."
              value={teamSearch}
              onChange={(e) => setTeamSearch(e.target.value)}
              className="w-full bg-transparent text-[13px] text-[#16181D] placeholder-[#9CA0AB] outline-none"
            />
          </div>
          <div className="flex-1" />
          <button
            onClick={() => setShowTeamFilter(true)}
            className="h-10 w-10 flex items-center justify-center p-0 rounded-[10px] border border-[#E5E7EB] bg-[#FFFFFF] text-[#16181D] hover:bg-gray-50 transition-colors"
          >
            <SlidersHorizontal size={16} />
          </button>
          <button
            onClick={() => setShowCreatePost(v => !v)}
            className="h-10 px-[18px] rounded-[10px] border border-[#E5E7EB] bg-[#FFFFFF] text-[#16181D] text-[14px] font-medium flex items-center gap-2 hover:bg-gray-50 transition-colors"
          >
            <Plus size={16} strokeWidth={2.2} />
            Create Post
          </button>
        </>
      );
    } else if (teamTab === "Announcements") {
      headerToolbar = (
        <>
          <div className="relative w-64 h-[38px] flex items-center gap-2 px-3 bg-[#F6F7F9] border border-[#E8E9ED] rounded-[9px]">
            <Search size={14} className="text-[#9CA0AB] flex-shrink-0" />
            <input
              type="text"
              placeholder="Search..."
              value={teamSearch}
              onChange={(e) => setTeamSearch(e.target.value)}
              className="w-full bg-transparent text-[13px] text-[#16181D] placeholder-[#9CA0AB] outline-none"
            />
          </div>
          <div className="flex-1" />
          <button
            onClick={() => setShowTeamFilter(true)}
            className="h-10 w-10 flex items-center justify-center p-0 rounded-[10px] border border-[#E5E7EB] bg-[#FFFFFF] text-[#16181D] hover:bg-gray-50 transition-colors"
          >
            <SlidersHorizontal size={16} />
          </button>
          <button
            onClick={() => setShowCreateAnnouncement(v => !v)}
            className="h-10 px-[18px] rounded-[10px] border border-[#E5E7EB] bg-[#FFFFFF] text-[#16181D] text-[14px] font-medium flex items-center gap-2 hover:bg-gray-50 transition-colors"
          >
            <Plus size={16} strokeWidth={2.2} />
            Create Announcement
          </button>
        </>
      );
    } else if (teamTab === "Reportees") {
      headerToolbar = (
        <>
          <div className="relative w-64 h-[38px] flex items-center gap-2 px-3 bg-[#F6F7F9] border border-[#E8E9ED] rounded-[9px]">
            <Search size={14} className="text-[#9CA0AB] flex-shrink-0" />
            <input
              type="text"
              placeholder="Search Reportees..."
              value={teamSearch}
              onChange={(e) => setTeamSearch(e.target.value)}
              className="w-full bg-transparent text-[13px] text-[#16181D] placeholder-[#9CA0AB] outline-none"
            />
          </div>
          <div className="flex-1" />
          <button
            onClick={() => setShowTeamFilter(true)}
            className="h-10 w-10 flex items-center justify-center p-0 rounded-[10px] border border-[#E5E7EB] bg-[#FFFFFF] text-[#16181D] hover:bg-gray-50 transition-colors"
          >
            <SlidersHorizontal size={16} />
          </button>
          <button
            onClick={() => attMsg("Reportees directory exported")}
            className="h-10 px-[18px] rounded-[10px] border border-[#E5E7EB] bg-[#FFFFFF] text-[#16181D] text-[14px] font-medium flex items-center gap-2 hover:bg-gray-50 transition-colors"
          >
            <Download size={16} />
            Export
          </button>
        </>
      );
    } else if (teamTab === "Approvals") {
      headerToolbar = (
        <>
          <div className="flex-1" />
          <button
            onClick={() => setShowTeamFilter(true)}
            className="h-10 w-10 flex items-center justify-center p-0 rounded-[10px] border border-[#E5E7EB] bg-[#FFFFFF] text-[#16181D] hover:bg-gray-50 transition-colors"
          >
            <SlidersHorizontal size={16} />
          </button>
          <button
            onClick={() => attMsg("Approvals list exported")}
            className="h-10 px-[18px] rounded-[10px] border border-[#E5E7EB] bg-[#FFFFFF] text-[#16181D] text-[14px] font-medium flex items-center gap-2 hover:bg-gray-50 transition-colors"
          >
            <Download size={16} />
            Export
          </button>
        </>
      );
    } else if (teamTab === "Tasks") {
      headerToolbar = (
        <>
          <div className="relative w-64 h-[38px] flex items-center gap-2 px-3 bg-[#F6F7F9] border border-[#E8E9ED] rounded-[9px]">
            <Search size={14} className="text-[#9CA0AB] flex-shrink-0" />
            <input
              type="text"
              placeholder="Search Tasks..."
              value={teamSearch}
              onChange={(e) => setTeamSearch(e.target.value)}
              className="w-full bg-transparent text-[13px] text-[#16181D] placeholder-[#9CA0AB] outline-none"
            />
          </div>
          <div className="flex-1" />
          <button
            onClick={() => setShowTasksFilter(true)}
            className="h-10 w-10 flex items-center justify-center p-0 rounded-[10px] border border-[#E5E7EB] bg-[#FFFFFF] text-[#16181D] hover:bg-gray-50 transition-colors"
          >
            <SlidersHorizontal size={16} />
          </button>
          <button
            onClick={() => setShowCreateTask(true)}
            className="h-10 px-[18px] rounded-[10px] border border-[#E5E7EB] bg-[#FFFFFF] text-[#16181D] text-[14px] font-medium flex items-center gap-2 hover:bg-gray-50 transition-colors"
          >
            <Plus size={16} strokeWidth={2.2} />
            Create Task
          </button>
        </>
      );
    }
  } else if (page === "documents") {
    headerToolbar = (
      <>
        <div className="relative w-64 h-[38px] flex items-center gap-2 px-3 bg-[#F6F7F9] border border-[#E8E9ED] rounded-[9px]">
          <Search size={14} className="text-[#9CA0AB] flex-shrink-0" />
          <input
            type="text"
            placeholder="Search..."
            value={docsSearch}
            onChange={(e) => setDocsSearch(e.target.value)}
            className="w-full bg-transparent text-[13px] text-[#16181D] placeholder-[#9CA0AB] outline-none"
          />
        </div>
        <div className="flex-1" />
        <button
          onClick={() => setShowTeamFilter(true)}
          className="h-10 w-10 flex items-center justify-center p-0 rounded-[10px] border border-[#E5E7EB] bg-[#FFFFFF] text-[#16181D] hover:bg-gray-50 transition-colors"
        >
          <SlidersHorizontal size={16} />
        </button>
        <button
          onClick={() => setShowUploadDoc(true)}
          className="h-10 px-[18px] rounded-[10px] border border-[#E5E7EB] bg-[#FFFFFF] text-[#16181D] text-[14px] font-medium flex items-center gap-2 hover:bg-gray-50 transition-colors"
        >
          <Upload size={16} />
          Upload
        </button>
        <button
          onClick={() => setShowNewDoc(true)}
          className="h-10 px-[18px] rounded-[10px] border border-[#E5E7EB] bg-[#FFFFFF] text-[#16181D] text-[14px] font-medium flex items-center gap-2 hover:bg-gray-50 transition-colors"
        >
          <Plus size={16} strokeWidth={2.2} />
          New Document
        </button>
      </>
    );
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar
        page={page}
        navigate={navigate}
        collapsed={sidebarCollapsed}
        onToggle={()=>setSidebarCollapsed(!sidebarCollapsed)}
        onLogout={()=>setShowLogoutConfirm(true)}
        attendanceSection={attendanceSection}
        leaveSection={leaveSection}
        teamSection={teamSection}
        orgSection={orgSection}
      />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <AppHeader
          title={headerTitle}
          workspaceSwitch={workspaceSwitch}
          tabs={headerTabs}
          activeTab={activeHeaderTab}
          onTabChange={onHeaderTabChange}
          toolbar={headerToolbar}
          onQuickCreate={(action) => {
            if (action === "employee") {
              navigate("employee-add");
            } else if (action === "department") {
              navigate("organization");
              setOrgSection("Management");
            } else if (action === "shift") {
              navigate("organization");
              setOrgSection("Management");
            } else if (action === "attendance") {
              navigate("attendance");
            } else if (action === "leave") {
              setShowApplyLeave(true);
            } else if (action === "holiday") {
              navigate("attendance");
            } else if (action === "announcement") {
              navigate("team");
              setTeamTab("Announcements");
              setShowCreateAnnouncement(true);
            } else if (action === "task") {
              setShowCreateTask(true);
            } else if (action === "document") {
              setShowNewDoc(true);
            } else if (action === "policy") {
              navigate("organization");
              setOrgSection("Management");
            }
          }}
          onSearchResultClick={(category, item) => {
            if (category === "employee") {
              navigate("employee-profile", item);
            } else if (category === "department") {
              navigate("organization");
              setOrgSection("Management");
            } else if (category === "attendance") {
              navigate("attendance");
            } else if (category === "leave") {
              navigate("leave");
            } else if (category === "task") {
              navigate("tasks");
            } else if (category === "announcement") {
              navigate("team");
              setTeamTab("Announcements");
            } else if (category === "document") {
              navigate("documents");
            } else if (category === "organization") {
              navigate("organization");
            } else if (category === "policies") {
              navigate("organization");
              setOrgSection("Management");
            } else if (category === "settings") {
              navigate("settings");
            }
          }}
          onNotifClick={()=>{setNotifOpen(true);}}
          onSettingsClick={()=>{navigate("settings");}}
          onProfileClick={()=>{navigate("profile");}}
          onLogout={()=>setShowLogoutConfirm(true)}
          unreadNotifications={unread}
        />
        <main className="flex-1 overflow-auto bg-[#F7F8FA]">
          {page==="my-space"&&<MySpacePage navigate={navigate} activeTab={mySpaceTab}/>}
          {page==="team"&&<TeamPage navigate={navigate} activeTab={teamTab} search={teamSearch} showCreatePost={showCreatePost} setShowCreatePost={setShowCreatePost} showCreateAnnouncement={showCreateAnnouncement} setShowCreateAnnouncement={setShowCreateAnnouncement} showCreateTask={showCreateTask} setShowCreateTask={setShowCreateTask}/>}
          {page==="organization"&&<OrganizationPage navigate={navigate} onSelectEmployee={e=>navigate("employee-profile",e)} section={orgSection} onSectionChange={setOrgSection}/>}
          {page==="attendance"&&<AttendancePage navigate={navigate} section={attendanceSection} onSectionChange={setAttendanceSection} activeTab={attendanceTab}/>}
          {page==="leave"&&<LeavePage navigate={navigate} section={leaveSection} onSectionChange={setLeaveSection} activeTab={leaveTab}/>}
          {page==="tasks"&&<TasksPage navigate={navigate} activeTab={tasksTab}/>}
          {page==="employee-profile"&&<EmployeeProfilePage employee={selectedEmployee} navigate={navigate}/>}
          {page==="employee-add"&&<AddEmployeePage navigate={navigate}/>}
          {page==="documents"&&<DocumentsPage navigate={navigate} activeTab={documentsTab}/>}
          {page==="settings"&&<SettingsPage navigate={navigate} activeTab={settingsTab}/>}
          {page==="support"&&<SupportPage navigate={navigate}/>}
          {page==="profile"&&<ViewProfilePage navigate={navigate}/>}
          {page==="notifications"&&<NotificationCenterPage navigate={navigate}/>}
          {page==="manage-account"&&<ManageAccountPage onBack={()=>navigate("settings")}/>}
        </main>

        {notifOpen&&(
          <div className="fixed inset-0 z-40" onClick={()=>setNotifOpen(false)}>
            <div onClick={e=>e.stopPropagation()}><NotificationsPanel onClose={()=>{ setNotifOpen(false); }} navigate={navigate} onViewAll={()=>{ setNotifOpen(false); navigate("notifications"); }}/></div>
          </div>
        )}
        {quickActionsOpen&&(
          <div className="fixed inset-0 z-40" onClick={()=>setQuickActionsOpen(false)}>
            <div onClick={e=>e.stopPropagation()}><QuickActionsMenu onClose={()=>setQuickActionsOpen(false)} navigate={navigate}/></div>
          </div>
        )}
      </div>
      {aiOpen&&<AIPanel onClose={()=>setAiOpen(false)} navigate={navigate}/>}

      {/* Logout Confirmation */}
      {showLogoutConfirm&&(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={()=>setShowLogoutConfirm(false)}/>
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4"><LogOut size={24} className="text-red-500"/></div>
            <h3 className="text-base font-semibold text-gray-900 mb-2">Sign out of Attendance HRMS?</h3>
            <p className="text-sm text-gray-500 mb-6">Are you sure you want to sign out? Any unsaved changes will be lost.</p>
            <div className="flex gap-3">
              <button onClick={()=>setShowLogoutConfirm(false)} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={handleLogout} disabled={loggingOut} className="flex-1 px-4 py-2.5 bg-red-500 rounded-xl text-sm font-medium text-white hover:bg-red-600 transition-colors disabled:opacity-70 flex items-center justify-center gap-2">
                {loggingOut?<><RefreshCw size={14} className="animate-spin"/>Signing out…</>:<><LogOut size={14}/>Sign Out</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
