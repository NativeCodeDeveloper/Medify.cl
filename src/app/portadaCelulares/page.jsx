"use client";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["600", "700"], display: "swap" });

export default function PortadaCelulares() {
    return (
        <main>
            <section className="relative block md:hidden bg-white">
                {/* Hero banner (mantiene la imagen tal cual) */}
                <div className="relative w-full">
                    <div
                        className="h-56 sm:h-64 w-full bg-cover bg-center shadow-sm"
                        style={{ backgroundImage: "url('/personalsalud.png')" }}
                    />
                    {/* Overlay suave para que se vea más premium sin cambiar paleta */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-white/50" />
                </div>

                <div className="relative mx-auto w-full max-w-md px-5 sm:px-6 pb-10 pt-8 text-center">
                    {/* Columna izquierda: texto principal */}
                    <div className="space-y-4 sm:space-y-5">
                        <h1 className={`${spaceGrotesk.className} mx-auto max-w-[18ch] text-balance text-3xl sm:text-4xl font-bold tracking-tight leading-tight text-slate-900`}>
                            Menos desorden,{" "}
                            <span className="text-cyan-600">mejor atención.</span>
                        </h1>
                        <p className="mx-auto max-w-[30ch] text-sm sm:text-base font-semibold text-pretty leading-relaxed text-slate-600">
                            Gestiona tu consulta de forma profesional y ordenada.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
