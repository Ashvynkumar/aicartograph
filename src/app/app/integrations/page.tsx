"use client";

import { useState } from "react";
import { INTEGRATION_CARDS } from "@/lib/demo-data";
import {
  Plug, Search, X, Key, ExternalLink,
  MessageSquare, CheckSquare, FileText, BookOpen, Headphones,
  TrendingUp, Github, FolderOpen, Globe, MessageCircle, Zap, Target,
} from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  MessageSquare, CheckSquare, FileText, BookOpen, Headphones,
  TrendingUp, Github, FolderOpen, Globe, MessageCircle, Zap, Target,
};

export default function IntegrationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null);

  const filtered = INTEGRATION_CARDS.filter(
    (i) => !searchQuery || i.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selected = INTEGRATION_CARDS.find((i) => i.name === selectedIntegration);
  const categories = [...new Set(INTEGRATION_CARDS.map((i) => i.category))];

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-white text-xl font-bold font-serif">Integrations</h1>
        <p className="text-white/40 text-sm mt-1">Connect aiCartograph with your existing tools</p>
      </div>

      <div className="relative max-w-sm">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search integrations..."
          className="w-full pl-9 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm outline-none placeholder:text-white/30 focus:border-[#4597b0]/50"
        />
      </div>

      {categories.map((cat) => {
        const catItems = filtered.filter((i) => i.category === cat);
        if (catItems.length === 0) return null;
        return (
          <div key={cat}>
            <h2 className="text-white/50 text-xs uppercase tracking-wider mb-3">{cat}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {catItems.map((integration) => {
                const Icon = ICON_MAP[integration.icon] || Plug;
                return (
                  <div
                    key={integration.name}
                    onClick={() => setSelectedIntegration(integration.name)}
                    className="bg-[#223e49]/60 border border-white/5 rounded-xl p-5 hover:border-[#4597b0]/30 hover:translate-y-[-2px] transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                        <Icon size={20} className="text-[#4597b0]" />
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-white/30">
                        Not connected
                      </span>
                    </div>
                    <h3 className="text-white/90 font-medium text-sm mb-1">{integration.name}</h3>
                    <p className="text-white/40 text-xs">{integration.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Integration Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0c2329] border border-white/10 rounded-2xl p-6 max-w-md w-full mx-4 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                  {(() => { const Icon = ICON_MAP[selected.icon] || Plug; return <Icon size={24} className="text-[#4597b0]" />; })()}
                </div>
                <div>
                  <h2 className="text-white font-bold">{selected.name}</h2>
                  <p className="text-white/40 text-xs">{selected.category}</p>
                </div>
              </div>
              <button onClick={() => setSelectedIntegration(null)} className="text-white/40 hover:text-white/80"><X size={20} /></button>
            </div>

            <p className="text-white/60 text-sm">{selected.description}</p>

            <div className="space-y-3">
              <h3 className="text-white/80 text-sm font-medium">Capabilities</h3>
              <div className="space-y-2">
                {["Auto-sync data as knowledge sources", "Send resolution alerts", "Create tasks from feedback", "Bi-directional data sync"].map((cap) => (
                  <div key={cap} className="flex items-center gap-2 text-white/50 text-xs">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#4597b0]" />
                    {cap}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="text-white/40 text-xs block mb-1.5">API Key</label>
              <input placeholder="Enter API key..." className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm outline-none placeholder:text-white/30" />
            </div>

            <button className="w-full py-2.5 rounded-lg bg-gradient-to-r from-[#4597b0] to-[#62acbb] text-white text-sm font-medium">
              Connect {selected.name}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
