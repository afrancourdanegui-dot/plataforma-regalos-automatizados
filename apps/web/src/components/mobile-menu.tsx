"use client";

import { useState } from "react";
import Link from "next/link";
import { cerrarSesion } from "@/lib/actions/auth-actions";

interface Props {
  isLoggedIn: boolean;
  displayName?: string;
}

export function MobileMenu({ isLoggedIn, displayName }: Props) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <div className="sm:hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-arena text-carbon hover:bg-arena/50 transition-colors"
      >
        {open ? (
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true">
            <path d="M2 2l12 12M14 2L2 14" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true">
            <path d="M2 4h12M2 8h12M2 12h12" strokeLinecap="round"/>
          </svg>
        )}
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full z-50 border-b border-arena bg-crema px-6 pb-5 pt-3 shadow-[0_8px_16px_-4px_rgba(61,31,46,0.10)]">
          <nav className="flex flex-col gap-1">
            <Link href="/catalogo" onClick={close} className="rounded-xl px-3 py-3 text-[14px] font-semibold text-carbon hover:bg-arena/50 transition-colors">
              Explorar regalos
            </Link>
            <Link href="/dashboard" onClick={close} className="rounded-xl px-3 py-3 text-[14px] font-semibold text-carbon hover:bg-arena/50 transition-colors">
              Mis regalos
            </Link>
            <div className="my-2 h-px bg-arena" />
            {isLoggedIn ? (
              <form action={cerrarSesion}>
                <button type="submit" className="w-full rounded-xl px-3 py-3 text-left text-[14px] font-semibold text-gris-calido hover:bg-arena/50 transition-colors">
                  Cerrar sesión
                </button>
              </form>
            ) : (
              <>
                <Link href="/login" onClick={close} className="rounded-xl px-3 py-3 text-[14px] font-semibold text-ciruelo hover:bg-arena/50 transition-colors">
                  Iniciar sesión
                </Link>
                <Link href="/registro" onClick={close} className="mt-1 flex items-center justify-center rounded-[10px] bg-terracota px-4 py-3 text-[14px] font-bold text-white">
                  Crear cuenta
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </div>
  );
}
