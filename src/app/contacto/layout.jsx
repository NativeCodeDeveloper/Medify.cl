import { metadataPagina } from "@/lib/seo";

export const metadata = metadataPagina({
  titulo: "Contacto",
  descripcion: "Escríbele al equipo de Medify por correo o WhatsApp. Te ayudamos con tu perfil o con cualquier duda sobre la plataforma.",
  ruta: "/contacto",
});

export default function Layout({ children }) {
  return children;
}
