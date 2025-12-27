import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Poppins, Dancing_Script } from "next/font/google";
import Footer from "./Footer/page";
import ClientCardNav from "@/componentes/ClientCardNav";
import Script from "next/script";
import { ViewTransitions } from 'next-view-transitions';

// ==========================
// SEO Metadata (App Router)
// ==========================
export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  applicationName: 'Medify',
  title: {
    default: 'Medify | Soluciones digitales para profesionales de la salud',
    template: '%s | Medify',
  },
  description: 'Medify: sistemas médicos especializados, plataformas de telemedicina y gestión de pacientes. Cumplimiento HIPAA, seguridad de datos médicos y tecnología de vanguardia para profesionales de la salud.',
  keywords: [
    'Medify',
    'sistemas médicos',
    'telemedicina',
    'gestión de pacientes',
    'historias clínicas digitales',
    'software médico',
    'HIPAA',
    'seguridad médica',
    'plataforma médica',
    'consulta virtual',
    'Next.js',
    'Node.js',
    'SEO',
    'tecnología médica',
    'salud digital',
    'Chile',
    'Agenda médica',
    'Software para clínicas',
    'Gestión de consultas',
    'Historia clínica electrónica',
    'Citas médicas en línea',
  ],
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    url: '/',
    siteName: 'Medify',
    title: 'Medify | Soluciones digitales para profesionales de la salud',
    description: 'Medify: sistemas médicos especializados, plataformas de telemedicina y gestión de pacientes. Cumplimiento HIPAA, seguridad de datos médicos y tecnología de vanguardia para profesionales de la salud.',
    images: [
      {
        url: '/medifylogo.png', // Reemplaza si tienes una imagen OG
        width: 1200,
        height: 630,
        alt: 'Medify – Tecnología médica premium',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Medify | Soluciones digitales para profesionales de la salud',
    description: 'Medify: sistemas médicos especializados, plataformas de telemedicina y gestión de pacientes. Cumplimiento HIPAA, seguridad de datos médicos y tecnología de vanguardia para profesionales de la salud.',
    images: ['/og.jpg'],
  },
  alternates: {
    canonical: '/',
    languages: {
      // Ajusta estas rutas cuando tengas i18n definitivo
      'es': '/es',
      'en': '/en',
    },
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
    icon: '/medifylogo.png', // Favicon principal (logo en la pestaña)
    shortcut: '/medifylogo.png',
    apple: '/apple-touch-icon.png',
  },
  other: {
    'theme-color': '#0a0f1a',
  },
};

// Manejo de viewport recomendado por Next 13+
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

const dancing = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "600"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <ViewTransitions>
      <html lang="es" suppressHydrationWarning>
        <Script
          id="ld-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Medify.cl",
              "url": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
              "logo": (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000") + "/og.jpg",
            "sameAs": [
              "https://www.instagram.com/",
              "https://www.linkedin.com/"
            ]
          })
        }}
      />
      <Script
        id="ld-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Medify.cl",
            "url": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
            "potentialAction": {
              "@type": "SearchAction",
              "target": (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000") + "/buscar?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />
      <body className={`${poppins.className} ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="min-h-screen flex flex-col relative">
          {/* CardNav moderno con animaciones GSAP */}
          <ClientCardNav />
          
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
    </ViewTransitions>
  );
}
