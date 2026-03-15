"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import {
  Upload, FileText, Globe, Type, Table, Code, Search,
  Grid3x3, List, MoreVertical, Eye, RefreshCw, Trash2,
  X, ChevronDown,
} from "lucide-react";

function TypeIcon({ type }: { type: string }) {
  const icons: Record<string, React.ElementType> = {
    pdf: FileText, url: Globe, text: Type, csv: Table, markdown: Code,
  };
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

export default function SourcesPage() {
  const { sources, addSource, removeSource } = useAppStore();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadOpen, setUploadOpen] = useState(false);
  const [filterType, setFilterType] = useState<string>("all");
  const [detailSource, setDetailSource] = useState<string | null>(null);

  const filtered = sources.filter((s) => {
    if (filterType !== "all" && s.type !== filterType) return false;
    if (searchQuery && !s.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const detailData = sources.find((s) => s.id === detailSource);

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white text-xl font-bold font-serif">Knowledge Sources</h1>
          <p className="text-white/40 text-sm mt-1">{sources.length} sources indexed &middot; {sources.reduce((a, s) => a + s.chunks.length, 0)} chunks</p>
        </div>
        <button
          onClick={() => setUploadOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#4597b0] to-[#62acbb] text-white text-sm font-medium hover:shadow-lg hover:shadow-[#4597b0]/20 transition-all"
        >
          <Upload size={16} />
          Upload Source
        </button>
      </div>

      {/* Filters + Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search sources..."
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm outline-none placeholder:text-white/30 focus:border-[#4597b0]/50"
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="appearance-none px-3 py-2 pr-8 rounded-lg bg-white/5 border border-white/10 text-white/70 text-sm outline-none cursor-pointer"
            >
              <option value="all">All Types</option>
              <option value="pdf">PDF</option>
              <option value="url">URL</option>
              <option value="text">Text</option>
              <option value="csv">CSV</option>
              <option value="markdown">Markdown</option>
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
          </div>
          <div className="flex items-center bg-white/5 border border-white/10 rounded-lg">
            <button onClick={() => setView("grid")} className={`p-2 rounded-l-lg ${view === "grid" ? "bg-white/10 text-white" : "text-white/40"}`}>
              <Grid3x3 size={16} />
            </button>
            <button onClick={() => setView("list")} className={`p-2 rounded-r-lg ${view === "list" ? "bg-white/10 text-white" : "text-white/40"}`}>
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Sources Grid/List */}
      {filtered.length === 0 ? (
        <div className="bg-[#223e49]/60 border border-white/5 rounded-xl p-12 text-center">
          <Upload size={32} className="mx-auto text-white/20 mb-4" />
          <h3 className="text-white/60 font-medium mb-2">No sources yet</h3>
          <p className="text-white/30 text-sm mb-4">Upload your first knowledge source to see resolution in action.</p>
          <button onClick={() => setUploadOpen(true)} className="px-4 py-2 rounded-lg bg-[#4597b0] text-white text-sm font-medium">
            Upload Source
          </button>
        </div>
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((source) => (
            <div
              key={source.id}
              onClick={() => setDetailSource(source.id)}
              className="bg-[#223e49]/60 border border-white/5 rounded-xl p-5 hover:border-[#4597b0]/30 hover:translate-y-[-2px] transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#4597b0]/10 flex items-center justify-center text-[#4597b0]">
                    <TypeIcon type={source.type} />
                  </div>
                  <span className="text-white/30 text-xs uppercase">{source.type}</span>
                </div>
                <HealthBadge score={source.healthScore} />
              </div>
              <h3 className="text-white/90 font-medium text-sm mb-2 truncate">{source.title}</h3>
              <div className="flex items-center gap-4 text-xs text-white/30">
                <span>{source.chunks.length} chunks</span>
                <span>{source.citationCount} citations</span>
                <StaleBadge days={source.stalenessScore} />
              </div>
              <div className="mt-3 w-full bg-white/5 rounded-full h-1.5">
                <div
                  className="h-1.5 rounded-full transition-all"
                  style={{
                    width: `${source.healthScore}%`,
                    backgroundColor: source.healthScore >= 80 ? "#4ba88e" : source.healthScore >= 60 ? "#d4a853" : "#d4726a",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-[#223e49]/60 border border-white/5 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-4 py-3 text-white/40 text-xs font-medium">Source</th>
                <th className="text-left px-4 py-3 text-white/40 text-xs font-medium">Type</th>
                <th className="text-left px-4 py-3 text-white/40 text-xs font-medium">Health</th>
                <th className="text-left px-4 py-3 text-white/40 text-xs font-medium">Updated</th>
                <th className="text-left px-4 py-3 text-white/40 text-xs font-medium">Chunks</th>
                <th className="text-left px-4 py-3 text-white/40 text-xs font-medium">Citations</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((source) => (
                <tr
                  key={source.id}
                  onClick={() => setDetailSource(source.id)}
                  className="border-b border-white/5 hover:bg-white/5 cursor-pointer transition-all"
                >
                  <td className="px-4 py-3 text-white/80 text-sm">{source.title}</td>
                  <td className="px-4 py-3 text-white/40 text-xs uppercase">{source.type}</td>
                  <td className="px-4 py-3"><HealthBadge score={source.healthScore} /></td>
                  <td className="px-4 py-3"><StaleBadge days={source.stalenessScore} /></td>
                  <td className="px-4 py-3 text-white/40 text-sm">{source.chunks.length}</td>
                  <td className="px-4 py-3 text-white/40 text-sm">{source.citationCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Upload Modal */}
      {uploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0c2329] border border-white/10 rounded-2xl p-6 max-w-lg w-full mx-4 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-white font-bold font-serif text-lg">Upload Knowledge Source</h2>
              <button onClick={() => setUploadOpen(false)} className="text-white/40 hover:text-white/80"><X size={20} /></button>
            </div>
            <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-[#4597b0]/30 transition-all cursor-pointer">
              <Upload size={32} className="mx-auto text-white/20 mb-3" />
              <p className="text-white/60 text-sm mb-1">Drag & drop files here, or click to browse</p>
              <p className="text-white/30 text-xs">PDF, URL, Text, CSV, Markdown supported</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Globe, label: "Paste URL", desc: "Crawl a webpage" },
                { icon: Type, label: "Paste Text", desc: "Raw text input" },
              ].map((opt) => (
                <button key={opt.label} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-left">
                  <opt.icon size={18} className="text-[#4597b0]" />
                  <div>
                    <p className="text-white/80 text-sm">{opt.label}</p>
                    <p className="text-white/30 text-[10px]">{opt.desc}</p>
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={() => {
                addSource({
                  id: `src-${Date.now()}`,
                  title: "New Uploaded Source",
                  type: "text",
                  content: "Sample content...",
                  chunks: [{ id: `ch-new-1`, sourceId: `src-${Date.now()}`, content: "Sample chunk content", metadata: { section: "General", position: 0 } }],
                  metadata: { author: "You", uploadedAt: new Date().toISOString(), updatedAt: new Date().toISOString(), size: 1500, wordCount: 250 },
                  healthScore: 100, stalenessScore: 0, citationCount: 0, status: "indexed",
                });
                setUploadOpen(false);
              }}
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-[#4597b0] to-[#62acbb] text-white text-sm font-medium"
            >
              Upload & Index
            </button>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {detailData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0c2329] border border-white/10 rounded-2xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#4597b0]/10 flex items-center justify-center text-[#4597b0]">
                  <TypeIcon type={detailData.type} />
                </div>
                <div>
                  <h2 className="text-white font-bold">{detailData.title}</h2>
                  <p className="text-white/40 text-xs">{detailData.type.toUpperCase()} &middot; {detailData.metadata.author}</p>
                </div>
              </div>
              <button onClick={() => setDetailSource(null)} className="text-white/40 hover:text-white/80"><X size={20} /></button>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {[
                { label: "Health", value: detailData.healthScore },
                { label: "Staleness", value: `${detailData.stalenessScore}d` },
                { label: "Chunks", value: detailData.chunks.length },
                { label: "Citations", value: detailData.citationCount },
              ].map((m) => (
                <div key={m.label} className="bg-white/5 rounded-lg p-3 text-center">
                  <p className="text-white text-lg font-bold">{m.value}</p>
                  <p className="text-white/40 text-xs">{m.label}</p>
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-white/80 text-sm font-semibold mb-3">Chunks</h3>
              <div className="space-y-2">
                {detailData.chunks.map((chunk) => (
                  <div key={chunk.id} className="bg-white/5 border border-white/5 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white/50 text-xs">{chunk.metadata.section}</span>
                      <span className="text-white/30 text-[10px]">#{chunk.metadata.position}</span>
                    </div>
                    <p className="text-white/70 text-sm">{chunk.content}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/60 text-sm hover:bg-white/10">
                <RefreshCw size={14} /> Re-index
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/60 text-sm hover:bg-white/10">
                <Eye size={14} /> View Raw
              </button>
              <button
                onClick={() => { removeSource(detailData.id); setDetailSource(null); }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm hover:bg-red-500/20 ml-auto"
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
