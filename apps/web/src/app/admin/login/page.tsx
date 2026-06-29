"use client";

import { useActionState } from "react";
import Link from "next/link";
import { iniciarSesionAdmin } from "@/lib/actions/admin-actions";
import { Button } from "@/components/ui/button";
import { Field, Input, FieldError } from "@/components/ui/input";

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(
    iniciarSesionAdmin,
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
            Panel del dueño
          </h1>
        </div>

        <div className="rounded-2xl border border-arena bg-white p-6">
          <form action={formAction} className="flex flex-col gap-4">
            <Field label="Contraseña" htmlFor="password">
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                autoFocus
              />
            </Field>

            <FieldError>{state?.error}</FieldError>

            <Button type="submit" disabled={pending} className="mt-1 w-full">
              {pending ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-gris-calido">
          <Link href="/admin/recuperar" className="font-semibold text-terracota">
            ¿Olvidaste tu contraseña?
          </Link>
        </p>
      </div>
    </div>
  );
}
