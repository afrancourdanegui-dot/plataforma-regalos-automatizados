-- CreateEnum
CREATE TYPE "ProductCategory" AS ENUM ('FLORES', 'VINOS', 'TORTAS', 'CHOCOLATES', 'SPA', 'CAJAS_CURADAS');

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "category" "ProductCategory" NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gift_selections" (
    "id" TEXT NOT NULL,
    "occasionId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "gift_selections_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "gift_selections_occasionId_idx" ON "gift_selections"("occasionId");

-- CreateIndex
CREATE INDEX "gift_selections_productId_idx" ON "gift_selections"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "gift_selections_occasionId_productId_key" ON "gift_selections"("occasionId", "productId");

-- AddForeignKey
ALTER TABLE "gift_selections" ADD CONSTRAINT "gift_selections_occasionId_fkey" FOREIGN KEY ("occasionId") REFERENCES "occasions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gift_selections" ADD CONSTRAINT "gift_selections_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
