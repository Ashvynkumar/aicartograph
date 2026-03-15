"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import {
  Layout, MessageCircle, Hash, Code, Mail, Plus, X,
  Pause, Settings, Rocket, TestTube, Bot,
  ChevronDown, Check, Phone, FileText,
  Users, BarChart3, ThumbsUp, Zap, Eye,
  Download, Shield, Copy, Server, Cloud, Terminal, CheckCheck,
  BookOpen, HelpCircle, Target, Monitor, Layers, Upload,
} from "lucide-react";

type AgentStatus = "deployed" | "active" | "draft" | "paused";
type Channel = "web-widget" | "whatsapp" | "slack" | "email" | "api" | "custom";
type Persona = "professional" | "friendly" | "technical" | "custom";
type FallbackBehavior = "escalate" | "contact-info" | "suggest-docs";
type ResponseMode = "quick" | "deep";
type MainTab = "my-agents" | "marketplace";

interface Agent {
  id: string;
  name: string;
  description: string;
  channel: Channel;
  status: AgentStatus;
  icon: React.ElementType;
  queriesHandled: number;
  satisfactionRate: number;
  persona: Persona;
  greeting: string;
  fallback: FallbackBehavior;
  responseMode: ResponseMode;
  knowledgeSources: string[];
}

interface MarketplaceTemplate {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  available: boolean;
}

const MARKETPLACE_TEMPLATES: MarketplaceTemplate[] = [
  { id: "tpl-1", name: "User Manual Agent", icon: BookOpen, description: "Turn any product manual into an interactive AI agent that answers user questions.", available: true },
  { id: "tpl-2", name: "FAQ Bot", icon: HelpCircle, description: "Auto-generate FAQ bots from your knowledge base.", available: false },
  { id: "tpl-3", name: "Onboarding Guide", icon: BookOpen, description: "Guide new employees through onboarding with AI.", available: false },
  { id: "tpl-4", name: "Sales Playbook Agent", icon: Target, description: "Equip reps with real-time competitive intel and battle cards.", available: false },
  { id: "tpl-5", name: "Compliance Checker", icon: Shield, description: "Ensure policy compliance with automated knowledge checks.", available: false },
  { id: "tpl-6", name: "IT Helpdesk", icon: Monitor, description: "Resolve common IT issues with AI-powered troubleshooting.", available: false },
  { id: "tpl-7", name: "HR Policy Agent", icon: Users, description: "Answer employee questions about policies and benefits.", available: false },
  { id: "tpl-8", name: "Product Wiki Agent", icon: Layers, description: "Turn product documentation into an interactive wiki agent.", available: false },
  { id: "tpl-9", name: "Code Documentation Agent", icon: Code, description: "AI-powered code documentation and API reference.", available: false },
];

const KNOWLEDGE_SOURCES = [
  { id: "kb-docs", label: "Product Documentation" },
  { id: "kb-faq", label: "FAQ & Help Center" },
  { id: "kb-api", label: "API Reference" },
  { id: "kb-guides", label: "User Guides" },
  { id: "kb-release", label: "Release Notes" },
  { id: "kb-internal", label: "Internal Knowledge Base" },
  { id: "kb-community", label: "Community Posts" },
];

const CHANNEL_OPTIONS: { value: Channel; label: string; icon: React.ElementType }[] = [
  { value: "web-widget", label: "Web Widget", icon: Layout },
  { value: "whatsapp", label: "WhatsApp", icon: MessageCircle },
  { value: "slack", label: "Slack", icon: Hash },
  { value: "email", label: "Email", icon: Mail },
  { value: "api", label: "API", icon: Code },
  { value: "custom", label: "Custom", icon: Zap },
];

const DEFAULT_AGENTS: Agent[] = [
  {
    id: "agent-1",
    name: "Web Widget Agent",
    description: "Embeddable chat widget for websites. Handles visitor questions with instant AI-powered answers from your knowledge base.",
    channel: "web-widget",
    status: "deployed",
    icon: Layout,
    queriesHandled: 12847,
    satisfactionRate: 94.2,
    persona: "friendly",
    greeting: "Hi there! How can I help you today?",
    fallback: "escalate",
    responseMode: "quick",
    knowledgeSources: ["kb-docs", "kb-faq", "kb-guides"],
  },
  {
    id: "agent-2",
    name: "WhatsApp Agent",
    description: "Chat agent for WhatsApp Business. Engage customers on their preferred messaging platform with automated support.",
    channel: "whatsapp",
    status: "draft",
    icon: MessageCircle,
    queriesHandled: 0,
    satisfactionRate: 0,
    persona: "friendly",
    greeting: "Hello! Thanks for reaching out. How can I assist you?",
    fallback: "contact-info",
    responseMode: "quick",
    knowledgeSources: ["kb-faq"],
  },
  {
    id: "agent-3",
    name: "Slack Bot Agent",
    description: "Resolution bot for Slack channels. Automatically answers team questions and escalates complex issues.",
    channel: "slack",
    status: "deployed",
    icon: Hash,
    queriesHandled: 8432,
    satisfactionRate: 91.7,
    persona: "professional",
    greeting: "Hey team! I can help answer questions from our knowledge base. Just @ me!",
    fallback: "escalate",
    responseMode: "deep",
    knowledgeSources: ["kb-docs", "kb-api", "kb-internal"],
  },
  {
    id: "agent-4",
    name: "API Agent",
    description: "Headless agent for custom integrations. Use our API to embed AI resolution into any workflow or product.",
    channel: "api",
    status: "active",
    icon: Code,
    queriesHandled: 34219,
    satisfactionRate: 96.1,
    persona: "technical",
    greeting: "",
    fallback: "suggest-docs",
    responseMode: "deep",
    knowledgeSources: ["kb-docs", "kb-api", "kb-release"],
  },
  {
    id: "agent-5",
    name: "Email Agent",
    description: "Auto-respond to support emails. Drafts intelligent replies and routes complex tickets to the right team.",
    channel: "email",
    status: "draft",
    icon: Mail,
    queriesHandled: 0,
    satisfactionRate: 0,
    persona: "professional",
    greeting: "Thank you for contacting us. Let me look into this for you.",
    fallback: "escalate",
    responseMode: "deep",
    knowledgeSources: ["kb-docs", "kb-faq"],
  },
];

const STATUS_STYLES: Record<AgentStatus, { bg: string; text: string; dot: string; label: string }> = {
  deployed: { bg: "bg-emerald-500/10", text: "text-emerald-400", dot: "bg-emerald-400", label: "Deployed" },
  active: { bg: "bg-blue-500/10", text: "text-blue-400", dot: "bg-blue-400", label: "Active" },
  draft: { bg: "bg-amber-500/10", text: "text-amber-400", dot: "bg-amber-400", label: "Draft" },
  paused: { bg: "bg-white/5", text: "text-white/40", dot: "bg-white/40", label: "Paused" },
};

const CHANNEL_LABELS: Record<Channel, string> = {
  "web-widget": "Web Widget",
  whatsapp: "WhatsApp",
  slack: "Slack",
  email: "Email",
  api: "API",
  custom: "Custom",
};

function formatNumber(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  return n.toString();
}

export default function AgentsPage() {
  const { sources } = useAppStore();
  const [agents, setAgents] = useState<Agent[]>(DEFAULT_AGENTS);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [exportAgent, setExportAgent] = useState<Agent | null>(null);
  const [exportTab, setExportTab] = useState<"platform" | "code" | "docker">("platform");
  const [copiedBlock, setCopiedBlock] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<MainTab>("my-agents");

  // Marketplace state
  const [builderModalOpen, setBuilderModalOpen] = useState(false);
  const [builderUrl, setBuilderUrl] = useState("");
  const [builderPastedContent, setBuilderPastedContent] = useState("");
  const [subscribedTemplates, setSubscribedTemplates] = useState<Set<string>>(new Set());

  // Modal form state
  const [formName, setFormName] = useState("");
  const [formChannel, setFormChannel] = useState<Channel>("web-widget");
  const [formPersona, setFormPersona] = useState<Persona>("professional");
  const [formCustomPrompt, setFormCustomPrompt] = useState("");
  const [formGreeting, setFormGreeting] = useState("");
  const [formFallback, setFormFallback] = useState<FallbackBehavior>("escalate");
  const [formResponseMode, setFormResponseMode] = useState<ResponseMode>("quick");
  const [formKnowledgeSources, setFormKnowledgeSources] = useState<string[]>([]);
  const [formWhatsAppKey, setFormWhatsAppKey] = useState("");
  const [formWhatsAppPhone, setFormWhatsAppPhone] = useState("");
  const [formWhatsAppTemplate, setFormWhatsAppTemplate] = useState("");
  const [channelDropdownOpen, setChannelDropdownOpen] = useState(false);

  const openCreateModal = () => {
    setEditingAgent(null);
    setFormName("");
    setFormChannel("web-widget");
    setFormPersona("professional");
    setFormCustomPrompt("");
    setFormGreeting("Hi! How can I help you today?");
    setFormFallback("escalate");
    setFormResponseMode("quick");
    setFormKnowledgeSources([]);
    setFormWhatsAppKey("");
    setFormWhatsAppPhone("");
    setFormWhatsAppTemplate("");
    setModalOpen(true);
  };

  const openConfigureModal = (agent: Agent) => {
    setEditingAgent(agent);
    setFormName(agent.name);
    setFormChannel(agent.channel);
    setFormPersona(agent.persona);
    setFormCustomPrompt("");
    setFormGreeting(agent.greeting);
    setFormFallback(agent.fallback);
    setFormResponseMode(agent.responseMode);
    setFormKnowledgeSources(agent.knowledgeSources);
    setFormWhatsAppKey("");
    setFormWhatsAppPhone("");
    setFormWhatsAppTemplate("");
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!formName.trim()) return;

    const ICON_MAP: Record<Channel, React.ElementType> = {
      "web-widget": Layout,
      whatsapp: MessageCircle,
      slack: Hash,
      email: Mail,
      api: Code,
      custom: Zap,
    };

    if (editingAgent) {
      setAgents((prev) =>
        prev.map((a) =>
          a.id === editingAgent.id
            ? {
                ...a,
                name: formName,
                channel: formChannel,
                icon: ICON_MAP[formChannel],
                persona: formPersona,
                greeting: formGreeting,
                fallback: formFallback,
                responseMode: formResponseMode,
                knowledgeSources: formKnowledgeSources,
              }
            : a
        )
      );
    } else {
      const newAgent: Agent = {
        id: `agent-${Date.now()}`,
        name: formName,
        description: `Custom ${CHANNEL_LABELS[formChannel]} agent`,
        channel: formChannel,
        status: "draft",
        icon: ICON_MAP[formChannel],
        queriesHandled: 0,
        satisfactionRate: 0,
        persona: formPersona,
        greeting: formGreeting,
        fallback: formFallback,
        responseMode: formResponseMode,
        knowledgeSources: formKnowledgeSources,
      };
      setAgents((prev) => [...prev, newAgent]);
    }

    setModalOpen(false);
  };

  const handleDeploy = (agentId: string) => {
    setAgents((prev) =>
      prev.map((a) =>
        a.id === agentId
          ? { ...a, status: (a.status === "deployed" || a.status === "active" ? "paused" : "deployed") as AgentStatus }
          : a
      )
    );
  };

  const toggleKnowledgeSource = (id: string) => {
    setFormKnowledgeSources((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBlock(id);
    setTimeout(() => setCopiedBlock(null), 2000);
  };

  const handleBuilderCreate = () => {
    const newAgent: Agent = {
      id: `agent-${Date.now()}`,
      name: "User Manual Agent",
      description: "Interactive AI agent built from a product manual.",
      channel: "web-widget",
      status: "draft",
      icon: BookOpen,
      queriesHandled: 0,
      satisfactionRate: 0,
      persona: "friendly",
      greeting: "Hi! Ask me anything about this product.",
      fallback: "suggest-docs",
      responseMode: "deep",
      knowledgeSources: ["kb-docs", "kb-guides"],
    };
    setAgents((prev) => [...prev, newAgent]);
    setBuilderModalOpen(false);
    setBuilderUrl("");
    setBuilderPastedContent("");
    setActiveTab("my-agents");
  };

  const handleNotifyMe = (templateId: string) => {
    setSubscribedTemplates((prev) => {
      const next = new Set(prev);
      next.add(templateId);
      return next;
    });
    setTimeout(() => {
      setSubscribedTemplates((prev) => {
        const next = new Set(prev);
        next.delete(templateId);
        return next;
      });
    }, 2000);
  };

  const KNOWLEDGE_SLUG_MAP: Record<string, string> = {
    "kb-docs": "product-docs",
    "kb-faq": "faq",
    "kb-api": "api-reference",
    "kb-guides": "user-guides",
    "kb-release": "release-notes",
    "kb-internal": "internal-kb",
    "kb-community": "community-posts",
  };

  const generateYaml = (agent: Agent) =>
`# agent.config.yaml
name: "${agent.name}"
channel: ${agent.channel}
persona: ${agent.persona}
greeting: "${agent.greeting}"
knowledge_sources:
${agent.knowledgeSources.map((ks) => `  - ${KNOWLEDGE_SLUG_MAP[ks] || ks}`).join("\n")}
fallback: ${agent.fallback}
response_mode: ${agent.responseMode}`;

  const generateSdkCode = () =>
`import { CartographAgent } from "@aicartograph/sdk";

const agent = new CartographAgent("./agent.config.yaml");
agent.serve({ port: 3000 });`;

  const generateDocker = () =>
`# Pull the resolution engine
docker pull aicartograph/engine:latest

# Run with your config - knowledge stays on YOUR infrastructure
docker run -d \\
  -v ./knowledge:/data/sources \\
  -v ./agent.config.yaml:/app/config.yaml \\
  -p 3000:3000 \\
  aicartograph/engine:latest`;

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white text-xl font-bold font-serif">Agent Studio</h1>
          <p className="text-white/40 text-sm mt-1">Build and deploy AI agents for your users</p>
        </div>
        {activeTab === "my-agents" && (
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#4597b0] to-[#62acbb] text-white text-sm font-medium hover:shadow-lg hover:shadow-[#4597b0]/20 transition-all"
          >
            <Plus size={16} /> New Agent
          </button>
        )}
      </div>

      {/* Main Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveTab("my-agents")}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
            activeTab === "my-agents"
              ? "bg-[#4597b0] text-white shadow-lg shadow-[#4597b0]/20"
              : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70"
          }`}
        >
          My Agents
        </button>
        <button
          onClick={() => setActiveTab("marketplace")}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
            activeTab === "marketplace"
              ? "bg-[#4597b0] text-white shadow-lg shadow-[#4597b0]/20"
              : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70"
          }`}
        >
          Marketplace
        </button>
      </div>

      {/* ===== MY AGENTS TAB ===== */}
      {activeTab === "my-agents" && (
        <>
          {/* Stats bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Total Agents", value: agents.length.toString(), icon: Bot },
              { label: "Deployed", value: agents.filter((a) => a.status === "deployed" || a.status === "active").length.toString(), icon: Rocket },
              { label: "Queries Handled", value: formatNumber(agents.reduce((sum, a) => sum + a.queriesHandled, 0)), icon: BarChart3 },
              { label: "Avg Satisfaction", value: (() => { const active = agents.filter((a) => a.satisfactionRate > 0); return active.length ? (active.reduce((sum, a) => sum + a.satisfactionRate, 0) / active.length).toFixed(1) + "%" : "N/A"; })(), icon: ThumbsUp },
            ].map((stat) => (
              <div key={stat.label} className="bg-[#223e49]/60 border border-white/5 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <stat.icon size={14} className="text-[#4597b0]" />
                  <span className="text-white/40 text-xs">{stat.label}</span>
                </div>
                <p className="text-white text-lg font-bold">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Privacy-First Banner */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#4597b0]/5 border border-[#4597b0]/10">
            <Shield size={18} className="text-[#4597b0] flex-shrink-0" />
            <p className="text-white/50 text-sm">
              <span className="text-white/70 font-medium">Your knowledge, your infrastructure.</span>{" "}
              Export agents as code and deploy on your own servers. Zero data leaves your premises.
            </p>
          </div>

          {/* Agent Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {agents.map((agent) => {
              const Icon = agent.icon;
              const statusStyle = STATUS_STYLES[agent.status];

              return (
                <div
                  key={agent.id}
                  className="bg-[#223e49]/60 border border-white/5 rounded-xl p-5 hover:border-[#4597b0]/30 hover:translate-y-[-2px] transition-all group"
                >
                  {/* Top: Icon + Status */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                      <Icon size={20} className="text-[#4597b0]" />
                    </div>
                    <span className={`text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5 ${statusStyle.bg} ${statusStyle.text}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
                      {statusStyle.label}
                    </span>
                  </div>

                  {/* Name + Channel */}
                  <h3 className="text-white/90 font-medium text-sm mb-0.5">{agent.name}</h3>
                  <span className="text-white/30 text-xs">{CHANNEL_LABELS[agent.channel]} Channel</span>

                  {/* Description */}
                  <p className="text-white/40 text-xs mt-2 line-clamp-2">{agent.description}</p>

                  {/* Metrics */}
                  <div className="flex items-center gap-4 mt-4 pt-3 border-t border-white/5">
                    <div>
                      <p className="text-white/30 text-[10px] uppercase tracking-wider">Queries</p>
                      <p className="text-white/80 text-sm font-medium">
                        {agent.queriesHandled > 0 ? formatNumber(agent.queriesHandled) : "--"}
                      </p>
                    </div>
                    <div>
                      <p className="text-white/30 text-[10px] uppercase tracking-wider">Satisfaction</p>
                      <p className="text-white/80 text-sm font-medium">
                        {agent.satisfactionRate > 0 ? agent.satisfactionRate + "%" : "--"}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/5">
                    <button
                      onClick={() => openConfigureModal(agent)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 text-white/50 text-xs hover:bg-white/10 hover:text-white/80 transition-colors"
                    >
                      <Settings size={12} /> Configure
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 text-white/50 text-xs hover:bg-white/10 hover:text-white/80 transition-colors">
                      <TestTube size={12} /> Test
                    </button>
                    <button
                      onClick={() => { setExportAgent(agent); setExportTab("platform"); setExportModalOpen(true); }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 text-white/50 text-xs hover:bg-white/10 hover:text-white/80 transition-colors"
                    >
                      <Download size={12} /> Export
                    </button>
                    <button
                      onClick={() => handleDeploy(agent.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs ml-auto transition-colors ${
                        agent.status === "deployed" || agent.status === "active"
                          ? "bg-white/5 text-white/50 hover:bg-red-500/10 hover:text-red-400"
                          : "bg-[#4597b0]/10 text-[#4597b0] hover:bg-[#4597b0]/20"
                      }`}
                    >
                      {agent.status === "deployed" || agent.status === "active" ? (
                        <><Pause size={12} /> Pause</>
                      ) : (
                        <><Rocket size={12} /> Deploy</>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Create New Agent Card */}
            <button
              onClick={openCreateModal}
              className="bg-[#223e49]/30 border border-dashed border-white/10 rounded-xl p-5 flex flex-col items-center justify-center gap-3 hover:border-[#4597b0]/40 hover:bg-[#223e49]/50 transition-all min-h-[280px] group"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[#4597b0]/10 transition-colors">
                <Plus size={24} className="text-white/20 group-hover:text-[#4597b0] transition-colors" />
              </div>
              <div className="text-center">
                <p className="text-white/50 text-sm font-medium group-hover:text-white/80 transition-colors">Create New Agent</p>
                <p className="text-white/20 text-xs mt-1">Build a custom AI agent for any channel</p>
              </div>
            </button>
          </div>
        </>
      )}

      {/* ===== MARKETPLACE TAB ===== */}
      {activeTab === "marketplace" && (
        <>
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#4597b0]/5 border border-[#4597b0]/10">
            <Layers size={18} className="text-[#4597b0] flex-shrink-0" />
            <p className="text-white/50 text-sm">
              <span className="text-white/70 font-medium">Agent Templates.</span>{" "}
              Pre-built agent templates to get you started quickly. Click an available template to configure and deploy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MARKETPLACE_TEMPLATES.map((template) => {
              const TplIcon = template.icon;
              const isSubscribed = subscribedTemplates.has(template.id);

              return (
                <div
                  key={template.id}
                  onClick={() => {
                    if (template.available) {
                      setBuilderUrl("");
                      setBuilderPastedContent("");
                      setBuilderModalOpen(true);
                    }
                  }}
                  className={`bg-[#223e49]/60 border border-white/5 rounded-xl p-5 transition-all ${
                    template.available
                      ? "hover:border-[#4597b0]/30 hover:translate-y-[-2px] cursor-pointer group"
                      : "opacity-50 cursor-default"
                  }`}
                >
                  {/* Top: Icon + Badge */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                      <TplIcon size={20} className={template.available ? "text-[#4597b0]" : "text-white/30"} />
                    </div>
                    {template.available ? (
                      <span className="text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        Available
                      </span>
                    ) : (
                      <span className="text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5 bg-amber-500/10 text-amber-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        Coming Soon
                      </span>
                    )}
                  </div>

                  {/* Name */}
                  <h3 className={`font-medium text-sm mb-1 ${template.available ? "text-white/90" : "text-white/50"}`}>
                    {template.name}
                  </h3>

                  {/* Description */}
                  <p className={`text-xs mt-1 leading-relaxed ${template.available ? "text-white/40" : "text-white/25"}`}>
                    {template.description}
                  </p>

                  {/* Action */}
                  <div className="mt-4 pt-3 border-t border-white/5">
                    {template.available ? (
                      <span className="text-[#4597b0] text-xs font-medium group-hover:underline">
                        Use Template &rarr;
                      </span>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNotifyMe(template.id);
                        }}
                        className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${
                          isSubscribed
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70"
                        }`}
                      >
                        {isSubscribed ? (
                          <span className="flex items-center gap-1.5"><Check size={12} /> Subscribed!</span>
                        ) : (
                          "Notify Me"
                        )}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* ===== BUILDER MODAL (User Manual Agent) ===== */}
      {builderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0c2329] border border-white/10 rounded-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5 sticky top-0 bg-[#0c2329] z-10 rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#4597b0]/10 flex items-center justify-center">
                  <BookOpen size={20} className="text-[#4597b0]" />
                </div>
                <div>
                  <h2 className="text-white font-bold">User Manual Agent Builder</h2>
                  <p className="text-white/40 text-xs">Provide a product manual to create an interactive agent</p>
                </div>
              </div>
              <button
                onClick={() => setBuilderModalOpen(false)}
                className="text-white/40 hover:text-white/80 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* URL Input */}
              <div>
                <label className="text-white/40 text-xs block mb-1.5">Product Manual URL</label>
                <input
                  type="url"
                  value={builderUrl}
                  onChange={(e) => setBuilderUrl(e.target.value)}
                  placeholder="https://docs.example.com/product-manual"
                  className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm outline-none placeholder:text-white/20 focus:border-[#4597b0]/50 transition-colors"
                />
                <p className="text-white/20 text-[10px] mt-1.5 flex items-center gap-1">
                  <Shield size={10} className="text-[#4597b0]" />
                  Credentials in URLs are automatically masked and stored securely.
                </p>
              </div>

              {/* File Upload Dropzone */}
              <div>
                <label className="text-white/40 text-xs block mb-1.5">Upload Files (PDF, audio, video, GIF)</label>
                <div className="border-2 border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center gap-3 hover:border-[#4597b0]/30 hover:bg-white/[0.02] transition-all cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                    <Upload size={24} className="text-white/20" />
                  </div>
                  <div className="text-center">
                    <p className="text-white/50 text-sm font-medium">Drag and drop files here</p>
                    <p className="text-white/20 text-xs mt-1">or click to browse - PDF, audio, video, GIF supported</p>
                  </div>
                </div>
              </div>

              {/* Paste Content */}
              <div>
                <label className="text-white/40 text-xs block mb-1.5">Or Paste Manual Content Directly</label>
                <textarea
                  value={builderPastedContent}
                  onChange={(e) => setBuilderPastedContent(e.target.value)}
                  placeholder="Paste product manual text, FAQ content, or documentation here..."
                  rows={6}
                  className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm outline-none placeholder:text-white/20 focus:border-[#4597b0]/50 transition-colors resize-none"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between p-6 border-t border-white/5 sticky bottom-0 bg-[#0c2329] rounded-b-2xl">
              <button
                onClick={() => setBuilderModalOpen(false)}
                className="px-4 py-2.5 rounded-lg text-white/50 text-sm hover:text-white/80 hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleBuilderCreate}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#4597b0] to-[#62acbb] text-white text-sm font-medium hover:shadow-lg hover:shadow-[#4597b0]/20 transition-all"
              >
                <Rocket size={14} /> Create Agent
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Agent Builder Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0c2329] border border-white/10 rounded-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5 sticky top-0 bg-[#0c2329] z-10 rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#4597b0]/10 flex items-center justify-center">
                  <Bot size={20} className="text-[#4597b0]" />
                </div>
                <div>
                  <h2 className="text-white font-bold">
                    {editingAgent ? "Configure Agent" : "Create New Agent"}
                  </h2>
                  <p className="text-white/40 text-xs">
                    {editingAgent ? "Update your agent configuration" : "Set up a new AI agent for your users"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-white/40 hover:text-white/80 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Agent Name */}
              <div>
                <label className="text-white/40 text-xs block mb-1.5">Agent Name</label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Customer Support Bot"
                  className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm outline-none placeholder:text-white/20 focus:border-[#4597b0]/50 transition-colors"
                />
              </div>

              {/* Channel Selector */}
              <div>
                <label className="text-white/40 text-xs block mb-1.5">Channel</label>
                <div className="relative">
                  <button
                    onClick={() => setChannelDropdownOpen(!channelDropdownOpen)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm hover:border-white/20 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      {(() => {
                        const opt = CHANNEL_OPTIONS.find((c) => c.value === formChannel);
                        if (!opt) return null;
                        const CIcon = opt.icon;
                        return (
                          <>
                            <CIcon size={16} className="text-[#4597b0]" />
                            <span>{opt.label}</span>
                          </>
                        );
                      })()}
                    </div>
                    <ChevronDown size={16} className={`text-white/40 transition-transform ${channelDropdownOpen ? "rotate-180" : ""}`} />
                  </button>
                  {channelDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-[#1a3a44] border border-white/10 rounded-lg overflow-hidden z-20 shadow-xl">
                      {CHANNEL_OPTIONS.map((opt) => {
                        const CIcon = opt.icon;
                        return (
                          <button
                            key={opt.value}
                            onClick={() => {
                              setFormChannel(opt.value);
                              setChannelDropdownOpen(false);
                            }}
                            className={`w-full flex items-center gap-2 px-3 py-2.5 text-sm text-left hover:bg-white/5 transition-colors ${
                              formChannel === opt.value ? "text-[#4597b0] bg-[#4597b0]/5" : "text-white/70"
                            }`}
                          >
                            <CIcon size={16} />
                            <span>{opt.label}</span>
                            {formChannel === opt.value && <Check size={14} className="ml-auto" />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Knowledge Sources */}
              <div>
                <label className="text-white/40 text-xs block mb-2">Knowledge Sources</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {KNOWLEDGE_SOURCES.map((ks) => (
                    <label
                      key={ks.id}
                      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg border cursor-pointer transition-colors ${
                        formKnowledgeSources.includes(ks.id)
                          ? "bg-[#4597b0]/10 border-[#4597b0]/30 text-white/90"
                          : "bg-white/[0.02] border-white/5 text-white/50 hover:border-white/10"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                          formKnowledgeSources.includes(ks.id)
                            ? "bg-[#4597b0] border-[#4597b0]"
                            : "border-white/20 bg-transparent"
                        }`}
                      >
                        {formKnowledgeSources.includes(ks.id) && <Check size={10} className="text-white" />}
                      </div>
                      <span className="text-xs">{ks.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Persona / Tone */}
              <div>
                <label className="text-white/40 text-xs block mb-2">Persona / Tone</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(
                    [
                      { value: "professional", label: "Professional", desc: "Formal & clear" },
                      { value: "friendly", label: "Friendly", desc: "Warm & casual" },
                      { value: "technical", label: "Technical", desc: "Precise & detailed" },
                      { value: "custom", label: "Custom", desc: "Write your own" },
                    ] as const
                  ).map((p) => (
                    <button
                      key={p.value}
                      onClick={() => setFormPersona(p.value)}
                      className={`px-3 py-2.5 rounded-lg border text-left transition-colors ${
                        formPersona === p.value
                          ? "bg-[#4597b0]/10 border-[#4597b0]/30"
                          : "bg-white/[0.02] border-white/5 hover:border-white/10"
                      }`}
                    >
                      <p className={`text-xs font-medium ${formPersona === p.value ? "text-[#4597b0]" : "text-white/70"}`}>
                        {p.label}
                      </p>
                      <p className="text-[10px] text-white/30 mt-0.5">{p.desc}</p>
                    </button>
                  ))}
                </div>
                {formPersona === "custom" && (
                  <textarea
                    value={formCustomPrompt}
                    onChange={(e) => setFormCustomPrompt(e.target.value)}
                    placeholder="Write a custom system prompt for your agent's persona..."
                    rows={3}
                    className="w-full mt-3 px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm outline-none placeholder:text-white/20 focus:border-[#4597b0]/50 transition-colors resize-none"
                  />
                )}
              </div>

              {/* Greeting Message */}
              <div>
                <label className="text-white/40 text-xs block mb-1.5">Greeting Message</label>
                <input
                  type="text"
                  value={formGreeting}
                  onChange={(e) => setFormGreeting(e.target.value)}
                  placeholder="First message your agent sends to users..."
                  className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm outline-none placeholder:text-white/20 focus:border-[#4597b0]/50 transition-colors"
                />
              </div>

              {/* Fallback Behavior */}
              <div>
                <label className="text-white/40 text-xs block mb-2">Fallback Behavior</label>
                <p className="text-white/20 text-[10px] mb-2">What happens when the agent cannot resolve a query</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {(
                    [
                      { value: "escalate", label: "Escalate to Human", icon: Users, desc: "Hand off to a live agent" },
                      { value: "contact-info", label: "Show Contact Info", icon: Phone, desc: "Display support contacts" },
                      { value: "suggest-docs", label: "Suggest Docs", icon: FileText, desc: "Link to relevant articles" },
                    ] as const
                  ).map((fb) => {
                    const FBIcon = fb.icon;
                    return (
                      <button
                        key={fb.value}
                        onClick={() => setFormFallback(fb.value)}
                        className={`flex items-start gap-2.5 px-3 py-3 rounded-lg border text-left transition-colors ${
                          formFallback === fb.value
                            ? "bg-[#4597b0]/10 border-[#4597b0]/30"
                            : "bg-white/[0.02] border-white/5 hover:border-white/10"
                        }`}
                      >
                        <FBIcon
                          size={16}
                          className={`flex-shrink-0 mt-0.5 ${formFallback === fb.value ? "text-[#4597b0]" : "text-white/30"}`}
                        />
                        <div>
                          <p className={`text-xs font-medium ${formFallback === fb.value ? "text-[#4597b0]" : "text-white/70"}`}>
                            {fb.label}
                          </p>
                          <p className="text-[10px] text-white/30 mt-0.5">{fb.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Response Mode */}
              <div>
                <label className="text-white/40 text-xs block mb-2">Response Mode</label>
                <div className="grid grid-cols-2 gap-2">
                  {(
                    [
                      {
                        value: "quick",
                        label: "Quick Answer",
                        desc: "Fast, concise responses. Best for simple questions and high-volume support.",
                        icon: Zap,
                      },
                      {
                        value: "deep",
                        label: "Deep Resolution",
                        desc: "Thorough, multi-step answers. Best for complex technical issues.",
                        icon: Eye,
                      },
                    ] as const
                  ).map((rm) => {
                    const RMIcon = rm.icon;
                    return (
                      <button
                        key={rm.value}
                        onClick={() => setFormResponseMode(rm.value)}
                        className={`flex items-start gap-3 px-4 py-3.5 rounded-lg border text-left transition-colors ${
                          formResponseMode === rm.value
                            ? "bg-[#4597b0]/10 border-[#4597b0]/30"
                            : "bg-white/[0.02] border-white/5 hover:border-white/10"
                        }`}
                      >
                        <RMIcon
                          size={18}
                          className={`flex-shrink-0 mt-0.5 ${formResponseMode === rm.value ? "text-[#4597b0]" : "text-white/30"}`}
                        />
                        <div>
                          <p className={`text-sm font-medium ${formResponseMode === rm.value ? "text-[#4597b0]" : "text-white/70"}`}>
                            {rm.label}
                          </p>
                          <p className="text-[10px] text-white/30 mt-1 leading-relaxed">{rm.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* WhatsApp-specific settings */}
              {formChannel === "whatsapp" && (
                <div className="space-y-4 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                  <div className="flex items-center gap-2 mb-1">
                    <MessageCircle size={16} className="text-emerald-400" />
                    <h3 className="text-emerald-400 text-sm font-medium">WhatsApp Business Settings</h3>
                  </div>

                  <div>
                    <label className="text-white/40 text-xs block mb-1.5">WhatsApp Business API Key</label>
                    <input
                      type="password"
                      value={formWhatsAppKey}
                      onChange={(e) => setFormWhatsAppKey(e.target.value)}
                      placeholder="Enter your WhatsApp Business API key..."
                      className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm outline-none placeholder:text-white/20 focus:border-emerald-500/50 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-white/40 text-xs block mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      value={formWhatsAppPhone}
                      onChange={(e) => setFormWhatsAppPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm outline-none placeholder:text-white/20 focus:border-emerald-500/50 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-white/40 text-xs block mb-1.5">Template Message</label>
                    <textarea
                      value={formWhatsAppTemplate}
                      onChange={(e) => setFormWhatsAppTemplate(e.target.value)}
                      placeholder="Pre-approved message template for initiating conversations..."
                      rows={3}
                      className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm outline-none placeholder:text-white/20 focus:border-emerald-500/50 transition-colors resize-none"
                    />
                    <p className="text-white/20 text-[10px] mt-1">
                      WhatsApp requires pre-approved templates for business-initiated messages.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between p-6 border-t border-white/5 sticky bottom-0 bg-[#0c2329] rounded-b-2xl">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2.5 rounded-lg text-white/50 text-sm hover:text-white/80 hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <div className="flex items-center gap-2">
                {editingAgent && (
                  <button
                    onClick={() => {
                      handleSave();
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 text-white/70 text-sm hover:bg-white/10 transition-colors"
                  >
                    <Settings size={14} /> Save Changes
                  </button>
                )}
                <button
                  onClick={() => {
                    handleSave();
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#4597b0] to-[#62acbb] text-white text-sm font-medium hover:shadow-lg hover:shadow-[#4597b0]/20 transition-all"
                >
                  <Rocket size={14} />
                  {editingAgent ? "Save & Deploy" : "Create & Deploy"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {exportModalOpen && exportAgent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0c2329] border border-white/10 rounded-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5 sticky top-0 bg-[#0c2329] z-10 rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#4597b0]/10 flex items-center justify-center">
                  <Download size={20} className="text-[#4597b0]" />
                </div>
                <div>
                  <h2 className="text-white font-bold">Export Agent</h2>
                  <p className="text-white/40 text-xs">{exportAgent.name}</p>
                </div>
              </div>
              <button onClick={() => setExportModalOpen(false)} className="text-white/40 hover:text-white/80 transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/5">
              {([
                { id: "platform" as const, label: "Platform", icon: Cloud },
                { id: "code" as const, label: "Export as Code", icon: Code },
                { id: "docker" as const, label: "Self-Host (Docker)", icon: Server },
              ]).map((tab) => {
                const TIcon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setExportTab(tab.id)}
                    className={`flex items-center gap-2 px-5 py-3 text-xs font-medium border-b-2 transition-colors ${
                      exportTab === tab.id
                        ? "border-[#4597b0] text-[#4597b0]"
                        : "border-transparent text-white/40 hover:text-white/60"
                    }`}
                  >
                    <TIcon size={14} />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {exportTab === "platform" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-5 rounded-xl bg-[#4597b0]/5 border border-[#4597b0]/10">
                    <Cloud size={24} className="text-[#4597b0] flex-shrink-0" />
                    <div>
                      <p className="text-white/80 text-sm font-medium">Managed Cloud Deployment</p>
                      <p className="text-white/40 text-xs mt-1">
                        This agent runs on aiCartograph cloud. No setup needed.
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Auto-scaling", desc: "Handles traffic spikes automatically" },
                      { label: "99.9% Uptime SLA", desc: "Enterprise-grade reliability" },
                      { label: "Global CDN", desc: "Low-latency responses worldwide" },
                      { label: "Managed Updates", desc: "Always on the latest engine version" },
                    ].map((feature) => (
                      <div key={feature.label} className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                        <p className="text-white/70 text-xs font-medium">{feature.label}</p>
                        <p className="text-white/30 text-[10px] mt-0.5">{feature.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {exportTab === "code" && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-white/60 text-xs font-medium mb-3 uppercase tracking-wider">Agent Configuration</h3>
                    <div className="rounded-lg border border-white/5 overflow-hidden">
                      <div className="flex items-center justify-between px-3 py-2 bg-white/[0.03] border-b border-white/5">
                        <span className="text-white/30 text-[10px] uppercase tracking-wider font-medium">yaml</span>
                        <button
                          onClick={() => copyToClipboard(generateYaml(exportAgent), "yaml")}
                          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-white/5 text-white/40 text-xs hover:bg-white/10 hover:text-white/70 transition-colors"
                        >
                          {copiedBlock === "yaml" ? <><CheckCheck size={12} className="text-emerald-400" /><span className="text-emerald-400">Copied</span></> : <><Copy size={12} /><span>Copy</span></>}
                        </button>
                      </div>
                      <pre className="p-4 overflow-x-auto">
                        <code className="text-white/70 text-xs leading-relaxed whitespace-pre">{generateYaml(exportAgent)}</code>
                      </pre>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white/60 text-xs font-medium mb-3 uppercase tracking-wider">Deployment Code (Node.js SDK)</h3>
                    <div className="rounded-lg border border-white/5 overflow-hidden">
                      <div className="flex items-center justify-between px-3 py-2 bg-white/[0.03] border-b border-white/5">
                        <span className="text-white/30 text-[10px] uppercase tracking-wider font-medium">typescript</span>
                        <button
                          onClick={() => copyToClipboard(generateSdkCode(), "sdk")}
                          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-white/5 text-white/40 text-xs hover:bg-white/10 hover:text-white/70 transition-colors"
                        >
                          {copiedBlock === "sdk" ? <><CheckCheck size={12} className="text-emerald-400" /><span className="text-emerald-400">Copied</span></> : <><Copy size={12} /><span>Copy</span></>}
                        </button>
                      </div>
                      <pre className="p-4 overflow-x-auto">
                        <code className="text-white/70 text-xs leading-relaxed whitespace-pre">{generateSdkCode()}</code>
                      </pre>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 p-4 rounded-lg bg-white/[0.02] border border-white/5">
                    <Terminal size={14} className="text-white/30 flex-shrink-0 mt-0.5" />
                    <p className="text-white/30 text-xs leading-relaxed">
                      Install the SDK with{" "}
                      <code className="px-1.5 py-0.5 rounded bg-white/5 text-white/50 text-[11px]">npm install @aicartograph/sdk</code>{" "}
                      then run your agent with{" "}
                      <code className="px-1.5 py-0.5 rounded bg-white/5 text-white/50 text-[11px]">npx ts-node server.ts</code>
                    </p>
                  </div>
                </div>
              )}

              {exportTab === "docker" && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-white/60 text-xs font-medium mb-3 uppercase tracking-wider">Docker Deployment</h3>
                    <div className="rounded-lg border border-white/5 overflow-hidden">
                      <div className="flex items-center justify-between px-3 py-2 bg-white/[0.03] border-b border-white/5">
                        <span className="text-white/30 text-[10px] uppercase tracking-wider font-medium">bash</span>
                        <button
                          onClick={() => copyToClipboard(generateDocker(), "docker")}
                          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-white/5 text-white/40 text-xs hover:bg-white/10 hover:text-white/70 transition-colors"
                        >
                          {copiedBlock === "docker" ? <><CheckCheck size={12} className="text-emerald-400" /><span className="text-emerald-400">Copied</span></> : <><Copy size={12} /><span>Copy</span></>}
                        </button>
                      </div>
                      <pre className="p-4 overflow-x-auto">
                        <code className="text-white/70 text-xs leading-relaxed whitespace-pre">{generateDocker()}</code>
                      </pre>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                    <Shield size={18} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-emerald-400 text-xs font-medium">Privacy-First Architecture</p>
                      <p className="text-white/40 text-xs mt-1 leading-relaxed">
                        Your knowledge never leaves your infrastructure. The resolution engine runs entirely on your servers.
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white/60 text-xs font-medium mb-3 uppercase tracking-wider">Agent Configuration</h3>
                    <div className="rounded-lg border border-white/5 overflow-hidden">
                      <div className="flex items-center justify-between px-3 py-2 bg-white/[0.03] border-b border-white/5">
                        <span className="text-white/30 text-[10px] uppercase tracking-wider font-medium">yaml</span>
                        <button
                          onClick={() => copyToClipboard(generateYaml(exportAgent), "docker-yaml")}
                          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-white/5 text-white/40 text-xs hover:bg-white/10 hover:text-white/70 transition-colors"
                        >
                          {copiedBlock === "docker-yaml" ? <><CheckCheck size={12} className="text-emerald-400" /><span className="text-emerald-400">Copied</span></> : <><Copy size={12} /><span>Copy</span></>}
                        </button>
                      </div>
                      <pre className="p-4 overflow-x-auto">
                        <code className="text-white/70 text-xs leading-relaxed whitespace-pre">{generateYaml(exportAgent)}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end p-6 border-t border-white/5 sticky bottom-0 bg-[#0c2329] rounded-b-2xl">
              <button
                onClick={() => setExportModalOpen(false)}
                className="px-4 py-2.5 rounded-lg text-white/50 text-sm hover:text-white/80 hover:bg-white/5 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
