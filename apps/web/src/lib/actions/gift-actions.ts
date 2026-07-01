"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireCurrentUser } from "@/lib/dal";
import { proximaFechaOcasion } from "@/lib/ocasiones";

async function occasionDeUsuario(occasionId: string, userId: string) {
  const ocasion = await prisma.occasion.findUnique({
    where: { id: occasionId },
    include: {
      person: { include: { addresses: { orderBy: [{ isPrimary: "desc" }, { createdAt: "asc" }] } } },
    },
  });
  if (!ocasion || ocasion.person.userId !== userId) return null;
  return ocasion;
}

export async function agregarRegalo(formData: FormData) {
  const user = await requireCurrentUser();
  const occasionId = formData.get("occasionId");
  const productId = formData.get("productId");

  if (typeof occasionId !== "string" || typeof productId !== "string") return;

  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: { category: true },
  });
  if (product?.category === "VINOS" && formData.get("ageConfirmed") !== "true") return;

  const ocasion = await occasionDeUsuario(occasionId, user.id);
  if (!ocasion) return;

  const direccionPorDefecto = ocasion.person.addresses[0]?.id;
  if (!ocasion.addressId && !direccionPorDefecto) return;

  const dueDate = proximaFechaOcasion(ocasion);
  await prisma.giftSelection.upsert({
    where: { occasionId_productId: { occasionId, productId } },
    update: { cancelledAt: null, dueDate },
    create: { occasionId, productId, dueDate },
  });

  if (!ocasion.addressId) {
    await prisma.occasion.update({
      where: { id: occasionId },
      data: { addressId: direccionPorDefecto },
    });
  }

  revalidatePath(`/dashboard/ocasiones/${occasionId}/regalos`);
  revalidatePath("/dashboard");
}

export async function actualizarDireccionOcasion(formData: FormData) {
  const user = await requireCurrentUser();
  const occasionId = formData.get("occasionId");
  const addressId = formData.get("addressId");

  if (typeof occasionId !== "string" || typeof addressId !== "string") return;
  const ocasion = await occasionDeUsuario(occasionId, user.id);
  if (!ocasion) return;
  if (!ocasion.person.addresses.some((direccion) => direccion.id === addressId)) return;

  await prisma.occasion.update({
    where: { id: occasionId },
    data: { addressId },
  });

  revalidatePath(`/dashboard/ocasiones/${occasionId}/regalos`);
}

export async function quitarRegalo(formData: FormData) {
  const user = await requireCurrentUser();
  const id = formData.get("id");

  if (typeof id !== "string") return;

  const seleccion = await prisma.giftSelection.findUnique({
    where: { id },
    include: { occasion: { include: { person: true } } },
  });
  if (!seleccion || seleccion.occasion.person.userId !== user.id) return;

  await prisma.giftSelection.delete({ where: { id } });

  revalidatePath(`/dashboard/ocasiones/${seleccion.occasionId}/regalos`);
  revalidatePath("/dashboard");
}

export async function cancelarRegalo(formData: FormData) {
  const user = await requireCurrentUser();
  const id = formData.get("id");

  if (typeof id !== "string") return;

  const seleccion = await prisma.giftSelection.findUnique({
    where: { id },
    include: { occasion: { include: { person: true } } },
  });
  if (!seleccion || seleccion.occasion.person.userId !== user.id) return;

  await prisma.giftSelection.update({
    where: { id },
    data: { cancelledAt: new Date() },
  });

  revalidatePath("/dashboard/pedidos");
}
