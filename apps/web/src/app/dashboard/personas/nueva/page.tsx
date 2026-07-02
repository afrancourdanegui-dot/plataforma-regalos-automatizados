"use client";

import { useActionState } from "react";
import Link from "next/link";
import { crearPersona } from "@/lib/actions/person-actions";
import { Button } from "@/components/ui/button";
import { Field, Input, Textarea, FieldError } from "@/components/ui/input";

export default function NuevaPersonaPage() {
  const [state, formAction, pending] = useActionState(crearPersona, undefined);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-20">
      <div className="w-full max-w-sm">
        <h1 className="mb-6 text-center font-display text-3xl italic text-ciruelo">
          Nueva persona
        </h1>

        <div className="rounded-2xl border border-arena bg-white p-6">
          <form action={formAction} className="flex flex-col gap-4">
            <Field label="Nombre" htmlFor="name">
              <Input id="name" name="name" type="text" placeholder="Ej. Mamá" required />
            </Field>
            <Field label="Relación" htmlFor="relationship">
              <Input
                id="relationship"
                name="relationship"
                type="text"
                placeholder="Ej. Madre, Pareja, Jefe"
                required
              />
            </Field>
            <Field label="Preferencias (opcional)" htmlFor="preferences">
              <Input
                id="preferences"
                name="preferences"
                type="text"
                placeholder="Ej. Flores, Tortas, Chocolates"
              />
            </Field>
            <Field label="Notas (opcional)" htmlFor="notes">
              <Textarea id="notes" name="notes" rows={3} placeholder="Le gusta..." />
            </Field>

            <FieldError>{state?.error}</FieldError>

            <Button type="submit" disabled={pending} className="mt-1 w-full">
              {pending ? "Guardando..." : "Guardar"}
            </Button>
          </form>
        </div>

        <Link
          href="/dashboard"
          className="mt-6 block text-center text-sm text-gris-calido"
        >
          Volver al dashboard
        </Link>
      </div>
    </div>
  );
}
