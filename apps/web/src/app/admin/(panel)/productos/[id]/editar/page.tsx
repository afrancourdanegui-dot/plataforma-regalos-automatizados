import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import EditarProductoForm from "./editar-form";

export default async function EditarProductoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const producto = await prisma.product.findUnique({ where: { id } });
  if (!producto) notFound();

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-20">
      <div className="w-full max-w-sm">
        <h1 className="mb-6 text-center font-display text-3xl italic text-ciruelo">
          Editar producto
        </h1>

        <EditarProductoForm
          producto={{
            id: producto.id,
            name: producto.name,
            brand: producto.brand,
            category: producto.category,
            subtype: producto.subtype,
            price: producto.price.toString(),
            description: producto.description,
          }}
        />

        <Link href="/admin/productos" className="mt-6 block text-center text-sm text-gris-calido">
          Volver a productos
        </Link>
      </div>
    </div>
  );
}
