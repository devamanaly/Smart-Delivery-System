import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import winston from "winston";
import authRoutes from "./routes/auths";
import merchantRoutes from "./routes/merchantAuth"
// import loginRoutes from './routes/LoginAuth'
import CreateOrder from './routes/CreateOrderAuth'
import loginRoutes from './routes/LoginAuth'
import publicTrackingRoutes from './routes/PublicTracking'
import getOrders from './routes/getOrders'
// import { getOrderPayload } from "./middleware/getOrderAuth";
const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());

// Logging configuration using winston
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

// Routes
// app.use("/auths", authRoutes);
app.use("/auth", merchantRoutes)
app.use("/auth", loginRoutes )
app.use("/create-order",CreateOrder)
app.use('/public', publicTrackingRoutes)
app.use('/',getOrders)

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.stack);
  res.status(500).json({ message: `Something went wrong! ${err} ` });
});

// / App.use((err, req, res, next) => {
//   //   // logger.error(err.message);
//   //   res.status(500).json({ error: `Internal server error ${err}` });
//   // });

export default app;
