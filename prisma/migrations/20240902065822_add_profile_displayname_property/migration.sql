/*
  Warnings:

  - Added the required column `displayName` to the `profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "profile" ADD COLUMN     "displayName" TEXT NOT NULL;
