"use client";

import Sidebar from "@/components/app/Sidebar";
import TopBar from "@/components/app/TopBar";
import CommandPalette from "@/components/app/CommandPalette";
import CompassAgent from "@/components/app/CompassAgent";
import OnboardingWizard from "@/components/app/OnboardingWizard";
import { useAppStore } from "@/lib/store";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { sidebarCollapsed } = useAppStore();

  return (
    <div className="min-h-screen bg-[#0c2329]">
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
