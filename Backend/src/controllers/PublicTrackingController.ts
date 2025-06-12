import { PrismaClient } from "../generated/prisma";

import { Request, Response } from "express";

interface TrackingInfo {
  trackingNumber: string;
}
const Prisma = new PrismaClient();

const PublicTrackingController = async (
  req: Request,
  res: Response
): Promise<Response | void > => {
  const { trackingNumber } = req.params;

  if (!trackingNumber) {
    return res.status(400).json({ Error: "Tracking Number is Required" });
  }

  try {
    const trackingDetails = await Prisma.orders.findUnique({
      where: { trackingNumber },
      select: {
        orderStatus: true,
        deliveryMethod: true,
        createdAt: true,
        updatedAt: true,
        delivery_guy_id: true,
        delivery_guy: {
          select: {
            name: true,
            phone: true,
          },
        },
      },
    });

    if (!trackingDetails) {
      return res.status(404).json({ error: "Order not found" });
    }

    return res.status(200).json({
      message: "Tracking data retrieved",
      trackingDetails,
    });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default PublicTrackingController;
