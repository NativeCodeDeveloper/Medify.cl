"use client"
import Stepper, { Step } from "@/componentes/Stepper"
import Aurora from "@/componentes/Aurora";
import Image from "next/image";

export default function Comprar(){
    return(
        <div className="min-h-screen w-full bg-white text-neutral-900 px-4 py-8">
                  <div>
                    <Aurora></Aurora>
                  </div>
                   <div>
                   </div>
<section className="relative overflow-hidden rounded-4xl shadow-2xl border border-neutral-200">
  <div className="relative px-6 md:px-10 lg:px-14 py-16 md:py-24">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
      {/* Columna izquierda: texto y datos */}
      <div className="space-y-8">
        <header>
          <h2 className="tituloResponsive leading-tight tracking-tight font-extrabold">
            <span className="bg-gradient-to-r from-[#4a8da7] to-[#2a5d77] bg-clip-text text-transparent">Contratación</span> y datos de transferencia
          </h2>
          <p className="mt-4 text-base md:text-lg text-white/85 leading-relaxed">
            Da el salto hoy mismo. Diseñamos y desarrollamos soluciones a la medida para que tu negocio crezca con tecnología de alto rendimiento. Nuestro equipo te acompaña desde la idea hasta la operación continua.
          </p>
        </header>

        {/* Tarjetas de datos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Empresa */}
          <div className="rounded-3xl ring-1 ring-white/10 bg-white/5 backdrop-blur-md p-6 shadow-xl transition hover:scale-105 hover:ring-white/20">
            <h3 className="text-lg font-semibold text-neutral-900 tracking-tight">Datos de la empresa</h3>
            <dl className="mt-3 space-y-2 text-sm md:text-base">
              <div className="flex justify-between items-center gap-4 border-b border-neutral-200 pb-2">
                <dt className="text-neutral-700">Nombre</dt>
                <dd className="text-neutral-900 text-right">Medify Healthcare Solutions</dd>
              </div>
              <div className="flex justify-between items-center gap-4 border-b border-neutral-200 pb-2">
                <dt className="text-neutral-700">RUT</dt>
                <dd className="text-neutral-900 text-right">77.845.123-7</dd>
              </div>
              <div className="flex justify-between items-center gap-4 border-b border-neutral-200 pb-2">
                <dt className="text-neutral-700">Teléfono</dt>
                <dd className="text-neutral-900 text-right">+56 9 6609 1038</dd>
              </div>
            </dl>
          </div>

          {/* Transferencia */}
          <div className="rounded-3xl ring-1 ring-white/10 bg-white/5 backdrop-blur-md p-6 shadow-xl transition hover:scale-105 hover:ring-white/20">
            <h3 className="text-lg font-semibold text-neutral-900 tracking-tight">Datos para transferencia</h3>
            <dl className="mt-3 space-y-2 text-sm md:text-base">
              <div className="flex justify-between items-center gap-4 border-b border-neutral-200 pb-2">
                <dt className="text-neutral-700">Banco</dt>
                <dd className="text-neutral-900 text-right">Banco BCI</dd>
              </div>
              <div className="flex justify-between items-center gap-4 border-b border-neutral-200 pb-2">
                <dt className="text-neutral-700">Tipo de cuenta</dt>
                <dd className="text-neutral-900 text-right">Cuenta Corriente</dd>
              </div>
              <div className="flex justify-between items-center gap-4 border-b border-neutral-200 pb-2">
                <dt className="text-neutral-700">N° de cuenta</dt>
                <dd className="text-neutral-900 text-right">1234567890</dd>
              </div>
              <div className="flex justify-between items-center gap-4 border-b border-neutral-200 pb-2">
                <dt className="text-neutral-700">Titular</dt>
                <dd className="text-neutral-900 text-right">Medify Healthcare Solutions</dd>
              </div>
              <div className="flex justify-between items-center gap-4 border-b border-neutral-200 pb-2">
                <dt className="text-neutral-700">Correo pagos</dt>
                <dd className="text-neutral-900 text-right">pagos@medify.cl</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Instrucciones */}
        <div className="rounded-3xl ring-1 ring-white/10 bg-white/5 backdrop-blur-md p-6 shadow-xl">
          <h3 className="text-lg font-semibold text-neutral-900 tracking-tight">Instrucciones</h3>
          <ul className="mt-3 list-disc list-inside text-sm md:text-base text-neutral-700 space-y-1.5">
            <li>En el asunto de la transferencia indica: <span className="text-neutral-900">Servicio + Nombre de tu institución médica</span>.</li>
            <li>Envía el comprobante a <span className="text-neutral-900">ventas@medify.cl</span> o al WhatsApp <span className="text-neutral-900">+56 9 7788 9900</span>.</li>
            <li>Te contactaremos para levantar requerimientos médicos y calendarizar la implementación.</li>
          </ul>
          <p className="mt-4 text-neutral-700 break-all">
            Correo de contacto: <span className="text-neutral-900">ventas@medify.cl</span>
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href="mailto:ventas@medify.cl" className="inline-flex items-center rounded-xl px-4 py-2 bg-gradient-to-r from-blue-500 to-teal-600 text-white font-semibold shadow hover:opacity-90 transition">Escribir por correo</a>
            <a href="https://wa.me/56977889900" target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-xl px-4 py-2 bg-gradient-to-r from-blue-500 to-teal-600 text-white font-semibold shadow hover:opacity-90 transition">Escribir por WhatsApp</a>
          </div>
        </div>
      </div>

      {/* Columna derecha: portada2 */}
      <div className="relative">
        <div className="absolute -inset-8 rounded-3xl bg-gradient-to-tr from-purple-600/30 via-fuchsia-500/20 to-cyan-400/30 blur-3xl" aria-hidden="true"></div>
        <div className="relative rounded-3xl ring-1 ring-white/10 bg-white/5 backdrop-blur-md p-4 shadow-2xl transition hover:scale-105">
          <Image
            src="/portada1.jpg"
            width={1200}
            height={1200}
            alt="Portada del servicio"
            className="w-full h-auto rounded-2xl object-cover"
            priority
          />
        </div>
      </div>
    </div>
  </div>
</section>

        </div>
    )
}