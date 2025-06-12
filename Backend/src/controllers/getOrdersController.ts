// import { error } from "console";
import { PrismaClient } from "../generated/prisma";
import { Request, Response } from "express";
interface getOrdersController {}
const getOrdersController = async (req: Request, res: Response): Promise<void> => {
    const prisma = new PrismaClient();
    const user = req.userInfo;
  
    if (!user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
  
    try {
      if (user.role === "merchant") {
        const orders = await prisma.orders.findMany({
          where: { merchant_id: user.merchant_id },
          select: {
            order_id: true,
            merchant_id: true,
            deliveryMethod: true,
            orderStatus: true,
            trackingNumber: true,
            createdAt: true,
            updatedAt: true,
            pickupAddress: true,
            dropoffAddress: true,
            receiverName: true,
            parcelSize: true,
            packageDescription: true,
            totalPrice: true,
          },
        });
        res.status(200).json({
          message: "The Orders of merchant retrieved",
          orders,
        });
      } else if (user.role === "delivery-guy") {
        const orders = await prisma.orders.findMany({
          where: { delivery_guy_id: user.delivery_guy_id },
          select: {
            order_id: true,
            delivery_guy_id: true,
            deliveryMethod: true,
            orderStatus: true,
            trackingNumber: true,
            createdAt: true,
            updatedAt: true,
            pickupAddress: true,
            dropoffAddress: true,
            receiverName: true,
            parcelSize: true,
            packageDescription: true,
            totalPrice: true,
          },
        });
        res.status(200).json({
          message: "The Orders of delivery_guy retrieved",
          orders,
        });
      } else {
        res.status(400).json({ error: "the role is unauthorized" });
      }
    } catch (err) {
      res.status(500).json({ error: "The get is failed" });
    }
  };


  export default getOrdersController
  