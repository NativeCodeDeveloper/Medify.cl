import { metadataPagina } from "@/lib/seo";

/* La portada es el marketplace */
export const metadata = {
  ...metadataPagina({
    titulo: "Medify — Encuentra profesionales de la salud en Chile",
    descripcion: "Busca psicólogos, kinesiólogos, nutricionistas, odontólogos y otros profesionales de la salud en Chile. Revisa su perfil, servicios y reseñas, y agenda directamente con ellos.",
    ruta: "/",
  }),
  title: { absolute: "Medify — Encuentra profesionales de la salud en Chile" }, // sin el sufijo "| Medify"
};

export { default } from "./marketplace/page";
