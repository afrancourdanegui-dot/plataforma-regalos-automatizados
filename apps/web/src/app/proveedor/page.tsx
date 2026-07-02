import Link from "next/link";
import { MarketingNav } from "@/components/marketing-nav";

export default function ProveedorPage() {
  return (
    <div className="min-h-screen bg-crema font-sans text-carbon">
      <MarketingNav />

      <div className="mx-auto max-w-[640px] px-6 py-20">
        <div className="mb-10">
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-arena px-3.5 py-[7px] text-[11px] font-bold uppercase tracking-[0.06em] text-ciruelo">
            <span className="h-1.5 w-1.5 rounded-full bg-terracota" />
            Proveedores
          </span>
          <h1 className="mt-4 font-display italic font-light text-[2.2rem] leading-[1.1] text-ciruelo">
            Llega a más clientes
            <br />
            con menos esfuerzo
          </h1>
          <p className="mt-4 text-[15px] leading-[1.65] text-gris-calido">
            Siempre Presente conecta a florerías, pastelerías, spas y
            productoras de Lima con personas que ya decidieron regalar. Tú
            produces, nosotros gestionamos el pedido y la entrega.
          </p>
        </div>

        <div className="rounded-2xl border border-arena bg-white p-7">
          <h2 className="mb-6 font-display italic font-light text-[1.4rem] text-ciruelo">
            Contáctanos para sumarte
          </h2>
          <div className="flex flex-col gap-4 text-[14px] text-gris-calido">
            <p>Escríbenos con el nombre de tu negocio y qué ofreces:</p>
            <a
              href="mailto:hola@siemprepresente.pe?subject=Quiero+ser+proveedor"
              className="inline-flex items-center justify-center rounded-[10px] bg-terracota px-6 py-3.5 text-[14.5px] font-bold text-white"
              style={{ boxShadow: "var(--shadow-cta)" }}
            >
              Escribirnos por email
            </a>
            <p className="text-center text-[12px]">
              hola@siemprepresente.pe
            </p>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-gris-calido">
          <Link href="/" className="font-semibold text-terracota">
            ← Volver al inicio
          </Link>
        </p>
      </div>
    </div>
  );
}
