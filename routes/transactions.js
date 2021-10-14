const express = require('express');
const router = express.Router();

const TransactionsController = require('../controllers/http/transactions');


router.get("/hash/:hash", TransactionsController.getTransactionsByHash);
router.get("/pending", TransactionsController.getPendingTransactions);
router.get("/address/:address", TransactionsController.getTransactionsByAddress);
router.get('/latest', TransactionsController.getLatestTransaction);

module.exports = router;
