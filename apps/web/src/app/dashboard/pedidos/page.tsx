import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireCurrentUser } from "@/lib/dal";
import { motivoDeOcasion } from "@/lib/ocasiones";
import { cancelarRegalo } from "@/lib/actions/gift-actions";
import { Badge } from "@/components/ui/badge";
import { estadoDeRegalo, formatearPrecio } from "@/lib/productos";

function formatFecha(fecha: Date) {
  return fecha.toLocaleDateString("es-PE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function PedidosPage() {
  const user = await requireCurrentUser();

  const seleccionados = await prisma.giftSelection.findMany({
    where: { occasion: { person: { userId: user.id } } },
    orderBy: { dueDate: "asc" },
    include: { product: true, occasion: { include: { person: true } } },
  });

  const programados = seleccionados.filter(
    (s) => estadoDeRegalo(s).code === "PROGRAMADO"
  );
  const pasados = seleccionados
    .filter((s) => estadoDeRegalo(s).code !== "PROGRAMADO")
    .reverse();

  const hayPedidos = seleccionados.length > 0;

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

        {!hayPedidos ? (
          <div className="mt-8 rounded-2xl border border-arena bg-white px-6 py-10 text-center">
            <p className="text-sm text-gris-calido">
              Todavía no elegiste ningún regalo. Entra a una persona y su
              fecha para elegir uno.
            </p>
          </div>
        ) : (
          <div className="mt-8 flex flex-col gap-8">
            {programados.length > 0 && (
              <section>
                <h2 className="mb-3 font-display text-xl italic text-ciruelo">
                  Programados ({programados.length})
                </h2>
                <ul className="flex flex-col gap-3">
                  {programados.map((seleccion) => {
                    const estado = estadoDeRegalo(seleccion);
                    return (
                      <li
                        key={seleccion.id}
                        className="rounded-2xl border border-arena bg-white px-5 py-4"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-carbon">
                                {seleccion.product.name}
                              </span>
                              <Badge>{estado.label}</Badge>
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
                            <div className="mt-0.5 text-xs text-gris-calido">
                              Fecha de entrega: {formatFecha(seleccion.dueDate)}
                            </div>
                          </div>
                          <div className="shrink-0 text-right">
                            <div className="font-display text-base italic text-terracota">
                              {formatearPrecio(seleccion.product.price.toString())}
                            </div>
                            <form action={cancelarRegalo} className="mt-1">
                              <input type="hidden" name="id" value={seleccion.id} />
                              <button
                                type="submit"
                                className="min-h-[44px] px-1 text-xs font-semibold text-gris-calido hover:text-terracota transition-colors"
                              >
                                Cancelar
                              </button>
                            </form>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </section>
            )}

            {pasados.length > 0 && (
              <section>
                <h2 className="mb-3 font-display text-xl italic text-ciruelo">
                  Historial ({pasados.length})
                </h2>
                <ul className="flex flex-col gap-3">
                  {pasados.map((seleccion) => {
                    const estado = estadoDeRegalo(seleccion);
                    const entregado = estado.code === "CUMPLIDO";
                    return (
                      <li
                        key={seleccion.id}
                        className="rounded-2xl border border-arena bg-white px-5 py-4 opacity-80"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span
                                className={`text-sm font-semibold text-carbon ${
                                  !entregado ? "line-through" : ""
                                }`}
                              >
                                {seleccion.product.name}
                              </span>
                              {entregado ? (
                                <span className="inline-block rounded-full bg-ciruelo/10 px-2.5 py-1 text-[10px] font-bold tracking-wide text-ciruelo">
                                  {estado.label}
                                </span>
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
                              className="mt-1 block text-xs font-medium text-terracota/70"
                            >
                              Para {motivoDeOcasion(seleccion.occasion)} de{" "}
                              {seleccion.occasion.person.name}
                            </Link>
                            <div className="mt-0.5 text-xs text-gris-calido">
                              {entregado
                                ? `Entregado el ${formatFecha(seleccion.dueDate)}`
                                : `Cancelado el ${formatFecha(seleccion.cancelledAt ?? seleccion.dueDate)}`}
                            </div>
                          </div>
                          <div className="shrink-0 text-right">
                            <div className="font-display text-base italic text-gris-calido">
                              {formatearPrecio(seleccion.product.price.toString())}
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
