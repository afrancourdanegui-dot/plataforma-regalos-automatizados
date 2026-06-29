"use client";

import { useActionState } from "react";
import Link from "next/link";
import { crearProveedor } from "@/lib/actions/supplier-actions";
import { Button } from "@/components/ui/button";
import { Field, Input, Textarea, FieldError } from "@/components/ui/input";

export default function NuevoProveedorPage() {
  const [state, formAction, pending] = useActionState(crearProveedor, undefined);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-20">
      <div className="w-full max-w-sm">
        <h1 className="mb-6 text-center font-display text-3xl italic text-ciruelo">
          Nuevo proveedor
        </h1>

        <div className="rounded-2xl border border-arena bg-white p-6">
          <form action={formAction} className="flex flex-col gap-4">
            <Field label="Nombre" htmlFor="name">
              <Input id="name" name="name" type="text" placeholder="Ej. Flores de Miraflores" required />
            </Field>
            <Field label="Teléfono (opcional)" htmlFor="phone">
              <Input id="phone" name="phone" type="text" placeholder="999 999 999" />
            </Field>
            <Field label="Email (opcional)" htmlFor="email">
              <Input id="email" name="email" type="email" placeholder="contacto@proveedor.com" />
            </Field>
            <Field label="Notas (opcional)" htmlFor="notes">
              <Textarea id="notes" name="notes" rows={3} placeholder="Zona que cubre, condiciones, etc." />
            </Field>

            <FieldError>{state?.error}</FieldError>

            <Button type="submit" disabled={pending} className="mt-1 w-full">
              {pending ? "Guardando..." : "Guardar"}
            </Button>
          </form>
        </div>

        <Link href="/admin/proveedores" className="mt-6 block text-center text-sm text-gris-calido">
          Volver a proveedores
        </Link>
      </div>
    </div>
  );
}
