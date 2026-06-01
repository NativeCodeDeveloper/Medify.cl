# Medify — Guía de Integración Backend Java

Esta guía es para el desarrollador backend (Spring Boot / Java) que conectará el frontend Next.js a la base de datos y servicios externos.

---

## Stack tecnológico del backend

| Componente | Tecnología |
|---|---|
| Framework | Spring Boot 3.x |
| ORM | Spring Data JPA + Hibernate |
| Base de datos | MySQL 8.x |
| Autenticación | Clerk |
| Almacenamiento de imágenes | Cloudflare Images |
| Correo electrónico | Resend |
| Pagos | Mercado Pago |

---

## Estructura del proyecto Java

```
medify-backend/
├── src/main/java/cl/medify/
│   ├── MedifyApplication.java
│   ├── config/
│   │   ├── CorsConfig.java           ← Configurar CORS para el frontend Next.js
│   │   ├── SecurityConfig.java       ← Proteger endpoints de admin con Clerk
│   │   └── ClerkConfig.java
│   ├── model/                        ← Entidades JPA (una por tabla)
│   │   ├── Profesional.java
│   │   ├── Plan.java
│   │   ├── Suscripcion.java
│   │   ├── SolicitudIngreso.java
│   │   ├── Resena.java
│   │   └── UsuarioAdmin.java
│   ├── repository/                   ← Interfaces JPA Repository
│   │   ├── ProfesionalRepository.java
│   │   ├── PlanRepository.java
│   │   └── ResenaRepository.java
│   ├── service/                      ← Lógica de negocio
│   │   ├── ProfesionalService.java
│   │   ├── PagoService.java          ← Lógica de Mercado Pago
│   │   ├── EmailService.java         ← Envío de correos con Resend
│   │   └── ImagenService.java        ← Upload a Cloudflare Images
│   └── controller/                   ← Endpoints REST
│       ├── ProfesionalController.java
│       ├── PlanController.java
│       ├── ResenaController.java
│       ├── SolicitudController.java
│       └── PagoController.java
├── src/main/resources/
│   └── application.properties        ← Variables de entorno
└── pom.xml
```

---

## Variables de entorno (`application.properties`)

```properties
# Base de datos
spring.datasource.url=jdbc:mysql://localhost:3306/medify_db
spring.datasource.username=${DB_USUARIO}
spring.datasource.password=${DB_CONTRASENA}
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=false

# Clerk (autenticación profesionales y admin)
clerk.secret.key=${CLERK_SECRET_KEY}
clerk.publishable.key=${CLERK_PUBLISHABLE_KEY}

# Cloudflare Images (fotos de perfil)
cloudflare.account.id=${CF_ACCOUNT_ID}
cloudflare.images.token=${CF_IMAGES_TOKEN}
cloudflare.images.endpoint=https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/images/v1

# Resend (correo electrónico)
resend.api.key=${RESEND_API_KEY}
resend.from=noreply@medifyclinic.cl

# Mercado Pago
mercadopago.access.token=${MP_ACCESS_TOKEN}
mercadopago.webhook.secret=${MP_WEBHOOK_SECRET}

# URL del frontend (para CORS y links en emails)
frontend.url=https://www.medifyclinic.cl
```

---

## Configuración CORS

```java
// CorsConfig.java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Value("${frontend.url}")
    private String frontendUrl;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
            .allowedOrigins(frontendUrl, "http://localhost:3000")
            .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE")
            .allowedHeaders("*")
            .allowCredentials(true);
    }
}
```

---

## Entidades JPA principales

### Profesional.java

```java
@Entity
@Table(name = "profesionales")
public class Profesional {
    @Id
    private String id;                       // slug URL (ej: "dennis-beltran")

    private String nombre;
    private String especialidad_principal;

    private Double calificacion = 0.0;
    private Integer total_resenas = 0;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    @Column(columnDefinition = "TEXT")
    private String biografia;

    private String imagen_url;               // URL Cloudflare Images

    // Ubicación
    private String ubicacion;
    private String region;
    private String comuna;
    private String direccion;
    private String url_mapa;                 // Google Maps embed URL

    // Contacto
    private String correo;
    private String telefono;
    private String numero_whatsapp;
    private String sitio_web;               // Link agenda clínica (botón "Agendar hora")

    // Práctica
    private String disponibilidad;
    private String modalidad_atencion;       // Online | Presencial | Ambas
    private Integer anos_experiencia;
    private Integer precio_sesion;           // en CLP

    // Estado
    private Boolean disponible = true;
    private Boolean activo = true;

    // Redes sociales
    private String instagram;
    private String facebook;
    private String linkedin;
    private String twitter;

    // Auth (Clerk)
    @Column(unique = true)
    private String clerk_user_id;

    @Column(unique = true)
    private String rut;

    // Relaciones
    @ManyToOne
    @JoinColumn(name = "plan_id")
    private Plan plan;

    @OneToMany(mappedBy = "profesional", cascade = CascadeType.ALL)
    private List<EspecialidadTag> especialidades;

    @OneToMany(mappedBy = "profesional", cascade = CascadeType.ALL)
    private List<Resena> resenas;

    @Column(updatable = false)
    private LocalDateTime creado_en = LocalDateTime.now();
    private LocalDateTime actualizado_en = LocalDateTime.now();

    @PreUpdate
    public void preUpdate() { this.actualizado_en = LocalDateTime.now(); }
}
```

### Resena.java

```java
@Entity
@Table(name = "resenas")
public class Resena {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "profesional_id")
    private Profesional profesional;

    private String autor;
    private Integer calificacion;           // 1 a 5

    @Column(columnDefinition = "TEXT")
    private String comentario;

    private LocalDate fecha;

    @Column(updatable = false)
    private LocalDateTime creado_en = LocalDateTime.now();
}
```

---

## Endpoints REST — Referencia completa

### Profesionales (público)

```
GET  /api/profesionales
     → Lista todos los profesionales activos para el marketplace
     → Parámetros opcionales: ?especialidad=Psicología&region=Metropolitana&disponible=true
     → Responde: List<ProfesionalResumenDTO>

GET  /api/profesionales/{id}
     → Perfil completo de un profesional (incluye reseñas)
     → Responde: ProfesionalDetalleDTO
```

### Profesionales (admin — requiere Clerk token)

```
GET    /api/admin/profesionales          → Lista todos (incluye inactivos)
POST   /api/admin/profesionales          → Crear nuevo perfil
PUT    /api/admin/profesionales/{id}     → Editar perfil completo
PATCH  /api/admin/profesionales/{id}/estado → Activar/desactivar
DELETE /api/admin/profesionales/{id}     → Eliminar perfil
```

### Autenticación profesional

```
POST /api/auth/registro
     → Crea usuario en Clerk + registra profesional en BD
     → Body: { rut, contrasena, correo, nombre, ...datos del formulario /unirse }

POST /api/auth/acceso
     → Valida RUT + contraseña con Clerk
     → Responde: { token, profesional }

GET  /api/auth/yo
     → Devuelve datos del profesional autenticado (requiere token)
     → Usado por el dashboard /mi-perfil

PUT  /api/auth/yo
     → Actualiza datos del perfil propio
     → Body: datos editables del profesional
```

### Reseñas

```
GET  /api/resenas?profesional_id={id}
     → Lista reseñas de un profesional
     → Paginado: ?pagina=0&tamaño=10

POST /api/resenas
     → Crear nueva reseña
     → Body: { profesional_id, autor, calificacion, comentario }
     → Al crear: actualizar calificacion y total_resenas en profesionales
```

### Planes

```
GET  /api/planes                         → Lista planes activos (público)
GET  /api/admin/planes                   → Lista todos los planes (admin)
PUT  /api/admin/planes/{id}              → Editar plan (precio, features, url MP)
```

### Solicitudes de ingreso

```
POST /api/solicitudes
     → Crea solicitud desde /unirse
     → Body: todos los campos del formulario

GET  /api/admin/solicitudes             → Lista solicitudes (admin)
PATCH /api/admin/solicitudes/{id}/estado → Aprobar/rechazar
```

### Pagos (Mercado Pago)

```
POST /api/pagos/webhook
     → Webhook de confirmación de Mercado Pago
     → Al confirmar pago:
       1. Busca solicitud por profesional_id
       2. Crea perfil en profesionales (activo = true)
       3. Crea suscripción
       4. Envía correo de bienvenida con Resend
       5. Devuelve redirect URL al frontend
```

### Upload de imágenes (Cloudflare)

```
POST /api/imagenes/subir
     → Recibe multipart/form-data con la imagen
     → La sube a Cloudflare Images
     → Responde: { url: "https://imagedelivery.net/..." }
     → Esta URL se guarda en profesionales.imagen_url
```

---

## Flujo completo: registro de profesional

```
1. Frontend /unirse → POST /api/solicitudes
   Body: { rut, contrasena, correo, plan_id, nombre, ...resto del formulario }
   Backend:
   - Valida RUT (módulo 11)
   - Guarda en tabla solicitudes (estado: 'pendiente')

2. Según el plan:
   a) Plan individual → redirigir a Mercado Pago (pagoUrl del plan)
   b) Plan clínica → equipo lo gestiona manualmente por correo

3. MP confirma pago → POST /api/pagos/webhook
   Backend:
   - Verifica firma del webhook
   - Crea usuario en Clerk con correo + contraseña
   - Guarda clerk_user_id en solicitud
   - Crea registro en profesionales (activo: true)
   - Crea suscripción activa
   - Envía correo de bienvenida con Resend (incluye link a /acceso)
   - Redirige al profesional a /acceso

4. Profesional entra a /acceso
   Frontend → POST /api/auth/acceso { rut, contrasena }
   Backend:
   - Busca profesional por rut
   - Valida contra Clerk
   - Devuelve token JWT
   Frontend guarda token → accede a /mi-perfil

5. /mi-perfil edita datos
   Frontend → PUT /api/auth/yo { nombre, especialidad_principal, ... }
   Backend actualiza profesionales + recalcula calificación si hay reseñas nuevas
```

---

## Integración con Clerk

```java
// ClerkConfig.java
@Service
public class ClerkService {

    @Value("${clerk.secret.key}")
    private String secretKey;

    // Crear usuario al registrarse
    public String crearUsuario(String correo, String contrasena) {
        // POST https://api.clerk.com/v1/users
        // Headers: Authorization: Bearer {secretKey}
        // Body: { email_address: correo, password: contrasena }
        // Responde: { id: clerk_user_id }
    }

    // Validar token en cada request protegida
    public boolean validarToken(String token) {
        // Verificar JWT con la clave pública de Clerk
        // O usar el SDK oficial: clerk-backend-api
    }

    // Middleware para endpoints /api/admin/** y /api/auth/yo
    // Agregar @ClerkSecured en el controlador
}
```

---

## Integración con Resend (correo)

```java
// EmailService.java
@Service
public class EmailService {

    @Value("${resend.api.key}")
    private String apiKey;

    @Value("${resend.from}")
    private String from;

    @Value("${frontend.url}")
    private String frontendUrl;

    public void enviarCorreoBienvenida(Profesional profesional, Plan plan) {
        String asunto = "Tu perfil en Red Medify está activo — Bienvenido/a, " + profesional.getNombre();

        String cuerpo = """
            Hola %s,

            Tu perfil en Red Medify ya está activo.

            ─────────────────────────────
            RESUMEN DE TU SUSCRIPCIÓN
            ─────────────────────────────
            Plan: %s — %s
            Fecha: %s
            ─────────────────────────────

            Accede a tu panel para editar tu perfil:
            → %s/acceso

            Tus credenciales:
            • RUT: %s
            • Contraseña: la que elegiste al registrarte

            Equipo Medify
            """.formatted(
                profesional.getNombre(),
                plan.getNombre(), plan.getPrecioCLP(),
                LocalDate.now(),
                frontendUrl,
                profesional.getRut()
            );

        // POST https://api.resend.com/emails
        // Headers: Authorization: Bearer {apiKey}
        // Body: { from, to: profesional.getCorreo(), subject: asunto, text: cuerpo }
    }
}
```

---

## Integración con Cloudflare Images

```java
// ImagenService.java
@Service
public class ImagenService {

    @Value("${cloudflare.images.endpoint}")
    private String endpoint;

    @Value("${cloudflare.images.token}")
    private String token;

    public String subirImagen(MultipartFile archivo) throws IOException {
        // POST {endpoint}
        // Headers: Authorization: Bearer {token}
        // Body: multipart/form-data con el archivo
        // Responde: { result: { variants: ["https://imagedelivery.net/..."] } }
        // → guardar URL en profesionales.imagen_url
    }
}
```

---

## Integración con Mercado Pago

```java
// PagoService.java
@Service
public class PagoService {

    @Value("${mercadopago.webhook.secret}")
    private String webhookSecret;

    public void procesarWebhook(String payload, String firma) {
        // 1. Verificar firma HMAC con webhookSecret
        // 2. Parsear el payload JSON
        // 3. Si type == "payment" y status == "approved":
        //    a. Obtener profesional_id del metadata
        //    b. Crear cuenta Clerk
        //    c. Activar profesional en BD
        //    d. Crear suscripción
        //    e. Enviar correo con EmailService
    }
}
```

---

## Validación de RUT chileno (Java)

```java
// RutValidator.java
public class RutValidator {

    public static boolean validar(String rut) {
        String limpio = rut.replaceAll("[^0-9kK]", "").toUpperCase();
        if (limpio.length() < 8 || limpio.length() > 9) return false;

        String cuerpo = limpio.substring(0, limpio.length() - 1);
        char dv = limpio.charAt(limpio.length() - 1);

        int suma = 0;
        int multiplicador = 2;

        for (int i = cuerpo.length() - 1; i >= 0; i--) {
            suma += Character.getNumericValue(cuerpo.charAt(i)) * multiplicador;
            multiplicador = multiplicador == 7 ? 2 : multiplicador + 1;
        }

        int resto = 11 - (suma % 11);
        char esperado = resto == 11 ? '0' : resto == 10 ? 'K' : (char)('0' + resto);

        return dv == esperado;
    }

    // Formato visual: 12345678 → 12.345.678
    public static String formatear(String rut) {
        String limpio = rut.replaceAll("[^0-9kK]", "").toUpperCase();
        if (limpio.length() < 2) return limpio;
        String cuerpo = limpio.substring(0, limpio.length() - 1);
        String dv = limpio.substring(limpio.length() - 1);
        StringBuilder sb = new StringBuilder();
        for (int i = cuerpo.length() - 1, c = 0; i >= 0; i--, c++) {
            if (c > 0 && c % 3 == 0) sb.insert(0, ".");
            sb.insert(0, cuerpo.charAt(i));
        }
        return sb + "-" + dv;
    }
}
```

---

## DTOs sugeridos (respuestas de la API)

```java
// ProfesionalResumenDTO — para el listado del marketplace
record ProfesionalResumenDTO(
    String id,
    String nombre,
    String especialidad_principal,
    Double calificacion,
    Integer total_resenas,
    String descripcion,
    String imagen_url,
    String ubicacion,
    String modalidad_atencion,
    Integer precio_sesion,
    Boolean disponible
) {}

// ProfesionalDetalleDTO — para el perfil completo
record ProfesionalDetalleDTO(
    String id,
    String nombre,
    String especialidad_principal,
    Double calificacion,
    Integer total_resenas,
    String descripcion,
    String biografia,
    String imagen_url,
    String ubicacion,
    String region,
    String comuna,
    String direccion,
    String url_mapa,
    String correo,
    String numero_whatsapp,
    String sitio_web,
    String disponibilidad,
    String modalidad_atencion,
    Integer anos_experiencia,
    Integer precio_sesion,
    Boolean disponible,
    String instagram,
    String facebook,
    String linkedin,
    String twitter,
    List<String> especialidades,
    List<ResenaDTO> resenas
) {}

// ResenaDTO
record ResenaDTO(
    Long id,
    String autor,
    Integer calificacion,
    String comentario,
    LocalDate fecha
) {}
```

---

## Cómo conectar el frontend Next.js al backend

### 1. Variable de entorno en Next.js

```env
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8080
# En producción:
NEXT_PUBLIC_API_URL=https://api.medifyclinic.cl
```

### 2. Reemplazar los datos mock por llamadas a la API

Cada archivo que importa `PROFESSIONALS` de `professionals.js` deberá cambiarse. Ejemplo:

```jsx
// ANTES (mock)
import { PROFESSIONALS } from "../data/professionals";

// DESPUÉS (backend)
const [profesionales, setProfesionales] = useState([]);

useEffect(() => {
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profesionales`)
    .then(res => res.json())
    .then(data => setProfesionales(data));
}, []);
```

### 3. Archivos a actualizar al conectar el backend

| Archivo | Qué reemplazar |
|---|---|
| `marketplace/page.jsx` | Array `PROFESSIONALS` → `GET /api/profesionales` |
| `marketplace/[id]/page.jsx` | `PROFESSIONALS.find()` → `GET /api/profesionales/{id}` |
| `dashboard/page.jsx` | Datos del overview → `GET /api/admin/profesionales` |
| `dashboard/profesionales/page.jsx` | CRUD completo → endpoints `/api/admin/profesionales` |
| `dashboard/planes/page.jsx` | Planes → `GET /api/admin/planes` |
| `mi-perfil/page.jsx` | `DEMO_PRO` → `GET /api/auth/yo` |
| `marketplace/[id]/page.jsx` | Reseñas → `GET/POST /api/resenas` |

---

*Documento generado para el equipo de backend — Medify, Mayo 2026.*
