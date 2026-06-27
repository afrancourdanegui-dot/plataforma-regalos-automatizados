/*
  Warnings:

  - You are about to drop the column `location` on the `people` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "HousingType" AS ENUM ('CASA', 'DEPARTAMENTO');

-- CreateEnum
CREATE TYPE "LimaDistrict" AS ENUM ('CERCADO_DE_LIMA', 'ANCON', 'ATE', 'BARRANCO', 'BRENA', 'CARABAYLLO', 'CHACLACAYO', 'CHORRILLOS', 'CIENEGUILLA', 'COMAS', 'EL_AGUSTINO', 'INDEPENDENCIA', 'JESUS_MARIA', 'LA_MOLINA', 'LA_VICTORIA', 'LINCE', 'LOS_OLIVOS', 'LURIGANCHO', 'LURIN', 'MAGDALENA_DEL_MAR', 'MIRAFLORES', 'PACHACAMAC', 'PUCUSANA', 'PUEBLO_LIBRE', 'PUENTE_PIEDRA', 'PUNTA_HERMOSA', 'PUNTA_NEGRA', 'RIMAC', 'SAN_BARTOLO', 'SAN_BORJA', 'SAN_ISIDRO', 'SAN_JUAN_DE_LURIGANCHO', 'SAN_JUAN_DE_MIRAFLORES', 'SAN_LUIS', 'SAN_MARTIN_DE_PORRES', 'SAN_MIGUEL', 'SANTA_ANITA', 'SANTA_MARIA_DEL_MAR', 'SANTA_ROSA', 'SANTIAGO_DE_SURCO', 'SURQUILLO', 'VILLA_EL_SALVADOR', 'VILLA_MARIA_DEL_TRIUNFO');

-- AlterTable
ALTER TABLE "people" DROP COLUMN "location";

-- CreateTable
CREATE TABLE "addresses" (
    "id" TEXT NOT NULL,
    "personId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "district" "LimaDistrict" NOT NULL,
    "street" TEXT NOT NULL,
    "housingType" "HousingType" NOT NULL DEFAULT 'CASA',
    "number" TEXT NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "addresses_personId_idx" ON "addresses"("personId");

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_personId_fkey" FOREIGN KEY ("personId") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE;
