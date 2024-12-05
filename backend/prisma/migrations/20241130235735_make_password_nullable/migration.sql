/*
  Warnings:

  - You are about to drop the column `uuid` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "uuid",
ADD COLUMN     "uid" TEXT,
ALTER COLUMN "password" DROP NOT NULL;
