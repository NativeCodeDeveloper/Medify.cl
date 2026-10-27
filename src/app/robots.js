const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.medifyclinic.cl';

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Páginas privadas o de login: no tienen sentido en Google
      disallow: ['/api/', '/_next/', '/dashboard', '/mi-perfil', '/login', '/acceso'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
