"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireCurrentUser } from "@/lib/dal";

const perfilSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio").max(80, "Nombre demasiado largo"),
});

export async function actualizarPerfil(
  _prevState: { error?: string; success?: boolean } | undefined,
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  const user = await requireCurrentUser();

  const parsed = perfilSchema.safeParse({ name: formData.get("name") });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Datos inválidos" };
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { name: parsed.data.name },
  });

  revalidatePath("/dashboard/perfil");
  revalidatePath("/dashboard");

  return { success: true };
}
