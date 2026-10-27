import { metadataPagina } from "@/lib/seo";

export const metadata = metadataPagina({
  titulo: "Medify",
  descripcion: "Medify.",
  ruta: "/Footer",
  indexar: false, // sin contenido propio o página antigua sin enlaces
});

export default function Layout({ children }) {
  return children;
}
