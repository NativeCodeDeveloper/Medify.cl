import { metadataPagina } from "@/lib/seo";

export const metadata = metadataPagina({
  titulo: "Soporte",
  descripcion: "Ayuda para profesionales y pacientes que usan Medify: cuenta, perfil, reseñas y contacto con el equipo.",
  ruta: "/soporte",
});

export default function Layout({ children }) {
  return children;
}
