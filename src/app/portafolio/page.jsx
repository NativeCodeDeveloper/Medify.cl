{/* 
"use client"
import TextType from '@/componentes/TextType';
import FlowingMenu from "@/componentes/FlowingMenu";
import { func } from 'prop-types';
import Image from 'next/image';
import { Michroma, Space_Grotesk } from "next/font/google";
import GradientText from "@/componentes/GradientText";
const michroma = Michroma({ subsets: ["latin"], weight: "400" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap" });

export default function Portafolio(){
  return (
    <div className="min-h-screen w-full bg-white text-neutral-900 flex items-center justify-center px-4 py-8">
      <div className="text-center">
        <h1 className={`${spaceGrotesk.className} text-4xl md:text-5xl font-bold text-neutral-900 mb-4`}>
          Portafolio en Construcción
        </h1>
        <p className={`text-neutral-700 text-lg ${spaceGrotesk.className}`}>
          Esta sección estará disponible próximamente
        </p>
      </div>
    </div>
  );
}
  */}