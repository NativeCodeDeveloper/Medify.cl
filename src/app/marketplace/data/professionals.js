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
  {
    id: "edentweiss-odontologia",
    nombre: "Odontología Edentweiss",
    es_profesional: false,
    tipo: "Consulta odontológica",
    especialidad_principal: "Odontología",
    descripcion: "Consulta odontológica especializada en servicios dentales.",
    imagen_url: "/odonto.jpg",
    ubicacion: "Las Condes, Santiago de Chile",
    ciudad: "Santiago de Chile",
    region: "Metropolitana",
    comuna: "Las Condes",
    direccion: "Av. Américo Vespucio Sur 1307, oficina 717, Las Condes",
    lat: -33.42603217339915,
    lng: -70.58012572431015,
    url_mapa: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.8930649216195!2d-70.58012572431015!3d-33.42603217339915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cf030666a421%3A0x6b9ba6631e5b701!2sAv.%20Am%C3%A9rico%20Vespucio%201307%2C%20of%20717%2C%207550465%20Las%20Condes%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses-419!2scl!4v1781368648101!5m2!1ses-419!2scl",
    url_contacto: "https://edentweiss.agendaclinicas.cl",
    sitio_web: "https://edentweiss.agendaclinicas.cl",
    modalidad_atencion: "Presencial",
    disponible: true,
    activo: true,
    especialidades: ["Servicios dentales", "Odontología general", "Atención odontológica"],
    resenas: [],
  },
  {
    id: "yeissis-hidalgo-jara",
    nombre: "Yeissis Hidalgo Jara",
    es_profesional: true,
    tipo: "Profesional independiente",
    especialidad_principal: "Masoterapeuta",
    descripcion: "Atención individual de masoterapia en Concepción.",
    imagen_url: "/terapeuta.jpg",
    ubicacion: "Concepción, Región del Biobío",
    ciudad: "Concepción",
    region: "Biobío",
    comuna: "Concepción",
    direccion: "O'Higgins 236, StudioWork, Concepción",
    lat: -36.82995012223869,
    lng: -73.05742582416025,
    url_mapa: "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3193.5229390022514!2d-73.05742582416025!3d-36.82995012223869!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sO%27higgins%20236%20concepci%C3%B3n%2C%20Studiowork.!5e0!3m2!1ses-419!2scl!4v1781368852821!5m2!1ses-419!2scl",
    url_contacto: "https://yeissis.angendaclinica.xyz",
    sitio_web: "https://yeissis.angendaclinica.xyz",
    modalidad_atencion: "Presencial",
    disponible: true,
    activo: true,
    especialidades: ["Masoterapia", "Masajes terapéuticos", "Bienestar corporal"],
    resenas: [],
  },
];
