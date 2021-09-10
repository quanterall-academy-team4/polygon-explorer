const express = require('express');
const router = express.Router();

const BlocksController = require('../controllers/blocks');

// router.get('/', () => {});
router.get('/:arg', BlocksController.getBlockByNumberOrHash);
router.get('/latest', BlocksController.getLatestBlock);
router.get('/from=:from&count=:count', BlocksController.getMultipleBlocksAfterThreshold);
router.get('/pending', BlocksController.getPendingBlocks);

module.exports = router;
