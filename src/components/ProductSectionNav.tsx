"use client";

import SectionNav from "./SectionNav";

const PRODUCT_SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "framework", label: "Framework" },
  { id: "integrations", label: "Integrations" },
  { id: "diagnostic", label: "Diagnostic" },
  { id: "differentiators", label: "Differentiators" },
  { id: "competitive", label: "Competitive" },
  { id: "agents", label: "Agents" },
];

export default function ProductSectionNav() {
  return <SectionNav sections={PRODUCT_SECTIONS} />;
}
