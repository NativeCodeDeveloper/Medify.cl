import { notFound } from "next/navigation";
import { PROFESSIONALS } from "../data/professionals";
import { SITE_URL, metadataPagina } from "@/lib/seo";

/* SEO de cada perfil: título con nombre + especialidad + comuna, descripción, foto al compartir,
 * URL canónica y datos estructurados (schema.org) para que Google entienda que es un prestador de salud.
 * La página en sí (page.jsx) es de cliente; este layout de servidor solo agrega lo que lee Google. */

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "https://api.medifyclinic.cl/api").replace(/\/$/, "");
const REVALIDAR = 600; // 10 min: un cambio en el perfil o una reseña nueva se refleja sin redeploy

async function getJson(path) {
  try {
    const res = await fetch(`${API_URL}${path}`, { next: { revalidate: REVALIDAR } });
    return res.ok ? await res.json() : null;
  } catch {
    return null;
  }
}

// Perfil: primero los cargados en el código, si no, los registrados en la API
async function obtenerPerfil(id) {
  return PROFESSIONALS.find((p) => p.id === id) ?? (await getJson(`/public/perfiles/${encodeURIComponent(id)}`));
}

const absoluta = (url) => (!url ? null : url.startsWith("http") ? url : `${SITE_URL}${url}`);

function descripcionDe(p) {
  const lugar = p.comuna || p.ciudad || p.ubicacion;
  const base = p.descripcion?.trim() || `${p.especialidad_principal ?? "Profesional de la salud"}${lugar ? ` en ${lugar}` : ""}.`;
  const extra = p.modalidad_atencion ? ` Atención ${p.modalidad_atencion === "Ambas" ? "presencial y online" : p.modalidad_atencion.toLowerCase()}.` : "";
  return `${base}${extra} Revisa su perfil, servicios y reseñas, y agenda directamente en Medify.`.slice(0, 300);
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const p = await obtenerPerfil(id);
  if (!p) return { title: "Perfil no encontrado", robots: { index: false } };

  const lugar = p.comuna || p.ciudad;
  const titulo = [p.nombre, [p.especialidad_principal, lugar && `en ${lugar}`].filter(Boolean).join(" ")].filter(Boolean).join(" — ");
  return metadataPagina({
    titulo,
    descripcion: descripcionDe(p),
    ruta: `/marketplace/${id}`,
    // WhatsApp y Facebook no muestran AVIF: en ese caso se usa la imagen general de Medify
    imagen: /\.avif($|\?)/i.test(p.imagen_url ?? "") ? undefined : absoluta(p.imagen_url),
  });
}

export default async function PerfilLayout({ children, params }) {
  const { id } = await params;
  const p = await obtenerPerfil(id);
  if (!p) notFound(); // 404 real (antes respondía 200 con "no encontrado", Google lo marca como soft 404)

  const resenas = await getJson(`/public/perfiles/${encodeURIComponent(id)}/resenas`);
  const url = `${SITE_URL}/marketplace/${id}`;
  const redes = [p.instagram, p.facebook, p.linkedin, p.twitter].filter((r) => r?.startsWith("http"));

  const negocio = {
    "@context": "https://schema.org",
    "@type": p.es_profesional === false ? "MedicalClinic" : "MedicalBusiness",
    "@id": `${url}#perfil`,
    name: p.nombre,
    url,
    description: descripcionDe(p),
    ...(p.imagen_url && { image: absoluta(p.imagen_url) }),
    ...(p.especialidad_principal && { knowsAbout: p.especialidad_principal }),
    address: {
      "@type": "PostalAddress",
      ...(p.direccion && { streetAddress: p.direccion }),
      ...((p.comuna || p.ciudad) && { addressLocality: p.comuna || p.ciudad }),
      ...(p.region && { addressRegion: p.region }),
      addressCountry: "CL",
    },
    ...(p.lat && p.lng && { geo: { "@type": "GeoCoordinates", latitude: p.lat, longitude: p.lng } }),
    ...(p.numero_whatsapp && { telephone: `+${String(p.numero_whatsapp).replace(/\D/g, "")}` }),
    ...(redes.length && { sameAs: redes }),
    ...(p.servicios?.length && {
      makesOffer: p.servicios.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.nombre },
        ...(s.precio != null && { price: s.precio, priceCurrency: "CLP" }),
      })),
    }),
    // Solo con reseñas reales: Google penaliza calificaciones sin reseñas que las respalden
    ...(resenas?.total > 0 && {
      aggregateRating: { "@type": "AggregateRating", ratingValue: resenas.promedio, reviewCount: resenas.total, bestRating: 5, worstRating: 1 },
    }),
  };

  const migas = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Medify", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: p.nombre, item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([negocio, migas]).replace(/</g, "\\u003c") }} />
      {children}
    </>
  );
}
