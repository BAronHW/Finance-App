/*
  Warnings:

  - You are about to drop the column `senderOrRecipientName` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `merchantName` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plaidId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "senderOrRecipientName",
ADD COLUMN     "merchantName" TEXT NOT NULL,
ADD COLUMN     "plaidId" TEXT NOT NULL;
