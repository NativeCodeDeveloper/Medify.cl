import { metadataPagina } from "@/lib/seo";

export const metadata = metadataPagina({
  titulo: "Políticas de privacidad y términos de uso",
  descripcion: "Qué datos usa Medify, para qué y cómo los protege. Política de privacidad, términos de uso y seguridad de la plataforma.",
  ruta: "/politica",
});

export default function Layout({ children }) {
  return children;
}
