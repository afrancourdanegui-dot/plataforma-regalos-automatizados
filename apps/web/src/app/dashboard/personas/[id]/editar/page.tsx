import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireCurrentUser } from "@/lib/dal";
import EditarPersonaForm from "./editar-form";

export default async function EditarPersonaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireCurrentUser();
  const { id } = await params;

  const persona = await prisma.person.findUnique({ where: { id } });
  if (!persona || persona.userId !== user.id) {
    notFound();
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-20">
      <div className="w-full max-w-sm">
        <h1 className="mb-6 text-center font-display text-3xl italic text-ciruelo">
          Editar persona
        </h1>

        <EditarPersonaForm persona={persona} />

        <Link
          href="/dashboard"
          className="mt-6 block text-center text-sm text-gris-calido"
        >
          Volver al dashboard
        </Link>
      </div>
    </div>
  );
}
