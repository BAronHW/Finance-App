/*
  Warnings:

  - You are about to drop the column `accountId` on the `Document` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Document` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Document` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_accountId_fkey";

-- DropIndex
DROP INDEX "Document_accountId_key";

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "documentKey" TEXT;

-- AlterTable
ALTER TABLE "Document" DROP COLUMN "accountId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Document_userId_key" ON "Document"("userId");

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_documentKey_fkey" FOREIGN KEY ("documentKey") REFERENCES "Document"("key") ON DELETE SET NULL ON UPDATE CASCADE;
