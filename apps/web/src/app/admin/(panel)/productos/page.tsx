import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { buttonClasses } from "@/components/ui/button";
import { CATEGORIA_LABEL, formatearPrecio } from "@/lib/productos";
import { ocultarProducto, mostrarProducto } from "@/lib/actions/product-actions";

export default async function ProductosPage() {
  const productos = await prisma.product.findMany({
    orderBy: [{ isActive: "desc" }, { category: "asc" }, { name: "asc" }],
  });

  return (
    <div className="flex flex-1 flex-col items-center px-6 py-12">
      <div className="w-full max-w-3xl">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-3xl italic text-ciruelo">Productos</h1>
          <Link href="/admin/productos/nuevo" className={buttonClasses("primary", "text-xs")}>
            + Nuevo producto
          </Link>
        </div>
        <p className="mt-2 text-xs text-gris-calido">
          Los productos ocultos no aparecen en el catálogo ni en el picker de los clientes.
        </p>

        <ul className="mt-6 flex flex-col gap-3">
          {productos.map((producto) => (
            <li
              key={producto.id}
              className={`rounded-2xl border border-arena bg-white px-5 py-4 ${
                producto.isActive ? "" : "opacity-60"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-carbon">{producto.name}</span>
                    {!producto.isActive && (
                      <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gris-calido">
                        Oculto
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gris-calido">
                    {producto.brand} · {CATEGORIA_LABEL[producto.category]}
                    {producto.subtype ? ` · ${producto.subtype}` : ""}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 text-right text-xs font-semibold">
                  <span className="font-display text-base italic text-terracota">
                    {formatearPrecio(producto.price.toString())}
                  </span>
                  <div className="flex items-center gap-3">
                    <Link href={`/admin/productos/${producto.id}/editar`} className="text-terracota">
                      Editar
                    </Link>
                    {producto.isActive ? (
                      <form action={ocultarProducto}>
                        <input type="hidden" name="id" value={producto.id} />
                        <button type="submit" className="text-gris-calido">
                          Ocultar
                        </button>
                      </form>
                    ) : (
                      <form action={mostrarProducto}>
                        <input type="hidden" name="id" value={producto.id} />
                        <button type="submit" className="text-terracota">
                          Mostrar
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
