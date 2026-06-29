"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Select } from "@/components/ui/input";

type Props = {
  tiendas: string[];
  tipos: string[];
};

export default function ProductFilters({ tiendas, tipos }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function actualizar(clave: string, valor: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (valor) {
      params.set(clave, valor);
    } else {
      params.delete(clave);
    }
    router.push(params.size > 0 ? `${pathname}?${params.toString()}` : pathname);
  }

  return (
    <div className="flex flex-wrap gap-3">
      <Select
        aria-label="Filtrar por tienda"
        value={searchParams.get("tienda") ?? ""}
        onChange={(e) => actualizar("tienda", e.target.value)}
      >
        <option value="">Todas las tiendas</option>
        {tiendas.map((tienda) => (
          <option key={tienda} value={tienda}>
            {tienda}
          </option>
        ))}
      </Select>
      <Select
        aria-label="Filtrar por tipo"
        value={searchParams.get("tipo") ?? ""}
        onChange={(e) => actualizar("tipo", e.target.value)}
      >
        <option value="">Todos los tipos</option>
        {tipos.map((tipo) => (
          <option key={tipo} value={tipo}>
            {tipo}
          </option>
        ))}
      </Select>
    </div>
  );
}
