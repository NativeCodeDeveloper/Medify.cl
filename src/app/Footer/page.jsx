import GradientText from "@/componentes/GradientText";
import Image from "next/image";
import { Link } from 'next-view-transitions';
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiExpress,
  SiMysql,
  SiMongodb,
  SiTailwindcss,
} from "react-icons/si";

export default function Footer() {
  return (
    <footer className="relative bg-white text-neutral-900 overflow-hidden border-t border-neutral-200">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
      {/* Fondo decorativo removido para fondo blanco profesional */}

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-6">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                <span className="block text-neutral-900">Tú consulta digital</span>
                <span className="text-center block text-neutral-900 mt-2">
                  y a tu medida con
                </span>
                <span className="block mt-4">
                  <GradientText>M e d i f y</GradientText>
                </span>
              </h2>

              <p className="text-justify text-gray-400 max-w-xl leading-relaxed">
              Optimiza tu consulta con una plataforma diseñada especialmente para profesionales de la salud. Agenda, 
              fichas clínicas y gestión completa en un sistema simple, seguro y adaptable a tu forma de trabajo
              </p>

              <div className="pt-6 flex justify-center lg:justify-center">
                <a
                  href="/"
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/60 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                  Volver a Medify
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Column - Logo */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/40 to-cyan-600/40 rounded-full blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <Image
                    src="/logomedify1.png"
                    alt="Logo Medify"
                    width={900}
                    height={900}
                    className="w-72 h-72 sm:w-96 sm:h-96 lg:w-[500px] lg:h-[500px] object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-110"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800/30"></div>

        {/* Bottom Footer */}
        <div className="py-8 lg:py-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            {/* Links */}
            <nav className="flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-4">
              <Link
                href="/contacto"
                className="text-sm font-medium text-gray-400 hover:text-blue-500 transition-colors duration-200 hover:underline decoration-blue-500 underline-offset-4"
              >
                Contacto Especializado
              </Link>
              <Link
                href="/soporte"
                className="text-sm font-medium text-gray-400 hover:text-blue-500 transition-colors duration-200 hover:underline decoration-blue-500 underline-offset-4"
              >
                Soporte Especializado
              </Link>
              <Link
                href="/politica"
                className="text-sm font-medium text-gray-400 hover:text-blue-500 transition-colors duration-200 hover:underline decoration-blue-500 underline-offset-4"
              >
                Políticas y Privacidad
              </Link>
            </nav>

            {/* Social Links */}
            <div className="flex justify-center lg:justify-end gap-4">
              <a
                href="#"
                rel="noreferrer"
                target="_blank"
                className="group flex h-10 w-10 items-center justify-center rounded-full bg-white/50 backdrop-blur-sm border border-gray-700/50 transition-all duration-300 hover:bg-blue-600 hover:border-blue-500 hover:scale-110"
                aria-label="Facebook"
              >
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>

              <a
                href="#"
                rel="noreferrer"
                target="_blank"
                className="group flex h-10 w-10 items-center justify-center rounded-full bg-white/50 backdrop-blur-sm border border-gray-700/50 transition-all duration-300 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 hover:border-pink-500 hover:scale-110"
                aria-label="Instagram"
              >
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-8 border-t border-gray-800/50">
            <p className="text-center text-sm text-gray-500"> Tegnología desarrollada por NativeCode.cl - 
              © {new Date().getFullYear()} Medify.cl Todos los derechos
              reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
