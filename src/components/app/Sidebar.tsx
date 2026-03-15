"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard, Database, MessageSquare, PenLine, HeartPulse,
  MessageCircle, GitBranch, BarChart3, Plug, Layout, FileText,
  Shield, Settings, ChevronLeft, ChevronRight, User,
} from "lucide-react";
import { useAppStore } from "@/lib/store";

const NAV_ITEMS = [
  { href: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard, badge: null },
  { href: "/app/sources", label: "Sources", icon: Database, badgeKey: "sources" as const },
  { href: "/app/resolve", label: "Resolve", icon: MessageSquare, badgeKey: "conversations" as const },
  { href: "/app/foundry", label: "Foundry", icon: PenLine, badge: null },
  { href: "/app/health", label: "Health", icon: HeartPulse, badgeKey: "healthScore" as const },
  { href: "/app/feedback", label: "Feedback", icon: MessageCircle, badgeKey: "feedback" as const },
  { href: "/app/workflows", label: "Workflows", icon: GitBranch, badge: null },
  { href: "/app/analytics", label: "Analytics", icon: BarChart3, badge: null },
  { href: "/app/integrations", label: "Integrations", icon: Plug, badge: null },
  { href: "/app/widget", label: "Widget", icon: Layout, badge: null },
  { href: "/app/reports", label: "Reports", icon: FileText, badge: null },
  { href: "/app/audit", label: "Audit", icon: Shield, badge: null },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, setSidebarCollapsed, sources, conversations, feedbackItems, healthIssues } = useAppStore();

  const getBadgeValue = (key?: string) => {
    if (!key) return null;
    switch (key) {
      case "sources": return sources.length;
      case "conversations": return conversations.length;
      case "healthScore": {
        const avg = Math.round(sources.reduce((a, s) => a + s.healthScore, 0) / (sources.length || 1));
        return avg;
      }
      case "feedback": return feedbackItems.filter((f) => f.status === "unresolved").length;
      default: return null;
    }
  };

  const getStatusDot = (href: string) => {
    if (href === "/app/health") {
      const issues = healthIssues.filter((h) => !h.resolved && h.severity === "critical").length;
      return issues > 0 ? "bg-amber-400" : "bg-emerald-400";
    }
    if (href === "/app/feedback") {
      return feedbackItems.some((f) => f.status === "unresolved") ? "bg-amber-400" : "bg-emerald-400";
    }
    return "bg-emerald-400";
  };

  return (
    <aside
      className={`fixed left-0 top-0 h-screen z-40 flex flex-col transition-all duration-300 ${
        sidebarCollapsed ? "w-[68px]" : "w-[240px]"
      }`}
      style={{ backgroundColor: "#080604" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 h-16 border-b border-white/5">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#4597b0] to-[#62acbb] shrink-0">
          <span className="text-white text-sm font-bold">ai</span>
        </div>
        {!sidebarCollapsed && (
          <span className="text-white/90 text-sm font-semibold tracking-tight">
            aiCartograph
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          const badge = getBadgeValue(item.badgeKey);
          const dot = getStatusDot(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150 relative ${
                isActive
                  ? "bg-white/10 text-white"
                  : "text-white/50 hover:text-white/80 hover:bg-white/5"
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-[#4597b0]" />
              )}
              <div className="relative shrink-0">
                <Icon size={18} />
                <div className={`absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full ${dot}`} />
              </div>
              {!sidebarCollapsed && (
                <>
                  <span className="flex-1">{item.label}</span>
                  {badge !== null && (
                    <span className="text-[10px] bg-white/10 text-white/60 px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                      {badge}
                    </span>
                  )}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t border-white/5 p-2 space-y-0.5">
        <Link
          href="/app/settings"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
            pathname === "/app/settings"
              ? "bg-white/10 text-white"
              : "text-white/50 hover:text-white/80 hover:bg-white/5"
          }`}
        >
          <Settings size={18} />
          {!sidebarCollapsed && <span>Settings</span>}
        </Link>
        <div className="flex items-center gap-3 px-3 py-2 text-white/50">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#4597b0] to-[#62acbb] flex items-center justify-center shrink-0">
            <User size={12} className="text-white" />
          </div>
          {!sidebarCollapsed && <span className="text-xs truncate">Atlas</span>}
        </div>
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/50 hover:text-white/80 hover:bg-white/5 w-full transition-all"
        >
          {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          {!sidebarCollapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
