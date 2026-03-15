"use client";

import { useState } from "react";
import {
  BookOpen, Code, Copy, Download, GitBranch, ExternalLink,
  ChevronRight, ChevronDown, FileText, Terminal, Zap, Key,
  Globe, Webhook, Package, MessageSquare, Layout, FolderGit2,
  Check, X, Search, Server, Shield, Box, Lock,
} from "lucide-react";

/* ─── Doc tree structure ─── */
interface DocNode {
  id: string;
  label: string;
  icon: React.ElementType;
  children?: DocNode[];
}

const DOC_TREE: DocNode[] = [
  {
    id: "getting-started",
    label: "Getting Started",
    icon: Zap,
    children: [
      { id: "quick-start", label: "Quick Start", icon: Terminal },
      { id: "authentication", label: "Authentication", icon: Key },
      { id: "api-keys", label: "API Keys", icon: Key },
    ],
  },
  {
    id: "api-reference",
    label: "API Reference",
    icon: Code,
    children: [
      { id: "sources-api", label: "Sources API", icon: FileText },
      { id: "resolution-api", label: "Resolution API", icon: Globe },
      { id: "health-api", label: "Health API", icon: Zap },
      { id: "webhooks", label: "Webhooks", icon: Webhook },
    ],
  },
  {
    id: "sdks",
    label: "SDKs & Libraries",
    icon: Package,
    children: [
      { id: "sdk-js", label: "JavaScript/TypeScript", icon: Code },
      { id: "sdk-python", label: "Python", icon: Code },
      { id: "sdk-curl", label: "cURL Examples", icon: Terminal },
    ],
  },
  {
    id: "guides",
    label: "Guides",
    icon: BookOpen,
    children: [
      { id: "custom-agents", label: "Building Custom Agents", icon: Zap },
      { id: "whatsapp", label: "WhatsApp Integration", icon: MessageSquare },
      { id: "slack-bot", label: "Slack Bot Setup", icon: MessageSquare },
      { id: "widget-embedding", label: "Widget Embedding", icon: Layout },
    ],
  },
  {
    id: "export-git",
    label: "Export & Git",
    icon: FolderGit2,
    children: [
      { id: "export-md", label: "Export as Markdown", icon: Download },
      { id: "git-integration", label: "Git Integration", icon: GitBranch },
      { id: "cicd", label: "CI/CD Pipelines", icon: Terminal },
    ],
  },
  {
    id: "self-hosted",
    label: "Self-Hosted",
    icon: Server,
    children: [
      { id: "self-hosted-overview", label: "Overview", icon: Shield },
      { id: "self-hosted-docker", label: "Docker Deployment", icon: Box },
      { id: "self-hosted-cli", label: "CLI Local Indexing", icon: Terminal },
      { id: "self-hosted-privacy", label: "Privacy Architecture", icon: Lock },
    ],
  },
];

/* ─── Method badge component ─── */
function MethodBadge({ method }: { method: string }) {
  const colors: Record<string, string> = {
    GET: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    POST: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    PUT: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    DELETE: "bg-red-500/20 text-red-400 border-red-500/30",
  };
  return (
    <span
      className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${colors[method] || "bg-white/10 text-white/60 border-white/20"}`}
    >
      {method}
    </span>
  );
}

/* ─── Code block with copy ─── */
function CodeBlock({ code, language = "bash" }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-lg overflow-hidden my-4" style={{ background: "#1a1a2e" }}>
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
        <span className="text-xs font-mono text-white/40">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs text-white/40 hover:text-white/70 transition-colors"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
        <code className="text-emerald-300 font-mono">{code}</code>
      </pre>
    </div>
  );
}

/* ─── Endpoint row ─── */
function Endpoint({
  method,
  path,
  description,
}: {
  method: string;
  path: string;
  description: string;
}) {
  return (
    <div
      className="flex items-start gap-3 p-3 rounded-lg my-2"
      style={{ background: "var(--bg-input)" }}
    >
      <MethodBadge method={method} />
      <div className="flex-1 min-w-0">
        <code className="text-sm font-mono" style={{ color: "var(--text-primary)" }}>
          {path}
        </code>
        <p className="text-xs mt-0.5" style={{ color: "var(--text-tertiary)" }}>
          {description}
        </p>
      </div>
    </div>
  );
}

/* ─── Document content definitions ─── */
const DOC_CONTENT: Record<string, React.ReactNode> = {
  "quick-start": (
    <div>
      <h2 className="text-lg font-bold font-serif mb-1" style={{ color: "var(--text-primary)" }}>
        Quick Start
      </h2>
      <p className="text-sm mb-6" style={{ color: "var(--text-tertiary)" }}>
        Get up and running with aiCartograph in under 5 minutes.
      </p>

      <h3 className="text-sm font-semibold mb-2" style={{ color: "var(--text-secondary)" }}>
        1. Install the CLI
      </h3>
      <CodeBlock language="bash" code={`npm install -g @aicartograph/cli`} />

      <h3 className="text-sm font-semibold mb-2 mt-6" style={{ color: "var(--text-secondary)" }}>
        2. Authenticate
      </h3>
      <p className="text-sm mb-3" style={{ color: "var(--text-tertiary)" }}>
        Run the login command. This will open a browser window for OAuth authentication and store your credentials locally.
      </p>
      <CodeBlock language="bash" code={`aicartograph login`} />

      <h3 className="text-sm font-semibold mb-2 mt-6" style={{ color: "var(--text-secondary)" }}>
        3. Create your first knowledge base
      </h3>
      <CodeBlock
        language="bash"
        code={`# Initialize a new project\naicartograph init my-kb\n\n# Add a source document\naicartograph source add --type url --url "https://docs.example.com"\n\n# Index the sources\naicartograph index`}
      />

      <h3 className="text-sm font-semibold mb-2 mt-6" style={{ color: "var(--text-secondary)" }}>
        4. Query with the API
      </h3>
      <p className="text-sm mb-3" style={{ color: "var(--text-tertiary)" }}>
        Once your sources are indexed, query the resolution engine directly:
      </p>
      <CodeBlock
        language="bash"
        code={`curl -X POST https://api.aicartograph.com/v1/resolve \\\n  -H "Authorization: Bearer YOUR_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "query": "How do I reset my password?",\n    "top_k": 5,\n    "include_sources": true\n  }'`}
      />

      <h3 className="text-sm font-semibold mb-2 mt-6" style={{ color: "var(--text-secondary)" }}>
        Example Response
      </h3>
      <CodeBlock
        language="json"
        code={`{\n  "answer": "To reset your password, navigate to Settings > Security...",\n  "confidence": 0.94,\n  "sources": [\n    {\n      "id": "src_a1b2c3",\n      "title": "Account Security Guide",\n      "chunk_id": "chk_x7y8z9",\n      "relevance": 0.97\n    }\n  ],\n  "tokens_used": 342\n}`}
      />

      <div
        className="rounded-lg p-4 mt-6 border"
        style={{
          background: "rgba(69, 151, 176, 0.08)",
          borderColor: "rgba(69, 151, 176, 0.2)",
        }}
      >
        <p className="text-sm font-medium" style={{ color: "var(--accent-primary)" }}>
          Tip: Use the dashboard
        </p>
        <p className="text-xs mt-1" style={{ color: "var(--text-tertiary)" }}>
          You can also manage sources, view analytics, and test queries from the aiCartograph dashboard UI without writing any code.
        </p>
      </div>
    </div>
  ),

  "sources-api": (
    <div>
      <h2 className="text-lg font-bold font-serif mb-1" style={{ color: "var(--text-primary)" }}>
        Sources API
      </h2>
      <p className="text-sm mb-6" style={{ color: "var(--text-tertiary)" }}>
        Manage knowledge sources programmatically. Upload, update, and delete documents that power your AI resolution engine.
      </p>

      <p className="text-xs font-mono mb-4 px-3 py-2 rounded-lg" style={{ background: "var(--bg-input)", color: "var(--text-tertiary)" }}>
        Base URL: <span style={{ color: "var(--text-primary)" }}>https://api.aicartograph.com/v1</span>
      </p>

      <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--text-secondary)" }}>
        Endpoints
      </h3>

      <Endpoint method="GET" path="/sources" description="List all knowledge sources with pagination and filtering" />
      <Endpoint method="POST" path="/sources" description="Create a new knowledge source (upload document or provide URL)" />
      <Endpoint method="GET" path="/sources/:id" description="Retrieve a specific source by ID with chunk details" />
      <Endpoint method="PUT" path="/sources/:id" description="Update source metadata or trigger re-indexing" />
      <Endpoint method="DELETE" path="/sources/:id" description="Delete a source and all associated chunks" />
      <Endpoint method="POST" path="/sources/:id/reindex" description="Force re-indexing of a specific source" />
      <Endpoint method="GET" path="/sources/:id/chunks" description="List all chunks for a source" />

      <h3 className="text-sm font-semibold mb-3 mt-8" style={{ color: "var(--text-secondary)" }}>
        List Sources
      </h3>
      <div className="flex items-center gap-2 mb-3">
        <MethodBadge method="GET" />
        <code className="text-sm font-mono" style={{ color: "var(--text-primary)" }}>/sources</code>
      </div>

      <h4 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--text-muted)" }}>
        Query Parameters
      </h4>
      <div className="rounded-lg overflow-hidden border mb-4" style={{ borderColor: "var(--border-primary)" }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: "var(--bg-input)" }}>
              <th className="text-left px-3 py-2 font-medium text-xs" style={{ color: "var(--text-tertiary)" }}>Parameter</th>
              <th className="text-left px-3 py-2 font-medium text-xs" style={{ color: "var(--text-tertiary)" }}>Type</th>
              <th className="text-left px-3 py-2 font-medium text-xs" style={{ color: "var(--text-tertiary)" }}>Description</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["page", "integer", "Page number (default: 1)"],
              ["limit", "integer", "Items per page (default: 20, max: 100)"],
              ["type", "string", "Filter by source type: url, pdf, text, csv, markdown"],
              ["status", "string", "Filter by status: active, indexing, error"],
              ["search", "string", "Search sources by title"],
            ].map(([param, type, desc]) => (
              <tr key={param} className="border-t" style={{ borderColor: "var(--border-primary)" }}>
                <td className="px-3 py-2 font-mono text-xs" style={{ color: "var(--accent-primary)" }}>{param}</td>
                <td className="px-3 py-2 text-xs" style={{ color: "var(--text-tertiary)" }}>{type}</td>
                <td className="px-3 py-2 text-xs" style={{ color: "var(--text-tertiary)" }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h4 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--text-muted)" }}>
        Request
      </h4>
      <CodeBlock
        language="bash"
        code={`curl https://api.aicartograph.com/v1/sources?page=1&limit=10&type=url \\\n  -H "Authorization: Bearer YOUR_API_KEY"`}
      />

      <h4 className="text-xs font-semibold uppercase tracking-wider mb-2 mt-6" style={{ color: "var(--text-muted)" }}>
        Response
      </h4>
      <CodeBlock
        language="json"
        code={`{\n  "data": [\n    {\n      "id": "src_a1b2c3d4",\n      "title": "Product Documentation",\n      "type": "url",\n      "url": "https://docs.example.com",\n      "status": "active",\n      "chunks_count": 142,\n      "health_score": 94,\n      "created_at": "2025-12-01T10:30:00Z",\n      "last_indexed": "2025-12-15T08:00:00Z"\n    }\n  ],\n  "pagination": {\n    "page": 1,\n    "limit": 10,\n    "total": 47,\n    "total_pages": 5\n  }\n}`}
      />

      <h3 className="text-sm font-semibold mb-3 mt-8" style={{ color: "var(--text-secondary)" }}>
        Create Source
      </h3>
      <div className="flex items-center gap-2 mb-3">
        <MethodBadge method="POST" />
        <code className="text-sm font-mono" style={{ color: "var(--text-primary)" }}>/sources</code>
      </div>

      <h4 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--text-muted)" }}>
        Request Body
      </h4>
      <CodeBlock
        language="json"
        code={`{\n  "title": "API Reference Docs",\n  "type": "url",\n  "url": "https://docs.example.com/api",\n  "auto_reindex": true,\n  "reindex_interval": "weekly",\n  "tags": ["api", "reference"]\n}`}
      />

      <h4 className="text-xs font-semibold uppercase tracking-wider mb-2 mt-6" style={{ color: "var(--text-muted)" }}>
        Response (201 Created)
      </h4>
      <CodeBlock
        language="json"
        code={`{\n  "id": "src_e5f6g7h8",\n  "title": "API Reference Docs",\n  "type": "url",\n  "status": "indexing",\n  "created_at": "2025-12-20T14:22:00Z"\n}`}
      />

      <div
        className="rounded-lg p-4 mt-6 border"
        style={{
          background: "rgba(240, 180, 41, 0.08)",
          borderColor: "rgba(240, 180, 41, 0.2)",
        }}
      >
        <p className="text-sm font-medium" style={{ color: "#f0b429" }}>
          Rate Limits
        </p>
        <p className="text-xs mt-1" style={{ color: "var(--text-tertiary)" }}>
          The Sources API is rate limited to 100 requests per minute per API key. Bulk imports should use the <code className="font-mono px-1 py-0.5 rounded" style={{ background: "var(--bg-input)" }}>/sources/batch</code> endpoint instead.
        </p>
      </div>
    </div>
  ),

  authentication: (
    <div>
      <h2 className="text-lg font-bold font-serif mb-1" style={{ color: "var(--text-primary)" }}>Authentication</h2>
      <p className="text-sm mb-6" style={{ color: "var(--text-tertiary)" }}>
        All API requests require authentication via Bearer token. Tokens can be generated from the dashboard or via the CLI.
      </p>
      <CodeBlock language="bash" code={`# Include your API key in the Authorization header\ncurl https://api.aicartograph.com/v1/sources \\\n  -H "Authorization: Bearer ak_live_xxxxxxxxxxxx"`} />
      <div className="rounded-lg p-4 mt-4 border" style={{ background: "rgba(240, 101, 101, 0.08)", borderColor: "rgba(240, 101, 101, 0.2)" }}>
        <p className="text-sm font-medium" style={{ color: "#f06565" }}>Security Warning</p>
        <p className="text-xs mt-1" style={{ color: "var(--text-tertiary)" }}>Never expose your API keys in client-side code. Use environment variables or a backend proxy for production applications.</p>
      </div>
    </div>
  ),

  "api-keys": (
    <div>
      <h2 className="text-lg font-bold font-serif mb-1" style={{ color: "var(--text-primary)" }}>API Keys</h2>
      <p className="text-sm mb-4" style={{ color: "var(--text-tertiary)" }}>Manage your API keys from Settings &gt; API Keys, or use the CLI.</p>
      <CodeBlock language="bash" code={`# Generate a new API key\naicartograph keys create --name "production-key" --scope "read,write"\n\n# List existing keys\naicartograph keys list\n\n# Revoke a key\naicartograph keys revoke ak_live_xxxxxxxxxxxx`} />
    </div>
  ),

  "resolution-api": (
    <div>
      <h2 className="text-lg font-bold font-serif mb-1" style={{ color: "var(--text-primary)" }}>Resolution API</h2>
      <p className="text-sm mb-6" style={{ color: "var(--text-tertiary)" }}>Query your knowledge base and receive AI-generated answers with source citations.</p>
      <Endpoint method="POST" path="/resolve" description="Submit a query and receive a resolved answer with sources" />
      <Endpoint method="POST" path="/resolve/stream" description="Stream a resolved answer via Server-Sent Events" />
      <Endpoint method="GET" path="/resolve/:id" description="Retrieve a previous resolution by ID" />
      <CodeBlock language="bash" code={`curl -X POST https://api.aicartograph.com/v1/resolve \\\n  -H "Authorization: Bearer YOUR_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{"query": "What are the refund policies?", "top_k": 5}'`} />
    </div>
  ),

  "health-api": (
    <div>
      <h2 className="text-lg font-bold font-serif mb-1" style={{ color: "var(--text-primary)" }}>Health API</h2>
      <p className="text-sm mb-6" style={{ color: "var(--text-tertiary)" }}>Monitor the health and status of your knowledge base, sources, and resolution engine.</p>
      <Endpoint method="GET" path="/health" description="System-wide health status" />
      <Endpoint method="GET" path="/health/sources" description="Aggregated source health metrics" />
      <Endpoint method="GET" path="/health/resolution" description="Resolution engine latency and accuracy stats" />
      <CodeBlock language="bash" code={`curl https://api.aicartograph.com/v1/health \\\n  -H "Authorization: Bearer YOUR_API_KEY"`} />
    </div>
  ),

  webhooks: (
    <div>
      <h2 className="text-lg font-bold font-serif mb-1" style={{ color: "var(--text-primary)" }}>Webhooks</h2>
      <p className="text-sm mb-6" style={{ color: "var(--text-tertiary)" }}>Receive real-time notifications when events occur in your knowledge base.</p>
      <Endpoint method="POST" path="/webhooks" description="Register a new webhook endpoint" />
      <Endpoint method="GET" path="/webhooks" description="List all registered webhooks" />
      <Endpoint method="DELETE" path="/webhooks/:id" description="Remove a webhook" />
      <p className="text-sm mt-4 mb-2" style={{ color: "var(--text-secondary)" }}>Available events:</p>
      <ul className="text-sm space-y-1 ml-4 list-disc" style={{ color: "var(--text-tertiary)" }}>
        <li><code className="font-mono text-xs">source.created</code> &mdash; New source added</li>
        <li><code className="font-mono text-xs">source.indexed</code> &mdash; Source indexing completed</li>
        <li><code className="font-mono text-xs">source.error</code> &mdash; Source indexing failed</li>
        <li><code className="font-mono text-xs">health.degraded</code> &mdash; Source health dropped below threshold</li>
      </ul>
    </div>
  ),

  "sdk-js": (
    <div>
      <h2 className="text-lg font-bold font-serif mb-1" style={{ color: "var(--text-primary)" }}>JavaScript / TypeScript SDK</h2>
      <p className="text-sm mb-4" style={{ color: "var(--text-tertiary)" }}>Install and use the official JS/TS client.</p>
      <CodeBlock language="bash" code={`npm install @aicartograph/sdk`} />
      <CodeBlock language="typescript" code={`import { AiCartograph } from "@aicartograph/sdk";\n\nconst client = new AiCartograph({ apiKey: process.env.AICARTOGRAPH_KEY });\n\nconst result = await client.resolve({\n  query: "How do I reset my password?",\n  topK: 5,\n});\n\nconsole.log(result.answer);`} />
    </div>
  ),

  "sdk-python": (
    <div>
      <h2 className="text-lg font-bold font-serif mb-1" style={{ color: "var(--text-primary)" }}>Python SDK</h2>
      <p className="text-sm mb-4" style={{ color: "var(--text-tertiary)" }}>Install and use the official Python client.</p>
      <CodeBlock language="bash" code={`pip install aicartograph`} />
      <CodeBlock language="python" code={`from aicartograph import Client\n\nclient = Client(api_key="YOUR_API_KEY")\n\nresult = client.resolve(\n    query="What are the refund policies?",\n    top_k=5\n)\n\nprint(result.answer)`} />
    </div>
  ),

  "sdk-curl": (
    <div>
      <h2 className="text-lg font-bold font-serif mb-1" style={{ color: "var(--text-primary)" }}>cURL Examples</h2>
      <p className="text-sm mb-4" style={{ color: "var(--text-tertiary)" }}>Common API operations using cURL.</p>
      <h3 className="text-sm font-semibold mb-2" style={{ color: "var(--text-secondary)" }}>List Sources</h3>
      <CodeBlock language="bash" code={`curl https://api.aicartograph.com/v1/sources \\\n  -H "Authorization: Bearer YOUR_API_KEY"`} />
      <h3 className="text-sm font-semibold mb-2 mt-4" style={{ color: "var(--text-secondary)" }}>Resolve a Query</h3>
      <CodeBlock language="bash" code={`curl -X POST https://api.aicartograph.com/v1/resolve \\\n  -H "Authorization: Bearer YOUR_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{"query": "How do I get started?"}'`} />
    </div>
  ),

  "custom-agents": (
    <div>
      <h2 className="text-lg font-bold font-serif mb-1" style={{ color: "var(--text-primary)" }}>Building Custom Agents</h2>
      <p className="text-sm mb-4" style={{ color: "var(--text-tertiary)" }}>Learn how to build custom AI agents on top of aiCartograph&apos;s resolution engine using the Foundry.</p>
      <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>Guide content coming soon. Visit the Foundry page to get started with the visual agent builder.</p>
    </div>
  ),

  whatsapp: (
    <div>
      <h2 className="text-lg font-bold font-serif mb-1" style={{ color: "var(--text-primary)" }}>WhatsApp Integration</h2>
      <p className="text-sm mb-4" style={{ color: "var(--text-tertiary)" }}>Connect your aiCartograph knowledge base to WhatsApp Business API for automated customer support.</p>
      <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>Guide content coming soon. See the Integrations page to connect WhatsApp.</p>
    </div>
  ),

  "slack-bot": (
    <div>
      <h2 className="text-lg font-bold font-serif mb-1" style={{ color: "var(--text-primary)" }}>Slack Bot Setup</h2>
      <p className="text-sm mb-4" style={{ color: "var(--text-tertiary)" }}>Deploy an AI-powered Slack bot that answers questions from your knowledge base.</p>
      <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>Guide content coming soon. See the Integrations page to connect Slack.</p>
    </div>
  ),

  "widget-embedding": (
    <div>
      <h2 className="text-lg font-bold font-serif mb-1" style={{ color: "var(--text-primary)" }}>Widget Embedding</h2>
      <p className="text-sm mb-4" style={{ color: "var(--text-tertiary)" }}>Embed the aiCartograph chat widget on your website with a single script tag.</p>
      <CodeBlock language="html" code={`<script\n  src="https://cdn.aicartograph.com/widget.js"\n  data-project="YOUR_PROJECT_ID"\n  data-theme="auto"\n  async\n></script>`} />
    </div>
  ),

  "export-md": (
    <div>
      <h2 className="text-lg font-bold font-serif mb-1" style={{ color: "var(--text-primary)" }}>Export as Markdown</h2>
      <p className="text-sm mb-4" style={{ color: "var(--text-tertiary)" }}>Export your documentation and knowledge base content as Markdown files for version control or static site generators.</p>
      <CodeBlock language="bash" code={`aicartograph export --format markdown --output ./docs`} />
    </div>
  ),

  "git-integration": (
    <div>
      <h2 className="text-lg font-bold font-serif mb-1" style={{ color: "var(--text-primary)" }}>Git Integration</h2>
      <p className="text-sm mb-4" style={{ color: "var(--text-tertiary)" }}>Sync your knowledge base with a Git repository for version-controlled documentation.</p>
      <CodeBlock language="bash" code={`aicartograph git init --repo https://github.com/org/docs.git --branch main\naicartograph git push --message "Update docs"`} />
    </div>
  ),

  cicd: (
    <div>
      <h2 className="text-lg font-bold font-serif mb-1" style={{ color: "var(--text-primary)" }}>CI/CD Pipelines</h2>
      <p className="text-sm mb-4" style={{ color: "var(--text-tertiary)" }}>Automate knowledge base updates with GitHub Actions, GitLab CI, or other CI/CD tools.</p>
      <CodeBlock language="yaml" code={`# .github/workflows/sync-kb.yml\nname: Sync Knowledge Base\non:\n  push:\n    branches: [main]\n    paths: [\"docs/**\"]\njobs:\n  sync:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm install -g @aicartograph/cli\n      - run: aicartograph source sync --dir ./docs\n        env:\n          AICARTOGRAPH_API_KEY: \${{ secrets.AICARTOGRAPH_KEY }}`} />
    </div>
  ),

  "self-hosted-overview": (
    <div>
      <h2 className="text-lg font-bold font-serif mb-1" style={{ color: "var(--text-primary)" }}>
        Self-Hosted Deployment
      </h2>
      <p className="text-sm mb-6" style={{ color: "var(--text-tertiary)" }}>
        aiCartograph follows a privacy-first architecture inspired by tools like MkDocs Material.
        Your knowledge stays on YOUR infrastructure &mdash; we provide the resolution engine, you control the data.
      </p>

      <h3 className="text-sm font-semibold mb-4" style={{ color: "var(--text-secondary)" }}>
        Deployment Modes
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Cloud */}
        <div
          className="rounded-lg border p-4"
          style={{ background: "var(--bg-input)", borderColor: "var(--border-primary)" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Globe size={16} style={{ color: "var(--accent-primary)" }} />
            <h4 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Cloud</h4>
          </div>
          <p className="text-xs mb-3" style={{ color: "var(--text-tertiary)" }}>
            Fully managed SaaS. Knowledge processed on aiCartograph servers.
          </p>
          <p className="text-xs font-medium" style={{ color: "var(--accent-primary)" }}>
            Best for: non-sensitive content, fast setup.
          </p>
        </div>

        {/* Hybrid */}
        <div
          className="rounded-lg border p-4"
          style={{ background: "var(--bg-input)", borderColor: "var(--border-primary)" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Server size={16} style={{ color: "var(--accent-primary)" }} />
            <h4 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Hybrid</h4>
          </div>
          <p className="text-xs mb-3" style={{ color: "var(--text-tertiary)" }}>
            Cloud management dashboard + self-hosted resolution engine.
            Knowledge never leaves your network. Analytics sent to cloud (anonymized).
          </p>
          <p className="text-xs font-medium" style={{ color: "var(--accent-primary)" }}>
            Best for: most enterprises.
          </p>
        </div>

        {/* Self-Hosted */}
        <div
          className="rounded-lg border p-4"
          style={{ background: "var(--bg-input)", borderColor: "var(--border-primary)" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Shield size={16} style={{ color: "var(--accent-primary)" }} />
            <h4 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Self-Hosted</h4>
          </div>
          <p className="text-xs mb-3" style={{ color: "var(--text-tertiary)" }}>
            Everything on your infrastructure. Air-gapped option available.
          </p>
          <p className="text-xs font-medium" style={{ color: "var(--accent-primary)" }}>
            Best for: regulated industries, government, healthcare.
          </p>
        </div>
      </div>
    </div>
  ),

  "self-hosted-docker": (
    <div>
      <h2 className="text-lg font-bold font-serif mb-1" style={{ color: "var(--text-primary)" }}>
        Docker Deployment
      </h2>
      <p className="text-sm mb-6" style={{ color: "var(--text-tertiary)" }}>
        Deploy aiCartograph on your own infrastructure using Docker Compose with the resolution engine and vector database.
      </p>

      <h3 className="text-sm font-semibold mb-2" style={{ color: "var(--text-secondary)" }}>
        Docker Compose Setup
      </h3>
      <CodeBlock
        language="yaml"
        code={`# docker-compose.yml\nversion: "3.9"\nservices:\n  engine:\n    image: aicartograph/engine:latest\n    ports: ["3000:3000"]\n    volumes:\n      - ./knowledge:/data/sources\n      - ./config:/app/config\n    environment:\n      - AICARTOGRAPH_MODE=self-hosted\n      - AICARTOGRAPH_LICENSE_KEY=\${LICENSE_KEY}\n\n  vectordb:\n    image: aicartograph/vectordb:latest\n    volumes:\n      - vectordb_data:/data\n\nvolumes:\n  vectordb_data:`}
      />

      <h3 className="text-sm font-semibold mb-2 mt-6" style={{ color: "var(--text-secondary)" }}>
        Adding Knowledge Sources Locally
      </h3>
      <CodeBlock
        language="bash"
        code={`# Add local docs\naicartograph source add --type directory --path ./docs\n\n# Add from URL (fetched and stored locally)\naicartograph source add --type url --url "https://internal-wiki.company.com" --store-local\n\n# Index everything\naicartograph index --local`}
      />
    </div>
  ),

  "self-hosted-cli": (
    <div>
      <h2 className="text-lg font-bold font-serif mb-1" style={{ color: "var(--text-primary)" }}>
        CLI Local Indexing
      </h2>
      <p className="text-sm mb-6" style={{ color: "var(--text-tertiary)" }}>
        Use the aiCartograph CLI for fully local indexing and serving without any cloud dependencies.
      </p>

      <h3 className="text-sm font-semibold mb-2" style={{ color: "var(--text-secondary)" }}>
        CLI Setup
      </h3>
      <CodeBlock
        language="bash"
        code={`# Install CLI\nnpm install -g @aicartograph/cli\n\n# Initialize a local project\naicartograph init --mode self-hosted\n\n# Configure knowledge sources\naicartograph config set sources.dir ./knowledge\naicartograph config set engine.model local  # Use local model\n\n# Index and serve\naicartograph index\naicartograph serve --port 3000`}
      />

      <div
        className="rounded-lg p-4 mt-6 border"
        style={{
          background: "rgba(69, 151, 176, 0.08)",
          borderColor: "rgba(69, 151, 176, 0.2)",
        }}
      >
        <p className="text-sm font-medium" style={{ color: "var(--accent-primary)" }}>
          Fully Local
        </p>
        <p className="text-xs mt-1" style={{ color: "var(--text-tertiary)" }}>
          All indexing happens on your machine. No data is sent to external servers.
        </p>
      </div>
    </div>
  ),

  "self-hosted-privacy": (
    <div>
      <h2 className="text-lg font-bold font-serif mb-1" style={{ color: "var(--text-primary)" }}>
        Privacy Architecture
      </h2>
      <p className="text-sm mb-6" style={{ color: "var(--text-tertiary)" }}>
        Understand how aiCartograph keeps your data private in self-hosted and hybrid deployments.
      </p>

      <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--text-secondary)" }}>
        How It Works
      </h3>
      <ul className="text-sm space-y-2 ml-4 list-disc mb-6" style={{ color: "var(--text-tertiary)" }}>
        <li>Knowledge ingestion happens locally</li>
        <li>Vector embeddings computed on your infrastructure</li>
        <li>Resolution queries processed locally</li>
        <li>Only anonymized telemetry (opt-in) leaves your network</li>
        <li>License validation via signed JWT (no knowledge data transmitted)</li>
      </ul>

      <h3 className="text-sm font-semibold mb-2" style={{ color: "var(--text-secondary)" }}>
        Architecture Diagram
      </h3>
      <CodeBlock
        language="text"
        code={`┌─────────────────────────────────────────────────┐\n│                YOUR INFRASTRUCTURE               │\n│                                                   │\n│  ┌──────────┐    ┌──────────────┐    ┌────────┐  │\n│  │ Knowledge │───▶│  aiCartograph │───▶│ Vector │  │\n│  │  Sources  │    │    Engine     │    │   DB   │  │\n│  └──────────┘    └──────┬───────┘    └────────┘  │\n│                         │                         │\n│                    ┌────▼────┐                    │\n│                    │ Agents  │                    │\n│                    │ (local) │                    │\n│                    └─────────┘                    │\n│                                                   │\n├─────────────── firewall ─────────────────────────┤\n│                                                   │\n│  Optional: Anonymized telemetry (opt-in only)     │\n│  License validation (JWT, no data)                │\n│                                                   │\n└─────────────────────────────────────────────────┘`}
      />

      <div
        className="rounded-lg p-4 mt-6 border"
        style={{
          background: "rgba(69, 151, 176, 0.08)",
          borderColor: "rgba(69, 151, 176, 0.2)",
        }}
      >
        <p className="text-sm font-medium" style={{ color: "var(--accent-primary)" }}>
          Zero Knowledge Architecture
        </p>
        <p className="text-xs mt-1" style={{ color: "var(--text-tertiary)" }}>
          Your documents, embeddings, and queries never leave your network. Even in hybrid mode, the cloud
          dashboard only receives anonymized resolution metrics &mdash; never the actual content.
        </p>
      </div>
    </div>
  ),
};

/* ─── Sidebar tree item ─── */
function TreeItem({
  node,
  activeId,
  onSelect,
  expandedIds,
  onToggle,
}: {
  node: DocNode;
  activeId: string;
  onSelect: (id: string) => void;
  expandedIds: Set<string>;
  onToggle: (id: string) => void;
}) {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expandedIds.has(node.id);
  const Icon = node.icon;

  return (
    <div>
      <button
        onClick={() => {
          if (hasChildren) {
            onToggle(node.id);
          } else {
            onSelect(node.id);
          }
        }}
        className="w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-left text-sm transition-colors"
        style={{
          color: !hasChildren && activeId === node.id ? "var(--accent-primary)" : "var(--text-tertiary)",
          background: !hasChildren && activeId === node.id ? "rgba(69, 151, 176, 0.1)" : "transparent",
        }}
      >
        {hasChildren ? (
          isExpanded ? <ChevronDown size={14} className="shrink-0" /> : <ChevronRight size={14} className="shrink-0" />
        ) : (
          <span className="w-[14px] shrink-0" />
        )}
        <Icon size={14} className="shrink-0" />
        <span className="truncate">{node.label}</span>
      </button>
      {hasChildren && isExpanded && (
        <div className="ml-3 border-l" style={{ borderColor: "var(--border-primary)" }}>
          {node.children!.map((child) => (
            <TreeItem
              key={child.id}
              node={child}
              activeId={activeId}
              onSelect={onSelect}
              expandedIds={expandedIds}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Git push modal ─── */
function GitPushModal({ onClose }: { onClose: () => void }) {
  const [repoUrl, setRepoUrl] = useState("");
  const [branch, setBranch] = useState("main");
  const [path, setPath] = useState("/docs");
  const [pushing, setPushing] = useState(false);
  const [done, setDone] = useState(false);

  const handlePush = () => {
    setPushing(true);
    setTimeout(() => {
      setPushing(false);
      setDone(true);
      setTimeout(() => onClose(), 1500);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div
        className="w-full max-w-md rounded-xl p-6 shadow-2xl border"
        style={{ background: "var(--bg-elevated)", borderColor: "var(--border-primary)" }}
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-bold font-serif" style={{ color: "var(--text-primary)" }}>
            Push to Git
          </h3>
          <button onClick={onClose} className="p-1 rounded hover:bg-white/10 transition-colors">
            <X size={16} style={{ color: "var(--text-muted)" }} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-tertiary)" }}>
              Repository URL
            </label>
            <input
              type="text"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              placeholder="https://github.com/org/repo.git"
              className="app-input w-full px-3 py-2 rounded-lg text-sm"
              style={{ color: "var(--text-primary)" }}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-tertiary)" }}>
                Branch
              </label>
              <input
                type="text"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="app-input w-full px-3 py-2 rounded-lg text-sm"
                style={{ color: "var(--text-primary)" }}
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-tertiary)" }}>
                Path
              </label>
              <input
                type="text"
                value={path}
                onChange={(e) => setPath(e.target.value)}
                className="app-input w-full px-3 py-2 rounded-lg text-sm"
                style={{ color: "var(--text-primary)" }}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm transition-colors"
            style={{ color: "var(--text-tertiary)" }}
          >
            Cancel
          </button>
          <button
            onClick={handlePush}
            disabled={!repoUrl || pushing || done}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all disabled:opacity-50"
            style={{ background: "var(--accent-primary)" }}
          >
            {done ? (
              <>
                <Check size={14} />
                Pushed
              </>
            ) : pushing ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Pushing...
              </>
            ) : (
              <>
                <GitBranch size={14} />
                Push
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main page ─── */
export default function DocsPage() {
  const [activeDoc, setActiveDoc] = useState("quick-start");
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    new Set(["getting-started", "api-reference", "sdks", "guides", "export-git", "self-hosted", "self-hosted-overview"])
  );
  const [showGitModal, setShowGitModal] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleExportAll = () => {
    showToast("Exporting all docs as Markdown... Download will start shortly.");
  };

  const handleCopyPage = () => {
    const docLabel = getAllLeaves().find((l) => l.id === activeDoc)?.label || activeDoc;
    showToast(`"${docLabel}" copied to clipboard.`);
  };

  const handleExportPage = () => {
    const docLabel = getAllLeaves().find((l) => l.id === activeDoc)?.label || activeDoc;
    showToast(`"${docLabel}" exported as Markdown.`);
  };

  const getAllLeaves = (): DocNode[] => {
    const leaves: DocNode[] = [];
    const walk = (nodes: DocNode[]) => {
      for (const n of nodes) {
        if (n.children) walk(n.children);
        else leaves.push(n);
      }
    };
    walk(DOC_TREE);
    return leaves;
  };

  /* Filter sidebar tree based on search */
  const filterTree = (nodes: DocNode[], query: string): DocNode[] => {
    if (!query) return nodes;
    const q = query.toLowerCase();
    return nodes
      .map((node) => {
        if (node.children) {
          const filteredChildren = filterTree(node.children, query);
          if (filteredChildren.length > 0) return { ...node, children: filteredChildren };
          if (node.label.toLowerCase().includes(q)) return node;
          return null;
        }
        return node.label.toLowerCase().includes(q) ? node : null;
      })
      .filter(Boolean) as DocNode[];
  };

  const filteredTree = filterTree(DOC_TREE, searchQuery);

  return (
    <div className="max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-xl font-bold font-serif" style={{ color: "var(--text-primary)" }}>
            API &amp; Documentation
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
            Developer docs, API reference, and integration guides
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportAll}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all border"
            style={{
              color: "var(--text-secondary)",
              borderColor: "var(--border-primary)",
              background: "var(--bg-input)",
            }}
          >
            <Download size={14} />
            Export All as MD
          </button>
          <button
            onClick={() => setShowGitModal(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-white transition-all"
            style={{ background: "var(--accent-primary)" }}
          >
            <GitBranch size={14} />
            Push to Git
          </button>
        </div>
      </div>

      {/* Body: Sidebar + Content */}
      <div className="flex gap-6" style={{ minHeight: "calc(100vh - 220px)" }}>
        {/* Left sidebar */}
        <aside
          className="shrink-0 rounded-xl border p-4 overflow-y-auto"
          style={{
            width: 240,
            background: "var(--bg-card)",
            borderColor: "var(--border-primary)",
            maxHeight: "calc(100vh - 220px)",
          }}
        >
          {/* Search */}
          <div className="relative mb-3">
            <Search
              size={14}
              className="absolute left-2.5 top-1/2 -translate-y-1/2"
              style={{ color: "var(--text-muted)" }}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search docs..."
              className="app-input w-full pl-8 pr-3 py-1.5 rounded-md text-xs"
              style={{ color: "var(--text-primary)" }}
            />
          </div>

          {/* Tree */}
          <nav className="space-y-0.5">
            {filteredTree.map((node) => (
              <TreeItem
                key={node.id}
                node={node}
                activeId={activeDoc}
                onSelect={setActiveDoc}
                expandedIds={expandedIds}
                onToggle={toggleExpand}
              />
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main
          className="flex-1 min-w-0 rounded-xl border p-6 overflow-y-auto"
          style={{
            background: "var(--bg-card)",
            borderColor: "var(--border-primary)",
            maxHeight: "calc(100vh - 220px)",
          }}
        >
          {/* Content top bar */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b" style={{ borderColor: "var(--border-primary)" }}>
            <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
              <BookOpen size={14} />
              <span>
                {DOC_TREE.find((s) => s.children?.some((c) => c.id === activeDoc))?.label || "Docs"}
              </span>
              <ChevronRight size={12} />
              <span style={{ color: "var(--text-secondary)" }}>
                {getAllLeaves().find((l) => l.id === activeDoc)?.label || activeDoc}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleExportPage}
                className="flex items-center gap-1 text-xs px-2 py-1 rounded-md transition-colors"
                style={{ color: "var(--text-tertiary)", background: "var(--bg-input)" }}
              >
                <Download size={12} />
                Export as MD
              </button>
              <button
                onClick={handleCopyPage}
                className="flex items-center gap-1 text-xs px-2 py-1 rounded-md transition-colors"
                style={{ color: "var(--text-tertiary)", background: "var(--bg-input)" }}
              >
                <Copy size={12} />
                Copy to Clipboard
              </button>
            </div>
          </div>

          {/* Rendered doc content */}
          {DOC_CONTENT[activeDoc] || (
            <div className="text-center py-16">
              <FileText size={40} className="mx-auto mb-3" style={{ color: "var(--text-muted)" }} />
              <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>
                Documentation for this section is coming soon.
              </p>
            </div>
          )}
        </main>
      </div>

      {/* Git push modal */}
      {showGitModal && <GitPushModal onClose={() => setShowGitModal(false)} />}

      {/* Toast notification */}
      {toast && (
        <div
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border animate-in slide-in-from-bottom-4 duration-300"
          style={{
            background: "var(--bg-elevated)",
            borderColor: "var(--border-primary)",
          }}
        >
          <Check size={16} style={{ color: "var(--accent-primary)" }} />
          <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
            {toast}
          </span>
          <button onClick={() => setToast(null)} className="ml-2 p-0.5 rounded hover:bg-white/10 transition-colors">
            <X size={14} style={{ color: "var(--text-muted)" }} />
          </button>
        </div>
      )}
    </div>
  );
}
