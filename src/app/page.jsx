"use client";
import { Inter } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import Portada from "./portada/page";
import ComoFunciona from "./comoFunciona/page";
import FadeInSection from "../componentes/FadeInSection";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

/* ─── Data ─────────────────────────────────────────────────────────── */
const PATIENT_FEATURES = [
  {
    title: "Perfiles verificados",
    desc: "Cada profesional en Medify tiene credenciales validadas. Elige con confianza.",
    icon: (
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Agenda en minutos",
    desc: "Reserva directamente desde el perfil del especialista. Sin llamadas, sin esperas.",
    icon: (
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5" />
      </svg>
    ),
  },
  {
    title: "En todo Chile",
    desc: "Presencial o telemedicina. Más de 15 especialidades. Donde estés.",
    icon: (
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
];

const PRO_BENEFITS = [
  {
    title: "Tus pacientes ya te están buscando",
    desc: "Miles de personas en Chile buscan profesionales de salud verificados. En Red Medify, te encuentran a ti.",
  },
  {
    title: "Formas parte de algo real",
    desc: "No entras a un directorio vacío. Eres parte de una red de profesionales verificados que ya está funcionando.",
  },
  {
    title: "Herramientas para gestionar tu práctica",
    desc: "Desde tu perfil en Red Medify tienes acceso a todo lo que necesitas para organizar tu consulta digital.",
  },
  {
    title: "Tú pones el conocimiento, nosotros la infraestructura",
    desc: "Agenda, pacientes, pagos y visibilidad. Todo en un solo lugar para que te enfoques en atender.",
  },
];

const SPECIALTIES = [
  "Psicología",
  "Kinesiología",
  "Nutrición",
  "Medicina General",
  "Odontología",
  "Dermatología",
  "Pediatría",
  "Cardiología",
  "Fonoaudiología",
  "Terapia Ocupacional",
  "Oftalmología",
  "Geriatría",
];

const PROFESSIONALS_CAROUSEL = [
  {
    id: "dennis-beltran",
    nombre: "Dennis Beltrán",
    especialidad_principal: "Psicóloga",
    imagen_url: "/dennisbeltran.png",
    ubicacion: "Chillán",
  },
  {
    id: "marcelo-vilches",
    nombre: "Marcelo Vilches",
    especialidad_principal: "Tecnólogo Médico",
    imagen_url: "/marcelovilches.png",
    ubicacion: "Chillán",
  },
  {
    id: "cristian-becerra",
    nombre: "Cristian Becerra",
    especialidad_principal: "Medicina Complementaria",
    imagen_url: "/cristianbecerra.png",
    ubicacion: "Chillán",
  },
  {
    id: "dennis-beltran",
    nombre: "Dennis Beltrán",
    especialidad_principal: "Psicóloga",
    imagen_url: "/dennisbeltran.png",
    ubicacion: "Chillán",
  },
  {
    id: "marcelo-vilches",
    nombre: "Marcelo Vilches",
    especialidad_principal: "Tecnólogo Médico",
    imagen_url: "/marcelovilches.png",
    ubicacion: "Chillán",
  },
];

/* ─── Professionals infinite circular scroll ─────────────────────────── */
function ProfessionalsCarousel() {
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);

  // Triple del array para scroll infinito sin cortes
  const items = [
    ...PROFESSIONALS_CAROUSEL,
    ...PROFESSIONALS_CAROUSEL,
    ...PROFESSIONALS_CAROUSEL,
  ];

  // Centrar en el bloque del medio al inicio
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth / 3;
    }
  }, []);

  // Auto-scroll con requestAnimationFrame
  useEffect(() => {
    if (isPaused || !scrollRef.current) return;
    let animId;
    const tick = () => {
      if (!scrollRef.current || isPaused) return;
      scrollRef.current.scrollLeft += 0.6;
      const third = scrollRef.current.scrollWidth / 3;
      if (scrollRef.current.scrollLeft >= third * 2) {
        scrollRef.current.scrollLeft = third;
      }
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [isPaused]);

  // Drag handlers
  const onMouseDown = (e) => {
    setIsDragging(true);
    setIsPaused(true);
    dragStartX.current = e.pageX - scrollRef.current.offsetLeft;
    dragScrollLeft.current = scrollRef.current.scrollLeft;
    scrollRef.current.style.cursor = "grabbing";
  };
  const onMouseUp = () => {
    setIsDragging(false);
    setIsPaused(false);
    if (scrollRef.current) scrollRef.current.style.cursor = "grab";
  };
  const onMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    scrollRef.current.scrollLeft = dragScrollLeft.current - (x - dragStartX.current) * 1.2;
  };

  return (
    <div className="relative w-full">
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 z-10"
        style={{ background: "linear-gradient(to right, #ffffff 40%, transparent)" }} />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 z-10"
        style={{ background: "linear-gradient(to left, #ffffff 40%, transparent)" }} />

      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto select-none pb-2"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          cursor: "grab",
          WebkitOverflowScrolling: "touch",
        }}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onMouseMove={onMouseMove}
      >
        {items.map((pro, i) => (
          <Link
            key={i}
            href={`/marketplace/${pro.id}`}
            draggable={false}
            className="flex-shrink-0 flex flex-col items-center gap-2.5 group"
            style={{ width: "76px" }}
            onClick={(e) => {
              if (Math.abs(scrollRef.current.scrollLeft - dragScrollLeft.current) > 6)
                e.preventDefault();
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => !isDragging && setIsPaused(false)}
          >
            {/* Ring + circle */}
            <div
              className="relative rounded-full transition-transform duration-200 group-hover:scale-[1.06]"
              style={{
                width: "72px",
                height: "72px",
                padding: "2.5px",
                background: "linear-gradient(135deg, #00C853, #00e676)",
              }}
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-[#f5f5f7]"
                style={{ border: "2px solid #ffffff" }}>
                <Image
                  src={pro.imagen_url}
                  alt={pro.nombre}
                  width={68}
                  height={68}
                  className="w-full h-full object-cover object-top"
                  draggable={false}
                />
              </div>
            </div>

            {/* Name */}
            <p
              className="text-center leading-tight truncate w-full font-medium text-[#1d1d1f]"
              style={{ fontSize: "11px" }}
            >
              {pro.nombre.split(" ")[0]}
            </p>
          </Link>
        ))}
      </div>

      <p className="mt-2 text-center font-light text-[#6e6e73]" style={{ fontSize: "12px" }}>
        Profesionales verificados en Medify ·{" "}
        <Link href="/marketplace" className="text-[#00C853] hover:underline underline-offset-4">
          Ver todos
        </Link>
      </p>
    </div>
  );
}

const STATS = [
  { value: "+15", label: "Especialidades" },
  { value: "100%", label: "Profesionales verificados" },
  { value: "24/7", label: "Disponibilidad de agenda" },
  { value: "CL", label: "Cobertura nacional" },
];

/* ─── Component ─────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <div className={`${inter.className} min-h-screen w-full bg-white`}>

      {/* ── HERO ── */}
      <Portada />

      {/* ── INTRO — white ── */}
      <FadeInSection delay={0}>
        <section className="w-full bg-white px-6 py-[100px]">
          <div className="max-w-[800px] mx-auto text-center">
            <h2
              className="font-semibold text-[#1d1d1f] leading-[1.1] mb-5"
              style={{ fontSize: "clamp(2rem,4.5vw,3.2rem)", letterSpacing: "-0.025em" }}
            >
              La salud en Chile.
              <br />
              Digital, accesible, hoy.
            </h2>
            <p
              className="font-light text-[#6e6e73] leading-[1.65] max-w-[560px] mx-auto mb-10"
              style={{ fontSize: "clamp(1rem,1.8vw,1.2rem)" }}
            >
              Medify conecta pacientes con los mejores profesionales de la salud en todo el país.
              Agenda en minutos, sin llamadas, sin burocracia.
            </p>

            {/* Professionals carousel */}
            <div className="mb-10 -mx-2">
              <ProfessionalsCarousel />
            </div>

            <div className="flex items-center justify-center flex-wrap gap-4">
              <Link
                href="/marketplace"
                className="inline-flex items-center justify-center rounded-full bg-[#00C853] hover:bg-[#00b347] px-[22px] py-[12px] text-[17px] font-normal text-white transition-colors duration-150"
              >
                Buscar especialista
              </Link>
              <Link
                href="/precios"
                className="inline-flex items-center justify-center rounded-full bg-[#1d1d1f] hover:bg-[#000000] px-[22px] py-[12px] text-[17px] font-normal text-white transition-colors duration-150"
              >
                Soy profesional
              </Link>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* ── PARA PACIENTES — gris ── */}
      <FadeInSection delay={0.05}>
        <section className="w-full bg-[#f5f5f7] px-6 py-[100px]">
          <div className="max-w-[980px] mx-auto">
            <div className="mb-14">
              <p
                className="font-semibold text-[#6e6e73] uppercase mb-4"
                style={{ fontSize: "12px", letterSpacing: "0.08em" }}
              >
                Para pacientes
              </p>
              <h2
                className="font-semibold text-[#1d1d1f] leading-[1.1] mb-5"
                style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", letterSpacing: "-0.025em" }}
              >
                El especialista que necesitas, cerca de ti.
              </h2>
              <p className="text-[19px] font-light text-[#6e6e73] leading-[1.6] max-w-[540px] mb-6">
                Encuentra psicólogos, kinesiólogos, nutricionistas, médicos y más.
                Todos verificados. Reserva disponible en tiempo real.
              </p>
              <Link
                href="/marketplace"
                className="inline-flex items-center gap-1.5 text-[17px] text-[#00C853] hover:underline underline-offset-4 transition-all"
              >
                Buscar especialistas
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Feature cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {PATIENT_FEATURES.map((f) => (
                <div key={f.title} className="bg-white rounded-2xl p-8">
                  <div className="w-11 h-11 rounded-xl bg-[#f5f5f7] flex items-center justify-center mb-5 text-[#1d1d1f]">
                    {f.icon}
                  </div>
                  <h3
                    className="font-semibold text-[#1d1d1f] mb-3"
                    style={{ fontSize: "19px", letterSpacing: "-0.015em" }}
                  >
                    {f.title}
                  </h3>
                  <p className="text-[15px] font-light text-[#6e6e73] leading-[1.6]">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* ── ESPECIALIDADES — blanco ── */}
      <FadeInSection delay={0.05}>
        <section className="w-full bg-white px-6 py-[100px]">
          <div className="max-w-[980px] mx-auto">
            <div className="text-center mb-14">
              <p
                className="font-semibold text-[#6e6e73] uppercase mb-4"
                style={{ fontSize: "12px", letterSpacing: "0.08em" }}
              >
                Especialidades
              </p>
              <h2
                className="font-semibold text-[#1d1d1f] leading-[1.1]"
                style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", letterSpacing: "-0.025em" }}
              >
                Una especialidad para cada necesidad.
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {SPECIALTIES.map((s) => (
                <Link
                  key={s}
                  href="/marketplace"
                  className="group flex items-center justify-between rounded-2xl bg-[#f5f5f7] hover:bg-[#e8e8ed] px-5 py-4 transition-colors duration-150"
                >
                  <span
                    className="font-normal text-[#1d1d1f] group-hover:text-[#00C853] transition-colors"
                    style={{ fontSize: "15px" }}
                  >
                    {s}
                  </span>
                  <svg
                    className="w-4 h-4 text-[#6e6e73] group-hover:text-[#00C853] transition-colors flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* ── PARA PROFESIONALES — negro ── */}
      <FadeInSection delay={0.05}>
        <section className="w-full bg-[#000000] px-6 py-[100px]">
          <div className="max-w-[980px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

              {/* Left */}
              <div>
                <p
                  className="font-semibold uppercase mb-5"
                  style={{ fontSize: "12px", letterSpacing: "0.08em", color: "#00C853" }}
                >
                  Red Medify
                </p>
                <h2
                  className="font-semibold text-white leading-[1.1] mb-5"
                  style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", letterSpacing: "-0.025em" }}
                >
                  Forma parte de Red Medify.
                </h2>
                <p className="text-[19px] font-light leading-[1.6] mb-10" style={{ color: "#86868b" }}>
                  Una red de profesionales verificados donde los pacientes ya te están buscando.
                  Tú pones el conocimiento. Nosotros ponemos la infraestructura.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/unirse"
                    className="inline-flex items-center justify-center rounded-full bg-white hover:bg-[#f5f5f7] px-[22px] py-[12px] text-[17px] font-normal text-[#1d1d1f] transition-colors duration-150"
                  >
                    Unirme a Red Medify
                  </Link>
                  <Link
                    href="/comoFunciona"
                    className="inline-flex items-center justify-center gap-1.5 text-[17px] font-normal text-[#00C853] hover:underline underline-offset-4 transition-all py-[12px]"
                  >
                    Cómo funciona
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Right: benefits */}
              <div className="space-y-0 divide-y divide-white/8">
                {PRO_BENEFITS.map((b, i) => (
                  <div key={b.title} className="flex items-start gap-5 py-6 first:pt-0 last:pb-0">
                    <span
                      className="flex-shrink-0 font-semibold tabular-nums mt-0.5"
                      style={{ fontSize: "12px", color: "#6e6e73", letterSpacing: "0.04em" }}
                    >
                      0{i + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-white mb-1" style={{ fontSize: "17px", letterSpacing: "-0.01em" }}>
                        {b.title}
                      </p>
                      <p className="font-light leading-[1.6]" style={{ fontSize: "15px", color: "#86868b" }}>
                        {b.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* ── CÓMO FUNCIONA ── */}
      <FadeInSection delay={0.05}>
        <ComoFunciona />
      </FadeInSection>

      {/* ── STATS — gris ── */}
      <FadeInSection delay={0.05}>
        <section className="w-full bg-[#f5f5f7] px-6 py-[80px]">
          <div className="max-w-[980px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p
                  className="font-semibold text-[#1d1d1f] mb-2 leading-none"
                  style={{ fontSize: "clamp(2.2rem,5vw,3.5rem)", letterSpacing: "-0.04em" }}
                >
                  {s.value}
                </p>
                <p className="font-normal text-[#6e6e73]" style={{ fontSize: "14px" }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </section>
      </FadeInSection>

      {/* ── CTA FINAL — blanco ── */}
      <FadeInSection delay={0.05}>
        <section className="w-full bg-white px-6 py-[100px]">
          <div className="max-w-[700px] mx-auto text-center">
            <p
              className="font-semibold uppercase mb-5"
              style={{ fontSize: "12px", letterSpacing: "0.08em", color: "#00C853" }}
            >
              Para profesionales de la salud
            </p>
            <h2
              className="font-semibold text-[#1d1d1f] leading-[1.1] mb-5"
              style={{ fontSize: "clamp(2rem,4.5vw,3.2rem)", letterSpacing: "-0.025em" }}
            >
              Únete a la red donde tus pacientes ya te esperan.
            </h2>
            <p className="text-[19px] font-light text-[#6e6e73] leading-[1.6] mb-10">
              Red Medify ya está funcionando. Profesionales verificados, pacientes buscando especialistas en todo Chile.
              Hay un lugar para ti.
            </p>
            <div className="flex items-center justify-center flex-wrap gap-4">
              <Link
                href="/unirse"
                className="inline-flex items-center justify-center rounded-full bg-[#00C853] hover:bg-[#00b347] px-[22px] py-[12px] text-[17px] font-normal text-white transition-colors duration-150"
              >
                Unirme a Red Medify
              </Link>
              <a
                href="https://wa.me/56991749964?text=Hola,%20quiero%20información%20sobre%20Medify"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 text-[17px] text-[#00C853] hover:underline underline-offset-4 transition-all py-[12px]"
              >
                Hablar con un asesor
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* WhatsApp float */}
      <a
        href="https://wa.me/56991749964?text=Hola,%20quiero%20información%20sobre%20Medify"
        target="_blank"
        rel="noopener noreferrer"
        className="wsp-float-btn"
        aria-label="Contáctanos por WhatsApp"
      >
        <span className="wsp-icon-wrap">
          <svg className="wsp-icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
            <path fill="#ffffff" d="M20.52 3.48A11.94 11.94 0 0 0 12 .06 11.94 11.94 0 0 0 3.48 3.48C.51 6.46-.52 10.73.6 14.64L.03 23.97l9.33-.57a11.94 11.94 0 0 0 4.91 1.02h.01c3.19 0 6.2-1.24 8.46-3.5A11.94 11.94 0 0 0 24 12a11.94 11.94 0 0 0-3.48-8.52ZM12 21.5h-.01a9.9 9.9 0 0 1-4.45-1.05l-.32-.15-5.53.34.35-5.5-.15-.33A9.9 9.9 0 0 1 2.5 12 9.5 9.5 0 1 1 12 21.5Zm5.21-7.16c-.29-.15-1.7-.84-1.96-.94-.26-.1-.45-.15-.64.15-.19.29-.74.94-.91 1.13-.17.19-.34.21-.63.08-.29-.15-1.22-.45-2.33-1.45-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.08-.15-.64-1.55-.88-2.12-.23-.56-.47-.48-.64-.49l-.55-.01c-.19 0-.5.07-.77.36-.26.29-1.01.98-1.01 2.39 0 1.41 1.03 2.77 1.18 2.96.15.19 2.03 3.1 4.92 4.35.69.3 1.23.48 1.65.61.69.22 1.31.19 1.8.11.55-.08 1.7-.7 1.94-1.37.24-.67.24-1.25.17-1.37-.07-.12-.26-.19-.55-.34Z" />
          </svg>
        </span>
        <span className="wsp-text">Contáctanos</span>
      </a>
    </div>
  );
}
