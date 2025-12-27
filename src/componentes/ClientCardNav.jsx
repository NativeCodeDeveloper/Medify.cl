"use client";
import CardNav from "@/componentes/CardNav";

export default function ClientCardNav() {
  return (
    <CardNav
      logo="/Archivo2.mp4"
      logoAlt="Medify Logo"
      items={[
        {
          label: "Servicios",
          bgColor: "#1e3a8a",
          textColor: "#fff",
          links: [
            { label: "Servicios", href: "/servicios#web", ariaLabel: "Desarrollo de páginas web médicas" },
          ]
        },
        {
          label: "Sobre Nosotros",
          bgColor: "#1e40af",
          textColor: "#fff",
          links: [
            { label: "Sobre nosotros", href: "/sobreNosotros#mision", ariaLabel: "Misión de Medify" },
          ]
        },
        {
          label: "Contacto",
          bgColor: "#1d4ed8",
          textColor: "#fff",
          links: [
            { label: "Soporte", href: "/soporte", ariaLabel: "Soporte técnico especializado" },
            { label: "WhatsApp", href: "https://wa.me/56912345678", ariaLabel: "Contactar por WhatsApp" }
          ]
        }
      ]}
      baseColor="#ffffff"
      menuColor="#1e40af"
      buttonBgColor="#1e40af"
      buttonTextColor="#ffffff"
      ease="power3.out"
    />
  );
}
