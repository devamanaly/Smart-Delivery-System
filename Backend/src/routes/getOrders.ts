import express ,{ Router } from "express";
// import authenticatesGetOrderInfo from "../middleware/authMiddleware";
import getOrdersController from "../controllers/getOrdersController";
import authenticatesGetOrderInfo from "../middleware/getOrderAuth";


const router: Router = express.Router();

router.get("/orders" , authenticatesGetOrderInfo ,getOrdersController )

export default router