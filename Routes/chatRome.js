const express = require("express");
const router = express.Router();
const conversationControlers = require("../Controllers/chatRome");
const auth = require("../middleware/auth");
const permission = require("../middleware/permision");

router.post("/", auth, permission(["admin"]), conversationControlers.createChatRome);
router.get("/", auth, conversationControlers.getChatRome);
module.exports = router;
