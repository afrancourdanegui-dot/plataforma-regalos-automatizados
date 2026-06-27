"use client";

import { useActionState } from "react";
import Link from "next/link";
import { registrarUsuario, loginConGoogle } from "@/lib/actions/auth-actions";
import { Button } from "@/components/ui/button";
import { Field, Input, FieldError } from "@/components/ui/input";

export default function RegistroPage() {
  const [state, formAction, pending] = useActionState(
    registrarUsuario,
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
            Empecemos
          </h1>
        </div>

        <div className="rounded-2xl border border-arena bg-white p-6">
          <form action={formAction} className="flex flex-col gap-4">
            <Field label="Nombre" htmlFor="name">
              <Input id="name" name="name" type="text" placeholder="Tu nombre" required />
            </Field>
            <Field label="Email" htmlFor="email">
              <Input id="email" name="email" type="email" placeholder="tu@email.com" required />
            </Field>
            <Field label="Contraseña" htmlFor="password">
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Mínimo 8 caracteres"
                required
                minLength={8}
              />
            </Field>

            <FieldError>{state?.error}</FieldError>

            <Button type="submit" disabled={pending} className="mt-1 w-full">
              {pending ? "Creando..." : "Crear cuenta"}
            </Button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-arena" />
            <span className="text-xs font-semibold uppercase tracking-wide text-gris-calido">
              o
            </span>
            <div className="h-px flex-1 bg-arena" />
          </div>

          <form action={loginConGoogle}>
            <Button type="submit" variant="ghost" className="w-full">
              Continuar con Google
            </Button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-gris-calido">
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="font-semibold text-terracota">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
