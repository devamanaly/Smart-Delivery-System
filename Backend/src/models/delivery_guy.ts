import { PrismaClient } from "../generated/prisma";
interface deliveryGuyAttributes {
  delivery_guy_id: number;
  name: string;
  email: string;
  hash_password: string;
  current_location: string;
  availability: boolean;
  created_at?: Date;
  updated_at?: Date;
  phone: string;
  date_of_birth: Date;
  gender: string;
  national_id_number: string;
  vehicle_type: string;
  vehicle_number_plate: string;
  driving_license_number: string;
  id_card_url?: string | null;
  license_doc_url?: string | null;
  profile_photo_url?: string | null;
}

const prisma = new PrismaClient();
async function CreateDeliveryGuy(
  name: string,
  email: string,
  hash_password: string,
  current_location: string,
  availability: boolean,
  phone: string,
  date_of_birth: Date,
  gender: string,
  national_id_number: string,
  vehicle_type: string,
  vehicle_number_plate: string,
  driving_license_number: string,
  id_card_url?: string | null,
  license_doc_url?: string | null,
  profile_photo_url?: string | null
) {
  try {
    const newDeliveryGuy = await prisma.delivery_guy.create({
      data: {
        name,
        email,
        hash_password,
        current_location,
        availability,
        phone,
        date_of_birth,
        gender,
        national_id_number,
        vehicle_type,
        vehicle_number_plate,
        driving_license_number,
        id_card_url,
        license_doc_url,
        profile_photo_url,
        created_at: new Date(), // optional: Prisma schema already uses default(now())
      },
    });

    console.log("Delivery guy created:", newDeliveryGuy);
    return newDeliveryGuy;
  } catch (error) {
    console.error("Error creating delivery guy:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export default CreateDeliveryGuy;