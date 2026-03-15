"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, UserPlus } from "lucide-react";

/* ── Canvas: Cartograph convergence — scattered source nodes with curved
     paths converging to a central point, mirroring the compass logo ── */
function ConvergenceCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const palette = [
      "rgba(69,151,176,",
      "rgba(98,172,187,",
      "rgba(151,193,204,",
      "rgba(73,129,141,",
      "rgba(54,192,142,",
      "rgba(155,140,232,",
    ];

    interface SourceNode {
      homeX: number;
      homeY: number;
      radius: number;
      pulseSpeed: number;
      phase: number;
      color: string;
      driftRadius: number;
      driftSpeed: number;
      cpOffsetX: number;
      cpOffsetY: number;
      pathPulseSpeed: number;
      pathPulsePhase: number;
    }

    const sourceNodes: SourceNode[] = [];
    const nodeCount = 32;

    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
      const dist = 0.25 + Math.random() * 0.3;
      sourceNodes.push({
        homeX: 0.5 + Math.cos(angle) * dist,
        homeY: 0.5 + Math.sin(angle) * dist,
        radius: 1.5 + Math.random() * 2.5,
        pulseSpeed: 0.4 + Math.random() * 1.2,
        phase: Math.random() * Math.PI * 2,
        color: palette[Math.floor(Math.random() * palette.length)],
        driftRadius: 8 + Math.random() * 15,
        driftSpeed: 0.2 + Math.random() * 0.4,
        cpOffsetX: (Math.random() - 0.5) * 0.3,
        cpOffsetY: (Math.random() - 0.5) * 0.3,
        pathPulseSpeed: 0.3 + Math.random() * 0.5,
        pathPulsePhase: Math.random() * Math.PI * 2,
      });
    }

    const centerX = 0.5;
    const centerY = 0.5;

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      t += 0.003;

      const cx = centerX * w;
      const cy = centerY * h;

      const centralGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(w, h) * 0.25);
      centralGlow.addColorStop(0, "rgba(69,151,176,0.06)");
      centralGlow.addColorStop(0.5, "rgba(69,151,176,0.02)");
      centralGlow.addColorStop(1, "rgba(69,151,176,0)");
      ctx.fillStyle = centralGlow;
      ctx.fillRect(0, 0, w, h);

      for (const node of sourceNodes) {
        const pulse = Math.sin(t * node.pulseSpeed * 2 + node.phase);
        const nx = node.homeX * w + Math.sin(t * node.driftSpeed + node.phase) * node.driftRadius;
        const ny = node.homeY * h + Math.cos(t * node.driftSpeed * 0.7 + node.phase) * node.driftRadius;
        const cpx = cx + node.cpOffsetX * w;
        const cpy = cy + node.cpOffsetY * h;

        const pathAlpha = 0.04 + pulse * 0.015;
        ctx.beginPath();
        ctx.strokeStyle = node.color + pathAlpha.toFixed(3) + ")";
        ctx.lineWidth = 0.6;
        ctx.moveTo(nx, ny);
        ctx.quadraticCurveTo(cpx, cpy, cx, cy);
        ctx.stroke();

        const pathT = (Math.sin(t * node.pathPulseSpeed + node.pathPulsePhase) + 1) / 2;
        const ptx = (1 - pathT) * (1 - pathT) * nx + 2 * (1 - pathT) * pathT * cpx + pathT * pathT * cx;
        const pty = (1 - pathT) * (1 - pathT) * ny + 2 * (1 - pathT) * pathT * cpy + pathT * pathT * cy;
        const pulseGlow = ctx.createRadialGradient(ptx, pty, 0, ptx, pty, 8);
        pulseGlow.addColorStop(0, node.color + "0.12)");
        pulseGlow.addColorStop(1, node.color + "0)");
        ctx.fillStyle = pulseGlow;
        ctx.beginPath();
        ctx.arc(ptx, pty, 8, 0, Math.PI * 2);
        ctx.fill();

        const nodeOpacity = 0.12 + pulse * 0.08;
        const r = node.radius + pulse * 1;
        const nodeGlow = ctx.createRadialGradient(nx, ny, 0, nx, ny, r * 5);
        nodeGlow.addColorStop(0, node.color + (nodeOpacity * 0.4).toFixed(3) + ")");
        nodeGlow.addColorStop(1, node.color + "0)");
        ctx.fillStyle = nodeGlow;
        ctx.beginPath();
        ctx.arc(nx, ny, r * 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = node.color + nodeOpacity.toFixed(3) + ")";
        ctx.beginPath();
        ctx.arc(nx, ny, r, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let i = 0; i < sourceNodes.length; i++) {
        for (let j = i + 1; j < sourceNodes.length; j++) {
          const a = sourceNodes[i];
          const b = sourceNodes[j];
          const ax = a.homeX * w + Math.sin(t * a.driftSpeed + a.phase) * a.driftRadius;
          const ay = a.homeY * h + Math.cos(t * a.driftSpeed * 0.7 + a.phase) * a.driftRadius;
          const bx = b.homeX * w + Math.sin(t * b.driftSpeed + b.phase) * b.driftRadius;
          const by = b.homeY * h + Math.cos(t * b.driftSpeed * 0.7 + b.phase) * b.driftRadius;
          const dx = ax - bx;
          const dy = ay - by;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const threshold = Math.min(w, h) * 0.12;
          if (dist < threshold) {
            const alpha = (1 - dist / threshold) * 0.04;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(69,151,176,${alpha.toFixed(3)})`;
            ctx.lineWidth = 0.4;
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.stroke();
          }
        }
      }

      animFrame = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "", company: "", role: "Admin" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    setLoading(true);
    document.cookie = "aicarto_auth=authenticated; path=/; max-age=86400; samesite=lax";
    setTimeout(() => router.push("/app/dashboard"), 500);
  };

  return (
    <div className="min-h-screen bg-[#040a0d] flex items-center justify-center px-4 relative overflow-hidden">
      <ConvergenceCanvas />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 20%, rgba(4,10,13,0.6) 70%, rgba(4,10,13,0.85) 100%)",
        }}
      />

      <div
        className={`relative w-full max-w-md transition-all duration-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="bg-[#0c1f27]/80 backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-8 shadow-2xl shadow-black/40">
          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto mb-4 animate-float">
              <Image
                src="/aiCartograph_icon_final.svg"
                alt="aiCartograph"
                width={56}
                height={56}
                className="w-14 h-14"
              />
            </div>
            <h1 className="text-white text-2xl font-bold font-serif">Create your account</h1>
            <p className="text-white/40 text-sm mt-1">Start resolving knowledge in minutes</p>
          </div>

          <div className="space-y-2 mb-6">
            <button
              onClick={() => {
                document.cookie = "aicarto_auth=authenticated; path=/; max-age=86400; samesite=lax";
                router.push("/app/dashboard");
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white/70 text-sm hover:bg-white/[0.08] hover:border-white/[0.12] transition-all"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Sign up with Google
            </button>
            <button
              onClick={() => {
                document.cookie = "aicarto_auth=authenticated; path=/; max-age=86400; samesite=lax";
                router.push("/app/dashboard");
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white/70 text-sm hover:bg-white/[0.08] hover:border-white/[0.12] transition-all"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z"/></svg>
              Sign up with Microsoft
            </button>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-white/[0.08]" />
            <span className="text-white/25 text-xs">or continue with email</span>
            <div className="flex-1 h-px bg-white/[0.08]" />
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-white/40 text-xs block mb-1.5">Company Name</label>
                <input
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Acme Inc."
                  required
                  className="w-full px-3 py-2.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-sm outline-none placeholder:text-white/20 focus:border-[#4597b0]/50 transition-colors"
                />
              </div>
              <div>
                <label className="text-white/40 text-xs block mb-1.5">Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white/70 text-sm outline-none"
                >
                  <option>Admin</option>
                  <option>Manager</option>
                  <option>Team Lead</option>
                  <option>Individual Contributor</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-white/40 text-xs block mb-1.5">Work Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@company.com"
                required
                className="w-full px-3 py-2.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-sm outline-none placeholder:text-white/20 focus:border-[#4597b0]/50 transition-colors"
              />
            </div>
            <div>
              <label className="text-white/40 text-xs block mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="8+ characters"
                  required
                  minLength={8}
                  className="w-full px-3 py-2.5 pr-10 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-sm outline-none placeholder:text-white/20 focus:border-[#4597b0]/50 transition-colors"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-1 rounded border-white/20 bg-white/5" />
              <span className="text-white/40 text-xs">
                I agree to the{" "}
                <span className="text-[#4597b0]">Terms of Service</span> and{" "}
                <span className="text-[#4597b0]">Privacy Policy</span>
              </span>
            </label>

            <button
              type="submit"
              disabled={loading || !agreed}
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-[#4597b0] to-[#62acbb] text-white text-sm font-medium hover:shadow-lg hover:shadow-[#4597b0]/20 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
              ) : (
                <>
                  <UserPlus size={16} /> Create Account
                </>
              )}
            </button>
          </form>

          <p className="text-center text-white/30 text-xs mt-6">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-[#4597b0] hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
