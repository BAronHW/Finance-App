-- CreateTable
CREATE TABLE "Document" (
    "key" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "name" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Document_key_key" ON "Document"("key");
