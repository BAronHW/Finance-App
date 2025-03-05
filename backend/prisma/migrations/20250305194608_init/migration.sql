-- CreateTable
CREATE TABLE "Document" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "name" TEXT,
    "uid" TEXT NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Document_key_key" ON "Document"("key");

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_documentKey_fkey" FOREIGN KEY ("documentKey") REFERENCES "Document"("key") ON DELETE SET NULL ON UPDATE CASCADE;
