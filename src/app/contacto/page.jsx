"use client";
import { Michroma, Space_Grotesk } from "next/font/google";
import { Link } from 'next-view-transitions';
const michroma = Michroma({ subsets: ["latin"], weight: "400", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap" });

export default function Contacto() {
  return (
    <div className="min-h-screen w-full bg-white text-neutral-800 px-4 py-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-24">
          <h1 className={`${spaceGrotesk.className} text-4xl md:text-6xl font-bold text-neutral-900 leading-tight tracking-tight`}>
            <span className="bg-gradient-to-r from-[#4a8da7] to-[#2a5d77] bg-clip-text text-transparent">
              Contacto
            </span>
          </h1>
          <p className={`mt-6 text-xl text-neutral-700 max-w-3xl mx-auto ${spaceGrotesk.className}`}>
            Conéctate con nuestro equipo especializado en soluciones Tegnologicas. 
            Estamos aquí para digitalizar tu práctica médica.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Información de Contacto */}
          <div className="space-y-8">
            <h2 className={`${spaceGrotesk.className} text-2xl text-neutral-800 mb-6 font-bold`}>
              Información de Contacto
            </h2>
            {/* Cards de contacto */}
            <div className="space-y-6">
              {/* WhatsApp Médico */}
              <div className="rounded-3xl ring-1 ring-neutral-200 bg-white p-6 shadow-xl transition hover:scale-105 hover:ring-[#4a8da7]/40">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-[#e6f3ff]">
                    <svg className="w-6 h-6 text-[#2563eb]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.488"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-neutral-900 font-semibold">WhatsApp</h3>
                      <p className="text-neutral-700">+56 9 7788 9900</p>
                      <a
                        href="https://wa.me/56977889900?text=Hola,%20me%20interesa%20conocer%20las%20soluciones%20médicas%20de%20Medify"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center mt-2 text-sm text-[#4a8da7] hover:text-[#357a96] transition"
                      >
                        Escribir mensaje
                      </a>
                    </div>
                  </div>
                </div>

                {/* Email de Ventas */}
                <div className="rounded-3xl ring-1 ring-neutral-200 bg-white p-6 shadow-xl transition hover:scale-105 hover:ring-[#4a8da7]/40">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-[#e6f3ff]">
                      <svg className="w-6 h-6 text-[#2563eb]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-neutral-900 font-semibold">Email Comercial</h3>
                      <p className="text-neutral-700">ventas@medify.cl</p>
                      <a
                        href="mailto:ventas@medify.healthcare?subject=Consulta%20sobre%20soluciones%20médicas"
                        className="inline-flex items-center mt-2 text-sm text-[#4a8da7] hover:text-[#357a96] transition"
                      >
                        Enviar email
                      </a>
                    </div>
                  </div>
                </div>

                {/* Soporte Técnico */}
                <div className="rounded-3xl ring-1 ring-neutral-200 bg-white p-6 shadow-xl transition hover:scale-105 hover:ring-[#4a8da7]/40">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-[#e6f3ff]">
                      <svg className="w-6 h-6 text-[#2563eb]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-neutral-900 font-semibold">Soporte Técnico</h3>
                      <p className="text-neutral-700">soporte@medify.cl</p>
                      <a
                        href="mailto:soporte@medify.healthcare?subject=Solicitud%20de%20soporte%20técnico"
                        className="inline-flex items-center mt-2 text-sm text-[#4a8da7] hover:text-[#357a96] transition"
                      >
                        Solicitar soporte
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Horarios */}
              <div className="rounded-3xl ring-1 ring-neutral-200 bg-white p-6 shadow-xl">
                <h3 className="text-neutral-900 font-semibold mb-4">Horarios de Atención</h3>
                <div className="space-y-2 text-neutral-700">
                  <div className="flex justify-between">
                    <span>Lunes - Viernes:</span>
                    <span>8:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sábados:</span>
                    <span>9:00 - 14:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Emergencias:</span>
                    <span>24/7</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulario de Contacto */}
            <div className="rounded-3xl ring-1 ring-white/10 bg-white/5 backdrop-blur-md p-8 shadow-xl">
              <h2 className={`${spaceGrotesk.className} text-2xl text-neutral-800 mb-6 font-bold`}>
                Solicitar información
              </h2>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-600/80 mb-2">
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-gray-200 text-neutral-800 placeholder-neutral-600/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                      placeholder="Dr. Juan Pérez"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-600/80 mb-2">
                      Especialidad
                    </label>
                    <select className="w-full px-4 py-3 rounded-xl bg-white/10 border border-gray-200 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition">
                      <option value="">Seleccionar especialidad</option>
                      <option value="medicina-general">Medicina General</option>
                      <option value="cardiologia">Terapeuta</option>
                      <option value="pediatria">Pediatría</option>
                      <option value="ginecologia">Ginecología</option>
                      <option value="traumatologia">Kinesiología</option>
                      <option value="psiquiatria">Psicología</option>
                      <option value="otros">Otros</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-600/80 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-gray-200 text-neutral-800 placeholder-neutral-600/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                      placeholder="doctor@clinica.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-gray-200 text-neutral-800 placeholder-neutral-600/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                      placeholder="+56 9 xxxx xxxx"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-600/80 mb-12">
                    Institución / Particular
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-gray-200 text-neutral-800 placeholder-neutral-600/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                    placeholder="Hospital, Clínica o Consulta Privada"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Solución de Interés
                  </label>
                  <select className="w-full px-4 py-3 rounded-xl bg-white/10 border border-gray-200 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition">
                    <option value="">Seleccionar solución</option>
                    <option value="gestion-pacientes">Sistema de Gestión de Pacientes</option>
                    <option value="telemedicina">Plataforma de Telemedicina</option>
                    <option value="hms">Clínica</option>
                    <option value="personalizada">Solución Personalizada</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600/80 mb-2">
                    Mensaje
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-gray-200 text-neutral-800 placeholder-neutral-600/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition resize-none"
                    placeholder="Describe tus necesidades específicas o consultas sobre nuestras soluciones médicas..."
                  ></textarea>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-200 rounded"
                  />
                  <label className="ml-2 text-sm text-gray/80">
                    Acepto recibir información sobre soluciones médicas de Medify
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-teal-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:from-blue-600 hover:to-teal-700 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition duration-300 transform hover:scale-[1.02]"
                >
                  Solicitar información
                </button>
              </form>
            </div>
          </div>

          {/* Call to Action Bottom */}
          <div className="mt-16 text-center">
            <div className="rounded-3xl ring-1 ring-white/10 bg-gradient-to-r from-blue-500/20 to-teal-600/20 backdrop-blur-md p-8 shadow-xl">
              <h3 className={`${spaceGrotesk.className} text-2xl text-white mb-4 font-semibold`}>
                ¿Listo para digitalizar tu práctica médica?
              </h3>
              <p className={`text-neutral-900/85 mb-6 max-w-2xl mx-auto ${spaceGrotesk.className}`}>
                Únete a los profesionales de la salud que ya confían en Medify para optimizar 
                su gestión médica y mejorar la atención a sus pacientes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/56977889900?text=Quiero%20una%20demostración%20de%20Medify"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white font-semibold rounded-xl shadow-lg hover:bg-green-700 transition duration-300"
                >
                  También escribenos a WhatsApp
                </a>
                <Link
                  href="/servicios"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white/10 text-neutral-800 font-semibold rounded-xl border border-gray-200 hover:bg-white/20 transition duration-300"
                >
                  Ver Soluciones
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
