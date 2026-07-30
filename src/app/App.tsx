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
  Pin, Bookmark, Share2, Printer, Paperclip, MessageCircle, MessageSquare, Archive, Monitor,
  Play, Circle, LayoutGrid
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
import { Avt, StatusBadge, Btn, KPICard, PageHeader, Modal, TabBar, InputField, SelectField, Drawer } from "./ui";
import { OrganizationPage } from "./OrganizationPage";
import { AppHeader, SegmentedControl } from "./AppHeader";
import { ManageAccountPage } from "./ManageAccount";
import { SetupWizard, LoginPage, CreateAdminAccountPage, GettingStartedPage } from "@/modules/auth";
import { MySpacePage } from "./MySpacePage";
import { TasksPage } from "@/modules/tasks";
import { DocumentsPage } from "@/modules/documents";
import { SettingsPage } from "@/modules/settings";
import { SupportPage } from "@/modules/support";
import { NotificationCenterPage } from "@/modules/notifications";
import { Sidebar } from "./layouts/sidebar";
import { AIPanel } from "./layouts/ai-panel";
import { NotificationsPanel } from "./layouts/notifications-panel";
import { QuickActionsMenu } from "./layouts/quick-actions-menu";


const getAttendanceDetails = (emp: Employee) => {
  const record = ATTENDANCE_RECORDS.find(r => r.id === emp.id || r.name === emp.name);
  if (record) {
    let status = record.status;
    let displayStatus = "Checked Out";
    let dotColor = "bg-gray-300";
    
    if (status === "Present") {
      displayStatus = "Checked In";
      dotColor = "bg-green-500 animate-pulse";
    } else if (status === "Late") {
      displayStatus = "Late";
      dotColor = "bg-amber-500";
    } else if (status === "WFH") {
      displayStatus = "WFH";
      dotColor = "bg-blue-500";
    } else if (status === "On Leave") {
      displayStatus = "On Leave";
      dotColor = "bg-purple-500";
    } else if (status === "Absent") {
      displayStatus = "Checked Out";
      dotColor = "bg-gray-300";
    }
    
    return {
      status: displayStatus,
      dotColor,
      checkIn: record.checkIn !== "–" ? record.checkIn + " AM" : "–",
      workingHours: record.hours > 0 ? `${Math.floor(record.hours)}h ${Math.round((record.hours % 1) * 60)}m` : "–"
    };
  }
  
  let displayStatus = "Checked Out";
  let dotColor = "bg-gray-300";
  if (emp.status === "On Leave") {
    displayStatus = "On Leave";
    dotColor = "bg-purple-500";
  } else if (emp.status === "Active") {
    displayStatus = "Checked In";
    dotColor = "bg-green-500 animate-pulse";
  }
  
  return {
    status: displayStatus,
    dotColor,
    checkIn: "09:00 AM",
    workingHours: "8h 00m"
  };
};

const getVisibleEmployeesForOrg = (filteredEmployees: Employee[], allEmployees: Employee[]) => {
  const visible = new Set<string>();
  
  filteredEmployees.forEach(emp => {
    visible.add(emp.id);
    
    let current = emp;
    while (current) {
      const manager = allEmployees.find(e => e.name === current.manager);
      if (manager && !visible.has(manager.id)) {
        visible.add(manager.id);
        current = manager;
      } else {
        break;
      }
    }
  });
  
  return allEmployees.filter(e => visible.has(e.id));
};

const OrgTreeNode = ({
  employee,
  allEmployees,
  expandedNodes,
  toggleExpand,
  onSelect
}: {
  employee: Employee;
  allEmployees: Employee[];
  expandedNodes: Record<string, boolean>;
  toggleExpand: (id: string) => void;
  onSelect: (e: Employee) => void;
}) => {
  const directReports = allEmployees.filter(e => e.manager === employee.name);
  const hasReports = directReports.length > 0;
  const isExpanded = !!expandedNodes[employee.id];
  const att = getAttendanceDetails(employee);

  return (
    <div className="flex flex-col text-left">
      <div 
        className="flex items-center gap-3 py-2 px-3 hover:bg-gray-50 rounded-lg cursor-pointer group transition-all relative w-fit min-w-[220px] max-w-sm border border-gray-200 bg-white shadow-sm"
        onClick={() => onSelect(employee)}
      >
        <Avt initials={employee.initials} color={employee.color} size="sm" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-800 group-hover:text-[#5C5CFF] transition-colors truncate">{employee.name}</span>
            <div className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", att.dotColor)} />
          </div>
          <p className="text-[10px] text-gray-500 truncate">{employee.designation}</p>
        </div>
        
        {hasReports && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleExpand(employee.id);
            }}
            className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>
        )}
      </div>

      {hasReports && isExpanded && (
        <div className="pl-6 ml-4 border-l border-dashed border-gray-300 space-y-3 pt-3 pb-1">
          {directReports.map(report => (
            <div key={report.id} className="relative">
              <div className="absolute -left-6 top-5 w-6 border-t border-dashed border-gray-300" />
              <OrgTreeNode
                employee={report}
                allEmployees={allEmployees}
                expandedNodes={expandedNodes}
                toggleExpand={toggleExpand}
                onSelect={onSelect}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const DEPT_INFO: Record<string, { head: string; location: string; details: string }> = {
  Engineering: { head: "David Chen", location: "New York HQ", details: "Software development and infrastructure" },
  Product: { head: "Marcus Johnson", location: "New York HQ", details: "Product management and strategy" },
  Design: { head: "Priya Sharma", location: "New York HQ", details: "UX and visual design" },
  Marketing: { head: "Carlos Rivera", location: "Austin Branch", details: "Brand and growth marketing" },
  Finance: { head: "Jennifer Walsh", location: "New York HQ", details: "Finance and accounting" },
  HR: { head: "Aisha Thompson", location: "New York HQ", details: "Human resources and people ops" },
  Management: { head: "Alex Admin", location: "Chennai HQ", details: "Executive leadership and administration" },
  Sales: { head: "James O'Brien", location: "San Francisco Branch", details: "Enterprise and growth sales" },
};

const depts = ["All",...Array.from(new Set(EMPLOYEES.map(e=>e.dept))).sort()];
const desigs = ["All",...Array.from(new Set(EMPLOYEES.map(e=>e.designation))).sort()];
const locations = ["All",...Array.from(new Set(EMPLOYEES.map(e=>e.branch))).sort()];

interface FeedReaction {
  emoji: string;
  users: string[];
}

interface FeedComment {
  id: string;
  author: string;
  initials: string;
  color: string;
  text: string;
  time: string;
  edited?: boolean;
  editedTime?: string;
  reactions?: FeedReaction[];
  replies?: FeedComment[];
  attachment?: { name: string; type: "image" | "file"; size: string };
  collapsed?: boolean;
}

interface FeedPost {
  id: string;
  author: string;
  initials: string;
  color: string;
  time: string;
  text: string;
  dept: string;
  designation: string;
  pinned: boolean;
  saved?: boolean;
  priority?: "High" | "Medium" | "Low";
  resolved?: boolean;
  edited?: boolean;
  editedTime?: string;
  reactions: FeedReaction[];
  comments: FeedComment[];
  followers?: string[];
  attachments?: { name: string; type: "image" | "file"; size: string }[];
}

function MentionPopup({ text, setText }: { text: string; setText: (s: string) => void }) {
  const atIndex = text.lastIndexOf("@");
  if (atIndex === -1) return null;

  // Verify there is no whitespace after @
  const postAt = text.slice(atIndex);
  if (postAt.includes(" ")) return null;

  const query = postAt.slice(1).toLowerCase();
  const matched = EMPLOYEES.filter(e => e.name.toLowerCase().includes(query)).slice(0, 4);

  if (matched.length === 0) return null;

  return (
    <div className="absolute left-3 bottom-full mb-1 bg-white border border-gray-200 rounded-xl shadow-xl z-50 py-1 w-56 text-left">
      <div className="px-3 py-1.5 border-b border-gray-100"><span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Mention Teammate</span></div>
      <div className="max-h-36 overflow-auto">
        {matched.map(emp => (
          <button
            key={emp.id}
            onClick={() => {
              const before = text.slice(0, atIndex);
              setText(before + `@${emp.name} `);
            }}
            className="w-full px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2"
          >
            <Avt initials={emp.initials} color={emp.color} size="xs" />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-805 truncate">{emp.name}</p>
              <p className="text-[9px] text-gray-400 truncate">{emp.dept}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function CornerDownRight(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || "24"}
      height={props.size || "24"}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="15 10 20 15 15 20" />
      <path d="M4 4v7a4 4 0 0 0 4 4h12" />
    </svg>
  );
}

function DiscussionCard({
  post,
  isPinned,
  isSaved,
  isResolved,
  isFollower,
  isAuthor,
  isManagerOrAdmin,
  onTogglePin,
  onToggleSave,
  onToggleResolve,
  onToggleFollow,
  onDelete,
  onEdit,
  onToggleReaction,
  onAddComment,
  onEditComment,
  onDeleteComment
}: {
  post: FeedPost;
  isPinned: boolean;
  isSaved: boolean;
  isResolved: boolean;
  isFollower: boolean;
  isAuthor: boolean;
  isManagerOrAdmin: boolean;
  onTogglePin: (id: string) => void;
  onToggleSave: (id: string) => void;
  onToggleResolve: (id: string) => void;
  onToggleFollow: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (post: FeedPost) => void;
  onToggleReaction: (postId: string, emoji: string, commentId?: string) => void;
  onAddComment: (postId: string, parentCommentId: string | null, text: string, attachment?: any) => void;
  onEditComment: (postId: string, commentId: string, text: string) => void;
  onDeleteComment: (postId: string, commentId: string) => void;
}) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showComments, setShowComments] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [commentAttachment, setCommentAttachment] = useState<any>(null);
  
  // Threading/Reply target state
  const [replyToCommentId, setReplyToCommentId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  
  // Comment Edit target state
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingCommentText, setEditingCommentText] = useState("");

  // Collapse replies state
  const [collapsedReplies, setCollapsedReplies] = useState<Record<string, boolean>>({});

  const emojiOptions = ["👍", "❤️", "🎉", "😮", "👏", "💡", "📌"];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/feed/discussion/${post.id}`);
    alert("Discussion link copied to clipboard!");
    setShowMenu(false);
  };

  return (
    <div className="group relative bg-white border border-[#EEEFF2] rounded-[12px] p-5 shadow-sm hover:border-[#5C5CFF]/30 transition-all text-left">
      {/* Floating Hover Action Bar */}
      <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity flex items-center bg-white border border-[#E8E9ED] rounded-[8px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-1 gap-1 z-10">
        {/* React Trigger */}
        <div className="relative">
          <button
            onClick={() => setShowEmojiPicker(prev => !prev)}
            className={cn("p-1.5 rounded hover:bg-gray-50 text-gray-500 hover:text-gray-755", showEmojiPicker && "bg-gray-100")}
            title="React"
          >
            <Star size={14} />
          </button>
          {showEmojiPicker && (
            <div className="absolute bottom-full right-0 mb-2 bg-white border border-gray-200 rounded-full shadow-lg p-1.5 flex gap-1 z-25">
              {emojiOptions.map(emoji => (
                <button
                  key={emoji}
                  onClick={() => {
                    onToggleReaction(post.id, emoji);
                    setShowEmojiPicker(false);
                  }}
                  className="w-7 h-7 flex items-center justify-center text-sm rounded-full hover:bg-gray-100 transition-colors"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Comment Trigger */}
        <button
          onClick={() => setShowComments(prev => !prev)}
          className="p-1.5 rounded hover:bg-gray-50 text-gray-550 hover:text-gray-700"
          title="Comment"
        >
          <MessageCircle size={14} />
        </button>

        {/* Save Toggle */}
        <button
          onClick={() => onToggleSave(post.id)}
          className={cn("p-1.5 rounded hover:bg-gray-50", isSaved ? "text-[#5C5CFF]" : "text-gray-500")}
          title={isSaved ? "Saved" : "Save"}
        >
          <Bookmark size={14} fill={isSaved ? "currentColor" : "none"} />
        </button>

        {/* Follow Toggle */}
        <button
          onClick={() => onToggleFollow(post.id)}
          className={cn("p-1.5 rounded hover:bg-gray-50 text-xs font-semibold px-2 flex items-center gap-1", isFollower ? "text-green-600 bg-green-50" : "text-gray-500")}
          title={isFollower ? "Following" : "Follow"}
        >
          <Bell size={12} fill={isFollower ? "currentColor" : "none"} />
          <span>{isFollower ? "Following" : "Follow"}</span>
        </button>

        {/* Overflow Menu trigger */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(prev => !prev)}
            className="p-1.5 rounded hover:bg-gray-50 text-gray-550 hover:text-gray-700"
          >
            <MoreHorizontal size={14} />
          </button>
          {showMenu && (
            <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-20 py-1 w-44 text-left">
              {(isAuthor || isManagerOrAdmin) && (
                <button
                  onClick={() => {
                    onEdit(post);
                    setShowMenu(false);
                  }}
                  className="w-full px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  <Edit size={12} />
                  <span>Edit Post</span>
                </button>
              )}
              {isManagerOrAdmin && (
                <button
                  onClick={() => {
                    onTogglePin(post.id);
                    setShowMenu(false);
                  }}
                  className="w-full px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  <Pin size={12} />
                  <span>{isPinned ? "Unpin Post" : "Pin Post"}</span>
                </button>
              )}
              <button
                onClick={() => {
                  onToggleSave(post.id);
                  setShowMenu(false);
                }}
                className="w-full px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
                <Bookmark size={12} />
                <span>{isSaved ? "Unsave Post" : "Save Post"}</span>
              </button>
              <button
                onClick={handleCopyLink}
                className="w-full px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
                <Share2 size={12} />
                <span>Copy Link</span>
              </button>
              {(isAuthor || isManagerOrAdmin) && (
                <button
                  onClick={() => {
                    onToggleResolve(post.id);
                    setShowMenu(false);
                  }}
                  className="w-full px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  <CheckCircle size={12} />
                  <span>{isResolved ? "Mark as Unresolved" : "Mark as Resolved"}</span>
                </button>
              )}
              {(isAuthor || isManagerOrAdmin) && (
                <button
                  onClick={() => {
                    onDelete(post.id);
                    setShowMenu(false);
                  }}
                  className="w-full px-3 py-1.5 text-xs text-red-650 hover:bg-red-50 flex items-center gap-2 border-t border-gray-100"
                >
                  <Trash2 size={12} />
                  <span>Delete Post</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Card Header */}
      <div className="flex items-start gap-3 mb-3">
        <Avt initials={post.initials} color={post.color} size="sm" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-gray-800">{post.author}</span>
            <span className="text-[10px] text-gray-400">{post.designation}</span>
            <span className="text-[9px] font-bold bg-gray-50 text-gray-500 px-1.5 py-0.5 rounded uppercase">{post.dept}</span>
            {isPinned && <span className="text-[9px] font-bold bg-[#EEF2FF] text-[#5C5CFF] px-1.5 py-0.5 rounded uppercase flex items-center gap-1"><Pin size={8} /> Pinned</span>}
            {isResolved && <span className="text-[9px] font-bold bg-green-50 text-green-700 px-1.5 py-0.5 rounded uppercase flex items-center gap-1"><CheckCircle size={8} /> Resolved</span>}
            {post.priority && (
              <span className={cn(
                "text-[9px] font-bold px-1.5 py-0.5 rounded uppercase",
                post.priority === "High" ? "bg-red-50 text-red-600" : post.priority === "Medium" ? "bg-amber-50 text-amber-600" : "bg-blue-50 text-blue-600"
              )}>
                {post.priority} Priority
              </span>
            )}
            <span className="text-[10px] text-gray-400 ml-auto">{post.time}</span>
          </div>
        </div>
      </div>

      {/* Discussion Body */}
      <div className="space-y-2">
        <p className="text-xs text-gray-700 leading-relaxed font-medium whitespace-pre-line">{post.text}</p>
        
        {post.edited && (
          <p className="text-[10px] text-gray-450 italic">Edited • {post.editedTime || "2 mins ago"}</p>
        )}

        {/* Attachments rendering */}
        {post.attachments && post.attachments.length > 0 && (
          <div className="flex flex-wrap gap-2.5 mt-2">
            {post.attachments.map((att, i) => (
              <div key={i} className="border border-gray-150 rounded-xl overflow-hidden bg-gray-50 flex items-center gap-3 p-3 max-w-[280px]">
                {att.type === "image" ? (
                  <div className="w-10 h-10 bg-gray-200 rounded flex-shrink-0 flex items-center justify-center font-bold text-white text-xs bg-cover bg-center">🖼️</div>
                ) : (
                  <div className="w-10 h-10 bg-red-100 rounded flex-shrink-0 flex items-center justify-center text-red-650 text-xs font-bold"><FileText size={16} /></div>
                )}
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-gray-800 truncate">{att.name}</p>
                  <p className="text-[10px] text-gray-400">{att.size}</p>
                </div>
                <button className="text-xs text-[#5C5CFF] font-semibold hover:underline ml-auto flex items-center gap-0.5"><Download size={11} />Download</button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reactions Display */}
      {post.reactions.length > 0 && (
        <div className="flex items-center gap-1.5 flex-wrap mt-3.5">
          {post.reactions.map(r => {
            const hasReacted = r.users.includes("Alex Admin");
            return (
              <button
                key={r.emoji}
                onClick={() => onToggleReaction(post.id, r.emoji)}
                className={cn(
                  "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-xs transition-colors",
                  hasReacted ? "border-[#5C5CFF]/30 bg-[#EEF2FF] text-[#5C5CFF] font-bold" : "border-gray-150 hover:border-gray-205 text-gray-500 bg-white"
                )}
                title={r.users.join(", ")}
              >
                <span>{r.emoji}</span>
                <span>{r.users.length}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Comment Section (Collapsible) */}
      {showComments && (
        <div className="border-t border-gray-100 mt-4 pt-4 space-y-4">
          {/* Threaded list of comments */}
          {post.comments.length > 0 && (
            <div className="space-y-4 max-h-[400px] overflow-auto pr-1">
              {post.comments.map(comment => {
                const replies = comment.replies || [];
                const isCollapsed = collapsedReplies[comment.id];
                
                return (
                  <div key={comment.id} className="space-y-3 pl-1 border-l-2 border-gray-100 hover:border-[#5C5CFF]/30 transition-colors">
                    {/* Main comment card */}
                    <div className="group/comment relative flex items-start gap-2.5">
                      <Avt initials={comment.initials} color={comment.color} size="xs" />
                      <div className="flex-1 bg-gray-50 rounded-xl p-3 text-left">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-gray-800">{comment.author}</span>
                          <span className="text-[10px] text-gray-400">{comment.time}</span>
                          {comment.edited && <span className="text-[9px] text-gray-400 italic">(edited)</span>}
                        </div>
                        {editingCommentId === comment.id ? (
                          <div className="space-y-2">
                            <textarea
                              rows={2}
                              value={editingCommentText}
                              onChange={e => setEditingCommentText(e.target.value)}
                              className="w-full text-xs border border-gray-200 rounded-lg p-2 focus:ring-1 focus:ring-[#5C5CFF] outline-none bg-white"
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  onEditComment(post.id, comment.id, editingCommentText);
                                  setEditingCommentId(null);
                                }}
                                className="px-2.5 py-1 bg-[#5C5CFF] text-white text-[10px] rounded-lg font-bold"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setEditingCommentId(null)}
                                className="px-2.5 py-1 text-[10px] text-gray-450 border border-gray-200 rounded-lg"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-xs text-gray-750 leading-relaxed font-semibold">{comment.text}</p>
                        )}

                        {comment.attachment && (
                          <div className="mt-2 flex items-center gap-1.5 text-[10px] text-[#5C5CFF] font-semibold bg-white border border-gray-150 rounded px-2 py-1 max-w-[180px]">
                            <Paperclip size={10} />
                            <span className="truncate">{comment.attachment.name}</span>
                          </div>
                        )}

                        {/* Comment Reactions */}
                        {(comment.reactions || []).length > 0 && (
                          <div className="flex gap-1 mt-2">
                            {(comment.reactions || []).map(cr => (
                              <button
                                key={cr.emoji}
                                onClick={() => onToggleReaction(post.id, cr.emoji, comment.id)}
                                className="px-1.5 py-0.5 bg-white border border-gray-150 rounded-full text-[10px] text-gray-650 hover:bg-gray-100 flex items-center gap-0.5 font-bold"
                              >
                                <span>{cr.emoji}</span>
                                <span>{cr.users.length}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Comment hover action bar */}
                      <div className="absolute right-3 top-3 opacity-0 group-hover/comment:opacity-100 transition-opacity flex items-center bg-white border border-gray-150 rounded shadow p-0.5 gap-0.5">
                        <button
                          onClick={() => onToggleReaction(post.id, "👍", comment.id)}
                          className="p-1 hover:bg-gray-100 text-[10px] text-gray-500"
                          title="React 👍"
                        >
                          👍
                        </button>
                        <button
                          onClick={() => {
                            setReplyToCommentId(comment.id);
                            setReplyText("");
                          }}
                          className="p-1 hover:bg-gray-100 text-gray-450 hover:text-gray-700"
                          title="Reply"
                        >
                          <CornerDownRight size={10} />
                        </button>
                        {comment.author === "Alex Admin" && (
                          <>
                            <button
                              onClick={() => {
                                setEditingCommentId(comment.id);
                                setEditingCommentText(comment.text);
                              }}
                              className="p-1 hover:bg-gray-100 text-gray-455 hover:text-[#5C5CFF]"
                              title="Edit"
                            >
                              <Edit size={10} />
                            </button>
                            <button
                              onClick={() => onDeleteComment(post.id, comment.id)}
                              className="p-1 hover:bg-gray-100 text-gray-455 hover:text-red-500"
                              title="Delete"
                            >
                              <Trash2 size={10} />
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Collapsible replies indicator */}
                    {replies.length > 0 && (
                      <div className="pl-6 flex items-center gap-2">
                        <button
                          onClick={() => setCollapsedReplies(prev => ({ ...prev, [comment.id]: !prev[comment.id] }))}
                          className="text-[10px] text-gray-400 hover:text-[#5C5CFF] font-semibold flex items-center gap-1"
                        >
                          {isCollapsed ? `Expand ${replies.length} replies` : `Collapse replies`}
                        </button>
                      </div>
                    )}

                    {/* Replies timeline */}
                    {!isCollapsed && replies.map(reply => (
                      <div key={reply.id} className="group/reply relative flex items-start gap-2.5 pl-6">
                        <Avt initials={reply.initials} color={reply.color} size="xs" />
                        <div className="flex-1 bg-white border border-gray-150 rounded-xl p-2.5 text-left shadow-sm">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-[10px] font-bold text-gray-800">{reply.author}</span>
                            <span className="text-[9px] text-gray-400">{reply.time}</span>
                          </div>
                          <p className="text-xs text-gray-650 leading-relaxed font-semibold">{reply.text}</p>
                        </div>
                        {reply.author === "Alex Admin" && (
                          <div className="absolute right-3 top-3 opacity-0 group-hover/reply:opacity-100 transition-opacity flex items-center bg-white border border-gray-150 rounded shadow p-0.5 gap-0.5 z-10">
                            <button
                              onClick={() => onDeleteComment(post.id, reply.id)}
                              className="p-1 hover:bg-gray-100 text-gray-455 hover:text-red-500"
                              title="Delete Reply"
                            >
                              <Trash2 size={10} />
                            </button>
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Nested reply input box */}
                    {replyToCommentId === comment.id && (
                      <div className="pl-6 relative">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={replyText}
                            onChange={e => setReplyText(e.target.value)}
                            onKeyDown={e => {
                              if (e.key === "Enter" && replyText.trim()) {
                                onAddComment(post.id, comment.id, replyText);
                                setReplyToCommentId(null);
                                setReplyText("");
                              }
                            }}
                            placeholder={`Reply to ${comment.author}...`}
                            className="flex-1 px-3 py-1.5 text-xs border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-[#5C5CFF]"
                          />
                          <button
                            onClick={() => {
                              if (replyText.trim()) {
                                onAddComment(post.id, comment.id, replyText);
                                setReplyToCommentId(null);
                                setReplyText("");
                              }
                            }}
                            className="px-3 py-1.5 bg-[#5C5CFF] text-white text-[10px] font-bold rounded-lg"
                          >
                            Reply
                          </button>
                          <button onClick={() => setReplyToCommentId(null)} className="p-1.5 text-gray-450 hover:text-gray-700 border border-gray-200 rounded-lg bg-white"><X size={12} /></button>
                        </div>
                        <MentionPopup text={replyText} setText={setReplyText} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* New comment input area */}
          <div className="flex gap-2.5 pt-2 relative">
            <Avt initials="AA" color="#5C5CFF" size="xs" />
            <div className="flex-1 flex flex-col gap-1.5">
              <div className="flex gap-1.5">
                <input
                  type="text"
                  value={commentText}
                  onChange={e => setCommentText(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === "Enter" && commentText.trim()) {
                      onAddComment(post.id, null, commentText, commentAttachment);
                      setCommentText("");
                      setCommentAttachment(null);
                    }
                  }}
                  placeholder="Write a comment..."
                  className="flex-1 px-3 py-2 text-xs border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-[#5C5CFF] bg-gray-50"
                />
                
                {/* Simulated file attachments inside comment */}
                <button
                  onClick={() => {
                    setCommentAttachment({ name: `Attachment_${Date.now().toString().slice(-4)}.pdf` });
                  }}
                  className={cn("p-1.5 border border-gray-200 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-55 flex items-center justify-center bg-white", commentAttachment && "border-[#5C5CFF] text-[#5C5CFF] bg-[#EEF2FF]")}
                  title="Simulate attachment"
                >
                  <Paperclip size={13} />
                </button>

                <button
                  onClick={() => {
                    if (commentText.trim()) {
                      onAddComment(post.id, null, commentText, commentAttachment);
                      setCommentText("");
                      setCommentAttachment(null);
                    }
                  }}
                  className="px-3 bg-[#5C5CFF] text-white text-xs font-semibold rounded-lg hover:bg-[#4A4AE0] transition-colors"
                >
                  Post
                </button>
              </div>

              {commentAttachment && (
                <div className="flex items-center gap-1.5 text-[9px] text-[#5C5CFF] font-semibold bg-white border border-gray-150 rounded px-2 py-0.5 max-w-[180px]">
                  <Paperclip size={8} />
                  <span className="truncate">{commentAttachment.name}</span>
                  <button onClick={() => setCommentAttachment(null)} className="text-red-505 ml-auto"><X size={8} /></button>
                </div>
              )}

              <MentionPopup text={commentText} setText={setCommentText} />
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
  setShowCreateTask,
  reporteesViewMode,
  showTeamFilter,
  setShowTeamFilter,
  deptFilter,
  setDeptFilter,
  locationFilter,
  setLocationFilter,
  showCreateDiscussion,
  setShowCreateDiscussion
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
  reporteesViewMode: "list" | "grid";
  showTeamFilter: boolean;
  setShowTeamFilter: (b: boolean) => void;
  deptFilter: string;
  setDeptFilter: (v: string) => void;
  locationFilter: string;
  setLocationFilter: (v: string) => void;
  showCreateDiscussion: boolean;
  setShowCreateDiscussion: (b: boolean) => void;
}) {
  const [tab, setTab] = useState("Overview");

  // Sync activeTab to local tab state
  useEffect(() => {
    setTab(activeTab);
  }, [activeTab]);

  const [statusFilter, setStatusFilter] = useState("All");
  const [desigFilter, setDesigFilter] = useState("All");
  const [selectedEmp, setSelectedEmp] = useState<Employee|null>(null);
  const [empTab, setEmpTab] = useState("Activities");
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
  // --- FEED COLLABORATION SPACE STATE ---
  const [posts, setPosts] = useState<FeedPost[]>([
    {
      id: "F1",
      author: "Alex Admin",
      initials: "AA",
      color: "#5C5CFF",
      time: "2 hours ago",
      text: "Reminder: Q2 All-Hands Meeting is on July 15th at 3pm EST. Please confirm your attendance by end of week.",
      dept: "All",
      designation: "VP of HR",
      pinned: true,
      saved: false,
      priority: "High",
      resolved: false,
      reactions: [
        { emoji: "👍", users: ["Aisha Thompson", "David Chen"] },
        { emoji: "🎉", users: ["Sarah Mitchell"] }
      ],
      followers: ["Alex Admin", "Aisha Thompson"],
      attachments: [
        { name: "All-Hands_Agenda.pdf", type: "file", size: "1.2 MB" }
      ],
      comments: [
        {
          id: "FC1",
          author: "Aisha Thompson",
          initials: "AT",
          color: EMP_COLORS[4],
          text: "I will be there! I've also uploaded the preliminary HR slides for review.",
          time: "1 hour ago",
          reactions: [{ emoji: "❤️", users: ["Alex Admin"] }],
          replies: [
            {
              id: "FC1_1",
              author: "Alex Admin",
              initials: "AA",
              color: "#5C5CFF",
              text: "Thanks Aisha, the slides look great. Let's make sure James reviews them too.",
              time: "45 mins ago"
            }
          ]
        }
      ]
    },
    {
      id: "F2",
      author: "Aisha Thompson",
      initials: "AT",
      color: EMP_COLORS[4],
      time: "5 hours ago",
      text: "Updated leave policy for FY2025 has been published. Key change: employees with 3+ years tenure get 20 days annual leave. Review the document in Documents.",
      dept: "HR",
      designation: "HR Manager",
      pinned: false,
      saved: true,
      priority: "Medium",
      resolved: true,
      reactions: [
        { emoji: "👍", users: ["David Chen", "Ahmad Patel"] }
      ],
      comments: []
    },
    {
      id: "F3",
      author: "David Chen",
      initials: "DC",
      color: EMP_COLORS[3],
      time: "Yesterday",
      text: "Welcome Yuki Tanaka to the Engineering team! Yuki joins as a Frontend Developer and will be working on the Design System initiative. Please give them a warm welcome.",
      dept: "Engineering",
      designation: "VP Engineering",
      pinned: false,
      saved: false,
      reactions: [
        { emoji: "🎉", users: ["Alex Admin", "Aisha Thompson", "Sarah Mitchell", "James O'Brien"] }
      ],
      attachments: [
        { name: "Yuki_Photo.jpg", type: "image", size: "2.4 MB" }
      ],
      comments: [
        {
          id: "FC2",
          author: "Sarah Mitchell",
          initials: "SM",
          color: EMP_COLORS[1],
          text: "Welcome Yuki! Let's schedule some onboarding time soon.",
          time: "Yesterday"
        }
      ]
    }
  ]);

  // Feed Filter States
  const [feedPinnedOnly, setFeedPinnedOnly] = useState(false);
  const [feedSavedOnly, setFeedSavedOnly] = useState(false);
  const [feedResolvedFilter, setFeedResolvedFilter] = useState<"All"|"Resolved"|"Unresolved">("All");
  const [feedPriorityFilter, setFeedPriorityFilter] = useState("All");
  const [feedDeptFilter, setFeedDeptFilter] = useState("All");
  const [feedSearch, setFeedSearch] = useState("");
  const [showFeedFilterPanel, setShowFeedFilterPanel] = useState(false);

  // Discussion create state
  const [newDiscText, setNewDiscText] = useState("");
  const [newDiscPriority, setNewDiscPriority] = useState<"High"|"Medium"|"Low"|"None">("None");
  const [newDiscDept, setNewDiscDept] = useState("All");
  const [newDiscAttachments, setNewDiscAttachments] = useState<{name:string, type:"image"|"file", size:string}[]>([]);

  // Discussion Edit state
  const [editingPost, setEditingPost] = useState<FeedPost | null>(null);

  // Centralized Modal State System
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [feedToast, setFeedToast] = useState<string | null>(null);
  const triggerFeedToast = (msg: string) => {
    setFeedToast(msg);
    setTimeout(() => setFeedToast(null), 2500);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
    setShowCreateDiscussion(false);
    setEditingPost(null);
    setConfirmDeleteId(null);
    setIsDeleting(false);
  };

  // Sync prop-based triggers to activeModal
  useEffect(() => {
    if (showCreateDiscussion) {
      setActiveModal("new-discussion");
    }
  }, [showCreateDiscussion]);

  useEffect(() => {
    if (showAssignTask) {
      setActiveModal("assign-task");
    } else if (activeModal === "assign-task") {
      setActiveModal(null);
    }
  }, [showAssignTask]);

  useEffect(() => {
    if (showAssignShift) {
      setActiveModal("assign-shift");
    } else if (activeModal === "assign-shift") {
      setActiveModal(null);
    }
  }, [showAssignShift]);

  useEffect(() => {
    if (showEmailModal) {
      setActiveModal("email");
    } else if (activeModal === "email") {
      setActiveModal(null);
    }
  }, [showEmailModal]);

  useEffect(() => {
    if (showCallModal) {
      setActiveModal("call");
    } else if (activeModal === "call") {
      setActiveModal(null);
    }
  }, [showCallModal]);

  useEffect(() => {
    if (tApproveId) {
      setActiveModal("approve-leave");
    } else if (activeModal === "approve-leave") {
      setActiveModal(null);
    }
  }, [tApproveId]);

  useEffect(() => {
    if (tRejectId) {
      setActiveModal("reject-leave");
    } else if (activeModal === "reject-leave") {
      setActiveModal(null);
    }
  }, [tRejectId]);

  useEffect(() => {
    if (showTeamFilter) {
      setActiveModal("filter-members");
    } else if (activeModal === "filter-members") {
      setActiveModal(null);
    }
  }, [showTeamFilter]);

  // Discussion Delete state
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // --- FEED COLLABORATION HELPER FUNCTIONS ---
  const togglePin = (id: string) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, pinned: !p.pinned } : p));
  };

  const toggleSave = (id: string) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, saved: !p.saved } : p));
  };

  const toggleResolve = (id: string) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, resolved: !p.resolved } : p));
  };

  const toggleFollow = (id: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id !== id) return p;
      const followers = p.followers || [];
      const isFollowing = followers.includes("Alex Admin");
      return {
        ...p,
        followers: isFollowing ? followers.filter(f => f !== "Alex Admin") : [...followers, "Alex Admin"]
      };
    }));
  };

  const toggleReaction = (postId: string, emoji: string, commentId?: string) => {
    const currentUser = "Alex Admin";
    setPosts(prev => prev.map(p => {
      if (p.id !== postId) return p;

      if (!commentId) {
        // Toggle on post
        const reactions = [...p.reactions];
        const existing = reactions.find(r => r.emoji === emoji);
        if (existing) {
          if (existing.users.includes(currentUser)) {
            existing.users = existing.users.filter(u => u !== currentUser);
          } else {
            existing.users.push(currentUser);
          }
        } else {
          reactions.push({ emoji, users: [currentUser] });
        }
        return { ...p, reactions: reactions.filter(r => r.users.length > 0) };
      } else {
        // Toggle on comment
        const updateComments = (list: FeedComment[]): FeedComment[] => {
          return list.map(c => {
            if (c.id === commentId) {
              const reactions = [...(c.reactions || [])];
              const existing = reactions.find(r => r.emoji === emoji);
              if (existing) {
                if (existing.users.includes(currentUser)) {
                  existing.users = existing.users.filter(u => u !== currentUser);
                } else {
                  existing.users.push(currentUser);
                }
              } else {
                reactions.push({ emoji, users: [currentUser] });
              }
              return { ...c, reactions: reactions.filter(r => r.users.length > 0) };
            }
            if (c.replies) {
              return { ...c, replies: updateComments(c.replies) };
            }
            return c;
          });
        };
        return { ...p, comments: updateComments(p.comments) };
      }
    }));
  };

  const handleCreatePost = (text: string, priority: "High" | "Medium" | "Low" | "None", dept: string, attachments: any[]) => {
    const newPost: FeedPost = {
      id: `F${Date.now()}`,
      author: "Alex Admin",
      initials: "AA",
      color: "#5C5CFF",
      time: "Just now",
      text,
      dept: dept === "All" ? "All" : dept,
      designation: "VP of HR",
      pinned: false,
      saved: false,
      priority: priority === "None" ? undefined : priority,
      resolved: false,
      reactions: [],
      comments: [],
      followers: ["Alex Admin"],
      attachments: attachments.length > 0 ? attachments : undefined
    };
    setPosts(prev => [newPost, ...prev]);
  };

  const handleEditPost = (id: string, text: string, priority: "High" | "Medium" | "Low" | "None", attachments: any[]) => {
    setPosts(prev => prev.map(p => {
      if (p.id !== id) return p;
      return {
        ...p,
        text,
        priority: priority === "None" ? undefined : priority,
        attachments: attachments.length > 0 ? attachments : undefined,
        edited: true,
        editedTime: "Just now"
      };
    }));
  };

  const handleDeletePost = (id: string) => {
    setPosts(prev => prev.filter(p => p.id !== id));
  };

  const handleAddComment = (postId: string, parentCommentId: string | null, text: string, attachment?: any) => {
    const newComment: FeedComment = {
      id: `FC${Date.now()}`,
      author: "Alex Admin",
      initials: "AA",
      color: "#5C5CFF",
      text,
      time: "Just now",
      attachment,
      replies: []
    };

    setPosts(prev => prev.map(p => {
      if (p.id !== postId) return p;

      if (!parentCommentId) {
        return { ...p, comments: [...p.comments, newComment] };
      } else {
        const insertReply = (list: FeedComment[]): FeedComment[] => {
          return list.map(c => {
            if (c.id === parentCommentId) {
              return { ...c, replies: [...(c.replies || []), newComment] };
            }
            if (c.replies) {
              return { ...c, replies: insertReply(c.replies) };
            }
            return c;
          });
        };
        return { ...p, comments: insertReply(p.comments) };
      }
    }));
  };

  const handleEditComment = (postId: string, commentId: string, text: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id !== postId) return p;
      const updateText = (list: FeedComment[]): FeedComment[] => {
        return list.map(c => {
          if (c.id === commentId) {
            return { ...c, text, edited: true, editedTime: "Just now" };
          }
          if (c.replies) {
            return { ...c, replies: updateText(c.replies) };
          }
          return c;
        });
      };
      return { ...p, comments: updateText(p.comments) };
    }));
  };

  const handleDeleteComment = (postId: string, commentId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id !== postId) return p;
      const removeComment = (list: FeedComment[]): FeedComment[] => {
        return list.filter(c => c.id !== commentId).map(c => {
          if (c.replies) {
            return { ...c, replies: removeComment(c.replies) };
          }
          return c;
        });
      };
      return { ...p, comments: removeComment(p.comments) };
    }));
  };



  // Redesigned Tasks selection
  const [selectedTeamTask, setSelectedTeamTask] = useState<any>(null);

  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    EMPLOYEES.forEach(e => {
      const hasReports = EMPLOYEES.some(x => x.manager === e.name);
      if (hasReports) {
        initial[e.id] = true;
      }
    });
    return initial;
  });

  const approveT = (id:string) => {
    setTApprovalDetailId(null);
    setTApproveId(id);
    setTApproveComment("");
    setActiveModal("approve-leave");
  };
  const rejectT  = (id:string) => {
    setTApprovalDetailId(null);
    setTRejectId(id);
    setTRejectReason("");
    setActiveModal("reject-leave");
  };
  const confirmApproveT = () => {
    if (!tApproveId) return;
    setTeamReqs(r=>r.map(x=>x.id===tApproveId?{...x,status:"Approved"}:x));
    handleCloseModal();
  };
  const confirmRejectT = () => {
    if (!tRejectId || !tRejectReason.trim()) return;
    setTeamReqs(r=>r.map(x=>x.id===tRejectId?{...x,status:"Rejected",rejectReason:tRejectReason}:x));
    handleCloseModal();
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

        {/* ── OVERVIEW TAB ── */}
        {tab==="Overview"&&(
          (() => {
            const teamMembers = deptFilter === "All" ? EMPLOYEES : EMPLOYEES.filter(e => e.dept === deptFilter);
            const managerCount = teamMembers.filter(e => 
              ["Manager", "VP", "Head", "Lead", "Director", "CEO", "CFO", "Admin"].some(word => e.designation.includes(word))
            ).length;
            const employeeCount = teamMembers.length - managerCount;

            // Stats
            let presentCount = 0;
            let leaveCount = 0;
            let wfhCount = 0;
            let absentCount = 0;

            teamMembers.forEach(e => {
              const att = getAttendanceDetails(e);
              if (att.status === "Checked In" || att.status === "Late") {
                presentCount++;
              } else if (att.status === "On Leave") {
                leaveCount++;
              } else if (att.status === "WFH") {
                wfhCount++;
              } else {
                absentCount++;
              }
            });

            // Dept details lookup
            const deptName = deptFilter === "All" ? "Acme Corp" : deptFilter;
            const deptHead = DEPT_INFO[deptFilter]?.head || "Alex Admin";
            const deptLoc = DEPT_INFO[deptFilter]?.location || "New York HQ";
            const deptDesc = DEPT_INFO[deptFilter]?.details || "Global corporate office";

            // Manager attention stats
            const pendingLeaves = teamReqs.filter(r => {
              const emp = EMPLOYEES.find(e => e.name === r.employee);
              const deptMatch = deptFilter === "All" || (emp && emp.dept === deptFilter);
              return deptMatch && r.status === "Pending";
            }).length;

            const attendanceExceptions = teamMembers.filter(e => {
              const att = getAttendanceDetails(e);
              return att.status === "Late";
            }).length;

            const overdueTasksCount = TEAM_TASKS.filter(t => {
              const isDeptMatch = deptFilter === "All" || t.dept === deptFilter || (EMPLOYEES.find(e => e.name === t.assignee)?.dept === deptFilter);
              return isDeptMatch && (t.status === "Overdue" || t.status === "Todo");
            }).length;

            // Events
            const birthdays = TEAM_CELEBRATIONS.filter(e => e.type === "Birthday" && (deptFilter === "All" || EMPLOYEES.find(x => x.name === e.employee)?.dept === deptFilter));
            const newHires = TEAM_CELEBRATIONS.filter(e => e.type === "New Joiner" && (deptFilter === "All" || EMPLOYEES.find(x => x.name === e.employee)?.dept === deptFilter));
            const anniversaries = TEAM_CELEBRATIONS.filter(e => e.type === "Anniversary" && (deptFilter === "All" || EMPLOYEES.find(x => x.name === e.employee)?.dept === deptFilter));

            // Availability
            const upcomingAvailability = teamMembers
              .map(emp => {
                const leaves = teamReqs.filter(r => r.employee === emp.name && r.status === "Approved");
                return leaves.map(l => ({
                  date: new Date(l.from).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
                  name: emp.name,
                  type: l.type === "Sick" ? "Sick Leave" : l.type === "Casual" ? "Casual Leave" : "Annual Leave",
                  color: emp.color,
                  initials: emp.initials,
                }));
              })
              .flat()
              .slice(0, 3);

            if (upcomingAvailability.length === 0) {
              const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1);
              const dayAfter = new Date(); dayAfter.setDate(dayAfter.getDate() + 2);
              
              if (teamMembers.length > 0) {
                upcomingAvailability.push({
                  date: tomorrow.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
                  name: teamMembers[0].name,
                  type: "Work From Home",
                  color: teamMembers[0].color,
                  initials: teamMembers[0].initials,
                });
              }
              if (teamMembers.length > 1) {
                upcomingAvailability.push({
                  date: dayAfter.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
                  name: teamMembers[1].name,
                  type: "Annual Leave",
                  color: teamMembers[1].color,
                  initials: teamMembers[1].initials,
                });
              }
            }

            return (
              <div className="flex-1 overflow-auto p-6 bg-[#F7F8FA] text-left">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* LEFT COLUMN: Identity & Composition (1 col) */}
                  <div className="lg:col-span-1 space-y-6">
                    {/* Department Profile */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-[#5C5CFF] flex items-center justify-center text-2xl font-bold mb-4 border border-indigo-100 shadow-inner">
                        {deptName[0]}
                      </div>
                      <h3 className="text-base font-bold text-gray-900">{deptName}</h3>
                      <p className="text-xs text-gray-500 mt-1">{deptDesc}</p>
                      
                      <div className="w-full border-t border-gray-100 my-4" />
                      
                      <div className="w-full space-y-3 text-left">
                        <div>
                          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Department Head</p>
                          <p className="text-xs font-semibold text-gray-800 mt-0.5">{deptHead}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Team Strength</p>
                          <p className="text-xs font-semibold text-gray-800 mt-0.5">{teamMembers.length} employees</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Location</p>
                          <p className="text-xs font-semibold text-gray-800 mt-0.5">{deptLoc}</p>
                        </div>
                      </div>
                    </div>

                    {/* Team Composition */}
                    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Team Composition</h4>
                      <div className="space-y-2.5">
                        <div className="flex justify-between text-xs font-medium">
                          <span className="text-gray-500">Managers</span>
                          <span className="text-gray-800">{managerCount}</span>
                        </div>
                        <div className="flex justify-between text-xs font-medium">
                          <span className="text-gray-500">Employees</span>
                          <span className="text-gray-800">{employeeCount}</span>
                        </div>
                        <div className="border-t border-gray-100 pt-2 flex justify-between text-xs font-bold">
                          <span className="text-gray-900">Total</span>
                          <span className="text-[#5C5CFF]">{teamMembers.length}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CENTER COLUMN: Team Today & Attendance Preview & Needs Attention (2 cols) */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Team Today stats */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Team Today</h4>
                        <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">{teamMembers.length} Team Members</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {[
                          { label: "Present", count: presentCount, color: "text-green-600", bg: "bg-green-50/50" },
                          { label: "On Leave", count: leaveCount, color: "text-purple-600", bg: "bg-purple-50/50" },
                          { label: "WFH", count: wfhCount, color: "text-blue-600", bg: "bg-blue-50/50" },
                          { label: "Not Checked In", count: absentCount, color: "text-gray-500", bg: "bg-gray-50/50" }
                        ].map(stat => (
                          <div key={stat.label} className={cn("p-4 rounded-xl text-center border border-transparent", stat.bg)}>
                            <div className={cn("text-2xl font-bold", stat.color)}>{stat.count}</div>
                            <div className="text-[10px] font-semibold text-gray-500 mt-1">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Team Attendance Preview */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Team Attendance</h4>
                        <button
                          onClick={() => { navigate("attendance"); setAttendanceSection("My Team"); }}
                          className="text-xs font-semibold text-[#5C5CFF] hover:text-[#4B4BE3] transition-colors"
                        >
                          View all →
                        </button>
                      </div>
                      <div className="divide-y divide-gray-150">
                        {teamMembers.slice(0, 3).map(emp => {
                          const att = getAttendanceDetails(emp);
                          return (
                            <div key={emp.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                              <Avt initials={emp.initials} color={emp.color} size="sm" />
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold text-gray-800 truncate">{emp.name}</p>
                                <p className="text-[10px] text-gray-400 truncate mt-0.5">{emp.designation}</p>
                              </div>
                              <div className="flex items-center gap-1.5 flex-shrink-0">
                                <div className={cn("w-1.5 h-1.5 rounded-full", att.dotColor)} />
                                <span className="text-[11px] font-medium text-gray-500">
                                  {att.status === "Checked In" ? `Checked In · ${att.checkIn}` : att.status === "WFH" ? "Working remotely" : att.status}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                        {teamMembers.length === 0 && (
                          <div className="text-center py-6 text-xs text-gray-400">No team members in this department</div>
                        )}
                      </div>
                    </div>

                    {/* Needs Attention */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Needs Attention</h4>
                      {pendingLeaves === 0 && attendanceExceptions === 0 && overdueTasksCount === 0 ? (
                        <div className="text-center py-6 text-xs text-gray-400">
                          All caught up! No items require attention today.
                        </div>
                      ) : (
                        <div className="divide-y divide-gray-100">
                          {pendingLeaves > 0 && (
                            <div onClick={() => { setTeamTab("Approvals"); }} className="flex justify-between items-center py-3.5 cursor-pointer hover:bg-gray-50 px-2 rounded-lg transition-colors">
                              <span className="text-xs text-gray-650 font-semibold hover:text-[#5C5CFF]">Leave requests</span>
                              <span className="bg-red-50 text-red-500 font-semibold px-2 py-0.5 rounded text-[10px]">{pendingLeaves}</span>
                            </div>
                          )}
                          {attendanceExceptions > 0 && (
                            <div onClick={() => { navigate("attendance"); setAttendanceSection("My Team"); }} className="flex justify-between items-center py-3.5 cursor-pointer hover:bg-gray-50 px-2 rounded-lg transition-colors">
                              <span className="text-xs text-gray-655 font-semibold hover:text-[#5C5CFF]">Attendance exceptions</span>
                              <span className="bg-amber-50 text-amber-600 font-semibold px-2 py-0.5 rounded text-[10px]">{attendanceExceptions}</span>
                            </div>
                          )}
                          {overdueTasksCount > 0 && (
                            <div onClick={() => { setTeamTab("Tasks"); }} className="flex justify-between items-center py-3.5 cursor-pointer hover:bg-gray-50 px-2 rounded-lg transition-colors">
                              <span className="text-xs text-gray-655 font-semibold hover:text-[#5C5CFF]">Overdue tasks</span>
                              <span className="bg-blue-50 text-blue-600 font-semibold px-2 py-0.5 rounded text-[10px]">{overdueTasksCount}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* RIGHT COLUMN: Events & Calendar (1 col) */}
                  <div className="lg:col-span-1 space-y-6">
                    {/* Upcoming Events */}
                    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Upcoming</h4>
                      
                      <div className="space-y-4">
                        {/* Birthdays */}
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Birthdays</p>
                          {birthdays.length > 0 ? (
                            birthdays.map((e, idx) => {
                              const emp = EMPLOYEES.find(x => x.name === e.employee);
                              return (
                                <div key={idx} className="flex items-center gap-2.5 py-1.5">
                                  <Avt initials={emp?.initials || "E"} color={emp?.color || "#5C5CFF"} size="xs" />
                                  <div className="min-w-0 flex-1">
                                    <p className="text-xs font-semibold text-gray-800 truncate">{e.employee}</p>
                                    <p className="text-[10px] text-gray-400 mt-0.5">{e.detail}</p>
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <p className="text-xs text-gray-400 italic">No upcoming birthdays</p>
                          )}
                        </div>

                        {/* New Hires */}
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">New Hires</p>
                          {newHires.length > 0 ? (
                            newHires.map((e, idx) => {
                              const emp = EMPLOYEES.find(x => x.name === e.employee);
                              return (
                                <div key={idx} className="flex items-center gap-2.5 py-1.5">
                                  <Avt initials={emp?.initials || "E"} color={emp?.color || "#5C5CFF"} size="xs" />
                                  <div className="min-w-0 flex-1">
                                    <p className="text-xs font-semibold text-gray-800 truncate">{e.employee}</p>
                                    <p className="text-[10px] text-gray-400 mt-0.5">{e.detail}</p>
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <p className="text-xs text-gray-400 italic">No new hires</p>
                          )}
                        </div>

                        {/* Anniversaries */}
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Work Anniversaries</p>
                          {anniversaries.length > 0 ? (
                            anniversaries.map((e, idx) => {
                              const emp = EMPLOYEES.find(x => x.name === e.employee);
                              return (
                                <div key={idx} className="flex items-center gap-2.5 py-1.5">
                                  <Avt initials={emp?.initials || "E"} color={emp?.color || "#5C5CFF"} size="xs" />
                                  <div className="min-w-0 flex-1">
                                    <p className="text-xs font-semibold text-gray-800 truncate">{e.employee}</p>
                                    <p className="text-[10px] text-gray-400 mt-0.5">{e.detail}</p>
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <p className="text-xs text-gray-400 italic">No upcoming anniversaries</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Team Availability */}
                    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Team Availability</h4>
                      <div className="space-y-3">
                        {upcomingAvailability.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2.5 py-1">
                            <span className="text-[10px] font-bold text-gray-400 bg-gray-50 border border-gray-150 rounded px-1.5 py-0.5 flex-shrink-0 w-12 text-center">
                              {item.date}
                            </span>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-semibold text-gray-800 truncate">{item.name}</p>
                              <p className="text-[10px] text-gray-505 mt-0.5">{item.type}</p>
                            </div>
                          </div>
                        ))}
                        {upcomingAvailability.length === 0 && (
                          <p className="text-xs text-gray-400 italic py-2">No leaves scheduled</p>
                        )}
                      </div>
                      <div className="border-t border-gray-100 mt-4 pt-3 text-center">
                        <button
                          onClick={() => { navigate("leave"); setLeaveSection("Calendar"); }}
                          className="text-xs font-semibold text-[#5C5CFF] hover:underline"
                        >
                          View team calendar →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()
        )}

        {/* ── FEED TAB ── */}
        {tab==="Feed"&&(
          <div className="flex h-full w-full bg-[#F7F8FA] overflow-hidden text-left">
            {/* Timeline container */}
            <div className="flex-1 flex flex-col h-full overflow-hidden p-6 max-w-4xl mx-auto w-full">
              {/* Header inside feed tab (Toolbar was removed) */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-5 flex-shrink-0">
                <div>
                  <h2 className="text-base font-bold text-gray-900">Collaboration Feed</h2>
                  <p className="text-xs text-gray-400 mt-0.5">Share ideas, ask questions, and collaborate with your team</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative w-64 h-[34px] flex items-center gap-2 px-3 bg-white border border-[#E8E9ED] rounded-[8px]">
                    <Search size={13} className="text-[#9CA0AB] flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="Search discussions..."
                      value={feedSearch}
                      onChange={(e) => setFeedSearch(e.target.value)}
                      className="w-full bg-transparent text-xs text-[#16181D] placeholder-[#9CA0AB] outline-none"
                    />
                  </div>
                  <button
                    onClick={() => setShowFeedFilterPanel(true)}
                    className={cn(
                      "flex items-center gap-1.5 h-[34px] px-3 border rounded-lg text-xs font-semibold hover:bg-gray-50 transition-colors bg-white",
                      (feedPinnedOnly || feedSavedOnly || feedResolvedFilter !== "All" || feedPriorityFilter !== "All" || feedDeptFilter !== "All")
                        ? "border-[#5C5CFF] bg-[#EEF2FF] text-[#5C5CFF]"
                        : "border-gray-200 text-gray-600"
                    )}
                    title="Filters"
                  >
                    <SlidersHorizontal size={13} />
                    <span>Filter</span>
                  </button>
                </div>
              </div>

              {/* Discussion timeline list */}
              <div className="flex-1 overflow-auto space-y-4 pr-1 pb-10">
                {(() => {
                  const filteredPosts = posts.filter(p => {
                    // Pinned filter
                    if (feedPinnedOnly && !p.pinned) return false;
                    // Saved filter
                    if (feedSavedOnly && !p.saved) return false;
                    // Resolved filter
                    if (feedResolvedFilter === "Resolved" && !p.resolved) return false;
                    if (feedResolvedFilter === "Unresolved" && p.resolved) return false;
                    // Priority filter
                    if (feedPriorityFilter !== "All" && p.priority !== feedPriorityFilter) return false;
                    // Dept filter
                    if (feedDeptFilter !== "All" && p.dept !== feedDeptFilter && p.dept !== "All") return false;
                    // Search query
                    if (feedSearch.trim() !== "") {
                      const q = feedSearch.toLowerCase();
                      const matchText = p.text.toLowerCase().includes(q);
                      const matchAuthor = p.author.toLowerCase().includes(q);
                      const matchComments = p.comments.some(c => c.text.toLowerCase().includes(q) || c.author.toLowerCase().includes(q) || (c.replies || []).some(r => r.text.toLowerCase().includes(q)));
                      if (!matchText && !matchAuthor && !matchComments) return false;
                    }
                    return true;
                  });

                  if (filteredPosts.length === 0) {
                    return (
                      <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center shadow-sm">
                        <MessageSquare size={32} className="text-gray-300 mx-auto mb-3" />
                        <p className="text-sm font-semibold text-gray-800">No discussions match your filters</p>
                        <p className="text-xs text-gray-405 mt-1">Try resetting the filters or creating a new discussion.</p>
                      </div>
                    );
                  }

                  return filteredPosts.map(p => {
                    const isPinned = p.pinned;
                    const isSaved = p.saved || false;
                    const isResolved = p.resolved || false;
                    const isFollower = (p.followers || []).includes("Alex Admin");
                    const isAuthor = p.author === "Alex Admin";
                    const isManagerOrAdmin = true;

                    return (
                      <DiscussionCard
                        key={p.id}
                        post={p}
                        isPinned={isPinned}
                        isSaved={isSaved}
                        isResolved={isResolved}
                        isFollower={isFollower}
                        isAuthor={isAuthor}
                        isManagerOrAdmin={isManagerOrAdmin}
                        onTogglePin={togglePin}
                        onToggleSave={toggleSave}
                        onToggleResolve={toggleResolve}
                        onToggleFollow={toggleFollow}
                        onDelete={(id) => {
                          setConfirmDeleteId(id);
                          setActiveModal("delete-discussion");
                        }}
                        onEdit={(post) => {
                          setEditingPost(post);
                          setActiveModal("edit-discussion");
                        }}
                        onToggleReaction={toggleReaction}
                        onAddComment={handleAddComment}
                        onEditComment={handleEditComment}
                        onDeleteComment={handleDeleteComment}
                      />
                    );
                  });
                })()}
              </div>
            </div>

            {/* Filter Drawer */}
            <Drawer
              isOpen={showFeedFilterPanel}
              onClose={() => setShowFeedFilterPanel(false)}
              title="Filter Discussions"
              footer={
                <div className="flex gap-2 w-full justify-end">
                  <Btn
                    variant="outline"
                    onClick={() => {
                      setFeedPinnedOnly(false);
                      setFeedSavedOnly(false);
                      setFeedResolvedFilter("All");
                      setFeedPriorityFilter("All");
                      setFeedDeptFilter("All");
                      setShowFeedFilterPanel(false);
                    }}
                  >
                    Reset Filters
                  </Btn>
                  <Btn variant="primary" onClick={() => setShowFeedFilterPanel(false)}>Apply</Btn>
                </div>
              }
            >
              <div className="space-y-5 text-left">
                {/* Fast toggles */}
                <div className="bg-white rounded-xl border border-gray-150 p-4 space-y-3.5 shadow-sm">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Fast Filters</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={feedPinnedOnly}
                        onChange={e => setFeedPinnedOnly(e.target.checked)}
                        className="rounded border-gray-300 text-[#5C5CFF] focus:ring-[#5C5CFF]"
                      />
                      <span>Pinned items only</span>
                    </label>
                    <label className="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={feedSavedOnly}
                        onChange={e => setFeedSavedOnly(e.target.checked)}
                        className="rounded border-gray-300 text-[#5C5CFF] focus:ring-[#5C5CFF]"
                      />
                      <span>Saved Discussions only</span>
                    </label>
                  </div>
                </div>

                {/* Status Filter */}
                <div className="bg-white rounded-xl border border-gray-150 p-4 space-y-3 shadow-sm">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Status</h4>
                  <div className="flex rounded-lg border border-gray-200 overflow-hidden bg-gray-50 p-0.5 gap-0.5 text-xs">
                    {(["All", "Resolved", "Unresolved"] as const).map(v => (
                      <button
                        key={v}
                        onClick={() => setFeedResolvedFilter(v)}
                        className={cn(
                          "flex-1 py-1.5 rounded-md font-semibold transition-all",
                          feedResolvedFilter === v ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-750"
                        )}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Priority Filter */}
                <div className="bg-white rounded-xl border border-gray-150 p-4 space-y-3 shadow-sm">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Priority</h4>
                  <select
                    value={feedPriorityFilter}
                    onChange={e => setFeedPriorityFilter(e.target.value)}
                    className="w-full text-xs bg-white border border-gray-200 rounded-lg p-2.5 font-medium outline-none"
                  >
                    <option value="All">All Priorities</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                {/* Department Filter */}
                <div className="bg-white rounded-xl border border-gray-150 p-4 shadow-sm">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Department</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {depts.map(d => (
                      <button
                        key={d}
                        onClick={() => setFeedDeptFilter(d)}
                        className={cn(
                          "px-2.5 py-1 text-[11px] font-semibold rounded-lg border transition-all",
                          feedDeptFilter === d ? "border-[#5C5CFF] bg-[#EEF2FF] text-[#5C5CFF]" : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                        )}
                      >
                        {d === "All" ? "All Departments" : d}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Drawer>

            {/* Create Discussion Modal */}
            {activeModal === "new-discussion" && (
              <Modal
                title="New Discussion"
                onClose={handleCloseModal}
              >
                <div className="space-y-4 text-left">
                  <div className="relative">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">What would you like to discuss?</label>
                    <textarea
                      rows={4}
                      value={newDiscText}
                      onChange={e => setNewDiscText(e.target.value)}
                      placeholder="Type your message... use @ to mention teammates"
                      className="w-full text-xs border border-gray-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#5C5CFF] resize-none"
                    />
                    {/* Mention autocomplete box for post composition */}
                    <MentionPopup
                      text={newDiscText}
                      setText={setNewDiscText}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Audience / Department</label>
                      <select
                        value={newDiscDept}
                        onChange={e => setNewDiscDept(e.target.value)}
                        className="w-full text-xs bg-white border border-gray-200 rounded-lg p-2 font-medium outline-none"
                      >
                        {depts.map(d => <option key={d} value={d}>{d === "All" ? "All Departments" : d}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Priority Badge <span className="text-gray-450 font-normal">(optional)</span></label>
                      <select
                        value={newDiscPriority}
                        onChange={e => setNewDiscPriority(e.target.value as any)}
                        className="w-full text-xs bg-white border border-gray-200 rounded-lg p-2 font-medium outline-none"
                      >
                        <option value="None">None</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>
                  </div>

                  {/* Simulated Attachments UI */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Attachments</label>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setNewDiscAttachments(prev => [...prev, { name: `Image_${Date.now().toString().slice(-4)}.jpg`, type: "image", size: "1.4 MB" }]);
                          }}
                          className="text-[10px] text-[#5C5CFF] font-bold hover:underline flex items-center gap-1"
                        >
                          <Paperclip size={10} /> Add Image
                        </button>
                        <button
                          onClick={() => {
                            setNewDiscAttachments(prev => [...prev, { name: `Doc_${Date.now().toString().slice(-4)}.pdf`, type: "file", size: "0.8 MB" }]);
                          }}
                          className="text-[10px] text-[#5C5CFF] font-bold hover:underline flex items-center gap-1"
                        >
                          <Paperclip size={10} /> Add File
                        </button>
                      </div>
                    </div>
                    {newDiscAttachments.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {newDiscAttachments.map((att, i) => (
                          <div key={i} className="flex items-center gap-1.5 bg-gray-55 border border-gray-200 rounded-lg p-1.5 text-[10px] text-gray-700">
                            <FileText size={10} className="text-gray-455" />
                            <span className="truncate max-w-[120px]">{att.name}</span>
                            <span className="text-gray-400">({att.size})</span>
                            <button onClick={() => setNewDiscAttachments(prev => prev.filter((_, idx) => idx !== i))} className="text-red-500 hover:text-red-700 ml-1"><X size={10} /></button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                    <Btn
                      variant="outline"
                      onClick={handleCloseModal}
                    >
                      Cancel
                    </Btn>
                    <Btn
                      variant="primary"
                      disabled={!newDiscText.trim()}
                      onClick={() => {
                        handleCreatePost(newDiscText, newDiscPriority, newDiscDept, newDiscAttachments);
                        handleCloseModal();
                        setNewDiscText("");
                        setNewDiscPriority("None");
                        setNewDiscDept("All");
                        setNewDiscAttachments([]);
                      }}
                    >
                      Create Discussion
                    </Btn>
                  </div>
                </div>
              </Modal>
            )}

            {/* Edit Discussion Modal */}
            {activeModal === "edit-discussion" && editingPost && (
              <Modal
                title="Edit Discussion"
                onClose={handleCloseModal}
              >
                <div className="space-y-4 text-left">
                  <div className="relative">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Edit Message</label>
                    <textarea
                      rows={4}
                      value={editingPost.text}
                      onChange={e => {
                        const val = e.target.value;
                        setEditingPost(prev => prev ? { ...prev, text: val } : null);
                      }}
                      className="w-full text-xs border border-gray-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#5C5CFF] resize-none"
                    />
                    <MentionPopup
                      text={editingPost.text}
                      setText={(t) => setEditingPost(prev => prev ? { ...prev, text: t } : null)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Priority Badge</label>
                      <select
                        value={editingPost.priority || "None"}
                        onChange={e => {
                          const val = e.target.value;
                          setEditingPost(prev => prev ? { ...prev, priority: val === "None" ? undefined : val as any } : null);
                        }}
                        className="w-full text-xs bg-white border border-gray-200 rounded-lg p-2 font-medium outline-none"
                      >
                        <option value="None">None</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>
                  </div>

                  {/* Simulated Attachments UI for Edit */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Attachments</label>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            const currentAtts = editingPost.attachments || [];
                            setEditingPost(prev => prev ? { ...prev, attachments: [...currentAtts, { name: `Image_${Date.now().toString().slice(-4)}.jpg`, type: "image", size: "1.4 MB" }] } : null);
                          }}
                          className="text-[10px] text-[#5C5CFF] font-bold hover:underline flex items-center gap-1"
                        >
                          <Paperclip size={10} /> Add Image
                        </button>
                        <button
                          onClick={() => {
                            const currentAtts = editingPost.attachments || [];
                            setEditingPost(prev => prev ? { ...prev, attachments: [...currentAtts, { name: `Doc_${Date.now().toString().slice(-4)}.pdf`, type: "file", size: "0.8 MB" }] } : null);
                          }}
                          className="text-[10px] text-[#5C5CFF] font-bold hover:underline flex items-center gap-1"
                        >
                          <Paperclip size={10} /> Add File
                        </button>
                      </div>
                    </div>
                    {(editingPost.attachments || []).length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {(editingPost.attachments || []).map((att, i) => (
                          <div key={i} className="flex items-center gap-1.5 bg-gray-55 border border-gray-200 rounded-lg p-1.5 text-[10px] text-gray-700">
                            <FileText size={10} className="text-gray-455" />
                            <span className="truncate max-w-[120px]">{att.name}</span>
                            <span className="text-gray-400">({att.size})</span>
                            <button
                              onClick={() => {
                                const currentAtts = editingPost.attachments || [];
                                setEditingPost(prev => prev ? { ...prev, attachments: currentAtts.filter((_, idx) => idx !== i) } : null);
                              }}
                              className="text-red-500 hover:text-red-700 ml-1"
                            >
                              <X size={10} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                    <Btn variant="outline" onClick={handleCloseModal}>Cancel</Btn>
                    <Btn
                      variant="primary"
                      disabled={!editingPost.text.trim()}
                      onClick={() => {
                        handleEditPost(editingPost.id, editingPost.text, editingPost.priority || "None", editingPost.attachments || []);
                        handleCloseModal();
                      }}
                    >
                      Save Changes
                    </Btn>
                  </div>
                </div>
              </Modal>
            )}

            {/* Delete Confirmation Modal */}
            {activeModal === "delete-discussion" && confirmDeleteId && (
              <Modal
                title="Delete discussion?"
                onClose={handleCloseModal}
                width="max-w-[520px]"
              >
                <div className="space-y-4 text-left">
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Are you sure you want to delete this discussion? All comments and replies will also be permanently deleted. This action cannot be undone.
                  </p>
                  <div className="flex justify-end gap-3 pt-2">
                    <Btn variant="outline" disabled={isDeleting} onClick={handleCloseModal}>Cancel</Btn>
                    <Btn
                      disabled={isDeleting}
                      className="bg-red-600 hover:bg-red-700 text-white border-transparent"
                      onClick={() => {
                        setIsDeleting(true);
                        setTimeout(() => {
                          handleDeletePost(confirmDeleteId);
                          triggerFeedToast("Discussion deleted");
                          handleCloseModal();
                        }, 800);
                      }}
                    >
                      {isDeleting ? "Deleting..." : "Delete"}
                    </Btn>
                  </div>
                </div>
              </Modal>
            )}

            {/* Feed dynamic toast */}
            {feedToast && (
              <div className="fixed bottom-6 right-6 z-[150] flex items-center gap-2.5 bg-gray-900 text-white px-4 py-3 rounded-xl shadow-lg text-sm font-medium">
                <CheckCircle size={15} className="text-green-400" />
                <span>{feedToast}</span>
              </div>
            )}
          </div>
        )}

        {/* ── ANNOUNCEMENTS TAB ── */}
        {tab==="Announcements"&&(
          <div className="flex flex-col h-full w-full">
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

            {/* Contextual Overlay Drawer for Announcement Details */}
            <Drawer
              isOpen={!!teamAnnDetailId}
              onClose={() => setTeamAnnDetailId(null)}
              title={teamAnnDetail?.title || "Announcement"}
              avatar={
                teamAnnDetail ? (
                  <Avt initials={teamAnnDetail.author.split(" ").map(n=>n[0]).join("")} color="#5C5CFF" size="sm"/>
                ) : null
              }
              headerAddon={
                teamAnnDetail ? (
                  <span className="text-[10px] font-semibold bg-[#EEF2FF] text-[#5C5CFF] px-1.5 py-0.5 rounded uppercase">{teamAnnDetail.category}</span>
                ) : null
              }
              footer={
                <Btn variant="outline" onClick={() => setTeamAnnDetailId(null)}>Close Details</Btn>
              }
            >
              {teamAnnDetail && (
                <div className="space-y-6 text-left">
                  <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
                    <div className="flex items-center justify-between text-xs text-gray-400 pb-3 border-b border-gray-100">
                      <div>
                        <p className="text-[10px] text-gray-400 uppercase tracking-wide">Published By</p>
                        <p className="text-xs font-semibold text-gray-800 mt-1">{teamAnnDetail.author} ({teamAnnDetail.dept})</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-gray-400 uppercase tracking-wide">Date</p>
                        <p className="text-xs font-semibold text-gray-855 mt-1">{teamAnnDetail.time}</p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line font-medium">
                      {teamAnnDetail.body}
                    </div>
                  </div>
                </div>
              )}
            </Drawer>
          </div>
        )}

        {/* ── REPORTEES TAB ── */}
        {tab==="Reportees"&&(
          (() => {
            const totalReportees = filtered.length;
            let checkedInCount = 0;
            let wfhCount = 0;
            let leaveCount = 0;
            let checkedOutCount = 0;

            filtered.forEach(e => {
              const details = getAttendanceDetails(e);
              if (details.status === "Checked In" || details.status === "Late") {
                checkedInCount++;
              } else if (details.status === "WFH") {
                wfhCount++;
              } else if (details.status === "On Leave") {
                leaveCount++;
              } else {
                checkedOutCount++;
              }
            });

            return (
              <div className="flex-1 h-full overflow-auto p-6 bg-[#F7F8FA]">
                {/* Reporting Summary Strip */}
                <div className="bg-white border border-gray-200 rounded-xl px-6 py-3.5 flex items-center justify-between text-xs text-gray-500 max-w-7xl mx-auto mb-5 shadow-sm">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900 text-sm">{totalReportees}</span>
                      <span>Direct Reportees</span>
                    </div>
                    <div className="h-4 w-px bg-gray-200" />
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="font-semibold text-gray-900 text-sm">{checkedInCount}</span>
                      <span>Checked In</span>
                    </div>
                    <div className="h-4 w-px bg-gray-200" />
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                      <span className="font-semibold text-gray-900 text-sm">{wfhCount}</span>
                      <span>WFH</span>
                    </div>
                    <div className="h-4 w-px bg-gray-200" />
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-500" />
                      <span className="font-semibold text-gray-900 text-sm">{leaveCount}</span>
                      <span>On Leave</span>
                    </div>
                    <div className="h-4 w-px bg-gray-200" />
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-gray-300" />
                      <span className="font-semibold text-gray-900 text-sm">{checkedOutCount}</span>
                      <span>Checked Out</span>
                    </div>
                  </div>
                </div>

                <div className="max-w-7xl mx-auto">
                  {reporteesViewMode === "list" ? (
                    /* LIST VIEW */
                    filtered.length > 0 ? (
                      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                        <table className="w-full text-sm text-left">
                          <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                              {["Employee", "Role", "Department", "Location", "Attendance", "Check-in", "Working Hours", ""].map(h => (
                                <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100 bg-white">
                            {filtered.map(e => {
                              const att = getAttendanceDetails(e);
                              return (
                                <tr
                                  key={e.id}
                                  onClick={() => navigate("employee-profile", e)}
                                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                                >
                                  <td className="px-5 py-3.5">
                                    <div className="flex items-center gap-3">
                                      <Avt initials={e.initials} color={e.color} size="sm" />
                                      <div className="flex flex-col text-left">
                                        <span className="font-semibold text-gray-800 text-xs">{e.name}</span>
                                        <span className="text-[10px] text-gray-400">{e.id}</span>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-5 py-3.5 text-xs text-gray-600 font-medium">{e.designation}</td>
                                  <td className="px-5 py-3.5 text-xs text-gray-500">{e.dept}</td>
                                  <td className="px-5 py-3.5 text-xs text-gray-500">{e.branch}</td>
                                  <td className="px-5 py-3.5 text-xs text-gray-650">
                                    <div className="flex items-center gap-1.5">
                                      <div className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", att.dotColor)} />
                                      <span className="text-[11px] font-medium text-gray-600">{att.status}</span>
                                    </div>
                                  </td>
                                  <td className="px-5 py-3.5 font-mono text-xs text-gray-500">{att.checkIn}</td>
                                  <td className="px-5 py-3.5 font-mono text-xs text-gray-500">{att.workingHours}</td>
                                  <td className="px-5 py-3.5 text-right" onClick={(ev) => ev.stopPropagation()}>
                                    <button className="text-gray-400 hover:text-gray-650 p-1 rounded hover:bg-gray-100 transition-colors">
                                      <MoreHorizontal size={14} />
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-400 text-sm shadow-sm">
                        No matching reportees found
                      </div>
                    )
                  ) : (
                    /* GRID VIEW */
                    filtered.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filtered.map(e => {
                          const att = getAttendanceDetails(e);
                          return (
                            <div
                              key={e.id}
                              onClick={() => navigate("employee-profile", e)}
                              className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:border-[#5C5CFF]/30 hover:shadow-md transition-all cursor-pointer flex items-start gap-4 text-left group"
                            >
                              <Avt initials={e.initials} color={e.color} size="lg" className="flex-shrink-0" />
                              <div className="min-w-0 flex-1">
                                <h4 className="text-sm font-bold text-gray-800 group-hover:text-[#5C5CFF] transition-colors truncate">
                                  {e.name}
                                </h4>
                                <p className="text-xs text-gray-500 truncate mt-0.5">
                                  {e.designation}
                                </p>
                                <p className="text-[11px] text-gray-400 truncate mt-0.5">
                                  {e.dept} · {e.branch}
                                </p>
                                <div className="flex items-center gap-1.5 mt-3">
                                  <div className={cn("w-2 h-2 rounded-full", att.dotColor)} />
                                  <span className="text-xs font-semibold text-gray-600">
                                    {att.status} {att.status !== "Checked Out" && att.status !== "On Leave" && `(${att.checkIn})`}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-400 text-sm shadow-sm">
                        No matching reportees found
                      </div>
                    )
                  )}
                </div>
              </div>
            );
          })()
        )}

        {/* ── APPROVALS TAB ── */}
        {tab==="Approvals"&&(
          <div className="flex h-full overflow-hidden w-full">
            <div className="flex-1 flex flex-col">
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
                        <tr key={r.id} onClick={()=>setTApprovalDetailId(r.id)} className={cn("cursor-pointer hover:bg-gray-50 transition-colors",tApprovalDetailId===r.id&&"bg-[#EEF2FF]")}>
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
            {/* Drawer Detail Panel */}
            <Drawer
              isOpen={!!tApprovalDetailId}
              onClose={() => setTApprovalDetailId(null)}
              title={
                (() => {
                  const req = teamReqs.find(r => r.id === tApprovalDetailId);
                  return req ? req.employee : "Approval Details";
                })()
              }
              headerAddon={
                (() => {
                  const req = teamReqs.find(r => r.id === tApprovalDetailId);
                  return req ? <StatusBadge status={req.status} /> : null;
                })()
              }
              avatar={
                (() => {
                  const req = teamReqs.find(r => r.id === tApprovalDetailId);
                  if (!req) return null;
                  return (
                    <Avt
                      initials={req.employee.split(" ").map(n => n[0]).join("")}
                      color={EMP_COLORS[parseInt(req.id.slice(-1)) % EMP_COLORS.length]}
                      size="md"
                    />
                  );
                })()
              }
              footer={
                (() => {
                  const req = teamReqs.find(r => r.id === tApprovalDetailId);
                  if (!req || req.status !== "Pending") return null;
                  return (
                    <>
                      <Btn
                        variant="outline"
                        className="border-red-200 text-red-650 hover:bg-red-50"
                        onClick={() => {
                          rejectT(req.id);
                          setTApprovalDetailId(null);
                        }}
                      >
                        <X size={14} />
                        Reject Request
                      </Btn>
                      <Btn
                        variant="primary"
                        className="bg-green-600 hover:bg-green-700 focus:ring-green-500"
                        onClick={() => {
                          approveT(req.id);
                          setTApprovalDetailId(null);
                        }}
                      >
                        <Check size={14} />
                        Approve Request
                      </Btn>
                    </>
                  );
                })()
              }
            >
              {(() => {
                const req = teamReqs.find(r => r.id === tApprovalDetailId);
                if (!req) return null;

                const reason = req.reason || "Scheduled family vacation. Handover completed to the team lead.";
                const leaveBalance = [
                  { type: "Annual Leave", total: 18, used: 12, color: "bg-indigo-500" },
                  { type: "Sick Leave", total: 10, used: 2, color: "bg-red-500" },
                  { type: "Casual Leave", total: 6, used: 3, color: "bg-amber-500" },
                ];

                return (
                  <div className="space-y-6 text-left">
                    {/* Key Info Cards */}
                    <div className="bg-white rounded-xl border border-gray-150 p-4 shadow-sm space-y-4">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Request Details</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Leave Type</p>
                          <p className="text-xs font-semibold text-gray-850 mt-1">{req.type}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Department</p>
                          <p className="text-xs font-semibold text-gray-850 mt-1">Engineering</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Duration</p>
                          <p className="text-xs font-semibold text-gray-855 mt-1">{req.days} days ({fmtDate(req.from)} – {fmtDate(req.to)})</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Applied On</p>
                          <p className="text-xs font-semibold text-gray-855 mt-1">{fmtDate(req.applied)}</p>
                        </div>
                      </div>
                    </div>

                    {/* Reason */}
                    <div className="bg-white rounded-xl border border-gray-150 p-4 shadow-sm space-y-2">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Reason</h4>
                      <p className="text-xs text-gray-750 leading-relaxed font-medium">{reason}</p>
                    </div>

                    {/* Leave Balance */}
                    <div className="bg-white rounded-xl border border-gray-150 p-4 shadow-sm space-y-3.5">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Leave Balance</h4>
                      <div className="space-y-2.5">
                        {leaveBalance.map(b => (
                          <div key={b.type} className="text-xs">
                            <div className="flex justify-between font-semibold text-gray-700 mb-1">
                              <span>{b.type}</span>
                              <span>{b.total - b.used} / {b.total} Days Left</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                              <div className={cn("h-full rounded-full", b.color)} style={{ width: `${((b.total - b.used)/b.total)*100}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Attachments */}
                    <div className="bg-white rounded-xl border border-gray-150 p-4 shadow-sm space-y-3">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Attachments</h4>
                      <div className="flex items-center justify-between p-2.5 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100/70 transition-colors cursor-pointer">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-red-50 text-red-500 rounded flex items-center justify-center font-bold text-xs">PDF</div>
                          <div className="text-left">
                            <p className="text-xs font-bold text-gray-800">flight_tickets.pdf</p>
                            <p className="text-[10px] text-gray-400">1.2 MB · Document</p>
                          </div>
                        </div>
                        <ArrowDownRight className="text-gray-405 hover:text-gray-600" size={14} />
                      </div>
                    </div>

                    {/* Approver Timeline / History */}
                    <div className="bg-white rounded-xl border border-gray-150 p-4 shadow-sm space-y-3">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Approval History</h4>
                      <div className="relative border-l-2 border-gray-100 pl-4 ml-1 space-y-4 text-xs">
                        <div className="relative">
                          <span className="absolute -left-[21px] top-0.5 w-2.5 h-2.5 rounded-full bg-green-500 ring-4 ring-white" />
                          <p className="font-bold text-gray-800">Request Submitted</p>
                          <p className="text-[10px] text-gray-405 mt-0.5">{fmtDate(req.applied)} · System</p>
                        </div>
                        <div className="relative">
                          <span className={cn("absolute -left-[21px] top-0.5 w-2.5 h-2.5 rounded-full ring-4 ring-white", req.status === "Pending" ? "bg-amber-400" : req.status === "Approved" ? "bg-green-500" : "bg-red-500")} />
                          <p className="font-bold text-gray-800">Manager Review</p>
                          <p className="text-[10px] text-gray-405 mt-0.5">
                            {req.status === "Pending" ? "Awaiting review from Alex Admin (Manager)" : req.status === "Approved" ? "Approved by Alex Admin (Manager)" : "Rejected by Alex Admin (Manager)"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </Drawer>
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

      {/* ── TeamPage: Task Detail Drawer ── */}
      <Drawer
        isOpen={!!selectedTeamTask}
        onClose={() => setSelectedTeamTask(null)}
        title={selectedTeamTask?.title || "Task Details"}
        avatar={
          <div className="w-10 h-10 rounded-full bg-[#5B57E8] text-white text-sm font-semibold flex items-center justify-center">
            AA
          </div>
        }
        headerAddon={
          selectedTeamTask ? (
            <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full",
              selectedTeamTask.status === "Done" ? "bg-green-50 text-green-600" : selectedTeamTask.status === "Overdue" ? "bg-red-50 text-red-500" : selectedTeamTask.status === "In Progress" ? "bg-blue-50 text-blue-600" : "bg-gray-100 text-gray-500"
            )}>
              {selectedTeamTask.status}
            </span>
          ) : null
        }
        footer={
          <Btn variant="outline" onClick={() => setSelectedTeamTask(null)}>Close Details</Btn>
        }
      >
        {selectedTeamTask && (
          <div className="space-y-6 text-left">
            <div className="bg-white rounded-xl border border-gray-150 p-4 shadow-sm space-y-4">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Task Assignment</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Assigned To</p>
                  <p className="text-xs font-semibold text-gray-800 mt-1">{selectedTeamTask.assignee}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Department</p>
                  <p className="text-xs font-semibold text-gray-850 mt-1">{selectedTeamTask.dept}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Due Date</p>
                  <p className="text-xs font-semibold text-gray-855 mt-1">{selectedTeamTask.due}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Priority</p>
                  <p className="text-xs font-semibold text-gray-855 mt-1">
                    <span className={cn("px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                      selectedTeamTask.priority === "High" ? "bg-red-50 text-red-500" : selectedTeamTask.priority === "Medium" ? "bg-amber-50 text-amber-500" : "bg-gray-100 text-gray-400"
                    )}>
                      {selectedTeamTask.priority}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-150 p-4 shadow-sm space-y-2">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Description</h4>
              <p className="text-xs text-gray-700 leading-relaxed font-medium">
                Please complete the reviews and log the results in the system. Follow the standard guidelines for evaluations.
              </p>
            </div>
          </div>
        )}
      </Drawer>

      {/* ── TeamPage: Assign Task Modal ── */}
      {activeModal === "assign-task" && (
        <Modal title="Assign Task" onClose={() => { setShowAssignTask(false); handleCloseModal(); }}>
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
              <Btn variant="outline" onClick={() => { setShowAssignTask(false); handleCloseModal(); }}>Cancel</Btn>
              <Btn onClick={() => { setShowAssignTask(false); handleCloseModal(); }}><Plus size={13}/>Assign Task</Btn>
            </div>
          </div>
        </Modal>
      )}

      {/* ── TeamPage: Assign Shift Modal ── */}
      {activeModal === "assign-shift" && selectedEmp && (
        <Modal title={`Assign Shift · ${selectedEmp.name}`} onClose={() => { setShowAssignShift(false); handleCloseModal(); }} width="max-w-md">
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
              <Avt initials={selectedEmp.initials} color={selectedEmp.color} size="sm"/>
              <div><p className="text-sm font-semibold text-gray-900">{selectedEmp.name}</p><p className="text-xs text-gray-400">Current: {selectedEmp.shift}</p></div>
            </div>
            <SelectField label="New Shift">
              <option>Morning (6AM–2PM)</option><option>General (9AM–6PM)</option><option>Evening (2PM–10PM)</option><option>Night (10PM–6AM)</option><option>Flexible</option>
            </SelectField>
            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
              <Btn variant="outline" onClick={() => { setShowAssignShift(false); handleCloseModal(); }}>Cancel</Btn>
              <Btn onClick={() => { setShowAssignShift(false); handleCloseModal(); }}><Clock size={13}/>Save Shift</Btn>
            </div>
          </div>
        </Modal>
      )}

      {/* ── TeamPage: Approve Leave Modal ── */}
      {activeModal === "approve-leave" && tApproveId && (() => {
        const req = teamReqs.find(r => r.id === tApproveId);
        return req ? (
          <Modal title="Approve Leave" onClose={() => { setTApproveId(null); handleCloseModal(); }}>
            <div className="space-y-4 text-left">
              <div className="bg-green-50 border border-green-100 rounded-xl p-4 flex items-start gap-3">
                <CheckCircle size={18} className="text-green-500 flex-shrink-0 mt-0.5"/>
                <div><p className="text-sm font-semibold text-green-800">Confirm Approval</p><p className="text-xs text-green-700 mt-0.5">This will notify the employee and update their leave balance.</p></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {([["Employee",req.employee],["Leave Type",req.type],["Date Range",`${fmtDate(req.from)} – ${fmtDate(req.to)}`],["Total Days",req.days+" days"]] as [string,string][]).map(([k,v])=>(
                  <div key={k} className="bg-gray-55 rounded-lg p-3"><p className="text-[10px] text-gray-400 uppercase tracking-wide mb-1">{k}</p><p className="text-sm font-semibold text-gray-800">{v}</p></div>
                ))}
              </div>
              <div className="flex justify-end gap-3 pt-2 border-t border-gray-200">
                <Btn variant="outline" onClick={() => { setTApproveId(null); handleCloseModal(); }}>Cancel</Btn>
                <Btn onClick={confirmApproveT} className="bg-green-600 hover:bg-green-700"><Check size={13}/>Approve</Btn>
              </div>
            </div>
          </Modal>
        ) : null;
      })()}

      {/* ── TeamPage: Reject Leave Modal ── */}
      {activeModal === "reject-leave" && tRejectId && (() => {
        const req = teamReqs.find(r => r.id === tRejectId);
        return req ? (
          <Modal title="Reject Leave Request" onClose={() => { setTRejectId(null); handleCloseModal(); }}>
            <div className="space-y-4 text-left">
              <div className="grid grid-cols-2 gap-3">
                {([["Employee",req.employee],["Type",req.type],["Period",`${fmtDate(req.from)} – ${fmtDate(req.to)}`],["Days",req.days+" days"]] as [string,string][]).map(([k,v])=>(
                  <div key={k} className="bg-gray-55 rounded-lg p-3"><p className="text-[10px] text-gray-400 uppercase tracking-wide mb-1">{k}</p><p className="text-sm font-semibold text-gray-800">{v}</p></div>
                ))}
              </div>
              <div className="flex justify-end gap-3 pt-2 border-t border-gray-200">
                <Btn variant="outline" onClick={() => { setTRejectId(null); handleCloseModal(); }}>Cancel</Btn>
                <Btn onClick={confirmRejectT} className="bg-red-600 hover:bg-red-700"><X size={13}/>Reject Leave</Btn>
              </div>
            </div>
          </Modal>
        ) : null;
      })()}

      {/* ── TeamPage: Email Modal ── */}
      {activeModal === "email" && selectedEmp && (
        <Modal title={`Email · ${selectedEmp.name}`} onClose={() => { setShowEmailModal(false); handleCloseModal(); }} width="max-w-xl">
          <div className="space-y-3 text-left">
            <InputField label="Subject" value={emailSubject} onChange={e=>setEmailSubject(e.target.value)} placeholder="Subject…"/>
            <div className="flex flex-col gap-1"><label className="text-xs font-semibold text-gray-500">Message</label><textarea rows={6} value={emailBody} onChange={e=>setEmailBody(e.target.value)} placeholder="Write your message…" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#5C5CFF]"/></div>
            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
              <Btn variant="outline" onClick={() => { setShowEmailModal(false); handleCloseModal(); }}>Cancel</Btn>
              <Btn onClick={() => { setShowEmailModal(false); handleCloseModal(); }}><Send size={13}/>Send Email</Btn>
            </div>
          </div>
        </Modal>
      )}

      {/* ── TeamPage: Call Modal ── */}
      {activeModal === "call" && selectedEmp && (
        <Modal title="Contact Details" onClose={() => { setShowCallModal(false); handleCloseModal(); }} width="max-w-sm">
          <div className="space-y-3 text-left">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
              <Avt initials={selectedEmp.initials} color={selectedEmp.color} size="md"/>
              <div><p className="font-semibold text-gray-900">{selectedEmp.name}</p><p className="text-xs text-gray-500">{selectedEmp.designation}</p></div>
            </div>
            <Btn className="w-full justify-center" onClick={() => { setShowCallModal(false); handleCloseModal(); }}><Phone size={13}/>Call Now</Btn>
          </div>
        </Modal>
      )}

      {/* ── TeamPage: Filters Modal ── */}
      {activeModal === "filter-members" && (
        <Modal title="Filter Members & Reportees" onClose={() => { setShowTeamFilter(false); handleCloseModal(); }} width="max-w-md">
          <div className="space-y-4 text-left">
            <SelectField
              label="Department"
              options={depts}
              value={deptFilter}
              onChange={(v) => setDeptFilter(v)}
            />
            <SelectField
              label="Location"
              options={locations}
              value={locationFilter}
              onChange={(v) => setLocationFilter(v)}
            />
            <SelectField
              label="Designation"
              options={desigs}
              value={desigFilter}
              onChange={(v) => setDesigFilter(v)}
            />
            <SelectField
              label="Status"
              options={["All", "Active", "On Leave", "Inactive"]}
              value={statusFilter}
              onChange={(v) => setStatusFilter(v)}
            />
            <div className="flex justify-end gap-2 pt-2 border-t border-gray-150">
              <Btn variant="outline" size="sm" onClick={() => {
                setDeptFilter("All");
                setLocationFilter("All");
                setDesigFilter("All");
                setStatusFilter("All");
                setShowTeamFilter(false);
                handleCloseModal();
              }}>Reset</Btn>
              <Btn size="sm" onClick={() => { setShowTeamFilter(false); handleCloseModal(); }}>Apply Filters</Btn>
            </div>
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
function EmployeeProfilePage({ employee, navigate, origin }: { employee:Employee; navigate:(p:AppPage)=>void; origin?: string }) {
  const [tab, setTab] = useState("Activities");
  const [showEdit, setShowEdit] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white border-b border-gray-200 px-6 py-5">
        <div className="flex items-start justify-between mb-4">
          {origin === "team" ? (
            <button 
              onClick={() => navigate("team")} 
              className="flex items-center gap-1.5 text-gray-505 hover:text-[#5C5CFF] font-medium text-xs mb-3 transition-colors"
            >
              <ChevronLeft size={14} /> Back to Reportees
            </button>
          ) : (
            <div className="text-xs text-gray-400 flex items-center gap-1 mb-3">
              <button onClick={()=>navigate("my-space")} className="hover:text-[#5C5CFF]">Home</button><ChevronRight size={12}/>
              <button onClick={()=>navigate("organization")} className="hover:text-[#5C5CFF]">Organization</button><ChevronRight size={12}/>
              <span>{employee.name}</span>
            </div>
          )}
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
                    <button
                      key={label}
                      onClick={() => {
                        if (label === "Assign Task") {
                          alert(`Assign Task for ${employee.name} is handled in the Tasks module.`);
                        } else if (label === "Assign Shift") {
                          alert(`Assign Shift for ${employee.name} is handled in the Shift Planner.`);
                        } else if (label === "Send Message") {
                          alert(`Sending messages to ${employee.name} is handled in Team Feed.`);
                        } else if (label === "View Attendance") {
                          setTab("Attendance");
                        } else if (label === "View Leave History") {
                          setTab("Leave");
                        } else if (label === "Download Profile") {
                          alert(`Downloading profile for ${employee.name}...`);
                        } else if (label === "Edit Employee") {
                          setShowEdit(true);
                        } else if (label === "Deactivate Employee") {
                          alert(`Deactivating employee ${employee.name}...`);
                        }
                      }}
                      className={cn("w-full flex items-center gap-2.5 px-3 py-2 text-sm rounded-lg border border-gray-200 text-left transition-colors",danger?"text-red-600 hover:bg-red-50 border-red-100":"text-gray-600 hover:bg-gray-50")}
                    >
                      <Icon size={14} className={danger?"text-red-500":"text-[#5C5CFF]"}/>
                      {label}
                    </button>
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

// ── Settings Page (trimmed) ────────────────────────────────────────────────────

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
// ── Support Page ───────────────────────────────────────────────────────────────

// ── Tasks Page ─────────────────────────────────────────────────────────────────

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
  const [teamTab, setTeamTab] = useState<string>("Overview");
  const [orgTab, setOrgTab] = useState<string>("Overview");
  const [supportTab, setSupportTab] = useState<string>("Home");
  const [attPeriod, setAttPeriod] = useState<"Weekly" | "Monthly" | "Yearly">("Monthly");
  const [checkedIn, setCheckedIn] = useState<boolean>(true);
  const [teamDeptFilter, setTeamDeptFilter] = useState<string>("All");
  const [teamLocationFilter, setTeamLocationFilter] = useState<string>("All");
  const [reporteesViewMode, setReporteesViewMode] = useState<"list"|"grid">(
    () => (sessionStorage.getItem("reportees_view_mode") as "list"|"grid") || "list"
  );

  useEffect(() => {
    sessionStorage.setItem("reportees_view_mode", reporteesViewMode);
  }, [reporteesViewMode]);

  // Search input states
  const [profileOrigin, setProfileOrigin] = useState<string | null>(null);

  useEffect(() => {
    const handleUrl = () => {
      const path = window.location.pathname;
      const match = path.match(/\/team\/reportees\/([A-Za-z0-9E-]+)/);
      if (match) {
        const empId = match[1];
        const emp = EMPLOYEES.find(e => e.id === empId);
        if (emp) {
          setSelectedEmployee(emp);
          setPage("employee-profile");
          setProfileOrigin("team");
        }
      } else if (path === "/team") {
        setPage("team");
      } else if (path === "/organization") {
        setPage("organization");
      }
    };

    handleUrl();
    window.addEventListener("popstate", handleUrl);
    return () => window.removeEventListener("popstate", handleUrl);
  }, []);

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
  const [showCreateDiscussion, setShowCreateDiscussion] = useState(false);
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
      setOrgTab(tabOrSection);
    }

    if (p === "employee-profile" && emp) {
      setProfileOrigin(page === "team" ? "team" : "organization");
      window.history.pushState(null, "", `/team/reportees/${emp.id}`);
    } else {
      if (p === "team") {
        window.history.pushState(null, "", "/team");
      } else if (p === "organization") {
        window.history.pushState(null, "", "/organization");
      } else {
        window.history.pushState(null, "", "/");
      }
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

    // Synchronized flat tabs directly

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
    workspaceSwitch = null;
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
    headerTabs = ["Overview", "Reportees", "Approvals", "Tasks", "Feed", "Announcements"];
    activeHeaderTab = teamTab;
    onHeaderTabChange = setTeamTab;
  } else if (page === "organization") {
    headerTabs = ["Overview", "Employees", "Employee Tree", "Departments", "Operations", "Policies", "Announcements", "Reports"];
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
    const isTree = orgTab === "Employee Tree";
    headerToolbar = (
      <>
        <div className="relative w-64 h-[38px] flex items-center gap-2 px-3 bg-[#F6F7F9] border border-[#E8E9ED] rounded-[9px]">
          <Search size={14} className="text-[#9CA0AB] flex-shrink-0" />
          <input
            type="text"
            placeholder={isTree ? "Search employees..." : "Search..."}
            value={orgSearch}
            onChange={(e) => setOrgSearch(e.target.value)}
            className="w-full bg-transparent text-[13px] text-[#16181D] placeholder-[#9CA0AB] outline-none"
          />
        </div>
        <div className="flex-1" />
        <button
          onClick={() => setShowTeamFilter(true)}
          title="Filter"
          className="h-10 w-10 flex items-center justify-center p-0 rounded-[10px] border border-[#E5E7EB] bg-[#FFFFFF] text-[#16181D] hover:bg-gray-50 transition-colors"
        >
          <SlidersHorizontal size={16} />
        </button>
        <button
          onClick={() => attMsg(isTree ? "Employee Tree structure exported" : "Organization directory exported")}
          title="Export"
          className="h-10 px-[18px] rounded-[10px] border border-[#E5E7EB] bg-[#FFFFFF] text-[#16181D] text-[14px] font-medium flex items-center gap-2 hover:bg-gray-50 transition-colors"
        >
          <Download size={16} />
          Export
        </button>
        {!isTree && (
          <button
            onClick={() => navigate("employee-add")}
            className="h-10 px-[18px] rounded-[10px] border border-[#E5E7EB] bg-[#FFFFFF] text-[#16181D] text-[14px] font-medium flex items-center gap-2 hover:bg-gray-50 transition-colors"
          >
            <Plus size={16} strokeWidth={2.2} />
            Add Employee
          </button>
        )}
      </>
    );
  } else if (page === "team") {
    if (teamTab === "Overview") {
      headerToolbar = (
        <>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Team / Department:</span>
            <select
              value={teamDeptFilter}
              onChange={(e) => setTeamDeptFilter(e.target.value)}
              className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-[10px] h-[38px] px-3 text-xs font-semibold text-gray-800 outline-none cursor-pointer focus:border-[#5C5CFF]/30 transition-colors"
            >
              {depts.map(d => (
                <option key={d} value={d}>{d === "All" ? "All Departments" : d}</option>
              ))}
            </select>
          </div>
          <div className="flex-1" />
          <button
            onClick={() => setShowTeamFilter(true)}
            className="h-10 w-10 flex items-center justify-center p-0 rounded-[10px] border border-[#E5E7EB] bg-[#FFFFFF] text-[#16181D] hover:bg-gray-50 transition-colors"
            title="Filters"
          >
            <SlidersHorizontal size={16} />
          </button>
        </>
      );
    } else if (teamTab === "Feed") {
      headerToolbar = null;
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
          
          {/* View Switcher Container */}
          <div className="flex items-center border border-[#E5E7EB] rounded-[10px] bg-[#FFFFFF] overflow-hidden h-10">
            <button
              onClick={() => setReporteesViewMode("list")}
              title="List view"
              className={cn(
                "h-full w-10 flex items-center justify-center transition-colors border-r border-[#E5E7EB]",
                reporteesViewMode === "list"
                  ? "bg-[#EEF2FF] text-[#5C5CFF]"
                  : "text-gray-500 hover:bg-gray-50"
              )}
            >
              <List size={16} />
            </button>
            <button
              onClick={() => setReporteesViewMode("grid")}
              title="Grid view"
              className={cn(
                "h-full w-10 flex items-center justify-center transition-colors",
                reporteesViewMode === "grid"
                  ? "bg-[#EEF2FF] text-[#5C5CFF]"
                  : "text-gray-500 hover:bg-gray-50"
              )}
            >
              <LayoutGrid size={16} />
            </button>
          </div>

          <button
            onClick={() => setShowTeamFilter(true)}
            title="Filter"
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
            } else if (action === "discussion") {
              navigate("team");
              setTeamTab("Feed");
              setShowCreateDiscussion(true);
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
          {page==="team"&&<TeamPage navigate={navigate} activeTab={teamTab} search={teamSearch} showCreatePost={showCreatePost} setShowCreatePost={setShowCreatePost} showCreateAnnouncement={showCreateAnnouncement} setShowCreateAnnouncement={setShowCreateAnnouncement} showCreateTask={showCreateTask} setShowCreateTask={setShowCreateTask} reporteesViewMode={reporteesViewMode} showTeamFilter={showTeamFilter} setShowTeamFilter={setShowTeamFilter} deptFilter={teamDeptFilter} setDeptFilter={setTeamDeptFilter} locationFilter={teamLocationFilter} setLocationFilter={setTeamLocationFilter} showCreateDiscussion={showCreateDiscussion} setShowCreateDiscussion={setShowCreateDiscussion}/>}
          {page==="organization"&&<OrganizationPage navigate={navigate} onSelectEmployee={e=>navigate("employee-profile",e)} activeTab={orgTab} onTabChange={setOrgTab} showTeamFilter={showTeamFilter} setShowTeamFilter={setShowTeamFilter} search={orgSearch}/>}
          {page==="attendance"&&<AttendancePage navigate={navigate} section={attendanceSection} onSectionChange={setAttendanceSection} activeTab={attendanceTab}/>}
          {page==="leave"&&<LeavePage navigate={navigate} section={leaveSection} onSectionChange={setLeaveSection} activeTab={leaveTab}/>}
          {page==="tasks"&&<TasksPage navigate={navigate} activeTab={tasksTab}/>}
          {page==="employee-profile"&&<EmployeeProfilePage employee={selectedEmployee} navigate={navigate} origin={profileOrigin || undefined}/>}
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
