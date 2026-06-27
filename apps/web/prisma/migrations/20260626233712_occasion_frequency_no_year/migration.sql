/*
  Warnings:

  - You are about to drop the column `date` on the `occasions` table. All the data in the column will be lost.
  - You are about to drop the column `recurringYearly` on the `occasions` table. All the data in the column will be lost.
  - Added the required column `day` to the `occasions` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OccasionFrequency" AS ENUM ('MONTHLY', 'YEARLY');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "OccasionType" ADD VALUE 'MOTHERS_DAY';
ALTER TYPE "OccasionType" ADD VALUE 'FATHERS_DAY';
ALTER TYPE "OccasionType" ADD VALUE 'VALENTINES';
ALTER TYPE "OccasionType" ADD VALUE 'CHRISTMAS';
ALTER TYPE "OccasionType" ADD VALUE 'GRADUATION';

-- AlterTable
ALTER TABLE "occasions" DROP COLUMN "date",
DROP COLUMN "recurringYearly",
ADD COLUMN     "day" INTEGER NOT NULL,
ADD COLUMN     "frequency" "OccasionFrequency" NOT NULL DEFAULT 'YEARLY',
ADD COLUMN     "month" INTEGER,
ALTER COLUMN "label" DROP NOT NULL;
