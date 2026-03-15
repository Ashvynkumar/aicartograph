"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import {
  Paintbrush, Languages, Image, Users, Key, Sliders,
  Upload, Save, Copy, Check, Plus, Trash2, Eye, EyeOff,
  Globe, ToggleLeft, ToggleRight, Shield, Clock, Zap,
  Link, RefreshCw, ChevronRight, Mail, Crown, Pencil,
} from "lucide-react";

const DEMO_TEAM = [
  { name: "Atlas Meridian", email: "atlas@aicartograph.com", role: "Admin" as const, joined: "2025-01-15", status: "active" as const },
  { name: "Compass Navigator", email: "compass@aicartograph.com", role: "Admin" as const, joined: "2025-01-15", status: "active" as const },
  { name: "Jordan Lee", email: "jordan.lee@acme.io", role: "Editor" as const, joined: "2025-06-03", status: "active" as const },
  { name: "Priya Sharma", email: "priya.s@acme.io", role: "Editor" as const, joined: "2025-08-21", status: "active" as const },
  { name: "Marcus Chen", email: "m.chen@acme.io", role: "Viewer" as const, joined: "2025-11-10", status: "active" as const },
  { name: "Elena Vasquez", email: "elena.v@acme.io", role: "Viewer" as const, joined: "2026-01-05", status: "invited" as const },
];

const DEMO_OVERRIDES = [
  { key: "nav.dashboard", defaultVal: "Dashboard", override: "" },
  { key: "nav.sources", defaultVal: "Sources", override: "" },
  { key: "resolve.title", defaultVal: "Resolve Contradictions", override: "" },
  { key: "common.save", defaultVal: "Save Changes", override: "" },
  { key: "common.cancel", defaultVal: "Cancel", override: "" },
];

const PERMISSIONS = [
  { action: "View dashboard & analytics", admin: true, editor: true, viewer: true },
  { action: "Manage knowledge sources", admin: true, editor: true, viewer: false },
  { action: "Resolve contradictions", admin: true, editor: true, viewer: false },
  { action: "Create & edit workflows", admin: true, editor: true, viewer: false },
  { action: "Manage team members", admin: true, editor: false, viewer: false },
  { action: "Configure API keys", admin: true, editor: false, viewer: false },
  { action: "Modify platform settings", admin: true, editor: false, viewer: false },
  { action: "White-label branding", admin: true, editor: false, viewer: false },
  { action: "Export / import data", admin: true, editor: true, viewer: false },
  { action: "Delete data & reset", admin: true, editor: false, viewer: false },
];

export default function AdminPage() {
  const { user } = useAppStore();
  const [activeTab, setActiveTab] = useState("white-label");
  const [copiedToken, setCopiedToken] = useState(false);
  const [copiedWebhook, setCopiedWebhook] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [accentColor, setAccentColor] = useState("#4597b0");
  const [poweredBy, setPoweredBy] = useState(true);
  const [autoTranslate, setAutoTranslate] = useState(true);
  const [selectedLang, setSelectedLang] = useState("en");
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Viewer");

  const tabs = [
    { id: "white-label", label: "White-Labelling", icon: Paintbrush },
    { id: "i18n", label: "Translations / i18n", icon: Languages },
    { id: "favicon", label: "Favicon & Branding", icon: Image },
    { id: "team", label: "Team Management", icon: Users },
    { id: "api-keys", label: "API Keys & Tokens", icon: Key },
    { id: "platform", label: "Platform Settings", icon: Sliders },
  ];

  const handleCopy = (text: string, setter: (v: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  const roleIcon = (role: string) => {
    if (role === "Admin") return <Crown size={12} />;
    if (role === "Editor") return <Pencil size={12} />;
    return <Eye size={12} />;
  };

  const roleBadgeStyle = (role: string) => {
    if (role === "Admin") return { background: "rgba(69,151,176,0.15)", color: "#4597b0" };
    if (role === "Editor") return { background: "rgba(240,180,41,0.15)", color: "#f0b429" };
    return { background: "rgba(255,255,255,0.06)", color: "var(--text-muted)" };
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-xl font-bold font-serif" style={{ color: "var(--text-primary)" }}>Admin Control</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>Platform administration, branding, and team management</p>
      </div>

      <div className="flex gap-6">
        {/* Tabs */}
        <div className="w-52 shrink-0 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all"
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

          {/* ── White-Labelling ── */}
          {activeTab === "white-label" && (
            <div className="space-y-6">
              <h2 className="font-semibold" style={{ color: "var(--text-primary)" }}>White-Labelling</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-xs block mb-1.5" style={{ color: "var(--text-muted)" }}>Company Name</label>
                  <input defaultValue={user.company} className="w-full px-3 py-2 rounded-lg text-sm app-input" />
                </div>

                <div>
                  <label className="text-xs block mb-1.5" style={{ color: "var(--text-muted)" }}>Custom Logo</label>
                  <div className="flex items-center gap-4">
                    <div
                      className="w-20 h-20 rounded-lg flex items-center justify-center"
                      style={{ background: "var(--bg-input)", border: "2px dashed var(--border-primary)" }}
                    >
                      <Upload size={22} style={{ color: "var(--text-muted)" }} />
                    </div>
                    <div className="space-y-2">
                      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm" style={{ background: "var(--bg-input)", border: "1px solid var(--border-primary)", color: "var(--text-tertiary)" }}>
                        <Upload size={12} /> Upload Logo
                      </button>
                      <p className="text-xs" style={{ color: "var(--text-muted)" }}>PNG, SVG, or WEBP. Max 2 MB. Recommended 200x60px.</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs block mb-1.5" style={{ color: "var(--text-muted)" }}>Accent Color</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="w-10 h-10 rounded cursor-pointer bg-transparent border-0"
                    />
                    <input
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="px-3 py-2 rounded-lg text-sm w-32 app-input"
                    />
                    <div className="flex gap-1.5">
                      {["#4597b0", "#6366f1", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"].map((c) => (
                        <button
                          key={c}
                          onClick={() => setAccentColor(c)}
                          className="w-7 h-7 rounded-md transition-all"
                          style={{
                            background: c,
                            outline: accentColor === c ? "2px solid var(--text-primary)" : "none",
                            outlineOffset: "2px",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs block mb-1.5" style={{ color: "var(--text-muted)" }}>Custom Domain</label>
                  <div className="flex items-center gap-2">
                    <Globe size={16} style={{ color: "var(--text-muted)" }} />
                    <input placeholder="kb.yourcompany.com" className="flex-1 px-3 py-2 rounded-lg text-sm app-input" />
                  </div>
                  <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>Point a CNAME record to cname.aicartograph.com</p>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg" style={{ background: "var(--bg-input)" }}>
                  <div>
                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Show &quot;Powered by aiCartograph&quot;</p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>Display attribution badge in the widget footer</p>
                  </div>
                  <button onClick={() => setPoweredBy(!poweredBy)}>
                    {poweredBy
                      ? <ToggleRight size={28} className="text-[#4597b0]" />
                      : <ToggleLeft size={28} style={{ color: "var(--text-muted)" }} />
                    }
                  </button>
                </div>

                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#4597b0] text-white text-sm font-medium hover:bg-[#3a87a0] transition-all">
                  <Save size={14} /> Save Branding
                </button>
              </div>
            </div>
          )}

          {/* ── Translations / i18n ── */}
          {activeTab === "i18n" && (
            <div className="space-y-6">
              <h2 className="font-semibold" style={{ color: "var(--text-primary)" }}>Translations / i18n</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-xs block mb-1.5" style={{ color: "var(--text-muted)" }}>Default Language</label>
                  <select
                    value={selectedLang}
                    onChange={(e) => setSelectedLang(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg text-sm app-input"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish (Espa&ntilde;ol)</option>
                    <option value="fr">French (Fran&ccedil;ais)</option>
                    <option value="de">German (Deutsch)</option>
                    <option value="ja">Japanese (&#26085;&#26412;&#35486;)</option>
                    <option value="pt">Portuguese (Portugu&ecirc;s)</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg" style={{ background: "var(--bg-input)" }}>
                  <div>
                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Auto-Translate UI</p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>Automatically translate interface strings using AI</p>
                  </div>
                  <button onClick={() => setAutoTranslate(!autoTranslate)}>
                    {autoTranslate
                      ? <ToggleRight size={28} className="text-[#4597b0]" />
                      : <ToggleLeft size={28} style={{ color: "var(--text-muted)" }} />
                    }
                  </button>
                </div>

                <div>
                  <label className="text-xs block mb-3" style={{ color: "var(--text-muted)" }}>Custom String Overrides</label>
                  <div className="rounded-lg overflow-hidden" style={{ border: "1px solid var(--border-primary)" }}>
                    <table className="w-full text-sm">
                      <thead>
                        <tr style={{ background: "var(--bg-input)" }}>
                          <th className="text-left px-3 py-2 text-xs font-medium" style={{ color: "var(--text-muted)" }}>Key</th>
                          <th className="text-left px-3 py-2 text-xs font-medium" style={{ color: "var(--text-muted)" }}>Default</th>
                          <th className="text-left px-3 py-2 text-xs font-medium" style={{ color: "var(--text-muted)" }}>Override</th>
                        </tr>
                      </thead>
                      <tbody>
                        {DEMO_OVERRIDES.map((row) => (
                          <tr key={row.key} style={{ borderTop: "1px solid var(--border-primary)" }}>
                            <td className="px-3 py-2 font-mono text-xs" style={{ color: "var(--text-muted)" }}>{row.key}</td>
                            <td className="px-3 py-2" style={{ color: "var(--text-secondary)" }}>{row.defaultVal}</td>
                            <td className="px-3 py-2">
                              <input
                                placeholder="Custom text..."
                                defaultValue={row.override}
                                className="w-full px-2 py-1 rounded text-xs app-input"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <button className="flex items-center gap-1.5 mt-2 text-xs" style={{ color: "#4597b0" }}>
                    <Plus size={12} /> Add custom override
                  </button>
                </div>

                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#4597b0] text-white text-sm font-medium hover:bg-[#3a87a0] transition-all">
                  <Save size={14} /> Save Translations
                </button>
              </div>
            </div>
          )}

          {/* ── Favicon & Branding ── */}
          {activeTab === "favicon" && (
            <div className="space-y-6">
              <h2 className="font-semibold" style={{ color: "var(--text-primary)" }}>Favicon & Branding</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-xs block mb-1.5" style={{ color: "var(--text-muted)" }}>Favicon</label>
                  <div className="flex items-center gap-4">
                    <div
                      className="w-14 h-14 rounded-lg flex items-center justify-center"
                      style={{ background: "var(--bg-input)", border: "2px dashed var(--border-primary)" }}
                    >
                      <Image size={18} style={{ color: "var(--text-muted)" }} />
                    </div>
                    <div className="space-y-2">
                      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm" style={{ background: "var(--bg-input)", border: "1px solid var(--border-primary)", color: "var(--text-tertiary)" }}>
                        <Upload size={12} /> Upload Favicon
                      </button>
                      <p className="text-xs" style={{ color: "var(--text-muted)" }}>ICO, PNG, or SVG. 32x32px recommended.</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs block mb-1.5" style={{ color: "var(--text-muted)" }}>Browser Tab Title</label>
                  <input defaultValue="aiCartograph - Knowledge Intelligence" className="w-full px-3 py-2 rounded-lg text-sm app-input" />
                </div>

                <div>
                  <label className="text-xs block mb-1.5" style={{ color: "var(--text-muted)" }}>Meta Description</label>
                  <textarea
                    rows={3}
                    defaultValue="AI-powered knowledge base management with contradiction detection, source health monitoring, and intelligent resolution."
                    className="w-full px-3 py-2 rounded-lg text-sm app-input resize-none"
                  />
                </div>

                <div>
                  <label className="text-xs block mb-1.5" style={{ color: "var(--text-muted)" }}>Open Graph Image</label>
                  <div className="flex items-center gap-4">
                    <div
                      className="w-40 h-20 rounded-lg flex items-center justify-center"
                      style={{ background: "var(--bg-input)", border: "2px dashed var(--border-primary)" }}
                    >
                      <div className="text-center">
                        <Image size={18} style={{ color: "var(--text-muted)" }} />
                        <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>1200x630</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm" style={{ background: "var(--bg-input)", border: "1px solid var(--border-primary)", color: "var(--text-tertiary)" }}>
                        <Upload size={12} /> Upload OG Image
                      </button>
                      <p className="text-xs" style={{ color: "var(--text-muted)" }}>PNG or JPG. 1200x630px recommended for social sharing.</p>
                    </div>
                  </div>
                </div>

                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#4597b0] text-white text-sm font-medium hover:bg-[#3a87a0] transition-all">
                  <Save size={14} /> Save Metadata
                </button>
              </div>
            </div>
          )}

          {/* ── Team Management ── */}
          {activeTab === "team" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold" style={{ color: "var(--text-primary)" }}>Team Management</h2>
                <span className="text-xs px-2 py-1 rounded" style={{ background: "var(--bg-input)", color: "var(--text-muted)" }}>
                  {DEMO_TEAM.length} members
                </span>
              </div>

              {/* Invite form */}
              <div className="p-4 rounded-lg space-y-3" style={{ background: "var(--bg-input)", border: "1px solid var(--border-primary)" }}>
                <p className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>Invite a new member</p>
                <div className="flex gap-2">
                  <div className="flex-1 flex items-center gap-2">
                    <Mail size={14} style={{ color: "var(--text-muted)" }} />
                    <input
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      placeholder="email@company.com"
                      className="flex-1 px-3 py-2 rounded-lg text-sm app-input"
                    />
                  </div>
                  <select
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value)}
                    className="px-3 py-2 rounded-lg text-sm app-input"
                  >
                    <option>Admin</option>
                    <option>Editor</option>
                    <option>Viewer</option>
                  </select>
                  <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#4597b0] text-white text-sm font-medium hover:bg-[#3a87a0] transition-all">
                    <Plus size={14} /> Invite
                  </button>
                </div>
              </div>

              {/* Members list */}
              <div className="space-y-2">
                {DEMO_TEAM.map((m) => (
                  <div key={m.email} className="flex items-center justify-between p-3 rounded-lg" style={{ background: "var(--bg-input)" }}>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#4597b0] to-[#56b3f5] flex items-center justify-center text-white text-xs font-bold">
                        {m.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>{m.name}</p>
                          {m.status === "invited" && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: "rgba(240,180,41,0.15)", color: "#f0b429" }}>Pending</span>
                          )}
                        </div>
                        <p className="text-xs" style={{ color: "var(--text-muted)" }}>{m.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs" style={{ color: "var(--text-muted)" }}>Joined {m.joined}</span>
                      <span
                        className="flex items-center gap-1 text-xs px-2 py-1 rounded-md font-medium"
                        style={roleBadgeStyle(m.role)}
                      >
                        {roleIcon(m.role)} {m.role}
                      </span>
                      <button className="p-1 rounded hover:bg-red-500/10 transition-all" style={{ color: "var(--text-muted)" }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Permissions matrix */}
              <div>
                <h3 className="text-sm font-medium mb-3" style={{ color: "var(--text-secondary)" }}>Role Permissions</h3>
                <div className="rounded-lg overflow-hidden" style={{ border: "1px solid var(--border-primary)" }}>
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ background: "var(--bg-input)" }}>
                        <th className="text-left px-3 py-2 text-xs font-medium" style={{ color: "var(--text-muted)" }}>Action</th>
                        <th className="text-center px-3 py-2 text-xs font-medium" style={{ color: "#4597b0" }}>Admin</th>
                        <th className="text-center px-3 py-2 text-xs font-medium" style={{ color: "#f0b429" }}>Editor</th>
                        <th className="text-center px-3 py-2 text-xs font-medium" style={{ color: "var(--text-muted)" }}>Viewer</th>
                      </tr>
                    </thead>
                    <tbody>
                      {PERMISSIONS.map((p) => (
                        <tr key={p.action} style={{ borderTop: "1px solid var(--border-primary)" }}>
                          <td className="px-3 py-2 text-xs" style={{ color: "var(--text-secondary)" }}>{p.action}</td>
                          <td className="px-3 py-2 text-center">
                            {p.admin ? <Check size={14} className="inline text-[#4597b0]" /> : <span style={{ color: "var(--text-muted)" }}>—</span>}
                          </td>
                          <td className="px-3 py-2 text-center">
                            {p.editor ? <Check size={14} className="inline text-[#f0b429]" /> : <span style={{ color: "var(--text-muted)" }}>—</span>}
                          </td>
                          <td className="px-3 py-2 text-center">
                            {p.viewer ? <Check size={14} className="inline text-emerald-400" /> : <span style={{ color: "var(--text-muted)" }}>—</span>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ── API Keys & Tokens ── */}
          {activeTab === "api-keys" && (
            <div className="space-y-6">
              <h2 className="font-semibold" style={{ color: "var(--text-primary)" }}>API Keys & Tokens</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-xs block mb-1.5" style={{ color: "var(--text-muted)" }}>Anthropic API Key</label>
                  <div className="flex gap-2">
                    <input
                      type={showApiKey ? "text" : "password"}
                      defaultValue="sk-ant-api03-xK9mP2vL7nQ4wR8tY1uI..."
                      className="flex-1 px-3 py-2 rounded-lg text-sm app-input font-mono"
                    />
                    <button
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="px-3 py-2 rounded-lg text-sm"
                      style={{ background: "var(--bg-input)", border: "1px solid var(--border-primary)", color: "var(--text-tertiary)" }}
                    >
                      {showApiKey ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                  <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>Used for contradiction resolution and AI analysis. Leave blank to use the platform key.</p>
                </div>

                <div>
                  <label className="text-xs block mb-1.5" style={{ color: "var(--text-muted)" }}>Platform API Token</label>
                  <div className="flex gap-2">
                    <input
                      readOnly
                      value="aicarto_pk_live_7f8g9h2j3k4l5m6n7o8p9q0r"
                      className="flex-1 px-3 py-2 rounded-lg text-sm app-input font-mono"
                    />
                    <button
                      onClick={() => handleCopy("aicarto_pk_live_7f8g9h2j3k4l5m6n7o8p9q0r", setCopiedToken)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm"
                      style={{ background: "var(--bg-input)", border: "1px solid var(--border-primary)", color: "var(--text-tertiary)" }}
                    >
                      {copiedToken ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                      {copiedToken ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>Use this token to authenticate REST API requests.</p>
                </div>

                <div>
                  <label className="text-xs block mb-1.5" style={{ color: "var(--text-muted)" }}>Webhook URL</label>
                  <div className="flex gap-2">
                    <div className="flex-1 flex items-center gap-2">
                      <Link size={14} style={{ color: "var(--text-muted)" }} />
                      <input
                        readOnly
                        value="https://api.aicartograph.com/webhooks/evt_9x8y7z6w5v"
                        className="flex-1 px-3 py-2 rounded-lg text-sm app-input font-mono"
                      />
                    </div>
                    <button
                      onClick={() => handleCopy("https://api.aicartograph.com/webhooks/evt_9x8y7z6w5v", setCopiedWebhook)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm"
                      style={{ background: "var(--bg-input)", border: "1px solid var(--border-primary)", color: "var(--text-tertiary)" }}
                    >
                      {copiedWebhook ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    </button>
                  </div>
                  <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>Receive POST notifications for source updates, contradictions, and health alerts.</p>
                </div>

                <div>
                  <label className="text-xs block mb-3" style={{ color: "var(--text-muted)" }}>Rate Limits</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "Requests / min", value: "120", max: "200" },
                      { label: "Resolutions / hr", value: "45", max: "100" },
                      { label: "Ingestions / day", value: "87", max: "500" },
                    ].map((r) => (
                      <div key={r.label} className="p-3 rounded-lg" style={{ background: "var(--bg-input)" }}>
                        <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>{r.label}</p>
                        <div className="flex items-baseline gap-1">
                          <span className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>{r.value}</span>
                          <span className="text-xs" style={{ color: "var(--text-muted)" }}>/ {r.max}</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full mt-2" style={{ background: "var(--border-primary)" }}>
                          <div
                            className="h-full rounded-full bg-[#4597b0]"
                            style={{ width: `${(parseInt(r.value) / parseInt(r.max)) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#4597b0] text-white text-sm font-medium hover:bg-[#3a87a0] transition-all">
                    <Save size={14} /> Save Keys
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm" style={{ background: "var(--bg-input)", border: "1px solid var(--border-primary)", color: "var(--text-tertiary)" }}>
                    <RefreshCw size={14} /> Regenerate Token
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── Platform Settings ── */}
          {activeTab === "platform" && (
            <div className="space-y-6">
              <h2 className="font-semibold" style={{ color: "var(--text-primary)" }}>Platform Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-xs block mb-1.5" style={{ color: "var(--text-muted)" }}>Default Resolution Mode</label>
                  <select defaultValue="deep" className="w-full px-3 py-2 rounded-lg text-sm app-input">
                    <option value="quick">Quick - Fast heuristic resolution</option>
                    <option value="deep">Deep - Full AI-powered analysis</option>
                  </select>
                  <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>Controls the default mode when resolving contradictions.</p>
                </div>

                <div>
                  <label className="text-xs block mb-1.5" style={{ color: "var(--text-muted)" }}>Chunk Size (tokens)</label>
                  <input type="number" defaultValue={512} className="w-full px-3 py-2 rounded-lg text-sm app-input" />
                  <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>Size of text chunks during source ingestion. Smaller chunks improve precision; larger chunks preserve context.</p>
                </div>

                <div>
                  <label className="text-xs block mb-1.5" style={{ color: "var(--text-muted)" }}>Embedding Model</label>
                  <select className="w-full px-3 py-2 rounded-lg text-sm app-input">
                    <option>Voyage AI (voyage-3)</option>
                    <option>OpenAI (text-embedding-3-small)</option>
                    <option>OpenAI (text-embedding-3-large)</option>
                    <option>Cohere (embed-v3)</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg" style={{ background: "var(--bg-input)" }}>
                  <div className="flex items-center gap-3">
                    <Clock size={16} style={{ color: "var(--text-muted)" }} />
                    <div>
                      <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Session Timeout</p>
                      <p className="text-xs" style={{ color: "var(--text-muted)" }}>Auto-logout after inactivity</p>
                    </div>
                  </div>
                  <select defaultValue="60" className="px-3 py-1.5 rounded-lg text-sm app-input">
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="240">4 hours</option>
                    <option value="never">Never</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg" style={{ background: "var(--bg-input)" }}>
                  <div className="flex items-center gap-3">
                    <Shield size={16} style={{ color: "var(--text-muted)" }} />
                    <div>
                      <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Multi-Factor Authentication (MFA)</p>
                      <p className="text-xs" style={{ color: "var(--text-muted)" }}>Require TOTP verification for all team members</p>
                    </div>
                  </div>
                  <button onClick={() => setMfaEnabled(!mfaEnabled)}>
                    {mfaEnabled
                      ? <ToggleRight size={28} className="text-[#4597b0]" />
                      : <ToggleLeft size={28} style={{ color: "var(--text-muted)" }} />
                    }
                  </button>
                </div>

                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#4597b0] text-white text-sm font-medium hover:bg-[#3a87a0] transition-all">
                  <Save size={14} /> Save Settings
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
