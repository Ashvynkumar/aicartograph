"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import {
  Settings, Building, Key, Sliders, Bell, Users, Download,
  Upload, AlertTriangle, Palette, Globe, Shield, Save,
} from "lucide-react";

export default function SettingsPage() {
  const { user } = useAppStore();
  const [activeTab, setActiveTab] = useState("organization");

  const tabs = [
    { id: "organization", label: "Organization", icon: Building },
    { id: "api-keys", label: "API Keys", icon: Key },
    { id: "ingestion", label: "Ingestion", icon: Sliders },
    { id: "alerts", label: "Alerts", icon: Bell },
    { id: "team", label: "Team", icon: Users },
    { id: "branding", label: "Branding", icon: Palette },
    { id: "security", label: "Security", icon: Shield },
    { id: "data", label: "Data", icon: Download },
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-white text-xl font-bold font-serif">Settings</h1>
        <p className="text-white/40 text-sm mt-1">Configure your aiCartograph workspace</p>
      </div>

      <div className="flex gap-6">
        {/* Tabs */}
        <div className="w-48 shrink-0 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${
                activeTab === tab.id ? "bg-white/10 text-white" : "text-white/40 hover:text-white/60 hover:bg-white/5"
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 bg-[#223e49]/60 border border-white/5 rounded-xl p-6">
          {activeTab === "organization" && (
            <div className="space-y-6">
              <h2 className="text-white font-semibold">Organization</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-white/40 text-xs block mb-1.5">Company Name</label>
                  <input defaultValue={user.company} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-[#4597b0]/50" />
                </div>
                <div>
                  <label className="text-white/40 text-xs block mb-1.5">Admin Email</label>
                  <input defaultValue={user.email} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-[#4597b0]/50" />
                </div>
                <div>
                  <label className="text-white/40 text-xs block mb-1.5">Industry</label>
                  <select className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/70 text-sm outline-none">
                    <option>Technology / SaaS</option>
                    <option>Healthcare</option>
                    <option>Finance</option>
                    <option>Manufacturing</option>
                    <option>Legal</option>
                    <option>Education</option>
                    <option>Other</option>
                  </select>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#4597b0] text-white text-sm font-medium">
                  <Save size={14} /> Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === "api-keys" && (
            <div className="space-y-6">
              <h2 className="text-white font-semibold">API Keys</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-white/40 text-xs block mb-1.5">Anthropic API Key</label>
                  <input type="password" defaultValue="sk-ant-****" className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-[#4597b0]/50" />
                  <p className="text-white/30 text-xs mt-1">Used for resolution and analysis. Leave blank to use platform key.</p>
                </div>
                <div>
                  <label className="text-white/40 text-xs block mb-1.5">Platform API Token</label>
                  <div className="flex gap-2">
                    <input readOnly value="aicarto_pk_live_7f8g9h..." className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/50 text-sm" />
                    <button className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/50 text-sm hover:bg-white/10">Copy</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "ingestion" && (
            <div className="space-y-6">
              <h2 className="text-white font-semibold">Ingestion Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-white/40 text-xs block mb-1.5">Chunk Size (tokens)</label>
                  <input type="number" defaultValue={512} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-[#4597b0]/50" />
                </div>
                <div>
                  <label className="text-white/40 text-xs block mb-1.5">Chunk Overlap (tokens)</label>
                  <input type="number" defaultValue={50} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-[#4597b0]/50" />
                </div>
                <div>
                  <label className="text-white/40 text-xs block mb-1.5">Embedding Model</label>
                  <select className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/70 text-sm outline-none">
                    <option>Voyage AI (voyage-3)</option>
                    <option>OpenAI (text-embedding-3-small)</option>
                    <option>Cohere (embed-v3)</option>
                  </select>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#4597b0] text-white text-sm font-medium">
                  <Save size={14} /> Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === "alerts" && (
            <div className="space-y-6">
              <h2 className="text-white font-semibold">Alert Thresholds</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-white/40 text-xs block mb-1.5">Staleness Warning (days)</label>
                  <input type="number" defaultValue={30} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-[#4597b0]/50" />
                </div>
                <div>
                  <label className="text-white/40 text-xs block mb-1.5">Staleness Critical (days)</label>
                  <input type="number" defaultValue={90} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-[#4597b0]/50" />
                </div>
                <div>
                  <label className="text-white/40 text-xs block mb-1.5">Minimum Health Score</label>
                  <input type="number" defaultValue={60} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-[#4597b0]/50" />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#4597b0] text-white text-sm font-medium">
                  <Save size={14} /> Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === "team" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-white font-semibold">Team Members</h2>
                <button className="px-3 py-1.5 rounded-lg bg-[#4597b0] text-white text-xs font-medium">Invite Member</button>
              </div>
              <div className="space-y-2">
                {[
                  { name: "Atlas", email: "atlas@aicartograph.com", role: "Admin" },
                  { name: "Compass", email: "compass@aicartograph.com", role: "AI Agent" },
                ].map((m) => (
                  <div key={m.email} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4597b0] to-[#62acbb] flex items-center justify-center text-white text-xs font-bold">
                        {m.name[0]}
                      </div>
                      <div>
                        <p className="text-white/80 text-sm">{m.name}</p>
                        <p className="text-white/30 text-xs">{m.email}</p>
                      </div>
                    </div>
                    <span className="text-white/40 text-xs px-2 py-1 rounded bg-white/5">{m.role}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "branding" && (
            <div className="space-y-6">
              <h2 className="text-white font-semibold">White-Label Branding</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-white/40 text-xs block mb-1.5">Organization Logo</label>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                      <Upload size={20} className="text-white/20" />
                    </div>
                    <button className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/50 text-sm">Upload Logo</button>
                  </div>
                </div>
                <div>
                  <label className="text-white/40 text-xs block mb-1.5">Accent Color</label>
                  <div className="flex items-center gap-3">
                    <input type="color" defaultValue="#4597b0" className="w-10 h-10 rounded cursor-pointer bg-transparent border-0" />
                    <input defaultValue="#4597b0" className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm outline-none w-32" />
                  </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#4597b0] text-white text-sm font-medium">
                  <Save size={14} /> Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6">
              <h2 className="text-white font-semibold">Security</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-white/[0.02]">
                  <div>
                    <p className="text-white/80 text-sm">Multi-Factor Authentication (MFA)</p>
                    <p className="text-white/30 text-xs">Require TOTP code on login</p>
                  </div>
                  <button className="px-3 py-1.5 rounded-lg bg-[#4597b0]/10 text-[#4597b0] text-xs font-medium">Enable</button>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-white/[0.02]">
                  <div>
                    <p className="text-white/80 text-sm">Session Timeout</p>
                    <p className="text-white/30 text-xs">Auto-logout after inactivity</p>
                  </div>
                  <select className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/70 text-xs">
                    <option>30 minutes</option>
                    <option>1 hour</option>
                    <option>4 hours</option>
                    <option>Never</option>
                  </select>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-white/[0.02]">
                  <div>
                    <p className="text-white/80 text-sm">SSO / SAML</p>
                    <p className="text-white/30 text-xs">Enterprise single sign-on</p>
                  </div>
                  <span className="text-white/30 text-xs px-2 py-1 rounded bg-white/5">Enterprise Plan</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "data" && (
            <div className="space-y-6">
              <h2 className="text-white font-semibold">Data Management</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-white/[0.02]">
                  <div>
                    <p className="text-white/80 text-sm">Export Knowledge Corpus</p>
                    <p className="text-white/30 text-xs">Download all sources and metadata as JSON</p>
                  </div>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/60 text-xs hover:bg-white/10">
                    <Download size={12} /> Export
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-white/[0.02]">
                  <div>
                    <p className="text-white/80 text-sm">Import Knowledge Corpus</p>
                    <p className="text-white/30 text-xs">Restore from a previous export</p>
                  </div>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/60 text-xs hover:bg-white/10">
                    <Upload size={12} /> Import
                  </button>
                </div>
                <div className="border-t border-white/5 pt-4 mt-4">
                  <h3 className="text-red-400 text-sm font-semibold mb-3 flex items-center gap-2">
                    <AlertTriangle size={14} /> Danger Zone
                  </h3>
                  <button className="px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm hover:bg-red-500/20">
                    Reset All Data
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
