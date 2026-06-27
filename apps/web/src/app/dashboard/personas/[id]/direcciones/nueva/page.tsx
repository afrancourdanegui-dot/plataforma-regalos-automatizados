import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireCurrentUser } from "@/lib/dal";
import NuevaDireccionForm from "./nueva-form";

export default async function NuevaDireccionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireCurrentUser();
  const { id } = await params;

  const persona = await prisma.person.findUnique({
    where: { id },
    include: { addresses: true },
  });
  if (!persona || persona.userId !== user.id) {
    notFound();
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-20">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <h1 className="font-display text-3xl italic text-ciruelo">
            Nueva dirección
          </h1>
          <p className="mt-1 text-sm text-gris-calido">para {persona.name}</p>
        </div>

        <div className="rounded-2xl border border-arena bg-white p-6">
          <NuevaDireccionForm
            personId={persona.id}
            esPrimera={persona.addresses.length === 0}
          />
        </div>

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
