const express = require("express");
const router = express.Router();
const roomControlers = require("../Controllers/chatRoom");
const auth = require("../middleware/auth");
const permission = require("../middleware/permision");

router.post("/", auth, permission(["super_admin", "admin"]), roomControlers.createChatRoom);
router.get("/", auth, permission(["super_admin", "admin", "assistant"]), roomControlers.getChatRoom);
router.put("/", auth, permission(["super_admin", "admin"]), roomControlers.updateChatRoom);
router.delete("/:roomId", auth, permission(["super_admin", "admin"]), roomControlers.deleteChatRoom);
module.exports = router;
