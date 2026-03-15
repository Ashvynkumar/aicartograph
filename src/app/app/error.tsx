"use client";

import Link from "next/link";

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h2 className="text-xl font-semibold mb-2" style={{ color: "var(--text-primary, #FDFFFF)" }}>
          Something went wrong
        </h2>
        <p className="text-sm mb-6" style={{ color: "var(--text-secondary, #97c1cc)" }}>
          This section encountered an error. You can try again or head back to the dashboard.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="px-5 py-2.5 rounded-lg bg-brand-500 text-white text-sm font-medium hover:bg-brand-400 transition-colors cursor-pointer"
          >
            Try again
          </button>
          <Link
            href="/app/dashboard"
            className="px-5 py-2.5 rounded-lg border border-white/10 text-sm font-medium hover:bg-white/5 transition-colors"
            style={{ color: "var(--text-primary, #FDFFFF)" }}
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
