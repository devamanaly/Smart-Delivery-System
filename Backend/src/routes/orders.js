const express = require('express');
const auth = require('../middleware/auth')
const getOrders = require('../models/order')
const orderRoutes = express.Router();

orderRoutes.get('/', auth, getOrders)

module.exports = orderRoutes

