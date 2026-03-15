"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard, Database, HeartPulse, MessageSquare, Bot,
  BarChart3, MessageCircle, GitBranch, Shield, BookOpen,
  ChevronLeft, ChevronRight, LogOut, Sun, Moon,
  ChevronDown, ChevronUp,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useState } from "react";

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  badge?: () => string | number | null;
}

interface NavGroup {
  title: string;
  pillarColor?: string;
  items: NavItem[];
  collapsible?: boolean;
}

export default function Sidebar() {
  const pathname = usePathname();
  const {
    sidebarCollapsed, setSidebarCollapsed, sources, conversations,
    feedbackItems, healthIssues, theme, toggleTheme, logout, user,
  } = useAppStore();

  const [adminExpanded, setAdminExpanded] = useState(true);

  const healthScore = Math.round(sources.reduce((a, s) => a + s.healthScore, 0) / (sources.length || 1));
  const openFeedback = feedbackItems.filter((f) => f.status === "unresolved").length;

  const navGroups: NavGroup[] = [
    {
      title: "",
      items: [
        { href: "/app/dashboard", label: "Command Center", icon: LayoutDashboard },
      ],
    },
    {
      title: "CONNECT",
      pillarColor: "#d4a853",
      items: [
        { href: "/app/sources", label: "Sources", icon: Database, badge: () => sources.length },
      ],
    },
    {
      title: "RESOLVE",
      pillarColor: "#4597b0",
      items: [
        { href: "/app/resolve", label: "Resolve", icon: MessageSquare, badge: () => conversations.length },
        { href: "/app/agents", label: "Agent Studio", icon: Bot },
      ],
    },
    {
      title: "DETECT",
      pillarColor: "#d4726a",
      items: [
        { href: "/app/health", label: "Health", icon: HeartPulse, badge: () => healthScore },
        { href: "/app/analytics", label: "Analytics", icon: BarChart3 },
      ],
    },
    {
      title: "CLOSE THE LOOP",
      pillarColor: "#4ba88e",
      items: [
        { href: "/app/feedback", label: "Feedback", icon: MessageCircle, badge: () => openFeedback > 0 ? openFeedback : null },
      ],
    },
    {
      title: "ADMIN",
      collapsible: true,
      items: [
        { href: "/app/workflows", label: "Automations", icon: GitBranch },
        { href: "/app/audit", label: "Audit Trail", icon: Shield },
        { href: "/app/docs", label: "API & Docs", icon: BookOpen },
      ],
    },
  ];

  const getStatusDot = (href: string) => {
    if (href === "/app/health") {
      const issues = healthIssues.filter((h) => !h.resolved && h.severity === "critical").length;
      return issues > 0 ? "bg-amber-400" : "bg-emerald-400";
    }
    if (href === "/app/feedback") {
      return openFeedback > 0 ? "bg-amber-400" : "bg-emerald-400";
    }
    return null;
  };

  return (
    <aside
      className={`fixed left-0 top-0 h-screen z-40 flex flex-col transition-all duration-300 ${
        sidebarCollapsed ? "w-[68px]" : "w-[240px]"
      }`}
      style={{ backgroundColor: "var(--sidebar-bg)" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 h-14 border-b border-white/5 shrink-0">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#4597b0] via-[#56b3f5] to-[#36c08e] shrink-0 shadow-md animate-gradient-flow">
          <span className="text-white text-sm font-bold">ai</span>
        </div>
        {!sidebarCollapsed && (
          <span className="text-white/90 text-sm font-semibold tracking-tight">
            aiCartograph
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-2 px-2 space-y-1">
        {navGroups.map((group) => {
          const isAdminGroup = group.collapsible;
          const isExpanded = !isAdminGroup || adminExpanded;

          return (
            <div key={group.title || "main"}>
              {/* Group Title */}
              {group.title && !sidebarCollapsed && (
                <div className="flex items-center justify-between px-3 pt-4 pb-1.5">
                  {isAdminGroup ? (
                    <button
                      onClick={() => setAdminExpanded(!adminExpanded)}
                      className="flex items-center gap-1 w-full text-white/25 text-[10px] uppercase tracking-[0.15em] font-semibold hover:text-white/40 transition-colors"
                    >
                      <span>{group.title}</span>
                      {adminExpanded ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
                    </button>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      {group.pillarColor && (
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: group.pillarColor }}
                        />
                      )}
                      <span className="text-white/25 text-[10px] uppercase tracking-[0.15em] font-semibold">
                        {group.title}
                      </span>
                    </div>
                  )}
                </div>
              )}
              {sidebarCollapsed && group.title && (
                <div className="mx-auto w-6 border-t border-white/10 my-2" />
              )}

              {/* Items */}
              {isExpanded && group.items.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                const Icon = item.icon;
                const badge = item.badge?.();
                const dot = getStatusDot(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={sidebarCollapsed ? item.label : undefined}
                    className={`group flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150 relative ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-white/50 hover:text-white/80 hover:bg-white/5"
                    }`}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-gradient-to-b from-[#4597b0] to-[#56b3f5]" />
                    )}
                    <div className="relative shrink-0">
                      <Icon size={18} />
                      {dot && <div className={`absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full ${dot}`} />}
                    </div>
                    {!sidebarCollapsed && (
                      <>
                        <span className="flex-1 truncate">{item.label}</span>
                        {badge !== null && badge !== undefined && (
                          <span className="text-[10px] bg-white/10 text-white/60 px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                            {badge}
                          </span>
                        )}
                      </>
                    )}
                  </Link>
                );
              })}
            </div>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t border-white/5 p-2 space-y-0.5 shrink-0">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/50 hover:text-white/80 hover:bg-white/5 w-full transition-all"
          title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          {!sidebarCollapsed && <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>}
        </button>

        {/* User */}
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#4597b0] to-[#56b3f5] flex items-center justify-center shrink-0 text-white text-xs font-bold">
            {user.name[0]}
          </div>
          {!sidebarCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-white/80 text-xs font-medium truncate">{user.name}</p>
              <p className="text-white/30 text-[10px] truncate">{user.role}</p>
            </div>
          )}
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-400/70 hover:text-red-400 hover:bg-red-400/10 w-full transition-all"
        >
          <LogOut size={18} />
          {!sidebarCollapsed && <span>Sign Out</span>}
        </button>

        {/* Collapse */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/30 hover:text-white/60 hover:bg-white/5 w-full transition-all"
        >
          {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          {!sidebarCollapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
