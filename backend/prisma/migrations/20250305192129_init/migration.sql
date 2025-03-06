/*
  Warnings:

  - You are about to drop the `Document` table. If the table is not empty, all the data it contains will be lost.

*/
ALTER TABLE "Account" DROP CONSTRAINT "Account_documentKey_fkey";
-- DropTable
DROP TABLE "Document";
