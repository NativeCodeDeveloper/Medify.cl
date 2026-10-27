import { metadataPagina } from "@/lib/seo";

export const metadata = metadataPagina({
  titulo: "Beneficios",
  descripcion: "Beneficios de Medify.",
  ruta: "/beneficios",
  indexar: false, // sin contenido propio o página antigua sin enlaces
});

export default function Layout({ children }) {
  return children;
}
