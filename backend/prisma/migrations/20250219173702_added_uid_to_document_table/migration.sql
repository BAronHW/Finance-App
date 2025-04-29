/*
  Warnings:

  - You are about to drop the column `userId` on the `Document` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uid]` on the table `Document` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uid` to the `Document` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_userId_fkey";

-- DropIndex
DROP INDEX "Document_userId_key";

-- AlterTable
ALTER TABLE "Document" DROP COLUMN "userId",
ADD COLUMN     "uid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Document_uid_key" ON "Document"("uid");

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
