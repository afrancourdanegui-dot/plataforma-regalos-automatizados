"use client";

import { useActionState, useState } from "react";
import { crearOcasion } from "@/lib/actions/occasion-actions";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, FieldError } from "@/components/ui/input";
import {
  OCCASION_TYPE_OPTIONS,
  MESES_OPTIONS,
  SPECIAL_DAY_OPTIONS,
  esFechaAutomatica,
  diasEnMes,
} from "@/lib/ocasiones";

export default function NuevaOcasionForm({ personId }: { personId: string }) {
  const [state, formAction, pending] = useActionState(crearOcasion, undefined);
  const [type, setType] = useState("BIRTHDAY");
  const [frequency, setFrequency] = useState("YEARLY");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  const automatica = esFechaAutomatica(type);
  const maxDia = frequency === "YEARLY" ? diasEnMes(month ? Number(month) : null) : 28;

  function handleMonthChange(value: string) {
    setMonth(value);
    if (day && Number(day) > diasEnMes(value ? Number(value) : null)) {
      setDay("");
    }
  }

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="personId" value={personId} />

      <Field label="Motivo" htmlFor="type">
        <Select
          id="type"
          name="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          {OCCASION_TYPE_OPTIONS.map((opcion) => (
            <option key={opcion.value} value={opcion.value}>
              {opcion.label}
            </option>
          ))}
          <option value="CUSTOM">Otro</option>
        </Select>
      </Field>

      {type === "CUSTOM" && (
        <Field label="¿Cuál es el motivo?" htmlFor="label">
          <Input
            id="label"
            name="label"
            type="text"
            placeholder="Ej. Día del amigo"
            required
          />
        </Field>
      )}

      {type === "SPECIAL_DAY" && (
        <Field label="¿Cuál día festivo?" htmlFor="specialDay">
          <Select id="specialDay" name="specialDay" defaultValue="">
            <option value="" disabled>
              Elige
            </option>
            {SPECIAL_DAY_OPTIONS.map((opcion) => (
              <option key={opcion.value} value={opcion.value}>
                {opcion.label}
              </option>
            ))}
          </Select>
        </Field>
      )}

      {automatica ? (
        <p className="text-sm text-gris-calido">
          No necesitas elegir mes ni día: esta fecha ya está definida y la
          calculamos automáticamente cada año.
        </p>
      ) : (
        <>
          <Field label="Frecuencia" htmlFor="frequency">
            <Select
              id="frequency"
              name="frequency"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
            >
              <option value="YEARLY">Anual</option>
              <option value="MONTHLY">Mensual</option>
            </Select>
          </Field>

          <div className={frequency === "YEARLY" ? "grid grid-cols-2 gap-3" : ""}>
            {frequency === "YEARLY" && (
              <Field label="Mes" htmlFor="month">
                <Select
                  id="month"
                  name="month"
                  value={month}
                  onChange={(e) => handleMonthChange(e.target.value)}
                >
                  <option value="" disabled>
                    Elige
                  </option>
                  {MESES_OPTIONS.map((mes) => (
                    <option key={mes.value} value={mes.value}>
                      {mes.label}
                    </option>
                  ))}
                </Select>
              </Field>
            )}
            <Field label="Día" htmlFor="day">
              <Select
                id="day"
                name="day"
                value={day}
                onChange={(e) => setDay(e.target.value)}
              >
                <option value="" disabled>
                  Elige
                </option>
                {Array.from({ length: maxDia }, (_, i) => i + 1).map((dia) => (
                  <option key={dia} value={dia}>
                    {dia}
                  </option>
                ))}
              </Select>
            </Field>
          </div>
        </>
      )}

      <FieldError>{state?.error}</FieldError>

      <Button type="submit" disabled={pending} className="mt-1 w-full">
        {pending ? "Guardando..." : "Guardar"}
      </Button>
    </form>
  );
}
