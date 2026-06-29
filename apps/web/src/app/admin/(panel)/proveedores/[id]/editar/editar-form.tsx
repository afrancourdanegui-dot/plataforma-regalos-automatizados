"use client";

import { useActionState } from "react";
import { actualizarProveedor } from "@/lib/actions/supplier-actions";
import { Button } from "@/components/ui/button";
import { Field, Input, Textarea, FieldError } from "@/components/ui/input";

type Props = {
  proveedor: {
    id: string;
    name: string;
    phone: string | null;
    email: string | null;
    notes: string | null;
  };
};

export default function EditarProveedorForm({ proveedor }: Props) {
  const [state, formAction, pending] = useActionState(actualizarProveedor, undefined);

  return (
    <div className="rounded-2xl border border-arena bg-white p-6">
      <form action={formAction} className="flex flex-col gap-4">
        <input type="hidden" name="id" value={proveedor.id} />

        <Field label="Nombre" htmlFor="name">
          <Input id="name" name="name" type="text" defaultValue={proveedor.name} required />
        </Field>
        <Field label="Teléfono (opcional)" htmlFor="phone">
          <Input id="phone" name="phone" type="text" defaultValue={proveedor.phone ?? ""} />
        </Field>
        <Field label="Email (opcional)" htmlFor="email">
          <Input id="email" name="email" type="email" defaultValue={proveedor.email ?? ""} />
        </Field>
        <Field label="Notas (opcional)" htmlFor="notes">
          <Textarea id="notes" name="notes" rows={3} defaultValue={proveedor.notes ?? ""} />
        </Field>

        <FieldError>{state?.error}</FieldError>

        <Button type="submit" disabled={pending} className="mt-1 w-full">
          {pending ? "Guardando..." : "Guardar cambios"}
        </Button>
      </form>
    </div>
  );
}
