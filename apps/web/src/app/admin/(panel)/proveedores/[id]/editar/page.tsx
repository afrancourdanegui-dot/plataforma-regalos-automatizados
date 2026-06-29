import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  asignarProductoAProveedor,
  quitarProductoDeProveedor,
  marcarProveedorPrincipal,
} from "@/lib/actions/supplier-actions";
import { CATEGORIA_LABEL, CATEGORIAS_ORDEN } from "@/lib/productos";
import EditarProveedorForm from "./editar-form";

export default async function EditarProveedorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const proveedor = await prisma.supplier.findUnique({
    where: { id },
    include: { products: true },
  });
  if (!proveedor) notFound();

  const productos = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: { name: "asc" },
  });

  const asignados = new Map(proveedor.products.map((ps) => [ps.productId, ps]));
  const porCategoria = CATEGORIAS_ORDEN.map((categoria) => ({
    categoria,
    productos: productos.filter((producto) => producto.category === categoria),
  })).filter((grupo) => grupo.productos.length > 0);

  return (
    <div className="flex flex-1 flex-col items-center px-6 py-12">
      <div className="w-full max-w-2xl">
        <h1 className="mb-6 text-center font-display text-3xl italic text-ciruelo">
          Editar proveedor
        </h1>

        <EditarProveedorForm proveedor={proveedor} />

        <div className="mt-8">
          <h2 className="mb-3 font-display text-xl italic text-ciruelo">
            Productos que provee
          </h2>
          <div className="flex flex-col gap-6">
            {porCategoria.map(({ categoria, productos: productosDeCategoria }) => (
              <div key={categoria}>
                <h3 className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-gris-calido">
                  {CATEGORIA_LABEL[categoria]}
                </h3>
                <ul className="flex flex-col gap-2">
                  {productosDeCategoria.map((producto) => {
                    const asignacion = asignados.get(producto.id);
                    return (
                      <li
                        key={producto.id}
                        className="flex items-center justify-between gap-3 rounded-lg bg-crema px-3 py-2.5 text-sm"
                      >
                        <span className="font-medium text-carbon">
                          {producto.name}
                          {asignacion?.isPrincipal && (
                            <span className="ml-2 text-[10px] font-bold uppercase tracking-[0.15em] text-terracota">
                              Principal
                            </span>
                          )}
                        </span>
                        <div className="flex items-center gap-3 text-xs font-semibold">
                          {asignacion ? (
                            <>
                              {!asignacion.isPrincipal && (
                                <form action={marcarProveedorPrincipal}>
                                  <input type="hidden" name="supplierId" value={proveedor.id} />
                                  <input type="hidden" name="productId" value={producto.id} />
                                  <button type="submit" className="text-terracota">
                                    Marcar principal
                                  </button>
                                </form>
                              )}
                              <form action={quitarProductoDeProveedor}>
                                <input type="hidden" name="supplierId" value={proveedor.id} />
                                <input type="hidden" name="productId" value={producto.id} />
                                <button type="submit" className="text-gris-calido">
                                  Quitar
                                </button>
                              </form>
                            </>
                          ) : (
                            <form action={asignarProductoAProveedor}>
                              <input type="hidden" name="supplierId" value={proveedor.id} />
                              <input type="hidden" name="productId" value={producto.id} />
                              <button type="submit" className="text-terracota">
                                + Asignar
                              </button>
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
        </div>

        <Link href="/admin/proveedores" className="mt-8 block text-center text-sm text-gris-calido">
          Volver a proveedores
        </Link>
      </div>
    </div>
  );
}
