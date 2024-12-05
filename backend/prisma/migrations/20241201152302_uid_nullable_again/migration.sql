-- DropIndex
DROP INDEX "User_uid_key";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "uid" DROP NOT NULL;
