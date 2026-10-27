import { metadataPagina } from "@/lib/seo";

export const metadata = metadataPagina({
  titulo: "Planes para profesionales y clínicas",
  descripcion: "Planes de Medify para profesionales de la salud, clínicas y centros médicos en Chile.",
  ruta: "/precios",
  indexar: false, // planes desactivados por ahora: no indexar hasta que se activen los pagos
});

export default function Layout({ children }) {
  return children;
}
