import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { type ProductCategory } from "@/generated/prisma/enums";
import { MarketingNav } from "@/components/marketing-nav";

const CATEGORIAS = [
  { value: "FLORES",       label: "Flores" },
  { value: "VINOS",        label: "Vinos" },
  { value: "TORTAS",       label: "Tortas" },
  { value: "CHOCOLATES",   label: "Chocolates" },
  { value: "SPA",          label: "Vales de spa" },
  { value: "CAJAS_CURADAS",label: "Cajas curadas" },
];

const FOTOS: Record<string, string> = {
  FLORES:        "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&q=80",
  VINOS:         "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&q=80",
  TORTAS:        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80",
  CHOCOLATES:    "https://images.unsplash.com/photo-1511381939415-e44015466834?w=400&q=80",
  SPA:           "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&q=80",
  CAJAS_CURADAS: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&q=80",
};

export default async function CatalogoPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const { categoria } = await searchParams;
  const categoriaActiva = categoria?.toUpperCase();

  const productos = await prisma.product.findMany({
    where: {
      isActive: true,
      ...(categoriaActiva ? { category: categoriaActiva as ProductCategory } : {}),
    },
    orderBy: [{ category: "asc" }, { price: "asc" }],
  });

  return (
    <div className="min-h-screen bg-crema font-sans text-carbon">
      <MarketingNav />

      {/* Header */}
      <div className="bg-arena">
        <div className="mx-auto max-w-[1080px] px-6 py-12">
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-[7px] text-[11px] font-bold uppercase tracking-[0.06em] text-[#a8431f]">
            <span className="h-1.5 w-1.5 rounded-full bg-terracota" />
            Catálogo
          </span>
          <h1 className="mt-3 font-display italic font-light text-[2rem] text-ciruelo">
            Explorar regalos
          </h1>
          <p className="mt-2 text-[14px] text-gris-calido">
            Regalos reales entregados en Lima, Perú.
          </p>
        </div>
      </div>

      {/* Filtros por categoría */}
      <div className="sticky top-0 z-10 border-b border-arena bg-crema/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1080px] gap-2 overflow-x-auto px-6 py-3 scrollbar-none">
          <Link
            href="/catalogo"
            className={`flex-shrink-0 rounded-full px-4 py-2 text-[13px] font-semibold transition-colors ${
              !categoriaActiva
                ? "bg-ciruelo text-crema"
                : "bg-arena text-carbon hover:bg-arena/70"
            }`}
          >
            Todos
          </Link>
          {CATEGORIAS.map((c) => (
            <Link
              key={c.value}
              href={`/catalogo?categoria=${c.value}`}
              className={`flex-shrink-0 rounded-full px-4 py-2 text-[13px] font-semibold transition-colors ${
                categoriaActiva === c.value
                  ? "bg-ciruelo text-crema"
                  : "bg-arena text-carbon hover:bg-arena/70"
              }`}
            >
              {c.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Grid de productos */}
      <div className="mx-auto max-w-[1080px] px-6 py-10">
        {productos.length === 0 ? (
          <p className="py-16 text-center text-[14px] text-gris-calido">
            No hay productos en esta categoría por el momento.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {productos.map((p) => (
              <div
                key={p.id}
                className="overflow-hidden rounded-[18px] border border-arena bg-white"
                style={{ boxShadow: "0 4px 14px -4px rgba(61,31,46,0.08)" }}
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={FOTOS[p.category] ?? FOTOS.FLORES}
                    alt={p.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-3.5">
                  <p className="text-[13px] font-bold leading-snug text-carbon">
                    {p.name}
                  </p>
                  <p className="mt-1.5 font-display italic text-[14px] text-terracota">
                    S/ {Number(p.price).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="mx-auto max-w-[1080px] px-6 pb-16">
        <div className="relative overflow-hidden rounded-[28px] bg-ciruelo px-8 py-14 text-center">
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full"
            style={{ background: "rgba(242,150,106,0.18)" }}
          />
          <h2 className="relative mb-3 font-display italic font-light text-[1.75rem] text-crema">
            ¿Listo para automatizar tus regalos?
          </h2>
          <p className="relative mb-7 text-[14px] text-crema/75">
            Registra a tu gente y nosotros nos encargamos de entregar el regalo a tiempo.
          </p>
          <Link
            href="/registro"
            className="relative inline-flex items-center justify-center rounded-[10px] bg-terracota px-6 py-3.5 text-[14.5px] font-bold text-white"
            style={{ boxShadow: "0 10px 24px -6px rgba(199,82,42,0.45)" }}
          >
            Crear cuenta gratis
          </Link>
        </div>
      </div>
    </div>
  );
}
