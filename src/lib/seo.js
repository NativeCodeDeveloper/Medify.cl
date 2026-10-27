/* Metadata por página. Cada ruta declara su propio título, descripción y URL canónica
 * (si no, todas heredan la de la portada y Google las trata como duplicados). */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.medifyclinic.cl").replace(/\/$/, "");
export const SITE_NAME = "Medify";

export function metadataPagina({ titulo, descripcion, ruta, indexar = true, imagen }) {
  const url = `${SITE_URL}${ruta}`;
  const og = imagen ? [{ url: imagen }] : undefined; // sin imagen propia se usa /opengraph-image (la del sitio)
  return {
    title: titulo,
    description: descripcion,
    alternates: { canonical: url },
    openGraph: { title: titulo, description: descripcion, url, ...(og && { images: og }) },
    twitter: { title: titulo, description: descripcion, ...(og && { images: og.map((i) => i.url) }) },
    ...(!indexar && { robots: { index: false, follow: true } }),
  };
}

/* Páginas privadas o de login: no deben aparecer en Google */
export const NO_INDEXAR = { robots: { index: false, follow: false } };
