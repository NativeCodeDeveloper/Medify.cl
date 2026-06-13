"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function NavbarMedify() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 44);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className="sticky top-0 z-50 w-full transition-all duration-300"
      style={{
        height: "44px",
        background: scrolled
          ? "rgba(251,251,253,0.8)"
          : "rgba(22,22,23,0.8)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,0.12)" : "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <nav
        className="mx-auto h-full flex items-center justify-between"
        style={{ maxWidth: "980px", padding: "0 22px" }}
      >

        {/* Logo */}
        <Link href="/" aria-label="Medify" className="flex items-center flex-shrink-0">
          <Image
            src="/logonavar.png"
            alt="Medify"
            width={80}
            height={22}
            className="h-[28px] w-auto object-contain"
            priority
          />
        </Link>

        <div className="flex items-center">
          <a
            href="https://www.agendaclinicas.cl"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full transition-colors duration-150"
            style={{
              fontSize: "13px",
              fontWeight: 400,
              padding: "5px 14px",
              background: scrolled ? "#00C853" : "rgba(255,255,255,0.15)",
              color: "#ffffff",
              border: scrolled ? "none" : "1px solid rgba(255,255,255,0.2)",
            }}
          >
            Unirse
          </a>
        </div>
      </nav>
    </header>
  );
}
