/*
  Warnings:

  - You are about to drop the column `linkTokenId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `AccessToken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LinkToken` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[AccessToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_linkTokenId_fkey";

-- DropIndex
DROP INDEX "User_linkTokenId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "linkTokenId",
ADD COLUMN     "AccessToken" TEXT;

-- DropTable
DROP TABLE "AccessToken";

-- DropTable
DROP TABLE "LinkToken";

-- CreateIndex
CREATE UNIQUE INDEX "User_AccessToken_key" ON "User"("AccessToken");
