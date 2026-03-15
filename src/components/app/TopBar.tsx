"use client";

import { usePathname } from "next/navigation";
import { Search, Bell, Upload, ChevronRight } from "lucide-react";
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
  const { setCommandPaletteOpen, notifications, markNotificationRead, markAllNotificationsRead } = useAppStore();
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const unread = notifications.filter((n) => !n.read).length;
  const pageName = PAGE_NAMES[pathname] || "Dashboard";

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-[#0c2329]/80 backdrop-blur-xl sticky top-0 z-30">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-white/40">aiCartograph</span>
        <ChevronRight size={14} className="text-white/20" />
        <span className="text-white/90 font-medium">{pageName}</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/40 text-sm hover:bg-white/10 hover:text-white/60 transition-all"
        >
          <Search size={14} />
          <span className="hidden sm:inline">Search...</span>
          <kbd className="hidden sm:inline text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-white/30">⌘K</kbd>
        </button>

        {/* Upload */}
        <a
          href="/app/sources"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#4597b0] text-white text-sm font-medium hover:bg-[#62acbb] transition-all"
        >
          <Upload size={14} />
          <span className="hidden sm:inline">Upload Source</span>
        </a>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative p-2 rounded-lg text-white/50 hover:text-white/80 hover:bg-white/5 transition-all"
          >
            <Bell size={18} />
            {unread > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-medium">
                {unread}
              </span>
            )}
          </button>
          {notifOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-[#223e49] border border-white/10 rounded-xl shadow-xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                <span className="text-white/90 text-sm font-medium">Notifications</span>
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
                    className={`w-full text-left px-4 py-3 border-b border-white/5 hover:bg-white/5 transition-all ${
                      !n.read ? "bg-white/[0.02]" : ""
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {!n.read && <div className="w-2 h-2 rounded-full bg-[#4597b0] mt-1.5 shrink-0" />}
                      <div className={!n.read ? "" : "pl-4"}>
                        <p className="text-white/90 text-sm font-medium">{n.title}</p>
                        <p className="text-white/50 text-xs mt-0.5">{n.message}</p>
                        <p className="text-white/30 text-[10px] mt-1">
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

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4597b0] to-[#62acbb] flex items-center justify-center text-white text-xs font-bold cursor-pointer">
          A
        </div>
      </div>
    </header>
  );
}
