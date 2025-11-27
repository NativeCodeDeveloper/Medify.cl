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

import Link from "next/link";

export default function PaginasWeb() {
  return (
    <div className="min-h-screen w-full bg-white text-neutral-900 px-4 py-8">
      <div>
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
        <h1 className={`${spaceGrotesk.className} titulosResponsive font-bold text-center text-3xl md:text-5xl mb-8`}>
          Página Web Profesional Multipágina
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex-col justify-center">
            <div>
              <p className="textoNormalResponsive p-12 text-neutral-700">
                Sitio web moderno y multipágina con módulos adicionales para
                potenciar tu negocio: agendamiento online, pagos, blog, correo
                corporativo, entre otros. Pensado para quienes quieren
                destacarse con una experiencia digital completa.
              </p>
            </div>
           

            <div className="p-12">
              <Image
                src={"/web3.jpg"}
                alt="web1"
                height={1000}
                width={600}
                className="rounded-3xl"
              />
        
            </div>
          </div>

          <div className="flex-col justify-items-center space-y-8 ">
            <h3 className={`${spaceGrotesk.className} titulosResponsive font-semibold`}>
              Incluye
            </h3>
            <div className="flex-1 estiloPlanesCayan">
              <ul className="textoNormalResponsive">
                <li className="list-disc">
                  {" "}
                  Desarrollo 100% a medida de tu negocio{" "}
                </li>
                <li className="list-disc"> Hasta 8 secciones personalizadas</li>
                <li className="list-disc"> Sistema de Agendamiento</li>
                <li className="list-disc">
                  {" "}
                  Pasarela de pago y Facturación (Transbank, Webpay, u otros)
                </li>
                <li className="list-disc"> Galerías Fotográficas</li>
                <li className="list-disc"> Correos corporativo profesional</li>
                <li className="list-disc">
                  {" "}
                  Formulario de contacto y sección de calificaciones
                </li>
                <li className="list-disc">
                  {" "}
                  Panel de Administrador para autoadministración
                </li>
                <li className="list-disc"> Animaciones y efectos visuales</li>
                <li className="list-disc">
                  {" "}
                  Alojamiento en Servidores de NEX.IO y dominio por 1 año
                </li>
                <li className="list-disc">
                  {" "}
                  Soporte ilimitado y acompañamiento postVenta
                </li>
                <li className="list-disc">
                  {" "}
                  12 Modificaciones de desarrollo al año según lo que necesite
                  tu negocio.
                </li>
              </ul>
              <br />
              <h3 className="tituloResponsive">350.000 CLP</h3>
              <br />
              <br />
               <Link href={'/comprar'}><BotonMui contenido={"Comprar"} /></Link>
            </div>

            <br />
            <br />
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}
