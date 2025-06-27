-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_tagId_fkey";

-- AlterTable
ALTER TABLE "Link" ALTER COLUMN "tagId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE SET NULL ON UPDATE CASCADE;
