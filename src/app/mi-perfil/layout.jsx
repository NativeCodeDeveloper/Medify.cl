"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

/* Demo — cuando el backend esté listo viene de la sesión */
const DEMO_PRO = {
  nombre: "Dennis Beltrán",
  especialidad: "Psicóloga",
  plan: "Profesional",
  sitioWeb: "https://dennis-beltran.agendaclinicas.cl",
};

const NAV_MAIN = [
  {
    label: "Resumen",
    href: "/mi-perfil",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
  },
  {
    label: "Ver perfil público",
    href: "/marketplace",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
      </svg>
    ),
  },
];

export default function MiPerfilLayout({ children }) {
  const pathname = usePathname();
  const hasAgenda = !!DEMO_PRO.sitioWeb;

  return (
    <div className="flex min-h-screen bg-[#f5f5f7]">

      {/* ── Sidebar ── */}
      <aside className="w-[240px] flex-shrink-0 flex flex-col bg-[#1d1d1f] fixed top-0 left-0 bottom-0 z-50">

        {/* Logo */}
        <div className="px-5 pt-5 pb-4 border-b border-white/8">
          <Link href="/mi-perfil" className="flex items-center gap-2.5">
            <Image src="/logonavar.png" alt="Medify" width={90} height={24}
              className="h-6 w-auto object-contain" />
            <span className="font-semibold text-white/35 leading-none"
              style={{ fontSize: "9px", letterSpacing: "0.14em" }}>
              PROFESIONAL
            </span>
          </Link>
        </div>

        {/* Profile summary */}
        <div className="px-5 py-4 border-b border-white/8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#00C853]/20 flex items-center justify-center flex-shrink-0">
              <span className="font-semibold text-[#00C853]" style={{ fontSize: "13px" }}>
                {DEMO_PRO.nombre.charAt(0)}
              </span>
            </div>
            <div className="min-w-0">
              <p className="font-medium text-white truncate" style={{ fontSize: "13px" }}>
                {DEMO_PRO.nombre}
              </p>
              <p className="font-light truncate" style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>
                {DEMO_PRO.especialidad}
              </p>
            </div>
          </div>
          {/* Plan badge */}
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1"
            style={{ background: "rgba(0,200,83,0.12)", border: "1px solid rgba(0,200,83,0.2)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C853]" />
            <span className="font-medium text-[#00C853]" style={{ fontSize: "10px" }}>
              Plan {DEMO_PRO.plan}
            </span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-3 space-y-0.5">
          {NAV_MAIN.map((item) => {
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}
                target={item.external ? "_blank" : undefined}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-150 relative"
                style={{ background: active ? "rgba(0,200,83,0.12)" : "transparent", color: active ? "#00C853" : "rgba(255,255,255,0.55)" }}>
                <span style={{ color: active ? "#00C853" : "rgba(255,255,255,0.38)" }}>{item.icon}</span>
                <span style={{ fontSize: "13px", fontWeight: active ? 500 : 400 }}>{item.label}</span>
                {active && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full bg-[#00C853]" />}
              </Link>
            );
          })}

          {/* Divider */}
          <div className="my-2 border-t border-white/8" />

          {/* Agenda Clínica — activa o bloqueada */}
          {hasAgenda ? (
            <a href={DEMO_PRO.sitioWeb} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-150 group"
              style={{ background: "rgba(0,200,83,0.06)", border: "1px solid rgba(0,200,83,0.15)" }}>
              <svg className="w-4 h-4 text-[#00C853]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5" />
              </svg>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-[#00C853]" style={{ fontSize: "12px" }}>Agenda Clínica</p>
                <p style={{ fontSize: "10px", color: "rgba(0,200,83,0.6)" }}>Activa · Abrir →</p>
              </div>
            </a>
          ) : (
            <div className="flex items-center gap-3 rounded-xl px-3 py-2.5 cursor-not-allowed opacity-60"
              style={{ border: "1px dashed rgba(255,255,255,0.12)" }}
              title="Activa Agenda Clínica para desbloquear">
              <svg className="w-4 h-4" style={{ color: "rgba(255,255,255,0.3)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
              <div className="flex-1 min-w-0">
                <p className="font-medium" style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>Agenda Clínica</p>
                <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.2)" }}>Sin activar</p>
              </div>
            </div>
          )}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-white/8 space-y-2.5">
          <Link href="/acceso"
            className="flex items-center gap-2 text-white/30 hover:text-white/55 transition-colors"
            style={{ fontSize: "12px" }}>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
            Cerrar sesión
          </Link>
          <Link href="/"
            className="flex items-center gap-2 text-white/30 hover:text-white/55 transition-colors"
            style={{ fontSize: "12px" }}>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al sitio
          </Link>
        </div>
      </aside>

      <main className="flex-1 ml-[240px] min-h-screen">
        {children}
      </main>
    </div>
  );
}
