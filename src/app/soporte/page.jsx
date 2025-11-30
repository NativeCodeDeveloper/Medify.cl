"use client";
import Stepper, { Step } from "@/componentes/Stepper";
import Aurora from "@/componentes/Aurora";
import BotonMui from "@/componentes/BotonMui";
import Image from "next/image";

export default function () {
  return (
    <div>
      <div>
        <Aurora />
      </div>

      <div
        className="
          relative overflow-hidden
          bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]
          ring-1 ring-white/10 rounded-4xl shadow-2xl backdrop-blur-sm
          grid grid-cols-1 md:grid-cols-3 justify-items-center gap-10 md:gap-14
          px-6 md:px-10 lg:px-14 py-16 md:py-24
        "
      >
        <div className="absolute inset-0 bg-black/35" aria-hidden="true"></div>

        {/* Columna izquierda: texto e información de contacto */}
        <div className="relative col-span-2 w-full space-y-8">
          <header>
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
              Desarrollo y Soporte
            </h2>
            <p className="mt-4 text-base md:text-lg text-white/85">
              Aquí encontrarás asistencia rápida y personalizada para resolver cualquier duda o problema.
              Estamos disponibles para ayudarte a poner en marcha y mantener tu proyecto con la mejor experiencia.
            </p>
          </header>

          {/* Tarjetas de contacto */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* WhatsApp */}
            <div className="rounded-3xl ring-1 ring-white/10 bg-white/5 backdrop-blur-md p-6 shadow-xl transition hover:scale-105 hover:ring-white/20">
              <h4 className="text-white font-semibold tracking-tight">WhatsApp</h4>
              <p className="mt-1 text-white/80">+56 9 7788 9900</p>
              <a
                href="https://wa.me/56977889900?text=Hola,%20necesito%20soporte%20técnico%20para%20Medify"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center rounded-xl px-4 py-2 bg-gradient-to-r from-cyan-400 to-purple-500 text-white font-semibold shadow hover:opacity-90 transition"
              >
                Escribir por WhatsApp
              </a>
            </div>

            {/* Correo */}
            <div className="rounded-3xl ring-1 ring-white/10 bg-white/5 backdrop-blur-md p-6 shadow-xl transition hover:scale-105 hover:ring-white/20">
              <h4 className="text-white font-semibold tracking-tight">Correo electrónico</h4>
              <p className="mt-1 text-white/80">soporte@medify.healthcare</p>
              <a
                href="mailto:soporte@medify.healthcare"
                className="mt-3 inline-flex items-center rounded-xl px-4 py-2 bg-gradient-to-r from-blue-500 to-teal-600 text-white font-semibold shadow hover:opacity-90 transition"
              >
                Escribir por correo
              </a>
            </div>
          </div>

          {/* Mensaje motivacional */}
          <div className="rounded-3xl ring-1 ring-white/10 bg-white/5 backdrop-blur-md p-6 shadow-xl transition hover:scale-105 hover:ring-white/20">
            <p className="text-lg md:text-xl text-white/90 font-medium text-center">
              ¿Listo para llevar tu proyecto al siguiente nivel? Diseñamos, construimos y te acompañamos
              con soporte continuo para que tu plataforma sea rápida, segura y escalable.
            </p>
          </div>
        </div>

        {/* Columna derecha: portada1 enmarcada */}
        <div className="relative md:justify-self-start w-full max-w-sm">
          <div className="absolute -inset-8 rounded-3xl bg-gradient-to-tr from-purple-600/30 via-fuchsia-500/20 to-cyan-400/30 blur-3xl" aria-hidden="true"></div>
          <div className="relative rounded-3xl ring-1 ring-white/10 bg-white/5 backdrop-blur-md p-4 shadow-2xl transition hover:scale-105">
            <Image
              alt="Portada del servicio"
              src={"/circular.jpg"}
              height={700}
              width={500}
              className="rounded-2xl w-full h-auto object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
