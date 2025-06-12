import { UserPayload } from '../interfaces/auth'; // Optional interface

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: string;
        merchant_id: number; // Optional for merchants
      };
    }
  }
}