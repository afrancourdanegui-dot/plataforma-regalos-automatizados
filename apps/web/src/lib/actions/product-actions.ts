"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/admin-auth";
import { CATEGORIAS_ORDEN } from "@/lib/productos";

const productoSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  brand: z.string().min(1, "La tienda/marca es obligatoria"),
  category: z.enum(CATEGORIAS_ORDEN as unknown as [string, ...string[]], {
    message: "Categoría inválida",
  }),
  subtype: z.string().optional(),
  price: z.coerce.number().positive("El precio debe ser mayor a 0"),
  description: z.string().optional(),
});

function readProductoForm(formData: FormData) {
  return productoSchema.safeParse({
    name: formData.get("name"),
    brand: formData.get("brand"),
    category: formData.get("category"),
    subtype: formData.get("subtype") || undefined,
    price: formData.get("price"),
    description: formData.get("description") || undefined,
  });
}

export async function crearProducto(
  _prevState: { error?: string } | undefined,
  formData: FormData
): Promise<{ error?: string }> {
  await requireAdminSession();

  const parsed = readProductoForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Datos inválidos" };
  }

  await prisma.product.create({
    data: parsed.data as Parameters<typeof prisma.product.create>[0]["data"],
  });

  revalidatePath("/admin/productos");
  revalidatePath("/dashboard/regalos");
  redirect("/admin/productos");
}

export async function actualizarProducto(
  _prevState: { error?: string } | undefined,
  formData: FormData
): Promise<{ error?: string }> {
  await requireAdminSession();
  const id = formData.get("id");
  if (typeof id !== "string") return { error: "Producto inválido" };

  const parsed = readProductoForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Datos inválidos" };
  }

  await prisma.product.update({
    where: { id },
    data: parsed.data as Parameters<typeof prisma.product.update>[0]["data"],
  });

  revalidatePath("/admin/productos");
  revalidatePath("/dashboard/regalos");
  redirect("/admin/productos");
}

export async function ocultarProducto(formData: FormData) {
  await requireAdminSession();
  const id = formData.get("id");
  if (typeof id !== "string") return;

  await prisma.product.update({ where: { id }, data: { isActive: false } });
  revalidatePath("/admin/productos");
  revalidatePath("/dashboard/regalos");
}

export async function mostrarProducto(formData: FormData) {
  await requireAdminSession();
  const id = formData.get("id");
  if (typeof id !== "string") return;

  await prisma.product.update({ where: { id }, data: { isActive: true } });
  revalidatePath("/admin/productos");
  revalidatePath("/dashboard/regalos");
}
