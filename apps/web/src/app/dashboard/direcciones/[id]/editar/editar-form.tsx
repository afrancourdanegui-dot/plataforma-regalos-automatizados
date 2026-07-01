"use client";

import { useActionState, useState, useCallback } from "react";
import { actualizarDireccion, eliminarDireccion } from "@/lib/actions/address-actions";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, FieldError } from "@/components/ui/input";
import { DISTRITOS_LIMA } from "@/lib/lima-distritos";
import { DireccionAutocomplete, type ParsedDireccion } from "@/components/direccion-autocomplete";

type Props = {
  direccion: {
    id: string;
    label: string;
    district: string;
    street: string;
    housingType: string;
    number: string;
    reference: string | null;
    isPrimary: boolean;
  };
};

export default function EditarDireccionForm({ direccion }: Props) {
  const [state, formAction, pending] = useActionState(actualizarDireccion, undefined);
  const [street, setStreet] = useState(direccion.street);
  const [number, setNumber] = useState(direccion.number);
  const [district, setDistrict] = useState(direccion.district);

  const handleAutocomplete = useCallback((parsed: ParsedDireccion) => {
    if (parsed.street) setStreet(parsed.street);
    if (parsed.number) setNumber(parsed.number);
    if (parsed.district) setDistrict(parsed.district);
  }, []);

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="rounded-2xl border border-arena bg-white p-6">
        <form action={formAction} className="flex flex-col gap-4">
          <input type="hidden" name="id" value={direccion.id} />

          <DireccionAutocomplete onParsed={handleAutocomplete} />

          <Field label="Nombre de la dirección" htmlFor="label">
            <Input id="label" name="label" type="text" defaultValue={direccion.label} required />
          </Field>

          <Field label="Distrito" htmlFor="district">
            <Select
              id="district"
              name="district"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            >
              {DISTRITOS_LIMA.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </Select>
          </Field>

          <Field label="Calle o avenida" htmlFor="street">
            <Input
              id="street"
              name="street"
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              required
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Tipo" htmlFor="housingType">
              <Select id="housingType" name="housingType" defaultValue={direccion.housingType}>
                <option value="CASA">Casa</option>
                <option value="DEPARTAMENTO">Departamento</option>
              </Select>
            </Field>
            <Field label="Número" htmlFor="number">
              <Input
                id="number"
                name="number"
                type="text"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                required
              />
            </Field>
          </div>

          <Field label="Referencia" htmlFor="reference">
            <Input
              id="reference"
              name="reference"
              type="text"
              placeholder="Ej. Frente al parque, segundo piso"
              defaultValue={direccion.reference ?? ""}
            />
          </Field>

          {direccion.isPrimary ? (
            <>
              <input type="hidden" name="isPrimary" value="on" />
              <p className="text-sm text-gris-calido">
                Es la dirección principal. Para quitarle ese rol, marca otra como principal.
              </p>
            </>
          ) : (
            <label className="flex items-center gap-2 text-sm text-carbon">
              <input type="checkbox" name="isPrimary" />
              Usar como dirección principal
            </label>
          )}

          <FieldError>{state?.error}</FieldError>

          <Button type="submit" disabled={pending} className="mt-1 w-full">
            {pending ? "Guardando..." : "Guardar cambios"}
          </Button>
        </form>
      </div>

      <form action={eliminarDireccion}>
        <input type="hidden" name="id" value={direccion.id} />
        <Button type="submit" variant="danger" className="w-full">
          Eliminar dirección
        </Button>
      </form>
    </div>
  );
}
