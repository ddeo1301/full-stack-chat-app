const express = require('express');
const router = express.Router();
const chatController = require('../controller/chat');
const middleware = require('../middleware/auth');

router.post('/sendmessage', middleware.authentication, chatController.sendMessage);

module.exports = router;