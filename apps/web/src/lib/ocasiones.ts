const OCCASION_TYPE_ENTRIES = [
  ["BIRTHDAY", "Cumpleaños"],
  ["ANNIVERSARY", "Aniversario"],
  ["MOTHERS_DAY", "Día de la Madre"],
  ["FATHERS_DAY", "Día del Padre"],
  ["VALENTINES", "San Valentín"],
  ["CHRISTMAS", "Navidad"],
  ["GRADUATION", "Graduación"],
  ["SPECIAL_DAY", "Día festivo especial"],
  ["CUSTOM", "Otro"],
] as const;

export type OccasionTypeCode = (typeof OCCASION_TYPE_ENTRIES)[number][0];

export const OCCASION_TYPE_CODES = OCCASION_TYPE_ENTRIES.map(
  ([value]) => value
) as [OccasionTypeCode, ...OccasionTypeCode[]];

export const OCCASION_TYPE_LABEL: Record<OccasionTypeCode, string> =
  Object.fromEntries(OCCASION_TYPE_ENTRIES) as Record<OccasionTypeCode, string>;

export const OCCASION_TYPE_OPTIONS = OCCASION_TYPE_ENTRIES.filter(
  ([value]) => value !== "CUSTOM"
).map(([value, label]) => ({ value, label }));

// Días festivos/profesionales peruanos con fecha fija, elegibles dentro de "Día festivo especial".
const SPECIAL_DAY_ENTRIES = [
  ["WORKERS_DAY", "Día del Trabajador", 5, 1],
  ["SECRETARY_DAY", "Día de la Secretaria", 4, 26],
  ["PSYCHOLOGIST_DAY", "Día del Psicólogo", 4, 30],
  ["TEACHERS_DAY", "Día del Maestro", 7, 6],
] as const;

export type SpecialDayCode = (typeof SPECIAL_DAY_ENTRIES)[number][0];

export const SPECIAL_DAY_CODES = SPECIAL_DAY_ENTRIES.map(
  ([value]) => value
) as [SpecialDayCode, ...SpecialDayCode[]];

const SPECIAL_DAY_LABEL: Record<string, string> = Object.fromEntries(
  SPECIAL_DAY_ENTRIES.map(([value, label]) => [value, label])
);

const SPECIAL_DAY_FECHA: Record<string, { month: number; day: number }> =
  Object.fromEntries(
    SPECIAL_DAY_ENTRIES.map(([value, , month, day]) => [value, { month, day }])
  );

const MESES = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

export const MESES_OPTIONS = MESES.map((nombre, i) => ({
  value: i + 1,
  label: nombre.charAt(0).toUpperCase() + nombre.slice(1),
}));

// Días por mes (febrero con 29 para permitir cumpleaños del 29 de febrero;
// en años no bisiestos cae al 1 de marzo por el desborde natural de Date).
const DIAS_POR_MES = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export function diasEnMes(month: number | null): number {
  if (!month) return 31;
  return DIAS_POR_MES[month - 1] ?? 31;
}

export const SPECIAL_DAY_OPTIONS = SPECIAL_DAY_ENTRIES.map(
  ([value, label, month, day]) => ({
    value,
    label: `${label} (${day} de ${MESES[month - 1]})`,
  })
);

// En Perú: Día de la Madre = 2do domingo de mayo, Día del Padre = 3er domingo de junio.
// No tienen día fijo, así que se calculan en vez de guardarse.
const FERIADOS_FLOTANTES: Record<string, { mes: number; nEsimoDomingo: number }> = {
  MOTHERS_DAY: { mes: 4, nEsimoDomingo: 2 },
  FATHERS_DAY: { mes: 5, nEsimoDomingo: 3 },
};

// Estos sí tienen mes/día fijo todos los años, así que tampoco hace falta pedirlos.
const FERIADOS_FIJOS: Record<string, { month: number; day: number }> = {
  VALENTINES: { month: 2, day: 14 },
  CHRISTMAS: { month: 12, day: 25 },
};

export function esFechaAutomatica(type: string) {
  return type in FERIADOS_FLOTANTES || type in FERIADOS_FIJOS || type === "SPECIAL_DAY";
}

export function motivoDeOcasion(ocasion: {
  type: string;
  label: string | null;
}) {
  if (ocasion.type === "CUSTOM") {
    return ocasion.label ?? OCCASION_TYPE_LABEL.CUSTOM;
  }
  if (ocasion.type === "SPECIAL_DAY") {
    return (
      SPECIAL_DAY_LABEL[ocasion.label ?? ""] ?? OCCASION_TYPE_LABEL.SPECIAL_DAY
    );
  }
  return OCCASION_TYPE_LABEL[ocasion.type as OccasionTypeCode] ?? ocasion.type;
}

function inicioDelDia(fecha: Date) {
  const copia = new Date(fecha);
  copia.setHours(0, 0, 0, 0);
  return copia;
}

function nEsimoDomingoDelMes(anio: number, mes: number, n: number) {
  const primerDia = new Date(anio, mes, 1);
  const primerDomingo = 1 + ((7 - primerDia.getDay()) % 7);
  return new Date(anio, mes, primerDomingo + (n - 1) * 7);
}

function proximoFeriadoFlotante(type: string): Date {
  const { mes, nEsimoDomingo } = FERIADOS_FLOTANTES[type];
  const hoy = inicioDelDia(new Date());

  let candidata = nEsimoDomingoDelMes(hoy.getFullYear(), mes, nEsimoDomingo);
  if (candidata < hoy) {
    candidata = nEsimoDomingoDelMes(hoy.getFullYear() + 1, mes, nEsimoDomingo);
  }
  return candidata;
}

export function proximaFecha(
  month: number | null,
  day: number,
  frequency: "MONTHLY" | "YEARLY"
): Date {
  const hoy = inicioDelDia(new Date());

  if (frequency === "MONTHLY") {
    const candidata = new Date(hoy.getFullYear(), hoy.getMonth(), day);
    if (candidata < hoy) {
      candidata.setMonth(candidata.getMonth() + 1);
    }
    return candidata;
  }

  const mes = (month ?? 1) - 1;
  const candidata = new Date(hoy.getFullYear(), mes, day);
  if (candidata < hoy) {
    candidata.setFullYear(candidata.getFullYear() + 1);
  }
  return candidata;
}

type OcasionFecha = {
  type: string;
  label: string | null;
  month: number | null;
  day: number | null;
  frequency: string;
};

export function proximaFechaOcasion(ocasion: OcasionFecha): Date {
  if (ocasion.type in FERIADOS_FLOTANTES) {
    return proximoFeriadoFlotante(ocasion.type);
  }
  if (ocasion.type in FERIADOS_FIJOS) {
    const { month, day } = FERIADOS_FIJOS[ocasion.type];
    return proximaFecha(month, day, "YEARLY");
  }
  if (ocasion.type === "SPECIAL_DAY") {
    const fecha = SPECIAL_DAY_FECHA[ocasion.label ?? ""];
    if (fecha) return proximaFecha(fecha.month, fecha.day, "YEARLY");
  }
  return proximaFecha(
    ocasion.month,
    ocasion.day ?? 1,
    ocasion.frequency as "MONTHLY" | "YEARLY"
  );
}

export function diasRestantes(fecha: Date): number {
  const hoy = inicioDelDia(new Date());
  const objetivo = inicioDelDia(fecha);
  const ms = objetivo.getTime() - hoy.getTime();
  return Math.round(ms / (1000 * 60 * 60 * 24));
}

export function badgeDeOcasion(ocasion: OcasionFecha) {
  const proxima = proximaFechaOcasion(ocasion);
  const dias = diasRestantes(proxima);

  const fechaCorta =
    ocasion.frequency === "MONTHLY" && !esFechaAutomatica(ocasion.type)
      ? `Día ${proxima.getDate()}`
      : `${proxima.getDate()} de ${MESES[proxima.getMonth()]}`;

  if (dias <= 0) {
    return { label: "Es hoy", urgent: true, fechaCorta };
  }
  if (dias <= 14) {
    return { label: `En ${dias} día${dias === 1 ? "" : "s"}`, urgent: true, fechaCorta };
  }
  if (dias <= 60) {
    return { label: `En ${dias} días`, urgent: false, fechaCorta };
  }
  return { label: fechaCorta, urgent: false, fechaCorta };
}
