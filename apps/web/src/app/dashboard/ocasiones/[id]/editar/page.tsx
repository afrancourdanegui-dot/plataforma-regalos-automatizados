import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireCurrentUser } from "@/lib/dal";
import EditarOcasionForm from "./editar-form";

export default async function EditarOcasionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireCurrentUser();
  const { id } = await params;

  const ocasion = await prisma.occasion.findUnique({
    where: { id },
    include: { person: true },
  });

  if (!ocasion || ocasion.person.userId !== user.id) {
    notFound();
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-20">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <h1 className="font-display text-3xl italic text-ciruelo">
            Editar fecha
          </h1>
          <p className="mt-1 text-sm text-gris-calido">
            de {ocasion.person.name}
          </p>
        </div>

        <EditarOcasionForm ocasion={ocasion} />

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
