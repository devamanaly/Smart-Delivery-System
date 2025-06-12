// import  Login  from "../controllers/authController";

import express, { Router } from 'express';
import  Login  from '../controllers/authController';
console.log("Login handler type:", typeof Login);

// const express = require('express');
// const router = express.Router();

const router: Router = express.Router();

router.post('/login', Login);
// router.post('/login', Login);

export default router;
