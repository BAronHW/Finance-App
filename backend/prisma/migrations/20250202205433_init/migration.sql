/*
  Warnings:

  - You are about to drop the column `subType` on the `Account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "subType",
ADD COLUMN     "subtype" TEXT;
