// import  Login  from "../controllers/authController";

import express, { Router } from 'express';
import CreateOrderController from '../controllers/CreateOrderController';
import authenticates from '../middleware/authMiddleware';
// import authenticates from '../middleware/authMiddleware';
// import authenticates, { authenticate } from '../middleware/authMiddleware';
// import  Login  from '../controllers/authController';

// console.log("Login handler type:", typeof Login);

// const express = require('express');
// const router = express.Router();

const router: Router = express.Router();

router.post('/',authenticates, CreateOrderController);
// router.post('/login', Login);

export default router;
