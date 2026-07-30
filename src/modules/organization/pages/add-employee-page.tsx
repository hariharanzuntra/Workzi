import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Send,
  RefreshCw,
  Copy,
  XCircle,
  Activity,
} from "lucide-react";
import { AppPage } from "@/shared/types";
import { cn } from "@/shared/utils";
import {
  Btn,
  StatusBadge,
  PageHeader,
  Modal,
  InputField,
  SelectField,
} from "@/shared/components";

export function AddEmployeePage({ navigate }: { navigate: (p: AppPage) => void }) {
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<"form" | "invite-review" | "invite-sent">("form");
  const [sending, setSending] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showActivity, setShowActivity] = useState(false);
  const [inviteActivity, setInviteActivity] = useState<{ action: string; time: string }[]>(
    []
  );
  const [inviteToken] = useState(() =>
    Math.random().toString(36).slice(2, 10).toUpperCase()
  );
  const STEPS = [
    "Personal Info",
    "Contact Details",
    "Employment",
    "Assign Team",
    "Shift & Leave",
    "Review",
  ];

  const empName = "John Smith";
  const empEmail = "john.smith@acmecorp.com";

  const handleSend = () => {
    setSending(true);
    setTimeout(() => {
      setInviteActivity([
        { action: "Invitation email sent", time: "Jul 15, 2024 · 10:32 AM" },
      ]);
      setSending(false);
      setPhase("invite-sent");
    }, 1200);
  };

  // ── Phase: invite-review ──────────────────────────────────────────────────
  if (phase === "invite-review")
    return (
      <div className="flex flex-col h-full text-left">
        <PageHeader
          title="Review &amp; Send Invitation"
          breadcrumbs={[
            { label: "Home", onClick: () => navigate("my-space") },
            { label: "Organization", onClick: () => navigate("organization") },
            { label: "Add Employee", onClick: () => setPhase("form") },
            { label: "Send Invitation" },
          ]}
        >
          <Btn variant="outline" onClick={() => setPhase("form")}>
            Edit Profile
          </Btn>
        </PageHeader>

        <div className="flex-1 overflow-auto">
          <div className="max-w-2xl mx-auto p-8 space-y-6">
            {/* Lifecycle bar */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 overflow-x-auto">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Employee Lifecycle
              </p>
              <div className="flex items-center gap-1 flex-wrap">
                {[
                  "Draft",
                  "Ready to Invite",
                  "Invitation Sent",
                  "Invitation Viewed",
                  "Accepted",
                  "Active",
                ].map((s, i) => (
                  <div key={s} className="flex items-center gap-1">
                    <div
                      className={cn(
                        "flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-colors",
                        s === "Ready to Invite"
                          ? "bg-indigo-100 text-indigo-700 ring-1 ring-indigo-300"
                          : "bg-gray-100 text-gray-400"
                      )}
                    >
                      {i < 1 && <Check size={10} />}
                      {s}
                    </div>
                    {i < 5 && (
                      <ChevronRight size={12} className="text-gray-300 flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Employee card */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-[#5C5CFF] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  JS
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-semibold text-gray-900">
                      {empName}
                    </h3>
                    <StatusBadge status="Ready to Invite" />
                  </div>
                  <p className="text-sm text-gray-500">
                    Software Engineer · Engineering
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    New York HQ · Joins Jul 15, 2024 · Reports to David Chen
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  ["Employee ID", "E016 (auto)"],
                  ["Employment Type", "Full-Time"],
                  ["Shift", "General 09:00–18:00"],
                ].map(([k, v]) => (
                  <div key={k} className="bg-gray-50 rounded-lg px-3 py-2.5">
                    <p className="text-[10px] text-gray-405 uppercase tracking-wide mb-0.5">
                      {k}
                    </p>
                    <p className="text-xs font-medium text-gray-800">{v}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Invitation details */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-5 py-3.5 border-b border-gray-100 flex items-center gap-2">
                <Send size={14} className="text-[#5C5CFF]" />
                <h4 className="text-sm font-semibold text-gray-800">
                  Invitation Details
                </h4>
              </div>
              {[
                ["To", empEmail],
                ["Subject", "You've been invited to Acme Corporation HRMS"],
                ["Expires In", "7 days — Jul 22, 2024"],
                ["Sent From", "noreply@acmecorp.hrms.app"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-center justify-between px-5 py-3 border-b border-gray-100 last:border-0"
                >
                  <span className="text-xs text-gray-500 w-24 flex-shrink-0">{k}</span>
                  <span className="text-sm font-medium text-gray-808 flex-1">{v}</span>
                </div>
              ))}
            </div>

            {/* Info box */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 space-y-2">
              <p className="text-xs font-semibold text-blue-900">
                What happens when you send the invitation
              </p>
              {[
                "An email is sent to john.smith@acmecorp.com with a secure activation link",
                "The employee sets their own password and completes their profile",
                "Their status changes from Invitation Sent → Accepted → Active",
                "Login is blocked until the employee accepts the invitation",
                "The invitation link expires in 7 days — you can resend anytime",
              ].map((s, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0 mt-0.5 text-[9px] font-bold text-blue-700">
                    {i + 1}
                  </div>
                  <p className="text-xs text-blue-700">{s}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 bg-white px-8 py-4 flex items-center justify-between">
          <Btn variant="outline" onClick={() => setPhase("form")}>
            <ChevronLeft size={16} />
            Back to Profile
          </Btn>
          <Btn onClick={handleSend} disabled={sending}>
            {sending ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sending…
              </>
            ) : (
              <>
                <Send size={15} />
                Send Invitation
              </>
            )}
          </Btn>
        </div>
      </div>
    );

  // ── Phase: invite-sent ─────────────────────────────────────────────────────
  if (phase === "invite-sent")
    return (
      <div className="flex flex-col h-full text-left">
        <PageHeader
          title="Invitation Sent"
          breadcrumbs={[
            { label: "Home", onClick: () => navigate("my-space") },
            { label: "Organization", onClick: () => navigate("organization") },
            { label: "Add Employee", onClick: () => setPhase("form") },
            { label: "Invitation Sent" },
          ]}
        />

        <div className="flex-1 overflow-auto">
          <div className="max-w-2xl mx-auto p-8 space-y-6">
            {/* Lifecycle bar */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 overflow-x-auto">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Employee Lifecycle
              </p>
              <div className="flex items-center gap-1 flex-wrap">
                {[
                  "Draft",
                  "Ready to Invite",
                  "Invitation Sent",
                  "Invitation Viewed",
                  "Accepted",
                  "Active",
                ].map((s, i) => (
                  <div key={s} className="flex items-center gap-1">
                    <div
                      className={cn(
                        "flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-colors",
                        i < 2
                          ? "bg-gray-100 text-gray-400 ring-1 ring-gray-200"
                          : s === "Invitation Sent"
                          ? "bg-amber-100 text-amber-700 ring-1 ring-amber-300"
                          : "bg-gray-100 text-gray-300"
                      )}
                    >
                      {i < 2 && <Check size={10} />}
                      {s}
                    </div>
                    {i < 5 && (
                      <ChevronRight
                        size={12}
                        className={cn("flex-shrink-0", i < 2 ? "text-[#5C5CFF]" : "text-gray-200")}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Success */}
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Send size={28} className="text-green-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Invitation sent successfully!
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                An invitation email was delivered to{" "}
                <strong className="text-gray-700">{empEmail}</strong>.
              </p>
              <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-1.5">
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                <span className="text-xs font-medium text-amber-700">
                  Waiting for {empName} to accept
                </span>
              </div>
            </div>

            {/* Invitation record */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
                <h4 className="text-sm font-semibold text-gray-800">
                  Invitation Record
                </h4>
                <StatusBadge status="Invitation Sent" />
              </div>
              {[
                ["Employee", empName],
                ["Email", empEmail],
                ["Sent At", "Jul 15, 2024 · 10:32 AM"],
                ["Expires", "Jul 22, 2024 · 10:32 AM (7 days)"],
                ["Token", `ACT-${inviteToken}`],
                ["Status", "Awaiting acceptance"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-center justify-between px-5 py-2.5 border-b border-gray-100 last:border-0"
                >
                  <span className="text-xs text-gray-500 w-24 flex-shrink-0">{k}</span>
                  <span className="text-xs font-medium text-gray-800 font-mono">
                    {v}
                  </span>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-5 py-3.5 border-b border-gray-100">
                <h4 className="text-sm font-semibold text-gray-800">Actions</h4>
              </div>
              {[
                {
                  icon: RefreshCw,
                  label: "Resend Invitation",
                  sub: `Resend to ${empEmail}`,
                  action: () =>
                    setInviteActivity((a) => [
                      ...a,
                      {
                        action: "Invitation resent",
                        time: "Jul 15, 2024 · 10:45 AM",
                      },
                    ]),
                  danger: false,
                },
                {
                  icon: Copy,
                  label: copied ? "Link Copied!" : "Copy Invitation Link",
                  sub: `acmecorp.hrms.app/activate/${inviteToken}`,
                  action: () => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  },
                  danger: false,
                },
                {
                  icon: Edit,
                  label: "Edit Employee",
                  sub: "Update profile before they activate",
                  action: () => setPhase("form"),
                  danger: false,
                },
                {
                  icon: Activity,
                  label: "View Invitation Activity",
                  sub: `${inviteActivity.length} event${
                    inviteActivity.length !== 1 ? "s" : ""
                  } recorded`,
                  action: () => setShowActivity((v) => !v),
                  danger: false,
                },
                {
                  icon: XCircle,
                  label: "Cancel Invitation",
                  sub: "Revoke link and return to Draft",
                  action: () => {},
                  danger: true,
                },
              ].map(({ icon: Icon, label, sub, action, danger }, i) => (
                <button
                  key={i}
                  onClick={action}
                  className={cn(
                    "w-full flex items-center gap-3 px-5 py-3.5 border-b border-gray-100 last:border-0 text-left transition-colors cursor-pointer bg-white",
                    danger ? "hover:bg-red-50" : "hover:bg-gray-50"
                  )}
                >
                  <div
                    className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                      danger ? "bg-red-50" : "bg-gray-100"
                    )}
                  >
                    <Icon
                      size={14}
                      className={danger ? "text-red-400" : "text-gray-500"}
                    />
                  </div>
                  <div className="flex-1">
                    <p
                      className={cn(
                        "text-sm font-medium",
                        danger ? "text-red-600" : "text-gray-808"
                      )}
                    >
                      {label}
                    </p>
                    <p className="text-[10px] text-gray-400">{sub}</p>
                  </div>
                  <ChevronRight size={13} className="text-gray-300" />
                </button>
              ))}
              {showActivity && inviteActivity.length > 0 && (
                <div className="bg-gray-50 px-5 py-3 space-y-1.5 border-t border-gray-100">
                  {inviteActivity.map((a, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-700">{a.action}</p>
                      </div>
                      <p className="text-[10px] text-gray-400">{a.time}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 bg-white px-8 py-4 flex items-center justify-between">
          <Btn variant="outline" onClick={() => navigate("organization")}>
            Back to Employee List
          </Btn>
          <Btn onClick={() => navigate("organization")}>Done</Btn>
        </div>
      </div>
    );

  // ── Phase: form ───────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-full text-left">
      <PageHeader
        title="Add Employee"
        breadcrumbs={[
          { label: "Home", onClick: () => navigate("my-space") },
          { label: "Organization", onClick: () => navigate("organization") },
          { label: "Add Employee" },
        ]}
      >
        <Btn variant="outline" onClick={() => navigate("organization")}>
          Cancel
        </Btn>
        <Btn variant="ghost" size="sm">
          Save Draft
        </Btn>
      </PageHeader>
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0 overflow-x-auto">
        <div className="flex items-center min-w-[600px]">
          {STEPS.map((s, i) => (
            <div key={i} className="flex items-center flex-1 last:flex-none">
              <button
                onClick={() => i < step && setStep(i)}
                className="flex flex-col items-center gap-1.5 flex-shrink-0 cursor-pointer"
              >
                <div
                  className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors",
                    i < step
                      ? "bg-green-500 text-white"
                      : i === step
                      ? "bg-[#5C5CFF] text-white"
                      : "bg-gray-100 text-gray-400"
                  )}
                >
                  {i < step ? <Check size={13} /> : i + 1}
                </div>
                <span
                  className={cn(
                    "text-[10px] whitespace-nowrap",
                    i === step
                      ? "text-[#5C5CFF] font-medium"
                      : i < step
                      ? "text-green-600"
                      : "text-gray-400"
                  )}
                >
                  {s}
                </span>
              </button>
              {i < STEPS.length - 1 && (
                <div
                  className={cn(
                    "h-0.5 flex-1 mx-2 mb-4",
                    i < step ? "bg-green-300" : "bg-gray-200"
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-2xl mx-auto">
          {step === 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">
                Personal Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <InputField label="First Name" placeholder="John" required />
                <InputField label="Last Name" placeholder="Smith" required />
                <div className="col-span-2">
                  <InputField
                    label="Work Email"
                    type="email"
                    placeholder="john.smith@company.com"
                    required
                  />
                </div>
                <InputField label="Date of Birth" type="date" />
                <SelectField label="Gender">
                  <option>Select…</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Non-binary</option>
                  <option>Prefer not to say</option>
                </SelectField>
                <InputField label="National ID" placeholder="ABC-123456" />
                <SelectField label="Nationality">
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>Canada</option>
                  <option>India</option>
                  <option>Other</option>
                </SelectField>
              </div>
            </div>
          )}
          {step === 1 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">
                Contact Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="Phone Number"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  required
                />
                <InputField
                  label="Personal Email"
                  type="email"
                  placeholder="john@gmail.com"
                />
                <div className="col-span-2">
                  <InputField label="Address" placeholder="123 Main Street, Apt 4B" />
                </div>
                <InputField label="City" placeholder="New York" />
                <InputField label="Zip Code" placeholder="10001" />
                <InputField label="Emergency Contact" placeholder="Jane Smith" required />
                <InputField
                  label="Emergency Phone"
                  type="tel"
                  placeholder="+1 (555) 000-0001"
                  required
                />
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">
                Employment Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <InputField label="Employee ID" placeholder="Auto-generated: E016" />
                <InputField label="Join Date" type="date" required />
                <SelectField label="Employment Type">
                  <option>Full-Time</option>
                  <option>Part-Time</option>
                  <option>Contract</option>
                  <option>Intern</option>
                </SelectField>
                <SelectField label="Department">
                  <option>Engineering</option>
                  <option>Product</option>
                  <option>Design</option>
                  <option>Marketing</option>
                  <option>Sales</option>
                  <option>Finance</option>
                  <option>HR</option>
                  <option>Legal</option>
                  <option>Operations</option>
                </SelectField>
                <div className="col-span-2">
                  <InputField
                    label="Designation / Job Title"
                    placeholder="Software Engineer"
                    required
                  />
                </div>
                <SelectField label="Branch">
                  <option>New York HQ</option>
                  <option>San Francisco</option>
                  <option>Chicago</option>
                  <option>Austin</option>
                </SelectField>
                <SelectField label="Work Mode">
                  <option>Office</option>
                  <option>WFH</option>
                  <option>Hybrid</option>
                </SelectField>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">
                Assign Team
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <SelectField label="Reporting Manager">
                    <option>David Chen – VP Engineering</option>
                    <option>Priya Sharma – Lead Designer</option>
                    <option>Marcus Johnson – Product Manager</option>
                    <option>Carlos Rivera – Marketing Director</option>
                  </SelectField>
                </div>
                <SelectField label="Business Unit">
                  <option>North America Operations</option>
                  <option>EMEA Operations</option>
                  <option>APAC Operations</option>
                  <option>Global Product &amp; Engineering</option>
                </SelectField>
                <SelectField label="Team">
                  <option>Frontend</option>
                  <option>Backend</option>
                  <option>Mobile</option>
                  <option>DevOps</option>
                  <option>QA</option>
                  <option>Design System</option>
                </SelectField>
              </div>
            </div>
          )}
          {step === 4 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">
                Shift &amp; Leave
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <SelectField label="Shift Template">
                  <option>General (9am–6pm)</option>
                  <option>Morning (6am–3pm)</option>
                  <option>Evening (2pm–11pm)</option>
                  <option>Night (10pm–7am)</option>
                </SelectField>
                <SelectField label="Leave Policy">
                  <option>Standard Policy</option>
                  <option>Executive Policy</option>
                  <option>Contractor Policy</option>
                </SelectField>
                <SelectField label="Weekly Off">
                  <option>Saturday &amp; Sunday</option>
                  <option>Sunday only</option>
                  <option>Custom</option>
                </SelectField>
                <SelectField label="Holiday Calendar">
                  <option>US Federal 2024</option>
                  <option>New York State 2024</option>
                  <option>California State 2024</option>
                </SelectField>
              </div>
            </div>
          )}
          {step === 5 && (
            <div className="space-y-5">
              {/* Lifecycle notice */}
              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex items-start gap-3">
                <Send size={15} className="text-indigo-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-indigo-900">
                    Next: Send invitation email
                  </p>
                  <p className="text-xs text-indigo-755 mt-0.5">
                    Saving creates a "Ready to Invite" profile. The employee won't
                    be able to log in until they accept the invitation and create a
                    password.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-sm font-semibold text-gray-800 mb-4">
                  Review Profile
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      label: "Personal",
                      items: [
                        ["Name", "John Smith"],
                        ["Work Email", "john.smith@acmecorp.com"],
                        ["Join Date", "Jul 15, 2024"],
                      ],
                    },
                    {
                      label: "Employment",
                      items: [
                        ["Department", "Engineering"],
                        ["Designation", "Software Engineer"],
                        ["Branch", "New York HQ"],
                      ],
                    },
                    {
                      label: "Team",
                      items: [
                        ["Manager", "David Chen – VP Engineering"],
                        ["Shift", "General (9am–6pm)"],
                        ["Leave Policy", "Standard Policy"],
                      ],
                    },
                  ].map((s) => (
                    <div key={s.label} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                          {s.label}
                        </h4>
                        <button
                          onClick={() =>
                            setStep(["Personal", "Employment", "Team"].indexOf(s.label) * 2)
                          }
                          className="text-xs text-[#5C5CFF] hover:underline cursor-pointer"
                        >
                          Edit
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {s.items.map(([k, v]) => (
                          <div key={k}>
                            <div className="text-xs text-gray-400">{k}</div>
                            <div className="text-sm font-medium text-gray-808">
                              {v}
                            </div>
                          </div>
                        ))}
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
        <Btn variant="outline" onClick={() => (step > 0 ? setStep(step - 1) : navigate("organization"))}>
          <ChevronLeft size={16} />
          Back
        </Btn>
        {step < STEPS.length - 1 ? (
          <Btn onClick={() => setStep(step + 1)}>
            Continue
            <ChevronRight size={16} />
          </Btn>
        ) : (
          <Btn onClick={() => setPhase("invite-review")}>
            <Send size={15} />
            Save &amp; Send Invitation
          </Btn>
        )}
      </div>
    </div>
  );
}
