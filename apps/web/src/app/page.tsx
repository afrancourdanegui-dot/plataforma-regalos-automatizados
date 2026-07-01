import Image from "next/image";
import Link from "next/link";
import { MarketingNav } from "@/components/marketing-nav";
import { getCurrentUser } from "@/lib/dal";

const productCards = [
  {
    name: "Ramo de rosas rojas",
    price: "S/ 89.90",
    img: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=160&q=80",
    featured: true,
  },
  {
    name: "Torta de chocolate",
    price: "S/ 95.00",
    img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=160&q=80",
    featured: false,
  },
  {
    name: "Vale de spa día completo",
    price: "S/ 250.00",
    img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=160&q=80",
    featured: false,
  },
];

const categories = [
  { name: "Flores",        img: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&q=80" },
  { name: "Vinos",         img: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&q=80" },
  { name: "Tortas",        img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80" },
  { name: "Chocolates",    img: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=400&q=80" },
  { name: "Vales de spa",  img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&q=80" },
  { name: "Cajas curadas", img: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&q=80" },
];

const steps = [
  {
    n: "1",
    title: "Registra a tu gente",
    body: "Agrega a las personas importantes, sus fechas clave y sus preferencias. Una sola vez.",
  },
  {
    n: "2",
    title: "Elige el regalo",
    body: "Flores, vinos, tortas, chocolates, spa o cajas curadas, de marcas aliadas en Lima.",
  },
  {
    n: "3",
    title: "Nosotros nos encargamos",
    body: "Compramos y enviamos a tiempo. Tú te olvidas tranquilo, nosotros no.",
  },
];

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen bg-crema font-sans text-carbon">

      <MarketingNav />

      {/* Hero */}
      <section className="mx-auto grid max-w-[1080px] grid-cols-1 items-center gap-8 px-6 pb-16 pt-8 md:grid-cols-2 md:gap-16">
        <div>
          <span className="mb-[22px] inline-flex items-center gap-1.5 rounded-full bg-arena px-3.5 py-[7px] text-[11px] font-bold uppercase tracking-[0.06em] text-ciruelo">
            <span className="h-1.5 w-1.5 rounded-full bg-terracota" />
            Siempre Presente
          </span>
          <h1
            className="mb-[22px] font-display italic font-light leading-[1.05] tracking-[-0.01em] text-ciruelo"
            style={{ fontSize: "clamp(2.4rem, 5vw, 3.6rem)" }}
          >
            Nunca más olvides
            <br />
            <span className="text-terracota">una fecha importante</span>
          </h1>
          <p className="mb-8 max-w-[430px] text-[16.5px] leading-[1.65] text-gris-calido">
            Registra a tu gente, sus fechas clave y sus gustos. Nosotros nos
            encargamos de comprar y enviar el regalo, justo a tiempo.
          </p>
          {user ? (
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-[10px] bg-terracota px-6 py-3.5 text-[14.5px] font-bold text-white"
              style={{ boxShadow: "var(--shadow-cta)" }}
            >
              Ir al dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/registro"
                className="inline-flex items-center justify-center rounded-[10px] bg-terracota px-6 py-3.5 text-[14.5px] font-bold text-white"
                style={{ boxShadow: "var(--shadow-cta)" }}
              >
                Crear cuenta
              </Link>
              <p className="mt-[18px] text-[13px] text-gris-calido">
                ¿Ya tienes cuenta?{" "}
                <Link href="/login" className="font-bold text-terracota">
                  Inicia sesión
                </Link>
              </p>
            </>
          )}
        </div>

        <div className="flex flex-col gap-3">
          {productCards.map((p) => (
            <div
              key={p.name}
              className={`flex items-center gap-3.5 rounded-[18px] border bg-white p-2.5 ${
                p.featured ? "-translate-x-1 border-2 border-terracota" : "border-arena"
              }`}
            >
              <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-[12px]">
                <Image src={p.img} alt={p.name} fill className="object-cover" />
              </div>
              <div className="flex flex-1 items-center justify-between pr-1">
                <span className="text-[13.5px] font-bold text-carbon">{p.name}</span>
                <span className="font-display italic text-[15px] text-terracota">
                  {p.price}
                </span>
              </div>
            </div>
          ))}
          <p className="mt-1.5 text-center text-[11.5px] text-gris-calido">
            Parte de nuestro catálogo de regalos en Lima
          </p>
        </div>
      </section>

      {/* Cómo funciona */}
      <section id="como-funciona" className="bg-arena">
        <div className="mx-auto max-w-[1080px] px-6 py-16">
          <div className="mb-12 text-center">
            <h2 className="font-display italic font-light text-[2rem] text-ciruelo">
              Cómo funciona
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-7 md:grid-cols-3">
            {steps.map((s) => (
              <div
                key={s.n}
                className="rounded-[18px] bg-white p-7"
                style={{ boxShadow: "var(--shadow-soft)" }}
              >
                <div className="mb-[18px] flex h-[38px] w-[38px] items-center justify-center rounded-[10px] bg-ciruelo font-display italic text-[17px] text-crema">
                  {s.n}
                </div>
                <h3 className="mb-2 text-[15.5px] font-bold text-carbon">{s.title}</h3>
                <p className="text-[13.5px] leading-[1.65] text-gris-calido">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Para cada ocasión */}
      <section id="categorias" className="mx-auto max-w-[1080px] px-6 py-16">
        <div className="mb-12 text-center">
          <h2 className="font-display italic font-light text-[2rem] text-ciruelo">
            Para cada ocasión
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {categories.map((c) => (
            <div
              key={c.name}
              className="overflow-hidden rounded-[18px] border border-arena bg-white"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <div className="relative aspect-[4/3] w-full">
                <Image src={c.img} alt={c.name} fill className="object-cover" />
              </div>
              <p className="px-4 py-3.5 text-[13.5px] font-bold text-carbon">{c.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Final */}
      <section className="mx-auto max-w-[1080px] px-6 pb-16">
        <div className="relative overflow-hidden rounded-[28px] bg-ciruelo px-8 py-16 text-center">
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full"
            style={{ background: "rgba(242,150,106,0.18)" }}
          />
          <h2 className="relative mb-3 font-display italic font-light text-[2.1rem] text-crema">
            {user ? `Bienvenido de vuelta, ${user.name?.split(" ")[0] ?? ""}` : "Empecemos"}
          </h2>
          <p className="relative mb-7 text-[14.5px] text-crema/75">
            {user
              ? "Todo listo para que siempre estés presente."
              : "Te toma dos minutos configurar a tu primera persona."}
          </p>
          <Link
            href={user ? "/dashboard" : "/registro"}
            className="relative inline-flex items-center justify-center rounded-[10px] bg-terracota px-6 py-3.5 text-[14.5px] font-bold text-white"
            style={{ boxShadow: "var(--shadow-cta)" }}
          >
            {user ? "Ir al dashboard" : "Crear cuenta"}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-4 border-t border-arena">
        <div className="mx-auto grid max-w-[1080px] grid-cols-1 gap-7 px-6 pb-8 pt-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="mb-2 font-display italic font-light text-[17px] text-ciruelo">
              Siempre Presente
            </p>
            <p className="text-[12px] text-gris-calido">
              Regalos automatizados en Lima, Perú.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.1em] text-carbon">
              Navegación
            </h4>
            <Link href="#como-funciona" className="mb-2.5 block text-[13px] text-gris-calido hover:text-terracota">
              Cómo funciona
            </Link>
            <Link href="#categorias" className="mb-2.5 block text-[13px] text-gris-calido hover:text-terracota">
              Categorías de regalo
            </Link>
            <Link href="/login" className="mb-2.5 block text-[13px] text-gris-calido hover:text-terracota">
              Iniciar sesión
            </Link>
          </div>

          <div>
            <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.1em] text-carbon">
              Sobre Siempre Presente
            </h4>
            {[
              "Conviértete en proveedor",
              "Contáctanos",
              "Blog",
              "Estamos contratando",
              "Seguridad",
              "Referidos",
            ].map((item) => (
              <span key={item} className="mb-2.5 block text-[13px] text-gris-calido">
                {item} — próximamente
              </span>
            ))}
          </div>

          <div>
            <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.1em] text-carbon">
              Legal
            </h4>
            <Link
              href="/legal/terminos"
              className="mb-2.5 block text-[13px] text-gris-calido hover:text-terracota transition-colors"
            >
              Términos de uso
            </Link>
            <Link
              href="/legal/privacidad"
              className="mb-2.5 block text-[13px] text-gris-calido hover:text-terracota transition-colors"
            >
              Privacidad
            </Link>
          </div>
        </div>

        <div className="mx-auto max-w-[1080px] border-t border-arena px-6 py-5">
          <p className="text-[12px] text-gris-calido">© 2026 Siempre Presente</p>
        </div>
      </footer>
    </div>
  );
}
