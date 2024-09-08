/*
  Warnings:

  - A unique constraint covering the columns `[ownerId]` on the table `family` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "family" ADD COLUMN     "ownerId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "family_ownerId_key" ON "family"("ownerId");

-- AddForeignKey
ALTER TABLE "family" ADD CONSTRAINT "family_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
