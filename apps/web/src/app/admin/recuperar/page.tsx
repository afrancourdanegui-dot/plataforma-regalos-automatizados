"use client";

import { useActionState } from "react";
import Link from "next/link";
import { solicitarRecuperacionAdmin } from "@/lib/actions/admin-actions";
import { Button } from "@/components/ui/button";
import { FieldError } from "@/components/ui/input";

export default function RecuperarAdminPage() {
  const [state, formAction, pending] = useActionState(
    solicitarRecuperacionAdmin,
    undefined
  );

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

        <div className="rounded-2xl border border-arena bg-white p-6">
          {state?.enviado ? (
            <p className="text-sm text-gris-calido">
              Si la configuración está lista, en unos minutos llega un link a
              los correos de recuperación registrados. El link expira en 30
              minutos y solo funciona una vez.
            </p>
          ) : (
            <form action={formAction} className="flex flex-col gap-4">
              <p className="text-sm text-gris-calido">
                Te enviaremos un link para fijar una nueva contraseña a los
                correos de recuperación registrados.
              </p>
              <FieldError>{state?.error}</FieldError>
              <Button type="submit" disabled={pending} className="w-full">
                {pending ? "Enviando..." : "Enviar link de recuperación"}
              </Button>
            </form>
          )}
        </div>

        <p className="mt-6 text-center text-sm text-gris-calido">
          <Link href="/admin/login" className="font-semibold text-terracota">
            Volver al login
          </Link>
        </p>
      </div>
    </div>
  );
}
