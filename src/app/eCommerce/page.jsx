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

export default function Ecommerce() {
  return (
    <div className="min-h-screen w-full bg-white text-neutral-900 px-4 py-8">
      <div>
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
        <h1 className={`${spaceGrotesk.className} titulosResponsive font-bold text-center text-3xl md:text-5xl mb-8`}>E - Commerce</h1>
      </div>
      <div className="grid grid-rows-1 gap-7">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 justify-items-center gap-16">
          <div className="px-10">
            <br />
            <br />
            <p className="textoNormalResponsive">
              Vende desde cualquier lugar con tu propio e-commerce, sin sitios
              genéricos ni plantillas. <br /><br /> Desarrollamos una página web hecha a la
              medida de tu negocio, con código a medida y el respaldo de
              expertos. <br /><br /> Integra tu tienda online con sistemas de stock, pagos,
              inventario, análisis en tiempo real o cualquier funcionalidad que
              necesites. La solución ideal para empresas que quieren digitalizar
              y optimizar su operación con una plataforma sólida, segura y
              escalable.”
            </p>
            <br />
            <br />

            <br />
            <div>
              <Image
                height={2000}
                width={1000}
                src="/celu.png"
                alt="foto landing"
                className="rounded-3xl hidden md:block"
              />
            </div><br /><br /><br />
                 <div>
              <Image
                height={1000}
                width={800}
                src="/tienda2.jpg"
                alt="foto landing"
                className="rounded-3xl block md:hidden"
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
                    <li className="list-disc"> Sitio web con secciones ilimitadas</li>
                    <li className="list-disc"> Pasarela de pagos (WebPay, MercadoPago, etc.)</li>
                    <li className="list-disc">
                      {" "}
                     Gestión de stock e inventario
                    </li>
                    <li className="list-disc"> Cotizador personalizado (Opcional)</li>
                    <li className="list-disc"> SEO técnico + optimización mensual</li>
                    <li className="list-disc">
                      {" "}
                      Hosting premium con respaldo y seguridad
                    </li>
                    <li className="list-disc">
                      {" "}
                      Panel de Administrador para autoadministración
                    </li>
                    <li className="list-disc"> Integración con CRM, ERP, etc.</li>
                    <li className="list-disc">
                      {" "}
                      Soporte técnico completo y cambios sin restricciones
                    </li>
                    <li className="list-disc">
                      {" "}
                      Panel de estadísticas personalizado 
                    </li>
                    <li className="list-disc">
                      {" "}
                     CMS para autogestión total
                    </li>
                                        <li className="list-disc">
                      {" "}
                     Consultoria Tecnica con Desarrolladores ilimitada
                    </li>
                  </ul>
                  <br />
                  <h3 className="tituloResponsive">500.000 CLP</h3>
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
