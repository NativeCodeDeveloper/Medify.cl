import { Space_Grotesk, Michroma } from "next/font/google";
import Image from "next/image";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["600", "700"], display: "swap" });
const michroma = Michroma({ subsets: ["latin"], weight: "400", display: "swap" });

export default function PortadaCelulares() {
    return (
        <main>
            <section className="relative block md:hidden bg-white">
                {/* Hero banner (mantiene la imagen tal cual) */}
                <div className="relative w-full">
                    <div
                        className="h-56 w-full bg-cover bg-center shadow-sm"
                        style={{ backgroundImage: "url('/personalsalud.png')" }}
                    />
                    {/* Overlay suave para que se vea más premium sin cambiar paleta */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-white/50" />
                </div>

                <div className="relative mx-auto w-full max-w-md px-6 pb-10 pt-8 text-center">
                    {/* Columna izquierda: texto principal */}
                    <div className="space-y-4">


                        <h1 className={`${spaceGrotesk.className} mx-auto max-w-[22ch] text-balance text-4xl font-bold tracking-tight text-slate-900`}>
                            Menos desorden,
                        </h1>
                        <br />
                        <h1 className={`${spaceGrotesk.className} -mt-10 mx-auto max-w-[22ch] text-balance text-3xl font-extrabold tracking-tight text-cyan-600 `}>
                            Mejor atención.
                        </h1>
                        <br />
                        <p className="mx-auto text-base font-bold text-pretty  leading-relaxed text-slate-600">
                            Gestiona tu consulta de forma profesional y ordenada.
                        </p>

                        {/* <div className="mt-6 flex flex-col items-center gap-3">
                            <a href="#"
                                className="inline-flex w-100 h-10 items-center justify-center rounded-xl border border-cyan-600 bg-white px-6 py-3.5 text-base font-semibold text-cyan-700 shadow-sm transition hover:bg-cyan-50 hover:shadow-md active:scale-[0.995] focus:outline-none focus:ring-2 focus:ring-cyan-500/30">
                                Comienza
                            </a>

                            <p className="text-xs leading-relaxed text-slate-500">
                                Sin complicaciones • Configuración rápida • Soporte incluido
                            </p>
                        </div> */}

                        {/* Logo para móviles (visible solo en <md), con texto junto al logo */}
                        <div className="hidden md:hidden" />
                    </div>

                    {/* Columna derecha: logo con fondo translúcido que cubre las letras (visible en md+) */}
                    <div className="hidden md:flex items-center justify-end">
                        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 lg:p-8 shadow-xl overflow-hidden">
                            <div className="flex items-center gap-4 lg:gap-6">
                                {/* texto responsive en escritorio */}
                                {/* logo responsive: controlar anchura con clases */}

                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </main>
    );
}