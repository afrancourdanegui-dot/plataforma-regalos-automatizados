import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireCurrentUser } from "@/lib/dal";
import PerfilForm from "./perfil-form";

export default async function PerfilPage() {
  const user = await requireCurrentUser();

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { createdAt: true, passwordHash: true },
  });

  const createdAt = dbUser?.createdAt.toLocaleDateString("es-PE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }) ?? "";

  return (
    <div className="flex flex-1 flex-col items-center px-6 py-16">
      <div className="w-full max-w-2xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-terracota">
              Siempre Presente
            </p>
            <h1 className="mt-1 font-display text-3xl italic text-ciruelo">Mi perfil</h1>
          </div>
          <Link href="/dashboard" className="text-xs font-semibold text-terracota">
            Volver al dashboard
          </Link>
        </div>

        <PerfilForm
          name={user.name ?? ""}
          email={user.email}
          hasPassword={!!dbUser?.passwordHash}
          createdAt={createdAt}
        />
      </div>
    </div>
  );
}
