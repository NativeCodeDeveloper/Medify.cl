import "./globals.css";
import { ViewTransitions } from 'next-view-transitions';
import SiteWrapper from "@/componentes/SiteWrapper";

// ==========================
// SEO Metadata (App Router)
// ==========================

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.medifyclinic.cl';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: 'Medify',
  title: {
    default: 'Medify — Encuentra profesionales de la salud en Chile',
    template: '%s | Medify',
  },
  description:
    'Busca psicólogos, kinesiólogos, nutricionistas, odontólogos y otros profesionales de la salud en Chile. Revisa su perfil, servicios y reseñas, y agenda directamente con ellos.',
  // Sin "canonical" aquí: cada página define la suya (ver src/lib/seo.js). Si se pone en el layout,
  // todas las páginas heredan la URL de la portada y Google las trata como duplicadas.
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    siteName: 'Medify',
    title: 'Medify — Encuentra profesionales de la salud en Chile',
    description:
      'Psicólogos, kinesiólogos, nutricionistas, odontólogos y más. Revisa perfiles y reseñas, y agenda directamente con el profesional.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Medify — Encuentra profesionales de la salud en Chile',
    description:
      'Psicólogos, kinesiólogos, nutricionistas, odontólogos y más. Revisa perfiles y reseñas, y agenda directamente.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: '/logofavicom.png',
    shortcut: '/logofavicom.png',
    apple: '/logofavicom.png',
  },
  formatDetection: { telephone: false },
};

// Manejo de viewport recomendado por Next 13+
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#00C853',
};

export default function RootLayout({ children }) {
  return (
    <ViewTransitions>
      <html lang="es-CL" suppressHydrationWarning>
        <body className="antialiased">
          {/* Datos estructurados del sitio: quién es Medify y su buscador (Google puede mostrar la caja de búsqueda) */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify([
                {
                  "@context": "https://schema.org",
                  "@type": "Organization",
                  "name": "Medify",
                  "url": SITE_URL,
                  "logo": SITE_URL + "/logofavicom.png",
                  "description": "Directorio de profesionales de la salud, clínicas y centros médicos en Chile.",
                  "address": { "@type": "PostalAddress", "addressCountry": "CL" },
                  "email": "ventas@medify.cl",
                  "sameAs": ["https://www.instagram.com/medify.chile"],
                },
                {
                  "@context": "https://schema.org",
                  "@type": "WebSite",
                  "name": "Medify",
                  "url": SITE_URL,
                  "inLanguage": "es-CL",
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": { "@type": "EntryPoint", "urlTemplate": SITE_URL + "/?q={search_term_string}" },
                    "query-input": "required name=search_term_string",
                  },
                },
              ]),
            }}
          />
          <SiteWrapper>{children}</SiteWrapper>
        </body>
      </html>
    </ViewTransitions>
  );
}
