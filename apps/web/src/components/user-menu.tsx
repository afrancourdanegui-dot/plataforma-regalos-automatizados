"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cerrarSesion } from "@/lib/actions/auth-actions";

interface Props {
  name: string | null | undefined;
  email: string | null | undefined;
}

export function UserMenu({ name, email }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const initials = name
    ? name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()
    : email?.[0]?.toUpperCase() ?? "?";

  const displayName = name ?? email ?? "Mi cuenta";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2.5 rounded-full border border-arena bg-white py-1.5 pl-1.5 pr-3.5 text-[13px] font-semibold text-carbon shadow-sm hover:border-arena/60 transition-colors"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ciruelo text-[11px] font-bold text-crema">
          {initials}
        </span>
        <span className="max-w-[120px] truncate">{displayName}</span>
        <svg
          className={`h-3.5 w-3.5 text-gris-calido transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8"
        >
          <path d="M2 4l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-2xl border border-arena bg-white shadow-[0_8px_24px_-4px_rgba(61,31,46,0.14)]">
          <div className="border-b border-arena px-4 py-3">
            <p className="text-[12px] font-semibold text-carbon truncate">{displayName}</p>
            {email && <p className="text-[11px] text-gris-calido truncate">{email}</p>}
          </div>

          <div className="p-1.5">
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] text-carbon hover:bg-crema transition-colors"
            >
              <span className="text-base">🎁</span> Mis regalos
            </Link>
            <Link
              href="/dashboard/personas/nueva"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] text-carbon hover:bg-crema transition-colors"
            >
              <span className="text-base">👤</span> Agregar persona
            </Link>
          </div>

          <div className="border-t border-arena p-1.5">
            <form action={cerrarSesion}>
              <button
                type="submit"
                className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] text-gris-calido hover:bg-crema transition-colors"
              >
                <span className="text-base">↩</span> Cerrar sesión
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
