-- CreateEnum
CREATE TYPE "InOrOut" AS ENUM ('IN', 'OUT');

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "accountName" TEXT NOT NULL,
    "io" "InOrOut" NOT NULL,
    "name" TEXT NOT NULL,
    "senderOrRecipientName" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "Reference" TEXT,
    "Category" TEXT,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_accountName_key" ON "Transaction"("accountName");
