const express = require('express')
const router = express.Router();
const Login = require('../controllers/authController')
const registerMerchant = require('../controllers/merchantController')
const uploadFieldMiddleware = require('../middleware/uploads')

router.post('/register-merchant',uploadFieldMiddleware,registerMerchant)

router.post('/login',Login)

module.exports=router


