/*
  Warnings:

  - You are about to drop the column `balanceId` on the `Account` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[balancesId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `balancesId` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountId` to the `Balances` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "balanceId",
ADD COLUMN     "balancesId" INTEGER NOT NULL,
ADD COLUMN     "subType" TEXT,
ALTER COLUMN "mask" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Balances" ADD COLUMN     "accountId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Account_balancesId_key" ON "Account"("balancesId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_balancesId_fkey" FOREIGN KEY ("balancesId") REFERENCES "Balances"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
