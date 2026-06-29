"use client";

import { useActionState } from "react";
import Link from "next/link";
import { crearProducto } from "@/lib/actions/product-actions";
import { Button } from "@/components/ui/button";
import { Field, Input, Textarea, Select, FieldError } from "@/components/ui/input";
import { CATEGORIA_LABEL, CATEGORIAS_ORDEN } from "@/lib/productos";

export default function NuevoProductoPage() {
  const [state, formAction, pending] = useActionState(crearProducto, undefined);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-20">
      <div className="w-full max-w-sm">
        <h1 className="mb-6 text-center font-display text-3xl italic text-ciruelo">
          Nuevo producto
        </h1>

        <div className="rounded-2xl border border-arena bg-white p-6">
          <form action={formAction} className="flex flex-col gap-4">
            <Field label="Nombre" htmlFor="name">
              <Input id="name" name="name" type="text" placeholder="Ej. Ramo de rosas rojas" required />
            </Field>
            <Field label="Tienda / marca" htmlFor="brand">
              <Input id="brand" name="brand" type="text" placeholder="Ej. Flores de Miraflores" required />
            </Field>
            <Field label="Categoría" htmlFor="category">
              <Select id="category" name="category" required defaultValue="">
                <option value="" disabled>
                  Elegir categoría
                </option>
                {CATEGORIAS_ORDEN.map((categoria) => (
                  <option key={categoria} value={categoria}>
                    {CATEGORIA_LABEL[categoria]}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Tipo (opcional)" htmlFor="subtype">
              <Input id="subtype" name="subtype" type="text" placeholder="Ej. Rosas, Vino tinto" />
            </Field>
            <Field label="Precio (S/)" htmlFor="price">
              <Input id="price" name="price" type="number" step="0.01" min="0" required />
            </Field>
            <Field label="Descripción (opcional)" htmlFor="description">
              <Textarea id="description" name="description" rows={3} />
            </Field>

            <FieldError>{state?.error}</FieldError>

            <Button type="submit" disabled={pending} className="mt-1 w-full">
              {pending ? "Guardando..." : "Guardar"}
            </Button>
          </form>
        </div>

        <Link href="/admin/productos" className="mt-6 block text-center text-sm text-gris-calido">
          Volver a productos
        </Link>
      </div>
    </div>
  );
}
