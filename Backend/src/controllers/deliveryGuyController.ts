const bcript = require("bcrypt");
// import DeliveryGuyCreate from "../models/delivery_guy";
import { Request, Response, NextFunction } from "express";
import { Multer } from "multer";
import fs from "fs";
import path from "path";
// import CreateDeliveryGuy from "../models/delivery_guy";
import CreateDeliveryGuy from "../models/delivery_guy";
// const FindUserByEmail = require("../models/user");
import FindUserByEmail from "../models/FindUser";
import StringToBoolean from "../utils/booleanCHanger";
import EmailService from "../utils/email.service";
interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

interface DeliveryGuyInput {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  current_location: string;
  availability: string;
  phone: string;
  date_of_births: string;
  gender: string;
  national_id_number: string;
  vehicle_type: string;
  vehicle_number_plate: string;
  driving_license_number: string;
}

const registerDeliveryGuy = async (
  req: Request<{}, {}, DeliveryGuyInput>,
  res: Response
): Promise<Response | void> => {
  const {
    name,
    email,
    password,
    confirm_password,
    phone,
    date_of_births,
    current_location,
    vehicle_type,
    gender,
    vehicle_number_plate,
    national_id_number,
    driving_license_number, 
    availability,

  } = req.body;

  // const {availability} = req.body
  const avalaible= StringToBoolean(availability)

  if (
    !name ||
    !email ||
    !password ||
    !confirm_password ||
    !phone ||
    !date_of_births ||
    !current_location ||
    !vehicle_type ||
    !gender ||
    !vehicle_number_plate ||
    !national_id_number ||
    !driving_license_number
  ) {
    return res.status(400).json({ Error: "All fields are required" });
  }

  

  if (password !== confirm_password) {
    return res.status(400).json({ error: "The passwords do not match." });
  }
  const hash_password = await bcript.hash(password, 10);
  // console.log(hash_password)
  const existingUser = await FindUserByEmail(email, "delivery_guy");
  if (existingUser !== null) {
    return res.status(400).json({ error: "the delivery guy is registered" });
  }

  const date_of_birth = new Date(req.body.date_of_births);

  const files = req.files as {
    [fieldname: string]: Express.Multer.File[];
  };

  const uploadDir = path.join(__dirname, "..", "uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  const saveFile = (file: Express.Multer.File, name: string) => {
    const uniqueName = `${name}-${Date.now()}-${file.originalname}`;
    const filePath = path.join(uploadDir, uniqueName);
    fs.writeFileSync(filePath, file.buffer);
    return `uploads/${uniqueName}`;
  };

  const profile_photo_url = saveFile(
    files.profile_photo_url[0],
    "profile_photo"
  );

  const id_card_url = saveFile(files.id_card_url[0], "id_card_url");
  const license_doc_url = saveFile(files.license_doc_url[0], "license_doc_url");

  if (!profile_photo_url || !id_card_url || !license_doc_url) {
    res.status(400).json({ error: "the files are missing" });
  }

  try {
   await CreateDeliveryGuy(
      name,
      email,
      hash_password,
      current_location,
      avalaible,
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
    );

    // await newCreateDeliveryGuy.save();
    await EmailService.sendEmailToDeliveryGuy(email,name)
    
    return res.status(200).json({ message: "the Delivery Guy is created" });
  } catch (err) {
    res.status(400).json({ message: `there is error in validation ${err}` });
  }
};

export default registerDeliveryGuy;
