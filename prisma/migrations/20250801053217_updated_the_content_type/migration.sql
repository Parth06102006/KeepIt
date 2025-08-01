/*
  Warnings:

  - The values [otherLinks] on the enum `ContentType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ContentType_new" AS ENUM ('youtube', 'x', 'instagram', 'reddit', 'photos', 'videos', 'otherlinks');
ALTER TABLE "Link" ALTER COLUMN "content" DROP DEFAULT;
ALTER TABLE "Link" ALTER COLUMN "content" TYPE "ContentType_new" USING ("content"::text::"ContentType_new");
ALTER TYPE "ContentType" RENAME TO "ContentType_old";
ALTER TYPE "ContentType_new" RENAME TO "ContentType";
DROP TYPE "ContentType_old";
ALTER TABLE "Link" ALTER COLUMN "content" SET DEFAULT 'youtube';
COMMIT;
