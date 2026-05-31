import "./globals.css";
import Script from "next/script";
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
    default: 'Medify — Encuentra psicólogos, kinesiólogos y especialistas en Chile',
    template: '%s | Medify',
  },
  description:
    'Medify es el marketplace de salud de Chile. Encuentra y agenda con psicólogos, kinesiólogos, nutricionistas, médicos y más. Profesionales verificados. Reserva en minutos, sin llamadas, sin esperas.',
  keywords: [
    // Búsquedas de pacientes
    'psicólogo online Chile',
    'kinesiólogo Chile',
    'nutricionista Chile',
    'médico online Chile',
    'terapeuta Chile',
    'odontólogo Chile',
    'agendar hora psicólogo',
    'agendar hora kinesiólogo',
    'consulta médica online Chile',
    'especialista salud Chile',
    'profesional salud online',
    'psicólogo Chillán',
    'kinesiólogo Chillán',
    // Búsquedas de profesionales
    'publicar perfil profesional salud',
    'agenda médica online Chile',
    'plataforma profesionales salud Chile',
    'conseguir pacientes Chile',
    'visibilidad profesional salud',
    // Marca
    'Medify',
    'Medify Chile',
    'marketplace salud Chile',
  ],
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    url: SITE_URL,
    siteName: 'Medify',
    title: 'Medify — Encuentra psicólogos, kinesiólogos y especialistas en Chile',
    description:
      'Reserva con psicólogos, kinesiólogos, nutricionistas y más. Profesionales verificados en todo Chile. Agenda en minutos.',
    images: [
      {
        url: '/logofavicom.png',
        width: 1200,
        height: 630,
        alt: 'Medify – Marketplace de salud en Chile',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Medify — Encuentra psicólogos, kinesiólogos y especialistas en Chile',
    description:
      'Reserva con psicólogos, kinesiólogos, nutricionistas y más. Profesionales verificados en todo Chile.',
    images: ['/logofavicom.png'],
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
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
  other: {
    'theme-color': '#00C853',
  },
};

// Manejo de viewport recomendado por Next 13+
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <ViewTransitions>
      <html lang="es" suppressHydrationWarning>
        {/* Schema: Organización */}
        <Script
          id="ld-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Medify",
              "url": SITE_URL,
              "logo": SITE_URL + "/logofavicom.png",
              "description": "Marketplace de profesionales de salud verificados en Chile.",
              "address": { "@type": "PostalAddress", "addressCountry": "CL" },
              "sameAs": [
                "https://www.instagram.com/medify.chile"
              ]
            })
          }}
        />
        {/* Schema: Marketplace / MedicalWebPage */}
        <Script
          id="ld-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Medify",
              "url": SITE_URL,
              "description": "Encuentra y agenda con psicólogos, kinesiólogos, nutricionistas y más en Chile.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": SITE_URL + "/marketplace?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        {/* Schema: Servicio de salud */}
        <Script
          id="ld-service"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalBusiness",
              "name": "Medify",
              "url": SITE_URL,
              "description": "Marketplace que conecta pacientes con profesionales de salud verificados en Chile.",
              "areaServed": { "@type": "Country", "name": "Chile" },
              "availableService": [
                { "@type": "MedicalTherapy", "name": "Psicología" },
                { "@type": "MedicalTherapy", "name": "Kinesiología" },
                { "@type": "MedicalTherapy", "name": "Nutrición" },
                { "@type": "MedicalTherapy", "name": "Medicina General" },
                { "@type": "MedicalTherapy", "name": "Odontología" }
              ]
            })
          }}
        />
        <body className="antialiased">
          <SiteWrapper>{children}</SiteWrapper>
        </body>
      </html>
    </ViewTransitions>
  );
}
