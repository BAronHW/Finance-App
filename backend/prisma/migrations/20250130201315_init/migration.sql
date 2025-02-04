/*
  Warnings:

  - A unique constraint covering the columns `[plaidId]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Transaction_plaidId_key" ON "Transaction"("plaidId");
