import { Express, Request, Response, Router } from "express";
import express from "express";
// import { registerDeliveryGuy } from "../controllers/deliveryGuyController";
import deliveryGuyUpload from "../middleware/deliveryGuyMiddleware";
import registerDeliveryGuy from "../controllers/deliveryGuyController";
// import registerDeliveryGuy from "../controllers/deliveryGuyController";
// import { registerDeliveryGuy } from "../controllers/deliveryGuyController";

const router = express.Router();
interface DeliveryGuyInput {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  current_location: string;
  availability: boolean;
  phone: string;
  date_of_births: string;
  gender: string;
  national_id_number: string;
  vehicle_type: string;
  vehicle_number_plate: string;
  driving_license_number: string;
}

const registerDeliveryGuyHandler = async (
  req: Request<{}, {}, DeliveryGuyInput>,
  res: Response
): Promise<void> => {
  await registerDeliveryGuy(req, res); // Call the original function
  // No need to return anything since Express handles the response via `res`
};
router.post(
  "/register-delivery-guy",
  deliveryGuyUpload,
  registerDeliveryGuyHandler
);

export default router;
