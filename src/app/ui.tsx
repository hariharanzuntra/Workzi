import React from "react";
import { X, ChevronDown, ChevronRight, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "./data";

export function Avt({ initials, color, size="md" }: { initials:string; color:string; size?:"sm"|"md"|"lg"|"xl" }) {
  const sz = { sm:"w-7 h-7 text-xs", md:"w-8 h-8 text-sm", lg:"w-10 h-10 text-sm", xl:"w-14 h-14 text-base" }[size];
  return <div className={cn("rounded-full flex items-center justify-center font-medium text-white flex-shrink-0",sz)} style={{backgroundColor:color}}>{initials}</div>;
}

export function StatusBadge({ status }: { status:string }) {
  const map: Record<string,string> = {
    "Active":"bg-green-50 text-green-700 ring-1 ring-green-200",
    "On Leave":"bg-amber-50 text-amber-700 ring-1 ring-amber-200",
    "Inactive":"bg-gray-100 text-gray-500 ring-1 ring-gray-200",
    "Contract":"bg-blue-50 text-blue-700 ring-1 ring-blue-200",
    "Present":"bg-green-50 text-green-700 ring-1 ring-green-200",
    "Absent":"bg-red-50 text-red-700 ring-1 ring-red-200",
    "Late":"bg-amber-50 text-amber-700 ring-1 ring-amber-200",
    "WFH":"bg-blue-50 text-blue-700 ring-1 ring-blue-200",
    "Pending":"bg-amber-50 text-amber-700 ring-1 ring-amber-200",
    "Approved":"bg-green-50 text-green-700 ring-1 ring-green-200",
    "Rejected":"bg-red-50 text-red-700 ring-1 ring-red-200",
    "Published":"bg-green-50 text-green-700 ring-1 ring-green-200",
    "Draft":"bg-gray-100 text-gray-500 ring-1 ring-gray-200",
    "Scheduled":"bg-blue-50 text-blue-700 ring-1 ring-blue-200",
    "Archived":"bg-gray-100 text-gray-400 ring-1 ring-gray-200",
    // Employee lifecycle
    "Ready to Invite":"bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200",
    "Invitation Sent":"bg-amber-50 text-amber-700 ring-1 ring-amber-200",
    "Invitation Viewed":"bg-purple-50 text-purple-700 ring-1 ring-purple-200",
    "Accepted":"bg-teal-50 text-teal-700 ring-1 ring-teal-200",
  };
  return <span className={cn("inline-flex items-center px-2 py-0.5 rounded text-xs font-medium",map[status]||"bg-gray-100 text-gray-600")}>{status}</span>;
}

export function Btn({ children, variant="primary", size="md", onClick, className, disabled }: {
  children:React.ReactNode; variant?:"primary"|"secondary"|"ghost"|"danger"|"outline";
  size?:"sm"|"md"|"lg"; onClick?:()=>void; className?:string; disabled?:boolean;
}) {
  const base = "inline-flex items-center gap-1.5 font-medium rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
  const vs = { primary:"bg-[#5C5CFF] text-white hover:bg-[#4A4AE0] focus:ring-[#5C5CFF]", secondary:"bg-gray-100 text-gray-700 hover:bg-gray-200", ghost:"text-gray-600 hover:bg-gray-100", danger:"bg-red-500 text-white hover:bg-red-600", outline:"border border-gray-300 text-gray-700 hover:bg-gray-50" };
  const ss = { sm:"px-2.5 py-1.5 text-xs", md:"px-3.5 py-2 text-sm", lg:"px-5 py-2.5 text-sm" };
  return <button className={cn(base,vs[variant],ss[size],className)} onClick={onClick} disabled={disabled}>{children}</button>;
}

export function KPICard({ title, value, sub, trend, icon:Icon, iconColor, onClick }: {
  title:string; value:string; sub:string; trend?:"up"|"down"|"neutral";
  icon:any; iconColor:string; onClick?:()=>void;
}) {
  return (
    <div className={cn("bg-white rounded-lg border border-gray-200 p-4 flex flex-col gap-2",onClick&&"cursor-pointer hover:border-[#5C5CFF]/40 hover:shadow-sm transition-all")} onClick={onClick}>
      <div className="flex items-start justify-between">
        <span className="text-xs text-gray-500 font-medium">{title}</span>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{backgroundColor:iconColor+"18"}}><Icon size={16} style={{color:iconColor}} /></div>
      </div>
      <div>
        <div className="text-xl font-bold text-gray-900">{value}</div>
        <div className={cn("text-[11px] mt-0.5 flex items-center gap-1",trend==="up"?"text-green-600":trend==="down"?"text-red-500":"text-gray-500")}>
          {trend==="up"&&<ArrowUpRight size={10}/>}{trend==="down"&&<ArrowDownRight size={10}/>}{sub}
        </div>
      </div>
    </div>
  );
}

export function PageHeader({ title, subtitle, breadcrumbs, children }: {
  title:string; subtitle?:string; breadcrumbs?:{label:string;onClick?:()=>void}[]; children?:React.ReactNode;
}) {
  return (
    <div className="px-6 py-3 border-b border-gray-200 bg-white flex items-center justify-between gap-4">
      <div>
        {breadcrumbs&&<div className="flex items-center gap-1 text-xs text-gray-400 mb-0.5">{breadcrumbs.map((b,i)=>(
          <span key={i} className="flex items-center gap-1">{i>0&&<ChevronRight size={10}/>}<span className={cn(b.onClick?"cursor-pointer hover:text-[#5C5CFF] text-gray-500":"text-gray-400")} onClick={b.onClick}>{b.label}</span></span>
        ))}</div>}
        <h1 className="text-base font-semibold text-gray-900">{title}</h1>
        {subtitle&&<p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
      {children&&<div className="flex items-center gap-1.5 flex-shrink-0">{children}</div>}
    </div>
  );
}

export function Modal({ title, onClose, children, width="max-w-lg" }: {
  title:string; onClose:()=>void; children:React.ReactNode; width?:string;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30" onClick={onClose}/>
      <div className={cn("relative bg-white rounded-xl shadow-xl w-full flex flex-col max-h-[90vh]",width)}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-base font-semibold text-gray-900">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100"><X size={18}/></button>
        </div>
        <div className="overflow-auto flex-1 p-6">{children}</div>
      </div>
    </div>
  );
}

export function TabBar({ tabs, active, onChange }: { tabs:string[]; active:string; onChange:(t:string)=>void }) {
  return (
    <div className="flex border-b border-gray-200 bg-white px-6 overflow-x-auto">
      {tabs.map(t=>(
        <button key={t} onClick={()=>onChange(t)} className={cn("px-4 py-3 text-sm font-medium border-b-2 -mb-px whitespace-nowrap transition-colors",active===t?"border-[#5C5CFF] text-[#5C5CFF]":"border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300")}>{t}</button>
      ))}
    </div>
  );
}

export function InputField({ label, type="text", placeholder, value, onChange, required }: {
  label:string; type?:string; placeholder?:string; value?:string; onChange?:(v:string)=>void; required?:boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700">{label}{required&&<span className="text-red-500 ml-0.5">*</span>}</label>
      <input type={type} placeholder={placeholder} value={value} onChange={e=>onChange?.(e.target.value)} className="px-3 py-2 text-sm border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5C5CFF] focus:border-transparent" />
    </div>
  );
}

export function SelectField({ label, options, value, onChange, required, children }: {
  label:string; options?:string[]; value?:string; onChange?:(v:string)=>void; required?:boolean; children?:React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5 text-left">
      <label className="text-sm font-medium text-gray-700">{label}{required&&<span className="text-red-500 ml-0.5">*</span>}</label>
      <div className="relative">
        <select value={value} onChange={e=>onChange?.(e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-[#5C5CFF] focus:border-transparent">
          {options ? options.map(o=><option key={o}>{o}</option>) : children}
        </select>
        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"/>
      </div>
    </div>
  );
}
