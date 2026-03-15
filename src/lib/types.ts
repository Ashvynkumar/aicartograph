export interface Source {
  id: string;
  title: string;
  type: "pdf" | "url" | "text" | "csv" | "markdown";
  content: string;
  chunks: Chunk[];
  metadata: {
    author?: string;
    uploadedAt: string;
    updatedAt: string;
    size: number;
    wordCount: number;
  };
  healthScore: number;
  stalenessScore: number;
  citationCount: number;
  status: "processing" | "indexed" | "error";
}

export interface Chunk {
  id: string;
  sourceId: string;
  content: string;
  embedding?: number[];
  metadata: {
    section?: string;
    position: number;
  };
}

export interface Resolution {
  id: string;
  query: string;
  answer: string;
  sources: CitedSource[];
  confidence: "high" | "medium" | "low";
  mode: "quick" | "deep";
  timestamp: string;
  feedback?: "up" | "down";
  feedbackComment?: string;
  sessionId: string;
}

export interface CitedSource {
  sourceId: string;
  sourceTitle: string;
  chunkId: string;
  relevanceScore: number;
  excerpt: string;
}

export interface Conversation {
  id: string;
  title: string;
  resolutions: Resolution[];
  createdAt: string;
  updatedAt: string;
}

export interface HealthIssue {
  id: string;
  type: "staleness" | "contradiction" | "gap" | "quality";
  severity: "critical" | "warning" | "info";
  title: string;
  description: string;
  sourceIds: string[];
  detectedAt: string;
  resolved: boolean;
}

export interface Contradiction {
  id: string;
  statement1: { text: string; sourceId: string; sourceTitle: string };
  statement2: { text: string; sourceId: string; sourceTitle: string };
  detectedAt: string;
}

export interface FeedbackItem {
  id: string;
  query: string;
  frequency: number;
  status: "unresolved" | "in-progress" | "resolved";
  assignedTo?: string;
  createdAt: string;
  lastAsked: string;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  trigger: string;
  conditions: string[];
  action: string;
  enabled: boolean;
  lastRun?: string;
  runCount: number;
}

export interface FoundryDocument {
  id: string;
  title: string;
  content: string;
  status: "draft" | "review" | "published" | "archived";
  author: string;
  createdAt: string;
  updatedAt: string;
  healthScore: number;
  citationCount: number;
  template?: string;
}

export interface Notification {
  id: string;
  type: "info" | "warning" | "success" | "error";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export interface AppUser {
  name: string;
  email: string;
  company: string;
  role: string;
  avatar?: string;
}

export interface DailyMetric {
  date: string;
  resolutions: number;
  sources: number;
  healthScore: number;
}

export interface ActivityItem {
  id: string;
  type: "resolution" | "source_upload" | "health_alert" | "feedback" | "workflow";
  title: string;
  description: string;
  timestamp: string;
  icon: string;
}
