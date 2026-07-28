import React, { useState } from "react";
import {
  Building2, MapPin, GitBranch, Briefcase, Calendar, Clock,
  UserCheck, CalendarDays, CheckCircle, Plus, Edit, Trash2, Eye,
  Upload, ChevronDown, X, Check, Copy, ArrowRight, ChevronLeft,
  ChevronRight, Users
} from "lucide-react";
import {
  EMPLOYEES,
  cn
} from "./data";
import { Btn, InputField, SelectField } from "./ui";

// ── Setup Wizard (12-step onboarding) ─────────────────────────────────────────
const SETUP_STEPS = [
  { label:"Organization Info",  icon:Building2 },
  { label:"Locations",          icon:MapPin },
  { label:"Departments",        icon:GitBranch },
  { label:"Designations",       icon:Briefcase },
  { label:"Holidays",           icon:Calendar },
  { label:"Shift Setup",        icon:Clock },
  { label:"Attendance Policy",  icon:UserCheck },
  { label:"Leave Policy",       icon:CalendarDays },
  { label:"Review & Finish",    icon:CheckCircle },
];

export function SetupWizard({ onComplete, initialStep = 0 }: { onComplete:()=>void; initialStep?:number }) {
  const [step, setStep] = useState(initialStep);
  const [saved, setSaved] = useState(false);
  const isLast = step === SETUP_STEPS.length - 1;
  const pct = Math.round((step / (SETUP_STEPS.length - 1)) * 100);
  const saveDraft = () => { setSaved(true); setTimeout(()=>setSaved(false), 2000); };

  // ── Step 1: Locations state ──
  const [locations, setLocations] = useState([
    {id:"L1",name:"New York HQ",address:"350 Fifth Avenue",city:"New York",state:"NY",country:"United States",pincode:"10118",tz:"UTC-5 Eastern",radius:"200m",contact:"Alex Admin",phone:"+1 212 736 3100"},
    {id:"L2",name:"San Francisco Office",address:"101 California Street",city:"San Francisco",state:"CA",country:"United States",pincode:"94111",tz:"UTC-8 Pacific",radius:"150m",contact:"Priya Sharma",phone:"+1 415 395 8900"},
  ]);
  const [showAddLocation, setShowAddLocation] = useState(false);
  const [editingLocation, setEditingLocation] = useState<string|null>(null);
  const [locationForm, setLocationForm] = useState({name:"",address:"",city:"",state:"",country:"United States",pincode:"",lat:"",lng:"",radius:"200m",tz:"(UTC-5) Eastern",contact:"",phone:""});

  // ── Step 2: Departments state ──
  const [departments, setDepartments] = useState([
    {id:"D1",name:"Engineering",code:"ENG",head:"David Chen",parent:"—",desc:"Software development and infrastructure"},
    {id:"D2",name:"Product",code:"PRD",head:"Marcus Johnson",parent:"Engineering",desc:"Product management and strategy"},
    {id:"D3",name:"Design",code:"DES",head:"Priya Sharma",parent:"Product",desc:"UX and visual design"},
    {id:"D4",name:"Marketing",code:"MKT",head:"Carlos Rivera",parent:"—",desc:"Brand and growth marketing"},
    {id:"D5",name:"Finance",code:"FIN",head:"Jennifer Walsh",parent:"—",desc:"Finance and accounting"},
    {id:"D6",name:"HR",code:"HR",head:"Aisha Thompson",parent:"—",desc:"Human resources and people ops"},
  ]);
  const [showAddDept, setShowAddDept] = useState(false);
  const [editingDept, setEditingDept] = useState<string|null>(null);
  const [deptForm, setDeptForm] = useState({name:"",code:"",head:"",parent:"None",desc:""});

  // ── Step 3: Designations state ──
  const [designations, setDesignations] = useState([
    {id:"G1",name:"Software Engineer",code:"SWE-IC2",level:"IC2",desc:"Individual contributor – software"},
    {id:"G2",name:"Senior Software Engineer",code:"SWE-IC3",level:"IC3",desc:"Senior individual contributor"},
    {id:"G3",name:"Product Manager",code:"PM-M1",level:"M1",desc:"Product leadership"},
    {id:"G4",name:"VP Engineering",code:"VPE-L7",level:"L7",desc:"Engineering leadership"},
    {id:"G5",name:"HR Manager",code:"HR-M2",level:"M2",desc:"HR leadership"},
  ]);
  const [showAddDesig, setShowAddDesig] = useState(false);
  const [editingDesig, setEditingDesig] = useState<string|null>(null);
  const [desigForm, setDesigForm] = useState({name:"",code:"",level:"",desc:""});

  // ── Step 4: Holidays state ──
  const [holidays, setHolidays] = useState([
    {id:"H1",name:"New Year's Day",date:"Jan 1",type:"National",locations:"All",desc:""},
    {id:"H2",name:"Memorial Day",date:"May 27",type:"National",locations:"All",desc:""},
    {id:"H3",name:"Independence Day",date:"Jul 4",type:"National",locations:"All",desc:""},
    {id:"H4",name:"Labor Day",date:"Sep 2",type:"National",locations:"All",desc:""},
    {id:"H5",name:"Thanksgiving Day",date:"Nov 28",type:"National",locations:"All",desc:""},
    {id:"H6",name:"Christmas Day",date:"Dec 25",type:"National",locations:"All",desc:""},
  ]);
  const [showAddHoliday, setShowAddHoliday] = useState(false);
  const [holidayView, setHolidayView] = useState<"list"|"calendar">("list");
  const [holidayForm, setHolidayForm] = useState({name:"",date:"",type:"National",locations:"All",desc:""});

  // ── Step 5: Shifts state ──
  const [shifts, setShifts] = useState([
    {id:"S1",name:"General Shift",checkin:"09:00",checkout:"18:00",grace:"15 min",late:"15 min",halfday:"4 hrs",days:"Mon–Fri",locations:"All",depts:"All",color:"#5C5CFF"},
    {id:"S2",name:"Morning Shift",checkin:"06:00",checkout:"15:00",grace:"10 min",late:"10 min",halfday:"4 hrs",days:"Mon–Sat",locations:"All",depts:"All",color:"#22C55E"},
    {id:"S3",name:"Evening Shift",checkin:"14:00",checkout:"23:00",grace:"15 min",late:"15 min",halfday:"4 hrs",days:"Mon–Sat",locations:"All",depts:"All",color:"#F59E0B"},
    {id:"S4",name:"Night Shift",checkin:"22:00",checkout:"07:00",grace:"20 min",late:"20 min",halfday:"4 hrs",days:"Mon–Sun",locations:"All",depts:"All",color:"#8B5CF6"},
  ]);
  const [showAddShift, setShowAddShift] = useState(false);
  const [editingShift, setEditingShift] = useState<string|null>(null);
  const [shiftForm, setShiftForm] = useState({name:"",checkin:"09:00",checkout:"18:00",grace:"15 min",late:"15 min",halfday:"4 hrs",days:"Mon–Fri",locations:"All",depts:"All",color:"#5C5CFF"});

  // ── Step 6: Attendance policy state ──
  const [attMethods, setAttMethods] = useState([
    {id:"mobile",label:"Mobile Check-in",on:true},
    {id:"web",label:"Web Check-in",on:true},
    {id:"qr",label:"QR Check-in",on:false},
    {id:"bio",label:"Biometric",on:false},
    {id:"face",label:"Face Recognition",on:false},
    {id:"self",label:"Self Check-in",on:true},
    {id:"mgr",label:"Manager Check-in",on:false},
    {id:"admin",label:"Admin Check-in",on:false},
    {id:"remote",label:"Remote Check-in (WFH)",on:true},
    {id:"geo",label:"Geo-fence Required",on:false},
    {id:"brk",label:"Break Tracking",on:false},
  ]);
  const toggleMethod = (id:string) => setAttMethods(m=>m.map(x=>x.id===id?{...x,on:!x.on}:x));

  // ── Step 7: Leave types state ──
  const [leaveTypes, setLeaveTypes] = useState([
    {id:"LT1",name:"Annual Leave",code:"AL",days:18,carry:"Yes, max 5",neg:false,paid:true,approval:true,color:"#22C55E",enabled:true},
    {id:"LT2",name:"Sick Leave",code:"SL",days:10,carry:"No",neg:false,paid:true,approval:false,color:"#EF4444",enabled:true},
    {id:"LT3",name:"Casual Leave",code:"CL",days:6,carry:"No",neg:false,paid:true,approval:true,color:"#F59E0B",enabled:true},
    {id:"LT4",name:"Loss of Pay",code:"LOP",days:0,carry:"—",neg:true,paid:false,approval:true,color:"#6B7280",enabled:true},
  ]);
  const [showAddLeave, setShowAddLeave] = useState(false);
  const [editingLeave, setEditingLeave] = useState<string|null>(null);
  const [leaveForm, setLeaveForm] = useState({name:"",code:"",days:"",carry:"No",maxCarry:"",neg:false,gender:"All",probation:false,attachment:false,approval:true,color:"#5C5CFF",desc:""});

  // ── Helpers ──
  const deleteItem = <T extends {id:string}>(list: T[], setList: (l:T[])=>void, id:string) =>
    setList(list.filter(x=>x.id!==id));

  const StepContent = () => {
    // ── Step 0: Organization Information ──────────────────────────────────────
    if (step === 0) return (
      <div className="space-y-5">
        <p className="text-sm text-gray-500">Complete your organization profile. This information appears across the platform.</p>
        <div className="flex items-start gap-5 p-4 bg-gray-50 rounded-xl border border-gray-200">
          <div className="w-20 h-20 rounded-xl bg-white border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-[#5C5CFF] transition-colors flex-shrink-0 group">
            <Plus size={22} className="text-gray-300 group-hover:text-[#5C5CFF] transition-colors mb-1"/>
            <span className="text-[10px] text-gray-400">Upload Logo</span>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-3">
            <div className="col-span-2"><InputField label="Organization Name" placeholder="Acme Corporation" required value="Acme Corporation"/></div>
            <InputField label="Portal Name" placeholder="acme" value="acme"/>
            <SelectField label="Business Type" options={["Private Ltd","Public Ltd","Partnership","Sole Proprietor","NGO","Government"]}/>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <SelectField label="Industry" options={["Technology","Finance","Healthcare","Manufacturing","Retail","Education","Logistics","Consulting","Media","Other"]} required/>
          <SelectField label="Employee Count" options={["1–10","11–50","51–200","201–500","501–1000","1000+"]}/>
          <InputField label="Company Website" type="url" placeholder="https://acmecorp.com" value="https://acmecorp.com"/>
          <InputField label="Contact Email" type="email" placeholder="contact@acmecorp.com" required/>
          <InputField label="Contact Number" type="tel" placeholder="+1 (555) 000-0000" required/>
          <div className="col-span-2"><InputField label="Primary Address" placeholder="350 Fifth Avenue, New York, NY 10118" required/></div>
          <SelectField label="Time Zone" options={["(UTC-8) Pacific Time","(UTC-5) Eastern Time","(UTC+0) UTC","(UTC+1) Central European","(UTC+5:30) India Standard Time"]} required/>
          <SelectField label="Language" options={["English (US)","English (UK)","French","German","Spanish","Arabic","Hindi"]}/>
          <SelectField label="Week Start Day" options={["Monday","Sunday"]} required/>
          <SelectField label="Date Format" options={["MM/DD/YYYY","DD/MM/YYYY","YYYY-MM-DD"]}/>
        </div>
      </div>
    );

    // ── Step 1: Locations ─────────────────────────────────────────────────────
    if (step === 1) return (
      <div className="space-y-4">
        <p className="text-sm text-gray-500">Add physical office locations. These are used for geo-fence attendance and shift assignment.</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">{locations.length} location{locations.length!==1?"s":""} added</span>
          <Btn size="sm" onClick={()=>{setEditingLocation(null);setLocationForm({name:"",address:"",city:"",state:"",country:"United States",pincode:"",lat:"",lng:"",radius:"200m",tz:"(UTC-5) Eastern",contact:"",phone:""});setShowAddLocation(true);}}>
            <Plus size={12}/>Add Location
          </Btn>
        </div>
        <div className="space-y-2">
          {locations.map(l=>(
            <div key={l.id} className="flex items-start gap-3 p-4 border border-gray-200 rounded-xl bg-white hover:border-[#5C5CFF]/30 transition-colors group">
              <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5"><MapPin size={15} className="text-blue-500"/></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800">{l.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{l.address}, {l.city}, {l.state} {l.pincode}</p>
                <div className="flex items-center gap-3 mt-1.5 text-[10px] text-gray-400">
                  <span>Geo-fence: {l.radius}</span>
                  <span>·</span><span>TZ: {l.tz}</span>
                  {l.contact&&<><span>·</span><span>Contact: {l.contact}</span></>}
                </div>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                <button onClick={()=>{setEditingLocation(l.id);setLocationForm({...l,lat:"",lng:""});setShowAddLocation(true);}} className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600" title="Edit"><Edit size={13}/></button>
                <button onClick={()=>deleteItem(locations,setLocations,l.id)} className="p-1.5 hover:bg-red-50 rounded text-gray-400 hover:text-red-500" title="Delete"><Trash2 size={13}/></button>
                <button className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600" title="View Details"><Eye size={13}/></button>
              </div>
            </div>
          ))}
          {locations.length===0&&(
            <div className="p-8 border-2 border-dashed border-gray-200 rounded-xl text-center">
              <MapPin size={24} className="text-gray-300 mx-auto mb-2"/>
              <p className="text-sm text-gray-400 mb-3">No locations added yet</p>
              <Btn size="sm" onClick={()=>setShowAddLocation(true)}><Plus size={12}/>Add First Location</Btn>
            </div>
          )}
        </div>
      </div>
    );

    // ── Step 2: Departments ───────────────────────────────────────────────────
    if (step === 2) return (
      <div className="space-y-4">
        <p className="text-sm text-gray-500">Define the department structure of your organization.</p>
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Btn variant="outline" size="sm"><Upload size={12}/>Import</Btn>
          </div>
          <Btn size="sm" onClick={()=>{setEditingDept(null);setDeptForm({name:"",code:"",head:"",parent:"None",desc:""});setShowAddDept(true);}}>
            <Plus size={12}/>Add Department
          </Btn>
        </div>
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <div className="bg-gray-50 px-4 py-2.5 grid grid-cols-5 gap-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
            <span className="col-span-2">Department</span><span>Code</span><span>Head</span><span>Parent</span>
          </div>
          {departments.map((d,i)=>(
            <div key={d.id} className="px-4 py-2.5 grid grid-cols-5 gap-3 text-sm border-t border-gray-100 hover:bg-gray-50 group">
              <span className="col-span-2 font-medium text-gray-800">{d.name}</span>
              <span className="text-gray-500 font-mono text-xs">{d.code}</span>
              <span className="text-gray-600 text-xs">{d.head||"—"}</span>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-xs">{d.parent}</span>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={()=>{setEditingDept(d.id);setDeptForm({name:d.name,code:d.code,head:d.head,parent:d.parent,desc:d.desc});setShowAddDept(true);}} className="p-0.5 hover:bg-gray-200 rounded"><Edit size={11} className="text-gray-400"/></button>
                  <button onClick={()=>deleteItem(departments,setDepartments,d.id)} className="p-0.5 hover:bg-red-100 rounded"><Trash2 size={11} className="text-red-400"/></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );

    // ── Step 3: Designations ──────────────────────────────────────────────────
    if (step === 3) return (
      <div className="space-y-4">
        <p className="text-sm text-gray-500">Define job titles and their levels within the organization hierarchy.</p>
        <div className="flex justify-end">
          <Btn size="sm" onClick={()=>{setEditingDesig(null);setDesigForm({name:"",code:"",level:"",desc:""});setShowAddDesig(true);}}>
            <Plus size={12}/>Add Designation
          </Btn>
        </div>
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <div className="bg-gray-50 px-4 py-2.5 grid grid-cols-4 gap-3 text-xs font-semibold text-gray-500 uppercase">
            <span className="col-span-2">Designation</span><span>Code</span><span>Level</span>
          </div>
          {designations.map(d=>(
            <div key={d.id} className="px-4 py-2.5 grid grid-cols-4 gap-3 text-sm border-t border-gray-100 hover:bg-gray-50 group">
              <span className="col-span-2 font-medium text-gray-800">{d.name}</span>
              <span className="text-gray-500 font-mono text-xs">{d.code}</span>
              <div className="flex items-center justify-between">
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-mono">{d.level}</span>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={()=>{setEditingDesig(d.id);setDesigForm({name:d.name,code:d.code,level:d.level,desc:d.desc});setShowAddDesig(true);}} className="p-0.5 hover:bg-gray-200 rounded"><Edit size={11} className="text-gray-400"/></button>
                  <button onClick={()=>deleteItem(designations,setDesignations,d.id)} className="p-0.5 hover:bg-red-100 rounded"><Trash2 size={11} className="text-red-400"/></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );

    // ── Step 4: Holidays ──────────────────────────────────────────────────────
    if (step === 4) return (
      <div className="space-y-4">
        <p className="text-sm text-gray-500">Set up company holidays. You can import or add manually.</p>
        <div className="flex items-center justify-between">
          <div className="flex gap-1 border border-gray-200 rounded-lg overflow-hidden">
            <button onClick={()=>setHolidayView("list")} className={cn("px-3 py-1.5 text-xs font-medium",holidayView==="list"?"bg-[#EEF2FF] text-[#5C5CFF]":"text-gray-500 hover:bg-gray-50")}>List</button>
            <button onClick={()=>setHolidayView("calendar")} className={cn("px-3 py-1.5 text-xs font-medium",holidayView==="calendar"?"bg-[#EEF2FF] text-[#5C5CFF]":"text-gray-500 hover:bg-gray-50")}>Calendar</button>
          </div>
          <div className="flex gap-2">
            <Btn variant="outline" size="sm"><Upload size={12}/>Import Holidays</Btn>
            <Btn size="sm" onClick={()=>{setHolidayForm({name:"",date:"",type:"National",locations:"All",desc:""});setShowAddHoliday(true);}}>
              <Plus size={12}/>Add Holiday
            </Btn>
          </div>
        </div>
        {holidayView==="list"?(
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <div className="bg-gray-50 px-4 py-2.5 grid grid-cols-5 gap-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
              <span className="col-span-2">Holiday</span><span>Date</span><span>Type</span><span>Locations</span>
            </div>
            {holidays.map(h=>(
              <div key={h.id} className="px-4 py-2.5 grid grid-cols-5 gap-3 text-sm border-t border-gray-100 hover:bg-gray-50 group">
                <span className="col-span-2 font-medium text-gray-800">{h.name}</span>
                <span className="text-gray-500 text-xs">{h.date}</span>
                <span className={cn("text-xs px-1.5 py-0.5 rounded w-fit self-center",h.type==="National"?"bg-blue-50 text-blue-600":h.type==="Company"?"bg-purple-50 text-purple-600":"bg-amber-50 text-amber-600")}>{h.type}</span>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-xs">{h.locations}</span>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-0.5 hover:bg-gray-200 rounded"><Edit size={11} className="text-gray-400"/></button>
                    <button onClick={()=>deleteItem(holidays,setHolidays,h.id)} className="p-0.5 hover:bg-red-100 rounded"><Trash2 size={11} className="text-red-400"/></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ):(
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="grid grid-cols-7 gap-1 mb-2">
              {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d=><div key={d} className="text-center text-[10px] font-semibold text-gray-400 py-1">{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {["","","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"].map((d,i)=>{
                const isHoliday = d==="4";
                return <div key={i} className={cn("h-9 flex items-center justify-center rounded-lg text-xs cursor-pointer",isHoliday?"bg-[#5C5CFF] text-white font-semibold":d?"hover:bg-gray-100 text-gray-600":"","")}>
                  {d&&<span>{d}</span>}
                  {isHoliday&&<div className="w-1 h-1 bg-white/50 rounded-full absolute mt-5"/>}
                </div>;
              })}
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100"><p className="text-xs font-medium text-gray-600 mb-2">Holidays this month</p>
              {holidays.filter(h=>h.date.startsWith("Jul")||h.date.startsWith("Jan")).slice(0,3).map(h=>(
                <div key={h.id} className="flex items-center gap-2 py-1.5"><div className="w-2 h-2 rounded-full bg-[#5C5CFF]"/><span className="text-xs text-gray-700">{h.date} — {h.name}</span></div>
              ))}
            </div>
          </div>
        )}
      </div>
    );

    // ── Step 5: Shift Setup ───────────────────────────────────────────────────
    if (step === 5) return (
      <div className="space-y-4">
        <p className="text-sm text-gray-500">Create shift templates defining working hours, grace periods, and assignment rules.</p>
        <div className="flex justify-end">
          <Btn size="sm" onClick={()=>{setEditingShift(null);setShiftForm({name:"",checkin:"09:00",checkout:"18:00",grace:"15 min",late:"15 min",halfday:"4 hrs",days:"Mon–Fri",locations:"All",depts:"All",color:"#5C5CFF"});setShowAddShift(true);}}>
            <Plus size={12}/>Create Shift
          </Btn>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {shifts.map(s=>(
            <div key={s.id} className="p-4 border border-gray-200 rounded-xl bg-white hover:border-[#5C5CFF]/30 transition-colors group">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{backgroundColor:s.color}}/>
                  <span className="text-sm font-semibold text-gray-800">{s.name}</span>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={()=>{setEditingShift(s.id);setShiftForm({...s});setShowAddShift(true);}} className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600"><Edit size={12}/></button>
                  <button className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600" title="Duplicate"><Copy size={12}/></button>
                  <button onClick={()=>deleteItem(shifts,setShifts,s.id)} className="p-1 hover:bg-red-50 rounded text-gray-400 hover:text-red-500"><Trash2 size={12}/></button>
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-2">{s.checkin} – {s.checkout} · {s.days}</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px] text-gray-400">
                <span>Grace: <strong className="text-gray-600">{s.grace}</strong></span>
                <span>Late Mark: <strong className="text-gray-600">{s.late}</strong></span>
                <span>Half Day: <strong className="text-gray-600">{s.halfday}</strong></span>
                <span>Locations: <strong className="text-gray-600">{s.locations}</strong></span>
              </div>
            </div>
          ))}
          <button onClick={()=>setShowAddShift(true)} className="p-4 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#5C5CFF]/40 transition-colors">
            <Plus size={20} className="text-gray-300"/>
            <span className="text-xs text-gray-400">Add Shift Template</span>
          </button>
        </div>
      </div>
    );

    // ── Step 6: Attendance Policy ─────────────────────────────────────────────
    if (step === 6) return (
      <div className="space-y-5">
        <p className="text-sm text-gray-500">Define how attendance is tracked, marked, and regularized across your organization.</p>
        <div className="grid grid-cols-2 gap-4">
          <InputField label="Working Hours / Day" value="9" type="number"/>
          <InputField label="Minimum Working Hours" value="6" type="number"/>
          <SelectField label="Late Mark After (grace)" options={["09:05 AM","09:10 AM","09:15 AM","09:30 AM","10:00 AM"]}/>
          <SelectField label="Half Day Threshold" options={["3 hours","4 hours","5 hours","6 hours"]}/>
          <SelectField label="Overtime Eligibility" options={["All Employees","Hourly Only","None"]}/>
          <SelectField label="Geo-fence Check-in" options={["Required","Optional","Disabled"]}/>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Check-in Methods</h4>
          <div className="grid grid-cols-2 gap-2">
            {attMethods.map(m=>(
              <div key={m.id} className={cn("flex items-center justify-between p-3 rounded-lg border text-sm transition-colors cursor-pointer",m.on?"bg-[#EEF2FF] border-[#5C5CFF]/30":"bg-gray-50 border-gray-200")} onClick={()=>toggleMethod(m.id)}>
                <div className="flex items-center gap-2">
                  <div className={cn("w-4 h-4 rounded flex items-center justify-center flex-shrink-0",m.on?"bg-[#5C5CFF]":"bg-gray-300")}>{m.on&&<Check size={10} className="text-white"/>}</div>
                  <span className={cn("text-xs font-medium",m.on?"text-[#5C5CFF]":"text-gray-600")}>{m.label}</span>
                </div>
                <span className={cn("text-[10px] font-medium",m.on?"text-green-600":"text-gray-400")}>{m.on?"On":"Off"}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="p-3 bg-[#EEF2FF] border border-[#5C5CFF]/20 rounded-lg">
          <p className="text-xs text-[#5C5CFF]">Attendance regularization allows employees to correct missed check-ins with manager approval.</p>
        </div>
      </div>
    );

    // ── Step 7: Leave Policy ──────────────────────────────────────────────────
    if (step === 7) return (
      <div className="space-y-4">
        <p className="text-sm text-gray-500">Configure leave types and their allocation rules.</p>
        <div className="flex justify-end">
          <Btn size="sm" onClick={()=>{setEditingLeave(null);setLeaveForm({name:"",code:"",days:"",carry:"No",maxCarry:"",neg:false,gender:"All",probation:false,attachment:false,approval:true,color:"#5C5CFF",desc:""});setShowAddLeave(true);}}>
            <Plus size={12}/>Add Leave Type
          </Btn>
        </div>
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <div className="bg-gray-50 px-4 py-2.5 grid grid-cols-5 gap-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
            <span className="col-span-2">Leave Type</span><span>Days/yr</span><span>Carry Fwd</span><span className="text-right">Actions</span>
          </div>
          {leaveTypes.map(l=>(
            <div key={l.id} className="px-4 py-3 grid grid-cols-5 gap-3 border-t border-gray-100 hover:bg-gray-50 group">
              <div className="col-span-2 flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{backgroundColor:l.color}}/>
                <div>
                  <span className="text-sm font-medium text-gray-800">{l.name}</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[10px] font-mono text-gray-400">{l.code}</span>
                    {!l.paid&&<span className="text-[9px] bg-gray-100 text-gray-500 px-1 rounded">Unpaid</span>}
                  </div>
                </div>
              </div>
              <span className="text-sm text-gray-700 self-center">{l.days||"∞"}</span>
              <span className="text-xs text-gray-500 self-center">{l.carry}</span>
              <div className="flex items-center justify-end gap-1">
                <button onClick={()=>{setEditingLeave(l.id);setLeaveForm({name:l.name,code:l.code,days:String(l.days),carry:l.carry,maxCarry:"",neg:l.neg,gender:"All",probation:false,attachment:false,approval:l.approval,color:l.color,desc:""});setShowAddLeave(true);}} className="p-1 hover:bg-gray-200 rounded"><Edit size={11} className="text-gray-400"/></button>
                <button className="p-1 hover:bg-gray-200 rounded" title="Duplicate"><Copy size={11} className="text-gray-400"/></button>
                <button onClick={()=>setLeaveTypes(lt=>lt.map(x=>x.id===l.id?{...x,enabled:!x.enabled}:x))} className={cn("w-7 h-4 rounded-full relative transition-colors flex-shrink-0",l.enabled?"bg-[#5C5CFF]":"bg-gray-300")}>
                  <div className={cn("absolute top-0.5 w-3 h-3 bg-white rounded-full shadow transition-transform",l.enabled?"left-3.5":"left-0.5")}/>
                </button>
                <button onClick={()=>deleteItem(leaveTypes,setLeaveTypes,l.id)} className="p-1 hover:bg-red-100 rounded"><Trash2 size={11} className="text-red-400"/></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );

    // ── Step 8: Review & Finish ───────────────────────────────────────────────
    if (step === 8) return (
      <div className="space-y-5">
        <div className="flex flex-col items-center text-center py-2">
          <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mb-4"><CheckCircle size={32} className="text-green-500"/></div>
          <h3 className="text-xl font-semibold text-gray-900 mb-1">Setup complete!</h3>
          <p className="text-sm text-gray-500 max-w-sm">Your workspace has been configured. Review the summary below before launching.</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            {label:"Locations",value:String(locations.length),icon:MapPin,color:"#5C5CFF",step:1},
            {label:"Departments",value:String(departments.length),icon:GitBranch,color:"#22C55E",step:2},
            {label:"Designations",value:String(designations.length),icon:Briefcase,color:"#F59E0B",step:3},
            {label:"Holidays",value:String(holidays.length),icon:Calendar,color:"#EF4444",step:4},
            {label:"Shifts",value:String(shifts.length),icon:Clock,color:"#8B5CF6",step:5},
            {label:"Leave Types",value:String(leaveTypes.length),icon:CalendarDays,color:"#06B6D4",step:7},
          ].map(c=>(
            <div key={c.label} className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:border-[#5C5CFF]/30 transition-colors">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{backgroundColor:c.color+"18"}}><c.icon size={18} style={{color:c.color}}/></div>
              <div className="flex-1">
                <p className="text-2xl font-bold text-gray-900">{c.value}</p>
                <p className="text-xs text-gray-500">{c.label} configured</p>
              </div>
              <button onClick={()=>setStep(c.step)} className="text-xs text-[#5C5CFF] hover:underline flex-shrink-0">Edit</button>
            </div>
          ))}
        </div>
        <div className="bg-[#EEF2FF] border border-[#5C5CFF]/20 rounded-xl p-4">
          <p className="text-xs font-semibold text-[#5C5CFF] mb-1">What comes next</p>
          <p className="text-xs text-[#5C5CFF]/80">After launching, you can add employees, configure roles and permissions, and set up approval workflows under <strong>Settings → Manage Account</strong>.</p>
        </div>
        <div className="space-y-2.5">
          <button onClick={onComplete} className="w-full py-3 bg-[#5C5CFF] text-white text-sm font-semibold rounded-xl hover:bg-[#4A4AE0] flex items-center justify-center gap-2 transition-colors">
            Go to Dashboard <ArrowRight size={16}/>
          </button>
          <button onClick={()=>setStep(0)} className="w-full py-2.5 border border-gray-300 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors">
            Review Setup
          </button>
        </div>
      </div>
    );
    return null;
  };

  // ── Helpers ──
  const MField = ({label,placeholder,type="text",value,onChange,required}:{label:string;placeholder?:string;type?:string;value?:string;onChange?:(v:string)=>void;required?:boolean}) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700">{label}{required&&<span className="text-red-500 ml-0.5">*</span>}</label>
      <input type={type} placeholder={placeholder} defaultValue={value} onChange={e=>onChange?.(e.target.value)} className="px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5C5CFF]"/>
    </div>
  );
  const MSelect = ({label,options,value,onChange,required}:{label:string;options:string[];value?:string;onChange?:(v:string)=>void;required?:boolean}) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700">{label}{required&&<span className="text-red-500 ml-0.5">*</span>}</label>
      <div className="relative"><select defaultValue={value} onChange={e=>onChange?.(e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-[#5C5CFF]">{options.map(o=><option key={o}>{o}</option>)}</select><ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"/></div>
    </div>
  );

  // Shared modal wrapper
  const SW = ({title,onClose,children,wide}:{title:string;onClose:()=>void;children:React.ReactNode;wide?:boolean}) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}/>
      <div className={cn("relative bg-white rounded-xl shadow-2xl flex flex-col",wide?"w-full max-w-xl":"w-full max-w-md")} style={{maxHeight:"90vh"}}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 flex-shrink-0">
          <h3 className="text-base font-semibold text-gray-900">{title}</h3>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-100"><X size={18}/></button>
        </div>
        <div className="overflow-auto flex-1 p-6 space-y-4">{children}</div>
      </div>
    </div>
  );

  return (
    <>
      {/* Modals */}

      {/* Add / Edit Location */}
      {showAddLocation&&(
        <SW title={editingLocation?"Edit Location":"Add Location"} onClose={()=>setShowAddLocation(false)} wide>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2"><MField label="Location Name" placeholder="e.g. New York HQ" value={locationForm.name} onChange={v=>setLocationForm(f=>({...f,name:v}))} required/></div>
            <div className="col-span-2"><MField label="Address" placeholder="350 Fifth Avenue" value={locationForm.address} onChange={v=>setLocationForm(f=>({...f,address:v}))} required/></div>
            <MField label="City" placeholder="New York" value={locationForm.city} onChange={v=>setLocationForm(f=>({...f,city:v}))}/>
            <MField label="State / Province" placeholder="NY" value={locationForm.state} onChange={v=>setLocationForm(f=>({...f,state:v}))}/>
            <MField label="Country" placeholder="United States" value={locationForm.country} onChange={v=>setLocationForm(f=>({...f,country:v}))} required/>
            <MField label="Pincode / ZIP" placeholder="10118" value={locationForm.pincode} onChange={v=>setLocationForm(f=>({...f,pincode:v}))}/>
            <MField label="Latitude (optional)" placeholder="40.7484" value={locationForm.lat} onChange={v=>setLocationForm(f=>({...f,lat:v}))}/>
            <MField label="Longitude (optional)" placeholder="-73.9967" value={locationForm.lng} onChange={v=>setLocationForm(f=>({...f,lng:v}))}/>
            <MSelect label="Geo-fence Radius" options={["50m","100m","150m","200m","300m","500m"]} value={locationForm.radius} onChange={v=>setLocationForm(f=>({...f,radius:v}))}/>
            <MSelect label="Time Zone" options={["(UTC-8) Pacific","(UTC-5) Eastern","(UTC+0) UTC","(UTC+1) CET","(UTC+5:30) IST"]} value={locationForm.tz} onChange={v=>setLocationForm(f=>({...f,tz:v}))}/>
            <MField label="Contact Person" placeholder="Alex Admin" value={locationForm.contact} onChange={v=>setLocationForm(f=>({...f,contact:v}))}/>
            <MField label="Contact Number" type="tel" placeholder="+1 212 000 0000" value={locationForm.phone} onChange={v=>setLocationForm(f=>({...f,phone:v}))}/>
          </div>
          <div className="flex justify-end gap-3 pt-2 border-t border-gray-200">
            <Btn variant="outline" onClick={()=>setShowAddLocation(false)}>Cancel</Btn>
            <Btn onClick={()=>{
              if (editingLocation) {
                setLocations(l=>l.map(x=>x.id===editingLocation?{...x,...locationForm}:x));
              } else {
                setLocations(l=>[...l,{id:`L${Date.now()}`,name:locationForm.name||"New Location",address:locationForm.address,city:locationForm.city,state:locationForm.state,country:locationForm.country,pincode:locationForm.pincode,tz:locationForm.tz,radius:locationForm.radius,contact:locationForm.contact,phone:locationForm.phone}]);
              }
              setShowAddLocation(false);
            }}>Save Location</Btn>
          </div>
        </SW>
      )}

      {/* Add / Edit Department */}
      {showAddDept&&(
        <SW title={editingDept?"Edit Department":"Add Department"} onClose={()=>setShowAddDept(false)}>
          <MField label="Department Name" placeholder="e.g. Customer Success" value={deptForm.name} onChange={v=>setDeptForm(f=>({...f,name:v}))} required/>
          <MField label="Department Code" placeholder="e.g. CS" value={deptForm.code} onChange={v=>setDeptForm(f=>({...f,code:v}))} required/>
          <MSelect label="Department Head (optional)" options={["None",...EMPLOYEES.map(e=>e.name)]} value={deptForm.head} onChange={v=>setDeptForm(f=>({...f,head:v==="None"?"":v}))}/>
          <MSelect label="Parent Department" options={["None",...departments.map(d=>d.name)]} value={deptForm.parent} onChange={v=>setDeptForm(f=>({...f,parent:v}))}/>
          <MField label="Description (optional)" placeholder="Brief description of this department" value={deptForm.desc} onChange={v=>setDeptForm(f=>({...f,desc:v}))}/>
          <div className="flex justify-end gap-3 pt-2 border-t border-gray-200">
            <Btn variant="outline" onClick={()=>setShowAddDept(false)}>Cancel</Btn>
            <Btn onClick={()=>{
              if (editingDept) {
                setDepartments(d=>d.map(x=>x.id===editingDept?{...x,...deptForm}:x));
              } else {
                setDepartments(d=>[...d,{id:`D${Date.now()}`,name:deptForm.name||"New Dept",code:deptForm.code,head:deptForm.head,parent:deptForm.parent==="None"?"—":deptForm.parent,desc:deptForm.desc}]);
              }
              setShowAddDept(false);
            }}>Save Department</Btn>
          </div>
        </SW>
      )}

      {/* Add / Edit Designation */}
      {showAddDesig&&(
        <SW title={editingDesig?"Edit Designation":"Add Designation"} onClose={()=>setShowAddDesig(false)}>
          <MField label="Designation Name" placeholder="e.g. Senior Product Manager" value={desigForm.name} onChange={v=>setDesigForm(f=>({...f,name:v}))} required/>
          <MField label="Code" placeholder="e.g. SPM-M2" value={desigForm.code} onChange={v=>setDesigForm(f=>({...f,code:v}))} required/>
          <MSelect label="Level" options={["IC1","IC2","IC3","IC4","IC5","M1","M2","M3","L5","L6","L7"]} value={desigForm.level} onChange={v=>setDesigForm(f=>({...f,level:v}))} required/>
          <MField label="Description (optional)" placeholder="Brief description" value={desigForm.desc} onChange={v=>setDesigForm(f=>({...f,desc:v}))}/>
          <div className="flex justify-end gap-3 pt-2 border-t border-gray-200">
            <Btn variant="outline" onClick={()=>setShowAddDesig(false)}>Cancel</Btn>
            <Btn onClick={()=>{
              if (editingDesig) {
                setDesignations(d=>d.map(x=>x.id===editingDesig?{...x,...desigForm}:x));
              } else {
                setDesignations(d=>[...d,{id:`G${Date.now()}`,name:desigForm.name,code:desigForm.code,level:desigForm.level,desc:desigForm.desc}]);
              }
              setShowAddDesig(false);
            }}>Save Designation</Btn>
          </div>
        </SW>
      )}

      {/* Add Holiday */}
      {showAddHoliday&&(
        <SW title="Add Holiday" onClose={()=>setShowAddHoliday(false)}>
          <MField label="Holiday Name" placeholder="e.g. Founders Day" value={holidayForm.name} onChange={v=>setHolidayForm(f=>({...f,name:v}))} required/>
          <MField label="Date" type="date" value={holidayForm.date} onChange={v=>setHolidayForm(f=>({...f,date:v}))} required/>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Type <span className="text-red-500">*</span></label>
            <div className="flex gap-2">
              {["National","Regional","Company"].map(t=>(
                <button key={t} onClick={()=>setHolidayForm(f=>({...f,type:t}))} className={cn("flex-1 py-2 rounded-lg border text-sm font-medium transition-colors",holidayForm.type===t?"border-[#5C5CFF] bg-[#EEF2FF] text-[#5C5CFF]":"border-gray-200 text-gray-600 hover:border-gray-300")}>{t}</button>
              ))}
            </div>
          </div>
          <MSelect label="Applicable Locations" options={["All",...locations.map(l=>l.name)]} value={holidayForm.locations} onChange={v=>setHolidayForm(f=>({...f,locations:v}))}/>
          <MField label="Description (optional)" placeholder="e.g. Observe Independence Day" value={holidayForm.desc} onChange={v=>setHolidayForm(f=>({...f,desc:v}))}/>
          <div className="flex justify-end gap-3 pt-2 border-t border-gray-200">
            <Btn variant="outline" onClick={()=>setShowAddHoliday(false)}>Cancel</Btn>
            <Btn onClick={()=>{
              const d = holidayForm.date ? new Date(holidayForm.date).toLocaleDateString("en-US",{month:"short",day:"numeric"}) : "";
              setHolidays(h=>[...h,{id:`H${Date.now()}`,name:holidayForm.name||"Holiday",date:d,type:holidayForm.type,locations:holidayForm.locations,desc:holidayForm.desc}]);
              setShowAddHoliday(false);
            }}>Save Holiday</Btn>
          </div>
        </SW>
      )}

      {/* Add / Edit Shift */}
      {showAddShift&&(
        <SW title={editingShift?"Edit Shift":"Create Shift"} onClose={()=>setShowAddShift(false)} wide>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2"><MField label="Shift Name" placeholder="e.g. Afternoon Shift" value={shiftForm.name} onChange={v=>setShiftForm(f=>({...f,name:v}))} required/></div>
            <MField label="Check-in Time" type="time" value={shiftForm.checkin} onChange={v=>setShiftForm(f=>({...f,checkin:v}))} required/>
            <MField label="Check-out Time" type="time" value={shiftForm.checkout} onChange={v=>setShiftForm(f=>({...f,checkout:v}))} required/>
            <MSelect label="Grace Period" options={["5 min","10 min","15 min","20 min","30 min"]} value={shiftForm.grace} onChange={v=>setShiftForm(f=>({...f,grace:v}))}/>
            <MSelect label="Late Mark After" options={["5 min","10 min","15 min","20 min","30 min"]} value={shiftForm.late} onChange={v=>setShiftForm(f=>({...f,late:v}))}/>
            <MSelect label="Half Day Rule" options={["3 hrs","4 hrs","5 hrs","6 hrs"]} value={shiftForm.halfday} onChange={v=>setShiftForm(f=>({...f,halfday:v}))}/>
            <MSelect label="Weekly Off" options={["Sat & Sun","Sun Only","Custom"]} value={shiftForm.days} onChange={v=>setShiftForm(f=>({...f,days:v}))}/>
            <MSelect label="Applicable Locations" options={["All",...locations.map(l=>l.name)]} value={shiftForm.locations} onChange={v=>setShiftForm(f=>({...f,locations:v}))}/>
            <MSelect label="Applicable Departments" options={["All",...departments.map(d=>d.name)]} value={shiftForm.depts} onChange={v=>setShiftForm(f=>({...f,depts:v}))}/>
            <div className="col-span-2">
              <label className="text-sm font-medium text-gray-700 block mb-2">Shift Color</label>
              <div className="flex gap-2">{["#5C5CFF","#22C55E","#F59E0B","#EF4444","#8B5CF6","#06B6D4","#EC4899","#F97316"].map(c=>(
                <button key={c} onClick={()=>setShiftForm(f=>({...f,color:c}))} className={cn("w-8 h-8 rounded-full border-2 transition-all",shiftForm.color===c?"border-gray-900 scale-110":"border-transparent hover:scale-105")} style={{backgroundColor:c}}/>
              ))}</div>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2 border-t border-gray-200">
            <Btn variant="outline" onClick={()=>setShowAddShift(false)}>Cancel</Btn>
            <Btn onClick={()=>{
              if (editingShift) {
                setShifts(s=>s.map(x=>x.id===editingShift?{...x,...shiftForm}:x));
              } else {
                setShifts(s=>[...s,{id:`S${Date.now()}`,...shiftForm,name:shiftForm.name||"New Shift"}]);
              }
              setShowAddShift(false);
            }}>Save Shift</Btn>
          </div>
        </SW>
      )}

      {/* Add / Edit Leave Type */}
      {showAddLeave&&(
        <SW title={editingLeave?"Edit Leave Type":"Add Leave Type"} onClose={()=>setShowAddLeave(false)} wide>
          <div className="grid grid-cols-2 gap-4">
            <MField label="Leave Name" placeholder="e.g. Paternity Leave" value={leaveForm.name} onChange={v=>setLeaveForm(f=>({...f,name:v}))} required/>
            <MField label="Leave Code" placeholder="e.g. PL" value={leaveForm.code} onChange={v=>setLeaveForm(f=>({...f,code:v}))} required/>
            <MField label="Annual Allocation (days)" type="number" placeholder="18" value={leaveForm.days} onChange={v=>setLeaveForm(f=>({...f,days:v}))}/>
            <MSelect label="Carry Forward" options={["No","Yes"]} value={leaveForm.carry} onChange={v=>setLeaveForm(f=>({...f,carry:v}))}/>
            {leaveForm.carry==="Yes"&&<MField label="Max Carry Forward (days)" type="number" placeholder="5" value={leaveForm.maxCarry} onChange={v=>setLeaveForm(f=>({...f,maxCarry:v}))}/>}
            <MSelect label="Gender Restriction" options={["All","Male Only","Female Only"]} value={leaveForm.gender} onChange={v=>setLeaveForm(f=>({...f,gender:v}))}/>
            <div className="col-span-2 space-y-2">
              {([["Negative Balance Allowed","neg"],["Probation Restriction","probation"],["Attachment Required","attachment"],["Approval Required","approval"]] as [string,keyof typeof leaveForm][]).map(([label,key])=>(
                <label key={key} className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={!!leaveForm[key]} onChange={e=>setLeaveForm(f=>({...f,[key]:e.target.checked}))} className="rounded accent-[#5C5CFF]"/>
                  <span className="text-sm text-gray-700">{label}</span>
                </label>
              ))}
            </div>
            <div className="col-span-2">
              <label className="text-sm font-medium text-gray-700 block mb-2">Color</label>
              <div className="flex gap-2">{["#22C55E","#EF4444","#F59E0B","#5C5CFF","#8B5CF6","#06B6D4","#EC4899","#6B7280"].map(c=>(
                <button key={c} onClick={()=>setLeaveForm(f=>({...f,color:c}))} className={cn("w-8 h-8 rounded-full border-2",leaveForm.color===c?"border-gray-900 scale-110":"border-transparent hover:scale-105")} style={{backgroundColor:c}}/>
              ))}</div>
            </div>
            <div className="col-span-2"><MField label="Description (optional)" placeholder="Brief description of this leave type" value={leaveForm.desc} onChange={v=>setLeaveForm(f=>({...f,desc:v}))}/>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2 border-t border-gray-200">
            <Btn variant="outline" onClick={()=>setShowAddLeave(false)}>Cancel</Btn>
            <Btn onClick={()=>{
              if (editingLeave) {
                setLeaveTypes(lt=>lt.map(x=>x.id===editingLeave?{...x,name:leaveForm.name,code:leaveForm.code,days:Number(leaveForm.days)||0,carry:leaveForm.carry==="Yes"?`Yes, max ${leaveForm.maxCarry||"?"}` : "No",neg:leaveForm.neg,paid:!leaveForm.neg,approval:leaveForm.approval,color:leaveForm.color}:x));
              } else {
                setLeaveTypes(lt=>[...lt,{id:`LT${Date.now()}`,name:leaveForm.name||"New Leave",code:leaveForm.code,days:Number(leaveForm.days)||0,carry:leaveForm.carry==="Yes"?`Yes, max ${leaveForm.maxCarry||"?"}` : "No",neg:leaveForm.neg,paid:!leaveForm.neg,approval:leaveForm.approval,color:leaveForm.color,enabled:true}]);
              }
              setShowAddLeave(false);
            }}>Save Leave Type</Btn>
          </div>
        </SW>
      )}

      {/* ── Wizard layout ── */}
      <div className="min-h-screen bg-[#F7F8FA] flex w-full">
      {/* Left checklist panel */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col flex-shrink-0">
        <div className="p-5 border-b border-gray-200">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-7 h-7 bg-[#5C5CFF] rounded-lg flex items-center justify-center flex-shrink-0"><Users size={14} className="text-white"/></div>
            <span className="font-semibold text-gray-800 text-sm truncate">Attendance HRMS</span>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
            <span className="font-medium">Workspace Setup</span>
            <span className="text-[#5C5CFF] font-semibold">{pct}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5">
            <div className="bg-[#5C5CFF] h-1.5 rounded-full transition-all duration-300" style={{width:`${pct}%`}}/>
          </div>
          <p className="text-[10px] text-gray-400 mt-1.5">Step {step+1} of {SETUP_STEPS.length}</p>
        </div>
        <div className="flex-1 overflow-auto py-2">
          {SETUP_STEPS.map((s,i)=>{
            const done=i<step; const active=i===step;
            return (
              <button key={i} onClick={()=>setStep(i)}
                className={cn("w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors",active?"bg-[#EEF2FF] text-[#5C5CFF]":done?"text-gray-700 hover:bg-gray-50":"text-gray-400 hover:bg-gray-50 hover:text-gray-600")}>
                <div className={cn("w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold transition-colors",active?"bg-[#5C5CFF] text-white":done?"bg-green-500 text-white":"bg-gray-200 text-gray-400")}>
                  {done?<Check size={10}/>:i+1}
                </div>
                <span className="text-xs">{s.label}</span>
                {done&&<Check size={12} className="ml-auto text-green-500 flex-shrink-0"/>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="h-14 bg-white border-b border-gray-200 flex items-center px-8 flex-shrink-0">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span>Setup</span><ChevronRight size={12}/><span className="text-gray-700 font-medium">{SETUP_STEPS[step].label}</span>
          </div>
          {saved&&<span className="ml-auto text-xs text-green-600 flex items-center gap-1.5 bg-green-50 px-2.5 py-1 rounded-full"><Check size={11}/>Draft saved</span>}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8 max-w-2xl w-full mx-auto">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">{SETUP_STEPS[step].label}</h2>
            </div>
            <StepContent/>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 bg-white px-8 py-3.5 flex items-center justify-between">
          <div className="flex gap-2">
            <Btn variant="outline" onClick={()=>step>0&&setStep(step-1)} disabled={step===0}><ChevronLeft size={14}/>Back</Btn>
            <Btn variant="ghost" onClick={saveDraft}>{saved ? "Saved ✓" : "Save Draft"}</Btn>
          </div>
          <div className="flex gap-2">
            <Btn variant="ghost" onClick={onComplete}>Cancel</Btn>
            {!isLast&&<Btn variant="ghost" onClick={()=>setStep(Math.min(step+1,SETUP_STEPS.length-1))}>Skip</Btn>}
            {!isLast&&<Btn onClick={()=>setStep(step+1)}>Save &amp; Continue<ChevronRight size={14}/></Btn>}
            {isLast&&<Btn onClick={onComplete}>Go to Dashboard<ArrowRight size={14}/></Btn>}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
