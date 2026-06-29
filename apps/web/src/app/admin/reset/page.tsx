import { Suspense } from "react";
import ResetForm from "./reset-form";

export default function ResetAdminPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-20">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gris-calido">
            Siempre Presente
          </p>
          <h1 className="mt-2 font-display text-3xl italic text-ciruelo">
            Nueva contraseña
          </h1>
        </div>

        <div className="rounded-2xl border border-arena bg-white p-6">
          <Suspense>
            <ResetForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
