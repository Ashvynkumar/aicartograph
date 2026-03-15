"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import {
  Building, Key, Sliders, Bell, Users, Download,
  Upload, AlertTriangle, Palette, Globe, Shield, Save,
  Sun, Moon, Monitor, LogOut,
} from "lucide-react";

export default function SettingsPage() {
  const { user, theme, setTheme, logout } = useAppStore();
  const [activeTab, setActiveTab] = useState("organization");

  const tabs = [
    { id: "organization", label: "Organization", icon: Building },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "api-keys", label: "API Keys", icon: Key },
    { id: "ingestion", label: "Ingestion", icon: Sliders },
    { id: "alerts", label: "Alerts", icon: Bell },
    { id: "team", label: "Team", icon: Users },
    { id: "security", label: "Security", icon: Shield },
    { id: "data", label: "Data", icon: Download },
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-xl font-bold font-serif" style={{ color: "var(--text-primary)" }}>Settings</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>Configure your aiCartograph workspace</p>
      </div>

      <div className="flex gap-6">
        {/* Tabs */}
        <div className="w-48 shrink-0 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all`}
              style={{
                background: activeTab === tab.id ? "var(--bg-input-hover)" : "transparent",
                color: activeTab === tab.id ? "var(--text-primary)" : "var(--text-muted)",
              }}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 app-card rounded-xl p-6">
          {activeTab === "organization" && (
            <div className="space-y-6">
              <h2 className="font-semibold" style={{ color: "var(--text-primary)" }}>Organization</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-xs block mb-1.5" style={{ color: "var(--text-muted)" }}>Company Name</label>
                  <input defaultValue={user.company} className="w-full px-3 py-2 rounded-lg text-sm app-input" />
                </div>
                <div>
                  <label className="text-xs block mb-1.5" style={{ color: "var(--text-muted)" }}>Admin Email</label>
                  <input defaultValue={user.email} className="w-full px-3 py-2 rounded-lg text-sm app-input" />
                </div>
                <div>
                  <label className="text-xs block mb-1.5" style={{ color: "var(--text-muted)" }}>Industry</label>
                  <select className="w-full px-3 py-2 rounded-lg text-sm app-input">
                    <option>Technology / SaaS</option>
                    <option>Healthcare</option>
                    <option>Finance</option>
                    <option>Manufacturing</option>
                    <option>Legal</option>
                    <option>Education</option>
                    <option>Other</option>
                  </select>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#4597b0] text-white text-sm font-medium hover:bg-[#3a87a0] transition-all">
                  <Save size={14} /> Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === "appearance" && (
            <div className="space-y-6">
              <h2 className="font-semibold" style={{ color: "var(--text-primary)" }}>Appearance</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-xs block mb-3" style={{ color: "var(--text-muted)" }}>Theme</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setTheme("dark")}
                      className="flex items-center gap-3 p-4 rounded-xl transition-all"
                      style={{
                        background: theme === "dark" ? "rgba(69,151,176,0.1)" : "var(--bg-input)",
                        border: theme === "dark" ? "2px solid #4597b0" : "2px solid var(--border-primary)",
                      }}
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#0c2329] border border-white/10 flex items-center justify-center">
                        <Moon size={18} className="text-[#4597b0]" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Dark</p>
                        <p className="text-xs" style={{ color: "var(--text-muted)" }}>Easy on the eyes</p>
                      </div>
                    </button>
                    <button
                      onClick={() => setTheme("light")}
                      className="flex items-center gap-3 p-4 rounded-xl transition-all"
                      style={{
                        background: theme === "light" ? "rgba(69,151,176,0.1)" : "var(--bg-input)",
                        border: theme === "light" ? "2px solid #4597b0" : "2px solid var(--border-primary)",
                      }}
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#f5f8fa] border border-gray-200 flex items-center justify-center">
                        <Sun size={18} className="text-[#f0b429]" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Light</p>
                        <p className="text-xs" style={{ color: "var(--text-muted)" }}>Clean and bright</p>
                      </div>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs block mb-1.5" style={{ color: "var(--text-muted)" }}>Accent Color</label>
                  <div className="flex items-center gap-3">
                    <input type="color" defaultValue="#4597b0" className="w-10 h-10 rounded cursor-pointer bg-transparent border-0" />
                    <input defaultValue="#4597b0" className="px-3 py-2 rounded-lg text-sm w-32 app-input" />
                  </div>
                </div>

                <div>
                  <label className="text-xs block mb-1.5" style={{ color: "var(--text-muted)" }}>Organization Logo</label>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg flex items-center justify-center" style={{ background: "var(--bg-input)", border: "1px solid var(--border-primary)" }}>
                      <Upload size={20} style={{ color: "var(--text-muted)" }} />
                    </div>
                    <button className="px-3 py-1.5 rounded-lg text-sm" style={{ background: "var(--bg-input)", border: "1px solid var(--border-primary)", color: "var(--text-tertiary)" }}>
                      Upload Logo
                    </button>
                  </div>
                </div>

                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#4597b0] text-white text-sm font-medium hover:bg-[#3a87a0] transition-all">
                  <Save size={14} /> Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === "api-keys" && (
            <div className="space-y-6">
              <h2 className="font-semibold" style={{ color: "var(--text-primary)" }}>API Keys</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-xs block mb-1.5" style={{ color: "var(--text-muted)" }}>Anthropic API Key</label>
                  <input type="password" defaultValue="sk-ant-****" className="w-full px-3 py-2 rounded-lg text-sm app-input" />
                  <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>Used for resolution and analysis. Leave blank to use platform key.</p>
                </div>
                <div>
                  <label className="text-xs block mb-1.5" style={{ color: "var(--text-muted)" }}>Platform API Token</label>
                  <div className="flex gap-2">
                    <input readOnly value="aicarto_pk_live_7f8g9h..." className="flex-1 px-3 py-2 rounded-lg text-sm app-input" />
                    <button className="px-3 py-2 rounded-lg text-sm" style={{ background: "var(--bg-input)", border: "1px solid var(--border-primary)", color: "var(--text-tertiary)" }}>Copy</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "ingestion" && (
            <div className="space-y-6">
              <h2 className="font-semibold" style={{ color: "var(--text-primary)" }}>Ingestion Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-xs block mb-1.5" style={{ color: "var(--text-muted)" }}>Chunk Size (tokens)</label>
                  <input type="number" defaultValue={512} className="w-full px-3 py-2 rounded-lg text-sm app-input" />
                </div>
                <div>
                  <label className="text-xs block mb-1.5" style={{ color: "var(--text-muted)" }}>Chunk Overlap (tokens)</label>
                  <input type="number" defaultValue={50} className="w-full px-3 py-2 rounded-lg text-sm app-input" />
                </div>
                <div>
                  <label className="text-xs block mb-1.5" style={{ color: "var(--text-muted)" }}>Embedding Model</label>
                  <select className="w-full px-3 py-2 rounded-lg text-sm app-input">
                    <option>Voyage AI (voyage-3)</option>
                    <option>OpenAI (text-embedding-3-small)</option>
                    <option>Cohere (embed-v3)</option>
                  </select>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#4597b0] text-white text-sm font-medium hover:bg-[#3a87a0] transition-all">
                  <Save size={14} /> Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === "alerts" && (
            <div className="space-y-6">
              <h2 className="font-semibold" style={{ color: "var(--text-primary)" }}>Alert Thresholds</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-xs block mb-1.5" style={{ color: "var(--text-muted)" }}>Staleness Warning (days)</label>
                  <input type="number" defaultValue={30} className="w-full px-3 py-2 rounded-lg text-sm app-input" />
                </div>
                <div>
                  <label className="text-xs block mb-1.5" style={{ color: "var(--text-muted)" }}>Staleness Critical (days)</label>
                  <input type="number" defaultValue={90} className="w-full px-3 py-2 rounded-lg text-sm app-input" />
                </div>
                <div>
                  <label className="text-xs block mb-1.5" style={{ color: "var(--text-muted)" }}>Minimum Health Score</label>
                  <input type="number" defaultValue={60} className="w-full px-3 py-2 rounded-lg text-sm app-input" />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#4597b0] text-white text-sm font-medium hover:bg-[#3a87a0] transition-all">
                  <Save size={14} /> Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === "team" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold" style={{ color: "var(--text-primary)" }}>Team Members</h2>
                <button className="px-3 py-1.5 rounded-lg bg-[#4597b0] text-white text-xs font-medium">Invite Member</button>
              </div>
              <div className="space-y-2">
                {[
                  { name: "Atlas", email: "atlas@aicartograph.com", role: "Admin" },
                  { name: "Compass", email: "compass@aicartograph.com", role: "AI Agent" },
                ].map((m) => (
                  <div key={m.email} className="flex items-center justify-between p-3 rounded-lg" style={{ background: "var(--bg-input)" }}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4597b0] to-[#56b3f5] flex items-center justify-center text-white text-xs font-bold">
                        {m.name[0]}
                      </div>
                      <div>
                        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{m.name}</p>
                        <p className="text-xs" style={{ color: "var(--text-muted)" }}>{m.email}</p>
                      </div>
                    </div>
                    <span className="text-xs px-2 py-1 rounded" style={{ background: "var(--bg-input)", color: "var(--text-muted)" }}>{m.role}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6">
              <h2 className="font-semibold" style={{ color: "var(--text-primary)" }}>Security</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg" style={{ background: "var(--bg-input)" }}>
                  <div>
                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Multi-Factor Authentication (MFA)</p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>Require TOTP code on login</p>
                  </div>
                  <button className="px-3 py-1.5 rounded-lg bg-[#4597b0]/10 text-[#4597b0] text-xs font-medium">Enable</button>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg" style={{ background: "var(--bg-input)" }}>
                  <div>
                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Session Timeout</p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>Auto-logout after inactivity</p>
                  </div>
                  <select className="px-3 py-1.5 rounded-lg text-xs app-input">
                    <option>30 minutes</option>
                    <option>1 hour</option>
                    <option>4 hours</option>
                    <option>Never</option>
                  </select>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg" style={{ background: "var(--bg-input)" }}>
                  <div>
                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>SSO / SAML</p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>Enterprise single sign-on</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded" style={{ background: "var(--bg-input)", color: "var(--text-muted)" }}>Enterprise Plan</span>
                </div>
              </div>

              {/* Logout section */}
              <div style={{ borderTop: "1px solid var(--border-primary)", paddingTop: "1rem" }}>
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: "var(--text-secondary)" }}>
                  <LogOut size={14} /> Session
                </h3>
                <button
                  onClick={logout}
                  className="px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm hover:bg-red-500/20 transition-all"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}

          {activeTab === "data" && (
            <div className="space-y-6">
              <h2 className="font-semibold" style={{ color: "var(--text-primary)" }}>Data Management</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg" style={{ background: "var(--bg-input)" }}>
                  <div>
                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Export Knowledge Corpus</p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>Download all sources and metadata as JSON</p>
                  </div>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs" style={{ background: "var(--bg-input)", border: "1px solid var(--border-primary)", color: "var(--text-tertiary)" }}>
                    <Download size={12} /> Export
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg" style={{ background: "var(--bg-input)" }}>
                  <div>
                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Import Knowledge Corpus</p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>Restore from a previous export</p>
                  </div>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs" style={{ background: "var(--bg-input)", border: "1px solid var(--border-primary)", color: "var(--text-tertiary)" }}>
                    <Upload size={12} /> Import
                  </button>
                </div>
                <div style={{ borderTop: "1px solid var(--border-primary)", paddingTop: "1rem", marginTop: "1rem" }}>
                  <h3 className="text-red-400 text-sm font-semibold mb-3 flex items-center gap-2">
                    <AlertTriangle size={14} /> Danger Zone
                  </h3>
                  <button className="px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm hover:bg-red-500/20 transition-all">
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
