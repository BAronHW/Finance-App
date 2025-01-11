-- CreateTable
CREATE TABLE "AccessToken" (
    "id" SERIAL NOT NULL,
    "accessToken" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "request_id" TEXT NOT NULL,

    CONSTRAINT "AccessToken_pkey" PRIMARY KEY ("id")
);
