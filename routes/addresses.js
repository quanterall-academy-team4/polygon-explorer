const express = require('express');
const router = express.Router();

const AdressController = require('../controllers/addresses');

router.get('/:address', AdressController.getAccountBalance);

module.exports = router;