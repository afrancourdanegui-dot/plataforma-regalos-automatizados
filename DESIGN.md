---
name: Siempre Presente
description: Plataforma cálida para nunca olvidar una fecha importante
colors:
  primary: "#c7522a"
  primary-deep: "#a8431f"
  secondary: "#f2956a"
  tertiary: "#3d1f2e"
  neutral-bg: "#faf3ec"
  neutral-border: "#ede0d0"
  neutral-surface: "#ffffff"
  neutral-text: "#2a1f1a"
  neutral-text-secondary: "#7a6e68"
typography:
  display:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(1.75rem, 4vw, 2.5rem)"
    fontWeight: 300
    lineHeight: 1.1
    letterSpacing: "normal"
  display-italic:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(1.75rem, 4vw, 2.5rem)"
    fontWeight: 300
    fontStyle: "italic"
    lineHeight: 1.1
  headline:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.2
  body:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 700
    letterSpacing: "0.15em"
rounded:
  sm: "8px"
  md: "12px"
  lg: "20px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-surface}"
    rounded: "{rounded.sm}"
    padding: "10px 16px"
  button-primary-hover:
    backgroundColor: "{colors.primary-deep}"
  button-ghost:
    backgroundColor: "{colors.neutral-surface}"
    textColor: "{colors.tertiary}"
    rounded: "{rounded.sm}"
    padding: "10px 16px"
  input-field:
    backgroundColor: "{colors.neutral-surface}"
    textColor: "{colors.neutral-text}"
    rounded: "{rounded.sm}"
    padding: "10px 16px"
  badge-default:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.tertiary}"
    rounded: "{rounded.full}"
    padding: "4px 10px"
  badge-urgent:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-surface}"
    rounded: "{rounded.full}"
    padding: "4px 10px"
---

# Design System: Siempre Presente

## 1. Overview

**Creative North Star: "El Mayordomo Cálido"**

Siempre Presente no se siente como una herramienta de monitoreo ni como una tienda. Se siente como un mayordomo de confianza: alguien que toma nota una vez de lo que le importa a su gente, y después se encarga, en silencio, sin que tengas que volver a preguntarle. El usuario configura y confía, no vigila. Por eso el sistema rechaza dos reflejos: el SaaS corporativo frío (azul/gris, denso, ansioso por mostrar métricas) y la tienda de regalos genérica (banners, urgencia de oferta, catálogo como protagonista en cada pantalla). La calidez vive en los acentos, terracota y la serif Fraunces en los nombres de las personas y las fechas, mientras la estructura del producto se mantiene directa y rápida de usar.

La única excepción deliberada es el momento de elegir el producto del regalo entre varias marcas: ahí, y solo ahí, el sistema puede sentirse más como explorar un catálogo curado. El resto, el shell, los formularios, la lista de personas, se mantiene como una herramienta personal silenciosa.

**Key Characteristics:**
- Cálido en los acentos (terracota, Fraunces italic), eficiente en la estructura (formularios cortos, sin pasos innecesarios)
- Plano, con profundidad lograda por capas de color tonal (crema / blanco / arena), no por sombras
- Botones y tarjetas directos: esquinas suaves pero sin decoración ni animaciones largas
- El catálogo de regalo es la única pantalla con permiso para sentirse "de tienda"

## 2. Colors

Paleta cálida de tonos tierra: terracota como acento de acción, ciruelo oscuro para momentos de jerarquía, crema y arena como base neutra.

### Primary
- **Terracota Cálida** (#c7522a): color de acción. Botones primarios, links importantes, badges de urgencia ("En 12 días"). Se usa con intención, no como relleno decorativo.

### Secondary
- **Durazno Suave** (#f2956a): acento secundario. Badges no urgentes ("Anual"), estados hover, detalles que acompañan sin competir con el terracota.

### Tertiary
- **Ciruela Profunda** (#3d1f2e): el color de la jerarquía y la calma. Encabezados, fondos oscuros puntuales (header del dashboard), texto sobre superficies claras cuando se necesita más peso que el carbón.

### Neutral
- **Crema Cálida** (#faf3ec): fondo base de toda la aplicación. Nunca blanco puro, siempre con esa calidez de fondo.
- **Arena** (#ede0d0): bordes, separadores, el borde de inputs y tarjetas.
- **Blanco** (#ffffff): superficie de formularios y tarjetas que necesitan distinguirse del fondo crema.
- **Carbón Cálido** (#2a1f1a): texto principal.
- **Gris Cálido** (#7a6e68): texto secundario, labels, metadatos (relación, ubicación, fechas).

### Named Rules
**La Regla del Acento con Intención.** El terracota se reserva para acción y urgencia real (botón primario, badge "En N días"). Si todo es terracota, nada lo es.

## 3. Typography

**Display Font:** Fraunces (con fallback Georgia, serif)
**Body Font:** Plus Jakarta Sans (con fallback system-ui, sans-serif)

**Character:** Fraunces en weight 300, con su itálica reservada para el nombre de las personas registradas, aporta la calidez emocional. Plus Jakarta Sans lleva toda la carga funcional (formularios, botones, metadatos) sin competir con la serif.

### Hierarchy
- **Display** (300, clamp(1.75rem, 4vw, 2.5rem), line-height 1.1): títulos de página y saludo ("Hola, {nombre}"). Reservado para momentos, no para listas.
- **Headline** (400, 1.25rem, line-height 1.2): títulos de sección ("Personas (3)").
- **Title** (400, 1rem, Fraunces): nombre de cada persona registrada en su tarjeta. *(Nota de implementación: en el código actual del dashboard funcional este nivel quedó temporalmente en Plus Jakarta Sans semibold por velocidad de desarrollo; el pase visual debe restaurar Fraunces aquí, como ya está en `identidad-visual.html`.)*
- **Body** (400, 0.875rem, line-height 1.6, máx. 65ch): texto de formularios, descripciones, metadatos largos.
- **Label** (700, 0.6875rem, letter-spacing 0.15em, uppercase): eyebrows ("SIEMPRE PRESENTE"), badges de fecha, nombres de campo cuando se necesita un label explícito sobre el input.

### Named Rules
**La Regla de la Itálica Emocional.** Fraunces italic se usa exclusivamente para el nombre de una persona o para el momento de confirmación ("Presente."). Nunca en UI funcional (botones, nav, metadatos).

## 4. Elevation

Sistema plano por decisión, no por defecto. La profundidad se transmite con capas de color tonal (crema de fondo, blanco para superficies de formulario/tarjeta, arena para bordes) en vez de sombras. Esto refuerza el carácter de herramienta personal calmada en lugar de panel de venta. Las sombras quedan reservadas para el único momento que sí debe sentirse "elevado": el selector de productos del regalo, donde una sombra suave puede usarse para dar foco a la tarjeta de producto seleccionada.

### Named Rules
**La Regla del Plano por Defecto.** Ninguna tarjeta del dashboard, formulario o lista lleva `box-shadow` en su estado de reposo. Si algo necesita destacar, se destaca con color (blanco sobre crema) o borde (arena), no con sombra.

## 5. Components

### Buttons
- **Shape:** esquinas suaves (8px, `rounded-sm` del sistema)
- **Primary:** fondo terracota (#c7522a), texto blanco, padding 10px 16px, peso de texto semibold
- **Hover:** terracota profundo (#a8431f), sin transform ni escala, transición de color simple (150-200ms)
- **Ghost / Secondary:** fondo blanco, borde arena (1px), texto ciruelo. Se usa para acciones secundarias (cancelar, "Continuar con Google", "Eliminar" en su variante de borde terracota para acciones destructivas)

### Badges
- **Default:** fondo durazno, texto ciruelo, `rounded-full`, padding 4px 10px, texto label (11px, bold)
- **Urgente:** fondo terracota, texto blanco, mismo shape. Se usa solo cuando la fecha está genuinamente próxima, no como decoración

### Cards / Containers
- **Corner Style:** 12-20px según tamaño (formularios `rounded-md`/12px, contenedores grandes `rounded-lg`/20px)
- **Background:** blanco sobre fondo crema general
- **Shadow Strategy:** ninguna en reposo (ver Elevación). Excepción única: tarjeta de producto seleccionada en el catálogo de regalo
- **Border:** arena (1px), no se duplican bordes + sombra a la vez
- **Internal Padding:** 16-32px según jerarquía del contenedor

### Inputs / Fields
- **Style:** borde arena (1px), fondo blanco, `rounded-sm` (8px), padding 10px 16px, texto 14px
- **Focus:** cambio de color de borde a terracota (sin glow ni box-shadow de foco), transición simple
- **Error:** texto terracota debajo del campo, sin re-colorear el borde del input (evita ruido visual en formularios cortos)

### Navigation
No hay nav lateral ni superior persistente: el dashboard es de una sola vista con header simple (eyebrow + saludo + botón de cerrar sesión). Coherente con "configurar y confiar", no con navegación exploratoria constante.

## 6. Do's and Don'ts

### Do:
- **Do** reservar el terracota (#c7522a) para acción real: botón primario y badges de urgencia genuina.
- **Do** usar Fraunces italic solo para nombres de personas y momentos de confirmación, nunca en UI funcional.
- **Do** lograr profundidad con capas de color (crema/blanco/arena), no con `box-shadow`.
- **Do** mantener los formularios cortos y directos: menos pasos, no más decoración.
- **Do** permitir que el catálogo de productos del regalo se sienta como explorar, con tarjetas y posible sombra de foco, ya que es el único momento "de tienda" permitido.

### Don't:
- **Don't** convertir el dashboard en un panel de monitoreo denso con métricas grandes y gradientes (anti-referencia de PRODUCT.md: "SaaS genérico azul/gris corporativo").
- **Don't** hacer que el shell general (nav, listado de personas, formularios) se sienta como un carrito de compras o tienda de e-commerce genérica de regalos.
- **Don't** usar `border-left`/`border-right` de color como acento decorativo en tarjetas o listas.
- **Don't** usar gradientes en texto (`background-clip: text`).
- **Don't** usar glassmorphism ni blur decorativo.
- **Don't** apilar sombra + borde en la misma tarjeta; elegir uno.
- **Don't** usar el patrón de "métrica grande + label chico + stat de soporte" tipo SaaS genérico.
