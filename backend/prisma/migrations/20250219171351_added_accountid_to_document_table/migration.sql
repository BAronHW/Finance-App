/*
  Warnings:

  - A unique constraint covering the columns `[accountId]` on the table `Document` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "accountId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Document_accountId_key" ON "Document"("accountId");

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;
