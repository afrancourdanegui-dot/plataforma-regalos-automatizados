-- AlterTable
ALTER TABLE "occasions" ADD COLUMN     "addressId" TEXT;

-- AddForeignKey
ALTER TABLE "occasions" ADD CONSTRAINT "occasions_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
