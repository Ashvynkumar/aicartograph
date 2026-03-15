"use client";

import { create } from "zustand";
import type {
  Source, Conversation, Resolution, HealthIssue, Contradiction,
  FeedbackItem, Workflow, FoundryDocument, Notification, AppUser, DailyMetric, ActivityItem,
} from "./types";
import {
  DEMO_SOURCES, DEMO_CONVERSATIONS, DEMO_HEALTH_ISSUES, DEMO_CONTRADICTIONS,
  DEMO_FEEDBACK, DEMO_WORKFLOWS, DEMO_DOCUMENTS, DEMO_NOTIFICATIONS,
  DEMO_METRICS, DEMO_ACTIVITY, DEMO_USER,
} from "./demo-data";

interface AppState {
  // Auth
  user: AppUser;
  isAuthenticated: boolean;
  onboardingComplete: boolean;
  onboardingStep: number;

  // Data
  sources: Source[];
  conversations: Conversation[];
  activeConversationId: string | null;
  healthIssues: HealthIssue[];
  contradictions: Contradiction[];
  feedbackItems: FeedbackItem[];
  workflows: Workflow[];
  documents: FoundryDocument[];
  notifications: Notification[];
  metrics: DailyMetric[];
  activity: ActivityItem[];

  // UI
  sidebarCollapsed: boolean;
  commandPaletteOpen: boolean;
  compassOpen: boolean;
  activeResolutionMode: "quick" | "deep";
  theme: "dark" | "light";
  welcomePromptDismissed: boolean;

  // Actions
  setSidebarCollapsed: (v: boolean) => void;
  setCommandPaletteOpen: (v: boolean) => void;
  setCompassOpen: (v: boolean) => void;
  setOnboardingStep: (step: number) => void;
  completeOnboarding: () => void;
  setActiveConversation: (id: string | null) => void;
  setResolutionMode: (mode: "quick" | "deep") => void;
  setTheme: (theme: "dark" | "light") => void;
  toggleTheme: () => void;
  setWelcomePromptDismissed: (v: boolean) => void;
  logout: () => void;
  addSource: (source: Source) => void;
  removeSource: (id: string) => void;
  addConversation: (conv: Conversation) => void;
  addResolution: (convId: string, resolution: Resolution) => void;
  setResolutionFeedback: (resId: string, feedback: "up" | "down", comment?: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  toggleWorkflow: (id: string) => void;
  addDocument: (doc: FoundryDocument) => void;
  updateDocument: (id: string, updates: Partial<FoundryDocument>) => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: DEMO_USER,
  isAuthenticated: true,
  onboardingComplete: true,
  onboardingStep: 0,
  sources: DEMO_SOURCES,
  conversations: DEMO_CONVERSATIONS,
  activeConversationId: null,
  healthIssues: DEMO_HEALTH_ISSUES,
  contradictions: DEMO_CONTRADICTIONS,
  feedbackItems: DEMO_FEEDBACK,
  workflows: DEMO_WORKFLOWS,
  documents: DEMO_DOCUMENTS,
  notifications: DEMO_NOTIFICATIONS,
  metrics: DEMO_METRICS,
  activity: DEMO_ACTIVITY,
  sidebarCollapsed: false,
  commandPaletteOpen: false,
  compassOpen: false,
  activeResolutionMode: "deep",
  theme: "dark",
  welcomePromptDismissed: false,

  setSidebarCollapsed: (v) => set({ sidebarCollapsed: v }),
  setCommandPaletteOpen: (v) => set({ commandPaletteOpen: v }),
  setCompassOpen: (v) => set({ compassOpen: v }),
  setOnboardingStep: (step) => set({ onboardingStep: step }),
  completeOnboarding: () => set({ onboardingComplete: true, onboardingStep: 3 }),
  setActiveConversation: (id) => set({ activeConversationId: id }),
  setResolutionMode: (mode) => set({ activeResolutionMode: mode }),
  setTheme: (theme) => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
    }
    set({ theme });
  },
  toggleTheme: () => set((s) => {
    const newTheme = s.theme === "dark" ? "light" : "dark";
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", newTheme);
    }
    return { theme: newTheme };
  }),
  setWelcomePromptDismissed: (v) => set({ welcomePromptDismissed: v }),
  logout: () => {
    if (typeof document !== "undefined") {
      document.cookie = "aicarto_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    if (typeof window !== "undefined") {
      window.location.href = "/auth/login";
    }
  },

  addSource: (source) => set((s) => ({ sources: [...s.sources, source] })),
  removeSource: (id) => set((s) => ({ sources: s.sources.filter((x) => x.id !== id) })),

  addConversation: (conv) => set((s) => ({
    conversations: [conv, ...s.conversations],
    activeConversationId: conv.id,
  })),

  addResolution: (convId, resolution) => set((s) => ({
    conversations: s.conversations.map((c) =>
      c.id === convId
        ? { ...c, resolutions: [...c.resolutions, resolution], updatedAt: new Date().toISOString() }
        : c
    ),
  })),

  setResolutionFeedback: (resId, feedback, comment) => set((s) => ({
    conversations: s.conversations.map((c) => ({
      ...c,
      resolutions: c.resolutions.map((r) =>
        r.id === resId ? { ...r, feedback, feedbackComment: comment } : r
      ),
    })),
  })),

  markNotificationRead: (id) => set((s) => ({
    notifications: s.notifications.map((n) => n.id === id ? { ...n, read: true } : n),
  })),

  markAllNotificationsRead: () => set((s) => ({
    notifications: s.notifications.map((n) => ({ ...n, read: true })),
  })),

  toggleWorkflow: (id) => set((s) => ({
    workflows: s.workflows.map((w) => w.id === id ? { ...w, enabled: !w.enabled } : w),
  })),

  addDocument: (doc) => set((s) => ({ documents: [...s.documents, doc] })),

  updateDocument: (id, updates) => set((s) => ({
    documents: s.documents.map((d) => d.id === id ? { ...d, ...updates } : d),
  })),
}));
