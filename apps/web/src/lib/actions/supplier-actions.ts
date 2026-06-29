"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/admin-auth";

const supplierSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  phone: z.string().optional(),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
  notes: z.string().optional(),
});

function readSupplierForm(formData: FormData) {
  return supplierSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone") || undefined,
    email: formData.get("email") || undefined,
    notes: formData.get("notes") || undefined,
  });
}

export async function crearProveedor(
  _prevState: { error?: string } | undefined,
  formData: FormData
): Promise<{ error?: string }> {
  await requireAdminSession();

  const parsed = readSupplierForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Datos inválidos" };
  }

  await prisma.supplier.create({ data: parsed.data });

  revalidatePath("/admin/proveedores");
  redirect("/admin/proveedores");
}

export async function actualizarProveedor(
  _prevState: { error?: string } | undefined,
  formData: FormData
): Promise<{ error?: string }> {
  await requireAdminSession();
  const id = formData.get("id");
  if (typeof id !== "string") return { error: "Proveedor inválido" };

  const parsed = readSupplierForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Datos inválidos" };
  }

  await prisma.supplier.update({ where: { id }, data: parsed.data });

  revalidatePath("/admin/proveedores");
  redirect("/admin/proveedores");
}

export async function desactivarProveedor(formData: FormData) {
  await requireAdminSession();
  const id = formData.get("id");
  if (typeof id !== "string") return;

  await prisma.supplier.update({ where: { id }, data: { isActive: false } });
  revalidatePath("/admin/proveedores");
}

export async function reactivarProveedor(formData: FormData) {
  await requireAdminSession();
  const id = formData.get("id");
  if (typeof id !== "string") return;

  await prisma.supplier.update({ where: { id }, data: { isActive: true } });
  revalidatePath("/admin/proveedores");
}

export async function asignarProductoAProveedor(formData: FormData) {
  await requireAdminSession();
  const supplierId = formData.get("supplierId");
  const productId = formData.get("productId");
  if (typeof supplierId !== "string" || typeof productId !== "string") return;

  await prisma.productSupplier.upsert({
    where: { productId_supplierId: { productId, supplierId } },
    update: {},
    create: { productId, supplierId },
  });

  revalidatePath(`/admin/proveedores/${supplierId}/editar`);
}

export async function quitarProductoDeProveedor(formData: FormData) {
  await requireAdminSession();
  const supplierId = formData.get("supplierId");
  const productId = formData.get("productId");
  if (typeof supplierId !== "string" || typeof productId !== "string") return;

  await prisma.productSupplier.delete({
    where: { productId_supplierId: { productId, supplierId } },
  });

  revalidatePath(`/admin/proveedores/${supplierId}/editar`);
}

export async function marcarProveedorPrincipal(formData: FormData) {
  await requireAdminSession();
  const supplierId = formData.get("supplierId");
  const productId = formData.get("productId");
  if (typeof supplierId !== "string" || typeof productId !== "string") return;

  await prisma.$transaction([
    prisma.productSupplier.updateMany({
      where: { productId },
      data: { isPrincipal: false },
    }),
    prisma.productSupplier.update({
      where: { productId_supplierId: { productId, supplierId } },
      data: { isPrincipal: true },
    }),
  ]);

  revalidatePath(`/admin/proveedores/${supplierId}/editar`);
  revalidatePath("/admin/stock");
}
