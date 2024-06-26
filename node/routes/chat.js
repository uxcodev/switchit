const express = require("express");

const chatController = require("../controllers/chat");
const { validateAccessToken } = require('../middleware/auth0.middleware')

const router = express.Router();

//TESTING
router.post("/", validateAccessToken, chatController.completion);

module.exports = router;