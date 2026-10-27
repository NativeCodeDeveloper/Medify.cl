import { metadataPagina } from "@/lib/seo";

export const metadata = metadataPagina({
  titulo: "Servicios",
  descripcion: "Servicios de Medify.",
  ruta: "/servicios",
  indexar: false, // sin contenido propio o página antigua sin enlaces
});

export default function Layout({ children }) {
  return children;
}
