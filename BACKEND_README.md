# Medify — Esquema de Base de Datos para Backend Java

Este documento define las tablas sugeridas para el backend Java (Spring Boot / JPA)
que alimentará el marketplace, el dashboard de administración y el formulario `/unirse`.

---

## Tablas

### 1. `profesionales` — Perfiles del marketplace

> Todos los campos en español para alinearse con el frontend y facilitar la integración.

```sql
CREATE TABLE profesionales (
  id                       VARCHAR(100)  PRIMARY KEY,       -- slug URL: "dennis-beltran"
  nombre                   VARCHAR(150)  NOT NULL,
  especialidad_principal   VARCHAR(100)  NOT NULL,

  -- Estadísticas (calculadas en el backend)
  calificacion             DECIMAL(3,1)  DEFAULT 0.0,       -- promedio de reseñas (1.0-5.0)
  total_resenas            INT           DEFAULT 0,

  -- Descripción
  descripcion              TEXT,                             -- bio corto (marketplace)
  biografia                TEXT,                             -- bio completo (perfil)

  -- Imagen
  imagen_url               VARCHAR(500),                     -- URL de Cloudflare Images

  -- Tipo de cuenta
  tipo                     ENUM('Profesional de salud','Clínica','Centro médico') DEFAULT 'Profesional de salud',

  -- Ubicación
  ubicacion                VARCHAR(150),                     -- texto libre (Ej: "Chillán")
  region                   VARCHAR(100),
  comuna                   VARCHAR(100),
  direccion                VARCHAR(300),                     -- dirección exacta para el mapa
  lat                      DECIMAL(10,7),                    -- latitud para Leaflet/OpenStreetMap
  lng                      DECIMAL(10,7),                    -- longitud para Leaflet/OpenStreetMap
  url_mapa                 VARCHAR(500),                     -- Google Maps embed URL (legacy, usar lat/lng)

  -- Contacto
  correo                   VARCHAR(150),
  telefono                 VARCHAR(30),
  numero_whatsapp          VARCHAR(30),                      -- sin + ni espacios (para wa.me)
  sitio_web                VARCHAR(500),                     -- link agenda clínica (botón "Agendar hora")

  -- Práctica
  disponibilidad           VARCHAR(200),                     -- Ej: "Lun-Vie 9-18h"
  modalidad_atencion       ENUM('Online','Presencial','Ambas') DEFAULT 'Online',
  anos_experiencia         INT,
  precio_sesion            INT,                              -- en CLP

  -- Estado
  disponible               BOOLEAN       DEFAULT TRUE,       -- acepta nuevos pacientes
  activo                   BOOLEAN       DEFAULT TRUE,       -- visible en el marketplace

  -- Redes sociales (nombres de marca, en inglés)
  instagram                VARCHAR(200),
  facebook                 VARCHAR(200),
  linkedin                 VARCHAR(200),
  twitter                  VARCHAR(200),

  -- Auth (Clerk)
  clerk_user_id            VARCHAR(200)  UNIQUE,            -- ID del usuario en Clerk
  rut                      VARCHAR(15)   UNIQUE,            -- RUT chileno (identificador único)

  -- Relación con plan
  plan_id                  INT,                              -- FK → planes.id

  -- Timestamps
  creado_en                TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  actualizado_en           TIMESTAMP     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 2. `centros` — Clínicas y Centros Médicos

> Instituciones que se registran como "Clínica" o "Centro médico" en el formulario `/unirse` o son ingresadas manualmente desde `/dashboard/centros`.

```sql
CREATE TABLE centros (
  id                   VARCHAR(100)  PRIMARY KEY,       -- slug URL: "centro-medico-providencia"
  tipo                 ENUM('Clínica','Centro Médico','Centro de Rehabilitación','Centro Psicológico','Otro') NOT NULL,
  categoria            VARCHAR(150),                     -- Ej: "Salud Integral", "Clínica Dental"

  -- Datos institucionales
  nombre               VARCHAR(200)  NOT NULL,
  descripcion          TEXT,
  imagen_url           VARCHAR(500),                     -- URL de Cloudflare Images (logo o foto)

  -- Ubicación
  ubicacion            VARCHAR(150),                     -- texto libre (Ej: "Providencia, Santiago")
  region               VARCHAR(100),
  comuna               VARCHAR(100),
  direccion            VARCHAR(300),
  lat                  DECIMAL(10,7),                    -- latitud para Leaflet
  lng                  DECIMAL(10,7),                    -- longitud para Leaflet

  -- Contacto
  correo               VARCHAR(150),
  telefono             VARCHAR(30),
  numero_whatsapp      VARCHAR(30),
  sitio_web            VARCHAR(500),                     -- link agenda clínica (botón "Agendar hora")

  -- Práctica
  modalidad_atencion   ENUM('Presencial','Online','Ambas') DEFAULT 'Presencial',
  profesionales_count  INT           DEFAULT 0,          -- n° de profesionales en el centro

  -- Estado
  disponible           BOOLEAN       DEFAULT TRUE,       -- visible en el marketplace
  activo               BOOLEAN       DEFAULT TRUE,

  -- Relación con plan
  plan_id              INT,                              -- FK → planes.id (Corporativo/Enterprise)

  -- Auth (Clerk del administrador del centro)
  clerk_user_id        VARCHAR(200)  UNIQUE,
  rut                  VARCHAR(15),                      -- RUT de la institución o representante

  -- Timestamps
  creado_en            TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  actualizado_en       TIMESTAMP     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (plan_id) REFERENCES planes(id)
);
```

### 3. `centros_especialidades` — Especialidades ofrecidas por un centro

```sql
CREATE TABLE centros_especialidades (
  id          INT          AUTO_INCREMENT PRIMARY KEY,
  centro_id   VARCHAR(100) NOT NULL,
  nombre      VARCHAR(100) NOT NULL,
  FOREIGN KEY (centro_id) REFERENCES centros(id) ON DELETE CASCADE
);
```

### 4. `especialidades_profesional` — Tags de especialidad por profesional

```sql
CREATE TABLE especialidades_profesional (
  id                INT          AUTO_INCREMENT PRIMARY KEY,
  profesional_id    VARCHAR(100) NOT NULL,             -- FK → profesionales.id
  nombre            VARCHAR(100) NOT NULL,             -- Ej: "Terapia cognitivo-conductual"
  FOREIGN KEY (profesional_id) REFERENCES profesionales(id) ON DELETE CASCADE
);
```

### 5. `planes` — Planes y precios

> Planes disponibles por segmento. Los cambios de precio se administran desde `/dashboard/planes` y deben sincronizarse con Mercado Pago.

| id | nombre | tipo | precio_clp | flujo | para quién |
|---|---|---|---|---|---|
| esencial | Esencial | individual | 2.990 | pago_mp | Profesionales inicio |
| profesional | Profesional | individual | 19.990 | pago_mp | Profesionales con agenda |
| avanzado | Avanzado | individual | 26.990 | pago_mp | Profesionales máximo control |
| vitrina-clinica | Vitrina Clínica | corporativo | 5.990 | pago_mp | Clínicas solo visibilidad |
| corporativo | Corporativo | corporativo | 79.900 | email | Clínicas con gestión completa |
| enterprise | Enterprise | corporativo | 0 | email | Instituciones grandes (a cotizar) |

```sql
CREATE TABLE planes (
  id                    INT          AUTO_INCREMENT PRIMARY KEY,
  nombre                VARCHAR(100) NOT NULL,          -- "Esencial", "Vitrina Clínica", etc.
  tipo                  ENUM('individual','corporativo') DEFAULT 'individual',
  precio_clp            INT          NOT NULL DEFAULT 0,
  periodo_facturacion   VARCHAR(50),                    -- "/mes + IVA", "Gratis", "A cotizar"
  descripcion           TEXT,
  flujo                 ENUM('pago','wsp','email')       DEFAULT 'wsp',
  mercadopago_plan_id   VARCHAR(200),                   -- ID del preapproval_plan en MP
  mercadopago_url       VARCHAR(500),                   -- URL completa de checkout MP
  activo                BOOLEAN      DEFAULT TRUE,
  creado_en             TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  actualizado_en        TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 4. `caracteristicas_plan` — Features de cada plan

```sql
CREATE TABLE caracteristicas_plan (
  id            INT          AUTO_INCREMENT PRIMARY KEY,
  plan_id       INT          NOT NULL,                  -- FK → planes.id
  descripcion   VARCHAR(300) NOT NULL,
  orden         INT          DEFAULT 0,
  FOREIGN KEY (plan_id) REFERENCES planes(id) ON DELETE CASCADE
);
```

### 5. `suscripciones` — Suscripciones activas de profesionales

```sql
CREATE TABLE suscripciones (
  id                        VARCHAR(100)  PRIMARY KEY,   -- UUID
  profesional_id            VARCHAR(100)  NOT NULL,      -- FK → profesionales.id
  plan_id                   INT           NOT NULL,      -- FK → planes.id
  estado                    ENUM('pendiente','activa','inactiva','cancelada') DEFAULT 'pendiente',
  mercadopago_pago_id       VARCHAR(200),                -- ID del pago en MP
  mercadopago_pagador_id    VARCHAR(200),
  fecha_inicio              DATE,
  fecha_fin                 DATE,
  creado_en                 TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  actualizado_en            TIMESTAMP     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (profesional_id) REFERENCES profesionales(id),
  FOREIGN KEY (plan_id)        REFERENCES planes(id)
);
```

### 6. `resenas` — Reseñas de pacientes

```sql
CREATE TABLE resenas (
  id               INT          AUTO_INCREMENT PRIMARY KEY,
  profesional_id   VARCHAR(100) NOT NULL,               -- FK → profesionales.id
  autor            VARCHAR(100) NOT NULL,               -- nombre del paciente
  calificacion     INT          NOT NULL,               -- 1 a 5
  comentario       TEXT,
  fecha            DATE         DEFAULT (CURRENT_DATE),
  creado_en        TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (profesional_id) REFERENCES profesionales(id) ON DELETE CASCADE
);
-- Trigger para actualizar calificacion y total_resenas en profesionales al insertar reseña
```

### 7. `solicitudes_ingreso` — Solicitudes del formulario `/unirse`

Todos los campos que llena el profesional en el formulario multi-step.

```sql
CREATE TABLE solicitudes_ingreso (
  id                VARCHAR(100)  PRIMARY KEY,         -- UUID
  -- Paso 1: Plan
  plan_id           INT,                               -- FK → planes.id
  -- Paso 2: Datos básicos
  nombre            VARCHAR(150)  NOT NULL,
  especialidad      VARCHAR(100),
  especialidad_otra VARCHAR(100),                      -- cuando eligió "Otra"
  region            VARCHAR(100),
  comuna            VARCHAR(100),
  modalidad         ENUM('Online','Presencial','Ambas'),
  -- Paso 3: Práctica
  years_experience  INT,
  price_per_session INT,
  availability      VARCHAR(200),
  descripcion       TEXT,                              -- bio corto
  bio               TEXT,                              -- bio completo
  enfoques          TEXT,                              -- separados por coma
  -- Paso 4: Contacto
  email             VARCHAR(150)  NOT NULL,
  whatsapp          VARCHAR(30),
  sitio_web         VARCHAR(500),                      -- agenda clínica
  -- Credenciales (Clerk)
  rut               VARCHAR(15)  NOT NULL,
  password_hash     VARCHAR(500),                      -- Clerk maneja el hash, no almacenar en texto plano
  -- Redes sociales
  instagram         VARCHAR(200),
  facebook          VARCHAR(200),
  linkedin          VARCHAR(200),
  twitter           VARCHAR(200),
  -- Estado de la solicitud
  estado            ENUM('pendiente','aprobada','rechazada','pagada') DEFAULT 'pendiente',
  notas             TEXT,                              -- notas del equipo
  creado_en         TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  actualizado_en    TIMESTAMP     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (plan_id) REFERENCES planes(id)
);
```

### 8. `usuarios_admin` — Usuarios del dashboard admin (Clerk)

```sql
CREATE TABLE usuarios_admin (
  id              VARCHAR(100) PRIMARY KEY,             -- clerk_user_id
  correo          VARCHAR(150) NOT NULL UNIQUE,
  nombre          VARCHAR(150),
  rol             ENUM('superadmin','admin','visor') DEFAULT 'admin',
  activo          BOOLEAN      DEFAULT TRUE,
  ultimo_acceso   TIMESTAMP,
  creado_en       TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);
```

---

## Relaciones

```
profesionales       ──< especialidades_profesional
profesionales       ──> planes              (via plan_id)
profesionales       ──< suscripciones
profesionales       ──< resenas
centros             ──< centros_especialidades
centros             ──> planes              (via plan_id)
suscripciones       ──> planes
solicitudes_ingreso ──> planes
```

---

## Flujo de activación de perfil (Mercado Pago)

```
1. Profesional completa /unirse → se crea join_request (status: pending)
2. Se redirige a Mercado Pago checkout (pagoUrl del plan)
3. MP webhook → POST /api/payments/webhook
   - Verifica pago
   - Actualiza join_request.status = 'paid'
   - Crea registro en professionals (is_active = true)
   - Crea registro en subscriptions (status: active)
   - Redirige a /marketplace/{id} (back_url de MP)
4. Para plan Clínica → join_request.status permanece 'pending' hasta aprobación manual
```

---

## Campos del formulario `/unirse` mapeados a la DB

| Campo frontend       | Columna DB                    | Tabla           |
|----------------------|-------------------------------|-----------------|
| planId               | plan_id                       | join_requests   |
| form.nombre          | nombre                        | join_requests   |
| form.especialidad    | especialidad / especialidad_otra | join_requests |
| form.region          | region                        | join_requests   |
| form.comuna          | comuna                        | join_requests   |
| form.modalidad       | modalidad                     | join_requests   |
| form.experiencia     | years_experience              | join_requests   |
| form.precio          | price_per_session             | join_requests   |
| form.disponibilidad  | availability                  | join_requests   |
| form.descripcion     | descripcion                   | join_requests   |
| form.bio             | bio                           | join_requests   |
| form.enfoques        | enfoques                      | join_requests   |
| form.email           | email                         | join_requests   |
| form.whatsapp        | whatsapp                      | join_requests   |
| form.sitioWeb        | sitio_web / agenda_url        | join_requests + professionals |

---

## Endpoints sugeridos (Spring Boot)

```
# Profesionales (público)
GET    /api/profesionales              → lista activos para marketplace (filtros: tipo, ciudad, modalidad, especialidad)
GET    /api/profesionales/{id}         → perfil individual
GET    /api/especialidades/conteo      → conteo de profesionales por especialidad (para cards del marketplace)

# Profesionales (admin)
GET    /api/admin/profesionales        → todos (incluye inactivos)
POST   /api/admin/profesionales        → crear
PUT    /api/admin/profesionales/{id}   → editar
DELETE /api/admin/profesionales/{id}   → eliminar
PATCH  /api/admin/profesionales/{id}/toggle → activar/desactivar

# Centros y Clínicas (público)
GET    /api/centros                    → lista activos para marketplace
GET    /api/centros/{id}               → perfil del centro

# Centros y Clínicas (admin)
GET    /api/admin/centros              → todos
POST   /api/admin/centros              → crear
PUT    /api/admin/centros/{id}         → editar
DELETE /api/admin/centros/{id}         → eliminar
PATCH  /api/admin/centros/{id}/toggle  → activar/desactivar

# Planes (admin)
GET    /api/admin/planes               → listar
PUT    /api/admin/planes/{id}          → editar precio, features, pagoUrl

# Solicitudes de ingreso
POST   /api/solicitudes                → crear desde /unirse (profesionales y centros)
GET    /api/admin/solicitudes          → listar (admin)
PATCH  /api/admin/solicitudes/{id}/estado → aprobar/rechazar

# Reseñas
GET    /api/resenas/{profesional_id}   → listar reseñas de un profesional
POST   /api/resenas/{profesional_id}   → crear reseña (paciente)

# Pagos
POST   /api/pagos/webhook              → webhook de Mercado Pago
```

---

## Autenticación del profesional (RUT + Clerk)

El profesional se registra con RUT + contraseña desde `/unirse`. El RUT actúa como identificador único en Chile.

**Flujo de registro:**
```
1. Profesional completa /unirse con RUT + password
2. Backend crea el usuario en Clerk con email como identificador
3. El RUT se almacena en professionals.rut (único, validado con módulo 11)
4. Clerk devuelve clerk_user_id → se guarda en professionals.clerk_user_id
5. El profesional puede ingresar a /acceso con RUT + password
```

**Flujo de login (/acceso):**
```
1. Profesional ingresa RUT + password
2. Backend busca el profesional por RUT → obtiene email
3. Clerk valida email + password → devuelve token JWT
4. Frontend guarda el token → accede a /mi-perfil
5. Middleware verifica token en cada ruta /mi-perfil/**
```

**Validación de RUT (módulo 11):**
```javascript
// Lógica ya implementada en frontend (unirse/page.jsx y acceso/page.jsx)
// El backend debe replicar esta validación antes de persistir
function validateRUT(rut) {
  const body = rut.slice(0, -1);
  const dv = rut.slice(-1).toUpperCase();
  let sum = 0, multiplier = 2;
  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body[i]) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }
  const rem = 11 - (sum % 11);
  const expected = rem === 11 ? '0' : rem === 10 ? 'K' : String(rem);
  return expected === dv;
}
```

**Endpoints adicionales para el profesional:**
```
POST   /api/auth/register           → crea usuario Clerk + professional record
POST   /api/auth/login              → valida RUT+password, devuelve token
GET    /api/professionals/me        → datos del profesional autenticado
PUT    /api/professionals/me        → actualiza su propio perfil (incluyendo redes sociales)
```

## Integración con Clerk (auth del dashboard)

Cuando se integre Clerk:
1. Agregar middleware de Next.js que proteja `/dashboard/**`
2. El `clerk_user_id` se guarda en `admin_users.id`
3. Los endpoints `/api/admin/**` requieren header `Authorization: Bearer {clerk_token}`
4. Spring Boot valida el token contra la API pública de Clerk

---

## Email de confirmación post-pago

El backend envía automáticamente un correo al profesional cuando Mercado Pago confirma el pago (webhook). Para planes corporativos se envía manualmente.

**Trigger:** `POST /api/payments/webhook` → pago confirmado → `sendConfirmationEmail(professional)`

**Destinatario:** `professionals.email` (capturado en el formulario `/unirse`)

**Asunto:** `Tu perfil en Red Medify está activo — Bienvenido/a, {nombre}`

**Contenido del correo:**

```
Hola {nombre},

Tu perfil en Red Medify ya está activo. A partir de ahora los pacientes 
pueden encontrarte en el marketplace.

━━━━━━━━━━━━━━━━━━━━━━━━
RESUMEN DE TU SUSCRIPCIÓN
━━━━━━━━━━━━━━━━━━━━━━━━
Profesional:  {nombre}
Especialidad: {especialidad}
Plan:         {plan.nombre} — {plan.precio}{plan.periodo}
Fecha:        {fecha_activacion}
━━━━━━━━━━━━━━━━━━━━━━━━

Para editar tu perfil, cambiar tu foto, agregar redes sociales 
o actualizar tus datos, ingresa a tu panel:

→ Acceder a mi perfil: https://www.medifyclinic.cl/acceso

Tus credenciales de acceso son:
  • RUT: {rut}
  • Contraseña: la que elegiste al registrarte

Si tienes alguna consulta escríbenos a ventas@medify.cl
o por WhatsApp: +56 9 9174 9964.

Equipo Medify
https://www.medifyclinic.cl
```

**Servicio de email recomendado:** Resend (resend.com) o SendGrid — integración simple con Spring Boot via REST API.

**Dependencia Java (Resend):**
```xml
<!-- pom.xml -->
<dependency>
  <groupId>com.resend</groupId>
  <artifactId>resend-java</artifactId>
  <version>3.0.0</version>
</dependency>
```

**Variables de entorno necesarias:**
```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxx
EMAIL_FROM=noreply@medifyclinic.cl
SITE_URL=https://www.medifyclinic.cl
```

**Para planes corporativos:** el equipo envía el correo manualmente una vez coordinada la activación.

---

## Notas de implementación

- `agenda_url` es el campo crítico para el botón "Agendar hora" del perfil → debe ser editable desde el dashboard
- `mercadopago_plan_id` debe obtenerse desde el dashboard de MP al crear la suscripción
- El campo `back_url` en MP debe apuntar a `/bienvenido?professional_id={id}` para redirigir post-pago
- El webhook de MP debe ejecutarse en segundo plano (async) para no bloquear la respuesta
