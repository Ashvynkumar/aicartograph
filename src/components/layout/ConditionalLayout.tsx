"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import QueryAgent from "../sections/QueryAgent";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAppRoute = pathname.startsWith("/app");
  const isAuthRoute = pathname.startsWith("/auth");
  const showMarketingLayout = !isAppRoute && !isAuthRoute;

  return (
    <>
      {showMarketingLayout && <Navbar />}
      <main className={showMarketingLayout ? "min-h-screen" : ""}>{children}</main>
      {showMarketingLayout && <Footer />}
      {showMarketingLayout && <QueryAgent />}
    </>
  );
}
