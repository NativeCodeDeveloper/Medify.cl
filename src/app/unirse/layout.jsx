import { metadataPagina } from "@/lib/seo";

export const metadata = metadataPagina({
  titulo: "Únete a Medify como profesional de la salud",
  descripcion: "Crea gratis tu perfil de profesional, clínica o centro médico en Medify. Muestra tus servicios, tu dirección y tu agenda para que los pacientes te encuentren.",
  ruta: "/unirse",
});

export default function Layout({ children }) {
  return children;
}
