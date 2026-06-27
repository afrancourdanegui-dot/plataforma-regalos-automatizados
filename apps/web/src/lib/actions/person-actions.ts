"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireCurrentUser } from "@/lib/dal";

const personaSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  relationship: z.string().min(1, "La relación es obligatoria"),
  notes: z.string().optional(),
});

function readPersonaForm(formData: FormData) {
  return personaSchema.safeParse({
    name: formData.get("name"),
    relationship: formData.get("relationship"),
    notes: formData.get("notes") || undefined,
  });
}

export async function crearPersona(
  _prevState: { error?: string } | undefined,
  formData: FormData
): Promise<{ error?: string }> {
  const user = await requireCurrentUser();

  const parsed = readPersonaForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Datos inválidos" };
  }

  await prisma.person.create({
    data: { ...parsed.data, userId: user.id },
  });

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function actualizarPersona(
  _prevState: { error?: string } | undefined,
  formData: FormData
): Promise<{ error?: string }> {
  const user = await requireCurrentUser();
  const id = formData.get("id");

  if (typeof id !== "string") {
    return { error: "Persona inválida" };
  }

  const persona = await prisma.person.findUnique({ where: { id } });
  if (!persona || persona.userId !== user.id) {
    return { error: "No autorizado" };
  }

  const parsed = readPersonaForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Datos inválidos" };
  }

  await prisma.person.update({ where: { id }, data: parsed.data });

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function eliminarPersona(formData: FormData) {
  const user = await requireCurrentUser();
  const id = formData.get("id");

  if (typeof id !== "string") return;

  const persona = await prisma.person.findUnique({ where: { id } });
  if (!persona || persona.userId !== user.id) return;

  await prisma.person.delete({ where: { id } });
  revalidatePath("/dashboard");
  redirect("/dashboard");
}
