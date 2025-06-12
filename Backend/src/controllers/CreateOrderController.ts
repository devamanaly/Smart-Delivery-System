import { Prisma, PrismaClient } from "../generated/prisma";
import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { generateTrackingNumber } from "../utils/TrackingNumber";
import FindUserByEmail from "../models/FindUser";
import CreateOrder from "../models/CreateOrder";
import emailService from "../utils/email.service";
interface ItemInput {
  item_name: string;
  quantity: number;
  price: number;
}

interface OrderInput {
  deliveryMethod: string;
  orderStatus: string;
  trackingNumber: string;
  //   createdAt: Date;
  //   updatedAt: Date;
  merchant_id: number;
  pickupAddress: string;
  dropoffAddress: string;
  receiverName: string;
  receiverPhone: string;
  receiverEmail: string;
  parcelSize: string;
  packageDescription: string;
  totalPrice: number;
}
const prisma = new PrismaClient();

const CreateOrderController = async (req: any, res: any): Promise<void> => {
  const {
    deliveryMethod,
    orderStatus,

    // createdAt,
    // updatedAt,
    pickupAddress,
    dropoffAddress,
    receiverName,
    receiverPhone,
    receiverEmail,
    parcelSize,
    packageDescription,
    totalPrice,
  } = req.body;
  // const merchant_id = req.user?.userId;

  // if (
  //   !deliveryMethod ||
  //   !orderStatus ||
  //   !pickupAddress ||
  //   !dropoffAddress ||
  //   !receiverName ||
  //   !receiverPhone ||
  //   !parcelSize ||
  //   !packageDescription ||
  //   !totalPrice
  // ) {
  //   return res.status(400).json({ Error: "All the fields are required" });
  // }
  const requiredFields: Record<string, any> = {
    deliveryMethod,
    orderStatus,
    pickupAddress,
    dropoffAddress,
    receiverName,
    receiverPhone,
    receiverEmail,
    parcelSize,
    packageDescription,
    totalPrice
  };
  
  for (const [key, value] of Object.entries(requiredFields)) {
    if (!value) {
      return res.status(400).json({ error: `${key} is required and cannot be empty.` });
    }
  }
  const trackingNumber = await generateTrackingNumber(prisma, {
    prefix: "SDS",
    date: Date(),
  });

  if (!req.user) {
    return res.status(401).json({ error: "Authentication required" });
  }

  // Then check the role
  const merchantId = req.user.merchant_id;
  if (req.user.role !== "merchant") {
    return res.status(403).json({ error: "Merchant access required" });
  }

  try {
    await CreateOrder(
      merchantId,
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
      totalPrice
    );
    await emailService.sendEmailOnOrderCreation(receiverEmail,receiverName,trackingNumber)
    return res.status(200).json({message:"The Order is Created"})
  } catch (err) {
    return res.status(400).json({ Error: `The order creation failed ${err}` });
  }
};

export default CreateOrderController;
