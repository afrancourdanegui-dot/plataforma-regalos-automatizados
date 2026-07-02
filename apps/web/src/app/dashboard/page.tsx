import Link from "next/link";
import { signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import { requireCurrentUser } from "@/lib/dal";
import { buttonClasses } from "@/components/ui/button";
import {
  motivoDeOcasion,
  proximaFechaOcasion,
  diasRestantes,
  etiquetaDias,
  formatearFechaLarga,
} from "@/lib/ocasiones";
import { DISTRITO_LABEL, HOUSING_TYPE_LABEL } from "@/lib/lima-distritos";

const AVATAR_PALETTE = [
  { bg: "#F0DCCB", fg: "#A9451F" },
  { bg: "#E6DAEA", fg: "#6A4A63" },
  { bg: "#D9E3D6", fg: "#4A6247" },
  { bg: "#F1E1CC", fg: "#96682F" },
];

function GiftBoxIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="8" width="18" height="13" rx="1.5" />
      <path d="M3 12h18M12 8v13" />
      <path d="M12 8C11 4.5 9 4 7.8 5.2 6.6 6.4 8.5 8 12 8zM12 8c1-3.5 3-4 4.2-2.8C17.4 6.4 15.5 8 12 8z" />
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4.5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 2.5v4M16 2.5v4" />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#A9724E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
      <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.4" />
    </svg>
  );
}

function StatCard({
  label,
  value,
  dark = false,
}: {
  label: string;
  value: string | number;
  dark?: boolean;
}) {
  return (
    <div
      className="min-w-[100px] rounded-2xl px-[22px] py-4"
      style={{
        background: dark ? "#3A1E30" : "#fff",
        border: dark ? "1px solid #3A1E30" : "1px solid #EADFCF",
        boxShadow: dark ? "0 8px 22px rgba(58,30,48,.16)" : "0 4px 16px rgba(58,30,48,.05)",
      }}
    >
      <div
        className="font-display text-[32px] leading-none"
        style={{ fontWeight: 500, color: dark ? "#F3E4D8" : "#3A1E30" }}
      >
        {value}
      </div>
      <div
        className="mt-1 font-ui text-[11.5px] font-semibold uppercase tracking-[.08em]"
        style={{ color: dark ? "#C9A88F" : "#8A7B64" }}
      >
        {label}
      </div>
    </div>
  );
}

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
  const initials = user.name
    ? user.name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase()
    : user.email[0]!.toUpperCase();

  const proximasFechas = personas
    .flatMap((persona) => persona.occasions.map((ocasion) => ({ persona, ocasion })))
    .map(({ persona, ocasion }) => {
      const fecha = proximaFechaOcasion(ocasion);
      return { persona, ocasion, fecha, dias: diasRestantes(fecha) };
    })
    .sort((a, b) => a.dias - b.dias);

  const MAX_PROXIMAS = 3;
  const proximasAMostrar = proximasFechas.slice(0, MAX_PROXIMAS);
  const proximaEtiqueta =
    proximasFechas.length > 0 ? etiquetaDias(proximasFechas[0].dias) : "—";

  return (
    <div className="min-h-screen bg-crema text-carbon">
      {/* NAV */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-10 py-4"
        style={{
          background: "rgba(250,242,236,.9)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid #EADFCF",
        }}
      >
        <Link
          href="/"
          className="font-display text-[22px] text-ciruelo"
          style={{ fontStyle: "italic", fontWeight: 500 }}
        >
          Siempre Presente
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/pedidos"
            className="rounded-full border border-borde bg-white px-[18px] py-[9px] font-ui text-sm font-semibold text-carbon transition-colors hover:border-terracota hover:text-terracota"
            style={{ boxShadow: "0 1px 3px rgba(58,30,48,.05)" }}
          >
            Historial de pedidos
          </Link>
          <Link
            href="/dashboard/regalos"
            className="rounded-full border border-borde bg-white px-[18px] py-[9px] font-ui text-sm font-semibold text-carbon transition-colors hover:border-terracota hover:text-terracota"
            style={{ boxShadow: "0 1px 3px rgba(58,30,48,.05)" }}
          >
            Catálogo de regalos
          </Link>
          <div
            className="flex items-center gap-2.5 rounded-full border border-borde bg-white py-[5px] pl-[5px] pr-3.5"
            style={{ boxShadow: "0 1px 3px rgba(58,30,48,.05)" }}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ciruelo font-ui text-xs font-bold text-crema">
              {initials}
            </span>
            <span className="font-ui text-sm font-semibold text-carbon">{saludo}</span>
            <span className="h-[18px] w-px bg-borde" />
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/login" });
              }}
            >
              <button
                type="submit"
                className="font-ui text-[13px] font-semibold text-mute transition-colors hover:text-terracota"
              >
                Salir
              </button>
            </form>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-[1160px] px-10 pb-24 pt-11">
        {/* GREETING + STATS */}
        <div className="mb-10 flex flex-wrap items-end justify-between gap-7">
          <div>
            <p className="mb-2 font-ui text-xs font-bold uppercase tracking-[.18em] text-eyebrow">
              Tu panel
            </p>
            <h1
              className="font-display text-[52px] leading-none text-ciruelo"
              style={{ fontStyle: "italic", fontWeight: 500 }}
            >
              Hola, {saludo}
            </h1>
          </div>
          <div className="flex gap-3.5">
            <StatCard label="Personas" value={personas.length} />
            <StatCard label="Fechas" value={proximasFechas.length} />
            <StatCard label="Próxima entrega" value={proximaEtiqueta} dark />
          </div>
        </div>

        {/* PROXIMAS FECHAS */}
        {proximasAMostrar.length > 0 && (
          <>
            <div className="mb-5 flex items-center gap-3">
              <h2
                className="font-display text-[28px] text-ciruelo"
                style={{ fontStyle: "italic", fontWeight: 500 }}
              >
                Próximas fechas
              </h2>
              <span className="h-px flex-1 bg-borde" />
            </div>
            <div className="mb-[52px] grid grid-cols-1 gap-5 md:grid-cols-3">
              {proximasAMostrar.map(({ persona, ocasion, fecha, dias }, i) => {
                const featured = i === 0;
                return (
                  <div
                    key={ocasion.id}
                    className="flex flex-col rounded-[20px] p-6"
                    style={{
                      background: featured ? "#FBF3EC" : "#fff",
                      border: featured ? "1.5px solid #C0552F" : "1px solid #EADFCF",
                      boxShadow: featured
                        ? "0 14px 36px rgba(192,85,47,.16)"
                        : "0 8px 26px rgba(58,30,48,.06)",
                    }}
                  >
                    <div className="mb-[18px] flex items-center justify-between">
                      <span
                        className="flex h-11 w-11 items-center justify-center rounded-[13px]"
                        style={{ background: "#FBEDE2", color: "#C0552F" }}
                      >
                        <GiftBoxIcon />
                      </span>
                      <span
                        className="rounded-full px-[13px] py-[6px] font-ui text-xs font-bold tracking-[.03em]"
                        style={{
                          background: featured ? "#C0552F" : "#F4E9DC",
                          color: featured ? "#fff" : "#A9724E",
                        }}
                      >
                        {etiquetaDias(dias)}
                      </span>
                    </div>
                    <div className="mb-[3px] font-ui text-[18px] font-bold text-carbon">
                      {motivoDeOcasion(ocasion)}
                    </div>
                    <div className="mb-[18px] text-[15px] text-atenuado">
                      para{" "}
                      <span className="font-semibold" style={{ color: "#3A2A20" }}>
                        {persona.name}
                      </span>{" "}
                      · {formatearFechaLarga(fecha)}
                    </div>
                    <Link
                      href={`/dashboard/ocasiones/${ocasion.id}/regalos`}
                      className="mt-auto inline-flex items-center gap-1.5 self-start rounded-[11px] bg-terracota px-[18px] py-[11px] font-ui text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-terracota-hover"
                      style={{ boxShadow: "0 6px 16px rgba(192,85,47,.26)" }}
                    >
                      Elegir regalo <span aria-hidden>→</span>
                    </Link>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* PERSONAS */}
        <div className="mb-[22px] flex items-center justify-between gap-4">
          <h2
            className="font-display text-[28px] text-ciruelo"
            style={{ fontStyle: "italic", fontWeight: 500 }}
          >
            Personas{" "}
            <span className="font-sans text-[22px] not-italic" style={{ color: "#B7A48C" }}>
              ({personas.length})
            </span>
          </h2>
          {personas.length > 0 && (
            <Link
              href="/dashboard/personas/nueva"
              className="inline-flex items-center gap-2 rounded-xl bg-terracota px-[22px] py-3 font-ui text-[14.5px] font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-terracota-hover"
              style={{ boxShadow: "0 8px 20px rgba(192,85,47,.28)" }}
            >
              <span className="text-[17px]">+</span> Agregar persona
            </Link>
          )}
        </div>

        {personas.length === 0 ? (
          <div className="rounded-2xl border border-arena bg-white px-6 py-10">
            <p className="mb-8 text-center text-sm text-gris-calido">
              Todo listo para empezar. Sigue estos tres pasos:
            </p>
            <div className="flex flex-col gap-4 md:flex-row md:gap-6">
              {[
                {
                  n: "1",
                  title: "Agrega a tu gente",
                  body: "Un familiar, pareja, amigo o colega. Sus datos y preferencias.",
                  href: "/dashboard/personas/nueva",
                  cta: "Agregar persona",
                },
                {
                  n: "2",
                  title: "Registra sus fechas",
                  body: "Cumpleaños, aniversarios, lo que quieras recordar.",
                  href: "/dashboard/personas/nueva",
                  cta: "Agregar después",
                },
                {
                  n: "3",
                  title: "Elige el regalo",
                  body: "Flores, tortas, vinos, spa. Nosotros lo entregamos a tiempo.",
                  href: "/catalogo",
                  cta: "Ver catálogo",
                },
              ].map((step) => (
                <div key={step.n} className="flex-1 rounded-[14px] bg-crema p-5">
                  <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-[8px] bg-ciruelo font-display italic text-[15px] text-crema">
                    {step.n}
                  </div>
                  <h3 className="mb-1 text-[14px] font-bold text-carbon">{step.title}</h3>
                  <p className="mb-4 text-[12.5px] leading-[1.6] text-gris-calido">{step.body}</p>
                  <Link href={step.href} className={buttonClasses("primary", "text-xs")}>
                    {step.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-[22px] md:grid-cols-2">
            {personas.map((persona, i) => {
              const avatar = AVATAR_PALETTE[i % AVATAR_PALETTE.length];
              const direccionPrincipal = persona.addresses[0];
              const fechasOrdenadas = [...persona.occasions].sort(
                (a, b) =>
                  proximaFechaOcasion(a).getTime() - proximaFechaOcasion(b).getTime()
              );

              return (
                <div
                  key={persona.id}
                  className="rounded-[20px] border border-borde bg-white px-[26px] pb-[22px] pt-[26px] transition-all hover:-translate-y-1"
                  style={{ boxShadow: "0 8px 26px rgba(58,30,48,.06)" }}
                >
                  {/* head */}
                  <div className="mb-[18px] flex items-start gap-4">
                    <span
                      className="flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-full font-display text-2xl"
                      style={{
                        background: avatar.bg,
                        color: avatar.fg,
                        fontStyle: "italic",
                        fontWeight: 500,
                      }}
                    >
                      {persona.name.charAt(0).toUpperCase()}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2.5">
                        <span
                          className="font-display text-2xl text-ciruelo"
                          style={{ fontStyle: "italic", fontWeight: 500 }}
                        >
                          {persona.name}
                        </span>
                        <Link
                          href={`/dashboard/personas/${persona.id}/editar`}
                          className="whitespace-nowrap font-ui text-[13.5px] font-semibold text-terracota transition-colors hover:text-terracota-hover"
                        >
                          Editar
                        </Link>
                      </div>
                      <div className="mt-[3px] font-ui text-xs font-semibold uppercase tracking-[.1em] text-eyebrow">
                        {persona.relationship}
                      </div>
                    </div>
                  </div>

                  {/* prefs */}
                  {persona.preferences.length > 0 && (
                    <div className="mb-[18px] flex flex-wrap gap-[7px]">
                      {persona.preferences.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full px-3 py-[5px] font-ui text-[12.5px] font-semibold"
                          style={{ color: "#7A5A46", background: "#F4E9DC" }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* dates */}
                  <div className="mb-3.5 flex flex-col gap-[9px]">
                    {fechasOrdenadas.length === 0 && (
                      <p className="text-[13px] text-gris-calido">
                        Sin fechas registradas todavía.
                      </p>
                    )}
                    {fechasOrdenadas.map((ocasion) => {
                      const fecha = proximaFechaOcasion(ocasion);
                      const dias = diasRestantes(fecha);
                      return (
                        <div
                          key={ocasion.id}
                          className="flex items-center justify-between gap-2.5 rounded-xl px-[15px] py-3"
                          style={{ background: "#FAF4EE", border: "1px solid #F0E4D5" }}
                        >
                          <div className="flex min-w-0 items-center gap-[11px]">
                            <span
                              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-white text-terracota"
                              style={{ border: "1px solid #F0E0D0" }}
                            >
                              <CalendarIcon />
                            </span>
                            <div className="min-w-0">
                              <div className="overflow-hidden text-ellipsis whitespace-nowrap font-ui text-[14.5px] font-semibold text-carbon">
                                {motivoDeOcasion(ocasion)}
                              </div>
                              <div className="text-[12.5px]" style={{ color: "#9A8B73" }}>
                                {formatearFechaLarga(fecha)} · {etiquetaDias(dias)}
                              </div>
                            </div>
                          </div>
                          <Link
                            href={`/dashboard/ocasiones/${ocasion.id}/regalos`}
                            className="whitespace-nowrap font-ui text-[13px] font-bold text-terracota transition-colors hover:text-terracota-hover"
                          >
                            + Elegir
                          </Link>
                        </div>
                      );
                    })}
                    <Link
                      href={`/dashboard/personas/${persona.id}/ocasiones/nueva`}
                      className="pl-1 font-ui text-[13.5px] font-semibold text-mute transition-colors hover:text-terracota"
                    >
                      + Agregar fecha
                    </Link>
                  </div>

                  {/* address */}
                  <div className="pt-[14px]" style={{ borderTop: "1px dashed #EADFCF" }}>
                    {direccionPrincipal ? (
                      <div className="flex items-center gap-2.5">
                        <PinIcon />
                        <span
                          className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-[13.5px]"
                          style={{ color: "#6B5A4B" }}
                        >
                          {HOUSING_TYPE_LABEL[direccionPrincipal.housingType]}{" "}
                          {direccionPrincipal.number}, {DISTRITO_LABEL[direccionPrincipal.district]}
                        </span>
                        <span
                          className="whitespace-nowrap rounded-full px-[9px] py-[3px] font-ui text-[11px] font-semibold uppercase tracking-[.05em]"
                          style={{ color: "#A9997F", background: "#F4E9DC" }}
                        >
                          {direccionPrincipal.label}
                        </span>
                      </div>
                    ) : (
                      <Link
                        href={`/dashboard/personas/${persona.id}/direcciones/nueva`}
                        className="font-ui text-[13px] font-semibold text-terracota transition-colors hover:text-terracota-hover"
                      >
                        + Agregar dirección
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
