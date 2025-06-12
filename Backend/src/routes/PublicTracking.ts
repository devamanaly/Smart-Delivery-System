import express, { Router } from "express";
import PublicTrackingController from "../controllers/PublicTrackingController";

const router: Router = express.Router();

// Wrap the async controller in a middleware to handle Promises
router.get("/tracking/:trackingNumber", (req, res, next) => {
  PublicTrackingController(req, res).catch(next); // Pass errors to Express error handler
});

export default router;