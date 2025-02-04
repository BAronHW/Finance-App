/*
  Warnings:

  - A unique constraint covering the columns `[plaidId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Account_plaidId_key" ON "Account"("plaidId");
