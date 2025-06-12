-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_delivery_guy_id_fkey";

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "delivery_guy_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_delivery_guy_id_fkey" FOREIGN KEY ("delivery_guy_id") REFERENCES "delivery_guy"("delivery_guy_id") ON DELETE SET NULL ON UPDATE CASCADE;
