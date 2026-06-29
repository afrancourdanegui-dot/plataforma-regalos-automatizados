import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireCurrentUser } from "@/lib/dal";
import { motivoDeOcasion } from "@/lib/ocasiones";
import { cancelarRegalo } from "@/lib/actions/gift-actions";
import { Badge } from "@/components/ui/badge";
import { estadoDeRegalo, formatearPrecio } from "@/lib/productos";

export default async function PedidosPage() {
  const user = await requireCurrentUser();

  const seleccionados = await prisma.giftSelection.findMany({
    where: { occasion: { person: { userId: user.id } } },
    orderBy: { createdAt: "desc" },
    include: { product: true, occasion: { include: { person: true } } },
  });

  return (
    <div className="flex flex-1 flex-col items-center px-6 py-16">
      <div className="w-full max-w-2xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-terracota">
              Siempre Presente
            </p>
            <h1 className="mt-1 font-display text-3xl italic text-ciruelo">
              Historial de pedidos
            </h1>
          </div>
          <Link href="/dashboard" className="text-xs font-semibold text-terracota">
            Volver al dashboard
          </Link>
        </div>

        {seleccionados.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-arena bg-white px-6 py-10 text-center">
            <p className="text-sm text-gris-calido">
              Todavía no elegiste ningún regalo. Entra a una persona y su
              fecha para elegir uno.
            </p>
          </div>
        ) : (
          <ul className="mt-8 flex flex-col gap-3">
            {seleccionados.map((seleccion) => {
              const estado = estadoDeRegalo(seleccion);
              const resuelto = estado.code !== "PROGRAMADO";
              return (
                <li
                  key={seleccion.id}
                  className={`rounded-2xl border border-arena bg-white px-5 py-4 ${
                    resuelto ? "opacity-70" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-sm font-semibold text-carbon ${
                            estado.code === "CANCELADO" ? "line-through" : ""
                          }`}
                        >
                          {seleccion.product.name}
                        </span>
                        {estado.code === "PROGRAMADO" ? (
                          <Badge>{estado.label}</Badge>
                        ) : (
                          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gris-calido">
                            {estado.label}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gris-calido">
                        {seleccion.product.brand}
                      </div>
                      <Link
                        href={`/dashboard/ocasiones/${seleccion.occasion.id}/regalos`}
                        className="mt-1 block text-xs font-medium text-terracota"
                      >
                        Para {motivoDeOcasion(seleccion.occasion)} de{" "}
                        {seleccion.occasion.person.name}
                      </Link>
                    </div>
                    <div className="text-right">
                      <div className="font-display text-base italic text-terracota">
                        {formatearPrecio(seleccion.product.price.toString())}
                      </div>
                      <div className="mt-1 text-xs text-gris-calido">
                        Elegido el{" "}
                        {seleccion.createdAt.toLocaleDateString("es-PE", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </div>
                      {estado.code === "PROGRAMADO" && (
                        <form action={cancelarRegalo} className="mt-1">
                          <input type="hidden" name="id" value={seleccion.id} />
                          <button
                            type="submit"
                            className="text-xs font-semibold text-terracota"
                          >
                            Cancelar
                          </button>
                        </form>
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
