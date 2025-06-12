// const pool = require('../config/db')
// const bcrypt = require('bcrypt')

// const createMerchant = async (business_name, business_type, business_category, business_address, business_description, opening_hours, closing_hours, owner_full_name, owner_phone, email, role_in_business, owner_national_id, password, business_license_path) => {

//     try {

//         const hashPassword = await bcrypt.hash(password, 10);

//         const query = ` INSERT INTO merchant(business_name, business_type, business_category,business_address, business_description, opening_hours, closing_hours,  owner_full_name, owner_phone, email, role_in_business, owner_national_id,  password, business_license_path) VALUES (
//       $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11,
//       $12, $13, $14)
//       RETURNING * ;
//       `
//         const values = [
//             business_name, business_type, business_category, business_address, business_description, opening_hours, closing_hours, owner_full_name, owner_phone, email, role_in_business, owner_national_id, hashPassword, business_license_path
//         ]

//         const result = await pool.query(query, values)

//         return result.rows[0];

//     }
//     catch (err) {
//         throw new Error(`the error is in merchant creation ${err} `)

//     }


// }

// module.exports = createMerchant


// import { PrismaClient } from '@prisma/client';


import { PrismaClient } from "../generated/prisma";

interface MerchantInput {
    business_name: string;
    business_type: string;
    business_category: string;
    business_address: string;
    business_description: string;
    opening_hours: string;
    closing_hours: string;
    owner_full_name: string;
    owner_phone: string;
    email: string;
    role_in_business: string;
    owner_national_id: string;
    hash_password: string;
    // created_at: string, // Optional, defaults to now() in schema

    business_license_path: string;
  }
const prisma = new PrismaClient();async function createMerchant(
  business_name: MerchantInput['business_name'],
  business_type: MerchantInput['business_type'],
  business_category: MerchantInput['business_category'],
  business_address: MerchantInput['business_address'],
  business_description: MerchantInput['business_description'],
  opening_hours: MerchantInput['opening_hours'],
  closing_hours: MerchantInput['closing_hours'],
  owner_full_name: MerchantInput['owner_full_name'],
  owner_phone: MerchantInput['owner_phone'],
  email: MerchantInput['email'],
  role_in_business: MerchantInput['role_in_business'],
  owner_national_id: MerchantInput['owner_national_id'],
  hash_password: MerchantInput['hash_password'],

) {
  try {
    const newMerchant = await prisma.merchant.create({
      data: {
        business_name,
        business_type,
        business_category,
        business_address,
        business_description,
        opening_hours,
        closing_hours,
        owner_full_name,
        owner_phone,
        email,
        role_in_business,
        owner_national_id,
        hash_password,
       
        created_at: new Date(), // Optional, defaults to now() in schema
      },
    });
    console.log("Merchant created:", newMerchant);
    return newMerchant;
  } catch (error) {
    console.error("Error creating merchant:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export default createMerchant
