# Medify — Esquema de Base de Datos para Backend Java

Este documento define las tablas sugeridas para el backend Java (Spring Boot / JPA)
que alimentará el marketplace, el dashboard de administración y el formulario `/unirse`.

---

## Tablas

### 1. `professionals` — Perfiles del marketplace

```sql
CREATE TABLE professionals (
  id                VARCHAR(100)  PRIMARY KEY,          -- slug: "dennis-beltran"
  name              VARCHAR(150)  NOT NULL,
  role              VARCHAR(100)  NOT NULL,             -- especialidad principal
  region            VARCHAR(100),
  comuna            VARCHAR(100),
  location          VARCHAR(150),                       -- texto libre (Ej: "Chillán")
  modalidad         ENUM('Online','Presencial','Ambas') DEFAULT 'Online',
  description       TEXT,                               -- bio corto (marketplace)
  full_bio          TEXT,                               -- bio completo (perfil)
  image_url         VARCHAR(500),
  email             VARCHAR(150),
  phone             VARCHAR(30),
  whatsapp_number   VARCHAR(30),
  agenda_url        VARCHAR(500),                       -- link agenda clínica (botón "Agendar hora")
  personal_website  VARCHAR(500),
  availability      VARCHAR(200),                       -- Ej: "Lun-Vie 9-18h"
  years_experience  INT,
  price_per_session INT,                                -- en CLP
  rating            DECIMAL(3,1)  DEFAULT 0.0,
  review_count      INT           DEFAULT 0,
  is_available      BOOLEAN       DEFAULT TRUE,
  is_active         BOOLEAN       DEFAULT TRUE,         -- visible en marketplace
  plan_id           INT,                                -- FK → plans.id
  created_at        TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  updated_at        TIMESTAMP     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 2. `professional_specialties` — Tags de especialidad por profesional

```sql
CREATE TABLE professional_specialties (
  id              INT          AUTO_INCREMENT PRIMARY KEY,
  professional_id VARCHAR(100) NOT NULL,               -- FK → professionals.id
  name            VARCHAR(100) NOT NULL,               -- Ej: "Terapia cognitivo-conductual"
  FOREIGN KEY (professional_id) REFERENCES professionals(id) ON DELETE CASCADE
);
```

### 3. `plans` — Planes y precios

```sql
CREATE TABLE plans (
  id                    INT          AUTO_INCREMENT PRIMARY KEY,
  name                  VARCHAR(100) NOT NULL,          -- "Esencial", "Profesional", etc.
  type                  ENUM('individual','corporativo') DEFAULT 'individual',
  price_clp             INT          NOT NULL DEFAULT 0,
  billing_period        VARCHAR(50),                    -- "/mes + IVA", "Gratis", "A cotizar"
  description           TEXT,
  flujo                 ENUM('pago','wsp','email')       DEFAULT 'wsp',
  mercadopago_plan_id   VARCHAR(200),                   -- ID del preapproval_plan en MP
  mercadopago_url       VARCHAR(500),                   -- URL completa de checkout MP
  is_active             BOOLEAN      DEFAULT TRUE,
  created_at            TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  updated_at            TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 4. `plan_features` — Features de cada plan

```sql
CREATE TABLE plan_features (
  id          INT          AUTO_INCREMENT PRIMARY KEY,
  plan_id     INT          NOT NULL,                   -- FK → plans.id
  description VARCHAR(300) NOT NULL,
  sort_order  INT          DEFAULT 0,
  FOREIGN KEY (plan_id) REFERENCES plans(id) ON DELETE CASCADE
);
```

### 5. `subscriptions` — Suscripciones activas de profesionales

```sql
CREATE TABLE subscriptions (
  id                      VARCHAR(100)  PRIMARY KEY,   -- UUID
  professional_id         VARCHAR(100)  NOT NULL,      -- FK → professionals.id
  plan_id                 INT           NOT NULL,      -- FK → plans.id
  status                  ENUM('pending','active','inactive','cancelled') DEFAULT 'pending',
  mercadopago_payment_id  VARCHAR(200),                -- ID del pago en MP
  mercadopago_payer_id    VARCHAR(200),
  start_date              DATE,
  end_date                DATE,
  created_at              TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  updated_at              TIMESTAMP     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (professional_id) REFERENCES professionals(id),
  FOREIGN KEY (plan_id)         REFERENCES plans(id)
);
```

### 6. `join_requests` — Solicitudes del formulario `/unirse`

Todos los campos que llena el profesional en el formulario multi-step.

```sql
CREATE TABLE join_requests (
  id                VARCHAR(100)  PRIMARY KEY,         -- UUID
  -- Paso 1: Plan
  plan_id           INT,                               -- FK → plans.id
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
  -- Estado
  status            ENUM('pending','approved','rejected','paid') DEFAULT 'pending',
  notes             TEXT,                              -- notas del equipo
  created_at        TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  updated_at        TIMESTAMP     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (plan_id) REFERENCES plans(id)
);
```

### 7. `admin_users` — Usuarios del dashboard (Clerk luego)

```sql
CREATE TABLE admin_users (
  id            VARCHAR(100) PRIMARY KEY,              -- clerk_user_id
  email         VARCHAR(150) NOT NULL UNIQUE,
  name          VARCHAR(150),
  role          ENUM('superadmin','admin','viewer') DEFAULT 'admin',
  is_active     BOOLEAN      DEFAULT TRUE,
  last_login    TIMESTAMP,
  created_at    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);
```

---

## Relaciones

```
professionals  ──< professional_specialties
professionals  ──> plans            (via plan_id)
professionals  ──< subscriptions
subscriptions  ──> plans
join_requests  ──> plans
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
GET    /api/professionals              → lista activos para marketplace
GET    /api/professionals/{id}         → perfil individual

# Profesionales (admin)
GET    /api/admin/professionals        → todos (incluye inactivos)
POST   /api/admin/professionals        → crear
PUT    /api/admin/professionals/{id}   → editar (incluye agendaUrl)
DELETE /api/admin/professionals/{id}   → eliminar
PATCH  /api/admin/professionals/{id}/toggle → activar/desactivar

# Planes (admin)
GET    /api/admin/plans                → listar
PUT    /api/admin/plans/{id}           → editar precio, features, pagoUrl

# Solicitudes
POST   /api/join-requests              → crear desde /unirse
GET    /api/admin/join-requests        → listar (admin)
PATCH  /api/admin/join-requests/{id}/status → aprobar/rechazar

# Pagos
POST   /api/payments/webhook           → webhook de Mercado Pago
```

---

## Integración con Clerk (auth del dashboard)

Cuando se integre Clerk:
1. Agregar middleware de Next.js que proteja `/dashboard/**`
2. El `clerk_user_id` se guarda en `admin_users.id`
3. Los endpoints `/api/admin/**` requieren header `Authorization: Bearer {clerk_token}`
4. Spring Boot valida el token contra la API pública de Clerk

---

## Notas de implementación

- `agenda_url` es el campo crítico para el botón "Agendar hora" del perfil → debe ser editable desde el dashboard
- `mercadopago_plan_id` debe obtenerse desde el dashboard de MP al crear la suscripción
- El campo `back_url` en MP debe apuntar a `/bienvenido?professional_id={id}` para redirigir post-pago
- El webhook de MP debe ejecutarse en segundo plano (async) para no bloquear la respuesta
