import Link from "next/link";
import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { requireCurrentUser } from "@/lib/dal";
import { CATEGORIA_LABEL, CATEGORIAS_ORDEN, formatearPrecio } from "@/lib/productos";
import ProductFilters from "@/components/product-filters";

export default async function CatalogoRegalosPage({
  searchParams,
}: {
  searchParams: Promise<{ tienda?: string; tipo?: string }>;
}) {
  await requireCurrentUser();
  const { tienda, tipo } = await searchParams;

  const todosLosProductos = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: { name: "asc" },
  });

  const tiendas = [...new Set(todosLosProductos.map((p) => p.brand))].sort();
  const tipos = [...new Set(todosLosProductos.flatMap((p) => (p.subtype ? [p.subtype] : [])))].sort();

  const productos = todosLosProductos.filter(
    (producto) =>
      (!tienda || producto.brand === tienda) && (!tipo || producto.subtype === tipo)
  );

  const porCategoria = CATEGORIAS_ORDEN.map((categoria) => ({
    categoria,
    productos: productos.filter((producto) => producto.category === categoria),
  })).filter((grupo) => grupo.productos.length > 0);

  return (
    <div className="flex flex-1 flex-col items-center px-6 py-16">
      <div className="w-full max-w-2xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-terracota">
              Siempre Presente
            </p>
            <h1 className="mt-1 font-display text-3xl italic text-ciruelo">
              Catálogo de regalos
            </h1>
          </div>
          <Link href="/dashboard" className="text-xs font-semibold text-terracota">
            Volver al dashboard
          </Link>
        </div>

        <p className="mt-4 text-sm text-gris-calido">
          Esto es lo que tenemos disponible con nuestras marcas aliadas en Lima.
          Para mandar uno, entra a la persona y la fecha desde el dashboard.
        </p>

        <div className="mt-6">
          <Suspense>
            <ProductFilters tiendas={tiendas} tipos={tipos} />
          </Suspense>
        </div>

        {porCategoria.length === 0 && (
          <div className="mt-8 rounded-2xl border border-arena bg-white px-6 py-10 text-center">
            <p className="text-sm text-gris-calido">No hay productos con ese filtro.</p>
          </div>
        )}

        <div className="mt-8 flex flex-col gap-8">
          {porCategoria.map(({ categoria, productos: productosDeCategoria }) => (
            <div key={categoria}>
              <h2 className="mb-3 font-display text-xl italic text-ciruelo">
                {CATEGORIA_LABEL[categoria]}
              </h2>
              <ul className="flex flex-col gap-3">
                {productosDeCategoria.map((producto) => (
                  <li
                    key={producto.id}
                    className="rounded-2xl border border-arena bg-white px-5 py-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-sm font-semibold text-carbon">
                          {producto.name}
                        </div>
                        <div className="text-xs text-gris-calido">{producto.brand}</div>
                        {producto.description && (
                          <p className="mt-1 text-xs text-gris-calido">
                            {producto.description}
                          </p>
                        )}
                      </div>
                      <div className="whitespace-nowrap font-display text-lg italic text-terracota">
                        {formatearPrecio(producto.price.toString())}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
