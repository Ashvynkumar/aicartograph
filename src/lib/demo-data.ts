import type {
  Source, Resolution, Conversation, HealthIssue, Contradiction,
  FeedbackItem, Workflow, FoundryDocument, Notification,
  AppUser, DailyMetric, ActivityItem,
} from "./types";

export const DEMO_USER: AppUser = {
  name: "Atlas",
  email: "atlas@aicartograph.com",
  company: "aiCartograph",
  role: "Admin",
};

export const DEMO_SOURCES: Source[] = [
  {
    id: "src-1",
    title: "Product Documentation v3.2",
    type: "markdown",
    content: "# Product Documentation\n\nComprehensive guide to all product features including SSO configuration, API endpoints, and integration guides...",
    chunks: [
      { id: "ch-1-1", sourceId: "src-1", content: "SSO Configuration: To enable SSO for Enterprise v3.2, navigate to Settings > Security > SSO. Select your identity provider (Okta, Azure AD, or OneLogin). Enter your SAML metadata URL and click 'Test Connection'.", metadata: { section: "SSO Setup", position: 0 } },
      { id: "ch-1-2", sourceId: "src-1", content: "API Rate Limits: Enterprise plans support 10,000 API calls per minute. Starter plans are limited to 1,000 calls per minute. Rate limit headers are included in every response.", metadata: { section: "API Reference", position: 1 } },
    ],
    metadata: { author: "Engineering Team", uploadedAt: "2026-02-15T10:00:00Z", updatedAt: "2026-03-10T14:30:00Z", size: 245000, wordCount: 12500 },
    healthScore: 92, stalenessScore: 4, citationCount: 47, status: "indexed",
  },
  {
    id: "src-2",
    title: "API Reference Guide",
    type: "markdown",
    content: "# API Reference\n\nRESTful API documentation with authentication, endpoints, and response schemas...",
    chunks: [
      { id: "ch-2-1", sourceId: "src-2", content: "Authentication: All API requests require a Bearer token in the Authorization header. Generate tokens in Dashboard > Settings > API Keys.", metadata: { section: "Authentication", position: 0 } },
      { id: "ch-2-2", sourceId: "src-2", content: "POST /api/v2/resolve - Submit a resolution query. Body: { query: string, mode: 'quick' | 'deep', context?: string }. Returns: { answer: string, sources: Source[], confidence: number }", metadata: { section: "Endpoints", position: 1 } },
    ],
    metadata: { author: "API Team", uploadedAt: "2026-01-20T09:00:00Z", updatedAt: "2026-03-12T11:00:00Z", size: 180000, wordCount: 9200 },
    healthScore: 88, stalenessScore: 2, citationCount: 63, status: "indexed",
  },
  {
    id: "src-3",
    title: "HR Policy Handbook 2026",
    type: "pdf",
    content: "Employee handbook covering leave policies, benefits, remote work guidelines...",
    chunks: [
      { id: "ch-3-1", sourceId: "src-3", content: "Remote Work Policy: Full-time employees may work remotely up to 3 days per week. Approval from direct manager required. Equipment stipend of $1,500 provided for home office setup.", metadata: { section: "Remote Work", position: 0 } },
      { id: "ch-3-2", sourceId: "src-3", content: "PTO Policy: All employees receive 25 days PTO annually. Unused days carry over up to 5 days maximum. PTO requests must be submitted 2 weeks in advance for periods longer than 3 days.", metadata: { section: "Time Off", position: 1 } },
    ],
    metadata: { author: "HR Department", uploadedAt: "2026-01-05T08:00:00Z", updatedAt: "2026-01-05T08:00:00Z", size: 320000, wordCount: 18000 },
    healthScore: 45, stalenessScore: 68, citationCount: 12, status: "indexed",
  },
  {
    id: "src-4",
    title: "Sales Playbook Q1 2026",
    type: "pdf",
    content: "Competitive positioning, pricing strategies, objection handling...",
    chunks: [
      { id: "ch-4-1", sourceId: "src-4", content: "Pricing Objection: When prospects say 'too expensive', redirect to ROI. Average customer saves 23 hours/week in knowledge search time. At $50/hr average, that's $59,800/year in savings vs our $6,000/year Starter plan.", metadata: { section: "Objection Handling", position: 0 } },
      { id: "ch-4-2", sourceId: "src-4", content: "Competitor: SearchCorp - They offer enterprise search but no resolution. Key differentiator: we don't just find documents, we synthesize answers across sources.", metadata: { section: "Competitive Intel", position: 1 } },
    ],
    metadata: { author: "Sales Ops", uploadedAt: "2026-01-15T10:00:00Z", updatedAt: "2026-02-28T16:00:00Z", size: 150000, wordCount: 7800 },
    healthScore: 71, stalenessScore: 14, citationCount: 28, status: "indexed",
  },
  {
    id: "src-5",
    title: "Engineering Runbook",
    type: "markdown",
    content: "Incident response procedures, deployment guides, monitoring setup...",
    chunks: [
      { id: "ch-5-1", sourceId: "src-5", content: "Deployment: Use `deploy.sh --env production` for production deploys. Always run `npm test` before deploying. Rollback with `deploy.sh --rollback` if health checks fail within 5 minutes.", metadata: { section: "Deployment", position: 0 } },
      { id: "ch-5-2", sourceId: "src-5", content: "Incident Response: P1 incidents require immediate paging. On-call engineer has 15 minutes to acknowledge. Escalate to engineering lead if not resolved within 1 hour.", metadata: { section: "Incidents", position: 1 } },
    ],
    metadata: { author: "DevOps Team", uploadedAt: "2025-11-10T09:00:00Z", updatedAt: "2025-12-20T14:00:00Z", size: 98000, wordCount: 5400 },
    healthScore: 34, stalenessScore: 84, citationCount: 8, status: "indexed",
  },
  {
    id: "src-6",
    title: "Security & Compliance Protocol",
    type: "pdf",
    content: "SOC 2 compliance requirements, data handling procedures, access controls...",
    chunks: [
      { id: "ch-6-1", sourceId: "src-6", content: "Data Retention: Customer data is retained for 90 days after account closure. All data is encrypted at rest (AES-256) and in transit (TLS 1.3). PII must never be stored in logs.", metadata: { section: "Data Handling", position: 0 } },
      { id: "ch-6-2", sourceId: "src-6", content: "Access Control: All production systems require MFA. Access reviews conducted quarterly. Principle of least privilege enforced. Admin access requires manager approval.", metadata: { section: "Access Control", position: 1 } },
    ],
    metadata: { author: "Security Team", uploadedAt: "2026-02-01T08:00:00Z", updatedAt: "2026-03-01T10:00:00Z", size: 210000, wordCount: 11000 },
    healthScore: 85, stalenessScore: 13, citationCount: 19, status: "indexed",
  },
  {
    id: "src-7",
    title: "New Employee Onboarding Guide",
    type: "markdown",
    content: "First week checklist, tool setup, team introductions...",
    chunks: [
      { id: "ch-7-1", sourceId: "src-7", content: "Day 1 Setup: 1. Get laptop from IT. 2. Set up email (use Google Workspace). 3. Join Slack workspace. 4. Complete HR paperwork in BambooHR. 5. Attend welcome session at 2pm.", metadata: { section: "Day 1", position: 0 } },
      { id: "ch-7-2", sourceId: "src-7", content: "Development Environment: Clone the monorepo from GitHub. Run `make setup` to install dependencies. Use Node.js 20 LTS. Docker Desktop required for local services.", metadata: { section: "Dev Setup", position: 1 } },
    ],
    metadata: { author: "People Ops", uploadedAt: "2025-09-15T08:00:00Z", updatedAt: "2025-09-15T08:00:00Z", size: 45000, wordCount: 2800 },
    healthScore: 28, stalenessScore: 181, citationCount: 31, status: "indexed",
  },
  {
    id: "src-8",
    title: "Troubleshooting FAQ",
    type: "text",
    content: "Common issues and resolutions for customer support...",
    chunks: [
      { id: "ch-8-1", sourceId: "src-8", content: "Login Issues: If a user can't log in, check: 1. Email is verified. 2. Password meets requirements (8+ chars, 1 uppercase, 1 number). 3. Account isn't locked (3 failed attempts = 15 min lockout). 4. Browser cookies are enabled.", metadata: { section: "Login", position: 0 } },
      { id: "ch-8-2", sourceId: "src-8", content: "Slow Performance: If the dashboard loads slowly: 1. Check browser extensions (ad blockers can interfere). 2. Clear cache. 3. Check status.aicartograph.com for incidents. 4. Try incognito mode.", metadata: { section: "Performance", position: 1 } },
    ],
    metadata: { author: "Support Team", uploadedAt: "2026-02-20T09:00:00Z", updatedAt: "2026-03-13T15:00:00Z", size: 67000, wordCount: 3500 },
    healthScore: 79, stalenessScore: 1, citationCount: 52, status: "indexed",
  },
];

export const DEMO_CONVERSATIONS: Conversation[] = [
  {
    id: "conv-1",
    title: "SSO Configuration for Enterprise",
    createdAt: "2026-03-13T14:30:00Z",
    updatedAt: "2026-03-13T14:35:00Z",
    resolutions: [
      {
        id: "res-1",
        query: "How do I configure SSO for Enterprise v3.2?",
        answer: "To configure SSO for Enterprise v3.2:\n\n1. Navigate to **Settings → Security → SSO**\n2. Select your identity provider (Okta, Azure AD, or OneLogin)\n3. Enter your SAML metadata URL\n4. Click **Test Connection** to verify\n5. Once verified, enable SSO for your organization\n\nNote: Enterprise v3.2 supports both SAML 2.0 and OpenID Connect protocols. API rate limits for Enterprise plans support 10,000 calls per minute.",
        sources: [
          { sourceId: "src-1", sourceTitle: "Product Documentation v3.2", chunkId: "ch-1-1", relevanceScore: 0.95, excerpt: "SSO Configuration: To enable SSO for Enterprise v3.2, navigate to Settings > Security > SSO..." },
          { sourceId: "src-1", sourceTitle: "Product Documentation v3.2", chunkId: "ch-1-2", relevanceScore: 0.72, excerpt: "API Rate Limits: Enterprise plans support 10,000 API calls per minute..." },
        ],
        confidence: "high",
        mode: "deep",
        timestamp: "2026-03-13T14:30:00Z",
        feedback: "up",
        sessionId: "conv-1",
      },
    ],
  },
  {
    id: "conv-2",
    title: "Remote Work Policy Details",
    createdAt: "2026-03-12T10:00:00Z",
    updatedAt: "2026-03-12T10:05:00Z",
    resolutions: [
      {
        id: "res-2",
        query: "What is our remote work policy? How many days can I work from home?",
        answer: "According to the HR Policy Handbook 2026:\n\n- Full-time employees may work remotely **up to 3 days per week**\n- Approval from your direct manager is required\n- A **$1,500 equipment stipend** is provided for home office setup\n\n⚠️ Note: This source was last updated on January 5, 2026, and may not reflect recent policy changes. Consider verifying with HR directly.",
        sources: [
          { sourceId: "src-3", sourceTitle: "HR Policy Handbook 2026", chunkId: "ch-3-1", relevanceScore: 0.98, excerpt: "Remote Work Policy: Full-time employees may work remotely up to 3 days per week..." },
        ],
        confidence: "medium",
        mode: "quick",
        timestamp: "2026-03-12T10:00:00Z",
        feedback: "up",
        sessionId: "conv-2",
      },
    ],
  },
  {
    id: "conv-3",
    title: "Deployment Process",
    createdAt: "2026-03-11T16:20:00Z",
    updatedAt: "2026-03-11T16:25:00Z",
    resolutions: [
      {
        id: "res-3",
        query: "How do I deploy to production?",
        answer: "Based on the Engineering Runbook:\n\n1. Run `npm test` to ensure all tests pass\n2. Execute `deploy.sh --env production`\n3. Monitor health checks for 5 minutes post-deploy\n4. If health checks fail, rollback with `deploy.sh --rollback`\n\n⚠️ **Warning:** This source was last updated on December 20, 2025 (84 days ago). The deployment process may have changed. Verify with the DevOps team.",
        sources: [
          { sourceId: "src-5", sourceTitle: "Engineering Runbook", chunkId: "ch-5-1", relevanceScore: 0.91, excerpt: "Deployment: Use deploy.sh --env production for production deploys..." },
        ],
        confidence: "low",
        mode: "quick",
        timestamp: "2026-03-11T16:20:00Z",
        feedback: "down",
        feedbackComment: "The deployment process changed last month. We use GitHub Actions now.",
        sessionId: "conv-3",
      },
    ],
  },
  {
    id: "conv-4",
    title: "API Authentication",
    createdAt: "2026-03-10T09:15:00Z",
    updatedAt: "2026-03-10T09:18:00Z",
    resolutions: [
      {
        id: "res-4",
        query: "How do I authenticate API requests?",
        answer: "All API requests require authentication via Bearer token:\n\n1. Go to **Dashboard → Settings → API Keys**\n2. Click **Generate New Token**\n3. Add the token to your request headers:\n```\nAuthorization: Bearer your-token-here\n```\n\nThe resolve endpoint is:\n```\nPOST /api/v2/resolve\nBody: { query: string, mode: 'quick' | 'deep', context?: string }\n```",
        sources: [
          { sourceId: "src-2", sourceTitle: "API Reference Guide", chunkId: "ch-2-1", relevanceScore: 0.96, excerpt: "Authentication: All API requests require a Bearer token in the Authorization header..." },
          { sourceId: "src-2", sourceTitle: "API Reference Guide", chunkId: "ch-2-2", relevanceScore: 0.88, excerpt: "POST /api/v2/resolve - Submit a resolution query..." },
        ],
        confidence: "high",
        mode: "deep",
        timestamp: "2026-03-10T09:15:00Z",
        feedback: "up",
        sessionId: "conv-4",
      },
    ],
  },
  {
    id: "conv-5",
    title: "New Hire Setup",
    createdAt: "2026-03-09T11:00:00Z",
    updatedAt: "2026-03-09T11:05:00Z",
    resolutions: [
      {
        id: "res-5",
        query: "I'm a new engineer. How do I set up my development environment?",
        answer: "Welcome! Here's your dev setup guide:\n\n**Day 1 Basics:**\n1. Get your laptop from IT\n2. Set up email (Google Workspace)\n3. Join Slack workspace\n4. Complete HR paperwork in BambooHR\n\n**Development Environment:**\n1. Clone the monorepo from GitHub\n2. Run `make setup` to install dependencies\n3. Ensure **Node.js 20 LTS** is installed\n4. Install **Docker Desktop** for local services\n\n⚠️ **Critical Warning:** This onboarding guide is **181 days old** and may be significantly outdated. The tech stack may have changed.",
        sources: [
          { sourceId: "src-7", sourceTitle: "New Employee Onboarding Guide", chunkId: "ch-7-1", relevanceScore: 0.93, excerpt: "Day 1 Setup: Get laptop from IT, set up email..." },
          { sourceId: "src-7", sourceTitle: "New Employee Onboarding Guide", chunkId: "ch-7-2", relevanceScore: 0.89, excerpt: "Development Environment: Clone the monorepo from GitHub..." },
        ],
        confidence: "low",
        mode: "deep",
        timestamp: "2026-03-09T11:00:00Z",
        sessionId: "conv-5",
      },
    ],
  },
];

export const DEMO_HEALTH_ISSUES: HealthIssue[] = [
  { id: "hi-1", type: "staleness", severity: "critical", title: "Onboarding Guide critically stale", description: "New Employee Onboarding Guide hasn't been updated in 181 days. 31 users cited this source last month.", sourceIds: ["src-7"], detectedAt: "2026-03-13T06:00:00Z", resolved: false },
  { id: "hi-2", type: "staleness", severity: "critical", title: "Engineering Runbook outdated", description: "Engineering Runbook hasn't been updated in 84 days. Users reported incorrect deployment instructions.", sourceIds: ["src-5"], detectedAt: "2026-03-13T06:00:00Z", resolved: false },
  { id: "hi-3", type: "staleness", severity: "warning", title: "HR Policy may need review", description: "HR Policy Handbook was last updated 68 days ago. Remote work policies may have changed.", sourceIds: ["src-3"], detectedAt: "2026-03-13T06:00:00Z", resolved: false },
  { id: "hi-4", type: "contradiction", severity: "warning", title: "Conflicting deployment instructions", description: "Engineering Runbook says 'use deploy.sh' but recent Slack threads mention GitHub Actions CI/CD.", sourceIds: ["src-5"], detectedAt: "2026-03-12T06:00:00Z", resolved: false },
  { id: "hi-5", type: "gap", severity: "info", title: "No coverage for GraphQL API", description: "Users asked about GraphQL endpoints 8 times but no source covers GraphQL documentation.", sourceIds: [], detectedAt: "2026-03-11T06:00:00Z", resolved: false },
  { id: "hi-6", type: "quality", severity: "info", title: "Low resolution rate for Troubleshooting FAQ", description: "Troubleshooting FAQ has 52 citations but only 61% resolution success rate.", sourceIds: ["src-8"], detectedAt: "2026-03-10T06:00:00Z", resolved: false },
];

export const DEMO_CONTRADICTIONS: Contradiction[] = [
  {
    id: "contra-1",
    statement1: { text: "Use deploy.sh --env production for production deploys.", sourceId: "src-5", sourceTitle: "Engineering Runbook" },
    statement2: { text: "Production deployments are handled automatically via GitHub Actions when PRs are merged to main.", sourceId: "src-1", sourceTitle: "Product Documentation v3.2" },
    detectedAt: "2026-03-12T06:00:00Z",
  },
  {
    id: "contra-2",
    statement1: { text: "All employees receive 25 days PTO annually.", sourceId: "src-3", sourceTitle: "HR Policy Handbook 2026" },
    statement2: { text: "Engineering team members receive 30 days PTO as per the updated 2026 engineering benefits package.", sourceId: "src-5", sourceTitle: "Engineering Runbook" },
    detectedAt: "2026-03-11T06:00:00Z",
  },
  {
    id: "contra-3",
    statement1: { text: "API rate limits: Enterprise plans support 10,000 API calls per minute.", sourceId: "src-1", sourceTitle: "Product Documentation v3.2" },
    statement2: { text: "Enterprise API limits have been increased to 50,000 calls per minute as of Q1 2026.", sourceId: "src-2", sourceTitle: "API Reference Guide" },
    detectedAt: "2026-03-10T06:00:00Z",
  },
];

export const DEMO_FEEDBACK: FeedbackItem[] = [
  { id: "fb-1", query: "How do I set up GraphQL subscriptions?", frequency: 12, status: "unresolved", createdAt: "2026-03-01T10:00:00Z", lastAsked: "2026-03-13T14:00:00Z" },
  { id: "fb-2", query: "What's the process for requesting a budget increase?", frequency: 8, status: "unresolved", createdAt: "2026-02-15T09:00:00Z", lastAsked: "2026-03-12T11:00:00Z" },
  { id: "fb-3", query: "How do I configure webhooks for third-party integrations?", frequency: 6, status: "in-progress", assignedTo: "API Team", createdAt: "2026-02-20T14:00:00Z", lastAsked: "2026-03-11T16:00:00Z" },
  { id: "fb-4", query: "What are the data residency options for EU customers?", frequency: 5, status: "unresolved", createdAt: "2026-03-05T08:00:00Z", lastAsked: "2026-03-13T09:00:00Z" },
];

export const DEMO_WORKFLOWS: Workflow[] = [
  { id: "wf-1", name: "Staleness Alert", description: "Notify source owners when content becomes stale (>60 days)", trigger: "Source staleness > 60 days", conditions: ["Source has assigned owner"], action: "Send email notification to owner", enabled: true, lastRun: "2026-03-13T06:00:00Z", runCount: 23 },
  { id: "wf-2", name: "Gap-to-Task Flow", description: "Create a task when a question is asked 5+ times with no answer", trigger: "Unresolved question frequency ≥ 5", conditions: ["No matching source exists"], action: "Create task in knowledge backlog", enabled: true, lastRun: "2026-03-12T06:00:00Z", runCount: 7 },
  { id: "wf-3", name: "Weekly Health Digest", description: "Send weekly health summary to admins", trigger: "Every Monday 9:00 AM", conditions: [], action: "Email health report to admins", enabled: false, runCount: 0 },
];

export const DEMO_DOCUMENTS: FoundryDocument[] = [
  { id: "doc-1", title: "GraphQL API Documentation", content: "# GraphQL API\n\n## Getting Started\n\nOur GraphQL API provides a flexible way to query and mutate data...\n\n## Authentication\n\nUse the same Bearer token as the REST API...\n\n## Schema\n\n```graphql\ntype Query {\n  resolve(query: String!, mode: ResolutionMode): Resolution\n  sources: [Source!]!\n  healthScore: HealthReport!\n}\n```", status: "draft", author: "Atlas", createdAt: "2026-03-13T10:00:00Z", updatedAt: "2026-03-13T15:00:00Z", healthScore: 0, citationCount: 0, template: "API Reference" },
  { id: "doc-2", title: "Incident Response Playbook v2", content: "# Incident Response\n\n## Severity Levels\n\n- **P1 (Critical):** Service is down for all users\n- **P2 (Major):** Feature degradation affecting >50% users\n- **P3 (Minor):** Bug affecting <10% users\n\n## Response Times\n\n| Severity | Acknowledge | Resolve |\n|----------|------------|--------|\n| P1 | 15 min | 4 hours |\n| P2 | 1 hour | 24 hours |\n| P3 | 4 hours | 72 hours |", status: "review", author: "Atlas", createdAt: "2026-03-10T08:00:00Z", updatedAt: "2026-03-12T14:00:00Z", healthScore: 0, citationCount: 0, template: "Runbook" },
];

export const DEMO_NOTIFICATIONS: Notification[] = [
  { id: "notif-1", type: "warning", title: "Health Score Dropped", message: "Overall health score dropped from 74 to 65 this week due to 2 critically stale sources.", timestamp: "2026-03-13T06:00:00Z", read: false, actionUrl: "/app/health" },
  { id: "notif-2", type: "success", title: "Source Indexed", message: "Troubleshooting FAQ was successfully re-indexed with 12 new chunks.", timestamp: "2026-03-13T15:00:00Z", read: false, actionUrl: "/app/sources" },
  { id: "notif-3", type: "info", title: "Workflow Executed", message: "Staleness Alert workflow notified 2 source owners about outdated content.", timestamp: "2026-03-13T06:00:00Z", read: true, actionUrl: "/app/workflows" },
  { id: "notif-4", type: "error", title: "Unresolved Question Spike", message: "'GraphQL subscriptions' has been asked 12 times with no good answer.", timestamp: "2026-03-13T14:00:00Z", read: false, actionUrl: "/app/feedback" },
];

export const DEMO_METRICS: DailyMetric[] = [
  { date: "2026-03-07", resolutions: 23, sources: 7, healthScore: 74 },
  { date: "2026-03-08", resolutions: 31, sources: 7, healthScore: 73 },
  { date: "2026-03-09", resolutions: 18, sources: 8, healthScore: 71 },
  { date: "2026-03-10", resolutions: 42, sources: 8, healthScore: 69 },
  { date: "2026-03-11", resolutions: 37, sources: 8, healthScore: 67 },
  { date: "2026-03-12", resolutions: 29, sources: 8, healthScore: 66 },
  { date: "2026-03-13", resolutions: 35, sources: 8, healthScore: 65 },
];

export const DEMO_ACTIVITY: ActivityItem[] = [
  { id: "act-1", type: "resolution", title: "SSO Configuration resolved", description: "Question about Enterprise v3.2 SSO setup — high confidence", timestamp: "2026-03-13T14:30:00Z", icon: "MessageSquare" },
  { id: "act-2", type: "health_alert", title: "Health score dropped to 65", description: "2 sources critically stale, 3 contradictions detected", timestamp: "2026-03-13T06:00:00Z", icon: "AlertTriangle" },
  { id: "act-3", type: "source_upload", title: "Troubleshooting FAQ re-indexed", description: "12 new chunks added, 3 updated", timestamp: "2026-03-13T15:00:00Z", icon: "Database" },
  { id: "act-4", type: "feedback", title: "Negative feedback on deployment guide", description: "User reported outdated deployment instructions", timestamp: "2026-03-11T16:25:00Z", icon: "ThumbsDown" },
  { id: "act-5", type: "workflow", title: "Staleness Alert executed", description: "Notified Engineering Runbook and Onboarding Guide owners", timestamp: "2026-03-13T06:00:00Z", icon: "GitBranch" },
  { id: "act-6", type: "resolution", title: "Remote Work Policy resolved", description: "Question about WFH days — medium confidence (source may be stale)", timestamp: "2026-03-12T10:00:00Z", icon: "MessageSquare" },
  { id: "act-7", type: "source_upload", title: "Security Protocol updated", description: "Access control section refreshed", timestamp: "2026-03-01T10:00:00Z", icon: "Upload" },
  { id: "act-8", type: "resolution", title: "API Authentication resolved", description: "Bearer token setup explained — high confidence", timestamp: "2026-03-10T09:15:00Z", icon: "MessageSquare" },
];

export const INTEGRATION_CARDS = [
  { name: "Slack", icon: "MessageSquare", description: "Receive alerts, ask questions from any channel, sync shared links", category: "Communication", connected: false },
  { name: "Jira", icon: "CheckSquare", description: "Create tasks from feedback, link resolutions to tickets", category: "Project Management", connected: false },
  { name: "Confluence", icon: "FileText", description: "Auto-sync Confluence spaces as knowledge sources", category: "Knowledge", connected: false },
  { name: "Notion", icon: "BookOpen", description: "Import Notion databases and pages as sources", category: "Knowledge", connected: false },
  { name: "Zendesk", icon: "Headphones", description: "Surface resolutions in support tickets, track deflection", category: "Support", connected: false },
  { name: "Salesforce", icon: "TrendingUp", description: "Embed knowledge in CRM, track resolution impact on deals", category: "CRM", connected: false },
  { name: "GitHub", icon: "Github", description: "Sync README files, wikis, and documentation repos", category: "Development", connected: false },
  { name: "Google Drive", icon: "FolderOpen", description: "Index shared drives, docs, and spreadsheets", category: "Storage", connected: false },
  { name: "SharePoint", icon: "Globe", description: "Connect SharePoint sites and document libraries", category: "Storage", connected: false },
  { name: "Intercom", icon: "MessageCircle", description: "Power Intercom responses with knowledge resolution", category: "Support", connected: false },
  { name: "Linear", icon: "Zap", description: "Create issues from feedback, link to knowledge gaps", category: "Project Management", connected: false },
  { name: "HubSpot", icon: "Target", description: "Enrich CRM contacts with knowledge interaction data", category: "CRM", connected: false },
];
