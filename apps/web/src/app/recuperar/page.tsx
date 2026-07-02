import Link from "next/link";

export default function RecuperarPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-20">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gris-calido">
            Siempre Presente
          </p>
          <h1 className="mt-2 font-display text-3xl italic text-ciruelo">
            Recuperar acceso
          </h1>
        </div>

        <div className="rounded-2xl border border-arena bg-white p-6 text-center">
          <p className="text-[14.5px] leading-[1.65] text-gris-calido">
            El restablecimiento de contraseña estará disponible pronto.
            Por ahora, escríbenos directamente y te ayudamos.
          </p>
          <a
            href="mailto:hola@siemprepresente.pe?subject=Recuperar+acceso"
            className="mt-5 inline-flex items-center justify-center rounded-[10px] bg-terracota px-6 py-3 text-[14px] font-bold text-white"
            style={{ boxShadow: "var(--shadow-cta)" }}
          >
            Escribirnos
          </a>
        </div>

        <p className="mt-6 text-center text-sm text-gris-calido">
          <Link href="/login" className="font-semibold text-terracota">
            ← Volver al login
          </Link>
        </p>
      </div>
    </div>
  );
}
