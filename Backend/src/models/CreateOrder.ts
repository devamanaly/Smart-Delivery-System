import { PrismaClient } from "../generated/prisma";

interface OrderAttributes {
  order_id: number;
  merchant_id: number;
  deliveryMethod: string;
  orderStatus: string;
  trackingNumber: string;
  createdAt: Date;
  updatedAt: Date;
  pickupAddress: string;
  dropoffAddress: string;
  receiverName: string;
  receiverPhone: string;
  parcelSize: string;
  packageDescription: string;
  totalPrice: number;
}

const prisma = new PrismaClient();
async function CreateOrder(
  merchant_id: number  ,
  deliveryMethod: string,
  orderStatus: string,
  trackingNumber: string,
  pickupAddress: string,
  dropoffAddress: string,
  receiverName: string,
  receiverPhone: string,
  receiverEmail:string,
  parcelSize: string,
  packageDescription: string,
  totalPrice: number,
  
  // delivery_guy_id?: number | null,

) {
  try {
    const newOrder = await prisma.orders.create({
      data: {
        merchant_id,
        deliveryMethod,
        orderStatus,
        trackingNumber,
        pickupAddress,
        dropoffAddress,
        receiverName,
        receiverPhone,
        receiverEmail,
        parcelSize,
        packageDescription,
        totalPrice,
        delivery_guy_id: null

        // createdAt is automatically handled by Prisma's @default(now())
      },
    });

    console.log("Order created:", newOrder);
    return newOrder;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export default CreateOrder;