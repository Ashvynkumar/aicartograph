"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h2 className="text-xl font-semibold text-[#FDFFFF] mb-2">
          Something went wrong
        </h2>
        <p className="text-brand-300 text-sm mb-6">
          We hit an unexpected issue loading this page.
        </p>
        <button
          onClick={() => reset()}
          className="px-5 py-2.5 rounded-lg bg-brand-500 text-white text-sm font-medium hover:bg-brand-400 transition-colors cursor-pointer"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
