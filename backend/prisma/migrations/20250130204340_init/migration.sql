/*
  Warnings:

  - Added the required column `plaidId` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "plaidId" TEXT NOT NULL;
