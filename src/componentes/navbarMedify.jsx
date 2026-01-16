


"use client";

import { useEffect, useState } from "react";

// Navbar estilo Medify (similar a la referencia):
// - Fondo blanco con borde inferior
// - Logo a la izquierda
// - Links centrados (desktop)
// - Botón CTA a la derecha con ícono
// - Menú colapsable en móvil

export default function NavbarMedify() {
  const [open, setOpen] = useState(false);

  // Cierra el menú al pasar a desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const links = [
    { label: "Quiénes Somos", href: "#quienes-somos" },
    { label: "Marketplace", href: "#marketplace" },
    { label: "Socios", href: "#socios" },
    { label: "Planes", href: "#precios" },
    { label: "Contacto", href: "#contacto" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b border-slate-200">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="h-16 flex items-center justify-between gap-3">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-2 min-w-[140px]"
            aria-label="Ir al inicio"
          >
            {/* Reemplaza /logo-medify.svg por tu logo */}
            <img
              src="/medifylogo.png"
              alt="Medify"
              className="h-10 w-auto"
            />
          </a>

          {/* Links (desktop) */}
          <div className="hidden lg:flex flex-1 items-center justify-center">
            <ul className="flex items-center gap-8">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-base font-bold text-cyan-700 hover:text-slate-900 transition-all duration-200 ease-out transform hover:-translate-y-0.5 hover:scale-[1.04]"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA (desktop) */}
          <div className="hidden lg:flex items-center justify-end min-w-[220px]">
            <a
              href="#solicitar"
              className="inline-flex items-center gap-2 rounded-full border border-teal-300/70 bg-white px-4 py-2 text-[14px] font-semibold text-slate-700 shadow-sm hover:shadow transition-shadow hover:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/40"
            >
              <span className="grid place-items-center h-8 w-8 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                {/* Icono "i" dentro de círculo */}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M12 17V11"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M12 8.2H12.01"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span>Solicitar Información</span>
            </a>
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
          className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${
            open ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="pb-4">
            <ul className="flex flex-col gap-1 pt-2">
              {links.map((l) => (
                <li key={l.href}>
                  <a
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
                  </a>
                </li>
              ))}
            </ul>

            <div className="pt-3">
              <a
                href="#solicitar"
                onClick={() => setOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-teal-300/70 bg-white px-4 py-2.5 text-[14px] font-semibold text-slate-700 shadow-sm hover:shadow transition-shadow hover:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/40"
              >
                <span className="grid place-items-center h-8 w-8 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 17V11"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M12 8.2H12.01"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <span>Solicitar Información</span>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}