/*
  Warnings:

  - You are about to drop the column `password` on the `merchant` table. All the data in the column will be lost.
  - Added the required column `hash_password` to the `merchant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "merchant" DROP COLUMN "password",
ADD COLUMN     "hash_password" TEXT NOT NULL;
