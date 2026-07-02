"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type NavUser = { name: string | null; email: string | null } | null;

export function StickyNav({ user }: { user: NavUser }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const initials = user?.name
    ? user.name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase()
    : (user?.email?.[0]?.toUpperCase() ?? "?");

  const displayName = user?.name?.split(" ").slice(0, 2).join(" ") ?? "";

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-300"
      style={
        scrolled
          ? {
              background: "rgba(250,242,236,.88)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              borderBottom: "1px solid #EADFCF",
              boxShadow: "0 1px 0 rgba(58,30,48,.06)",
            }
          : undefined
      }
    >
      <div className="mx-auto flex max-w-[1240px] items-center justify-between px-10 py-5">
        {/* Logo */}
        <Link
          href="/"
          className="font-display text-[23px] text-ciruelo"
          style={{ fontWeight: 500, fontStyle: "italic" }}
        >
          Siempre Presente
        </Link>

        {/* Center nav */}
        <div className="hidden items-center gap-8 sm:flex">
          <Link
            href="/catalogo"
            className="font-ui text-[14.5px] font-semibold text-carbon transition-colors hover:text-terracota"
          >
            Explorar regalos
          </Link>
          <Link
            href="/dashboard"
            className="font-ui text-[14.5px] font-semibold text-carbon transition-colors hover:text-terracota"
          >
            Mis regalos
          </Link>
        </div>

        {/* Right */}
        {user ? (
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5 rounded-full border border-borde bg-white px-3.5 py-[7px] transition-colors hover:border-terracota"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-ciruelo font-ui text-[11px] font-bold text-crema">
              {initials}
            </div>
            <span className="font-ui text-[13px] font-semibold text-carbon">{displayName}</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-mute">
              <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        ) : (
          <div className="flex items-center gap-5">
            <Link
              href="/login"
              className="hidden font-ui text-[14px] font-semibold text-ciruelo transition-colors hover:text-terracota sm:block"
            >
              Iniciar sesión
            </Link>
            <Link
              href="/registro"
              className="rounded-[14px] bg-terracota px-5 py-2.5 font-ui text-[13.5px] font-bold text-white transition-colors hover:bg-terracota-hover"
              style={{ boxShadow: "0 10px 28px rgba(192,85,47,.32)" }}
            >
              Crear cuenta
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
