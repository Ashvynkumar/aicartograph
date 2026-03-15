import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "See how aiCartograph resolves knowledge in practice — from question to resolution in seconds. Real scenarios, real results.",
};

export default function HowItWorksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
