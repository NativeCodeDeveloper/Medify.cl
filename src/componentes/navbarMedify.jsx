


"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

// Navbar estilo Medify (similar a la referencia):
// - Fondo blanco con borde inferior
// - Logo a la izquierda
// - Links centrados (desktop)
// - Botón CTA a la derecha con ícono
// - Menú colapsable en móvil

export default function NavbarMedify() {
  const [open, setOpen] = useState(false);
  const whatsappCtaUrl = "https://wa.me/56991749964?text=Hola,%20quiero%20información%20sobre%20Medify";

  // Cierra el menú al pasar a desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const links = [
    { label: "Quiénes Somos", href: "/sobreNosotros" },
    { label: "Marketplace", href: "/marketplace" },
    { label: "Planes", href: "/precios" },
    { label: "Cómo funciona", href: "/comoFunciona" },
    { label: "Contacto", href: "/contacto" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/75 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 border-b border-slate-200/50">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="h-16 flex items-center justify-between gap-3">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 min-w-[140px]"
            aria-label="Ir al inicio"
          >
            {/* Reemplaza /logo-medify.svg por tu logo */}
            <img
              src="/logomedifypng.png"
              alt="Medify"
              className="h-10 w-auto"
            />
          </Link>

          {/* Links (desktop) */}
          <div className="hidden lg:flex flex-1 items-center justify-center">
            <ul className="flex items-center gap-8">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-base font-bold text-cyan-700 hover:text-slate-900 transition-all duration-200 ease-out transform hover:-translate-y-0.5 hover:scale-[1.04]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA (desktop) */}
          <div className="hidden lg:flex items-center justify-end min-w-[220px]">
            <Link
              href={whatsappCtaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-teal-300/70 bg-white px-4 py-2 text-[14px] font-semibold text-slate-700 shadow-sm hover:shadow-md transition-all duration-200 hover:border-teal-400 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-teal-400/40"
              aria-label="Hablar con un asesor por WhatsApp"
            >
              
              <span>Solicitar información</span>
              <span className="grid place-items-center h-7 w-7 rounded-full bg-slate-100 text-slate-500 border border-slate-200 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </div>

          {/* Botón menú (móvil) */}
          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M4 7H20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M4 12H20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M4 17H20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Menú móvil */}
        <div
          className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${open ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <div className="pb-4">
            <ul className="flex flex-col gap-1 pt-2">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-xl px-3 py-2 text-[15px] font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                  >
                    <span>{l.label}</span>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      className="text-slate-400"
                    >
                      <path
                        d="M9 6L15 12L9 18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="pt-3">
              <Link
                href={whatsappCtaUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="group w-full inline-flex items-center justify-center gap-2 rounded-full border border-teal-300/70 bg-white px-4 py-2.5 text-[14px] font-semibold text-slate-700 shadow-sm hover:shadow-md transition-all duration-200 hover:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/40"
                aria-label="Hablar con un asesor por WhatsApp"
              >
                <span className="grid place-items-center h-8 w-8 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                  <MessageCircle className="h-4 w-4" />
                </span>
                <span>Hablar con un asesor</span>
                <span className="grid place-items-center h-7 w-7 rounded-full bg-slate-100 text-slate-500 border border-slate-200 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
