"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import {
  PenLine, Plus, Eye, Edit3, FileText, Archive, Send,
  Sparkles, AlertTriangle, Search, ChevronDown, X,
  Bold, Italic, Link, Code, List, Table, Image, Heading,
  CheckSquare, Save,
} from "lucide-react";

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

export default function FoundryPage() {
  const { documents, addDocument, updateDocument } = useAppStore();
  const [editingDoc, setEditingDoc] = useState<string | null>(null);
  const [editorContent, setEditorContent] = useState("");
  const [editorTitle, setEditorTitle] = useState("");
  const [viewMode, setViewMode] = useState<"edit" | "preview">("edit");
  const [showTemplates, setShowTemplates] = useState(false);

  const activeDoc = documents.find((d) => d.id === editingDoc);

  const createDoc = (template?: string) => {
    const id = `doc-${Date.now()}`;
    const doc = {
      id,
      title: template ? `New ${template}` : "Untitled Document",
      content: template ? `# ${template}\n\nStart writing here...` : "# Untitled\n\nStart writing here...",
      status: "draft" as const,
      author: "Atlas",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      healthScore: 0,
      citationCount: 0,
      template,
    };
    addDocument(doc);
    setEditingDoc(id);
    setEditorTitle(doc.title);
    setEditorContent(doc.content);
    setShowTemplates(false);
  };

  const openDoc = (id: string) => {
    const doc = documents.find((d) => d.id === id);
    if (doc) {
      setEditingDoc(id);
      setEditorTitle(doc.title);
      setEditorContent(doc.content);
    }
  };

  const saveDoc = () => {
    if (editingDoc) {
      updateDocument(editingDoc, {
        title: editorTitle,
        content: editorContent,
        updatedAt: new Date().toISOString(),
      });
    }
  };

  if (editingDoc) {
    return (
      <div className="flex h-[calc(100vh-5rem)] -m-6">
        {/* Toolbar */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-[#0c2329]/50">
            <div className="flex items-center gap-3">
              <button onClick={() => { saveDoc(); setEditingDoc(null); }} className="text-white/40 hover:text-white/80">
                <X size={18} />
              </button>
              <input
                type="text"
                value={editorTitle}
                onChange={(e) => setEditorTitle(e.target.value)}
                className="bg-transparent text-white font-medium text-sm outline-none border-none w-64"
              />
              <span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_COLORS[activeDoc?.status || "draft"]}`}>
                {activeDoc?.status || "draft"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {/* AI Assist */}
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#4597b0]/10 text-[#4597b0] text-xs hover:bg-[#4597b0]/20">
                <Sparkles size={12} /> Help me write
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 text-white/50 text-xs hover:bg-white/10">
                <AlertTriangle size={12} /> Check contradictions
              </button>
              {/* View Toggle */}
              <div className="flex bg-white/5 rounded-lg p-0.5">
                <button onClick={() => setViewMode("edit")} className={`px-2.5 py-1 rounded text-xs ${viewMode === "edit" ? "bg-white/10 text-white" : "text-white/40"}`}>
                  <Edit3 size={12} />
                </button>
                <button onClick={() => setViewMode("preview")} className={`px-2.5 py-1 rounded text-xs ${viewMode === "preview" ? "bg-white/10 text-white" : "text-white/40"}`}>
                  <Eye size={12} />
                </button>
              </div>
              <button onClick={saveDoc} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#4597b0] text-white text-xs font-medium">
                <Save size={12} /> Save
              </button>
              <button
                onClick={() => { saveDoc(); if (editingDoc) updateDocument(editingDoc, { status: "published" }); }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 text-white text-xs font-medium"
              >
                <Send size={12} /> Publish
              </button>
            </div>
          </div>

          {/* Formatting Toolbar */}
          <div className="flex items-center gap-1 px-4 py-2 border-b border-white/5">
            {[Heading, Bold, Italic, Link, Code, List, Table, Image, CheckSquare].map((Icon, i) => (
              <button key={i} className="p-1.5 rounded text-white/30 hover:text-white/60 hover:bg-white/5 transition-all">
                <Icon size={14} />
              </button>
            ))}
          </div>

          {/* Editor */}
          <div className="flex-1 overflow-y-auto">
            {viewMode === "edit" ? (
              <textarea
                value={editorContent}
                onChange={(e) => setEditorContent(e.target.value)}
                className="w-full h-full bg-transparent text-white/80 text-sm font-mono p-6 outline-none resize-none leading-relaxed"
                placeholder="Start writing in Markdown..."
              />
            ) : (
              <div className="p-6 prose prose-invert prose-sm max-w-none">
                <div className="text-white/80 text-sm whitespace-pre-wrap">{editorContent}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white text-xl font-bold font-serif">Knowledge Foundry</h1>
          <p className="text-white/40 text-sm mt-1">Create, edit, and publish knowledge documents</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowTemplates(true)} className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white/70 text-sm hover:bg-white/10">
            <FileText size={16} /> Templates
          </button>
          <button onClick={() => createDoc()} className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#4597b0] to-[#62acbb] text-white text-sm font-medium">
            <Plus size={16} /> New Document
          </button>
        </div>
      </div>

      {/* Documents Grid */}
      {documents.length === 0 ? (
        <div className="bg-[#223e49]/60 border border-white/5 rounded-xl p-12 text-center">
          <PenLine size={32} className="mx-auto text-white/20 mb-4" />
          <h3 className="text-white/60 font-medium mb-2">No documents yet</h3>
          <p className="text-white/30 text-sm mb-4">Create your first knowledge document to close the loop.</p>
          <button onClick={() => createDoc()} className="px-4 py-2 rounded-lg bg-[#4597b0] text-white text-sm font-medium">
            Create Document
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map((doc) => (
            <div
              key={doc.id}
              onClick={() => openDoc(doc.id)}
              className="bg-[#223e49]/60 border border-white/5 rounded-xl p-5 hover:border-[#4597b0]/30 hover:translate-y-[-2px] transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <PenLine size={16} className="text-[#4597b0]" />
                <span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_COLORS[doc.status]}`}>
                  {doc.status}
                </span>
              </div>
              <h3 className="text-white/90 font-medium text-sm mb-2">{doc.title}</h3>
              <p className="text-white/30 text-xs line-clamp-2">{doc.content.slice(0, 100)}...</p>
              <div className="flex items-center gap-3 mt-3 text-xs text-white/20">
                <span>{doc.author}</span>
                <span>{new Date(doc.updatedAt).toLocaleDateString()}</span>
                {doc.template && <span className="text-[#4597b0]">{doc.template}</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Templates Modal */}
      {showTemplates && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0c2329] border border-white/10 rounded-2xl p-6 max-w-lg w-full mx-4 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-white font-bold font-serif text-lg">Choose a Template</h2>
              <button onClick={() => setShowTemplates(false)} className="text-white/40 hover:text-white/80"><X size={20} /></button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {TEMPLATES.map((t) => (
                <button
                  key={t.name}
                  onClick={() => createDoc(t.name)}
                  className="flex items-center gap-3 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#4597b0]/30 transition-all text-left"
                >
                  <t.icon size={18} className="text-[#4597b0]" />
                  <div>
                    <p className="text-white/80 text-sm font-medium">{t.name}</p>
                    <p className="text-white/30 text-[10px]">{t.category}</p>
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
