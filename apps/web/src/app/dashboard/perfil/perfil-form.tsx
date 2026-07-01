"use client";

import { useActionState } from "react";
import { actualizarPerfil } from "@/lib/actions/profile-actions";
import { Input, Field, FieldError } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  name: string;
  email: string;
  hasPassword: boolean;
  createdAt: string;
}

export default function PerfilForm({ name, email, hasPassword, createdAt }: Props) {
  const [state, action, pending] = useActionState(actualizarPerfil, undefined);

  const initials = name
    ? name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()
    : email[0]?.toUpperCase() ?? "?";

  return (
    <div className="mt-8 flex flex-col gap-4">
      <div className="rounded-2xl border border-arena bg-white px-5 py-5">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-ciruelo text-xl font-bold text-crema">
            {initials}
          </div>
          <div>
            <p className="font-display text-lg italic text-ciruelo">{name || email}</p>
            <p className="text-xs text-gris-calido">
              Cuenta creada el {createdAt}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-arena bg-white px-5 py-5">
        <h2 className="font-display text-lg italic text-ciruelo">Información personal</h2>
        <form action={action} className="mt-5 flex flex-col gap-4">
          <Field label="Nombre" htmlFor="name">
            <Input
              id="name"
              name="name"
              defaultValue={name}
              placeholder="Tu nombre completo"
              autoComplete="name"
            />
          </Field>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-gris-calido">
              Email
            </label>
            <div className="w-full rounded-lg border border-arena/60 bg-crema px-4 py-2.5 text-sm text-gris-calido">
              {email}
            </div>
            <p className="text-[11px] text-gris-calido">
              El email no se puede cambiar.
            </p>
          </div>

          {state?.error && <FieldError>{state.error}</FieldError>}

          {state?.success && (
            <p className="text-sm font-semibold text-terracota">
              Perfil actualizado correctamente.
            </p>
          )}

          <div>
            <Button type="submit" disabled={pending} className="text-xs">
              {pending ? "Guardando..." : "Guardar cambios"}
            </Button>
          </div>
        </form>
      </div>

      <div className="rounded-2xl border border-arena bg-white px-5 py-5">
        <h2 className="font-display text-lg italic text-ciruelo">Contraseña</h2>
        <p className="mt-2 text-sm text-gris-calido">
          {hasPassword
            ? "El cambio de contraseña estará disponible próximamente."
            : "Tu cuenta usa Google para iniciar sesión, no tiene contraseña."}
        </p>
      </div>
    </div>
  );
}
