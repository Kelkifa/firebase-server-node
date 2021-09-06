const express = require('express');
const OrderController = require('../controllers/OrderController');
const router = express.Router();

router.post('/add', OrderController.add);

module.exports = router;