import Link from "next/link";
import { signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import { requireCurrentUser } from "@/lib/dal";
import { Button, buttonClasses } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { badgeDeOcasion, motivoDeOcasion, proximaFechaOcasion } from "@/lib/ocasiones";
import { DISTRITO_LABEL, HOUSING_TYPE_LABEL } from "@/lib/lima-distritos";

export default async function DashboardPage() {
  const user = await requireCurrentUser();

  const personas = await prisma.person.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "asc" },
    include: {
      occasions: { orderBy: { createdAt: "asc" } },
      addresses: { orderBy: [{ isPrimary: "desc" }, { createdAt: "asc" }] },
    },
  });

  const saludo = user.name?.split(" ")[0] ?? user.email;

  return (
    <div className="flex flex-1 flex-col items-center px-6 py-16">
      <div className="flex w-full max-w-2xl items-center justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-terracota">
            Siempre Presente
          </p>
          <h1 className="mt-1 font-display text-3xl italic text-ciruelo">
            Hola, {saludo}
          </h1>
        </div>

        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/login" });
          }}
        >
          <Button type="submit" variant="ghost" className="text-xs">
            Cerrar sesión
          </Button>
        </form>
      </div>

      <div className="mt-10 w-full max-w-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl italic text-ciruelo">
            Personas ({personas.length})
          </h2>
          {personas.length > 0 && (
            <Link href="/dashboard/personas/nueva" className={buttonClasses("primary", "text-xs")}>
              + Agregar persona
            </Link>
          )}
        </div>

        {personas.length === 0 ? (
          <div className="rounded-2xl border border-arena bg-white px-6 py-10 text-center">
            <p className="text-sm text-gris-calido">
              Todavía no agregaste a nadie. Empieza por la persona más
              importante.
            </p>
            <Link
              href="/dashboard/personas/nueva"
              className={`${buttonClasses("primary", "text-xs")} mt-4`}
            >
              + Agregar persona
            </Link>
          </div>
        ) : (
          <ul className="flex flex-col gap-4">
            {personas.map((persona) => (
              <li
                key={persona.id}
                className="rounded-2xl border border-arena bg-white px-5 py-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Avatar inicial={persona.name.charAt(0).toUpperCase()} />
                    <div>
                      <div className="font-display text-lg italic text-ciruelo">
                        {persona.name}
                      </div>
                      <div className="text-xs text-gris-calido">
                        {persona.relationship}
                        {persona.addresses[0]
                          ? ` · ${DISTRITO_LABEL[persona.addresses[0].district]}`
                          : ""}
                      </div>
                    </div>
                  </div>
                  <Link
                    href={`/dashboard/personas/${persona.id}/editar`}
                    className="text-xs font-semibold text-terracota"
                  >
                    Editar
                  </Link>
                </div>

                <div className="mt-4 flex flex-col gap-1.5">
                  {[...persona.occasions]
                    .sort(
                      (a, b) =>
                        proximaFechaOcasion(a).getTime() -
                        proximaFechaOcasion(b).getTime()
                    )
                    .map((ocasion) => {
                      const badge = badgeDeOcasion(ocasion);
                      return (
                        <Link
                          key={ocasion.id}
                          href={`/dashboard/ocasiones/${ocasion.id}/editar`}
                          className="flex items-center justify-between rounded-lg bg-crema px-3 py-2.5 text-xs"
                        >
                          <span className="font-medium text-carbon">
                            {motivoDeOcasion(ocasion)}
                            {ocasion.frequency === "MONTHLY" ? " · Mensual" : ""}
                          </span>
                          <Badge urgent={badge.urgent}>{badge.label}</Badge>
                        </Link>
                      );
                    })}

                  <Link
                    href={`/dashboard/personas/${persona.id}/ocasiones/nueva`}
                    className="mt-1 text-xs font-semibold text-terracota"
                  >
                    + Agregar fecha
                  </Link>
                </div>

                <div className="mt-3 flex flex-col gap-1.5 border-t border-arena pt-3">
                  {persona.addresses.length === 0 && (
                    <p className="text-xs text-gris-calido">
                      Sin direcciones registradas todavía.
                    </p>
                  )}
                  {persona.addresses.map((direccion) => (
                    <Link
                      key={direccion.id}
                      href={`/dashboard/direcciones/${direccion.id}/editar`}
                      className="flex items-center justify-between rounded-lg bg-crema px-3 py-2.5 text-xs"
                    >
                      <span className="font-medium text-carbon">
                        {direccion.label}: {HOUSING_TYPE_LABEL[direccion.housingType]}{" "}
                        {direccion.number}, {direccion.street}
                      </span>
                      <span className="text-gris-calido">
                        {DISTRITO_LABEL[direccion.district]}
                        {direccion.isPrimary ? " · Principal" : ""}
                      </span>
                    </Link>
                  ))}

                  <Link
                    href={`/dashboard/personas/${persona.id}/direcciones/nueva`}
                    className="mt-1 text-xs font-semibold text-terracota"
                  >
                    + Agregar dirección
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
