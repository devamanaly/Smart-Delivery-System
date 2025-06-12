import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface getOrderPayload {
    
    merchant_id?: number;
    delivery_guy_id?: number;
    email: string;
    role: string;
}

// Extend Express Request type to include `userInfo`
 declare global {
  namespace Express {
    interface Request {
        userInfo?: getOrderPayload;
    }
  }
}

const authenticatesGetOrderInfo = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ error: "Authentication required" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as getOrderPayload;
    req.userInfo = {
      email: decoded.email,
      role: decoded.role,
      merchant_id: decoded.merchant_id,
      delivery_guy_id:decoded.delivery_guy_id,
    };
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

export default authenticatesGetOrderInfo;
