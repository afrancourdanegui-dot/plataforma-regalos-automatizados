"use client";

import { useActionState } from "react";
import { crearDireccion } from "@/lib/actions/address-actions";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, FieldError } from "@/components/ui/input";
import { DISTRITOS_LIMA } from "@/lib/lima-distritos";

export default function NuevaDireccionForm({
  personId,
  esPrimera,
}: {
  personId: string;
  esPrimera: boolean;
}) {
  const [state, formAction, pending] = useActionState(
    crearDireccion,
    undefined
  );

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="personId" value={personId} />

      <Field label="Nombre de la dirección" htmlFor="label">
        <Input
          id="label"
          name="label"
          type="text"
          placeholder="Ej. Casa, Trabajo"
          required
        />
      </Field>

      <Field label="Distrito" htmlFor="district">
        <Select id="district" name="district" defaultValue="">
          <option value="" disabled>
            Elige un distrito
          </option>
          {DISTRITOS_LIMA.map((distrito) => (
            <option key={distrito.value} value={distrito.value}>
              {distrito.label}
            </option>
          ))}
        </Select>
      </Field>

      <Field label="Calle o avenida" htmlFor="street">
        <Input
          id="street"
          name="street"
          type="text"
          placeholder="Ej. Av. Larco"
          required
        />
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Tipo" htmlFor="housingType">
          <Select id="housingType" name="housingType" defaultValue="CASA">
            <option value="CASA">Casa</option>
            <option value="DEPARTAMENTO">Departamento</option>
          </Select>
        </Field>
        <Field label="Número" htmlFor="number">
          <Input id="number" name="number" type="text" placeholder="Ej. 345" required />
        </Field>
      </div>

      {!esPrimera && (
        <label className="flex items-center gap-2 text-sm text-carbon">
          <input type="checkbox" name="isPrimary" />
          Usar como dirección principal
        </label>
      )}

      <FieldError>{state?.error}</FieldError>

      <Button type="submit" disabled={pending} className="mt-1 w-full">
        {pending ? "Guardando..." : "Guardar"}
      </Button>
    </form>
  );
}
