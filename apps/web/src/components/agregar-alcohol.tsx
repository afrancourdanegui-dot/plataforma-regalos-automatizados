"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { agregarRegalo } from "@/lib/actions/gift-actions";

interface Props {
  occasionId: string;
  productId: string;
}

export function AgregarAlcohol({ occasionId, productId }: Props) {
  const [confirmed, setConfirmed] = useState(false);

  return (
    <form action={agregarRegalo} className="flex flex-col items-end gap-2">
      <input type="hidden" name="occasionId" value={occasionId} />
      <input type="hidden" name="productId" value={productId} />
      <input type="hidden" name="ageConfirmed" value={confirmed ? "true" : "false"} />

      <label className="flex cursor-pointer items-center gap-2 text-right text-[11px] text-gris-calido">
        <input
          type="checkbox"
          checked={confirmed}
          onChange={(e) => setConfirmed(e.target.checked)}
          className="accent-terracota h-3.5 w-3.5 shrink-0"
        />
        <span>Destinatario mayor de 18 años</span>
      </label>

      <Button type="submit" disabled={!confirmed} className="text-xs">
        + Agregar
      </Button>
    </form>
  );
}
