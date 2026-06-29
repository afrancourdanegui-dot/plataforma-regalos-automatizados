"use client";

import { useActionState } from "react";
import { actualizarProducto } from "@/lib/actions/product-actions";
import { Button } from "@/components/ui/button";
import { Field, Input, Textarea, Select, FieldError } from "@/components/ui/input";
import { CATEGORIA_LABEL, CATEGORIAS_ORDEN, type ProductCategoryCode } from "@/lib/productos";

type Props = {
  producto: {
    id: string;
    name: string;
    brand: string;
    category: ProductCategoryCode;
    subtype: string | null;
    price: string;
    description: string | null;
  };
};

export default function EditarProductoForm({ producto }: Props) {
  const [state, formAction, pending] = useActionState(actualizarProducto, undefined);

  return (
    <div className="rounded-2xl border border-arena bg-white p-6">
      <form action={formAction} className="flex flex-col gap-4">
        <input type="hidden" name="id" value={producto.id} />

        <Field label="Nombre" htmlFor="name">
          <Input id="name" name="name" type="text" defaultValue={producto.name} required />
        </Field>
        <Field label="Tienda / marca" htmlFor="brand">
          <Input id="brand" name="brand" type="text" defaultValue={producto.brand} required />
        </Field>
        <Field label="Categoría" htmlFor="category">
          <Select id="category" name="category" defaultValue={producto.category} required>
            {CATEGORIAS_ORDEN.map((categoria) => (
              <option key={categoria} value={categoria}>
                {CATEGORIA_LABEL[categoria]}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Tipo (opcional)" htmlFor="subtype">
          <Input id="subtype" name="subtype" type="text" defaultValue={producto.subtype ?? ""} />
        </Field>
        <Field label="Precio (S/)" htmlFor="price">
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            defaultValue={producto.price}
            required
          />
        </Field>
        <Field label="Descripción (opcional)" htmlFor="description">
          <Textarea id="description" name="description" rows={3} defaultValue={producto.description ?? ""} />
        </Field>

        <FieldError>{state?.error}</FieldError>

        <Button type="submit" disabled={pending} className="mt-1 w-full">
          {pending ? "Guardando..." : "Guardar cambios"}
        </Button>
      </form>
    </div>
  );
}
