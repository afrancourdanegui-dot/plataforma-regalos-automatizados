import Link from "next/link";
import { requireAdminSession } from "@/lib/admin-auth";
import { cerrarSesionAdminAction } from "@/lib/actions/admin-actions";
import { Button, buttonClasses } from "@/components/ui/button";

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdminSession();

  return (
    <div className="flex min-h-screen flex-1 flex-col">
      <header className="flex items-center justify-between border-b border-arena bg-white px-6 py-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-terracota">
          Panel del dueño
        </p>
        <nav className="flex items-center gap-2">
          <Link href="/admin/pedidos" className={buttonClasses("ghost", "text-xs")}>
            Pedidos
          </Link>
          <Link href="/admin/stock" className={buttonClasses("ghost", "text-xs")}>
            Stock
          </Link>
          <Link href="/admin/proveedores" className={buttonClasses("ghost", "text-xs")}>
            Proveedores
          </Link>
          <Link href="/admin/productos" className={buttonClasses("ghost", "text-xs")}>
            Productos
          </Link>
          <form action={cerrarSesionAdminAction}>
            <Button type="submit" variant="ghost" className="text-xs">
              Cerrar sesión
            </Button>
          </form>
        </nav>
      </header>
      {children}
    </div>
  );
}
