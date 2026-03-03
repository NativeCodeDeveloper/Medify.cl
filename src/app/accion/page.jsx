"use client";
import { Michroma, Space_Grotesk } from "next/font/google";
import { Link } from 'next-view-transitions';
const michroma = Michroma({ subsets: ["latin"], weight: "400", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap" });

export default function Accion() {
  return (
    <div className="relative min-h-screen">
      {/* Deep Ocean Glow Background */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(70% 55% at 50% 50%, #2a5d77 0%, #184058 18%, #0f2a43 34%, #0a1b30 50%, #071226 66%, #040d1c 80%, #020814 92%, #01040d 97%, #000309 100%)"
      }} />
      
      <div className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Main CTA Section */}
          <div className="text-center mb-16">
            <h1 className={`${spaceGrotesk.className} text-4xl md:text-7xl font-bold text-white leading-tight tracking-tight mb-8`}>
              <span className="block">Transforma tu</span>
              <span className="bg-gradient-to-r from-[#4a8da7] to-[#2a5d77] bg-clip-text text-transparent">
                Práctica Médica
              </span>
              <span className="block">Hoy Mismo</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-12">
              Únete a más de <strong className="text-[#4a8da7]">200+ profesionales</strong> de la salud que ya confían en Medify 
              para optimizar su gestión médica, mejorar la atención al paciente y cumplir con los estándares HIPAA.
            </p>

            {/* Primary CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link
                href="/comprar"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white rounded-2xl shadow-xl transform hover:scale-105 transition duration-300 focus:outline-none focus:ring-4 focus:ring-[#2a5d77]/50"
                style={{
                  background: "linear-gradient(135deg, #2a5d77 0%, #4a8da7 100%)"
                }}
              >
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Comenzar Ahora - Solicita Demo Gratuita
              </Link>
              
              <a
                href="https://wa.me/56991749964?text=Quiero%20una%20consultoría%20médica%20personalizada%20con%20Medify"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border-2 border-white/30 rounded-2xl hover:bg-white/10 transform hover:scale-105 transition duration-300"
              >
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.488"/>
                </svg>
                Consultoría Personalizada
              </a>
            </div>
          </div>

          {/* Urgency & Benefits Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Urgency Card */}
            <div className="lg:col-span-1 rounded-3xl ring-1 ring-red-500/30 bg-red-500/10 backdrop-blur-md p-8 shadow-xl">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className={`${spaceGrotesk.className} text-xl text-white mb-4 font-semibold`}>¡Solo por tiempo limitado!</h3>
                <p className={`text-white/85 mb-4 ${spaceGrotesk.className}`}>
                  Implementación gratuita para los primeros 10 profesionales médicos
                </p>
                <div className="bg-red-500/20 rounded-xl p-4">
                  <p className="text-red-300 font-semibold">Quedan 5 cupos disponibles</p>
                </div>
              </div>
            </div>

            {/* Benefits Cards */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-3xl ring-1 ring-white/10 bg-white/5 backdrop-blur-md p-6 shadow-xl">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{
                  background: "radial-gradient(circle, #2a5d77 0%, #184058 50%, #0f2a43 100%)"
                }}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-white font-semibold mb-2">Implementación en 48h</h4>
                <p className="text-white/75 text-sm">Sistema funcionando en menos de 2 días hábiles</p>
              </div>

              <div className="rounded-3xl ring-1 ring-white/10 bg-white/5 backdrop-blur-md p-6 shadow-xl">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{
                  background: "radial-gradient(circle, #2a5d77 0%, #184058 50%, #0f2a43 100%)"
                }}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h4 className="text-white font-semibold mb-2">ROI del 300%</h4>
                <p className="text-white/75 text-sm">Retorno de inversión comprobado en 6 meses</p>
              </div>

              <div className="rounded-3xl ring-1 ring-white/10 bg-white/5 backdrop-blur-md p-6 shadow-xl">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h4 className="text-white font-semibold mb-2">100% Seguro</h4>
                <p className="text-white/75 text-sm">Cumplimiento total de estándares médicos</p>
              </div>

              <div className="rounded-3xl ring-1 ring-white/10 bg-white/5 backdrop-blur-md p-6 shadow-xl">
                <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h4 className="text-white font-semibold mb-2">Soporte dedicado</h4>
                <p className="text-white/75 text-sm">Asistencia especializada siempre disponible</p>
              </div>
            </div>
          </div>

          {/* Testimonial Section */}
          <div className="rounded-3xl ring-1 ring-white/10 bg-gradient-to-r from-blue-500/10 to-teal-600/10 backdrop-blur-md p-8 mb-16 shadow-xl">
            <div className="text-center">
              <div className="w-20 h-20 bg-white/10 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-10 h-10 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                </svg>
              </div>
              <blockquote className="text-xl md:text-2xl text-white/90 italic mb-6 max-w-3xl mx-auto">
                "Medify transformó completamente mi consulta. Ahora puedo atender 40% más pacientes con la misma calidad, 
                y mis pacientes están mucho más satisfechos con el servicio."
              </blockquote>
              <div className="text-white/80">
                <p className="font-semibold">Dra. María González</p>
                <p className="text-sm">Cardióloga - Clínica Las Condes</p>
              </div>
            </div>
          </div>

          {/* Guarantee Section */}
          <div className="rounded-3xl ring-1 ring-green-500/30 bg-green-500/10 backdrop-blur-md p-8 mb-16 shadow-xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className={`${spaceGrotesk.className} text-2xl text-white mb-4 font-semibold`}>Garantía 100% Sin Riesgo</h3>
              <p className={`text-white/85 text-lg max-w-2xl mx-auto ${spaceGrotesk.className}`}>
                Si en 30 días no ves mejoras en tu gestión médica, te devolvemos el 100% de tu inversión. 
                Sin preguntas, sin complicaciones.
              </p>
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center">
            <h2 className={`${spaceGrotesk.className} text-3xl md:text-5xl text-white mb-8 font-bold`}>
              ¿Qué Esperas Para <span className="text-blue-400">Modernizar</span> Tu Consulta?
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
              <Link
                href="/comprar"
                className="inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-white bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl shadow-2xl hover:from-blue-700 hover:to-teal-700 transform hover:scale-105 transition duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
              >
                <svg className="w-7 h-7 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                OBTENER MEDIFY AHORA
              </Link>
              
              <Link
                href="/servicios"
                className="inline-flex items-center justify-center px-10 py-5 text-xl font-semibold text-white border-2 border-white/30 rounded-2xl hover:bg-white/10 transform hover:scale-105 transition duration-300"
              >
                Ver Todos los Planes
              </Link>
            </div>

            <p className="text-white/60 text-sm">
              * Oferta válida hasta fin de mes. Implementación incluida. Soporte 24/7 garantizado.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}