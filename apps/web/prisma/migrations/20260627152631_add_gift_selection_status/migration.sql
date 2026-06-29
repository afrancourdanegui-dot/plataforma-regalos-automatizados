/*
  Warnings:

  - Added the required column `dueDate` to the `gift_selections` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "gift_selections" ADD COLUMN     "cancelledAt" TIMESTAMP(3),
ADD COLUMN     "dueDate" TIMESTAMP(3) NOT NULL;
