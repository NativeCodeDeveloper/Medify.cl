import { PROFESSIONALS } from './marketplace/data/professionals';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.medifyclinic.cl';
const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'https://api.medifyclinic.cl/api').replace(/\/$/, '');

// Se regenera cada 1 hora: así los perfiles que se aprueban en el dashboard entran solos al sitemap
export const revalidate = 3600;

// Perfiles registrados y aprobados (medify-api). Si la API no responde, el sitemap sale igual sin ellos.
async function perfilesRegistrados() {
  try {
    const res = await fetch(`${API_URL}/public/perfiles`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export default async function sitemap() {
  const ahora = new Date();
  const paginas = [
    { url: SITE_URL, changeFrequency: 'daily', priority: 1 },
    { url: `${SITE_URL}/unirse`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/precios`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/comoFunciona`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/sobreNosotros`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/contacto`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/politica`, changeFrequency: 'yearly', priority: 0.3 },
  ].map((p) => ({ ...p, lastModified: ahora }));

  const registrados = await perfilesRegistrados();
  const slugs = new Set();
  const perfiles = [...registrados, ...PROFESSIONALS]
    .filter((p) => p.id && !slugs.has(p.id) && slugs.add(p.id))
    .map((p) => ({
      url: `${SITE_URL}/marketplace/${p.id}`,
      lastModified: ahora,
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

  return [...paginas, ...perfiles];
}
