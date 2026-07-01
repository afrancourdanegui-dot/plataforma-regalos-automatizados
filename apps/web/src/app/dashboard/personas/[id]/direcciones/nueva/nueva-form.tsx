"use client";

import { useActionState, useState, useCallback } from "react";
import { crearDireccion } from "@/lib/actions/address-actions";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, FieldError } from "@/components/ui/input";
import { DISTRITOS_LIMA } from "@/lib/lima-distritos";
import { DireccionAutocomplete, type ParsedDireccion } from "@/components/direccion-autocomplete";

export default function NuevaDireccionForm({
  personId,
  esPrimera,
}: {
  personId: string;
  esPrimera: boolean;
}) {
  const [state, formAction, pending] = useActionState(crearDireccion, undefined);
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [district, setDistrict] = useState("");
  const [modoMapa, setModoMapa] = useState(false);

  const handleAutocomplete = useCallback((parsed: ParsedDireccion) => {
    if (parsed.street) setStreet(parsed.street);
    if (parsed.number) setNumber(parsed.number);
    if (parsed.district) setDistrict(parsed.district);
  }, []);

  const sinDireccion = !modoMapa && !street;

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="personId" value={personId} />

      <DireccionAutocomplete
        onParsed={handleAutocomplete}
        onModoChange={setModoMapa}
      />

      {/* En modo texto, calle y número van como hidden — el buscador los completó */}
      {!modoMapa && (
        <>
          <input type="hidden" name="street" value={street} />
          <input type="hidden" name="number" value={number} />
        </>
      )}

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
        <Select
          id="district"
          name="district"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
        >
          <option value="" disabled>Elige un distrito</option>
          {DISTRITOS_LIMA.map((d) => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </Select>
      </Field>

      {/* Calle y número solo visibles en modo mapa */}
      {modoMapa && (
        <Field label="Calle o avenida" htmlFor="street">
          <Input
            id="street"
            name="street"
            type="text"
            placeholder="Ej. Av. Larco"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            required
          />
        </Field>
      )}

      <div className="grid grid-cols-2 gap-3">
        <Field label="Tipo" htmlFor="housingType">
          <Select id="housingType" name="housingType" defaultValue="CASA">
            <option value="CASA">Casa</option>
            <option value="DEPARTAMENTO">Departamento</option>
          </Select>
        </Field>
        {modoMapa && (
          <Field label="Número" htmlFor="number">
            <Input
              id="number"
              name="number"
              type="text"
              placeholder="Ej. 345"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
            />
          </Field>
        )}
      </div>

      <Field label="Referencia" htmlFor="reference">
        <Input
          id="reference"
          name="reference"
          type="text"
          placeholder="Ej. Frente al parque, segundo piso"
        />
      </Field>

      {!esPrimera && (
        <label className="flex items-center gap-2 text-sm text-carbon">
          <input type="checkbox" name="isPrimary" />
          Usar como dirección principal
        </label>
      )}

      <FieldError>{state?.error}</FieldError>

      {sinDireccion ? (
        <p className="mt-1 text-center text-xs text-gris-calido">
          Busca tu dirección arriba para continuar
        </p>
      ) : (
        <Button type="submit" disabled={pending} className="mt-1 w-full">
          {pending ? "Guardando..." : "Guardar"}
        </Button>
      )}
    </form>
  );
}
