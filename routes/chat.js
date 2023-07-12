const express = require('express');

const authenticateController = require('../middleware/authenticate')
const chatController = require('../controller/chat')
const router  = express.Router();

// router.post('/send', authenticateController.authenticate, chatController.postChat);
// router.get('/get', authenticateController.authenticate, chatController.getChat);
router.post('/send', chatController.postChat);
router.post('/send', chatController.postChat)

module.exports = router;