/*
  Warnings:

  - Added the required column `content` to the `Texts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Texts" ADD COLUMN     "content" TEXT NOT NULL;
