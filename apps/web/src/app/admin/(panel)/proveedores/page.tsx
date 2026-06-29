import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { buttonClasses } from "@/components/ui/button";
import { desactivarProveedor, reactivarProveedor } from "@/lib/actions/supplier-actions";

export default async function ProveedoresPage() {
  const proveedores = await prisma.supplier.findMany({
    orderBy: [{ isActive: "desc" }, { name: "asc" }],
    include: { products: { include: { product: true } } },
  });

  return (
    <div className="flex flex-1 flex-col items-center px-6 py-12">
      <div className="w-full max-w-3xl">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-3xl italic text-ciruelo">Proveedores</h1>
          <Link href="/admin/proveedores/nuevo" className={buttonClasses("primary", "text-xs")}>
            + Nuevo proveedor
          </Link>
        </div>

        {proveedores.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-arena bg-white px-6 py-10 text-center">
            <p className="text-sm text-gris-calido">Todavía no agregaste ningún proveedor.</p>
          </div>
        ) : (
          <ul className="mt-6 flex flex-col gap-3">
            {proveedores.map((proveedor) => (
              <li
                key={proveedor.id}
                className={`rounded-2xl border border-arena bg-white px-5 py-4 ${
                  proveedor.isActive ? "" : "opacity-60"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-carbon">
                        {proveedor.name}
                      </span>
                      {!proveedor.isActive && (
                        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gris-calido">
                          Inactivo
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gris-calido">
                      {[proveedor.phone, proveedor.email].filter(Boolean).join(" · ") || "Sin contacto"}
                    </div>
                    <div className="mt-1 text-xs text-gris-calido">
                      {proveedor.products.length === 0
                        ? "Sin productos asignados"
                        : proveedor.products
                            .map((ps) => ps.product.name + (ps.isPrincipal ? " (principal)" : ""))
                            .join(", ")}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 text-xs font-semibold">
                    <Link href={`/admin/proveedores/${proveedor.id}/editar`} className="text-terracota">
                      Editar
                    </Link>
                    {proveedor.isActive ? (
                      <form action={desactivarProveedor}>
                        <input type="hidden" name="id" value={proveedor.id} />
                        <button type="submit" className="text-gris-calido">
                          Desactivar
                        </button>
                      </form>
                    ) : (
                      <form action={reactivarProveedor}>
                        <input type="hidden" name="id" value={proveedor.id} />
                        <button type="submit" className="text-terracota">
                          Reactivar
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
