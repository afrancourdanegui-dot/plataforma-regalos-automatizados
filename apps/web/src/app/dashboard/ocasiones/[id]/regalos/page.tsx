import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireCurrentUser } from "@/lib/dal";
import { agregarRegalo, quitarRegalo } from "@/lib/actions/gift-actions";
import { Button, buttonClasses } from "@/components/ui/button";
import { motivoDeOcasion } from "@/lib/ocasiones";
import { CATEGORIA_LABEL, CATEGORIAS_ORDEN, formatearPrecio } from "@/lib/productos";
import ProductFilters from "@/components/product-filters";
import DireccionSelector from "./direccion-selector";

export default async function RegalosDeOcasionPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tienda?: string; tipo?: string }>;
}) {
  const user = await requireCurrentUser();
  const { id } = await params;
  const { tienda, tipo } = await searchParams;

  const ocasion = await prisma.occasion.findUnique({
    where: { id },
    include: {
      person: {
        include: {
          addresses: { orderBy: [{ isPrimary: "desc" }, { createdAt: "asc" }] },
        },
      },
      giftSelections: { include: { product: true }, orderBy: { createdAt: "asc" } },
    },
  });

  if (!ocasion || ocasion.person.userId !== user.id) {
    notFound();
  }

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

  const elegidos = ocasion.giftSelections.filter((s) => !s.cancelledAt);
  const idsElegidos = new Set(elegidos.map((s) => s.productId));
  const total = elegidos.reduce((suma, s) => suma + Number(s.product.price), 0);
  const direcciones = ocasion.person.addresses;
  const sinDirecciones = direcciones.length === 0;
  const direccionSeleccionada = ocasion.addressId ?? direcciones[0]?.id ?? "";

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
              Regalos para {motivoDeOcasion(ocasion)}
            </h1>
            <p className="mt-1 text-sm text-gris-calido">de {ocasion.person.name}</p>
          </div>
          <Link href="/dashboard" className="text-xs font-semibold text-terracota">
            Volver al dashboard
          </Link>
        </div>

        {sinDirecciones ? (
          <div className="mt-8 rounded-2xl border border-arena bg-white px-6 py-8 text-center">
            <p className="text-sm text-gris-calido">
              {ocasion.person.name} todavía no tiene ninguna dirección
              registrada. Agrega una para poder elegir regalos para esta
              fecha.
            </p>
            <Link
              href={`/dashboard/personas/${ocasion.person.id}/direcciones/nueva`}
              className={`${buttonClasses("primary", "text-xs")} mt-4`}
            >
              + Agregar dirección
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-8 rounded-2xl border border-arena bg-white px-5 py-4">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="font-display text-lg italic text-ciruelo">
                  Elegidos ({elegidos.length})
                </h2>
                {elegidos.length > 0 && (
                  <span className="font-display text-lg italic text-terracota">
                    Total: {formatearPrecio(total)}
                  </span>
                )}
              </div>

              <DireccionSelector
                occasionId={ocasion.id}
                direcciones={direcciones}
                seleccionada={direccionSeleccionada}
              />

              {elegidos.length === 0 ? (
                <p className="mt-3 text-sm text-gris-calido">
                  Todavía no eliges ningún regalo para esta fecha.
                </p>
              ) : (
                <ul className="mt-3 flex flex-col gap-2">
                  {elegidos.map((seleccion) => (
                    <li
                      key={seleccion.id}
                      className="flex items-center justify-between rounded-lg bg-crema px-3 py-2.5 text-sm"
                    >
                      <div>
                        <span className="font-medium text-carbon">
                          {seleccion.product.name}
                        </span>
                        <span className="text-xs text-gris-calido">
                          {" "}
                          · {seleccion.product.brand}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gris-calido">
                          {formatearPrecio(seleccion.product.price.toString())}
                        </span>
                        <form action={quitarRegalo}>
                          <input type="hidden" name="id" value={seleccion.id} />
                          <button
                            type="submit"
                            className="min-h-[44px] px-1 text-xs font-semibold text-terracota"
                          >
                            Quitar
                          </button>
                        </form>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mt-8">
              <Suspense>
                <ProductFilters tiendas={tiendas} tipos={tipos} />
              </Suspense>
            </div>

            {porCategoria.length === 0 && (
              <div className="mt-6 rounded-2xl border border-arena bg-white px-6 py-10 text-center">
                <p className="text-sm text-gris-calido">No hay productos con ese filtro.</p>
              </div>
            )}

            <div className="mt-6 flex flex-col gap-8">
              {porCategoria.map(({ categoria, productos: productosDeCategoria }) => (
                <div key={categoria}>
                  <h2 className="mb-3 font-display text-xl italic text-ciruelo">
                    {CATEGORIA_LABEL[categoria]}
                  </h2>
                  <ul className="flex flex-col gap-3">
                    {productosDeCategoria.map((producto) => {
                      const yaElegido = idsElegidos.has(producto.id);
                      return (
                        <li
                          key={producto.id}
                          className="rounded-2xl border border-arena bg-white px-5 py-4"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="text-sm font-semibold text-carbon">
                                {producto.name}
                              </div>
                              <div className="text-xs text-gris-calido">
                                {producto.brand}
                              </div>
                              {producto.description && (
                                <p className="mt-1 text-xs text-gris-calido">
                                  {producto.description}
                                </p>
                              )}
                              <div className="mt-1 font-display text-base italic text-terracota">
                                {formatearPrecio(producto.price.toString())}
                              </div>
                            </div>
                            {yaElegido ? (
                              <span
                                className={`${buttonClasses("ghost", "text-xs")} cursor-default`}
                              >
                                Ya elegido
                              </span>
                            ) : (
                              <form action={agregarRegalo}>
                                <input type="hidden" name="occasionId" value={ocasion.id} />
                                <input type="hidden" name="productId" value={producto.id} />
                                <Button type="submit" className="text-xs">
                                  + Agregar
                                </Button>
                              </form>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
