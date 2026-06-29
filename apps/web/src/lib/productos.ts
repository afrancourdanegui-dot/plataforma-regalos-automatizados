const CATEGORIA_ENTRIES = [
  ["FLORES", "Flores"],
  ["VINOS", "Vinos"],
  ["TORTAS", "Tortas"],
  ["CHOCOLATES", "Chocolates"],
  ["SPA", "Vales de spa"],
  ["CAJAS_CURADAS", "Cajas curadas"],
] as const;

export type ProductCategoryCode = (typeof CATEGORIA_ENTRIES)[number][0];

export const CATEGORIA_LABEL: Record<ProductCategoryCode, string> =
  Object.fromEntries(CATEGORIA_ENTRIES) as Record<ProductCategoryCode, string>;

export const CATEGORIAS_ORDEN = CATEGORIA_ENTRIES.map(([value]) => value);

export function formatearPrecio(precio: number | string) {
  const valor = typeof precio === "string" ? Number(precio) : precio;
  return `S/ ${valor.toFixed(2)}`;
}

const ESTADO_REGALO_LABEL = {
  PROGRAMADO: "Programado",
  CUMPLIDO: "Cumplido",
  CANCELADO: "Cancelado",
} as const;

export type EstadoRegaloCode = keyof typeof ESTADO_REGALO_LABEL;

export function estadoDeRegalo(seleccion: {
  dueDate: Date;
  cancelledAt: Date | null;
}): { code: EstadoRegaloCode; label: string } {
  if (seleccion.cancelledAt) {
    return { code: "CANCELADO", label: ESTADO_REGALO_LABEL.CANCELADO };
  }
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  if (seleccion.dueDate < hoy) {
    return { code: "CUMPLIDO", label: ESTADO_REGALO_LABEL.CUMPLIDO };
  }
  return { code: "PROGRAMADO", label: ESTADO_REGALO_LABEL.PROGRAMADO };
}
