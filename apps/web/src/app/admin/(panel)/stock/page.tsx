import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { diasRestantes } from "@/lib/ocasiones";
import { estadoDeRegalo, formatearPrecio } from "@/lib/productos";
import { Badge } from "@/components/ui/badge";

export default async function StockPage() {
  const pedidos = await prisma.giftSelection.findMany({
    include: {
      product: { include: { suppliers: { include: { supplier: true } } } },
    },
  });

  const pendientes = pedidos.filter((p) => !p.cancelledAt && estadoDeRegalo(p).code === "PROGRAMADO");

  const porProducto = new Map<
    string,
    { product: typeof pendientes[number]["product"]; cantidad: number; proximaFecha: Date }
  >();

  for (const pedido of pendientes) {
    const existente = porProducto.get(pedido.productId);
    if (existente) {
      existente.cantidad += 1;
      if (pedido.dueDate < existente.proximaFecha) existente.proximaFecha = pedido.dueDate;
    } else {
      porProducto.set(pedido.productId, {
        product: pedido.product,
        cantidad: 1,
        proximaFecha: pedido.dueDate,
      });
    }
  }

  const filas = Array.from(porProducto.values()).sort((a, b) => b.cantidad - a.cantidad);

  return (
    <div className="flex flex-1 flex-col items-center px-6 py-12">
      <div className="w-full max-w-3xl">
        <h1 className="font-display text-3xl italic text-ciruelo">Demanda por producto</h1>
        <p className="mt-2 text-xs text-gris-calido">
          Cuántos pedidos programados hay de cada producto, para coordinar con los proveedores. No
          es un inventario real, solo cuenta pedidos pendientes.
        </p>

        {filas.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-arena bg-white px-6 py-10 text-center">
            <p className="text-sm text-gris-calido">No hay pedidos programados todavía.</p>
          </div>
        ) : (
          <ul className="mt-6 flex flex-col gap-3">
            {filas.map(({ product, cantidad, proximaFecha }) => {
              const dias = diasRestantes(proximaFecha);
              const proveedores = [...product.suppliers].sort(
                (a, b) => Number(b.isPrincipal) - Number(a.isPrincipal)
              );

              return (
                <li key={product.id} className="rounded-2xl border border-arena bg-white px-5 py-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-carbon">{product.name}</span>
                        <Badge urgent={dias <= 3}>
                          {cantidad} pedido{cantidad === 1 ? "" : "s"}
                        </Badge>
                      </div>
                      <div className="text-xs text-gris-calido">
                        {product.brand} · {formatearPrecio(product.price.toString())} c/u
                      </div>
                      <div className="mt-1 text-xs text-gris-calido">
                        Más próximo: en {dias} día{dias === 1 ? "" : "s"}
                      </div>
                    </div>
                    <div className="text-right text-xs">
                      {proveedores.length === 0 ? (
                        <Link href="/admin/proveedores" className="font-semibold text-terracota">
                          Sin proveedor asignado
                        </Link>
                      ) : (
                        <ul>
                          {proveedores.map((ps) => (
                            <li key={ps.id} className="text-gris-calido">
                              <Link
                                href={`/admin/proveedores/${ps.supplierId}/editar`}
                                className={ps.isPrincipal ? "font-semibold text-terracota" : ""}
                              >
                                {ps.supplier.name}
                                {ps.isPrincipal ? " (principal)" : ""}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
