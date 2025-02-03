/*
  Warnings:

  - You are about to drop the column `reference` on the `Transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "reference",
ALTER COLUMN "name" DROP NOT NULL;
