/**
 * professionals.js
 * ─────────────────────────────────────────────────────────────────────
 * Datos mock de profesionales del marketplace de Medify.
 *
 * IMPORTANTE: Todos los atributos están en español para alinearse con
 * la base de datos Java/MySQL que se integrará en el backend.
 * Al conectar el backend, reemplazar este array por una llamada a:
 *   GET /api/profesionales   → lista para el marketplace
 *   GET /api/profesionales/:id  → detalle del perfil
 *
 * Estructura de cada profesional → ver tabla `profesionales` en BACKEND_README.md
 * ─────────────────────────────────────────────────────────────────────
 */

export const PROFESSIONALS = [
  {
    id: "renzo-tais",
    nombre: "Dr. Renzo Tais",
    es_profesional: true,
    tipo: "Profesional independiente",
    especialidad_principal: "Medicina Estética",
    descripcion: "Atención profesional en medicina estética en Providencia.",
    imagen_url: "/renzo.png",
    ubicacion: "Providencia, Santiago de Chile",
    ciudad: "Santiago de Chile",
    region: "Metropolitana",
    comuna: "Providencia",
    direccion: "Cenco Costanera, Providencia, Santiago de Chile",
    lat: -33.41799347340237,
    lng: -70.60896502431049,
    url_mapa: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3330.201391795329!2d-70.60896502431049!3d-33.41799347340237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cf69d4854951%3A0x9a87ef2fefaad0df!2sCenco%20Costanera!5e0!3m2!1ses-419!2scl!4v1781367940889!5m2!1ses-419!2scl",
    url_contacto: "https://renzo.agendaclinicas.cl",
    sitio_web: "https://renzo.agendaclinicas.cl",
    modalidad_atencion: "Presencial",
    disponible: true,
    activo: true,
    especialidades: ["Medicina estética", "Evaluación estética", "Atención personalizada"],
    resenas: [],
  },
];
