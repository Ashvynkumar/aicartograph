"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Search, LayoutDashboard, Database, MessageSquare, PenLine,
  HeartPulse, MessageCircle, GitBranch, BarChart3, Plug,
  Layout, FileText, Shield, Settings, Upload, Zap,
} from "lucide-react";
import { useAppStore } from "@/lib/store";

interface PaletteItem {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  action: () => void;
  category: string;
}

export default function CommandPalette() {
  const router = useRouter();
  const { commandPaletteOpen, setCommandPaletteOpen, sources, conversations } = useAppStore();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const items: PaletteItem[] = [
    { id: "dashboard", label: "Command Center", description: "Dashboard & Compass", icon: LayoutDashboard, action: () => router.push("/app/dashboard"), category: "Pages" },
    { id: "sources", label: "Sources & Docs", description: "Knowledge sources & documents", icon: Database, action: () => router.push("/app/sources"), category: "Pages" },
    { id: "resolve", label: "Resolve", description: "Ask a question", icon: MessageSquare, action: () => router.push("/app/resolve"), category: "Pages" },
    { id: "agents", label: "Agent Studio", description: "Build WhatsApp, Slack, web agents", icon: Zap, action: () => router.push("/app/agents"), category: "Pages" },
    { id: "health", label: "Health & Gaps", description: "Knowledge quality & gaps", icon: HeartPulse, action: () => router.push("/app/health"), category: "Pages" },
    { id: "feedback", label: "Feedback Loop", description: "Unresolved questions", icon: MessageCircle, action: () => router.push("/app/feedback"), category: "Pages" },
    { id: "analytics", label: "Analytics & Reports", description: "Metrics, ROI, automated reports", icon: BarChart3, action: () => router.push("/app/analytics"), category: "Pages" },
    { id: "admin", label: "Admin Control", description: "White-label, i18n, team, branding", icon: Settings, action: () => router.push("/app/admin"), category: "Pages" },
    { id: "workflows", label: "Automations", description: "Workflow builder", icon: GitBranch, action: () => router.push("/app/workflows"), category: "Pages" },
    { id: "integrations", label: "Integrations", description: "Connect external tools", icon: Plug, action: () => router.push("/app/integrations"), category: "Pages" },
    { id: "audit", label: "Audit Trail", description: "Compliance log", icon: Shield, action: () => router.push("/app/audit"), category: "Pages" },
    { id: "docs", label: "API & Docs", description: "Developer docs, MkDocs, MD export", icon: FileText, action: () => router.push("/app/docs"), category: "Pages" },
    { id: "settings", label: "Settings", description: "Configuration", icon: Settings, action: () => router.push("/app/settings"), category: "Pages" },
    { id: "upload", label: "Upload a source", description: "Add new knowledge", icon: Upload, action: () => router.push("/app/sources"), category: "Actions" },
    { id: "ask", label: "Ask a question", description: "Start a resolution", icon: MessageSquare, action: () => router.push("/app/resolve"), category: "Actions" },
    { id: "check-health", label: "Check health", description: "Run health analysis", icon: HeartPulse, action: () => router.push("/app/health"), category: "Actions" },
    { id: "run-staleness", label: "Run staleness check", description: "Detect stale sources", icon: Zap, action: () => router.push("/app/health"), category: "Actions" },
    ...sources.map((s) => ({
      id: `source-${s.id}`,
      label: s.title,
      description: `${s.type.toUpperCase()} · ${s.chunks.length} chunks · Health: ${s.healthScore}`,
      icon: Database,
      action: () => router.push("/app/sources"),
      category: "Sources",
    })),
    ...conversations.slice(0, 5).map((c) => ({
      id: `conv-${c.id}`,
      label: c.title,
      description: `${c.resolutions.length} resolution(s)`,
      icon: MessageSquare,
      action: () => router.push("/app/resolve"),
      category: "Recent",
    })),
  ];

  const filtered = query
    ? items.filter(
        (i) =>
          i.label.toLowerCase().includes(query.toLowerCase()) ||
          i.description.toLowerCase().includes(query.toLowerCase())
      )
    : items;

  const grouped = filtered.reduce<Record<string, PaletteItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
      }
      if (e.key === "Escape") setCommandPaletteOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  useEffect(() => {
    if (commandPaletteOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [commandPaletteOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      filtered[selectedIndex].action();
      setCommandPaletteOpen(false);
    }
  };

  if (!commandPaletteOpen) return null;

  let flatIndex = -1;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setCommandPaletteOpen(false)} />
      <div className="relative w-full max-w-xl bg-[#0c2329] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
          <Search size={18} className="text-white/40" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search pages, sources, actions..."
            className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-white/30"
          />
          <kbd className="text-[10px] bg-white/10 px-2 py-1 rounded text-white/30">ESC</kbd>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto py-2">
          {Object.entries(grouped).map(([category, categoryItems]) => (
            <div key={category}>
              <div className="px-4 py-1.5 text-[10px] uppercase tracking-widest text-white/30 font-medium">
                {category}
              </div>
              {categoryItems.map((item) => {
                flatIndex++;
                const isSelected = flatIndex === selectedIndex;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      item.action();
                      setCommandPaletteOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all ${
                      isSelected ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5"
                    }`}
                  >
                    <Icon size={16} className="shrink-0" />
                    <span className="font-medium">{item.label}</span>
                    <span className="text-white/30 text-xs ml-auto">{item.description}</span>
                  </button>
                );
              })}
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="px-4 py-8 text-center text-white/30 text-sm">No results found</div>
          )}
        </div>
      </div>
    </div>
  );
}
