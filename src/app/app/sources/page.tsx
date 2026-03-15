"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import {
  Upload, FileText, Globe, Type, Table, Code, Search,
  Grid3x3, List, Eye, RefreshCw, Trash2, X, ChevronDown,
  PenLine, Plus, Edit3, Send, Sparkles, AlertTriangle,
  Bold, Italic, Link, Heading, CheckSquare, Save, Image,
} from "lucide-react";

function TypeIcon({ type }: { type: string }) {
  const icons: Record<string, React.ElementType> = { pdf: FileText, url: Globe, text: Type, csv: Table, markdown: Code };
  const Icon = icons[type] || FileText;
  return <Icon size={16} />;
}

function HealthBadge({ score }: { score: number }) {
  const color = score >= 80 ? "text-emerald-400 bg-emerald-400/10" : score >= 60 ? "text-amber-400 bg-amber-400/10" : score >= 40 ? "text-orange-400 bg-orange-400/10" : "text-red-400 bg-red-400/10";
  return <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${color}`}>{score}</span>;
}

function StaleBadge({ days }: { days: number }) {
  const color = days < 30 ? "text-emerald-400" : days < 60 ? "text-amber-400" : days < 90 ? "text-orange-400" : "text-red-400";
  return <span className={`text-xs ${color}`}>{days}d ago</span>;
}

const TEMPLATES = [
  { name: "API Reference", category: "Engineering", icon: Code },
  { name: "Troubleshooting Guide", category: "Support", icon: Search },
  { name: "Onboarding Checklist", category: "HR", icon: CheckSquare },
  { name: "Policy Document", category: "Compliance", icon: FileText },
  { name: "Battle Card", category: "Sales", icon: FileText },
  { name: "Runbook", category: "Engineering", icon: FileText },
];

const STATUS_COLORS: Record<string, string> = {
  draft: "bg-white/10 text-white/60",
  review: "bg-amber-400/10 text-amber-400",
  published: "bg-emerald-400/10 text-emerald-400",
  archived: "bg-white/5 text-white/30",
};

export default function SourcesPage() {
  const { sources, addSource, removeSource, documents, addDocument, updateDocument } = useAppStore();
  const [activeTab, setActiveTab] = useState<"sources" | "docs">("sources");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadOpen, setUploadOpen] = useState(false);
  const [filterType, setFilterType] = useState<string>("all");
  const [detailSource, setDetailSource] = useState<string | null>(null);
  // Foundry state
  const [editingDoc, setEditingDoc] = useState<string | null>(null);
  const [editorContent, setEditorContent] = useState("");
  const [editorTitle, setEditorTitle] = useState("");
  const [viewMode, setViewMode] = useState<"edit" | "preview">("edit");
  const [showTemplates, setShowTemplates] = useState(false);

  const filtered = sources.filter((s) => {
    if (filterType !== "all" && s.type !== filterType) return false;
    if (searchQuery && !s.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const detailData = sources.find((s) => s.id === detailSource);
  const activeDoc = documents.find((d) => d.id === editingDoc);

  const createDoc = (template?: string) => {
    const id = `doc-${Date.now()}`;
    const doc = {
      id, title: template ? `New ${template}` : "Untitled Document",
      content: template ? `# ${template}\n\nStart writing here...` : "# Untitled\n\nStart writing here...",
      status: "draft" as const, author: "Atlas",
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
      healthScore: 0, citationCount: 0, template,
    };
    addDocument(doc);
    setEditingDoc(id);
    setEditorTitle(doc.title);
    setEditorContent(doc.content);
    setShowTemplates(false);
  };

  const openDoc = (id: string) => {
    const doc = documents.find((d) => d.id === id);
    if (doc) { setEditingDoc(id); setEditorTitle(doc.title); setEditorContent(doc.content); }
  };

  const saveDoc = () => {
    if (editingDoc) updateDocument(editingDoc, { title: editorTitle, content: editorContent, updatedAt: new Date().toISOString() });
  };

  // Full-screen editor mode
  if (editingDoc) {
    return (
      <div className="flex h-[calc(100vh-5rem)] -m-6">
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between px-4 py-2 border-b border-white/5" style={{ background: "var(--bg-card)" }}>
            <div className="flex items-center gap-3">
              <button onClick={() => { saveDoc(); setEditingDoc(null); }} className="hover:text-white/80" style={{ color: "var(--text-muted)" }}>
                <X size={18} />
              </button>
              <input type="text" value={editorTitle} onChange={(e) => setEditorTitle(e.target.value)}
                className="bg-transparent font-medium text-sm outline-none border-none w-64" style={{ color: "var(--text-primary)" }} />
              <span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_COLORS[activeDoc?.status || "draft"]}`}>
                {activeDoc?.status || "draft"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#4597b0]/10 text-[#4597b0] text-xs hover:bg-[#4597b0]/20">
                <Sparkles size={12} /> AI Assist
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs" style={{ background: "var(--bg-input)", color: "var(--text-tertiary)" }}>
                <AlertTriangle size={12} /> Check contradictions
              </button>
              <div className="flex rounded-lg p-0.5" style={{ background: "var(--bg-input)" }}>
                <button onClick={() => setViewMode("edit")} className={`px-2.5 py-1 rounded text-xs ${viewMode === "edit" ? "bg-white/10 text-white" : "text-white/40"}`}><Edit3 size={12} /></button>
                <button onClick={() => setViewMode("preview")} className={`px-2.5 py-1 rounded text-xs ${viewMode === "preview" ? "bg-white/10 text-white" : "text-white/40"}`}><Eye size={12} /></button>
              </div>
              <button onClick={saveDoc} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#4597b0] text-white text-xs font-medium">
                <Save size={12} /> Save
              </button>
              <button onClick={() => { saveDoc(); if (editingDoc) updateDocument(editingDoc, { status: "published" }); }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 text-white text-xs font-medium">
                <Send size={12} /> Publish
              </button>
            </div>
          </div>
          <div className="flex items-center gap-1 px-4 py-2 border-b" style={{ borderColor: "var(--border-primary)" }}>
            {[Heading, Bold, Italic, Link, Code, List, Table, Image, CheckSquare].map((Icon, i) => (
              <button key={i} className="p-1.5 rounded hover:bg-white/5 transition-all" style={{ color: "var(--text-muted)" }}><Icon size={14} /></button>
            ))}
          </div>
          <div className="flex-1 overflow-y-auto">
            {viewMode === "edit" ? (
              <textarea value={editorContent} onChange={(e) => setEditorContent(e.target.value)}
                className="w-full h-full bg-transparent text-sm font-mono p-6 outline-none resize-none leading-relaxed"
                style={{ color: "var(--text-secondary)" }} placeholder="Start writing in Markdown..." />
            ) : (
              <div className="p-6 text-sm whitespace-pre-wrap" style={{ color: "var(--text-secondary)" }}>{editorContent}</div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header with Tab Toggle */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold font-serif" style={{ color: "var(--text-primary)" }}>Sources & Docs</h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
            {sources.length} sources indexed &middot; {documents.length} documents &middot; {sources.reduce((a, s) => a + s.chunks.length, 0)} chunks
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Tab Toggle */}
          <div className="flex rounded-lg p-1" style={{ background: "var(--bg-input)" }}>
            <button onClick={() => setActiveTab("sources")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${activeTab === "sources" ? "bg-[#4597b0] text-white" : ""}`}
              style={activeTab !== "sources" ? { color: "var(--text-muted)" } : {}}>
              Sources ({sources.length})
            </button>
            <button onClick={() => setActiveTab("docs")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${activeTab === "docs" ? "bg-[#4597b0] text-white" : ""}`}
              style={activeTab !== "docs" ? { color: "var(--text-muted)" } : {}}>
              Documents ({documents.length})
            </button>
          </div>
          {activeTab === "sources" ? (
            <button onClick={() => setUploadOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-white text-sm font-medium hover:shadow-lg hover:shadow-[#4597b0]/20 transition-all"
              style={{ background: "linear-gradient(135deg, #4597b0, #56b3f5)" }}>
              <Upload size={16} /> Upload Source
            </button>
          ) : (
            <div className="flex gap-2">
              <button onClick={() => setShowTemplates(true)} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm" style={{ background: "var(--bg-input)", border: "1px solid var(--border-primary)", color: "var(--text-tertiary)" }}>
                <FileText size={16} /> Templates
              </button>
              <button onClick={() => createDoc()}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-white text-sm font-medium"
                style={{ background: "linear-gradient(135deg, #4597b0, #56b3f5)" }}>
                <Plus size={16} /> New Document
              </button>
            </div>
          )}
        </div>
      </div>

      {/* SOURCES TAB */}
      {activeTab === "sources" && (
        <>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search sources..."
                className="w-full pl-9 pr-4 py-2 rounded-lg text-sm app-input" />
            </div>
            <div className="flex items-center gap-2">
              <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="px-3 py-2 pr-8 rounded-lg text-sm app-input">
                <option value="all">All Types</option>
                <option value="pdf">PDF</option><option value="url">URL</option><option value="text">Text</option>
                <option value="csv">CSV</option><option value="markdown">Markdown</option>
              </select>
              <div className="flex items-center rounded-lg" style={{ background: "var(--bg-input)", border: "1px solid var(--border-primary)" }}>
                <button onClick={() => setView("grid")} className={`p-2 rounded-l-lg ${view === "grid" ? "bg-white/10 text-white" : ""}`} style={view !== "grid" ? { color: "var(--text-muted)" } : {}}><Grid3x3 size={16} /></button>
                <button onClick={() => setView("list")} className={`p-2 rounded-r-lg ${view === "list" ? "bg-white/10 text-white" : ""}`} style={view !== "list" ? { color: "var(--text-muted)" } : {}}><List size={16} /></button>
              </div>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="app-card rounded-xl p-12 text-center">
              <Upload size={32} className="mx-auto mb-4" style={{ color: "var(--text-muted)" }} />
              <h3 className="font-medium mb-2" style={{ color: "var(--text-tertiary)" }}>No sources yet</h3>
              <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>Upload your first knowledge source to get started.</p>
              <button onClick={() => setUploadOpen(true)} className="px-4 py-2 rounded-lg bg-[#4597b0] text-white text-sm font-medium">Upload Source</button>
            </div>
          ) : view === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((source) => (
                <div key={source.id} onClick={() => setDetailSource(source.id)} className="app-card rounded-xl p-5 cursor-pointer group">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#4597b0]/10 flex items-center justify-center text-[#4597b0]"><TypeIcon type={source.type} /></div>
                      <span className="text-xs uppercase" style={{ color: "var(--text-muted)" }}>{source.type}</span>
                    </div>
                    <HealthBadge score={source.healthScore} />
                  </div>
                  <h3 className="font-medium text-sm mb-2 truncate" style={{ color: "var(--text-secondary)" }}>{source.title}</h3>
                  <div className="flex items-center gap-4 text-xs" style={{ color: "var(--text-muted)" }}>
                    <span>{source.chunks.length} chunks</span><span>{source.citationCount} citations</span><StaleBadge days={source.stalenessScore} />
                  </div>
                  <div className="mt-3 w-full rounded-full h-1.5" style={{ background: "var(--bg-input)" }}>
                    <div className="h-1.5 rounded-full transition-all"
                      style={{ width: `${source.healthScore}%`, backgroundColor: source.healthScore >= 80 ? "#36c08e" : source.healthScore >= 60 ? "#f0b429" : "#f06565" }} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="app-card rounded-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border-primary)" }}>
                    {["Source", "Type", "Health", "Updated", "Chunks", "Citations"].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-medium" style={{ color: "var(--text-muted)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((source) => (
                    <tr key={source.id} onClick={() => setDetailSource(source.id)}
                      className="cursor-pointer transition-all hover:bg-white/5" style={{ borderBottom: "1px solid var(--border-primary)" }}>
                      <td className="px-4 py-3 text-sm" style={{ color: "var(--text-secondary)" }}>{source.title}</td>
                      <td className="px-4 py-3 text-xs uppercase" style={{ color: "var(--text-muted)" }}>{source.type}</td>
                      <td className="px-4 py-3"><HealthBadge score={source.healthScore} /></td>
                      <td className="px-4 py-3"><StaleBadge days={source.stalenessScore} /></td>
                      <td className="px-4 py-3 text-sm" style={{ color: "var(--text-muted)" }}>{source.chunks.length}</td>
                      <td className="px-4 py-3 text-sm" style={{ color: "var(--text-muted)" }}>{source.citationCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Handshake CTA */}
          {sources.length > 0 && (
            <div className="rounded-xl p-4 flex items-center justify-between" style={{ background: "linear-gradient(135deg, rgba(69,151,176,0.08), rgba(86,179,245,0.04))", border: "1px solid rgba(69,151,176,0.15)" }}>
              <div>
                <p className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>Sources indexed and ready</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>Try asking a question or check your knowledge health</p>
              </div>
              <div className="flex gap-2">
                <a href="/app/resolve" className="px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-[#4597b0] hover:bg-[#3a87a0] transition-all">Ask a Question</a>
                <a href="/app/health" className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all" style={{ background: "var(--bg-input)", border: "1px solid var(--border-primary)", color: "var(--text-tertiary)" }}>Check Health</a>
              </div>
            </div>
          )}
        </>
      )}

      {/* DOCUMENTS TAB */}
      {activeTab === "docs" && (
        <>
          {documents.length === 0 ? (
            <div className="app-card rounded-xl p-12 text-center">
              <PenLine size={32} className="mx-auto mb-4" style={{ color: "var(--text-muted)" }} />
              <h3 className="font-medium mb-2" style={{ color: "var(--text-tertiary)" }}>No documents yet</h3>
              <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>Create your first knowledge document to close the loop.</p>
              <button onClick={() => createDoc()} className="px-4 py-2 rounded-lg bg-[#4597b0] text-white text-sm font-medium">Create Document</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {documents.map((doc) => (
                <div key={doc.id} onClick={() => openDoc(doc.id)} className="app-card rounded-xl p-5 cursor-pointer">
                  <div className="flex items-start justify-between mb-3">
                    <PenLine size={16} className="text-[#4597b0]" />
                    <span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_COLORS[doc.status]}`}>{doc.status}</span>
                  </div>
                  <h3 className="font-medium text-sm mb-2" style={{ color: "var(--text-secondary)" }}>{doc.title}</h3>
                  <p className="text-xs line-clamp-2" style={{ color: "var(--text-muted)" }}>{doc.content.slice(0, 100)}...</p>
                  <div className="flex items-center gap-3 mt-3 text-xs" style={{ color: "var(--text-muted)" }}>
                    <span>{doc.author}</span><span>{new Date(doc.updatedAt).toLocaleDateString()}</span>
                    {doc.template && <span className="text-[#4597b0]">{doc.template}</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Upload Modal */}
      {uploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="rounded-2xl p-6 max-w-lg w-full mx-4 space-y-5" style={{ background: "var(--bg-primary)", border: "1px solid var(--border-primary)" }}>
            <div className="flex items-center justify-between">
              <h2 className="font-bold font-serif text-lg" style={{ color: "var(--text-primary)" }}>Upload Knowledge Source</h2>
              <button onClick={() => setUploadOpen(false)} style={{ color: "var(--text-muted)" }}><X size={20} /></button>
            </div>
            <div className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all" style={{ borderColor: "var(--border-primary)" }}>
              <Upload size={32} className="mx-auto mb-3" style={{ color: "var(--text-muted)" }} />
              <p className="text-sm mb-1" style={{ color: "var(--text-tertiary)" }}>Drag & drop files here, or click to browse</p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>PDF, URL, Text, CSV, Markdown supported</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[{ icon: Globe, label: "Paste URL", desc: "Crawl a webpage" }, { icon: Type, label: "Paste Text", desc: "Raw text input" }].map((opt) => (
                <button key={opt.label} className="flex items-center gap-3 p-3 rounded-lg transition-all text-left" style={{ background: "var(--bg-input)", border: "1px solid var(--border-primary)" }}>
                  <opt.icon size={18} className="text-[#4597b0]" />
                  <div>
                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{opt.label}</p>
                    <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>{opt.desc}</p>
                  </div>
                </button>
              ))}
            </div>
            <button onClick={() => {
              addSource({ id: `src-${Date.now()}`, title: "New Uploaded Source", type: "text", content: "Sample content...",
                chunks: [{ id: `ch-new-1`, sourceId: `src-${Date.now()}`, content: "Sample chunk content", metadata: { section: "General", position: 0 } }],
                metadata: { author: "You", uploadedAt: new Date().toISOString(), updatedAt: new Date().toISOString(), size: 1500, wordCount: 250 },
                healthScore: 100, stalenessScore: 0, citationCount: 0, status: "indexed" });
              setUploadOpen(false);
            }} className="w-full py-2.5 rounded-lg text-white text-sm font-medium" style={{ background: "linear-gradient(135deg, #4597b0, #56b3f5)" }}>
              Upload & Index
            </button>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {detailData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="rounded-2xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto space-y-5" style={{ background: "var(--bg-primary)", border: "1px solid var(--border-primary)" }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#4597b0]/10 flex items-center justify-center text-[#4597b0]"><TypeIcon type={detailData.type} /></div>
                <div>
                  <h2 className="font-bold" style={{ color: "var(--text-primary)" }}>{detailData.title}</h2>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>{detailData.type.toUpperCase()} &middot; {detailData.metadata.author}</p>
                </div>
              </div>
              <button onClick={() => setDetailSource(null)} style={{ color: "var(--text-muted)" }}><X size={20} /></button>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[{ label: "Health", value: detailData.healthScore }, { label: "Staleness", value: `${detailData.stalenessScore}d` },
                { label: "Chunks", value: detailData.chunks.length }, { label: "Citations", value: detailData.citationCount }].map((m) => (
                <div key={m.label} className="rounded-lg p-3 text-center" style={{ background: "var(--bg-input)" }}>
                  <p className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>{m.value}</p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>{m.label}</p>
                </div>
              ))}
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--text-secondary)" }}>Chunks</h3>
              <div className="space-y-2">
                {detailData.chunks.map((chunk) => (
                  <div key={chunk.id} className="rounded-lg p-3" style={{ background: "var(--bg-input)", border: "1px solid var(--border-primary)" }}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs" style={{ color: "var(--text-muted)" }}>{chunk.metadata.section}</span>
                      <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>#{chunk.metadata.position}</span>
                    </div>
                    <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>{chunk.content}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm" style={{ background: "var(--bg-input)", border: "1px solid var(--border-primary)", color: "var(--text-tertiary)" }}>
                <RefreshCw size={14} /> Re-index
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm" style={{ background: "var(--bg-input)", border: "1px solid var(--border-primary)", color: "var(--text-tertiary)" }}>
                <Eye size={14} /> View Raw
              </button>
              <button onClick={() => { removeSource(detailData.id); setDetailSource(null); }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm hover:bg-red-500/20 ml-auto">
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Templates Modal */}
      {showTemplates && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="rounded-2xl p-6 max-w-lg w-full mx-4 space-y-5" style={{ background: "var(--bg-primary)", border: "1px solid var(--border-primary)" }}>
            <div className="flex items-center justify-between">
              <h2 className="font-bold font-serif text-lg" style={{ color: "var(--text-primary)" }}>Choose a Template</h2>
              <button onClick={() => setShowTemplates(false)} style={{ color: "var(--text-muted)" }}><X size={20} /></button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {TEMPLATES.map((t) => (
                <button key={t.name} onClick={() => createDoc(t.name)}
                  className="flex items-center gap-3 p-4 rounded-lg transition-all text-left"
                  style={{ background: "var(--bg-input)", border: "1px solid var(--border-primary)" }}>
                  <t.icon size={18} className="text-[#4597b0]" />
                  <div>
                    <p className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>{t.name}</p>
                    <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>{t.category}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
