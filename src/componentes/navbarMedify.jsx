"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const LINKS = [
  { label: "Buscar especialista", href: "/marketplace" },
  { label: "Para profesionales", href: "/precios" },
  { label: "Cómo funciona", href: "/comoFunciona" },
  { label: "Nosotros", href: "/sobreNosotros" },
  { label: "Contacto", href: "/contacto" },
];

export default function NavbarMedify() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 44);
    const onResize = () => { if (window.innerWidth >= 1024) setOpen(false); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
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

        {/* Links desktop — Apple usa 14px, no bold */}
        <ul className="hidden lg:flex items-center gap-6">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="transition-colors duration-150"
                style={{
                  fontSize: "14px",
                  fontWeight: 400,
                  color: scrolled ? "#1d1d1f" : "rgba(255,255,255,0.85)",
                  letterSpacing: "-0.01em",
                }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA desktop */}
        <div className="hidden lg:flex items-center">
          <Link
            href="/unirse"
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
          </Link>
        </div>

        {/* Hamburger mobile */}
        <button
          type="button"
          className="lg:hidden inline-flex items-center justify-center h-8 w-8 rounded"
          style={{ color: scrolled ? "#1d1d1f" : "rgba(255,255,255,0.85)" }}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${
          open ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{
          background: "rgba(251,251,253,0.95)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        <div className="max-w-[980px] mx-auto px-6 py-4">
          <ul className="flex flex-col divide-y divide-[#d2d2d7]">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-3.5 text-[#1d1d1f]"
                  style={{ fontSize: "17px", fontWeight: 400 }}
                >
                  <span>{l.label}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M9 6l6 6-6 6" stroke="#6e6e73" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
          <div className="pt-4">
            <Link
              href="/unirse"
              onClick={() => setOpen(false)}
              className="block w-full text-center rounded-full py-3 text-white transition-colors"
              style={{ fontSize: "17px", fontWeight: 400, background: "#00C853" }}
            >
              Unirse a Medify
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
