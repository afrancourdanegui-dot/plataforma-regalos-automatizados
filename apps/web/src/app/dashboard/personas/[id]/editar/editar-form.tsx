"use client";

import { useActionState } from "react";
import { actualizarPersona, eliminarPersona } from "@/lib/actions/person-actions";
import { Button } from "@/components/ui/button";
import { Field, Input, Textarea, FieldError } from "@/components/ui/input";

type Props = {
  persona: {
    id: string;
    name: string;
    relationship: string;
    notes: string | null;
    preferences: string[];
  };
};

export default function EditarPersonaForm({ persona }: Props) {
  const [state, formAction, pending] = useActionState(
    actualizarPersona,
    undefined
  );

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="rounded-2xl border border-arena bg-white p-6">
        <form action={formAction} className="flex flex-col gap-4">
          <input type="hidden" name="id" value={persona.id} />

          <Field label="Nombre" htmlFor="name">
            <Input id="name" name="name" type="text" defaultValue={persona.name} required />
          </Field>
          <Field label="Relación" htmlFor="relationship">
            <Input
              id="relationship"
              name="relationship"
              type="text"
              defaultValue={persona.relationship}
              required
            />
          </Field>
          <Field label="Preferencias (opcional)" htmlFor="preferences">
            <Input
              id="preferences"
              name="preferences"
              type="text"
              defaultValue={persona.preferences.join(", ")}
              placeholder="Ej. Flores, Tortas, Chocolates"
            />
          </Field>
          <Field label="Notas (opcional)" htmlFor="notes">
            <Textarea id="notes" name="notes" defaultValue={persona.notes ?? ""} rows={3} />
          </Field>

          <FieldError>{state?.error}</FieldError>

          <Button type="submit" disabled={pending} className="mt-1 w-full">
            {pending ? "Guardando..." : "Guardar cambios"}
          </Button>
        </form>
      </div>

      <form action={eliminarPersona}>
        <input type="hidden" name="id" value={persona.id} />
        <Button type="submit" variant="danger" className="w-full">
          Eliminar persona
        </Button>
      </form>
    </div>
  );
}
