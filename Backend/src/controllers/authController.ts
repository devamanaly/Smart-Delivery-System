import { PrismaClient } from "../generated/prisma";
const bcrypt = require("bcrypt");
// import { Jwt } from "jsonwebtoken";
import * as jwt from "jsonwebtoken";

import { Request, Response } from "express";
import FindUserByEmail from "../models/FindUser";

interface LoginInput {
  email: string;
  password: string;
  role: string;
}

const prisma = new PrismaClient();

const Login = async (
  req: any,
  res: any
): Promise< void> => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    return res.status(400).json({ Error: "Email and password is required" });
  }

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Usage in your controller
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  try {
    let user: any;
    let userId: string | undefined;
    let userType: string | undefined;
    let merchantId: number | undefined = undefined;
   const emailCHeck= await FindUserByEmail(email, role);
   if (!emailCHeck) {
    return res.status(404).json({ error: "User not found" });
  }
    if (role === "delivery_guy") {
      user = await prisma.delivery_guy.findUnique({
        where: { email },
        select: {
          delivery_guy_id: true,
          email: true,
          hash_password: true,
          name: true,
        },
      });

      userId = user.delivery_guy_id;
      userType = "delivery_guy";
    } else if (role === "merchant") {
      user = await prisma.merchant.findUnique({
        where: { email },
        select: {
          merchant_id: true,
          email: true,
          hash_password: true,
          owner_full_name: true,
        },

      });

      userId = user.merchant_id;
      userType = "merchant";
      merchantId = user.merchant_id;
    } else {
      res.status(400).json({ Error: "User Not Found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user?.hash_password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid  password." });
    }

    const jwtToken = jwt.sign(
      {
        user_id: userId,
        email: email,
        role: userType,
        merchant_id: merchantId
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Login successful",
      token: jwtToken,
      user: {
        id: userId,
        email: user.email,
        role: userType,
        merchant_id: merchantId 
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};


export default Login