# Home Page Design — Siempre Presente

**Date:** 2026-06-29
**Status:** Aprobado — pendiente de implementación
**Scope:** Preview interna para el socio técnico. No es aún página de conversión pública.

---

## Objetivo

Reemplazar el placeholder actual de `/` con una home real que presente el producto, comunique la propuesta de valor y conecte con el dashboard ya construido.

---

## Estructura de secciones (en orden vertical)

### 1. Nav

- Logo "Siempre Presente" — Fraunces italic, color `--ciruelo`
- Link fantasma "Iniciar sesión" (→ `/login`)
- Botón CTA "Crear cuenta" — fondo `--terracota`, border-radius 10px, box-shadow suave

### 2. Hero (grid 2 columnas)

**Columna izquierda (texto):**
- Eyebrow pill: fondo `--arena`, texto terracota, punto terracota, label "Siempre Presente"
- `<h1>` dos tonos: "Nunca más olvides" en `--ciruelo`, segunda línea "una fecha importante" en `--terracota`
- Lead text: descripción del servicio en `--gris-calido`
- CTA primario "Crear cuenta" con sombra de color terracota (no negra)
- Link secundario "¿Ya tienes cuenta? Inicia sesión"

**Columna derecha (producto-cards):**
- 3 tarjetas de productos reales del catálogo (Ramo de rosas rojas, Torta de chocolate, Vale de spa día completo)
- Cada tarjeta: foto miniatura 56×56px (stock genérica por categoría, sin atribución de marca), nombre del producto, precio en Fraunces italic terracota
- Primera tarjeta destacada con borde `--terracota` y sombra más marcada + `translateX(-4px)`
- Sin campo "marca/proveedor" — los nombres de proveedores son datos de desarrollo, no socios reales

**Nota honestidad:** las fotos son imágenes de stock genéricas (Unsplash) que representan la categoría, no fotografías de productos de proveedores reales. Se reemplazarán cuando existan socios reales con fotos propias.

### 3. Cómo funciona (banda fondo `--arena`)

- Eyebrow pill + h2 "Cómo funciona" centrado
- Grid 3 columnas de tarjetas blancas con sombra
- Número en cuadrado con border-radius 10px, fondo `--ciruelo`, texto `--crema`, fuente Fraunces italic
- Pasos: "Registra a tu gente" / "Elige el regalo" / "Nosotros nos encargamos"

### 4. Para cada ocasión (fondo `--crema`)

- Eyebrow pill "Catálogo" + h2 "Para cada ocasión" centrado
- Grid 3×2 de tarjetas de categoría
- Cada tarjeta: foto de categoría (aspect-ratio 4/3, background-cover), nombre de categoría en bold debajo
- Categorías: Flores / Vinos / Tortas / Chocolates / Vales de spa / Cajas curadas
- Fotos: imágenes de stock genéricas sin marca. Sin precios en esta sección (es navegación por categoría, no catálogo de compra)

### 5. CTA Final (bloque `--ciruelo`)

- Fondo ciruelo oscuro, texto crema — contraste máximo
- Detalle decorativo: círculo difuso `--durazno` en esquina superior derecha (opacity 18%)
- h2 "Empecemos" en Fraunces italic crema
- Subtexto en crema con opacity 75%
- Botón "Crear cuenta" igual al del hero

### 6. Footer (4 columnas)

| Columna | Contenido |
|---|---|
| Brand | Logo "Siempre Presente" + tagline "Regalos automatizados en Lima, Perú." |
| Navegación | "Cómo funciona" (anchor `#como-funciona`) / "Categorías de regalo" (anchor `#categorias`) / "Iniciar sesión" (→ `/login`) |
| Sobre Siempre Presente | 6 items "— próximamente": Conviértete en proveedor / Contáctanos / Blog / Estamos contratando / Seguridad / Referidos |
| Legal | 2 items "— próximamente": Términos de uso / Privacidad |

- Grid responsive: 4 cols → 2×2 a 900px → 1 col a 560px
- Items "próximamente" son `<span>` no `<a>` — no son links clickeables
- Footer bottom: `© 2026 Siempre Presente`

---

## Tokens de diseño aplicados

- `--terracota: #c7522a` — CTAs, precios, acentos, segunda línea h1
- `--ciruelo: #3d1f2e` — logo, h1, números de pasos, bloque CTA final
- `--crema: #faf3ec` — fondo base
- `--arena: #ede0d0` — banda "Cómo funciona", eyebrow pills en hero
- `--gris-calido: #7a6e68` — texto lead, texto footer, subtextos
- `--carbon: #2a1f1a` — títulos de tarjetas, h3
- Tipografía display: Fraunces (italic, weight 300)
- Tipografía UI: Plus Jakarta Sans (400/600/700)

---

## Restricciones de honestidad

- No usar testimonios falsos
- No usar logos de marcas que no sean socios reales
- No usar fotos atribuidas a proveedores específicos (hasta tener socios reales)
- Items no construidos → texto "— próximamente" (no links muertos)
- Excluidos por completo: app móvil, certificaciones de seguridad (aún no existen)

---

## Implementación

- Archivo: `apps/web/src/app/page.tsx`
- Reemplaza el placeholder actual completamente
- Fotos via `next/image` con URLs de Unsplash + `unoptimized` o dominio configurado en `next.config`
- Anchors `#como-funciona` y `#categorias` → `id` en las secciones correspondientes
- Sin dependencias nuevas — usa Tailwind + tokens CSS ya definidos en globals.css
