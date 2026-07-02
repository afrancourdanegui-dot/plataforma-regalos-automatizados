import Image from "next/image";
import Link from "next/link";
import { getCurrentUser } from "@/lib/dal";
import { StickyNav } from "@/components/sticky-nav";
import { FaqAccordion } from "@/components/faq-accordion";

/* ─── Icons (stroke SVG) ──────────────────────────────────── */
function UserPlusIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="7" r="4" />
      <path d="M2 21v-1.5A5.5 5.5 0 0 1 7.5 14h3" />
      <path d="M17 8v6M14 11h6" />
    </svg>
  );
}
function GiftIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="8" width="18" height="13" rx="1.5" />
      <path d="M12 8v13M3 12.5h18" />
      <path d="M12 8C11 4.5 9 4 7.8 5.2 6.6 6.4 8.5 8 12 8zM12 8c1-3.5 3-4 4.2-2.8C17.4 6.4 15.5 8 12 8z" />
    </svg>
  );
}
function TruckIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="6" width="13" height="11" rx="1.5" />
      <path d="M14 9.5h3.5L21 13v4h-7z" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="17.5" cy="18" r="2" />
    </svg>
  );
}

/* ─── Trust chip icons ───────────────────────────────────── */
function PackageIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7l9-4 9 4v10l-9 4-9-4z" />
      <path d="M3 7l9 4 9-4M12 11v10" />
    </svg>
  );
}
function StarIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l2.6 5.6 6 .8-4.4 4.1 1.1 6L12 16.8 6.7 19.6l1.1-6L3.4 9.4l6-.8z" />
    </svg>
  );
}
function BellIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.7 21a2 2 0 0 1-3.4 0" />
    </svg>
  );
}

/* ─── Static data ─────────────────────────────────────────── */
const productCards = [
  {
    name: "Ramo de rosas rojas",
    price: "S/ 89.90",
    img: "/images/landing/hero-rosas.jpg",
    featured: true,
  },
  {
    name: "Torta de chocolate",
    price: "S/ 95.00",
    img: "/images/landing/hero-torta.jpg",
    featured: false,
  },
  {
    name: "Vale de spa día completo",
    price: "S/ 250.00",
    img: "/images/landing/hero-spa.jpg",
    featured: false,
  },
];

const steps = [
  {
    n: "1",
    icon: <UserPlusIcon />,
    title: "Registra a tu gente",
    body: "Agrega a las personas importantes, sus fechas clave y sus preferencias. Una sola vez.",
  },
  {
    n: "2",
    icon: <GiftIcon />,
    title: "Elige el regalo",
    body: "Flores, vinos, tortas, chocolates, spa o cajas curadas, de marcas aliadas en Lima.",
  },
  {
    n: "3",
    icon: <TruckIcon />,
    title: "Nosotros nos encargamos",
    body: "Compramos y enviamos a tiempo. Tú te olvidas tranquilo, nosotros no.",
  },
];

const categories = [
  { name: "Flores",        href: "/catalogo?categoria=FLORES",        img: "/images/landing/cat-flores.jpg" },
  { name: "Vinos",         href: "/catalogo?categoria=VINOS",         img: "/images/landing/cat-vinos.jpg" },
  { name: "Tortas",        href: "/catalogo?categoria=TORTAS",        img: "/images/landing/cat-tortas.jpg" },
  { name: "Chocolates",    href: "/catalogo?categoria=CHOCOLATES",    img: "/images/landing/cat-chocolates.jpg" },
  { name: "Vales de spa",  href: "/catalogo?categoria=SPA",           img: "/images/landing/cat-spa.jpg" },
  { name: "Cajas curadas", href: "/catalogo?categoria=CAJAS_CURADAS", img: "/images/landing/cat-cajas.jpg" },
];

const faqs = [
  {
    q: "¿Entregan en toda Lima?",
    a: "Cubrimos los principales distritos de Lima Metropolitana a través de nuestros proveedores aliados. Al registrar una dirección te confirmamos si está dentro de nuestra zona de cobertura.",
  },
  {
    q: "¿Con cuánta anticipación tengo que configurarlo?",
    a: "Con registrar la fecha una sola vez es suficiente. Nosotros te avisamos con varios días de anticipación antes de cada envío para que puedas confirmar o ajustar el regalo.",
  },
  {
    q: "¿Qué pasa si la persona no está en casa?",
    a: "Coordinamos con el proveedor un segundo intento de entrega o un horario alternativo, y te mantenemos al tanto del estado del pedido en todo momento.",
  },
  {
    q: "¿Puedo cambiar o cancelar el regalo?",
    a: "Sí. Puedes modificar la sugerencia o cancelar el envío antes del cobro automático, directamente desde tu dashboard.",
  },
  {
    q: "¿Cuánto cuesta el servicio?",
    a: "El plan gratis cubre hasta 2 destinatarios. El plan premium cuesta ~S/20 al mes e incluye hasta 10. A cada envío se suma un fee de servicio de S/5 a S/8.",
  },
  {
    q: "¿Funciona para regalos de empresa?",
    a: "Por ahora nos enfocamos en regalos personales. La modalidad para regalos corporativos (B2B) está en nuestros planes a futuro.",
  },
];

/* ─── Page ────────────────────────────────────────────────── */
export default async function Home() {
  const user = await getCurrentUser();
  const firstName = user?.name?.split(" ")[0];

  return (
    <div className="bg-crema font-sans text-carbon">
      <StickyNav user={user} />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative mx-auto max-w-[1240px] px-10 pb-6 pt-16">
        {/* Glow */}
        <div
          className="pointer-events-none absolute -right-20 -top-10 h-[520px] w-[520px] rounded-full"
          style={{
            background: "radial-gradient(circle at 30% 30%, rgba(192,85,47,.14) 0%, transparent 62%)",
            zIndex: 0,
          }}
        />
        <div className="relative grid grid-cols-1 items-center gap-[70px] md:grid-cols-[1.05fr_1fr]">

          {/* Left column */}
          <div>
            {/* Badge */}
            <div className="mb-[22px] inline-flex items-center gap-2 rounded-full px-4 py-2" style={{ background: '#E9DECE' }}>
              <span
                className="h-[7px] w-[7px] rounded-full bg-terracota-vivo"
                style={{ boxShadow: "0 0 0 3px rgba(192,65,12,.18)" }}
              />
              <span className="font-ui text-[12px] font-bold uppercase tracking-[.18em] text-ciruelo">
                Siempre Presente
              </span>
            </div>

            {/* H1 */}
            <h1
              className="mb-6 font-display text-ciruelo"
              style={{
                fontSize: "clamp(44px, 5.5vw, 70px)",
                fontWeight: 500,
                lineHeight: 0.98,
                letterSpacing: "-.02em",
              }}
            >
              Nunca más olvides
              <br />
              <em className="text-terracota" style={{ fontStyle: "italic" }}>
                una fecha importante
              </em>
            </h1>

            {/* Paragraph */}
            <p
              className="mb-9 max-w-[460px] text-atenuado"
              style={{ fontSize: "19px", lineHeight: 1.62 }}
            >
              Registra a tu gente y sus fechas clave una sola vez. Cada año,
              nosotros recordamos, elegimos y entregamos el regalo perfecto, a tiempo.
            </p>

            {/* CTA */}
            {user ? (
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-[14px] bg-terracota px-7 py-4 font-ui text-[16.5px] font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-terracota-hover hover:shadow-[0_16px_40px_rgba(192,85,47,.42)]"
                style={{ boxShadow: "0 10px 28px rgba(192,85,47,.32)" }}
              >
                Ir al dashboard <span aria-hidden>→</span>
              </Link>
            ) : (
              <>
                <Link
                  href="/registro"
                  className="inline-flex items-center gap-2 rounded-[14px] bg-terracota px-7 py-4 font-ui text-[16.5px] font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-terracota-hover hover:shadow-[0_16px_40px_rgba(192,85,47,.42)]"
                  style={{ boxShadow: "0 10px 28px rgba(192,85,47,.32)" }}
                >
                  Crear cuenta <span aria-hidden>→</span>
                </Link>
                <p className="mt-4 text-[13.5px] text-atenuado">
                  ¿Ya tienes cuenta?{" "}
                  <Link href="/login" className="font-semibold text-terracota">
                    Inicia sesión
                  </Link>
                </p>
              </>
            )}

            {/* Trust chips */}
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                { icon: <PackageIcon />, label: "Entregas en Lima" },
                { icon: <StarIcon />, label: "Marcas aliadas" },
                { icon: <BellIcon />, label: "Recordatorios automáticos" },
              ].map((chip) => (
                <div
                  key={chip.label}
                  className="flex items-center gap-2.5 rounded-full border border-borde bg-white px-[18px] py-[11px]"
                  style={{ boxShadow: "0 1px 3px rgba(58,30,48,.05)" }}
                >
                  <span className="text-terracota" aria-hidden>{chip.icon}</span>
                  <span className="font-ui text-[13.5px] font-semibold text-carbon">
                    {chip.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right column — product cards */}
          <div className="relative">
            <div className="relative flex flex-col gap-3.5" style={{ zIndex: 1 }}>
              {productCards.map((p, i) => (
                <div
                  key={p.name}
                  className={`flex items-center gap-4 rounded-[20px] bg-white p-3 transition-all duration-200 ${
                    i !== 0 ? "border border-borde hover:-translate-y-1 hover:shadow-md" : ""
                  }`}
                  style={{
                    boxShadow: "0 10px 30px rgba(58,30,48,.06)",
                    ...(i === 0
                      ? {
                          border: "1.5px solid var(--color-terracota)",
                          animation: "floaty 6s ease-in-out infinite",
                        }
                      : {}),
                  }}
                >
                  <div className="relative h-[66px] w-[66px] flex-shrink-0 overflow-hidden rounded-[12px]">
                    <Image src={p.img} alt={p.name} fill className="object-cover" />
                  </div>
                  <div className="flex flex-1 items-center justify-between pr-2">
                    <span className="font-ui text-[14px] font-semibold text-carbon">
                      {p.name}
                    </span>
                    <span
                      className="font-display text-[16px] text-terracota"
                      style={{ fontWeight: 500, fontStyle: "italic" }}
                    >
                      {p.price}
                    </span>
                  </div>
                </div>
              ))}
              <p className="mt-1 text-center text-[12px] text-mute">
                Parte de nuestro catálogo de regalos en Lima —{" "}
                <Link href="/catalogo" className="font-semibold text-terracota">
                  ver todo
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CÓMO FUNCIONA ────────────────────────────────── */}
      <section id="como-funciona" style={{ background: '#E9DECE' }}>
        <div className="mx-auto max-w-[1160px] px-10 py-24">
          <div className="mb-16 text-center">
            <p className="mb-3 font-ui text-[12px] font-bold uppercase tracking-[.18em] text-eyebrow">
              En tres pasos
            </p>
            <h2
              className="font-display italic text-ciruelo"
              style={{ fontSize: "46px", fontWeight: 500 }}
            >
              Cómo funciona
            </h2>
          </div>

          <div className="relative">
            {/* Dashed connector — desktop only */}
            <div
              aria-hidden
              className="pointer-events-none absolute hidden md:block"
              style={{
                top: "51px",
                left: "14%",
                right: "14%",
                height: "1px",
                background:
                  "repeating-linear-gradient(90deg, #C2A98C 0, #C2A98C 6px, transparent 6px, transparent 14px)",
                zIndex: 0,
              }}
            />
            <div className="grid grid-cols-1 gap-7 md:grid-cols-3">
              {steps.map((s) => (
                <div
                  key={s.n}
                  className="step-card relative rounded-[20px] bg-white p-7"
                  style={{ zIndex: 1 }}
                >
                  {/* Badge */}
                  <div
                    className="mb-5 flex h-[46px] w-[46px] items-center justify-center rounded-[13px] bg-ciruelo font-display italic text-crema"
                    style={{ fontSize: "22px", fontWeight: 500 }}
                  >
                    {s.n}
                  </div>
                  {/* Icon */}
                  <div className="mb-4 text-terracota">{s.icon}</div>
                  <h3 className="mb-2 font-ui text-[20px] font-bold text-carbon">
                    {s.title}
                  </h3>
                  <p
                    className="text-atenuado"
                    style={{ fontSize: "15.5px", lineHeight: 1.6 }}
                  >
                    {s.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PARA CADA OCASIÓN ────────────────────────────── */}
      <section id="ocasiones" className="bg-crema">
        <div className="mx-auto max-w-[1160px] px-10 py-24">
          <div className="mb-16 text-center">
            <p className="mb-3 font-ui text-[12px] font-bold uppercase tracking-[.18em] text-eyebrow">
              Catálogo
            </p>
            <h2
              className="font-display italic text-ciruelo"
              style={{ fontSize: "46px", fontWeight: 500 }}
            >
              Para cada ocasión
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-7 md:grid-cols-3">
            {categories.map((c) => (
              <Link
                key={c.name}
                href={c.href}
                className="category-card rounded-[20px] border border-borde bg-white"
              >
                <div className="relative h-[230px] w-full overflow-hidden rounded-t-[20px]">
                  <Image
                    src={c.img}
                    alt={c.name}
                    fill
                    className="category-card-img object-cover"
                  />
                </div>
                <div className="flex items-center justify-between px-5 py-4">
                  <span className="font-ui text-[14.5px] font-bold text-carbon">
                    {c.name}
                  </span>
                  <span className="text-terracota">→</span>
                </div>
              </Link>
            ))}
          </div>

          <p className="mt-10 text-center">
            <Link
              href="/catalogo"
              className="font-ui text-[14px] font-semibold text-terracota transition-opacity hover:opacity-70"
            >
              Ver catálogo completo →
            </Link>
          </p>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section style={{ background: '#E9DECE' }}>
        <div className="mx-auto max-w-[900px] px-10 py-24">
          <div className="mb-14 text-center">
            <p className="mb-3 font-ui text-[12px] font-bold uppercase tracking-[.18em] text-eyebrow">
              Dudas
            </p>
            <h2
              className="font-display italic text-ciruelo"
              style={{ fontSize: "46px", fontWeight: 500 }}
            >
              Preguntas frecuentes
            </h2>
          </div>
          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="bg-crema">
        <div className="mx-auto max-w-[1160px] px-10 py-24">
          <div
            className="relative overflow-hidden rounded-[28px] px-10 py-[78px] text-center"
            style={{ background: "linear-gradient(135deg, #3A1E30 0%, #2B1524 100%)" }}
          >
            {/* Decorative circles */}
            <div
              aria-hidden
              className="pointer-events-none absolute h-[300px] w-[300px] rounded-full"
              style={{ top: "-70px", right: "-40px", background: "radial-gradient(circle at 40% 40%, rgba(192,85,47,.42), rgba(192,85,47,0) 68%)" }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute h-[280px] w-[280px] rounded-full"
              style={{ bottom: "-90px", left: "-60px", background: "radial-gradient(circle at 50% 50%, rgba(139,74,54,.35), rgba(139,74,54,0) 70%)" }}
            />

            <h2
              className="relative mb-3 font-display italic"
              style={{ fontSize: "clamp(32px, 4vw, 46px)", fontWeight: 500, color: "#F5E7DA" }}
            >
              {firstName ? `Bienvenido de vuelta, ${firstName}` : "Empecemos"}
            </h2>
            <p
              className="relative mb-9"
              style={{ fontSize: "15px", color: "#C9B4A6" }}
            >
              {user
                ? "Todo listo para que siempre estés presente."
                : "Te toma dos minutos configurar a tu primera persona."}
            </p>
            <Link
              href={user ? "/dashboard" : "/registro"}
              className="relative inline-flex items-center gap-2 rounded-[14px] bg-terracota px-8 py-4 font-ui text-[16px] font-bold text-white transition-transform hover:-translate-y-0.5 hover:bg-terracota-hover"
              style={{ animation: "glowpulse 3.4s ease-in-out infinite" }}
            >
              {user ? "Ir al dashboard" : "Crear cuenta"}{" "}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <footer className="border-t border-borde bg-crema">
        <div
          className="mx-auto grid max-w-[1160px] grid-cols-1 gap-8 px-10 pb-10 pt-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]"
        >
          <div>
            <p
              className="mb-2 font-display italic text-ciruelo"
              style={{ fontSize: "19px", fontWeight: 500 }}
            >
              Siempre Presente
            </p>
            <p className="text-[13px] text-mute">Regalos automatizados en Lima, Perú.</p>
          </div>

          <div>
            <h4 className="mb-5 font-ui text-[11px] font-bold uppercase tracking-[.14em] text-carbon">
              Navegación
            </h4>
            {[
              { label: "Cómo funciona", href: "#como-funciona" },
              { label: "Catálogo de regalos", href: "/catalogo" },
              { label: "Iniciar sesión", href: "/login" },
              { label: "Crear cuenta", href: "/registro" },
            ].map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="mb-3 block text-[13px] text-mute transition-colors hover:text-terracota"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div>
            <h4 className="mb-5 font-ui text-[11px] font-bold uppercase tracking-[.14em] text-carbon">
              Empresa
            </h4>
            <Link
              href="/proveedor"
              className="mb-3 block text-[13px] text-mute transition-colors hover:text-terracota"
            >
              Conviértete en proveedor
            </Link>
            <a
              href="mailto:hola@siemprepresente.pe"
              className="mb-3 block text-[13px] text-mute transition-colors hover:text-terracota"
            >
              Contáctanos
            </a>
          </div>

          <div>
            <h4 className="mb-5 font-ui text-[11px] font-bold uppercase tracking-[.14em] text-carbon">
              Legal
            </h4>
            <Link
              href="/legal/terminos"
              className="mb-3 block text-[13px] text-mute transition-colors hover:text-terracota"
            >
              Términos de uso
            </Link>
            <Link
              href="/legal/privacidad"
              className="mb-3 block text-[13px] text-mute transition-colors hover:text-terracota"
            >
              Privacidad
            </Link>
          </div>
        </div>

        <div className="mx-auto max-w-[1160px] border-t border-borde px-10 py-5">
          <p className="text-[12px] text-mute">© 2026 Siempre Presente</p>
        </div>
      </footer>
    </div>
  );
}
