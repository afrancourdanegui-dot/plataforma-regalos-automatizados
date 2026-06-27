/*
  Warnings:

  - Made the column `location` on table `people` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "people" ALTER COLUMN "location" SET NOT NULL;
