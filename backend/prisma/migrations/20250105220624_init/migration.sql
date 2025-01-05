/*
  Warnings:

  - A unique constraint covering the columns `[linkTokenId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "linkTokenId" INTEGER;

-- CreateTable
CREATE TABLE "LinkToken" (
    "id" SERIAL NOT NULL,
    "link_token" TEXT NOT NULL,
    "expiration" TEXT NOT NULL,
    "request_id" TEXT NOT NULL,

    CONSTRAINT "LinkToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_linkTokenId_key" ON "User"("linkTokenId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_linkTokenId_fkey" FOREIGN KEY ("linkTokenId") REFERENCES "LinkToken"("id") ON DELETE SET NULL ON UPDATE CASCADE;
