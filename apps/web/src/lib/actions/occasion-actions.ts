"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireCurrentUser } from "@/lib/dal";
import {
  OCCASION_TYPE_CODES,
  SPECIAL_DAY_CODES,
  esFechaAutomatica,
  diasEnMes,
} from "@/lib/ocasiones";

const ocasionSchema = z
  .object({
    type: z.enum(OCCASION_TYPE_CODES),
    label: z.string().optional(),
    specialDay: z.enum(SPECIAL_DAY_CODES).optional(),
    frequency: z.enum(["MONTHLY", "YEARLY"]).optional(),
    month: z.coerce.number().int().min(1).max(12).optional(),
    day: z.coerce.number().int().min(1).max(31).optional(),
  })
  .refine((data) => data.type !== "CUSTOM" || !!data.label?.trim(), {
    message: "Escribe el motivo",
    path: ["label"],
  })
  .refine((data) => data.type !== "SPECIAL_DAY" || !!data.specialDay, {
    message: "Elige cuál día festivo",
    path: ["specialDay"],
  })
  .refine((data) => esFechaAutomatica(data.type) || !!data.day, {
    message: "El día es obligatorio",
    path: ["day"],
  })
  .refine(
    (data) =>
      esFechaAutomatica(data.type) ||
      data.frequency !== "YEARLY" ||
      !!data.month,
    { message: "Elige el mes", path: ["month"] }
  )
  .refine(
    (data) =>
      esFechaAutomatica(data.type) ||
      !data.day ||
      data.day <= diasEnMes(data.frequency === "YEARLY" ? data.month ?? null : null),
    { message: "Ese día no existe en el mes elegido", path: ["day"] }
  );

function readOcasionForm(formData: FormData) {
  return ocasionSchema.safeParse({
    type: formData.get("type"),
    label: formData.get("label") || undefined,
    specialDay: formData.get("specialDay") || undefined,
    frequency: formData.get("frequency") || undefined,
    month: formData.get("month") || undefined,
    day: formData.get("day") || undefined,
  });
}

function datosDeOcasion(parsed: z.infer<typeof ocasionSchema>) {
  const flotante = esFechaAutomatica(parsed.type);
  const label =
    parsed.type === "CUSTOM"
      ? parsed.label
      : parsed.type === "SPECIAL_DAY"
        ? parsed.specialDay
        : null;
  return {
    type: parsed.type,
    label: label ?? null,
    frequency: flotante ? ("YEARLY" as const) : parsed.frequency ?? "YEARLY",
    month: flotante ? null : parsed.frequency === "YEARLY" ? parsed.month : null,
    day: flotante ? null : parsed.day,
  };
}

async function personPerteneceAUsuario(personId: string, userId: string) {
  const persona = await prisma.person.findUnique({ where: { id: personId } });
  return !!persona && persona.userId === userId;
}

export async function crearOcasion(
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

  const parsed = readOcasionForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Datos inválidos" };
  }

  await prisma.occasion.create({
    data: { personId, ...datosDeOcasion(parsed.data) },
  });

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function actualizarOcasion(
  _prevState: { error?: string } | undefined,
  formData: FormData
): Promise<{ error?: string }> {
  const user = await requireCurrentUser();
  const id = formData.get("id");

  if (typeof id !== "string") {
    return { error: "Ocasión inválida" };
  }

  const ocasion = await prisma.occasion.findUnique({
    where: { id },
    include: { person: true },
  });
  if (!ocasion || ocasion.person.userId !== user.id) {
    return { error: "No autorizado" };
  }

  const parsed = readOcasionForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Datos inválidos" };
  }

  await prisma.occasion.update({
    where: { id },
    data: datosDeOcasion(parsed.data),
  });

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function eliminarOcasion(formData: FormData) {
  const user = await requireCurrentUser();
  const id = formData.get("id");

  if (typeof id !== "string") return;

  const ocasion = await prisma.occasion.findUnique({
    where: { id },
    include: { person: true },
  });
  if (!ocasion || ocasion.person.userId !== user.id) return;

  await prisma.occasion.delete({ where: { id } });
  revalidatePath("/dashboard");
  redirect("/dashboard");
}
