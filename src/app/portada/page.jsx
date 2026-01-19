"use client";
import { Space_Grotesk, Inter } from "next/font/google";
import Image from "next/image";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["600", "700"], display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap" });

export default function Portada() {
  return (
    <main className="bg-white min-h-screen overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="relative w-full overflow-hidden">
        {/* Full Width Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/pruebitas6.png"
            alt="Doctora background"
            fill
            className="object-cover object-top"
            priority
          />
          {/* Gradient Overlay for text readability: Lighter fade to show original image color */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/20 to-transparent" />
          {/* Additional bottom fade for smooth transition */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-32 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

            {/* Left Column: Text */}
            <div className="flex flex-col items-start text-left space-y-6">
              <h1 className={`${spaceGrotesk.className} text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-cyan-900 leading-tight uppercase`}>
                Medify: El ecosistema <br />
                de salud digital para <br />
                profesionales
              </h1>

              <p className={`${inter.className} text-xl sm:text-2xl text-teal-600 font-medium max-w-lg`}>
                Transforma tu consulta, <br />
                eleva tu impacto
              </p>

              <div className="pt-4">
                {/* Optional CTA button */}
              </div>
            </div>

            {/* Right Column: Empty or Spacer if needed, since image is removed */}
            <div className="hidden lg:block"></div>

          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">

          {/* Feature 1: Designed for you */}
          <div className="flex flex-col items-center text-center space-y-4">
            <h3 className={`${spaceGrotesk.className} text-xl font-bold text-slate-800 mb-6 relative`}>
              Diseñado para ti
            </h3>
            <div className="bg-cyan-50/50 rounded-2xl p-8 w-full h-full flex flex-col items-center justify-center hover:shadow-lg transition-shadow duration-300 border border-slate-100">
              <div className="w-16 h-16 mb-4 text-cyan-600">
                {/* Brain/Leaf Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18" />
                </svg>
              </div>
              <p className="text-slate-600 font-medium">Psicólogos,</p>
              <p className="text-slate-600 font-medium">Nutricionistas</p>
            </div>
          </div>

          {/* Feature 2: All in one place */}
          <div className="flex flex-col items-center text-center space-y-4">
            <h3 className={`${spaceGrotesk.className} text-xl font-bold text-slate-800 mb-6`}>
              Todo en un solo lugar
            </h3>
            <div className="bg-cyan-50/50 rounded-2xl p-8 w-full h-full flex flex-col items-center justify-center hover:shadow-lg transition-shadow duration-300 border border-slate-100">
              <div className="w-16 h-16 mb-4 text-cyan-600">
                {/* Spine/Body Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M6 3v18m12-18v18" />
                </svg>
              </div>
              <p className="text-slate-600 font-medium">Kinesiólogos,</p>
              <p className="text-slate-600 font-medium">Fonoaudiólogos,</p>
              <p className="text-slate-600 font-medium">Terapeutas</p>
            </div>
          </div>

          {/* Feature 3: Mockups */}
          <div className="flex flex-col items-center text-center space-y-4">
            {/* Empty header to align with others or custom text */}
            <div className="h-8 mb-6 hidden md:block"></div>
            <div className="relative w-full h-full flex flex-col items-center justify-end">
              {/* Using the mocked image showing multiple devices */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg border border-slate-100 bg-white group">
                <Image
                  src="/dashboard-preview.png"
                  alt="App Devices"
                  fill
                  className="object-cover object-top p-0 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-4 leading-relaxed max-w-xs mx-auto">
                Pagos en línea automáticos, sin necesidad de cobrar a cada paciente, recordatorios automáticos, fichas clínicas, calendario de pacientes ordenado. Todo en un solo lugar, digitaliza tu proceso.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Floating WhatsApp Button (as seen in reference) */}
      <div className="fixed bottom-8 right-8 z-50">
        <a href="https://wa.me/56912345678" target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-xl transition-all hover:scale-110 flex items-center justify-center">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.997.551 1.974.846 3.037.846 3.177 0 5.765-2.587 5.765-5.766.001-3.181-2.585-5.767-5.764-5.767zm0 13c-2.43 0-4.406-1.977-4.406-4.407 0-.77.202-1.496.559-2.128l-.058-.097-1.47 3.864 3.968-1.042.09.055c.607.37 1.341.569 2.115.569 2.43 0 4.406-1.977 4.406-4.407 0-2.431-1.976-4.408-4.406-4.408zM12 21.016c5.523 0 10-4.477 10-10S17.523 1.016 12 1.016 2 5.493 2 11.016s4.477 10 10 10z" opacity="0.1" />
            <path d="M13.601 2.685c-4.932 0-8.941 4.02-8.94 8.953 0 1.58.411 3.116 1.196 4.47l-1.272 4.64 4.743-1.244c1.296.71 2.766 1.082 4.273 1.082 4.932 0 8.942-4.021 8.942-8.954-.001-4.931-4.01-8.942-8.942-8.942zm4.896 12.607c-.183.917-1.041 1.688-2.057 1.954-.7.185-1.618.337-2.82-.162-1.616-.671-2.992-2.138-3.929-3.774-.755-1.317-1.439-3.235.127-4.793.385-.383.844-.45 1.127-.45.222 0 .438.016.59.091.218.109.539.845.65 1.066.113.224.168.497-.055.845-.224.348-.354.498-.59.782-.234.28-.485.602-.218 1.061.266.459 1.173 1.916 2.522 3.111 1.748 1.549 2.871 1.487 3.284 1.127.412-.36.786-.845 1.069-1.365.283-.519.539-.374 1.069-.168.531.206 3.391 1.631 3.921 1.915.531.284.885.424 1.012.645.127.221.127 1.285-.056 2.202z" />
          </svg>
        </a>
      </div>

    </main>
  );
}
