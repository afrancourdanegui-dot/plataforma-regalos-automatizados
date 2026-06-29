"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { restablecerPasswordAdmin } from "@/lib/actions/admin-actions";
import { Button } from "@/components/ui/button";
import { Field, Input, FieldError } from "@/components/ui/input";

export default function ResetForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [state, formAction, pending] = useActionState(
    restablecerPasswordAdmin,
    undefined
  );

  if (!token) {
    return (
      <p className="text-sm text-gris-calido">
        Falta el token del link de recuperación. Pide uno nuevo desde
        /admin/recuperar.
      </p>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="token" value={token} />
      <Field label="Nueva contraseña" htmlFor="password">
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          required
          autoFocus
        />
      </Field>
      <Field label="Confirmar contraseña" htmlFor="confirmacion">
        <Input
          id="confirmacion"
          name="confirmacion"
          type="password"
          placeholder="••••••••"
          required
        />
      </Field>

      <FieldError>{state?.error}</FieldError>

      <Button type="submit" disabled={pending} className="mt-1 w-full">
        {pending ? "Guardando..." : "Guardar nueva contraseña"}
      </Button>
    </form>
  );
}
