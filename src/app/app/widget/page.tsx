"use client";

import { useState } from "react";
import {
  Layout, Palette, MessageSquare, Copy, Check, Code,
  Monitor, Smartphone, X, Sparkles, Send,
} from "lucide-react";

export default function WidgetPage() {
  const [accentColor, setAccentColor] = useState("#4597b0");
  const [welcomeMsg, setWelcomeMsg] = useState("Hi! Ask me anything about our product.");
  const [position, setPosition] = useState<"bottom-right" | "bottom-left" | "full-page">("bottom-right");
  const [copied, setCopied] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(true);
  const [devicePreview, setDevicePreview] = useState<"desktop" | "mobile">("desktop");

  const embedCode = `<script src="https://cdn.aicartograph.com/widget.js"></script>
<script>
  aiCartograph.init({
    apiKey: "YOUR_API_KEY",
    accentColor: "${accentColor}",
    position: "${position}",
    welcomeMessage: "${welcomeMsg}",
    suggestedQuestions: [
      "How do I get started?",
      "What features are available?",
      "How does pricing work?"
    ]
  });
</script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-white text-xl font-bold font-serif">Widget Designer</h1>
        <p className="text-white/40 text-sm mt-1">Design and customize your embeddable resolution widget</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customization Panel */}
        <div className="space-y-4">
          <div className="bg-[#223e49]/60 border border-white/5 rounded-xl p-5 space-y-4">
            <h3 className="text-white/80 text-sm font-semibold">Appearance</h3>
            <div>
              <label className="text-white/40 text-xs block mb-1.5">Accent Color</label>
              <div className="flex items-center gap-3">
                <input type="color" value={accentColor} onChange={(e) => setAccentColor(e.target.value)} className="w-10 h-10 rounded cursor-pointer bg-transparent border-0" />
                <input value={accentColor} onChange={(e) => setAccentColor(e.target.value)} className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm outline-none w-32" />
              </div>
            </div>
            <div>
              <label className="text-white/40 text-xs block mb-1.5">Welcome Message</label>
              <input value={welcomeMsg} onChange={(e) => setWelcomeMsg(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm outline-none" />
            </div>
            <div>
              <label className="text-white/40 text-xs block mb-1.5">Position</label>
              <div className="flex gap-2">
                {(["bottom-right", "bottom-left", "full-page"] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPosition(p)}
                    className={`px-3 py-1.5 rounded-lg text-xs ${position === p ? "bg-[#4597b0] text-white" : "bg-white/5 text-white/40 hover:bg-white/10"}`}
                  >
                    {p.split("-").map(w => w[0].toUpperCase() + w.slice(1)).join(" ")}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-white/40 text-xs block mb-1.5">Logo Upload</label>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/20">
                  <Palette size={18} />
                </div>
                <button className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/50 text-sm hover:bg-white/10">Upload</button>
              </div>
            </div>
          </div>

          {/* Embed Code */}
          <div className="bg-[#223e49]/60 border border-white/5 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-white/80 text-sm font-semibold flex items-center gap-2">
                <Code size={16} /> Embed Code
              </h3>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#4597b0]/10 text-[#4597b0] text-xs hover:bg-[#4597b0]/20"
              >
                {copied ? <Check size={12} /> : <Copy size={12} />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <pre className="bg-black/20 rounded-lg p-3 text-xs text-white/60 overflow-x-auto font-mono">
              {embedCode}
            </pre>
          </div>
        </div>

        {/* Live Preview */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-white/80 text-sm font-semibold">Live Preview</h3>
            <div className="flex gap-1 bg-white/5 rounded-lg p-0.5">
              <button onClick={() => setDevicePreview("desktop")} className={`p-1.5 rounded ${devicePreview === "desktop" ? "bg-white/10 text-white" : "text-white/30"}`}>
                <Monitor size={14} />
              </button>
              <button onClick={() => setDevicePreview("mobile")} className={`p-1.5 rounded ${devicePreview === "mobile" ? "bg-white/10 text-white" : "text-white/30"}`}>
                <Smartphone size={14} />
              </button>
            </div>
          </div>

          {/* Mock Site with Widget */}
          <div className={`bg-white rounded-xl overflow-hidden border border-white/10 ${devicePreview === "mobile" ? "max-w-[375px] mx-auto" : ""}`}>
            {/* Mock site header */}
            <div className="bg-gray-100 px-4 py-3 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
              <div className="flex-1 bg-white rounded px-3 py-1 text-xs text-gray-400">yourproduct.com</div>
            </div>

            {/* Mock site content */}
            <div className="relative h-96 bg-gray-50 p-6">
              <div className="space-y-3">
                <div className="h-6 w-48 bg-gray-200 rounded" />
                <div className="h-4 w-full bg-gray-100 rounded" />
                <div className="h-4 w-3/4 bg-gray-100 rounded" />
                <div className="h-4 w-5/6 bg-gray-100 rounded" />
                <div className="mt-4 h-32 w-full bg-gray-100 rounded-lg" />
              </div>

              {/* Widget */}
              {previewOpen ? (
                <div className={`absolute bottom-4 ${position === "bottom-left" ? "left-4" : "right-4"} w-72 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden`}>
                  <div className="px-4 py-3 flex items-center justify-between" style={{ backgroundColor: accentColor }}>
                    <div className="flex items-center gap-2">
                      <Sparkles size={16} className="text-white" />
                      <span className="text-white text-sm font-medium">Ask us anything</span>
                    </div>
                    <button onClick={() => setPreviewOpen(false)}>
                      <X size={16} className="text-white/70" />
                    </button>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-gray-600 text-xs">{welcomeMsg}</p>
                    </div>
                    <div className="space-y-2">
                      {["How do I get started?", "What features are available?"].map((q) => (
                        <button key={q} className="w-full text-left px-3 py-2 rounded-lg border border-gray-200 text-gray-500 text-xs hover:bg-gray-50">
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="border-t border-gray-100 p-3 flex items-center gap-2">
                    <input placeholder="Type your question..." className="flex-1 text-xs text-gray-600 outline-none bg-transparent" />
                    <button className="p-1.5 rounded-lg" style={{ backgroundColor: accentColor }}>
                      <Send size={12} className="text-white" />
                    </button>
                  </div>
                  <div className="text-center py-1.5 border-t border-gray-100">
                    <span className="text-gray-300 text-[9px]">Powered by aiCartograph</span>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setPreviewOpen(true)}
                  className={`absolute bottom-4 ${position === "bottom-left" ? "left-4" : "right-4"} w-12 h-12 rounded-full shadow-lg flex items-center justify-center`}
                  style={{ backgroundColor: accentColor }}
                >
                  <MessageSquare size={20} className="text-white" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
