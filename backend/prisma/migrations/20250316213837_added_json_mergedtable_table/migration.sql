-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_userId_fkey";

-- CreateTable
CREATE TABLE "MergedTable" (
    "id" SERIAL NOT NULL,
    "documentKey" TEXT NOT NULL,
    "mergedTableContent" JSONB NOT NULL,

    CONSTRAINT "MergedTable_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MergedTable" ADD CONSTRAINT "MergedTable_documentKey_fkey" FOREIGN KEY ("documentKey") REFERENCES "Document"("key") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
