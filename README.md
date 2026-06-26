# Plan: Plataforma de Regalos Automatizados

---

## Visión General

Plataforma web SaaS donde usuarios registran personas y fechas especiales, reciben recordatorios automáticos con sugerencias de regalo, y pueden comprar a través de la plataforma (que terceriza con proveedores).

---

## Stack Tecnológico

### Frontend
- **Framework:** Next.js 14 (App Router) — SSR/SSG, SEO, rutas de API incluidas
- **UI:** Tailwind CSS + shadcn/ui (componentes accesibles y rápidos de implementar)
- **Estado global:** Zustand (ligero, suficiente para este scope)
- **Formularios:** React Hook Form + Zod (validación tipada)
- **Pagos UI:** Stripe Elements (componentes de pago seguros, PCI-compliant)

### Backend
- **Runtime:** Node.js con Fastify (más rápido que Express, buen ecosystem)
- **ORM:** Prisma (tipado, migraciones, compatible con PostgreSQL)
- **Base de datos:** PostgreSQL (relacional, ideal para usuarios/relaciones/ocasiones)
- **Caché + colas:** Redis (sesiones, rate limiting, cola de trabajos)
- **Jobs/Scheduler:** BullMQ sobre Redis (para envío de emails programados)
- **Email:** Resend (API moderna) + React Email (plantillas)
- **Autenticación:** Auth.js v5 (antes NextAuth) — sesiones, OAuth, JWT
- **Pagos:** Stripe (checkout, webhooks, providers de pago)

### Infraestructura
- **Hosting:** Railway o Render (full-stack sencillo, PostgreSQL incluido)
- **Almacenamiento de imágenes:** Cloudflare R2 (fotos de perfil, productos)
- **Variables de entorno:** Doppler o `.env` bien gestionado
- **CI/CD:** GitHub Actions

---

## Arquitectura

```
Browser (Next.js)
    │
    ├── API Routes (Next.js) ──── Auth.js (sesiones)
    │
    └── Fastify API Server
            │
            ├── PostgreSQL (Prisma)
            ├── Redis (caché + BullMQ)
            └── Servicios externos:
                    ├── Stripe (pagos)
                    ├── Resend (emails)
                    └── APIs de proveedores de regalos
```

---

## Base de Datos — Esquema Principal

### Entidades y relaciones:

```
User
  ├── id, email, passwordHash, name, avatarUrl
  ├── stripeCustomerId
  ├── createdAt, updatedAt
  └── isVerified, isActive

Person  (personas registradas por el usuario)
  ├── id, userId (FK)
  ├── name, relationship (pareja/amigo/familiar/colega)
  ├── birthdate, photoUrl
  └── notes

Occasion  (fechas especiales de una persona)
  ├── id, personId (FK), userId (FK)
  ├── type (BIRTHDAY / ANNIVERSARY / CUSTOM)
  ├── date, recurringYearly (bool)
  ├── reminderDaysBefore (e.g. 7, 3, 1)
  └── isActive

Preference  (gustos de cada persona)
  ├── id, personId (FK)
  ├── category (tecnología/moda/libros/gastronomía/deportes...)
  ├── tags (array de strings)
  └── notes, priceRangeMin, priceRangeMax

GiftSuggestion  (sugerencias generadas para una ocasión)
  ├── id, occasionId (FK), userId (FK)
  ├── productId (FK a Product)
  ├── generatedAt, status (PENDING/VIEWED/PURCHASED/DISMISSED)

Product  (catálogo propio o de proveedores)
  ├── id, providerId (FK)
  ├── name, description, imageUrl
  ├── price, currency
  ├── category, tags
  └── externalProductId (ID en API del proveedor)

Provider  (proveedores tercerizados)
  ├── id, name, apiEndpoint
  ├── apiKey (encriptado)
  └── isActive

Order  (compra hecha por el usuario)
  ├── id, userId (FK), occasionId (FK), productId (FK)
  ├── stripePaymentIntentId, stripeSessionId
  ├── status (PENDING/PAID/PROCESSING/SHIPPED/DELIVERED/CANCELLED)
  ├── totalAmount, currency
  ├── recipientName, shippingAddress (JSON)
  └── createdAt, updatedAt

EmailLog  (registro de emails enviados)
  ├── id, userId (FK), ocasionId (FK)
  ├── type (REMINDER/SUGGESTION/ORDER_CONFIRMATION)
  ├── sentAt, status
```

---

## Módulos del Backend

### 1. Autenticación y Seguridad
- Registro con email/contraseña — bcrypt (12 rounds) para hash
- OAuth opcional: Google, Facebook
- JWT firmado + refresh tokens rotantes
- Email de verificación al registrar
- Rate limiting: 5 intentos de login por IP, luego backoff
- Sesiones en Redis con TTL
- HTTPS obligatorio, CORS estricto, headers de seguridad (Helmet)

### 2. Gestión de Personas y Ocasiones
- CRUD completo para `Person`, `Occasion`, `Preference`
- Validación de fechas (no puede ser en el pasado para ocasiones futuras)
- Lógica de recurrencia anual automática

### 3. Sistema de Recordatorios (Scheduler)
- Job diario corriendo a las 8am (hora del usuario o UTC)
- Consulta ocasiones cuya fecha - `reminderDaysBefore` = hoy
- Genera `GiftSuggestion` basada en `Preference` + catálogo
- Encola email en BullMQ
- Worker procesa y envía con Resend

### 4. Motor de Sugerencias de Regalos
- Primera versión: filtro por categoría + rango de precio de `Preference`
- Segunda versión (iteración futura): scoring con embeddings o reglas configurables
- Llamada a API de proveedor para obtener productos disponibles + precios actualizados

### 5. Pagos con Stripe
- Crear `Checkout Session` con producto seleccionado
- Webhook de Stripe para confirmar pago (evento `payment_intent.succeeded`)
- Al confirmar: crear `Order`, notificar al proveedor, enviar email de confirmación
- Reembolsos gestionables desde dashboard admin

### 6. Gestión de Proveedores
- Integración vía API REST de cada proveedor
- Adaptadores por proveedor (patrón Strategy) para normalizar respuestas
- Sincronización periódica de catálogo (job diario)

---

## Módulos del Frontend

### Páginas Públicas
- `/` — Landing page: propuesta de valor, cómo funciona, planes/precios, CTA
- `/pricing` — Tabla de planes (freemium vs premium futuro)
- `/login` y `/register` — Auth con email/Google
- `/forgot-password` y `/reset-password`

### Dashboard (autenticado)
- `/dashboard` — Resumen: próximas ocasiones, órdenes recientes, personas
- `/people` — Lista de personas registradas
- `/people/new` — Formulario: nombre, relación, cumpleaños, foto
- `/people/[id]` — Detalle: ocasiones, gustos, historial de regalos
- `/people/[id]/edit`
- `/occasions/[id]` — Detalle de ocasión + sugerencias de regalo actuales
- `/orders` — Historial de compras con estado de envío
- `/settings` — Cuenta, notificaciones, seguridad, método de pago

### Flujo de Compra
1. Email de recordatorio recibido → link al `/occasions/[id]`
2. Ver sugerencias → seleccionar regalo
3. Ingresar dirección de envío
4. Pago con Stripe Checkout (redirect o embedded)
5. Confirmación + tracking

---

## Seguridad — Checklist

| Área | Medida |
|------|--------|
| Contraseñas | bcrypt + sal, mínimo 8 chars, sin almacenar en claro |
| Sesiones | JWT con expiración corta + refresh token en cookie HttpOnly |
| API | Autenticación en cada endpoint, validación con Zod |
| Pagos | Todo procesado por Stripe, nunca almacenamos datos de tarjeta |
| API keys proveedores | Encriptadas en DB con AES-256 |
| Datos personales | Encriptación en tránsito (TLS) y en reposo |
| OWASP | CSRF tokens, SQL injection imposible via Prisma, XSS via escape automático |
| Emails | SPF, DKIM, DMARC configurados en dominio |
| Auditoría | Log de acciones sensibles (login, pago, cambio de email) |

---

## Flujo de Email — Ejemplo Cumpleaños

```
[Día -7]  Job scheduler detecta cumpleaños en 7 días
    └── Genera sugerencias basadas en gustos de la persona
    └── Encola email "Recordatorio: cumpleaños de [Nombre] en 7 días"
    └── Resend envía email con:
            - Nombre y foto de la persona
            - 3 sugerencias de regalo con precio e imagen
            - CTA: "Ver más opciones" → /occasions/[id]
            - Opción de comprar directamente desde el email (deep link)

[Si compra]
    └── Stripe Checkout → pago confirmado
    └── Orden enviada a proveedor
    └── Email de confirmación al usuario
    └── Email de seguimiento cuando se despacha
```

---

## Plan de Implementación por Fases

### Fase 1 — MVP
- Auth (registro, login, sesiones)
- CRUD personas + ocasiones
- Scheduler básico + emails de recordatorio (sin sugerencias de productos)
- Landing page + dashboard básico

### Fase 2 — Producto
- Catálogo de productos + integración con primer proveedor
- Motor de sugerencias (filtro por gustos)
- Emails con sugerencias de regalo

### Fase 3 — Monetización
- Checkout con Stripe
- Gestión de órdenes
- Dashboard de órdenes para usuario

### Fase 4 — Escala
- Panel de administración
- Múltiples proveedores
- Analytics de conversión
- Mejora del motor de sugerencias

---

## Estructura de Repositorio Sugerida

```
/
├── apps/
│   ├── web/          # Next.js frontend
│   └── api/          # Fastify backend
├── packages/
│   ├── db/           # Prisma schema + migrations
│   ├── email/        # Plantillas React Email
│   └── shared/       # Tipos y validaciones Zod compartidos
├── docker-compose.yml  # PostgreSQL + Redis local
└── turbo.json          # Monorepo con Turborepo
```
