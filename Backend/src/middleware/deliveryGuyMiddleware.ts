import multer, { FileFilterCallback } from "multer";
import { Request } from "express";

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) => {
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true); // Accept the file
    } else {
      // Create a new Error and pass it
      const error = new Error(
        "Invalid file type. Only JPEG, PNG, and PDF are allowed."
      );
      // Use type assertion to satisfy the FileFilterCallback
      cb(error as unknown as null, false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

const deliveryGuyUpload = upload.fields([
  { name: "profile_photo_url", maxCount: 1 },
  { name: "id_card_url", maxCount: 1 },
  { name: "license_doc_url", maxCount: 1 },
]);

export default deliveryGuyUpload;
