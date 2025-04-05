const express = require("express");
const { handleTelegramMessage } = require("../controllers/chatController");

const router = express.Router();
router.post("/", handleTelegramMessage);

module.exports = router;
