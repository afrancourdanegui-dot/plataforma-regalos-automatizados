import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireCurrentUser } from "@/lib/dal";
import EditarDireccionForm from "./editar-form";

export default async function EditarDireccionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireCurrentUser();
  const { id } = await params;

  const direccion = await prisma.address.findUnique({
    where: { id },
    include: { person: true },
  });

  if (!direccion || direccion.person.userId !== user.id) {
    notFound();
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-20">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <h1 className="font-display text-3xl italic text-ciruelo">
            Editar dirección
          </h1>
          <p className="mt-1 text-sm text-gris-calido">
            de {direccion.person.name}
          </p>
        </div>

        <EditarDireccionForm direccion={direccion} />

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
