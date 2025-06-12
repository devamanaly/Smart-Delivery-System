-- CreateTable
CREATE TABLE "orders" (
    "order_id" SERIAL NOT NULL,
    "merchant_id" INTEGER NOT NULL,
    "delivery_guy_id" INTEGER NOT NULL,
    "deliveryMethod" TEXT NOT NULL,
    "orderStatus" TEXT NOT NULL,
    "trackingNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "pickupAddress" TEXT NOT NULL,
    "dropoffAddress" TEXT NOT NULL,
    "receiverName" TEXT NOT NULL,
    "receiverPhone" TEXT NOT NULL,
    "parcelSize" TEXT NOT NULL,
    "packageDescription" TEXT NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("order_id")
);

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_merchant_id_fkey" FOREIGN KEY ("merchant_id") REFERENCES "merchant"("merchant_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_delivery_guy_id_fkey" FOREIGN KEY ("delivery_guy_id") REFERENCES "delivery_guy"("delivery_guy_id") ON DELETE RESTRICT ON UPDATE CASCADE;
