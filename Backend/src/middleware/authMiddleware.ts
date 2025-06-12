import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  email: string;
  role: string;
  merchant_id: number;
}

// Extend Express Request type to include `user`
declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

const authenticates = (
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
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as UserPayload;
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
      merchant_id: decoded.merchant_id,
    };
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

export default authenticates;
