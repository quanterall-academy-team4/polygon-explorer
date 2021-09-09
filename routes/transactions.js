const express = require('express');
const router = express.Router();

const TransactionsController = require('../controllers/transactions');

// router.get("/", () => {}));
router.get("/hash=:hash", TransactionsController.getTransactionsByHash);
router.get("/pending", TransactionsController.getPendingTransactions);
router.get("/address=:address", TransactionsController.getTransactionsByAddress);

module.exports = router;
