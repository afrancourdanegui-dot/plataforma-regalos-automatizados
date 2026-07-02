-- AlterTable
ALTER TABLE "people" ADD COLUMN     "preferences" TEXT[] DEFAULT ARRAY[]::TEXT[];
