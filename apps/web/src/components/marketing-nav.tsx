import Link from "next/link";
import { getCurrentUser } from "@/lib/dal";
import { UserMenu } from "@/components/user-menu";
import { MobileMenu } from "@/components/mobile-menu";

export async function MarketingNav() {
  const user = await getCurrentUser();

  return (
    <nav className="relative mx-auto flex max-w-[1080px] items-center justify-between px-6 py-6">
      <div className="flex items-center gap-8">
        <Link
          href="/"
          className="font-display italic font-light text-[19px] text-ciruelo"
        >
          Siempre Presente
        </Link>
        <div className="hidden items-center gap-6 sm:flex">
          <Link
            href="/catalogo"
            className="text-[13px] font-semibold text-carbon hover:text-terracota transition-colors"
          >
            Explorar regalos
          </Link>
          <Link
            href="/dashboard"
            className="text-[13px] font-semibold text-carbon hover:text-terracota transition-colors"
          >
            Mis regalos
          </Link>
        </div>
      </div>

      {/* Desktop auth actions */}
      <div className="hidden items-center gap-6 sm:flex">
        {user ? (
          <UserMenu name={user.name} email={user.email} />
        ) : (
          <>
            <Link href="/login" className="text-[13px] font-semibold text-ciruelo">
              Iniciar sesión
            </Link>
            <Link
              href="/registro"
              className="rounded-[10px] bg-terracota px-[18px] py-[10px] text-[13px] font-bold text-white"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              Crear cuenta
            </Link>
          </>
        )}
      </div>

      {/* Mobile hamburger */}
      <MobileMenu isLoggedIn={!!user} displayName={user?.name ?? user?.email ?? undefined} />
    </nav>
  );
}
