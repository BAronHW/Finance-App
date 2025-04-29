/*
  Warnings:

  - You are about to drop the column `Category` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `Reference` on the `Transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "Category",
DROP COLUMN "Reference",
ADD COLUMN     "category" TEXT,
ADD COLUMN     "reference" TEXT;
