const express = require("express");
const router = express.Router();
const chatMessageControlers = require("../Controllers/chatMessage");
const auth = require("../middleware/auth");

router.post("/", auth, chatMessageControlers.createChatMessage);
router.get("/:roomId", auth, chatMessageControlers.getChatMessage);
module.exports = router;
