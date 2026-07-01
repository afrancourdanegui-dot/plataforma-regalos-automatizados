"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireCurrentUser } from "@/lib/dal";
import { DISTRITO_CODES } from "@/lib/lima-distritos";

const direccionSchema = z.object({
  label: z.string().min(1, "El nombre de la dirección es obligatorio"),
  district: z.enum(DISTRITO_CODES, {
    message: "Elige un distrito de Lima",
  }),
  street: z.string().min(1, "La calle o avenida es obligatoria"),
  housingType: z.enum(["CASA", "DEPARTAMENTO"]),
  number: z.string().min(1, "El número es obligatorio"),
  reference: z.string().max(200).optional(),
  isPrimary: z.boolean(),
});

function readDireccionForm(formData: FormData) {
  const reference = formData.get("reference");
  return direccionSchema.safeParse({
    label: formData.get("label"),
    district: formData.get("district"),
    street: formData.get("street"),
    housingType: formData.get("housingType"),
    number: formData.get("number"),
    reference: reference ? String(reference) : undefined,
    isPrimary: formData.get("isPrimary") === "on",
  });
}

async function personPerteneceAUsuario(personId: string, userId: string) {
  const persona = await prisma.person.findUnique({ where: { id: personId } });
  return !!persona && persona.userId === userId;
}

export async function crearDireccion(
  _prevState: { error?: string } | undefined,
  formData: FormData
): Promise<{ error?: string }> {
  const user = await requireCurrentUser();
  const personId = formData.get("personId");

  if (typeof personId !== "string") {
    return { error: "Persona inválida" };
  }

  if (!(await personPerteneceAUsuario(personId, user.id))) {
    return { error: "No autorizado" };
  }

  const parsed = readDireccionForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Datos inválidos" };
  }

  const direccionesExistentes = await prisma.address.count({
    where: { personId },
  });
  const esPrimera = direccionesExistentes === 0;

  await prisma.$transaction(async (tx) => {
    if (parsed.data.isPrimary || esPrimera) {
      await tx.address.updateMany({
        where: { personId },
        data: { isPrimary: false },
      });
    }

    await tx.address.create({
      data: {
        personId,
        label: parsed.data.label,
        district: parsed.data.district,
        street: parsed.data.street,
        housingType: parsed.data.housingType,
        number: parsed.data.number,
        reference: parsed.data.reference ?? null,
        isPrimary: parsed.data.isPrimary || esPrimera,
      },
    });
  });

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function actualizarDireccion(
  _prevState: { error?: string } | undefined,
  formData: FormData
): Promise<{ error?: string }> {
  const user = await requireCurrentUser();
  const id = formData.get("id");

  if (typeof id !== "string") {
    return { error: "Dirección inválida" };
  }

  const direccion = await prisma.address.findUnique({
    where: { id },
    include: { person: true },
  });
  if (!direccion || direccion.person.userId !== user.id) {
    return { error: "No autorizado" };
  }

  const parsed = readDireccionForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Datos inválidos" };
  }

  await prisma.$transaction(async (tx) => {
    if (parsed.data.isPrimary) {
      await tx.address.updateMany({
        where: { personId: direccion.personId },
        data: { isPrimary: false },
      });
    }

    await tx.address.update({
      where: { id },
      data: {
        label: parsed.data.label,
        district: parsed.data.district,
        street: parsed.data.street,
        housingType: parsed.data.housingType,
        number: parsed.data.number,
        reference: parsed.data.reference ?? null,
        isPrimary: parsed.data.isPrimary,
      },
    });
  });

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function eliminarDireccion(formData: FormData) {
  const user = await requireCurrentUser();
  const id = formData.get("id");

  if (typeof id !== "string") return;

  const direccion = await prisma.address.findUnique({
    where: { id },
    include: { person: true },
  });
  if (!direccion || direccion.person.userId !== user.id) return;

  await prisma.$transaction(async (tx) => {
    await tx.address.delete({ where: { id } });

    if (direccion.isPrimary) {
      const siguiente = await tx.address.findFirst({
        where: { personId: direccion.personId },
        orderBy: { createdAt: "asc" },
      });
      if (siguiente) {
        await tx.address.update({
          where: { id: siguiente.id },
          data: { isPrimary: true },
        });
      }
    }
  });

  revalidatePath("/dashboard");
  redirect("/dashboard");
}
