/*
  Warnings:

  - You are about to drop the column `identifierId` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Exercise` table. All the data in the column will be lost.
  - Added the required column `name` to the `Exercise` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Exercise_identifierId_key";

-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "identifierId",
DROP COLUMN "title",
ADD COLUMN     "name" TEXT NOT NULL;
