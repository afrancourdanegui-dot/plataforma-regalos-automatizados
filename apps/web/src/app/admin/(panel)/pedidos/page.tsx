import { prisma } from "@/lib/prisma";
import { motivoDeOcasion, diasRestantes } from "@/lib/ocasiones";
import { estadoDeRegalo, formatearPrecio } from "@/lib/productos";
import { DISTRITO_LABEL, HOUSING_TYPE_LABEL } from "@/lib/lima-distritos";
import { Badge } from "@/components/ui/badge";

export default async function AdminPedidosPage() {
  const pedidos = await prisma.giftSelection.findMany({
    orderBy: { dueDate: "asc" },
    include: {
      product: true,
      occasion: {
        include: {
          person: { include: { user: true } },
          address: true,
        },
      },
    },
  });

  const pendientes = pedidos.filter((p) => !p.cancelledAt && estadoDeRegalo(p).code === "PROGRAMADO");
  const resueltos = pedidos.filter((p) => p.cancelledAt || estadoDeRegalo(p).code !== "PROGRAMADO");

  return (
    <div className="flex flex-1 flex-col items-center px-6 py-12">
      <div className="w-full max-w-3xl">
        <h1 className="font-display text-3xl italic text-ciruelo">
          Pedidos de todos los clientes
        </h1>
        <p className="mt-2 text-xs text-gris-calido">
          {pendientes.length} pedido{pendientes.length === 1 ? "" : "s"} programado
          {pendientes.length === 1 ? "" : "s"}.
        </p>

        {pendientes.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-arena bg-white px-6 py-10 text-center">
            <p className="text-sm text-gris-calido">
              No hay pedidos programados todavía.
            </p>
          </div>
        ) : (
          <ul className="mt-6 flex flex-col gap-3">
            {pendientes.map((pedido) => {
              const dias = diasRestantes(pedido.dueDate);
              const urgente = dias <= 3;
              const direccion = pedido.occasion.address;
              const cliente = pedido.occasion.person.user;

              return (
                <li
                  key={pedido.id}
                  className="rounded-2xl border border-arena bg-white px-5 py-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-carbon">
                          {pedido.product.name}
                        </span>
                        <Badge urgent={urgente}>
                          {dias <= 0
                            ? "Es hoy"
                            : `En ${dias} día${dias === 1 ? "" : "s"}`}
                        </Badge>
                      </div>
                      <div className="text-xs text-gris-calido">
                        {pedido.product.brand}
                      </div>
                      <div className="mt-1 text-xs font-medium text-terracota">
                        Para {motivoDeOcasion(pedido.occasion)} de{" "}
                        {pedido.occasion.person.name}
                      </div>
                      <div className="mt-2 text-xs text-gris-calido">
                        Cliente: {cliente.name ?? cliente.email} ({cliente.email})
                      </div>
                      <div className="text-xs text-gris-calido">
                        {direccion ? (
                          <>
                            Enviar a {HOUSING_TYPE_LABEL[direccion.housingType]}{" "}
                            {direccion.number}, {direccion.street},{" "}
                            {DISTRITO_LABEL[direccion.district]}
                          </>
                        ) : (
                          "Sin dirección de envío asignada"
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-display text-base italic text-terracota">
                        {formatearPrecio(pedido.product.price.toString())}
                      </div>
                      <div className="mt-1 text-xs text-gris-calido">
                        Entrega:{" "}
                        {pedido.dueDate.toLocaleDateString("es-PE", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {resueltos.length > 0 && (
          <div className="mt-10">
            <h2 className="mb-4 font-display text-xl italic text-ciruelo">
              Cumplidos y cancelados
            </h2>
            <ul className="flex flex-col gap-3">
              {resueltos.map((pedido) => {
                const estado = estadoDeRegalo(pedido);
                const cliente = pedido.occasion.person.user;
                return (
                  <li
                    key={pedido.id}
                    className="rounded-2xl border border-arena bg-white px-5 py-4 opacity-70"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-sm font-semibold text-carbon ${
                              estado.code === "CANCELADO" ? "line-through" : ""
                            }`}
                          >
                            {pedido.product.name}
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gris-calido">
                            {estado.label}
                          </span>
                        </div>
                        <div className="mt-1 text-xs font-medium text-terracota">
                          Para {motivoDeOcasion(pedido.occasion)} de{" "}
                          {pedido.occasion.person.name}
                        </div>
                        <div className="mt-2 text-xs text-gris-calido">
                          Cliente: {cliente.name ?? cliente.email}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-display text-base italic text-terracota">
                          {formatearPrecio(pedido.product.price.toString())}
                        </div>
                        <div className="mt-1 text-xs text-gris-calido">
                          {pedido.dueDate.toLocaleDateString("es-PE", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
