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
    // ── Identificación ──────────────────────────────────────────────
    id: "dennis-beltran",                    // Slug único para la URL del perfil
    nombre: "Dennis Beltrán",
    especialidad_principal: "Psicóloga",

    // ── Estadísticas (calculadas en el backend) ─────────────────────
    calificacion: 4.9,                       // Promedio de reseñas (1.0 - 5.0)
    total_resenas: 220,                      // Cantidad total de reseñas recibidas

    // ── Descripción ─────────────────────────────────────────────────
    descripcion: "Psicóloga clínica especializada en terapia cognitivo-conductual.",
    biografia: "Soy psicóloga clínica, egresada de la Universidad del Desarrollo (UDD) – Concepción, con formación sólida y enfoque humano. Ofrezco atención en modalidad online, creando un espacio seguro y sin juicios para acompañarte en procesos de ansiedad, regulación emocional, autoestima y relaciones personales.\n\nTrabajo con herramientas terapéuticas adaptadas a tus necesidades, buscando cambios concretos y sostenibles. Cuento con valores promocionales, pensados para facilitar el acceso a tu cuidado emocional. Te invito a dar el primer paso hacia un bienestar más auténtico.",

    // ── Imagen ──────────────────────────────────────────────────────
    imagen_url: "/dennisbeltran.png",        // URL de Cloudflare Images en producción

    // ── Ubicación ───────────────────────────────────────────────────
    ubicacion: "Chillán",                    // Texto libre para el marketplace
    region: "Ñuble",
    comuna: "Chillán",
    direccion: "Av. Libertad 765, Chillán", // Dirección exacta para el mapa
    url_mapa: "https://maps.google.com/maps?q=Av.+Libertad+765,+Chillán,+Chile&output=embed",

    // ── Contacto ────────────────────────────────────────────────────
    correo: "dennisveltran@medify.cl",
    telefono: "+56 9 1234 5678",
    numero_whatsapp: "56912345678",         // Sin + ni espacios (formato para wa.me)

    // ── Práctica ────────────────────────────────────────────────────
    disponibilidad: "Lunes a Viernes, 08:00 - 19:00",
    sitio_web: "https://dennisbeltran.medifyclinic.cl", // Link agenda clínica (botón "Agendar hora")
    modalidad_atencion: "Online",            // Online | Presencial | Ambas
    anos_experiencia: 6,
    precio_sesion: 16000,                   // En CLP

    // ── Estado ──────────────────────────────────────────────────────
    disponible: true,                        // Si acepta nuevos pacientes
    activo: true,                            // Visible en el marketplace

    // ── Redes sociales (nombres de marca, se mantienen en inglés) ───
    instagram: "https://www.instagram.com/dennisbeltran.psicologa",
    facebook: "",
    linkedin: "https://www.linkedin.com/in/dennis-beltran",
    twitter: "",

    // ── Especialidades / enfoques ────────────────────────────────────
    especialidades: ["Terapia cognitivo-conductual", "Ansiedad", "Regulación emocional", "Autoestima"],

    // ── Reseñas de pacientes ─────────────────────────────────────────
    // TODO backend: GET /api/resenas?profesional_id=dennis-beltran
    resenas: [
      { id: 1, autor: "María G.", calificacion: 5, comentario: "Excelente profesional, muy empática y clara en sus explicaciones. La recomiendo completamente.", fecha: "2026-05-15" },
      { id: 2, autor: "Carlos P.", calificacion: 4, comentario: "Muy buena atención. El proceso fue muy productivo y me sentí escuchado.", fecha: "2026-05-10" },
      { id: 3, autor: "Ana R.", calificacion: 5, comentario: "Me ayudó muchísimo con mi proceso. Totalmente recomendada.", fecha: "2026-04-28" },
    ],
  },

  {
    id: "marcelo-vilches",
    nombre: "Marcelo Vilches",
    especialidad_principal: "Tecnólogo Médico",
    calificacion: 4.8,
    total_resenas: 203,
    descripcion: "Tecnólogo Médico especializado en morfofisiopatología y citodiagnóstico.",
    biografia: "Soy Tecnólogo Médico, mención Morfofisiopatología y Citodiagnóstico, titulado de la Universidad San Sebastián, con experiencia en hospitales públicos y clínicas privadas en el área de Anatomía Patológica. Actualmente me desempeño en el ámbito académico como encargado de laboratorio universitario para carreras de la salud, coordinando procesos técnicos, académicos y operativos.\n\nCuento con formación en gestión estratégica en salud, lo que me permite integrar una mirada clínica con visión organizacional y de mejora continua.",
    imagen_url: "/marcelovilches.png",
    ubicacion: "Chillán",
    region: "Ñuble",
    comuna: "Chillán",
    direccion: "",
    url_mapa: "",
    correo: "marcelo.vilches@medify.cl",
    telefono: "+56 9 8765 4321",
    numero_whatsapp: "56987654321",
    disponibilidad: "Lunes a Jueves, 14:00 - 20:00",
    sitio_web: "https://marcelovilches.cl",
    modalidad_atencion: "Presencial",
    anos_experiencia: 8,
    precio_sesion: 20000,
    disponible: true,
    activo: true,
    instagram: "",
    facebook: "",
    linkedin: "",
    twitter: "",
    especialidades: ["Atención técnica", "Anatomía", "Histología", "Fisiología", "Gestión en salud"],
    resenas: [],
  },

  {
    id: "cristian-becerra",
    nombre: "Cristian Becerra",
    especialidad_principal: "Medicina Complementaria",
    calificacion: 4.8,
    total_resenas: 322,
    descripcion: "Medicina Complementaria, especializado en Medicina Tradicional China, acupuntura y Reiki.",
    biografia: "Terapeuta en medicina complementaria, especializado en Medicina Tradicional China, acupuntura y Reiki. Máster en Medicina China Integrativa en Oncología, con enfoque integral en salud, bienestar y calidad de vida, combinando terapias energéticas, movimiento consciente y acompañamiento personalizado.",
    imagen_url: "/cristianbecerra.png",
    ubicacion: "Chillán",
    region: "Ñuble",
    comuna: "Chillán",
    direccion: "",
    url_mapa: "",
    correo: "cristian.becerra@medify.cl",
    telefono: "+56 9 8765 4321",
    numero_whatsapp: "56987654321",
    disponibilidad: "Lunes a Jueves, 08:00 - 20:00",
    sitio_web: "https://cristianbecerra.cl",
    modalidad_atencion: "Ambas",
    anos_experiencia: 10,
    precio_sesion: 30000,
    disponible: true,
    activo: true,
    instagram: "",
    facebook: "",
    linkedin: "",
    twitter: "",
    especialidades: ["Acupuntura", "Reiki", "Medicina tradicional china", "Oncología integrativa"],
    resenas: [],
  },

  {
    id: "javiera-carreno",
    nombre: "Javiera Carreño",
    especialidad_principal: "Enfermera",
    calificacion: 4.7,
    total_resenas: 267,
    descripcion: "Enfermera dedicada al cuidado de personas mayores.",
    biografia: "Enfermera enfocada en el cuidado integral de personas mayores, promoviendo autonomía, prevención de complicaciones y seguimiento continuo junto a sus familias y cuidadores.",
    imagen_url: "/doctores1.png",
    ubicacion: "Santiago",
    region: "Metropolitana",
    comuna: "Providencia",
    direccion: "",
    url_mapa: "",
    correo: "javiera.carreno@medify.cl",
    telefono: "+56 9 2233 4455",
    numero_whatsapp: "56922334455",
    disponibilidad: "Lunes a Viernes, 09:00 - 18:00",
    sitio_web: "https://javieracarreno.cl",
    modalidad_atencion: "Presencial",
    anos_experiencia: 4,
    precio_sesion: 36000,
    disponible: true,
    activo: true,
    instagram: "",
    facebook: "",
    linkedin: "",
    twitter: "",
    especialidades: ["Adulto mayor", "Curaciones", "Control crónico", "Educación en salud"],
    resenas: [],
  },

  {
    id: "daniel-munoz",
    nombre: "Daniel Muñoz",
    especialidad_principal: "Médico General",
    calificacion: 4.7,
    total_resenas: 200,
    descripcion: "Médico con experiencia en atención primaria integral.",
    biografia: "Médico general con experiencia en atención primaria, diagnóstico temprano y manejo integral de patologías frecuentes en adultos.",
    imagen_url: "/doctores1.png",
    ubicacion: "Valparaíso",
    region: "Valparaíso",
    comuna: "Valparaíso",
    direccion: "",
    url_mapa: "",
    correo: "daniel.munoz@medify.cl",
    telefono: "+56 9 3344 5566",
    numero_whatsapp: "56933445566",
    disponibilidad: "Lunes a Sábado, 10:00 - 19:00",
    sitio_web: "https://danielmunoz.cl",
    modalidad_atencion: "Ambas",
    anos_experiencia: 3,
    precio_sesion: 36000,
    disponible: true,
    activo: true,
    instagram: "",
    facebook: "",
    linkedin: "",
    twitter: "",
    especialidades: ["Atención primaria", "Medicina preventiva", "Salud familiar", "Chequeo general"],
    resenas: [],
  },

  {
    id: "pedro-suazo",
    nombre: "Pedro Suazo",
    especialidad_principal: "Psiquiatra",
    calificacion: 4.8,
    total_resenas: 215,
    descripcion: "Psiquiatra comprometido con el bienestar mental de sus pacientes.",
    biografia: "Psiquiatra con enfoque biopsicosocial, orientado al diagnóstico y tratamiento de trastornos del ánimo, ansiedad y estrés crónico.",
    imagen_url: "/doctores1.png",
    ubicacion: "Santiago",
    region: "Metropolitana",
    comuna: "Las Condes",
    direccion: "",
    url_mapa: "",
    correo: "pedro.suazo@medify.cl",
    telefono: "+56 9 4455 6677",
    numero_whatsapp: "56944556677",
    disponibilidad: "Martes a Sábado, 11:00 - 20:00",
    sitio_web: "https://pedrosuazo.cl",
    modalidad_atencion: "Online",
    anos_experiencia: 2,
    precio_sesion: 42000,
    disponible: true,
    activo: true,
    instagram: "",
    facebook: "",
    linkedin: "",
    twitter: "",
    especialidades: ["Trastornos del ánimo", "Ansiedad", "Psicofarmacología", "Salud mental adulta"],
    resenas: [],
  },

  {
    id: "carolina-flores",
    nombre: "Carolina Flores",
    especialidad_principal: "Psicopedagoga",
    calificacion: 4.7,
    total_resenas: 141,
    descripcion: "Apoyo psicopedagógico para mejorar el aprendizaje.",
    biografia: "Psicopedagoga especializada en evaluación y acompañamiento de dificultades de aprendizaje en niños, adolescentes y adultos jóvenes.",
    imagen_url: "/doctores1.png",
    ubicacion: "La Serena",
    region: "Coquimbo",
    comuna: "La Serena",
    direccion: "",
    url_mapa: "",
    correo: "carolina.flores@medify.cl",
    telefono: "+56 9 5566 7788",
    numero_whatsapp: "56955667788",
    disponibilidad: "Lunes a Viernes, 08:30 - 17:30",
    sitio_web: "https://carolinaflores.cl",
    modalidad_atencion: "Online",
    anos_experiencia: 5,
    precio_sesion: 35000,
    disponible: true,
    activo: true,
    instagram: "",
    facebook: "",
    linkedin: "",
    twitter: "",
    especialidades: ["Dificultades de aprendizaje", "Apoyo escolar", "Hábitos de estudio", "Evaluación psicopedagógica"],
    resenas: [],
  },
];
