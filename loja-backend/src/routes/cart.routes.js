const express = require('express');
const router = express.Router();
const CartController = require('../controllers/CartController');

router.get('/', CartController.list);
router.post('/', CartController.add);

module.exports = router; 
