const express = require('express');
const router = express.Router();

const BlocksController = require('../controllers/http/blocks');

// router.get('/', () => {});
router.get('/ByNumber/OrHash/:arg', BlocksController.getBlockByNumberOrHash);
router.get('/latest', BlocksController.getLatestBlock);
router.get('/:from/:count', BlocksController.getMultipleBlocksAfterThreshold);
router.get('/pending', BlocksController.getPendingBlocks);

module.exports = router;
