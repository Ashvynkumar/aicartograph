"use client";

import Sidebar from "@/components/app/Sidebar";
import TopBar from "@/components/app/TopBar";
import CommandPalette from "@/components/app/CommandPalette";
import CompassAgent from "@/components/app/CompassAgent";
import OnboardingWizard from "@/components/app/OnboardingWizard";
import { useAppStore } from "@/lib/store";
import { useEffect } from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { sidebarCollapsed, theme } = useAppStore();

  // Sync theme on mount
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="min-h-screen app-layout-main" style={{ background: "var(--bg-primary)" }}>
      <Sidebar />
      <div
        className={`transition-all duration-300 ${
          sidebarCollapsed ? "ml-[68px]" : "ml-[240px]"
        }`}
      >
        <TopBar />
        <main className="p-6">{children}</main>
      </div>
      <CommandPalette />
      <CompassAgent />
      <OnboardingWizard />
    </div>
  );
}
