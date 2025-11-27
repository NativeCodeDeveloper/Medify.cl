"use client";

import Aurora from "@/componentes/Aurora";
import SplashCursor from "@/componentes/Splash";
import Image from "next/image";
import { Michroma, Space_Grotesk } from "next/font/google";
import GradientText from "@/componentes/GradientText";
const michroma = Michroma({ subsets: ["latin"], weight: "400" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap" });
import AccordionUsage from "@/componentes/Acordeon";
import BotonMui from "@/componentes/BotonMui";
import Threads from "@/componentes/Threads";
export default function ProyectosEcommerce() {
  return (
    <div className="min-h-screen w-full bg-white text-neutral-900 flex flex-col items-center justify-center px-4 py-8">
      <Aurora
        colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />
      <h1 className={`${spaceGrotesk.className} titulosResponsive font-bold text-center text-3xl md:text-5xl mb-8`}>Proyectos E - Commerce</h1>
      {/* ...otros componentes y secciones responsivas aquí... */}
    </div>
  );
}
