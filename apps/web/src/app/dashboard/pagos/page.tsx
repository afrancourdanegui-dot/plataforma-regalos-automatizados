import Link from "next/link";
import { requireCurrentUser } from "@/lib/dal";

export default async function PagosPage() {
  await requireCurrentUser();

  return (
    <div className="flex flex-1 flex-col items-center px-6 py-16">
      <div className="w-full max-w-2xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-terracota">
              Siempre Presente
            </p>
            <h1 className="mt-1 font-display text-3xl italic text-ciruelo">
              Métodos de pago
            </h1>
          </div>
          <Link href="/dashboard" className="text-xs font-semibold text-terracota">
            Volver al dashboard
          </Link>
        </div>

        <div className="mt-8 rounded-2xl border border-arena bg-white px-6 py-12 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-crema">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-7 w-7 text-gris-calido"
              aria-hidden="true"
            >
              <rect x="2" y="5" width="20" height="14" rx="3" />
              <path d="M2 10h20" strokeLinecap="round" />
              <path d="M6 15h4" strokeLinecap="round" />
            </svg>
          </div>
          <p className="text-sm font-semibold text-carbon">
            No tienes tarjetas guardadas
          </p>
          <p className="mx-auto mt-1 max-w-xs text-xs text-gris-calido">
            Cuando se acerque una fecha especial, podrás agregar una tarjeta
            para que el cobro sea automático.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-[10px] bg-arena px-4 py-2.5 text-sm font-semibold text-gris-calido cursor-not-allowed select-none">
            + Agregar tarjeta
            <span className="rounded-md bg-gris-calido/20 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
              Próximamente
            </span>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-arena bg-white px-5 py-5">
          <h2 className="font-display text-lg italic text-ciruelo">
            ¿Cómo va a funcionar?
          </h2>
          <ol className="mt-4 flex flex-col gap-4">
            {[
              "Guardas una tarjeta una sola vez, con toda la seguridad de Stripe.",
              "Cuando se acerca una fecha, te avisamos con anticipación para que puedas revisar o cambiar el regalo.",
              "El cobro se hace automáticamente y el regalo llega sin que tengas que hacer nada más.",
            ].map((texto, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gris-calido">
                <span className="mt-0.5 font-display text-base italic text-terracota shrink-0">
                  {i + 1}.
                </span>
                {texto}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
