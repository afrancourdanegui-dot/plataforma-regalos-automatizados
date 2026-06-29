"use client";

import { useRef } from "react";
import { actualizarDireccionOcasion } from "@/lib/actions/gift-actions";
import { Select } from "@/components/ui/input";
import { DISTRITO_LABEL } from "@/lib/lima-distritos";

type Direccion = {
  id: string;
  label: string;
  district: string;
  isPrimary: boolean;
};

export default function DireccionSelector({
  occasionId,
  direcciones,
  seleccionada,
}: {
  occasionId: string;
  direcciones: Direccion[];
  seleccionada: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form ref={formRef} action={actualizarDireccionOcasion} className="flex items-center gap-2">
      <input type="hidden" name="occasionId" value={occasionId} />
      <span className="text-xs font-semibold text-gris-calido">Enviar a:</span>
      <Select
        name="addressId"
        defaultValue={seleccionada}
        className="w-auto py-1.5 text-xs"
        onChange={() => formRef.current?.requestSubmit()}
      >
        {direcciones.map((direccion) => (
          <option key={direccion.id} value={direccion.id}>
            {direccion.label} · {DISTRITO_LABEL[direccion.district as keyof typeof DISTRITO_LABEL]}
            {direccion.isPrimary ? " (Principal)" : ""}
          </option>
        ))}
      </Select>
    </form>
  );
}
