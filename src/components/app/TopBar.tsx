"use client";

import { usePathname } from "next/navigation";
import { Search, Bell, Upload, ChevronRight, LogOut, Sun, Moon, User } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useState, useRef, useEffect } from "react";

const PAGE_NAMES: Record<string, string> = {
  "/app/dashboard": "Dashboard",
  "/app/sources": "Sources",
  "/app/resolve": "Resolve",
  "/app/foundry": "Foundry",
  "/app/health": "Health",
  "/app/feedback": "Feedback",
  "/app/workflows": "Workflows",
  "/app/analytics": "Analytics",
  "/app/integrations": "Integrations",
  "/app/widget": "Widget",
  "/app/reports": "Reports",
  "/app/audit": "Audit",
  "/app/settings": "Settings",
};

export default function TopBar() {
  const pathname = usePathname();
  const { setCommandPaletteOpen, notifications, markNotificationRead, markAllNotificationsRead, theme, toggleTheme, logout, user } = useAppStore();
  const [notifOpen, setNotifOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const unread = notifications.filter((n) => !n.read).length;
  const pageName = PAGE_NAMES[pathname] || "Dashboard";

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
      if (userRef.current && !userRef.current.contains(e.target as Node)) setUserMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header
      className="h-14 flex items-center justify-between px-6 sticky top-0 z-30 backdrop-blur-xl"
      style={{
        background: "var(--topbar-bg)",
        borderBottom: "1px solid var(--border-primary)",
      }}
    >
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm">
        <span style={{ color: "var(--text-muted)" }}>aiCartograph</span>
        <ChevronRight size={14} style={{ color: "var(--text-muted)" }} />
        <span className="font-medium" style={{ color: "var(--text-primary)" }}>{pageName}</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all"
          style={{
            background: "var(--bg-input)",
            border: "1px solid var(--border-primary)",
            color: "var(--text-muted)",
          }}
        >
          <Search size={14} />
          <span className="hidden sm:inline">Search...</span>
          <kbd className="hidden sm:inline text-[10px] px-1.5 py-0.5 rounded" style={{ background: "var(--bg-input)", color: "var(--text-muted)" }}>
            ⌘K
          </kbd>
        </button>

        {/* Upload */}
        <a
          href="/app/sources"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white text-sm font-medium transition-all hover:shadow-lg hover:shadow-[#4597b0]/20"
          style={{ background: "linear-gradient(135deg, #4597b0, #56b3f5)" }}
        >
          <Upload size={14} />
          <span className="hidden sm:inline">Upload Source</span>
        </a>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg transition-all"
          style={{ color: "var(--text-tertiary)" }}
          title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative p-2 rounded-lg transition-all"
            style={{ color: "var(--text-tertiary)" }}
          >
            <Bell size={18} />
            {unread > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-medium">
                {unread}
              </span>
            )}
          </button>
          {notifOpen && (
            <div
              className="absolute right-0 top-full mt-2 w-80 rounded-xl shadow-xl overflow-hidden"
              style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-primary)" }}
            >
              <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid var(--border-primary)" }}>
                <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Notifications</span>
                <button
                  onClick={() => markAllNotificationsRead()}
                  className="text-[#4597b0] text-xs hover:underline"
                >
                  Mark all read
                </button>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => markNotificationRead(n.id)}
                    className="w-full text-left px-4 py-3 transition-all"
                    style={{ borderBottom: "1px solid var(--border-primary)" }}
                  >
                    <div className="flex items-start gap-2">
                      {!n.read && <div className="w-2 h-2 rounded-full bg-[#4597b0] mt-1.5 shrink-0" />}
                      <div className={!n.read ? "" : "pl-4"}>
                        <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{n.title}</p>
                        <p className="text-xs mt-0.5" style={{ color: "var(--text-tertiary)" }}>{n.message}</p>
                        <p className="text-[10px] mt-1" style={{ color: "var(--text-muted)" }}>
                          {new Date(n.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Avatar / User Menu */}
        <div className="relative" ref={userRef}>
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4597b0] to-[#56b3f5] flex items-center justify-center text-white text-xs font-bold cursor-pointer hover:shadow-lg hover:shadow-[#4597b0]/30 transition-all"
          >
            {user.name[0]}
          </button>
          {userMenuOpen && (
            <div
              className="absolute right-0 top-full mt-2 w-56 rounded-xl shadow-xl overflow-hidden"
              style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-primary)" }}
            >
              <div className="px-4 py-3" style={{ borderBottom: "1px solid var(--border-primary)" }}>
                <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{user.name}</p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>{user.email}</p>
                <p className="text-[10px] mt-1" style={{ color: "var(--text-muted)" }}>{user.company} &middot; {user.role}</p>
              </div>
              <div className="py-1">
                <a
                  href="/app/settings"
                  className="flex items-center gap-2 px-4 py-2 text-sm transition-all"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <User size={14} /> Profile & Settings
                </a>
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 px-4 py-2 text-sm w-full transition-all"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
                  {theme === "dark" ? "Light Mode" : "Dark Mode"}
                </button>
                <div style={{ borderTop: "1px solid var(--border-primary)", margin: "4px 0" }} />
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 text-sm w-full text-red-400 hover:bg-red-400/10 transition-all"
                >
                  <LogOut size={14} /> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
