// import { PrismaClient } from '@prisma/client';
import { PrismaClient } from "../generated/prisma";

// Define user roles as a TypeScript type
// type UserRole = 'admin' | 'merchant' | 'delivery_guy';

// Define a common User interface for the return type
interface User {
  id: number;
  email: string;
  [key: string]: any; // For flexibility, since tables may have different fields
}

// Custom error for invalid roles
class RoleError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RoleError';
  }
}

// Initialize Prisma client
const prisma = new PrismaClient();

// Function to find a user by email using Prisma
const FindUserByEmail = async (email: string, role: string): Promise<User | null> => {
  try {
    let user: any;

    // Query the appropriate table based on the role
    // if (role === 'admin') {
    //   user = await prisma.admin.findUnique({
    //     where: { email },
    //   });
    // } 
     if (role === 'merchant') {
      user = await prisma.merchant.findUnique({
        where: { email },
      });
    } else if (role === 'delivery_guy') {
      user = await prisma.delivery_guy.findUnique({
        where: { email },
      });
    } else {
      throw new RoleError('Invalid Role');
    }

    return user || null;
  } catch (error) {
    console.error(`Error finding user with email ${email} for role ${role}:`, error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

// Export the function and types
export default FindUserByEmail;
export {  User, RoleError };