"use client";
import { usePathname } from "next/navigation";
import NavbarMedify from "@/componentes/navbarMedify";
import Footer from "@/app/Footer/page";

export default function SiteWrapper({ children }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");

  if (isDashboard) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      <NavbarMedify />
      <main className="flex-1 premium-shell">
        {children}
      </main>
      <Footer />
    </div>
  );
}
