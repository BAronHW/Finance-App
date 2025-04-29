/*
  Warnings:

  - You are about to drop the column `accountName` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `accountId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Transaction_accountName_key";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "accountName",
ADD COLUMN     "accountId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "balanceId" INTEGER NOT NULL,
    "mask" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "officialName" TEXT,
    "type" TEXT NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Balances" (
    "id" SERIAL NOT NULL,
    "available" DOUBLE PRECISION NOT NULL,
    "current" DOUBLE PRECISION NOT NULL,
    "isoCurrencyCode" TEXT,
    "unofficialCurrencyCode" TEXT,
    "limit" DOUBLE PRECISION,

    CONSTRAINT "Balances_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
