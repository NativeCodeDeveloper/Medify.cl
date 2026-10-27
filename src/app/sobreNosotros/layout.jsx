import { metadataPagina } from "@/lib/seo";

export const metadata = metadataPagina({
  titulo: "Sobre nosotros",
  descripcion: "Conoce a Medify, el directorio de profesionales de la salud, clínicas y centros médicos en Chile.",
  ruta: "/sobreNosotros",
});

export default function Layout({ children }) {
  return children;
}
