/*
  Warnings:

  - You are about to drop the `order` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_delivery_guy_id_fkey";

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_merchant_id_fkey";

-- DropTable
DROP TABLE "order";
