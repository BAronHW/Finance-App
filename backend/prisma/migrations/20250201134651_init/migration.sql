/*
  Warnings:

  - You are about to drop the column `balancesId` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the `Balances` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `available` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `current` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_balancesId_fkey";

-- DropIndex
DROP INDEX "Account_balancesId_key";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "balancesId",
ADD COLUMN     "available" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "current" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "isoCurrencyCode" TEXT,
ADD COLUMN     "limit" DOUBLE PRECISION,
ADD COLUMN     "unofficialCurrencyCode" TEXT;

-- DropTable
DROP TABLE "Balances";
