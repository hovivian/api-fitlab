/*
  Warnings:

  - You are about to drop the column `rep` on the `Workout` table. All the data in the column will be lost.
  - You are about to drop the column `set` on the `Workout` table. All the data in the column will be lost.
  - Added the required column `rep` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `set` to the `Exercise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "rep" INTEGER NOT NULL,
ADD COLUMN     "set" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "rep",
DROP COLUMN "set";
