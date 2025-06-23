/*
  Warnings:

  - The `content` column on the `Link` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('Youtube', 'X', 'Instagram', 'Texts', 'Reddit', 'Photos', 'Videos', 'OtherLinks');

-- AlterTable
ALTER TABLE "Link" DROP COLUMN "content",
ADD COLUMN     "content" "ContentType" NOT NULL DEFAULT 'Youtube';
