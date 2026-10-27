import { metadataPagina } from "@/lib/seo";

export const metadata = metadataPagina({
  titulo: "Cómo funciona Medify",
  descripcion: "Cómo encontrar un profesional de la salud en Medify y agendar directamente con él, y cómo publicar tu perfil si eres profesional.",
  ruta: "/comoFunciona",
});

export default function Layout({ children }) {
  return children;
}
