/*
  Warnings:

  - The primary key for the `Food` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Food" DROP CONSTRAINT "Food_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Food_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Food_id_seq";
