/*
  Warnings:

  - The values [texts] on the enum `ContentType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ContentType_new" AS ENUM ('youtube', 'x', 'instagram', 'reddit', 'photos', 'videos', 'otherLinks');
ALTER TABLE "Link" ALTER COLUMN "content" DROP DEFAULT;
ALTER TABLE "Link" ALTER COLUMN "content" TYPE "ContentType_new" USING ("content"::text::"ContentType_new");
ALTER TYPE "ContentType" RENAME TO "ContentType_old";
ALTER TYPE "ContentType_new" RENAME TO "ContentType";
DROP TYPE "ContentType_old";
ALTER TABLE "Link" ALTER COLUMN "content" SET DEFAULT 'youtube';
COMMIT;

-- CreateTable
CREATE TABLE "Texts" (
    "id" TEXT NOT NULL,
    "publicDisplay" BOOLEAN NOT NULL DEFAULT false,
    "projectId" TEXT NOT NULL,
    "tagId" TEXT,

    CONSTRAINT "Texts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Texts_tagId_key" ON "Texts"("tagId");

-- AddForeignKey
ALTER TABLE "Texts" ADD CONSTRAINT "Texts_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Texts" ADD CONSTRAINT "Texts_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE SET NULL ON UPDATE CASCADE;
